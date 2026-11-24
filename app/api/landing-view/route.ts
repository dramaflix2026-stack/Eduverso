// Operational counter: aggregate successful POSTs in existing Railway HTTP metrics.
// Never persist visitor identifiers, read request bodies, use cookies or send data to Meta.
export function POST(request: Request) {
  const site = request.headers.get("sec-fetch-site");
  if (site && site !== "same-origin") {
    return new Response(null, { status: 403, headers: { "Cache-Control": "no-store" } });
  }
  return new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });
}
