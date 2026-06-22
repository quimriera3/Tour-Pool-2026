// app/api/admin/send-email/route.js
//
// Server-side only. Sends an email to every user who opted in (profiles.
// email_opt_in = true), using Resend (resend.com). Requires RESEND_API_KEY
// to be set in Vercel's environment variables.
import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { buildEmailHtml, textToHtmlParagraphs } from "../../../../lib/emailTemplate";

export async function POST(request) {
  const { password, subject, message } = await request.json();

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "ADMIN_PASSWORD is not set on the server." }, { status: 500 });
  }
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "RESEND_API_KEY is not set on the server." }, { status: 500 });
  }
  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Service role key is not configured on the server." }, { status: 500 });
  }
  if (!subject || !message) {
    return NextResponse.json({ error: "Subject and message are required." }, { status: 400 });
  }

  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 });
  if (authError) {
    return NextResponse.json({ error: authError.message }, { status: 500 });
  }

  const { data: profiles, error: profileError } = await supabaseAdmin
    .from("profiles")
    .select("id, name, email_opt_in");
  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 500 });
  }

  const optedInIds = new Set((profiles || []).filter((p) => p.email_opt_in !== false).map((p) => p.id));
  const nameById = {};
  (profiles || []).forEach((p) => {
    nameById[p.id] = p.name;
  });

  const recipients = (authData?.users || [])
    .filter((u) => optedInIds.has(u.id) && u.email)
    .map((u) => ({ email: u.email, name: nameById[u.id] || "" }));

  if (recipients.length === 0) {
    return NextResponse.json({ error: "No opted-in users with an email to send to." }, { status: 400 });
  }

  const FROM = process.env.RESEND_FROM || "Tour de France Pool <onboarding@resend.dev>";

  // Resend's batch endpoint takes up to 100 emails per request.
  const batches = [];
  for (let i = 0; i < recipients.length; i += 100) {
    batches.push(recipients.slice(i, i + 100));
  }

  let sent = 0;
  const errors = [];
  for (const batch of batches) {
    const payload = batch.map((r) => ({
      from: FROM,
      to: [r.email],
      subject,
      html: buildEmailHtml({ name: r.name, bodyHtml: textToHtmlParagraphs(message) }),
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
      errors.push(errBody.message || ("Batch failed with status " + res.status));
    }
  }

  return NextResponse.json({ sent, total: recipients.length, errors });
}
