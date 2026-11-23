-- Reconcile Eduverso Kiwify purchases when Supabase confirms a buyer's email.
-- The profile-created trigger already handles the other sequence (confirmation before profile).
-- This trigger is limited to existing Eduverso profiles and does not mutate EIXO/Toledo profiles.
BEGIN;

CREATE OR REPLACE FUNCTION private.eduverso_email_confirmed()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
BEGIN
  IF NEW.email_confirmed_at IS NOT NULL
     AND NEW.email IS NOT NULL
     AND EXISTS (SELECT 1 FROM public.eduverso_profiles ep WHERE ep.user_id = NEW.id)
  THEN
    PERFORM private.eduverso_reconcile_buyer(lower(NEW.email));
  END IF;
  RETURN NEW;
END
$function$;

DROP TRIGGER IF EXISTS eduverso_email_confirmed_trigger ON auth.users;
CREATE TRIGGER eduverso_email_confirmed_trigger
AFTER UPDATE OF email_confirmed_at ON auth.users
FOR EACH ROW
WHEN (NEW.email_confirmed_at IS NOT NULL
      AND OLD.email_confirmed_at IS DISTINCT FROM NEW.email_confirmed_at)
EXECUTE FUNCTION private.eduverso_email_confirmed();

COMMIT;
