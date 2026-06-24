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
    en: "All 21 stages are done. See you next July!",
    es: "Las 21 etapas han terminado. ¡Nos vemos en julio!",
    ca: "Les 21 etapes s'han acabat. Ens veiem al juliol!",
    fr: "Les 21 étapes sont terminées. À l'année prochaine en juillet !",
    it: "Tutte le 21 tappe sono finite. Ci vediamo a luglio!",
    nl: "Alle 21 etappes zijn voorbij. Tot juli!",
  },
  makePicks: { en: "Make your picks", es: "Haz tus predicciones", ca: "Fes les teves prediccions", fr: "Faites vos pronostics", it: "Fai le tue previsioni", nl: "Maak je voorspellingen" },
  hi: { en: "Hi", es: "Hola", ca: "Hola", fr: "Bonjour", it: "Ciao", nl: "Hoi" },
  footer: {
    en: "You are getting this because you signed up for Tour de France Pool.",
    es: "Recibes esto porque te registraste en Tour de France Pool.",
    ca: "Reps això perquè et vas registrar a Tour de France Pool.",
    fr: "Vous recevez cet e-mail parce que vous vous êtes inscrit à Tour de France Pool.",
    it: "Ricevi questa email perché ti sei iscritto a Tour de France Pool.",
    nl: "Je ontvangt dit omdat je je hebt aangemeld voor Tour de France Pool.",
  },
  // ---- Stage result announcement email (sent automatically when an admin
  // uploads a stage's top 3, see app/api/admin/save-result/route.js) ----
  resultSubject: {
    en: (n, winner) => `Stage ${n} result: ${winner} wins!`,
    es: (n, winner) => `Resultado etapa ${n}: ¡gana ${winner}!`,
    ca: (n, winner) => `Resultat etapa ${n}: guanya ${winner}!`,
    fr: (n, winner) => `Résultat étape ${n} : ${winner} gagne !`,
    it: (n, winner) => `Risultato tappa ${n}: vince ${winner}!`,
    nl: (n, winner) => `Resultaat etappe ${n}: ${winner} wint!`,
  },
  resultIntro: {
    en: (n, from, to) => `Here's the podium for Stage ${n} (${from} &rarr; ${to}):`,
    es: (n, from, to) => `Así queda el podio de la etapa ${n} (${from} &rarr; ${to}):`,
    ca: (n, from, to) => `Així queda el podi de l'etapa ${n} (${from} &rarr; ${to}):`,
    fr: (n, from, to) => `Voici le podium de l'étape ${n} (${from} &rarr; ${to}) :`,
    it: (n, from, to) => `Ecco il podio della tappa ${n} (${from} &rarr; ${to}):`,
    nl: (n, from, to) => `Hier is het podium van etappe ${n} (${from} &rarr; ${to}):`,
  },
  viewLeaderboard: { en: "Check the leaderboard", es: "Ver la clasificación", ca: "Veure la classificació", fr: "Voir le classement", it: "Vedi la classifica", nl: "Bekijk de ranglijst" },
  makeNextPick: {
    en: (n) => `Make your Stage ${n} pick`,
    es: (n) => `Elige tu corredor para la etapa ${n}`,
    ca: (n) => `Tria el teu corredor per a l'etapa ${n}`,
    fr: (n) => `Faites votre pronostic pour l'étape ${n}`,
    it: (n) => `Fai il tuo pronostico per la tappa ${n}`,
    nl: (n) => `Maak je keuze voor etappe ${n}`,
  },
  resultReminder: {
    en: "Don't forget to lock in your next pick before it closes!",
    es: "¡No olvides hacer tu próxima predicción antes de que se cierre!",
    ca: "No oblidis fer la teva pròxima predicció abans que es tanqui!",
    fr: "N'oubliez pas de faire votre prochain pronostic avant la fermeture !",
    it: "Non dimenticare di fare il tuo prossimo pronostico prima della chiusura!",
    nl: "Vergeet niet je volgende voorspelling te maken voordat die sluit!",
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
    '<span style="color:#ffd400;font-weight:900;font-size:20px;letter-spacing:-0.5px;">TOUR DE FRANCE</span>' +
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
    '<p style="margin:14px 0 0;">' + s("resultIntro", L)(n, stage.from, stage.to) + "</p>" +
    '<table width="100%" cellpadding="0" cellspacing="0" style="margin-top:10px;">' +
    '<tr><td style="padding:6px 0;font-size:15px;">🥇 <strong>' + winnerName + "</strong></td></tr>" +
    '<tr><td style="padding:6px 0;font-size:15px;">🥈 ' + secondName + "</td></tr>" +
    '<tr><td style="padding:6px 0;font-size:15px;">🥉 ' + thirdName + "</td></tr>" +
    "</table>" +
    '<div style="margin-top:18px;text-align:center;">' +
    '<a href="' + SITE_URL + prefix + '/leaderboard" style="display:inline-block;margin:4px 8px;background:#ffd400;color:#111111;font-weight:800;padding:11px 22px;border-radius:999px;text-decoration:none;font-size:13px;">' +
    s("viewLeaderboard", L) + "</a>" +
    (next
      ? '<a href="' + SITE_URL + prefix + "/stage/" + next.n + '" style="display:inline-block;margin:4px 8px;background:transparent;color:#111111;font-weight:800;padding:10px 20px;border-radius:999px;border:2px solid #111111;text-decoration:none;font-size:13px;">' +
        s("makeNextPick", L)(next.n) + "</a>"
      : "") +
    "</div>" +
    (next ? '<p style="margin:14px 0 0;font-size:12.5px;color:#777777;text-align:center;">' + s("resultReminder", L) + "</p>" : "");

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
