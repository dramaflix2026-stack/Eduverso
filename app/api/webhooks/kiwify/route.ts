import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Plan = "estudante" | "professor";
type ProductWebhook = { plan: Plan; productId: string; token: string };
type WebhookPayload = {
  order_id?: unknown;
  order_status?: unknown;
  webhook_event_type?: unknown;
  Product?: { product_id?: unknown };
  Customer?: { email?: unknown };
};

const deny = (message: string, status: number) =>
  NextResponse.json(
    { error: message },
    { status, headers: { "Cache-Control": "no-store" } }
  );

const acknowledged = (ignored = false) =>
  NextResponse.json(
    ignored ? { ok: true, ignored: true } : { ok: true },
    { headers: { "Cache-Control": "no-store" } }
  );

function safeText(value: unknown, max = 200) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function configuredProducts(): ProductWebhook[] {
  const studentId =
    process.env.EDUVERSO_KIWIFY_ESTUDANTE_PRODUCT_ID ||
    process.env.EDUVERSO_KIWIFY_PRODUCT_ID ||
    "";
  const studentToken =
    process.env.EDUVERSO_KIWIFY_ESTUDANTE_WEBHOOK_TOKEN ||
    process.env.EDUVERSO_KIWIFY_WEBHOOK_TOKEN ||
    "";
  const professorId = process.env.EDUVERSO_KIWIFY_PROFESSOR_PRODUCT_ID || "";
  const professorToken =
    process.env.EDUVERSO_KIWIFY_PROFESSOR_WEBHOOK_TOKEN || "";

  return [
    { plan: "estudante" as const, productId: studentId, token: studentToken },
    { plan: "professor" as const, productId: professorId, token: professorToken },
  ].filter((item) => item.productId.length >= 3 && item.token.length >= 8);
}

/**
 * Kiwify sends ?signature=<hex HMAC-SHA1> calculated over the raw JSON body
 * with the per-webhook Token field as key. It does not send the token itself.
 * Never use ?token=, a custom header, or a parsed/re-serialized body here.
 */
function validKiwifySignature(
  rawBody: string,
  receivedSignature: string,
  token: string
) {
  if (!/^[a-f0-9]{40}$/i.test(receivedSignature)) return false;
  const expected = createHmac("sha1", token).update(rawBody).digest();
  const received = Buffer.from(receivedSignature, "hex");
  return received.length === expected.length && timingSafeEqual(received, expected);
}

export async function POST(request: NextRequest) {
  const configs = configuredProducts();
  const serverKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  const supabase = process.env.SUPABASE_URL || "";
  if (!configs.length || !serverKey || !supabase)
    return deny("Webhook não configurado.", 503);

  let base: URL;
  try {
    base = new URL(supabase);
    if (base.protocol !== "https:" || !base.hostname.endsWith(".supabase.co"))
      return deny("Configuração de banco inválida.", 503);
  } catch {
    return deny("Configuração de banco inválida.", 503);
  }

  const declaredLength = Number(request.headers.get("content-length") || 0);
  if (declaredLength > 96 * 1024) return deny("Payload excede limite.", 413);

  const rawBody = await request.text();
  if (Buffer.byteLength(rawBody, "utf8") > 96 * 1024)
    return deny("Payload excede limite.", 413);

  const signature = request.nextUrl.searchParams.get("signature") || "";
  const signedWith = configs.filter((config) =>
    validKiwifySignature(rawBody, signature, config.token)
  );
  if (signedWith.length === 0) return deny("Assinatura inválida.", 401);

  let payload: WebhookPayload;
  try {
    payload = JSON.parse(rawBody) as WebhookPayload;
    if (!payload || typeof payload !== "object" || Array.isArray(payload))
      return deny("Formato inválido.", 400);
  } catch {
    return deny("Formato inválido.", 400);
  }

  const productId = safeText(payload.Product?.product_id, 150);
  // Signature and product ID must match the SAME configured product.
  // Signed Kiwify test notifications using placeholder product IDs are
  // acknowledged but cannot grant access.
  const match = signedWith.find((item) => item.productId === productId);
  if (!match) return acknowledged(true);

  const order = safeText(payload.order_id, 150);
  const email = safeText(payload.Customer?.email, 320).toLowerCase();
  if (!order || !email || !/^\S+@\S+\.\S+$/.test(email))
    return deny("Pedido sem identificadores válidos.", 400);

  const evt = safeText(payload.webhook_event_type, 80).toLowerCase();
  const originalStatus = safeText(payload.order_status, 40).toLowerCase();
  let status: "paid" | "refunded" | "chargeback" | "canceled" | null = null;
  if (originalStatus === "chargeback" || evt.includes("chargeback"))
    status = "chargeback";
  else if (originalStatus === "refunded" || evt.includes("refund"))
    status = "refunded";
  else if (originalStatus === "canceled" || evt === "order_canceled")
    status = "canceled";
  else if (
    originalStatus === "paid" &&
    ["order_approved", "order_paid"].includes(evt)
  )
    status = "paid";

  if (!status) return acknowledged(true);

  const headers = {
    apikey: serverKey,
    Authorization: "Bearer " + serverKey,
    "Content-Type": "application/json",
  };

  // A delayed duplicate paid event must not restore access after a refund,
  // chargeback or cancellation of the same order.
  if (status === "paid") {
    const old = await fetch(
      base.origin +
        "/rest/v1/eduverso_purchases?select=payment_status&order_id=eq." +
        encodeURIComponent(order) +
        "&limit=1",
      { headers, cache: "no-store" }
    );
    if (!old.ok) return deny("Falha ao consultar pagamento.", 502);
    const rows = (await old.json()) as Array<{ payment_status: string }>;
    if (["refunded", "chargeback", "canceled"].includes(rows[0]?.payment_status || ""))
      return acknowledged(true);
  }

  const saved = await fetch(
    base.origin + "/rest/v1/eduverso_purchases?on_conflict=order_id",
    {
      method: "POST",
      headers: { ...headers, Prefer: "resolution=merge-duplicates,return=minimal" },
      body: JSON.stringify({
        order_id: order,
        product_id: match.productId,
        buyer_email: email,
        payment_status: status,
        webhook_event: evt,
        updated_at: new Date().toISOString(),
      }),
      cache: "no-store",
    }
  );

  if (!saved.ok) return deny("Não foi possível registrar pagamento.", 502);
  return acknowledged();
}
