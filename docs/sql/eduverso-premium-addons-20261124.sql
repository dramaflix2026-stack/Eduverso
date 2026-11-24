-- Atlas Premium (24/11/2026): tabela independente, sem migração de usuários anteriores.
-- Aplicado inicialmente no projeto Supabase do Eduverso.
CREATE TABLE IF NOT EXISTS public.eduverso_addon_entitlements (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  addon text NOT NULL CHECK (addon IN ('atlas-premium','redacao-premium')),
  status text NOT NULL DEFAULT 'inactive' CHECK (status IN ('active','inactive')),
  source_order_id text,
  granted_at timestamptz,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, addon)
);
ALTER TABLE public.eduverso_addon_entitlements ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.eduverso_addon_entitlements FROM anon, authenticated, PUBLIC;
GRANT SELECT ON TABLE public.eduverso_addon_entitlements TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.eduverso_addon_entitlements TO service_role;
DROP POLICY IF EXISTS eduverso_addons_read_own ON public.eduverso_addon_entitlements;
CREATE POLICY eduverso_addons_read_own ON public.eduverso_addon_entitlements
  FOR SELECT TO authenticated USING ((SELECT auth.uid()) = user_id);
-- Compras Kiwify devem conceder/revogar apenas após verificação HMAC válida,
-- com idempotência, sem registrar autorizações a partir do navegador.
