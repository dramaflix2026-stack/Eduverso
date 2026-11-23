# Eduverso + Supabase Toledo (isolated tables)

The following tables were added **only** to Supabase project `toledo-reports`:
`eduverso_profiles`, `eduverso_entitlements`, `eduverso_purchases`, and `eduverso_progress`.
All have RLS enabled. Existing Toledo and Método EIXO tables are untouched.

## Required environment variables (Railway / Production)

- `SUPABASE_URL` — HTTPS URL of the shared Eduverso Supabase project.
- `SUPABASE_PUBLISHABLE_KEY` — publishable key (never a secret role key).
- `EDUVERSO_PUBLIC_URL=https://eduversoai.com.br` — canonical web origin.
- `EDUVERSO_REQUIRE_PURCHASE=false` — keep purchase enforcement disabled until QA is complete.
- `EDUVERSO_KIWIFY_PRODUCT_ID_ESTUDANTE` — Kiwify `Product.product_id` (not the checkout's short URL code).
- `EDUVERSO_KIWIFY_PRODUCT_ID_PROFESSOR` — the separate Kiwify `Product.product_id` for the Professor product.
- `EDUVERSO_KIWIFY_WEBHOOK_TOKEN_ESTUDANTE` — independent high-entropy secret, at least 24 characters.
- `EDUVERSO_KIWIFY_WEBHOOK_TOKEN_PROFESSOR` — a different independent high-entropy secret, at least 24 characters.
- `SUPABASE_SERVICE_ROLE_KEY` — secret backend-only key for the shared Supabase project. Never place it in Git or any `NEXT_PUBLIC_` variable.

**Never** set `EDUVERSO_REQUIRE_PURCHASE=true` until approval/refund events, email confirmation, and both-plan access have been tested end-to-end.

## Two-product Kiwify integration

Before deploying the new webhook handler, apply the database migration in
`docs/sql/eduverso-kiwify-two-products.sql` and `docs/sql/eduverso-confirmation-reconcile.sql` to the existing Supabase database.

In Kiwify > Apps > Webhooks, use TWO independently configured webhooks, both with the three events Compra aprovada, Reembolso and Chargeback.

**1. Eduverso Estudante / Universitário**, select ONLY that product:

`https://eduverso-web-production.up.railway.app/api/webhooks/kiwify?plano=estudante`

**2. Eduverso Professor**, select ONLY that product:

`https://eduverso-web-production.up.railway.app/api/webhooks/kiwify?plano=professor`

In each Kiwify webhook's **Token** field, paste the value of the matching Railway secret variable (24+ characters). Kiwify sends a `signature` query parameter generated with HMAC-SHA1 over the raw JSON body and that Token; our receiver verifies it in constant time. Do NOT add the secret to the URL. The `plano` URL query is only for readability; it does not authorize access.

The legacy `?token=<secret>` URL is temporarily supported for migration from older webhooks, but remove it after verifying HMAC. Do not disclose secret values in screenshots, logs, chat or Git.

The webhook verifies the plan-specific HMAC or legacy token **and** exact product ID. The purchase table stores `plan_type` so the entitlement reconciliation selects Professor when both plans are active, and falls back to Estudante if a Professor purchase is refunded or charged back.

Initial paid-campaign scope is **Estudante**. Professor's bulk-generation feature is still in development; do not advertise the unavailable functionality as already delivered.

## Redirect URL allow list in shared Supabase Auth

In Supabase > Authentication > URL Configuration, **add** this URL to the allow list:

`https://eduversoai.com.br/entrar?confirmado=1`

Keep the previous Railway redirect as a fallback. Do NOT overwrite the shared project's Site URL or remove existing Toledo/EIXO URLs.

## QA checklist

1. Create a fresh Estudante account, confirm email, sign in on the canonical domain.
2. Confirm `/api/conta` shows no paid entitlement before an approved order.
3. Run both Kiwify webhook tests and validate that each has the correct product and plan.
4. Verify `eduverso_purchases.plan_type` and `eduverso_entitlements.plan_type` in Supabase.
5. Confirm Professor takes precedence if both products are owned; verify an Estudante fallback after a Professor refund.
6. Confirm retries cannot reactivate refunded/chargeback purchases.
7. Check saved user progress remains isolated under `eduverso_progress`.
8. Only then set `EDUVERSO_REQUIRE_PURCHASE=true` and validate redirect to `/acesso-pendente` for buyers without approved entitlement.

**Limit of the initial paywall:** some course content currently exists in client bundles; route protection alone is not complete content confidentiality. Protect sensitive lessons behind authenticated APIs before treating paywall enforcement as fully hardened.

## Shared Auth isolation

Toledo uses an `auth.users` trigger named `on_auth_user_created_create_laboratory_profile`. New Eduverso students must sign up with `raw_user_meta_data.app = "eduverso"` so that they do not receive a laboratory profile. The trigger now excludes `app='eixo'` (existing behavior) and `app='eduverso'`, while preserving the existing lab profile creation behavior for other users. Do not remove this app tag.

The commercial paywall in `proxy.ts` also protects the lesson API routes `/api/medicina/*` and `/api/materiais/*` if enabled.
