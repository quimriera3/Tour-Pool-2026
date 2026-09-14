// lib/emailTemplate.js
//
// SERVER-ONLY (but also safe to import client-side for previewing -- it has
// no secrets). Shared branded wrapper for every email the app sends (welcome
// email, admin reminders; password reset uses Supabase's own template
// separately). Pass in the body text -- everything else (header, countdown
// to the next stage, footer) is added automatically, in the given language.
import { nextStage, stageStartDate, STAGES } from "./data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.vercel.app";

const STRINGS = {
  nextStageIn: { en: "Next stage in", es: "Próxima etapa en", ca: "Pròxima etapa en", fr: "Prochaine étape dans", it: "Prossima tappa in", nl: "Volgende etappe in" },
  wrapTitle: { en: "That's a wrap", es: "Eso es todo", ca: "Això és tot", fr: "C'est fini", it: "È tutto", nl: "Dat is alles" },
  wrapBody: {
    en: "All 21 stages are done. Thanks for playing!",
    es: "Las 21 etapas han terminado. ¡Gracias por jugar!",
    ca: "Les 21 etapes s'han acabat. Gràcies per jugar!",
    fr: "Les 21 étapes sont terminées. Merci d'avoir joué !",
    it: "Tutte le 21 tappe sono finite. Grazie per aver giocato!",
    nl: "Alle 21 etappes zijn voorbij. Bedankt voor het meespelen!",
  },
  makePicks: { en: "Make your picks", es: "Haz tus predicciones", ca: "Fes les teves prediccions", fr: "Faites vos pronostics", it: "Fai le tue previsioni", nl: "Maak je voorspellingen" },
  hi: { en: "Hi", es: "Hola", ca: "Hola", fr: "Bonjour", it: "Ciao", nl: "Hoi" },
  footer: {
    en: "You are getting this because you signed up for Grand Tour Pool.",
    es: "Recibes esto porque te registraste en Grand Tour Pool.",
    ca: "Reps això perquè et vas registrar a Grand Tour Pool.",
    fr: "Vous recevez cet e-mail parce que vous vous êtes inscrit à Grand Tour Pool.",
    it: "Ricevi questa email perché ti sei iscritto a Grand Tour Pool.",
    nl: "Je ontvangt dit omdat je je hebt aangemeld voor Grand Tour Pool.",
  },
  // ---- Stage result announcement email ----
  resultSubject: {
    en: (n, winner) => `🚴 Stage ${n} result: ${winner} wins! 🏆`,
    es: (n, winner) => `🚴 Etapa ${n}: ¡${winner} gana! 🏆`,
    ca: (n, winner) => `🚴 Etapa ${n}: guanya ${winner}! 🏆`,
    fr: (n, winner) => `🚴 Étape ${n}: ${winner} gagne ! 🏆`,
    it: (n, winner) => `🚴 Tappa ${n}: vince ${winner}! 🏆`,
    nl: (n, winner) => `🚴 Etappe ${n}: ${winner} wint! 🏆`,
  },
  resultIntro: {
    en: (n, from, to) => `Stage ${n} (${from} → ${to}) is done. Here's the podium:`,
    es: (n, from, to) => `La etapa ${n} (${from} → ${to}) ha terminado. Así quedó el podio:`,
    ca: (n, from, to) => `L'etapa ${n} (${from} → ${to}) ha acabat. Aquí tens el podi:`,
    fr: (n, from, to) => `L'étape ${n} (${from} → ${to}) est terminée. Voici le podium :`,
    it: (n, from, to) => `La tappa ${n} (${from} → ${to}) è finita. Ecco il podio:`,
    nl: (n, from, to) => `Etappe ${n} (${from} → ${to}) is gereden. Hier is het podium:`,
  },
  resultCta: {
    en: "How many points did you get? 👀",
    es: "¿Cuántos puntos has conseguido? 👀",
    ca: "Quants punts has aconseguit? 👀",
    fr: "Combien de points avez-vous marqué ? 👀",
    it: "Quanti punti hai fatto? 👀",
    nl: "Hoeveel punten heb jij? 👀",
  },
  viewLeaderboard: { en: "See the leaderboard 🏅", es: "Ver la clasificación 🏅", ca: "Veure la classificació 🏅", fr: "Voir le classement 🏅", it: "Vedi la classifica 🏅", nl: "Bekijk de ranglijst 🏅" },
  makeNextPick: {
    en: (n) => `Pick your Stage ${n} winner ⚡`,
    es: (n) => `Elige para la etapa ${n} ⚡`,
    ca: (n) => `Tria per a l'etapa ${n} ⚡`,
    fr: (n) => `Votre pronostic étape ${n} ⚡`,
    it: (n) => `Pronostico tappa ${n} ⚡`,
    nl: (n) => `Kies voor etappe ${n} ⚡`,
  },
  resultReminder: {
    en: "⏰ Picks lock 1 hour before each stage starts — don't miss out!",
    es: "⏰ Los picks se cierran 1 hora antes de cada etapa — ¡no te quedes sin hacer el tuyo!",
    ca: "⏰ Els picks es tanquen 1 hora abans de cada etapa — no t'ho perdis!",
    fr: "⏰ Les pronostics ferment 1 heure avant chaque étape — ne ratez pas le vôtre !",
    it: "⏰ I pronostici chiudono 1 ora prima di ogni tappa — non perderti il tuo!",
    nl: "⏰ Picks sluiten 1 uur voor elke etappe — zorg dat je er op tijd bij bent!",
  },
};

function s(key, lang) {
  return STRINGS[key][lang] || STRINGS[key].en;
}

function stageDateLabel(stage, lang) {
  const parts = stage.date.split("-").reverse();
  return lang === "en" ? parts.reverse().join("/") : parts.join("/");
}

function countdownBlock(lang) {
  const stage = nextStage();
  if (!stage) {
    return (
      '<tr><td style="background:#111111;padding:24px;text-align:center;">' +
      '<p style="color:#ffd400;font-weight:700;text-transform:uppercase;font-size:12px;letter-spacing:1px;margin:0;">' + s("wrapTitle", lang) + "</p>" +
      '<p style="color:#ffffff;font-size:16px;margin:10px 0 0;">' + s("wrapBody", lang) + "</p>" +
      "</td></tr>"
    );
  }
  const diff = Math.max(0, stageStartDate(stage).getTime() - Date.now());
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);

  return (
    '<tr><td style="background:#111111;padding:28px 24px;text-align:center;">' +
    '<p style="color:#ffd400;font-weight:700;text-transform:uppercase;font-size:12px;letter-spacing:1px;margin:0;">' + s("nextStageIn", lang) + "</p>" +
    '<p style="color:#ffffff;font-size:32px;font-weight:900;margin:10px 0 0;font-family:Arial,sans-serif;">' +
    d + "d " + h + "h " + m + "m</p>" +
    '<p style="color:#cccccc;font-size:14px;margin:10px 0 0;">Stage ' + stage.n + ": " + stage.from + " - " + stage.to + " &middot; " + stageDateLabel(stage, lang) + "</p>" +
    '<a href="' + SITE_URL + (lang === "es" ? "/es" : "") + '/predictions" style="display:inline-block;margin-top:16px;background:#ffd400;color:#111111;font-weight:800;padding:11px 26px;border-radius:999px;text-decoration:none;font-size:14px;">' + s("makePicks", lang) + " &rarr;</a>" +
    "</td></tr>"
  );
}

// bodyHtml: a string of already-escaped HTML (e.g. "<p>...</p><p>...</p>").
// showGreeting (default true): set to false when the caller's own bodyHtml
// already includes its own opening line -- e.g. the admin's hand-written
// reminder emails, where the admin writes their own greeting in the rich
// text editor and an automatic "Hi {name}," on top of that just duplicates
// it (and can't be edited or removed from the UI). Automated system emails
// (welcome email, stage result announcements) keep the automatic greeting.
export function buildEmailHtml({ name, bodyHtml, lang, showGreeting = true }) {
  const L = lang || "en";
  return (
    '<table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;margin:0 auto;font-family:Arial,sans-serif;border:1px solid #eeeeee;">' +
    '<tr><td style="background:#111111;padding:22px 24px;text-align:center;">' +
    '<span style="color:#ffd400;font-weight:900;font-size:20px;letter-spacing:-0.5px;">LA VUELTA</span>' +
    '<span style="color:#ffffff;font-weight:900;font-size:20px;letter-spacing:-0.5px;"> POOL</span>' +
    "</td></tr>" +
    '<tr><td style="padding:26px 24px;color:#222222;font-size:15px;line-height:1.6;">' +
    (showGreeting ? "<p>" + s("hi", L) + " " + (name || "") + ",</p>" : "") +
    bodyHtml +
    "</td></tr>" +
    countdownBlock(L) +
    '<tr><td style="padding:16px 24px;text-align:center;font-size:11px;color:#999999;">' +
    s("footer", L) +
    "</td></tr>" +
    "</table>"
  );
}

// Builds the subject + body HTML for the automated "stage result" email,
// sent to everyone opted in right after an admin uploads a stage's top 3
// (see app/api/admin/save-result/route.js). No translation API needed --
// every language is written out directly, the same way the rest of the
// site's i18n works.
export function buildStageResultEmail({ lang, stage, winnerName, secondName, thirdName }) {
  const L = lang || "en";
  const n = stage.n;
  const subject = s("resultSubject", L)(n, winnerName);
  const prefix = L === "es" ? "/es" : "";
  const next = STAGES.find((st) => st.n === n + 1);

  const podiumHtml =
    // Stage header
    '<div style="background:#111111;border-radius:10px;padding:20px 24px;margin-bottom:20px;text-align:center;">' +
    '<p style="color:#ffd400;font-weight:900;font-size:13px;letter-spacing:1px;text-transform:uppercase;margin:0;">Stage ' + n + ' · ' + stage.from + ' → ' + stage.to + '</p>' +
    '</div>' +
    // Intro hook
    '<p style="font-size:16px;font-weight:700;margin:0 0 16px;">' + s("resultIntro", L)(n, stage.from, stage.to) + '</p>' +
    // Podium card
    '<div style="background:#f8f8f8;border-radius:10px;overflow:hidden;margin-bottom:20px;">' +
    '<div style="padding:14px 20px;border-bottom:1px solid #eeeeee;display:flex;align-items:center;gap:12px;">' +
    '<span style="font-size:26px;line-height:1;">🥇</span>' +
    '<span style="font-size:17px;font-weight:900;color:#111111;">' + winnerName + '</span>' +
    '</div>' +
    '<div style="padding:12px 20px;border-bottom:1px solid #eeeeee;">' +
    '<span style="font-size:22px;line-height:1;">🥈</span>' +
    '<span style="font-size:15px;font-weight:700;color:#444444;margin-left:10px;">' + secondName + '</span>' +
    '</div>' +
    '<div style="padding:12px 20px;">' +
    '<span style="font-size:22px;line-height:1;">🥉</span>' +
    '<span style="font-size:15px;font-weight:700;color:#444444;margin-left:10px;">' + thirdName + '</span>' +
    '</div>' +
    '</div>' +
    // CTA hook
    '<p style="font-size:15px;font-weight:700;text-align:center;margin:0 0 16px;">' + s("resultCta", L) + '</p>' +
    // Buttons
    '<div style="text-align:center;margin-bottom:8px;">' +
    '<a href="' + SITE_URL + prefix + '/leaderboard" style="display:inline-block;margin:5px 6px;background:#ffd400;color:#111111;font-weight:800;padding:13px 26px;border-radius:999px;text-decoration:none;font-size:14px;">' +
    s("viewLeaderboard", L) + '</a>' +
    (next
      ? '<a href="' + SITE_URL + prefix + "/stage/" + next.n + '" style="display:inline-block;margin:5px 6px;background:#111111;color:#ffffff;font-weight:800;padding:12px 24px;border-radius:999px;text-decoration:none;font-size:14px;">' +
        s("makeNextPick", L)(next.n) + '</a>'
      : '') +
    '</div>' +
    (next ? '<p style="margin:14px 0 0;font-size:12px;color:#888888;text-align:center;">' + s("resultReminder", L) + '</p>' : '');

  return {
    subject,
    html: buildEmailHtml({ name: "", bodyHtml: podiumHtml, lang: L, showGreeting: true }),
  };
}

// Turns plain admin-written text (one paragraph per line) into safe HTML.
export function textToHtmlParagraphs(text) {
  return text
    .split("\n")
    .filter((line) => line.trim().length > 0)
    .map((line) => "<p>" + escapeHtml(line) + "</p>")
    .join("");
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
