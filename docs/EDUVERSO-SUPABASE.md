# Eduverso + Supabase Toledo (isolated tables)

The following tables were added **only** to Supabase project `toledo-reports`:
`eduverso_profiles`, `eduverso_entitlements`, `eduverso_purchases`, and `eduverso_progress`.
All have RLS enabled. Existing Toledo and Método EIXO tables are untouched.

## Required environment variables (Railway / Production)

- `SUPABASE_URL` — Supabase HTTPS project URL.
- `SUPABASE_PUBLISHABLE_KEY` — publishable API key; never a service-role key.
- `EDUVERSO_REQUIRE_PURCHASE=false` — keep demo accessible while Kiwify is not ready.
- `EDUVERSO_KIWIFY_WEBHOOK_TOKEN` — a strong random secret (at least 24 characters), kept **only** in Railway.
- `EDUVERSO_KIWIFY_PRODUCT_ID` — actual Eduverso product ID in Kiwify.
- `SUPABASE_SERVICE_ROLE_KEY` — Supabase *server-only* secret, required for the Kiwify webhook to insert payments. Do not put it in the Git repository or any `NEXT_PUBLIC_` variable.

**Never** turn `EDUVERSO_REQUIRE_PURCHASE=true` on before testing payment approval, refunds, email confirmation, and login end-to-end.

## Webhook configuration

In Kiwify > Apps > Webhooks, select the exact Eduverso product, order approved and refund/chargeback events, and enter an HTTPS endpoint:

`https://eduverso-web-production.up.railway.app/api/webhooks/kiwify?token=<your-strong-secret>`

The receiver strictly matches the configured product ID and only processes mapped order events. It rejects unsigned/unconfigured calls and writes only minimum sale status fields. A database trigger grants/revokes access to accounts with confirmed emails matching approved sales.

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
