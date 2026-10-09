-- Grand Tour Pool / Mallorca Friends Tour 2026
-- Executa una vegada a Supabase > SQL Editor; no modifica cap taula existent del Mundial.
create table if not exists public.mallorca_tour_state (
  id text primary key,
  state jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
create table if not exists public.mallorca_tour_picks (
  nickname text primary key,
  pin_hash text not null,
  picks jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.mallorca_tour_state enable row level security;
alter table public.mallorca_tour_picks enable row level security;
-- Sense policies públiques; només les rutes Next.js amb service role poden accedir-hi.
insert into public.mallorca_tour_state(id,state) values ('2026','{"results":{},"combative":{},"locks":{},"finalized":false}'::jsonb) on conflict (id) do nothing;
