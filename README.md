# Grand Tour Pool — Montréal 2026

Current public game: **2026 UCI Road World Championships** in Montréal.

## Stack

- Next.js 14.2.35
- Supabase Auth + Postgres
- Vercel
- English + Spanish full app; CA/FR/IT/NL editorial landing/preview pages

## Current game structure

The platform is multi-race. The active men's Worlds owns the root URLs and the
women's pool lives under `/women` (Spanish: `/es/women`). Men and women have
separate picks, results and leaderboards.

Each Worlds category has two independent events:

- Individual Time Trial
- Road Race

Road and ITT startlists are tracked separately in
`lib/races/worlds2026startlists.js`.

## Scoring

- Correct winner: 10 points
- Pick finishes 2nd: 5 points
- Pick finishes 3rd: 2 points
- Picks lock 1 hour before official start
- Picks auto-save; no submit button

## Important project rules

- Use plain `<a href>` links; do not introduce `next/link`.
- Any time-dependent client UI must avoid hydration mismatches.
- Always pass the race slug to pick/result/leaderboard store functions on shared
  pages so men's and women's data can never mix.
- `elevationGain` may be null.
- Optional email consent is only true when `email_opt_in === true`.
- Do not invent sporting data.

## Admin

`/admin` can switch between the men's and women's Worlds pools. Saving a result
and sending the result email are separate actions.

## Local check before pushing

```bash
npm ci
npm run build
```

Only push after the build succeeds.
