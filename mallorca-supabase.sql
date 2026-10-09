-- Mallorca Friends Tour 2026 · classificacions compartides (sense porra)
-- Segur d'executar de nou. No esborra dades existents de Grand Tour Pool.
create table if not exists public.mallorca_tour_state (
  id text primary key,
  state jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.mallorca_tour_state enable row level security;
-- Sense policies públiques: només les API Next.js del servidor poden llegir i escriure amb service role.
insert into public.mallorca_tour_state (id,state)
values ('2026', '{"results":{},"combative":{},"aura":{},"finalized":false}'::jsonb)
on conflict (id) do nothing;
