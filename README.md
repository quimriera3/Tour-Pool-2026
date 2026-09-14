# Tour Pool 26

Tour de France 2026 stage prediction pool. Next.js + Supabase (real shared database).

## What's in this version

- 21 real 2026 Tour stages with elevation profile, elevation gain, and a link to a
  detailed stage page.
- Riders grouped by team, linked to ProCyclingStats.
- Sign up / log in (real accounts, shared across everyone -- backed by Supabase Auth).
- Stage predictions, locked automatically once each stage starts.
- Final classification predictions (Yellow / Green / Polka Dot / White jerseys).
- A shared leaderboard, calculated from everyone's real picks and the results you enter.

## One-time setup: Supabase (free)

This is the part that makes the leaderboard "real" -- shared by everyone, not just
saved in your own browser.

1. Go to **supabase.com** and create a free account, then "New Project".
2. Once it's created, go to the **SQL Editor** (left sidebar) > "New query".
3. Open `supabase-schema.sql` in this folder, copy ALL of it, paste it into the SQL
   Editor, and click **Run**. This creates the 4 tables the app needs.
4. Go to **Authentication > Providers > Email** (left sidebar) and turn **OFF**
   "Confirm email". This lets people sign up and play immediately, without having
   to click a confirmation link in their inbox.
5. Go to **Project Settings > API** (left sidebar). You'll see two values:
   - **Project URL**
   - **anon public** key
   Keep this tab open, you'll need to copy these into Vercel next.

## Connect Vercel to Supabase

1. Go to your project on **vercel.com**, then **Settings > Environment Variables**.
2. Add two variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = the Project URL from Supabase
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = the anon public key from Supabase
3. Save, then go to **Deployments**, open the latest one, and click **Redeploy**
   (environment variable changes only take effect on a new deployment).

## How to enter each day's real results during the Tour

1. Go to your Supabase project > **Table Editor** > `results` table.
2. Click **Insert row**.
3. Fill in:
   - `stage_number`: the stage number (1-21)
   - `first`, `second`, `third`: the rider **id** (not the full name) of who finished
     1st/2nd/3rd -- e.g. `pogacar`, `vingegaard`, `philipsen`. You'll find every
     rider's id in `lib/data.js` (the `id` field of each rider).
4. Save. The leaderboard updates automatically for everyone, instantly.

This takes about a minute a day during the Tour -- no coding needed once it's set up.

## Local development

```
npm install
npm run dev
```

You'll need a `.env.local` file with the same two Supabase variables as above for
local testing:
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

## Still to do before a real public launch

1. **Official rider startlist** -- replace the sample `RIDERS` list in `lib/data.js`
   with the confirmed 2026 squads once teams announce them (a few days before
   July 4), ideally with real bookmaker odds per stage instead of the estimated
   `scores`.
2. **Double-check ProCyclingStats links** -- the `pcsSlug` field on each rider is a
   best guess at their PCS URL; a few may need correcting.
3. **Custom domain** -- optional, connect one from Vercel's Domains settings.
4. **Elevation gain figures** -- several stages use estimated values; verify against
   letour.fr's official stage pages when you have a moment (see comments in
   `lib/data.js`).
