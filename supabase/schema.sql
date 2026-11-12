-- Lead storage for the CLANNOVA enquiry form. Run in the Supabase SQL editor.
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  company text,
  email text not null,
  phone text not null,
  industry text not null,
  service text not null,
  budget text not null,
  description text not null,
  user_agent text,
  status text not null default 'new'
);

-- Only the server (service role) writes; nobody reads via the public API.
alter table public.leads enable row level security;
