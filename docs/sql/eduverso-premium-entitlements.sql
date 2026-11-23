-- This migration is intentionally NOT applied until Eduverso's own Supabase project is confirmed.
-- Run in the Eduverso project only, then configure payment fulfilment on a privileged backend.
create table if not exists public.eduverso_premium_entitlements (
 user_id uuid not null references auth.users(id) on delete cascade,
 product text not null check (product in ('atlas','redacao')),
 status text not null check (status in ('active','revoked','refunded','pending')),
 source text not null default 'manual' check (source in ('manual','kiwify')),
 order_reference text,
 granted_at timestamptz not null default now(),
 expires_at timestamptz,
 updated_at timestamptz not null default now(),
 primary key (user_id,product)
);
alter table public.eduverso_premium_entitlements enable row level security;
revoke all on public.eduverso_premium_entitlements from anon,authenticated;
grant select on public.eduverso_premium_entitlements to authenticated;
drop policy if exists "Owner reads premium purchases" on public.eduverso_premium_entitlements;
create policy "Owner reads premium purchases"
 on public.eduverso_premium_entitlements for select to authenticated
 using ((select auth.uid())=user_id);
-- NO INSERT / UPDATE / DELETE policy is intentionally granted to authenticated users.
-- Future Kiwify webhook must verify server-to-server signatures and map confirmed orders to the correct auth.user.
