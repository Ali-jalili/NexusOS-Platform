-- =====================================================================
-- 005_custom_access_token_hook.sql
-- Exact custom access-token hook observed in the live database.
-- The hook must also be selected in Supabase Dashboard > Authentication
-- > Hooks; dashboard activation is not represented by SQL migrations.
-- =====================================================================

create or replace function public.custom_access_token_hook(event jsonb)
returns jsonb
language plpgsql
stable
as $$
declare
  claims jsonb;
  user_role text;
begin
  if event->>'user_id' is not null then
    select coalesce(
      (raw_user_meta_data->>'role'),
      'client'
    )
    into user_role
    from auth.users
    where id = (event->>'user_id')::uuid;

    claims := event->'claims';
    claims := jsonb_set(claims, '{user_role}', to_jsonb(user_role));
    event := jsonb_set(event, '{claims}', claims);
  end if;

  return event;
end;
$$;
