import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const deny = (message: string, status: number) =>
  NextResponse.json({ error: message }, { status, headers: { "Cache-Control": "no-store" } });

type Plan = "estudante" | "professor";
type ProductConfig = { plan: Plan; productId: string; secret: string };
type WebhookPayload = {
  order_id?: unknown;
  order_status?: unknown;
  webhook_event_type?: unknown;
  Product?: { product_id?: unknown };
  Customer?: { email?: unknown } | null;
};

function safeText(value: unknown, max = 200) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function sameSecret(received: string, expected: string) {
  const first = Buffer.from(received);
  const second = Buffer.from(expected);
  return first.length === second.length && first.length > 0 && timingSafeEqual(first, second);
}

function configuredProducts(): ProductConfig[] {
  const products: ProductConfig[] = [
    {
      plan: "estudante",
      productId: process.env.EDUVERSO_KIWIFY_PRODUCT_ID_ESTUDANTE || "",
      secret: process.env.EDUVERSO_KIWIFY_WEBHOOK_TOKEN_ESTUDANTE || "",
    },
    {
      plan: "professor",
      productId: process.env.EDUVERSO_KIWIFY_PRODUCT_ID_PROFESSOR || "",
      secret: process.env.EDUVERSO_KIWIFY_WEBHOOK_TOKEN_PROFESSOR || "",
    },
  ];
  // Fail closed: incomplete / repeated secrets or product IDs are not safe.
  if (products.some((p) => p.productId.length < 3 || p.secret.length < 24) ||
      products[0].secret === products[1].secret ||
      products[0].productId === products[1].productId) return [];
  return products;
}

function authenticateWebhook(request: NextRequest, rawBody: string, products: ProductConfig[]) {
  // Official Kiwify sales webhooks append ?signature=<HMAC-SHA1 hex digest>.
  // It signs the original raw HTTP request body with the Token set in Kiwify.
  const signature = request.nextUrl.searchParams.get("signature") || "";
  if (/^[a-f0-9]{40}$/i.test(signature)) {
    const matching = products.filter((p) => sameSecret(
      signature.toLowerCase(),
      createHmac("sha1", p.secret).update(rawBody, "utf8").digest("hex"),
    ));
    if (matching.length === 1) return matching[0];
  }
  // Transitional compatibility: previous setup explicitly supplied a separate
  // high-entropy token via HTTPS query or an internal header. Prefer HMAC.
  const legacy = request.nextUrl.searchParams.get("token") ||
    request.headers.get("x-eduverso-webhook-token") || "";
  const matching = products.filter((p) => sameSecret(legacy, p.secret));
  return matching.length === 1 ? matching[0] : null;
}

export async function POST(request: NextRequest) {
  const products = configuredProducts();
  const serverKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  const supabase = process.env.SUPABASE_URL || "";
  if (products.length !== 2 || !serverKey || !supabase)
    return deny("Webhook não configurado.", 503);

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 1024 * 96) return deny("Payload excede limite.", 413);

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return deny("Falha ao receber o payload.", 400);
  }
  if (Buffer.byteLength(rawBody, "utf8") > 1024 * 96)
    return deny("Payload excede limite.", 413);

  const product = authenticateWebhook(request, rawBody, products);
  if (!product) return deny("Assinatura inválida.", 401);

  let payload: WebhookPayload;
  try {
    payload = JSON.parse(rawBody) as WebhookPayload;
  } catch {
    return deny("Formato inválido.", 400);
  }

  const order = safeText(payload.order_id, 150);
  const email = safeText(payload.Customer?.email, 320).toLowerCase();
  const currentProduct = safeText(payload.Product?.product_id, 150);
  const evt = safeText(payload.webhook_event_type, 80).toLowerCase();
  const originalStatus = safeText(payload.order_status, 40).toLowerCase();

  if (currentProduct !== product.productId)
    return deny("Produto não corresponde ao webhook.", 403);
  if (order.length < 3 || !email || !/^\S+@\S+\.\S+$/.test(email))
    return deny("Pedido sem identificadores válidos.", 400);

  let status: "paid" | "refunded" | "chargeback" | "canceled" | null = null;
  if (["chargeback", "chargedback"].includes(originalStatus) || evt.includes("chargeback"))
    status = "chargeback";
  else if (originalStatus === "refunded" || evt.includes("refund"))
    status = "refunded";
  else if (originalStatus === "canceled" || evt === "order_canceled")
    status = "canceled";
  else if (originalStatus === "paid" && evt === "order_approved")
    status = "paid";

  if (!status)
    return NextResponse.json(
      { ok: true, ignored: true },
      { headers: { "Cache-Control": "no-store" } },
    );

  const headers = {
    apikey: serverKey,
    Authorization: "Bearer " + serverKey,
    "Content-Type": "application/json",
  };
  let base: URL;
  try {
    base = new URL(supabase);
  } catch {
    return deny("Configuração de banco inválida.", 503);
  }
  if (base.protocol !== "https:" || !base.hostname.endsWith(".supabase.co"))
    return deny("Configuração de banco inválida.", 503);

  // Never let a delayed order_approved retry reactivate a refunded/chargeback order.
  if (status === "paid") {
    const old = await fetch(
      base.origin + "/rest/v1/eduverso_purchases?select=payment_status&order_id=eq." +
        encodeURIComponent(order) + "&limit=1",
      { headers, cache: "no-store" },
    );
    if (!old.ok) return deny("Falha ao consultar pagamento.", 502);
    const rows = (await old.json()) as Array<{ payment_status: string }>;
    if (["refunded", "chargeback"].includes(rows[0]?.payment_status || ""))
      return NextResponse.json(
        { ok: true, ignored: true },
        { headers: { "Cache-Control": "no-store" } },
      );
  }

  const saved = await fetch(
    base.origin + "/rest/v1/eduverso_purchases?on_conflict=order_id",
    {
      method: "POST",
      headers: { ...headers, Prefer: "resolution=merge-duplicates,return=minimal" },
      body: JSON.stringify({
        order_id: order,
        product_id: product.productId,
        plan_type: product.plan,
        buyer_email: email,
        payment_status: status,
        webhook_event: evt,
        updated_at: new Date().toISOString(),
      }),
      cache: "no-store",
    },
  );
  if (!saved.ok) return deny("Não foi possível registrar pagamento.", 502);
  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}
