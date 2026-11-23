-- Prepare Eduverso for two distinct Kiwify products.
-- Target: the existing shared Supabase project containing eduverso_purchases
-- and eduverso_entitlements. No EIXO/Toledo tables or auth settings are changed.
-- Apply BEFORE deploying the dual-product webhook receiver.

BEGIN;

ALTER TABLE public.eduverso_purchases
  ADD COLUMN IF NOT EXISTS plan_type text;

ALTER TABLE public.eduverso_entitlements
  ADD COLUMN IF NOT EXISTS plan_type text;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'public.eduverso_purchases'::regclass
      AND conname = 'eduverso_purchases_plan_type_check'
  ) THEN
    ALTER TABLE public.eduverso_purchases
      ADD CONSTRAINT eduverso_purchases_plan_type_check
      CHECK (plan_type IN ('estudante', 'professor'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'public.eduverso_entitlements'::regclass
      AND conname = 'eduverso_entitlements_plan_type_check'
  ) THEN
    ALTER TABLE public.eduverso_entitlements
      ADD CONSTRAINT eduverso_entitlements_plan_type_check
      CHECK (plan_type IN ('estudante', 'professor'));
  END IF;
END $$;

-- Keep entitlement reconciliation in the existing private schema.
-- Professor takes precedence when a confirmed account owns both plans.
-- If Professor is refunded, a separate active Estudante purchase remains valid.
CREATE OR REPLACE FUNCTION private.eduverso_reconcile_buyer(p_email text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
DECLARE
  v_user uuid;
  v_order text;
  v_plan text;
BEGIN
  FOR v_user IN
    SELECT a.id
      FROM auth.users a
      JOIN public.eduverso_profiles prof ON prof.user_id = a.id
     WHERE lower(a.email) = lower(p_email)
       AND a.email_confirmed_at IS NOT NULL
  LOOP
    v_order := NULL;
    v_plan := NULL;

    SELECT p.order_id, p.plan_type
      INTO v_order, v_plan
      FROM public.eduverso_purchases p
     WHERE p.buyer_email = lower(p_email)
       AND p.payment_status = 'paid'
       AND p.plan_type IN ('estudante', 'professor')
     ORDER BY
       CASE p.plan_type WHEN 'professor' THEN 0 ELSE 1 END,
       p.updated_at DESC, p.order_id DESC
     LIMIT 1;

    IF v_order IS NOT NULL THEN
      INSERT INTO public.eduverso_entitlements
        (user_id, status, source_order_id, plan_type, granted_at, updated_at)
      VALUES (v_user, 'active', v_order, v_plan, now(), now())
      ON CONFLICT (user_id) DO UPDATE
      SET status = 'active',
          source_order_id = EXCLUDED.source_order_id,
          plan_type = EXCLUDED.plan_type,
          updated_at = now(),
          granted_at = COALESCE(public.eduverso_entitlements.granted_at, now());
    ELSE
      UPDATE public.eduverso_entitlements
         SET status = 'inactive', source_order_id = NULL,
             plan_type = NULL, updated_at = now()
       WHERE user_id = v_user
         AND (status <> 'inactive' OR plan_type IS NOT NULL);
    END IF;
  END LOOP;
END
$function$;

COMMIT;
