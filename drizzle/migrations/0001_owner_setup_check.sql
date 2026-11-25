create or replace function public.owner_exists() returns boolean language sql stable security definer set search_path = public as $$ select exists (select 1 from public.user_roles where role = 'owner') or exists (select 1 from auth.users) $$;
revoke all on function public.owner_exists() from public;
grant execute on function public.owner_exists() to anon, authenticated;