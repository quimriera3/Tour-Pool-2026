-- supabase-migration-multi-race.sql  (v2)
--
-- Adds multi-race support: every pick, result and jersey prediction is tagged
-- with the race it belongs to, so the Tour, the Vuelta, the Giro, classics and
-- the Worlds can all coexist without mixing anyone's data.
--
-- SAFE TO RUN ON LIVE DATA. Existing rows are backfilled as Tour de France
-- 2026 (the only race that existed before), so nothing is lost and the Tour
-- leaderboard keeps working exactly as it did.
--
-- v2 change: this version CREATES any table that doesn't exist yet before
-- altering it. The first version assumed every table from the original schema
-- was already present; on a database where `final_results` had never been
-- created, the whole migration aborted. Everything here is idempotent, so it
-- is safe to run again even if part of it succeeded before.
--
-- HOW TO RUN
--   Supabase dashboard > SQL Editor > New query > paste this whole file > Run.
--
-- IMPORTANT: run this BEFORE deploying the multi-race code.

begin;

-- ---------------------------------------------------------------------------
-- 0. Make sure every table exists (no-ops if they already do)
-- ---------------------------------------------------------------------------
create table if not exists picks (
  user_id uuid not null references profiles(id) on delete cascade,
  stage_number int not null,
  rider_id text not null,
  created_at timestamptz default now(),
  primary key (user_id, stage_number)
);

create table if not exists results (
  stage_number int primary key,
  first text,
  second text,
  third text
);

create table if not exists finals (
  user_id uuid primary key references profiles(id) on delete cascade,
  yellow text,
  green text,
  polka text,
  white text,
  created_at timestamptz default now()
);

create table if not exists final_results (
  id int primary key default 1,
  yellow text,
  green text,
  polka text,
  white text
);

-- ---------------------------------------------------------------------------
-- 1. picks
-- ---------------------------------------------------------------------------
alter table picks
  add column if not exists race text not null default 'tour-de-france-2026';

-- The primary key must include the race, otherwise a user could only ever have
-- one pick for "stage 3" across all races combined.
alter table picks drop constraint if exists picks_pkey;
alter table picks add primary key (user_id, race, stage_number);

create index if not exists picks_race_idx on picks (race);

-- ---------------------------------------------------------------------------
-- 2. results
-- ---------------------------------------------------------------------------
alter table results
  add column if not exists race text not null default 'tour-de-france-2026';

alter table results drop constraint if exists results_pkey;
alter table results add primary key (race, stage_number);

-- ---------------------------------------------------------------------------
-- 3. finals (each user's jersey predictions)
-- ---------------------------------------------------------------------------
alter table finals
  add column if not exists race text not null default 'tour-de-france-2026';

alter table finals drop constraint if exists finals_pkey;
alter table finals add primary key (user_id, race);

create index if not exists finals_race_idx on finals (race);

-- ---------------------------------------------------------------------------
-- 4. final_results (the real jersey winners)
-- ---------------------------------------------------------------------------
-- Previously a single fixed row (id = 1). Now one row per race.
alter table final_results
  add column if not exists race text not null default 'tour-de-france-2026';

alter table final_results drop constraint if exists final_results_pkey;
alter table final_results add primary key (race);

-- `id` is no longer the key, so it must not be required.
alter table final_results alter column id drop not null;

-- ---------------------------------------------------------------------------
-- 5. Row level security + public read policies (only added where missing)
-- ---------------------------------------------------------------------------
alter table picks enable row level security;
alter table results enable row level security;
alter table finals enable row level security;
alter table final_results enable row level security;

do $$
begin
  if not exists (select 1 from pg_policies where tablename = 'results' and policyname = 'Results are viewable by everyone') then
    create policy "Results are viewable by everyone" on results for select using (true);
  end if;

  if not exists (select 1 from pg_policies where tablename = 'final_results' and policyname = 'Final results are viewable by everyone') then
    create policy "Final results are viewable by everyone" on final_results for select using (true);
  end if;

  if not exists (select 1 from pg_policies where tablename = 'picks' and policyname = 'Picks are viewable by everyone') then
    create policy "Picks are viewable by everyone" on picks for select using (true);
  end if;

  if not exists (select 1 from pg_policies where tablename = 'picks' and policyname = 'Users manage their own picks') then
    create policy "Users manage their own picks" on picks for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
  end if;

  if not exists (select 1 from pg_policies where tablename = 'finals' and policyname = 'Finals are viewable by everyone') then
    create policy "Finals are viewable by everyone" on finals for select using (true);
  end if;

  if not exists (select 1 from pg_policies where tablename = 'finals' and policyname = 'Users manage their own finals') then
    create policy "Users manage their own finals" on finals for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
  end if;
end $$;

commit;

-- ---------------------------------------------------------------------------
-- Verify — run these separately AFTER the migration succeeds
-- ---------------------------------------------------------------------------
-- select race, count(*) from picks group by race;
-- select race, count(*) from results group by race;
-- select race, count(*) from finals group by race;
-- select * from final_results;
