# Eduverso + Supabase Toledo (isolated tables)

The following tables were added **only** to Supabase project `toledo-reports`:
`eduverso_profiles`, `eduverso_entitlements`, `eduverso_purchases`, and `eduverso_progress`.
All have RLS enabled. Existing Toledo and Método EIXO tables are untouched.

## Required environment variables (Railway / Production)

- `SUPABASE_URL` — HTTPS URL of the existing `toledo-reports` Supabase project.
- `SUPABASE_PUBLISHABLE_KEY` — public client key used only for authenticated user operations.
- `SUPABASE_SERVICE_ROLE_KEY` — server-only private key to record verified purchases. Never use `NEXT_PUBLIC_`.
- `EDUVERSO_REQUIRE_PURCHASE=false` — keep the site accessible until end-to-end QA.
- `EDUVERSO_KIWIFY_ESTUDANTE_PRODUCT_ID` — actual Kiwify Student product ID.
- `EDUVERSO_KIWIFY_ESTUDANTE_WEBHOOK_TOKEN` — token displayed by Kiwify for the Student webhook.
- `EDUVERSO_KIWIFY_PROFESSOR_PRODUCT_ID` — actual Kiwify Teacher product ID.
- `EDUVERSO_KIWIFY_PROFESSOR_WEBHOOK_TOKEN` — token displayed by Kiwify for the Teacher webhook.

Legacy `EDUVERSO_KIWIFY_PRODUCT_ID` and `EDUVERSO_KIWIFY_WEBHOOK_TOKEN` remain accepted as fallbacks for Student only; prefer the explicit Student names.

## Kiwify webhook setup

Create **two separate webhook subscriptions** at Kiwify > Apps > Webhooks:

| Name | Product selection | Events |
| --- | --- | --- |
| Eduverso - Estudante | Student product only | Compra aprovada, Reembolso, Chargeback |
| Eduverso - Professor | Teacher product only | Compra aprovada, Reembolso, Chargeback |

Both URLs must be exactly:

`https://eduverso-web-production.up.railway.app/api/webhooks/kiwify`

**Do not** append a token or signature to the URL. Kiwify sends a `?signature=` HMAC-SHA1 digest on delivery, calculated from the raw JSON body and the webhook's own Token field. The receiver verifies the digest before trusting any order data. Kiwify generates a different token for each webhook: save each one in the corresponding **Railway server-side environment variable**, never in Git or public frontend code.

The receiver recognizes both product IDs, requires the correct signature for that product and records order status in the existing isolated `eduverso_purchases` table. The existing database trigger grants/revokes **basic paid access** to matching confirmed Eduverso users. **The current entitlement schema does not yet differentiate Student and Teacher privileges**; do not advertise or sell Teacher functionality until separate entitlements and the bulk teaching tools have been built and tested.

### Test procedure

1. Configure product IDs, per-webhook tokens and the Supabase server key on Railway, and deploy.
2. Send each Kiwify *Testar Webhook* event. Inspect Kiwify delivery logs for a 2xx HTTP response. Kiwify can send placeholder product IDs during tests; signed but unmatched payloads are acknowledged without inserting an order.
3. Validate an actual approved test sale matches the correct product ID and creates one purchase/entitlement. Check the user has confirmed email and profile.
4. Test reembolso, chargeback, duplicate delivery, wrong signature, wrong product/token combination and non-purchaser access.
5. Only after successful checks activate `EDUVERSO_REQUIRE_PURCHASE=true`. Keep the Teacher checkout closed until teacher-specific permissions and features are delivered.

## Redirect URL allow list in shared Supabase Auth

In Supabase > Authentication > URL Configuration, **add** the following Redirect URL to the existing allow list, without changing the project Site URL or removing Toledo/EIXO URLs:

`https://eduverso-web-production.up.railway.app/entrar**`

On sign-up, the app sends `redirect_to` to the Eduverso login page. Confirmation emails may navigate to the existing shared Auth Site URL until this additional redirect is allowed. Do not alter global settings for other products.

## QA checklist

1. Sign up with a new email, validate the email, sign in.
2. Check `/api/conta` displays profile and no paid access initially.
3. Test the webhooks in Kiwify for the configured product, then verify `eduverso_purchases` and `eduverso_entitlements` via service tool.
4. Check user-specific saved progress in `eduverso_progress`.
5. Test refunds and idempotent order retries.
6. Only then activate `EDUVERSO_REQUIRE_PURCHASE=true` and check redirect to `/acesso-pendente` without entitlement.

**Limit of initial paywall:** the Next.js app contains some hardcoded course content in client bundles. The route-level protection helps navigation but full content confidentiality will require moving protected lesson payloads behind authenticated APIs.

## Shared Auth isolation

Toledo uses an `auth.users` trigger named `on_auth_user_created_create_laboratory_profile`. New Eduverso students must sign up with `raw_user_meta_data.app = "eduverso"` so that they do not receive a laboratory profile. The trigger now excludes `app='eixo'` (existing behavior) and `app='eduverso'`, while preserving the existing lab profile creation behavior for other users. Do not remove this app tag.

The commercial paywall in `proxy.ts` also protects the lesson API routes `/api/medicina/*` and `/api/materiais/*` if enabled.
