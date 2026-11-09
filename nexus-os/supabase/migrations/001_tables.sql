-- =====================================================================
-- 001_tables.sql
-- Canonical schema for NexusOS (documentation of the live Supabase DB).
-- Apply only to a FRESH database; on the existing project the tables
-- already exist and these are kept as the reference migration.
-- =====================================================================

-- clients (auto-created by trigger when a user signs up with role=client)
create table if not exists public.clients (
  id            uuid primary key, -- mirrors auth.users.id
  full_name     text,
  contact_email text,
  company_name  text,
  phone         text,
  created_at    timestamptz not null default now()
);

-- requests
create table if not exists public.requests (
  id                 uuid primary key default gen_random_uuid(),
  project_title      text not null,
  project_description text,
  budget             numeric,
  phone              text,
  company_name       text,
  contact_email      text,
  client_id          uuid not null references public.clients (id),
  status             text not null default 'pending'
                     check (status in ('pending', 'approved', 'rejected', 'cancelled')),
  reject_reason      text,
  created_at         timestamptz not null default now()
);

create index if not exists requests_status_idx on public.requests (status);
create index if not exists requests_client_idx on public.requests (client_id);

-- projects
create table if not exists public.projects (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  description  text,
  budget       numeric,
  status       text not null default 'pending'
               check (status in ('pending', 'in_progress', 'completed', 'cancelled')),
  client_id    uuid references public.clients (id),
  developer_id uuid references public.developers (id),
  created_at   timestamptz not null default now()
);

create index if not exists projects_client_idx   on public.projects (client_id);
create index if not exists projects_developer_idx on public.projects (developer_id);

-- developers (existing table in the schema; no hire/approve flow is
-- implemented in the current product, rows are not created by the app)
create table if not exists public.developers (
  id         uuid primary key, -- mirrors auth.users.id
  full_name  text,
  email      text,
  specialty  text,
  created_at timestamptz not null default now()
);

-- candidates (applicant pipeline)
create table if not exists public.candidates (
  id         uuid primary key default gen_random_uuid(),
  full_name  text,
  email      text,
  specialty  text,
  resume_url text,
  status     text not null default 'pending'
             check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

create index if not exists candidates_status_idx on public.candidates (status);
