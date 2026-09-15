// lib/emailTemplate.js
// Race-aware branded email templates. Safe to import in the admin client for previewing.
import { nextStage, stageStartDate } from "./data";
import { getRace, getActiveRace, localised, raceBasePath, isChampionship } from "./races";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.grandtourpool.com";

const STRINGS = {
  nextIn: { en: "Next prediction closes soon", es: "La próxima predicción cierra pronto", ca: "La pròxima predicció tanca aviat", fr: "Le prochain pronostic ferme bientôt", it: "Il prossimo pronostico chiude presto", nl: "De volgende voorspelling sluit binnenkort" },
  wrapTitle: { en: "That's a wrap", es: "Eso es todo", ca: "Això és tot", fr: "C'est fini", it: "È tutto", nl: "Dat is alles" },
  wrapBody: { en: "All events are complete. Thanks for playing!", es: "Todas las pruebas han terminado. ¡Gracias por jugar!", ca: "Totes les proves han acabat. Gràcies per jugar!", fr: "Toutes les épreuves sont terminées. Merci d'avoir joué !", it: "Tutte le prove sono terminate. Grazie per aver giocato!", nl: "Alle onderdelen zijn afgelopen. Bedankt voor het meespelen!" },
  makePicks: { en: "Make your picks", es: "Haz tus predicciones", ca: "Fes les teves prediccions", fr: "Faites vos pronostics", it: "Fai i tuoi pronostici", nl: "Maak je voorspellingen" },
  hi: { en: "Hi", es: "Hola", ca: "Hola", fr: "Bonjour", it: "Ciao", nl: "Hoi" },
  footer: { en: "You receive game emails because you opted in to Grand Tour Pool updates.", es: "Recibes correos del juego porque aceptaste las comunicaciones de Grand Tour Pool.", ca: "Reps correus del joc perquè vas acceptar les comunicacions de Grand Tour Pool.", fr: "Vous recevez ces e-mails car vous avez accepté les communications de Grand Tour Pool.", it: "Ricevi queste email perché hai accettato le comunicazioni di Grand Tour Pool.", nl: "Je ontvangt deze e-mails omdat je updates van Grand Tour Pool hebt geaccepteerd." },
  resultCta: { en: "How many points did you score?", es: "¿Cuántos puntos has conseguido?", ca: "Quants punts has aconseguit?", fr: "Combien de points avez-vous marqué ?", it: "Quanti punti hai fatto?", nl: "Hoeveel punten heb jij?" },
  viewLeaderboard: { en: "See the leaderboard", es: "Ver la clasificación", ca: "Veure la classificació", fr: "Voir le classement", it: "Vedi la classifica", nl: "Bekijk de ranglijst" },
  nextPick: { en: "Make your next pick", es: "Haz tu próximo pick", ca: "Fes el pròxim pick", fr: "Faites votre prochain pronostic", it: "Fai il prossimo pronostico", nl: "Maak je volgende voorspelling" },
  reminder: { en: "Picks lock 1 hour before the official start.", es: "Los picks se cierran 1 hora antes de la salida oficial.", ca: "Els picks es tanquen 1 hora abans de la sortida oficial.", fr: "Les pronostics ferment 1 heure avant le départ officiel.", it: "I pronostici chiudono 1 ora prima della partenza ufficiale.", nl: "Picks sluiten 1 uur voor de officiële start." },
};

function s(key, lang) {
  return STRINGS[key][lang] || STRINGS[key].en;
}

function raceFor(slug) {
  return getRace(slug) || getActiveRace();
}

function eventLabel(stage, race, lang) {
  if (stage.eventName) return localised(stage.eventName, lang);
  const word = lang === "es" ? "Etapa" : lang === "ca" ? "Etapa" : lang === "fr" ? "Étape" : lang === "it" ? "Tappa" : lang === "nl" ? "Etappe" : "Stage";
  return `${word} ${stage.n}`;
}

function dateLabel(stage, lang) {
  const [y, m, d] = stage.date.split("-");
  return lang === "en" ? `${d}/${m}/${y}` : `${d}/${m}/${y}`;
}

function countdownBlock(lang, race) {
  const stage = nextStage(undefined, race);
  const accent = race.theme?.accent || "#111111";
  const accentInk = race.theme?.accentInk || "#ffffff";
  if (!stage) {
    return '<tr><td style="background:#111111;padding:24px;text-align:center;">' +
      '<p style="color:' + accent + ';font-weight:700;text-transform:uppercase;font-size:12px;letter-spacing:1px;margin:0;">' + s("wrapTitle", lang) + '</p>' +
      '<p style="color:#ffffff;font-size:16px;margin:10px 0 0;">' + s("wrapBody", lang) + '</p>' +
      '</td></tr>';
  }

  const lock = new Date(stageStartDate(stage, race).getTime() - 60 * 60 * 1000);
  const diff = Math.max(0, lock.getTime() - Date.now());
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const base = raceBasePath(race, lang === "es" ? "es" : "en");

  return '<tr><td style="background:#111111;padding:28px 24px;text-align:center;">' +
    '<p style="color:' + accent + ';font-weight:700;text-transform:uppercase;font-size:12px;letter-spacing:1px;margin:0;">' + s("nextIn", lang) + '</p>' +
    '<p style="color:#ffffff;font-size:32px;font-weight:900;margin:10px 0 0;font-family:Arial,sans-serif;">' + d + 'd ' + h + 'h ' + m + 'm</p>' +
    '<p style="color:#cccccc;font-size:14px;margin:10px 0 0;">' + escapeHtml(eventLabel(stage, race, lang)) + ' · ' + dateLabel(stage, lang) + ' · ' + escapeHtml(stage.startTime) + ' Montréal</p>' +
    '<a href="' + SITE_URL + base + '/predictions" style="display:inline-block;margin-top:16px;background:' + accent + ';color:' + accentInk + ';font-weight:800;padding:11px 26px;border-radius:999px;text-decoration:none;font-size:14px;">' + s("makePicks", lang) + ' &rarr;</a>' +
    '</td></tr>';
}

export function buildEmailHtml({ name, bodyHtml, lang, showGreeting = true, raceSlug }) {
  const L = lang || "en";
  const race = raceFor(raceSlug);
  const accent = race.theme?.accent || "#111111";
  const brand = localised(race.poolBrandName || race.brandName || race.shortName || race.name, L) || "Grand Tour Pool";
  return '<table width="100%" cellpadding="0" cellspacing="0" style="max-width:540px;margin:0 auto;font-family:Arial,sans-serif;border:1px solid #e5e7eb;background:#ffffff;">' +
    '<tr><td style="height:5px;background:linear-gradient(90deg,#00a651 0 20%,#ffd600 20% 40%,#111111 40% 60%,#e31b23 60% 80%,#1478d4 80% 100%);"></td></tr>' +
    '<tr><td style="background:#111111;padding:22px 24px;text-align:center;">' +
    '<span style="color:#ffffff;font-weight:900;font-size:20px;letter-spacing:-0.4px;">GRAND TOUR POOL</span>' +
    '<div style="color:' + accent + ';font-weight:800;font-size:11px;text-transform:uppercase;letter-spacing:1.4px;margin-top:5px;">' + escapeHtml(brand) + '</div>' +
    '</td></tr>' +
    '<tr><td style="padding:28px 26px;color:#202124;font-size:15px;line-height:1.65;">' +
    (showGreeting ? '<p>' + s("hi", L) + (name ? ' ' + escapeHtml(name) : '') + ',</p>' : '') +
    bodyHtml + '</td></tr>' +
    countdownBlock(L, race) +
    '<tr><td style="padding:18px 24px;text-align:center;font-size:11px;line-height:1.5;color:#8a8f98;">' + s("footer", L) + '</td></tr>' +
    '</table>';
}

export function buildStageResultEmail({ lang, stage, winnerName, secondName, thirdName, raceSlug }) {
  const L = lang || "en";
  const race = raceFor(raceSlug);
  const label = eventLabel(stage, race, L);
  const accent = race.theme?.accent || "#1478d4";
  const accentInk = race.theme?.accentInk || "#ffffff";
  const base = raceBasePath(race, L === "es" ? "es" : "en");
  const stageIndex = race.stages.findIndex((st) => st.n === stage.n);
  const next = stageIndex >= 0 ? race.stages[stageIndex + 1] : null;
  const subject = L === "es" ? `${label}: ¡${winnerName} gana!` : `${label}: ${winnerName} wins!`;
  const intro = L === "es"
    ? `${label} ha terminado. Así quedó el podio:`
    : `${label} is complete. Here's the podium:`;

  const podiumHtml =
    '<div style="border-radius:10px;padding:20px 24px;margin-bottom:20px;text-align:center;background:#111111;">' +
    '<p style="color:' + accent + ';font-weight:900;font-size:13px;letter-spacing:1px;text-transform:uppercase;margin:0;">' + escapeHtml(label) + '</p>' +
    '<p style="color:#d6d6d6;font-size:12px;margin:7px 0 0;">' + escapeHtml(stage.from) + (stage.to !== stage.from ? ' → ' + escapeHtml(stage.to) : '') + '</p>' +
    '</div>' +
    '<p style="font-size:16px;font-weight:700;margin:0 0 16px;">' + intro + '</p>' +
    '<div style="background:#f6f7f8;border-radius:10px;overflow:hidden;margin-bottom:20px;">' +
    podiumRow('1', winnerName, true) + podiumRow('2', secondName) + podiumRow('3', thirdName) +
    '</div>' +
    '<p style="font-size:15px;font-weight:700;text-align:center;margin:0 0 16px;">' + s("resultCta", L) + '</p>' +
    '<div style="text-align:center;margin-bottom:8px;">' +
    '<a href="' + SITE_URL + base + '/leaderboard" style="display:inline-block;margin:5px 6px;background:' + accent + ';color:' + accentInk + ';font-weight:800;padding:13px 26px;border-radius:999px;text-decoration:none;font-size:14px;">' + s("viewLeaderboard", L) + '</a>' +
    (next ? '<a href="' + SITE_URL + base + '/stage/' + next.n + '" style="display:inline-block;margin:5px 6px;background:#111111;color:#ffffff;font-weight:800;padding:13px 26px;border-radius:999px;text-decoration:none;font-size:14px;">' + s("nextPick", L) + '</a>' : '') +
    '</div>' +
    (next ? '<p style="margin:14px 0 0;font-size:12px;color:#777;text-align:center;">' + s("reminder", L) + '</p>' : '');

  return { subject, html: buildEmailHtml({ name: "", bodyHtml: podiumHtml, lang: L, showGreeting: false, raceSlug: race.slug }) };
}

function podiumRow(place, name, winner) {
  return '<div style="padding:' + (winner ? '15px 20px' : '12px 20px') + ';border-bottom:1px solid #e5e7eb;">' +
    '<span style="display:inline-block;width:28px;font-size:' + (winner ? '17px' : '14px') + ';font-weight:900;color:#111;">' + place + '.</span>' +
    '<span style="font-size:' + (winner ? '17px' : '15px') + ';font-weight:' + (winner ? '900' : '700') + ';color:#222;">' + escapeHtml(name) + '</span>' +
    '</div>';
}

export function textToHtmlParagraphs(text) {
  return String(text || "").split("\n").filter((line) => line.trim()).map((line) => '<p>' + escapeHtml(line) + '</p>').join("");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
