-- =====================================================================
-- 002_triggers.sql
-- Auto-initializes a clients row when a user signs up with role=client.
-- Documented exactly as deployed on the live Supabase project:
-- SECURITY DEFINER + locked search_path to prevent privilege escalation.
-- =====================================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path to ''
as $$
begin
  -- only create a clients row when the new user's role is "client"
  if new.raw_user_meta_data ->> 'role' = 'client' then
    insert into public.clients (id, full_name, contact_email)
    values (
      new.id,
      new.raw_user_meta_data ->> 'full_name',
      new.email
    );
  end if;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
