import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { getRace, ACTIVE_RACE_SLUG } from "../../../../lib/races";
import { riderById } from "../../../../lib/data";
import { buildStageResultEmail } from "../../../../lib/emailTemplate";

export async function POST(request) {
  const { password, race: requestedRace, stageNumber, testEmail } = await request.json();
  if (!process.env.ADMIN_PASSWORD) return NextResponse.json({ error: "ADMIN_PASSWORD is not set on the server." }, { status: 500 });
  if (password !== process.env.ADMIN_PASSWORD) return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  if (!supabaseAdmin) return NextResponse.json({ error: "Service role key is not configured on the server." }, { status: 500 });
  if (!process.env.RESEND_API_KEY) return NextResponse.json({ error: "RESEND_API_KEY is not set on the server." }, { status: 500 });

  const race = getRace(requestedRace || ACTIVE_RACE_SLUG);
  if (!race) return NextResponse.json({ error: "Unknown race." }, { status: 400 });
  const n = Number(stageNumber);
  const stage = race.stages.find((s) => s.n === n);
  if (!stage) return NextResponse.json({ error: "Unknown event." }, { status: 400 });

  const { data: result, error: resultError } = await supabaseAdmin.from("results")
    .select("first, second, third").eq("race", race.slug).eq("stage_number", n).maybeSingle();
  if (resultError) return NextResponse.json({ error: resultError.message }, { status: 500 });
  if (!result?.first || !result?.second || !result?.third) return NextResponse.json({ error: "Save a complete podium before sending the result email." }, { status: 400 });

  const podium = [result.first, result.second, result.third].map((id) => riderById(id, race));
  if (podium.some((r) => !r)) return NextResponse.json({ error: "A result rider is no longer present in this race's startlist." }, { status: 400 });

  let recipients = [];
  if (testEmail) {
    recipients = [{ email: testEmail, lang: "en" }];
  } else {
    const [{ data: authData, error: authError }, { data: profiles, error: profileError }] = await Promise.all([
      supabaseAdmin.auth.admin.listUsers({ perPage: 1000 }),
      supabaseAdmin.from("profiles").select("id, email_opt_in, preferred_language"),
    ]);
    if (authError || profileError) return NextResponse.json({ error: authError?.message || profileError?.message }, { status: 500 });
    const pById = Object.fromEntries((profiles || []).map((p) => [p.id, p]));
    recipients = (authData?.users || []).filter((u) => u.email && pById[u.id]?.email_opt_in === true)
      .map((u) => ({ email: u.email, lang: pById[u.id]?.preferred_language || "en" }));
  }
  if (!recipients.length) return NextResponse.json({ error: "No opted-in recipients." }, { status: 400 });

  const FROM = process.env.RESEND_FROM || "Grand Tour Pool <onboarding@resend.dev>";
  let sent = 0;
  const errors = [];
  const groups = recipients.reduce((acc, r) => ((acc[r.lang] ||= []).push(r), acc), {});
  for (const [lang, group] of Object.entries(groups)) {
    const { subject, html } = buildStageResultEmail({ lang, stage, winnerName: podium[0].name, secondName: podium[1].name, thirdName: podium[2].name, raceSlug: race.slug });
    for (let i = 0; i < group.length; i += 100) {
      const batch = group.slice(i, i + 100);
      const res = await fetch("https://api.resend.com/emails/batch", {
        method: "POST",
        headers: { Authorization: "Bearer " + process.env.RESEND_API_KEY, "Content-Type": "application/json" },
        body: JSON.stringify(batch.map((r) => ({ from: FROM, to: [r.email], subject, html }))),
      });
      if (res.ok) sent += batch.length;
      else errors.push((await res.json().catch(() => ({}))).message || `Batch failed (${res.status})`);
    }
  }
  return NextResponse.json({ ok: errors.length === 0, sent, total: recipients.length, errors });
}
