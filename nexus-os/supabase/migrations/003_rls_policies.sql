-- =====================================================================
-- 003_rls_policies.sql
-- Row Level Security policies, documented 1:1 from the live database
-- (verified via pg_policies on 2026-11-09).
--
-- Role gating relies on a CUSTOM JWT CLAIM named "user_role" injected
-- server-side (Supabase Custom JWT Hook). Clients cannot forge or
-- modify this claim, unlike user_metadata / app_metadata.
-- =====================================================================

alter table public.requests   enable row level security;
alter table public.clients    enable row level security;
alter table public.developers enable row level security;
alter table public.projects   enable row level security;
alter table public.candidates enable row level security;

-- ------------------------------------------------------------------
-- requests
-- ------------------------------------------------------------------
create policy admin_manage_requests on public.requests
  for all
  to authenticated
  using ((auth.jwt() ->> 'user_role'::text) = 'admin'::text)
  with check ((auth.jwt() ->> 'user_role'::text) = 'admin'::text);

create policy client_select_own_requests on public.requests
  for select
  to authenticated
  using (client_id = auth.uid());

create policy client_insert_own_requests on public.requests
  for insert
  to authenticated
  with check (
    ((auth.jwt() ->> 'user_role'::text) = 'client'::text)
    or ((auth.jwt() ->> 'user_role'::text) = 'admin'::text)
  );

create policy client_update_own_requests on public.requests
  for update
  to authenticated
  using (client_id = auth.uid());

create policy client_delete_own_requests on public.requests
  for delete
  to authenticated
  using (client_id = auth.uid());

-- ------------------------------------------------------------------
-- clients
-- ------------------------------------------------------------------
create policy admin_manage_clients on public.clients
  for all
  to authenticated
  using ((auth.jwt() ->> 'user_role'::text) = 'admin'::text)
  with check ((auth.jwt() ->> 'user_role'::text) = 'admin'::text);

create policy client_select_own_profile on public.clients
  for select
  to authenticated
  using (auth.uid() = id);

-- ------------------------------------------------------------------
-- developers
-- ------------------------------------------------------------------
create policy admin_manage_developers on public.developers
  for all
  to authenticated
  using ((auth.jwt() ->> 'user_role'::text) = 'admin'::text)
  with check ((auth.jwt() ->> 'user_role'::text) = 'admin'::text);

create policy developer_select_own_profile on public.developers
  for select
  to authenticated
  using (auth.uid() = id);

-- ------------------------------------------------------------------
-- projects
-- ------------------------------------------------------------------
create policy admin_manage_projects on public.projects
  for all
  to authenticated
  using ((auth.jwt() ->> 'user_role'::text) = 'admin'::text)
  with check ((auth.jwt() ->> 'user_role'::text) = 'admin'::text);

create policy client_select_own_projects on public.projects
  for select
  to authenticated
  using (client_id = auth.uid());

create policy developer_select_assigned_projects on public.projects
  for select
  to authenticated
  using (developer_id = auth.uid());

-- ------------------------------------------------------------------
-- candidates
-- ------------------------------------------------------------------
create policy admin_manage_candidates on public.candidates
  for all
  to authenticated
  using ((auth.jwt() ->> 'user_role'::text) = 'admin'::text)
  with check ((auth.jwt() ->> 'user_role'::text) = 'admin'::text);

create policy applicant_insert_candidates on public.candidates
  for insert
  to authenticated
  with check ((auth.jwt() ->> 'user_role'::text) = 'applicant'::text);

create policy developer_insert_candidates on public.candidates
  for insert
  to authenticated
  with check (
    (auth.jwt() ->> 'user_role'::text) = any (array['applicant'::text, 'developer'::text])
  );

-- REVIEW: this anon policy allows ANY unauthenticated caller to insert
-- into candidates. Documented here as-is for auditability; consider
-- removing it (or tightening with_check to validated fields) in a
-- follow-up migration.
create policy public_insert_candidates on public.candidates
  for insert
  to anon
  with check (true);
