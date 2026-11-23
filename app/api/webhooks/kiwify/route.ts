import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Two Kiwify products, one endpoint. Each product MUST have its own secret
// and its exact Kiwify Product.product_id (not a checkout link code).
// Fail closed when a product is not configured.
const deny = (message: string, status: number) =>
  NextResponse.json({ error: message }, { status, headers: { "Cache-Control": "no-store" } });

type Plan = "estudante" | "professor";
type ProductConfig = { plan: Plan; productId: string; secret: string };
type WebhookPayload = {
  order_id?: unknown;
  order_status?: unknown;
  webhook_event_type?: unknown;
  Product?: { product_id?: unknown };
  Customer?: { email?: unknown };
};

function safeText(value: unknown, max = 200) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function equalsSecret(received: string, expected: string) {
  const first = Buffer.from(received);
  const second = Buffer.from(expected);
  return first.length === second.length && first.length > 0 && timingSafeEqual(first, second);
}

function configuredProducts(): ProductConfig[] {
  const configs: ProductConfig[] = [
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
  return configs.filter((entry) => entry.productId.length >= 3 && entry.secret.length >= 24);
}

export async function POST(request: NextRequest) {
  const products = configuredProducts();
  const serverKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  const supabase = process.env.SUPABASE_URL || "";

  if (products.length === 0 || !serverKey || !supabase)
    return deny("Webhook não configurado.", 503);

  // A different high-entropy secret is configured in each Kiwify webhook URL.
  // The Kiwify dashboard's own Token field is NOT this URL secret.
  const received =
    request.headers.get("x-eduverso-webhook-token") ||
    request.nextUrl.searchParams.get("token") ||
    "";
  const product = products.find((entry) => equalsSecret(received, entry.secret));
  if (!product || products.some((entry) =>
    entry.plan !== product.plan && (entry.secret === product.secret || entry.productId === product.productId)))
    return deny("Não autorizado.", 401);

  const length = Number(request.headers.get("content-length") || 0);
  if (length > 1024 * 96) return deny("Payload excede limite.", 413);

  let payload: WebhookPayload;
  try {
    payload = (await request.json()) as WebhookPayload;
  } catch {
    return deny("Formato inválido.", 400);
  }

  const order = safeText(payload.order_id, 150);
  const email = safeText(payload.Customer?.email, 320).toLowerCase();
  const currentProduct = safeText(payload.Product?.product_id, 150);
  const evt = safeText(payload.webhook_event_type, 80).toLowerCase();
  const originalStatus = safeText(payload.order_status, 40).toLowerCase();

  // A valid secret for Professor cannot approve a payment for Estudante, or vice versa.
  if (currentProduct !== product.productId)
    return deny("Produto não corresponde ao webhook.", 403);
  if (!order || !email || !/^\S+@\S+\.\S+$/.test(email))
    return deny("Pedido sem identificadores válidos.", 400);

  let status: "paid" | "refunded" | "chargeback" | "canceled" | null = null;
  if (originalStatus === "chargeback" || evt.includes("chargeback")) status = "chargeback";
  else if (originalStatus === "refunded" || evt.includes("refund")) status = "refunded";
  else if (originalStatus === "canceled" || evt === "order_canceled") status = "canceled";
  else if (originalStatus === "paid" && evt === "order_approved") status = "paid";
  if (!status)
    return NextResponse.json({ ok: true, ignored: true }, { headers: { "Cache-Control": "no-store" } });

  const headers = {
    apikey: serverKey,
    Authorization: "Bearer " + serverKey,
    "Content-Type": "application/json",
  };
  const base = new URL(supabase);
  if (base.protocol !== "https:" || !base.hostname.endsWith(".supabase.co"))
    return deny("Configuração de banco inválida.", 503);

  // Refunded/chargeback orders must never be reactivated by a delayed approval retry.
  if (status === "paid") {
    const old = await fetch(
      base.origin + "/rest/v1/eduverso_purchases?select=payment_status&order_id=eq." +
        encodeURIComponent(order) + "&limit=1",
      { headers, cache: "no-store" },
    );
    if (!old.ok) return deny("Falha ao consultar pagamento.", 502);
    const rows = (await old.json()) as Array<{ payment_status: string }>;
    if (["refunded", "chargeback"].includes(rows[0]?.payment_status || ""))
      return NextResponse.json({ ok: true, ignored: true }, { headers: { "Cache-Control": "no-store" } });
  }

  const saved = await fetch(base.origin + "/rest/v1/eduverso_purchases?on_conflict=order_id", {
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
  });
  if (!saved.ok) return deny("Não foi possível registrar pagamento.", 502);
  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}
