-- supabase-schema.sql
-- Copy this whole file into the Supabase SQL Editor (SQL Editor > New query) and
-- click "Run". It creates the 3 tables the app needs and sets up access rules
-- (Row Level Security) so everyone can read the leaderboard data, but people can
-- only write their own picks/predictions.

-- Profiles: one row per signed-up user, used to show names on the leaderboard.
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  email_opt_in boolean default true,
  preferred_language text default 'en',
  created_at timestamptz default now()
);
alter table profiles enable row level security;
create policy "Profiles are viewable by everyone" on profiles for select using (true);
create policy "Users can insert own profile" on profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- If you already ran this file before, run these once on their own to add
-- the new columns to your existing table without losing data:
-- alter table profiles add column if not exists email_opt_in boolean default true;
-- alter table profiles add column if not exists preferred_language text default 'en';

-- Picks: one row per user per stage, the rider they predicted to win.
create table if not exists picks (
  user_id uuid references profiles(id) on delete cascade,
  stage_number int not null,
  rider_id text not null,
  updated_at timestamptz default now(),
  primary key (user_id, stage_number)
);
alter table picks enable row level security;
create policy "Picks are viewable by everyone" on picks for select using (true);
create policy "Users can insert own picks" on picks for insert with check (auth.uid() = user_id);
create policy "Users can update own picks" on picks for update using (auth.uid() = user_id);

-- Results: the real top 3 of each stage. YOU enter these yourself, directly in the
-- Supabase Table Editor (Table Editor > results > Insert row), one row per stage,
-- after each stage finishes. There is deliberately no public write policy here,
-- so visitors can never edit results -- only you, from the Supabase dashboard.
create table if not exists results (
  stage_number int primary key,
  first text not null,
  second text not null,
  third text not null
);
alter table results enable row level security;
create policy "Results are viewable by everyone" on results for select using (true);

-- Finals: each user's prediction for the 4 end-of-Tour jerseys.
create table if not exists finals (
  user_id uuid primary key references profiles(id) on delete cascade,
  yellow text,
  green text,
  polka text,
  white text,
  updated_at timestamptz default now()
);
alter table finals enable row level security;
create policy "Finals are viewable by everyone" on finals for select using (true);
create policy "Users can insert own finals" on finals for insert with check (auth.uid() = user_id);
create policy "Users can update own finals" on finals for update using (auth.uid() = user_id);

-- Final results: the REAL winner of each of the 4 jerseys once the Tour ends.
-- Just like "results", YOU enter this yourself in the Supabase Table Editor
-- (Table Editor > final_results > Insert row) -- a single row with id = 1.
-- There's only ever one row here, since there's only one real outcome.
-- Each correct jersey pick is worth 20 points on the leaderboard.
create table if not exists final_results (
  id int primary key default 1,
  yellow text,
  green text,
  polka text,
  white text
);
alter table final_results enable row level security;
create policy "Final results are viewable by everyone" on final_results for select using (true);
