// app/api/admin/save-result/route.js
//
// Server-side only. Called from the admin panel's "Stage results" section.
// Does two things in one request:
//   1. Upserts the stage's real top 3 into Supabase (results table) using
//      the service role key -- there is deliberately no public write policy
//      on that table, so this route (gated by ADMIN_PASSWORD) is the only
//      way in besides the Supabase dashboard itself.
//   2. Immediately emails everyone who opted in (in their own preferred
//      language, no translation API needed -- see lib/emailTemplate.js)
//      announcing the podium, with a link to the leaderboard and to make
//      their pick for the next stage.
// A failed email send never undoes the saved result -- the result is the
// source of truth for scoring; the email is a courtesy notification.
import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { STAGES, riderById } from "../../../../lib/data";
import { buildStageResultEmail } from "../../../../lib/emailTemplate";

export async function POST(request) {
  const { password, stageNumber, first, second, third } = await request.json();

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "ADMIN_PASSWORD is not set on the server." }, { status: 500 });
  }
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }
  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Service role key is not configured on the server." }, { status: 500 });
  }

  const n = parseInt(stageNumber, 10);
  const stage = STAGES.find((s) => s.n === n);
  if (!stage) {
    return NextResponse.json({ error: "Not a valid stage number." }, { status: 400 });
  }
  if (!first || !second || !third) {
    return NextResponse.json({ error: "Winner, 2nd and 3rd are all required." }, { status: 400 });
  }
  if (first === second || first === third || second === third) {
    return NextResponse.json({ error: "Winner, 2nd and 3rd must be three different riders." }, { status: 400 });
  }
  const winnerRider = riderById(first);
  const secondRider = riderById(second);
  const thirdRider = riderById(third);
  if (!winnerRider || !secondRider || !thirdRider) {
    return NextResponse.json({ error: "One of the selected riders was not recognised." }, { status: 400 });
  }

  const { error: upsertError } = await supabaseAdmin
    .from("results")
    .upsert({ stage_number: n, first, second, third }, { onConflict: "stage_number" });

  if (upsertError) {
    return NextResponse.json({ error: upsertError.message }, { status: 500 });
  }

  // --- Result saved. Now notify everyone opted in. ---
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ ok: true, saved: true, emailed: false, warning: "RESEND_API_KEY not set -- result saved, no email sent." });
  }

  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 });
  const { data: profiles, error: profileError } = await supabaseAdmin
    .from("profiles")
    .select("id, name, email_opt_in, preferred_language");

  if (authError || profileError) {
    return NextResponse.json({
      ok: true,
      saved: true,
      emailed: false,
      warning: "Result saved, but could not load recipients to email: " + (authError?.message || profileError?.message),
    });
  }

  const optInById = {};
  const langById = {};
  (profiles || []).forEach((p) => {
    optInById[p.id] = p.email_opt_in === true;
    langById[p.id] = p.preferred_language || "en";
  });

  const optedInIds = new Set(Object.keys(optInById).filter((id) => optInById[id]));
  const recipients = (authData?.users || [])
    .filter((u) => optedInIds.has(u.id) && u.email)
    .map((u) => ({ email: u.email, lang: langById[u.id] || "en" }));

  if (recipients.length === 0) {
    return NextResponse.json({ ok: true, saved: true, emailed: false, warning: "Result saved. No opted-in recipients to email." });
  }

  const groups = {};
  recipients.forEach((r) => {
    groups[r.lang] = groups[r.lang] || [];
    groups[r.lang].push(r);
  });

  const FROM = process.env.RESEND_FROM || "Tour de France Pool <onboarding@resend.dev>";
  let sent = 0;
  let total = 0;
  const errors = [];

  for (const groupLang of Object.keys(groups)) {
    const groupRecipients = groups[groupLang];
    total += groupRecipients.length;

    const { subject, html } = buildStageResultEmail({
      lang: groupLang,
      stage,
      winnerName: winnerRider.name,
      secondName: secondRider.name,
      thirdName: thirdRider.name,
    });

    const batches = [];
    for (let i = 0; i < groupRecipients.length; i += 100) {
      batches.push(groupRecipients.slice(i, i + 100));
    }

    for (const batch of batches) {
      const payload = batch.map((r) => ({
        from: FROM,
        to: [r.email],
        subject,
        html,
      }));

      const res = await fetch("https://api.resend.com/emails/batch", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + process.env.RESEND_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        sent += batch.length;
      } else {
        const errBody = await res.json().catch(() => ({}));
        errors.push(errBody.message || "Batch failed with status " + res.status);
      }
    }
  }

  return NextResponse.json({ ok: true, saved: true, emailed: true, sent, total, errors });
}
