import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import { getRace, ACTIVE_RACE_SLUG, localised, hasJerseys } from "../../../lib/races";
import { riderById } from "../../../lib/data";

function authorized(password) {
  return process.env.ADMIN_PASSWORD && password === process.env.ADMIN_PASSWORD;
}

export async function POST(request) {
  const { password, race: requestedRace } = await request.json();
  if (!process.env.ADMIN_PASSWORD) return NextResponse.json({ error: "ADMIN_PASSWORD is not set on the server." }, { status: 500 });
  if (!authorized(password)) return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  if (!supabaseAdmin) return NextResponse.json({ error: "Service role key is not configured on the server." }, { status: 500 });

  const race = getRace(requestedRace || ACTIVE_RACE_SLUG);
  if (!race) return NextResponse.json({ error: "Unknown race." }, { status: 400 });

  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 });
  if (authError) return NextResponse.json({ error: authError.message }, { status: 500 });

  const [profilesRes, picksRes, finalsRes, resultsRes, finalResultsRes] = await Promise.all([
    supabaseAdmin.from("profiles").select("id, name, email_opt_in, preferred_language"),
    supabaseAdmin.from("picks").select("user_id, stage_number, rider_id").eq("race", race.slug),
    supabaseAdmin.from("finals").select("user_id, yellow, green, polka, white").eq("race", race.slug),
    supabaseAdmin.from("results").select("stage_number, first, second, third").eq("race", race.slug),
    supabaseAdmin.from("final_results").select("yellow, green, polka, white").eq("race", race.slug).maybeSingle(),
  ]);

  const dbError = [profilesRes, picksRes, finalsRes, resultsRes, finalResultsRes].find((r) => r.error)?.error;
  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 });

  const profiles = profilesRes.data || [];
  const picks = picksRes.data || [];
  const finals = finalsRes.data || [];
  const results = resultsRes.data || [];
  const finalResultsRow = finalResultsRes.data || {};

  const profileById = Object.fromEntries(profiles.map((p) => [p.id, p]));
  const picksByUser = {};
  for (const p of picks) {
    picksByUser[p.user_id] ||= {};
    picksByUser[p.user_id][p.stage_number] = riderById(p.rider_id, race)?.name || p.rider_id;
  }
  const finalsByUser = Object.fromEntries(finals.map((f) => [f.user_id, f]));

  const users = (authData?.users || []).map((u) => {
    const profile = profileById[u.id] || {};
    const userFinals = finalsByUser[u.id] || {};
    return {
      id: u.id,
      email: u.email,
      name: profile.name || "(no name set)",
      joined: u.created_at,
      lastSignIn: u.last_sign_in_at,
      hasProfile: Boolean(profileById[u.id]),
      emailOptIn: profile.email_opt_in === true,
      preferredLanguage: profile.preferred_language || "en",
      stagesPicked: Object.keys(picksByUser[u.id] || {}).length,
      picks: picksByUser[u.id] || {},
      finals: hasJerseys(race) ? {
        yellow: userFinals.yellow ? riderById(userFinals.yellow, race)?.name || userFinals.yellow : null,
        green: userFinals.green ? riderById(userFinals.green, race)?.name || userFinals.green : null,
        polka: userFinals.polka ? riderById(userFinals.polka, race)?.name || userFinals.polka : null,
        white: userFinals.white ? riderById(userFinals.white, race)?.name || userFinals.white : null,
      } : {},
    };
  });

  const resultsByStage = Object.fromEntries(results.map((r) => [r.stage_number, { first: r.first, second: r.second, third: r.third }]));

  return NextResponse.json({
    users,
    totalStages: race.stages.length,
    results: resultsByStage,
    finalResults: finalResultsRow,
    race: {
      slug: race.slug,
      name: localised(race.name, "en"),
      category: race.category || null,
      type: race.type,
      hasJerseys: hasJerseys(race),
      stages: race.stages.map((s) => ({ n: s.n, date: s.date, startTime: s.startTime, from: s.from, to: s.to, km: s.km, eventName: localised(s.eventName, "en") || null })),
    },
  });
}
