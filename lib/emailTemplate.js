// lib/emailTemplate.js
//
// SERVER-ONLY (but also safe to import client-side for previewing -- it has
// no secrets). Shared branded wrapper for every email the app sends (welcome
// email, admin reminders; password reset uses Supabase's own template
// separately). Pass in the body text -- everything else (header, countdown
// to the next stage, footer) is added automatically, in the given language.
import { nextStage, stageStartDate } from "./data";

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
export function buildEmailHtml({ name, bodyHtml, lang }) {
  const L = lang || "en";
  return (
    '<table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;margin:0 auto;font-family:Arial,sans-serif;border:1px solid #eeeeee;">' +
    '<tr><td style="background:#111111;padding:22px 24px;text-align:center;">' +
    '<span style="color:#ffd400;font-weight:900;font-size:20px;letter-spacing:-0.5px;">TOUR DE FRANCE</span>' +
    '<span style="color:#ffffff;font-weight:900;font-size:20px;letter-spacing:-0.5px;"> POOL</span>' +
    "</td></tr>" +
    '<tr><td style="padding:26px 24px;color:#222222;font-size:15px;line-height:1.6;">' +
    "<p>" + s("hi", L) + " " + (name || "") + ",</p>" +
    bodyHtml +
    "</td></tr>" +
    countdownBlock(L) +
    '<tr><td style="padding:16px 24px;text-align:center;font-size:11px;color:#999999;">' +
    s("footer", L) +
    "</td></tr>" +
    "</table>"
  );
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
