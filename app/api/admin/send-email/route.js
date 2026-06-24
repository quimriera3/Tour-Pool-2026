// app/api/admin/send-email/route.js
//
// Server-side only. By default sends to every user who opted in (profiles.
// email_opt_in = true). Pass testEmail to send a single test copy to one
// address instead (ignores opt-in -- it's just you checking how it looks).
// Pass selectedEmails (array) to send only to those specific people.
//
// Recipients are grouped by their preferred_language. If a group's language
// differs from sourceLang (the language you wrote the email in), the
// subject and body are translated automatically via DeepL before sending --
// each person gets the email in their own preferred language.
//
// Uses Resend (resend.com) for sending and DeepL for translation; requires
// RESEND_API_KEY and DEEPL_API_KEY in Vercel's env vars.
import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { buildEmailHtml } from "../../../../lib/emailTemplate";
import { translateText } from "../../../../lib/translate";

export async function POST(request) {
  const { password, subject, message, testEmail, selectedEmails, sourceLang } = await request.json();
  const srcLang = sourceLang || "en";

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "ADMIN_PASSWORD is not set on the server." }, { status: 500 });
  }
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "RESEND_API_KEY is not set on the server." }, { status: 500 });
  }
  if (!subject || !message) {
    return NextResponse.json({ error: "Subject and message are required." }, { status: 400 });
  }

  let recipients;

  if (testEmail) {
    // Just you, checking how it looks. Ignores opt-in, sent in sourceLang.
    recipients = [{ email: testEmail, name: "", lang: srcLang }];
  } else if (!supabaseAdmin) {
    return NextResponse.json({ error: "Service role key is not configured on the server." }, { status: 500 });
  } else {
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 });
    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 500 });
    }
    const { data: profiles, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("id, name, email_opt_in, preferred_language");
    if (profileError) {
      return NextResponse.json({ error: profileError.message }, { status: 500 });
    }

    const nameById = {};
    const optInById = {};
    const langById = {};
    (profiles || []).forEach((p) => {
      nameById[p.id] = p.name;
      optInById[p.id] = p.email_opt_in === true;
      langById[p.id] = p.preferred_language || "en";
    });

    if (selectedEmails && selectedEmails.length > 0) {
      // A hand-picked list of specific people -- opt-in doesn't gate this,
      // since you're choosing exactly who on purpose.
      const selectedSet = new Set(selectedEmails);
      recipients = (authData?.users || [])
        .filter((u) => u.email && selectedSet.has(u.email))
        .map((u) => ({ email: u.email, name: nameById[u.id] || "", lang: langById[u.id] || "en" }));
    } else {
      // Default: everyone who opted in.
      const optedInIds = new Set(Object.keys(optInById).filter((id) => optInById[id]));
      recipients = (authData?.users || [])
        .filter((u) => optedInIds.has(u.id) && u.email)
        .map((u) => ({ email: u.email, name: nameById[u.id] || "", lang: langById[u.id] || "en" }));
    }
  }

  if (!recipients || recipients.length === 0) {
    return NextResponse.json({ error: "No matching recipients to send to." }, { status: 400 });
  }

  // Group by preferred language so we translate each distinct language only
  // once, not once per person.
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

    let groupSubject = subject;
    let groupMessage = message;

    if (groupLang !== srcLang) {
      try {
        const [translatedSubject] = await translateText(subject, srcLang, groupLang, false);
        const [translatedMessage] = await translateText(message, srcLang, groupLang, true);
        groupSubject = translatedSubject;
        groupMessage = translatedMessage;
      } catch (err) {
        errors.push("Translation to " + groupLang + " failed: " + err.message + " (sent in original language instead)");
        // Fall back to sending the original, untranslated version rather
        // than skipping these people entirely.
      }
    }

    const batches = [];
    for (let i = 0; i < groupRecipients.length; i += 100) {
      batches.push(groupRecipients.slice(i, i + 100));
    }

    for (const batch of batches) {
      const payload = batch.map((r) => ({
        from: FROM,
        to: [r.email],
        subject: groupSubject,
        html: buildEmailHtml({ name: r.name, bodyHtml: groupMessage, lang: groupLang, showGreeting: false }),
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
  }

  return NextResponse.json({ sent, total, errors });
}
