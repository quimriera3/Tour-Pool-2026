// app/api/admin/route.js
//
// Server-side only. Checks the password against ADMIN_PASSWORD (set in
// Vercel > Settings > Environment Variables -- never NEXT_PUBLIC_, so it's
// never sent to the browser), then uses the service role key to pull
// everything: real emails (from Supabase Auth, not from our own tables),
// names, every stage pick, and every jersey pick.
import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import { STAGES, riderById } from "../../../lib/data";

export async function POST(request) {
  const { password } = await request.json();

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "ADMIN_PASSWORD is not set on the server." }, { status: 500 });
  }
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }
  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Service role key is not configured on the server." }, { status: 500 });
  }

  // Real emails + signup dates live in Supabase Auth, not in our own tables.
  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 });
  if (authError) {
    return NextResponse.json({ error: authError.message }, { status: 500 });
  }

  const [{ data: profiles }, { data: picks }, { data: finals }] = await Promise.all([
    supabaseAdmin.from("profiles").select("id, name, email_opt_in, preferred_language"),
    supabaseAdmin.from("picks").select("user_id, stage_number, rider_id"),
    supabaseAdmin.from("finals").select("user_id, yellow, green, polka, white"),
  ]);

  const nameById = {};
  const optInById = {};
  const langById = {};
  (profiles || []).forEach((p) => {
    nameById[p.id] = p.name;
    optInById[p.id] = p.email_opt_in === true;
    langById[p.id] = p.preferred_language || "en";
  });

  const picksByUser = {};
  (picks || []).forEach((p) => {
    picksByUser[p.user_id] = picksByUser[p.user_id] || {};
    picksByUser[p.user_id][p.stage_number] = riderById(p.rider_id)?.name || p.rider_id;
  });

  const finalsByUser = {};
  (finals || []).forEach((f) => {
    finalsByUser[f.user_id] = f;
  });

  const users = (authData?.users || []).map((u) => {
    const userFinals = finalsByUser[u.id] || {};
    return {
      id: u.id,
      email: u.email,
      name: nameById[u.id] || "(no name set)",
      joined: u.created_at,
      lastSignIn: u.last_sign_in_at,
      emailOptIn: optInById[u.id] !== false,
      preferredLanguage: langById[u.id] || "en",
      stagesPicked: Object.keys(picksByUser[u.id] || {}).length,
      picks: picksByUser[u.id] || {},
      finals: {
        yellow: userFinals.yellow ? riderById(userFinals.yellow)?.name || userFinals.yellow : null,
        green: userFinals.green ? riderById(userFinals.green)?.name || userFinals.green : null,
        polka: userFinals.polka ? riderById(userFinals.polka)?.name || userFinals.polka : null,
        white: userFinals.white ? riderById(userFinals.white)?.name || userFinals.white : null,
      },
    };
  });

  return NextResponse.json({ users, totalStages: STAGES.length });
}
