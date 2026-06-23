// app/api/send-welcome-email/route.js
//
// Called from the client right after a successful sign-up. Runs server-side
// because RESEND_API_KEY must never reach the browser. If sending fails for
// any reason, we still return ok -- a failed welcome email should never block
// someone from finishing sign-up.
import { NextResponse } from "next/server";
import { buildEmailHtml, textToHtmlParagraphs } from "../../../lib/emailTemplate";
import { translateText } from "../../../lib/translate";

const WELCOME = {
  en: {
    subject: "Welcome to Tour de France Pool!",
    body: "You're all signed up. You can now pick a winner for each of the 21 stages and predict who takes home every jersey.\n\nGood luck, and may the best prediction win!",
  },
  es: {
    subject: "¡Bienvenido a Tour de France Pool!",
    body: "Te has registrado correctamente. Ya puedes elegir tus corredores para cada una de las 21 etapas y predecir quién se lleva cada maillot.\n\nMucha suerte, ¡y que gane el mejor!",
  },
  ca: {
    subject: "Benvingut a Tour de France Pool!",
    body: "T'has registrat correctament. Ja pots triar els teus corredors per a cada una de les 21 etapes i predir qui s'emporta cada mallot.\n\nMolta sort, que guanyi el millor!",
  },
};

export async function POST(request) {
  const { name, email, lang } = await request.json();

  if (!email) {
    return NextResponse.json({ ok: false, error: "Email is required." }, { status: 400 });
  }
  if (!process.env.RESEND_API_KEY) {
    // Not configured yet -- fail silently, sign-up itself already succeeded.
    return NextResponse.json({ ok: true, skipped: "RESEND_API_KEY not set" });
  }

  const FROM = process.env.RESEND_FROM || "Tour de France Pool <onboarding@resend.dev>";

  let subject, bodyText;
  if (WELCOME[lang]) {
    subject = WELCOME[lang].subject;
    bodyText = WELCOME[lang].body;
  } else {
    // For fr/it/nl (no hand-written copy yet), translate the English
    // version automatically rather than sending the wrong language.
    try {
      [subject] = await translateText(WELCOME.en.subject, "en", lang, false);
      [bodyText] = await translateText(WELCOME.en.body, "en", lang, false);
    } catch (err) {
      subject = WELCOME.en.subject;
      bodyText = WELCOME.en.body;
    }
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + process.env.RESEND_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [email],
        subject,
        html: buildEmailHtml({ name, bodyHtml: textToHtmlParagraphs(bodyText), lang }),
      }),
    });
    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      return NextResponse.json({ ok: true, warning: errBody.message || "Resend returned an error" });
    }
  } catch (err) {
    return NextResponse.json({ ok: true, warning: "Could not reach Resend" });
  }

  return NextResponse.json({ ok: true });
}
