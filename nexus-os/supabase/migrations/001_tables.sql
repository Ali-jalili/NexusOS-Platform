-- =====================================================================
-- 001_tables.sql
-- Exact schema observed in the live Supabase database.
-- Apply only to a fresh database. Existing databases are not altered by
-- this reference migration.
-- =====================================================================

create table if not exists public.clients (
  id            uuid primary key default gen_random_uuid(),
  full_name     text not null,
  company_name  text,
  contact_email text,
  phone         text,
  created_at    timestamptz default now()
);

create table if not exists public.developers (
  id         uuid primary key default gen_random_uuid(),
  full_name  text not null,
  email      text,
  specialty  text,
  created_at timestamptz default now(),
  phone      text
);

create table if not exists public.candidates (
  id         uuid primary key default gen_random_uuid(),
  full_name  text not null,
  email      text,
  specialty  text,
  resume_url text,
  created_at timestamptz default now()
);

create table if not exists public.requests (
  id                  uuid primary key default gen_random_uuid(),
  company_name        text,
  budget              text,
  project_description text,
  status              text default 'pending'::text,
  created_at          timestamptz default now(),
  contact_email       text,
  phone               text,
  client_id           uuid,
  project_title       text,
  reject_reason       text
);

create table if not exists public.projects (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  description  text,
  status       text default 'pending'::text,
  budget       numeric,
  progress     smallint default 0,
  client_id    uuid,
  developer_id uuid,
  created_at   timestamptz default now()
);

-- The live database contains this foreign key as NOT VALID.
alter table public.projects
  add constraint fk_projects_client
  foreign key (client_id)
  references public.clients (id)
  not valid;
