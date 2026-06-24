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

-- ============================================================================
-- IMPORTANT FIX: auto-create a profile row whenever someone signs up.
--
-- Previously, the app tried to insert a profile row itself right after
-- sign-up, from the browser. If "Confirm email" is on (or there's any other
-- timing hiccup), there's a moment where the new user has no active session
-- yet, and Supabase's security rules correctly block that insert -- leaving
-- an account that can log in and play, but has no name or email preference
-- saved anywhere. This trigger removes that whole failure mode: profile
-- creation now happens automatically, inside the database itself, the
-- instant a new auth user is created, with no timing window for it to fail.
-- ============================================================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, email_opt_in, preferred_language)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    false, -- safe default until the app explicitly sets their real choice
    'en'
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer set search_path = public;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- One-off backfill: create a profile row for any existing account that's
-- missing one (the people this bug already affected). Their name is set
-- from their email as a placeholder -- edit it in Table Editor if you want
-- their real name. Their email_opt_in defaults to false (safe) since we
-- genuinely don't know what they chose; ask them or leave it off.
insert into public.profiles (id, name, email_opt_in, preferred_language)
select u.id, split_part(u.email, '@', 1), false, 'en'
from auth.users u
left join public.profiles p on p.id = u.id
where p.id is null
on conflict (id) do nothing;

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

-- Results: the real top 3 of each stage. Enter these from the admin panel
-- (/admin > Stage results, which also emails everyone opted in automatically),
-- or directly in the Supabase Table Editor (Table Editor > results > Insert
-- row) if you prefer. There is deliberately no public write policy here --
-- only the service role key (used server-side by the admin route) can write.
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
