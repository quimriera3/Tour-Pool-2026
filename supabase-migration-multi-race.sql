-- supabase-migration-multi-race.sql
--
-- Adds multi-race support: every pick, result and jersey prediction is now
-- tagged with the race it belongs to, so the Tour, the Vuelta, the Giro,
-- classics and the Worlds can all coexist without mixing anyone's data.
--
-- SAFE TO RUN ON LIVE DATA. Existing rows are backfilled as Tour de France
-- 2026 (the only race that existed before this migration), so nothing is lost
-- and the Tour leaderboard keeps working exactly as it did.
--
-- HOW TO RUN
--   Supabase dashboard > SQL Editor > New query > paste this whole file > Run.
--   It is idempotent: running it twice is harmless.
--
-- IMPORTANT: run this BEFORE deploying the multi-race code, not after. The new
-- code writes a `race` value on every pick; the old columns would reject it.

begin;

-- ---------------------------------------------------------------------------
-- 1. picks
-- ---------------------------------------------------------------------------
alter table picks
  add column if not exists race text not null default 'tour-de-france-2026';

-- The primary key must now include the race, otherwise a user could only ever
-- have one pick for "stage 3" across all races combined.
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
-- This table used a fixed single row (id = 1). It now holds one row per race,
-- keyed by the race itself.
alter table final_results
  add column if not exists race text not null default 'tour-de-france-2026';

alter table final_results drop constraint if exists final_results_pkey;
alter table final_results add primary key (race);

-- The old `id` column is no longer meaningful now that `race` is the key.
alter table final_results alter column id drop not null;

commit;

-- ---------------------------------------------------------------------------
-- Verify (run these separately to confirm the migration worked)
-- ---------------------------------------------------------------------------
-- select race, count(*) from picks group by race;
-- select race, count(*) from results group by race;
-- select race, count(*) from finals group by race;
-- select * from final_results;
