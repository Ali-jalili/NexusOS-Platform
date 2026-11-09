-- =====================================================================
-- 004_approve_request.sql
-- Atomic approve flow: create the project, update the client profile,
-- and mark the request approved — all in ONE transaction.
--
-- Called from the client:
--   supabase.rpc('approve_request', { p_request_id: <uuid> })
--
-- SECURITY DEFINER so it can write to tables the caller's role-based
-- RLS might otherwise restrict; the function itself enforces that the
-- caller's JWT claim is 'admin', so only admins can run it.
-- =====================================================================

create or replace function public.approve_request(p_request_id uuid)
returns public.requests
language plpgsql
security definer
set search_path to ''
as $$
declare
  v_req    public.requests%rowtype;
  approved public.requests;
begin
  -- caller must be an admin (custom JWT claim)
  if (auth.jwt() ->> 'user_role') is distinct from 'admin' then
    raise exception 'approve_request: admin role required'
      using errcode = '42501'; -- insufficient_privilege
  end if;

  select * into v_req
  from public.requests
  where id = p_request_id
  for update;

  if not found then
    raise exception 'approve_request: request % not found', p_request_id;
  end if;

  if v_req.status <> 'pending' then
    raise exception 'approve_request: request % is not pending (current: %)',
      p_request_id, v_req.status;
  end if;

  -- 1) create the project
  insert into public.projects (title, description, budget, client_id, status)
  values (
    v_req.project_title,
    v_req.project_description,
    nullif(v_req.budget, '')::numeric, -- empty string -> NULL, never a cast error
    v_req.client_id,
    'pending'
  );

  -- 2) sync the client profile with the request's contact data
  update public.clients
  set company_name = v_req.company_name,
      phone        = v_req.phone
  where id = v_req.client_id;

  -- 3) mark the request approved
  update public.requests
  set status = 'approved'
  where id = p_request_id
  returning * into approved;

  return approved;
exception
  when others then
    -- any failure aborts the whole transaction (atomicity)
    raise;
end;
$$;

grant execute on function public.approve_request(uuid) to authenticated;
