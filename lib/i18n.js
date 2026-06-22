// lib/i18n.js
//
// Centralised translation dictionary. Add a key once, use it everywhere, in
// both languages. To add a new page to translation, add its strings here
// rather than writing English text directly into a component.
//
// Usage in a page component:
//   import { useLang, t } from "../../lib/i18n";
//   const lang = useLang();
//   <h1>{t(lang, "predictions.title")}</h1>
//
// To add Spanish to a route, create a sibling file at app/es/<route>/page.js
// that just re-exports the SAME page component -- the component detects the
// language itself from the URL, so there's only one real implementation.

"use client";
import { usePathname } from "next/navigation";

export function useLang() {
  const pathname = usePathname();
  return pathname && pathname.startsWith("/es") ? "es" : "en";
}

export function t(lang, key) {
  const dict = TRANSLATIONS[key];
  if (!dict) return key;
  return dict[lang] || dict.en || key;
}

const TRANSLATIONS = {
  // ---------- Nav ----------
  "nav.home": { en: "Home", es: "Inicio" },
  "nav.riders": { en: "Riders", es: "Corredores" },
  "nav.leaderboard": { en: "Leaderboard", es: "Clasificación" },
  "nav.rules": { en: "Rules", es: "Reglas" },
  "nav.signup": { en: "Sign up / Log in", es: "Regístrate / Inicia sesión" },
  "nav.logout": { en: "Log out", es: "Cerrar sesión" },

  // ---------- CTA bar ----------
  "cta.stage": { en: "Stage", es: "Predicción" },
  "cta.stageLine2": { en: "predictions →", es: "de etapa →" },
  "cta.jersey": { en: "Jersey", es: "Predicción" },
  "cta.jerseyLine2": { en: "predictions →", es: "de maillots →" },

  // ---------- Scoring notes ----------
  "scoring.stage": {
    en: "🏆 10 points if you call the winner · 5 points for 2nd · 2 points for 3rd",
    es: "🏆 10 puntos si aciertas el ganador · 5 puntos por el 2º · 2 puntos por el 3º",
  },
  "scoring.stageShort": {
    en: "🏆 10 points for the winner · 5 for 2nd · 2 for 3rd",
    es: "🏆 10 puntos por el ganador · 5 por el 2º · 2 por el 3º",
  },
  "scoring.jersey": {
    en: "🏆 20 points for every jersey you call correctly — up to 80 points total",
    es: "🏆 20 puntos por cada maillot que aciertes — hasta 80 puntos en total",
  },

  // ---------- Stage Predictions page ----------
  "predictions.eyebrow": { en: "21 stages", es: "21 etapas" },
  "predictions.title": { en: "Stage Predictions", es: "Predicciones de Etapa" },
  "predictions.subtitle": {
    en: "Pick who you think will win each stage. Riders are listed from most to least favourite based on the stage profile. You can change your pick until the stage starts.",
    es: "Elige quién crees que ganará cada etapa. Los corredores aparecen de más a menos favorito según el perfil de la etapa. Puedes cambiar tu predicción hasta que empiece la etapa.",
  },
  "predictions.pickPlaceholder": { en: "Pick the winner...", es: "Elige el ganador..." },
  "predictions.locked": { en: "This stage is locked.", es: "Esta etapa está bloqueada." },
  "predictions.closesAt": { en: "Predictions close at", es: "Las predicciones cierran a las" },
  "predictions.seeDetails": { en: "See full stage details", es: "Ver todos los detalles de la etapa" },

  // ---------- Jersey Predictions page ----------
  "jersey.eyebrow": { en: "Locks on 4 July", es: "Se bloquea el 4 de julio" },
  "jersey.title": { en: "Jersey Predictions", es: "Predicciones de Maillots" },
  "jersey.subtitle": {
    en: "Predict who takes home each jersey at the end of the Tour. Tap a jersey to make your pick. These predictions lock when the race starts.",
    es: "Predice quién se llevará cada maillot al final del Tour. Toca un maillot para hacer tu predicción. Estas predicciones se bloquean cuando empieza la carrera.",
  },
  "jersey.yellow": { en: "Yellow Jersey", es: "Maillot Amarillo" },
  "jersey.yellowSub": { en: "Overall winner", es: "Ganador general" },
  "jersey.green": { en: "Green Jersey", es: "Maillot Verde" },
  "jersey.greenSub": { en: "Points / consistency", es: "Puntos / regularidad" },
  "jersey.polka": { en: "Polka Dot Jersey", es: "Maillot de Lunares" },
  "jersey.polkaSub": { en: "Best climber", es: "Mejor escalador" },
  "jersey.white": { en: "White Jersey", es: "Maillot Blanco" },
  "jersey.whiteSub": { en: "Best young rider (25 or under)", es: "Mejor joven (25 años o menos)" },
  "jersey.tapToPick": { en: "Tap to pick", es: "Toca para elegir" },

  // ---------- Riders page ----------
  "riders.eyebrow": { en: "Start list (sample)", es: "Lista de corredores" },
  "riders.title": { en: "Riders", es: "Corredores" },
  "riders.subtitle": {
    en: "Tap a team to see its riders, or search a name directly. Of the 23 confirmed teams, 16 have at least one listed rider so far — the other 7 will be added as their rosters get confirmed.",
    es: "Toca un equipo para ver sus corredores, o busca un nombre directamente. De los 23 equipos confirmados, 16 ya tienen al menos un corredor listado — los otros 7 se añadirán cuando se confirmen sus plantillas.",
  },
  "riders.searchPlaceholder": { en: "Search a rider by name...", es: "Busca un corredor por nombre..." },
  "riders.unconfirmed": { en: "unconfirmed", es: "sin confirmar" },
  "riders.tbc": { en: "TBC", es: "Por confirmar" },
  "riders.noRidersYet": {
    en: "No riders confirmed for this team yet — check back closer to the Tour.",
    es: "Todavía no hay corredores confirmados para este equipo — vuelve más cerca del Tour.",
  },

  // ---------- Leaderboard page ----------
  "leaderboard.eyebrow": { en: "Overall standings", es: "Clasificación general" },
  "leaderboard.title": { en: "Leaderboard", es: "Clasificación" },
  "leaderboard.subtitle": {
    en: "10 points for the right winner, 5 if your pick finishes 2nd, 2 if they finish 3rd — plus 20 points for every jersey you call correctly.",
    es: "10 puntos por acertar el ganador, 5 si tu corredor llega 2º, 2 si llega 3º — más 20 puntos por cada maillot que aciertes.",
  },
  "leaderboard.searchPlaceholder": { en: "Find your name...", es: "Busca tu nombre..." },
  "leaderboard.noResultsFor": { en: "No one matching", es: "Nadie coincide con" },
  "leaderboard.found": { en: "found.", es: "encontrado." },
  "leaderboard.noUsers": { en: "No users registered yet.", es: "Todavía no hay usuarios registrados." },
  "leaderboard.colName": { en: "Name", es: "Nombre" },
  "leaderboard.colPointsFull": { en: "Total points", es: "Puntos totales" },
  "leaderboard.colPointsShort": { en: "Pts", es: "Pts" },
  "leaderboard.colStagesFull": { en: "Stages correct", es: "Etapas correctas" },
  "leaderboard.colStagesShort": { en: "Stages", es: "Etapas" },
  "leaderboard.colLastFull": { en: "Last 5", es: "Últimas 5" },
  "leaderboard.colLastShort": { en: "L5", es: "Ú5" },

  // ---------- Rules page ----------
  "rules.eyebrow": { en: "How it works", es: "Cómo funciona" },
  "rules.title": { en: "Rules", es: "Reglas" },
  "rules.stagePred.title": { en: "Stage predictions", es: "Predicciones de etapa" },
  "rules.stagePred.body": {
    en: "For each of the 21 stages, you pick one rider: the one you think will win. Riders are shown from most to least favourite based on the stage type (mountain, hilly, flat, or time trial).",
    es: "Para cada una de las 21 etapas, eliges un corredor: el que crees que ganará. Los corredores se muestran de más a menos favorito según el tipo de etapa (montaña, media montaña, llana, o contrarreloj).",
  },
  "rules.2nd": { en: "2nd place", es: "2º puesto" },
  "rules.winner": { en: "Winner", es: "Ganador" },
  "rules.3rd": { en: "3rd place", es: "3er puesto" },
  "rules.zeroPoints": { en: "0 points if your rider finishes outside the podium.", es: "0 puntos si tu corredor no acaba en el podio." },
  "rules.locking.title": { en: "Locking predictions", es: "Bloqueo de predicciones" },
  "rules.locking.body": {
    en: "Each stage locks the moment the race starts: from then on you can no longer change that stage's prediction, but you can always predict the stages that haven't started yet.",
    es: "Cada etapa se bloquea en el momento en que empieza la carrera: a partir de ahí ya no puedes cambiar tu predicción para esa etapa, pero siempre puedes predecir las etapas que aún no han empezado.",
  },
  "rules.jersey.title": { en: "Jersey Predictions", es: "Predicciones de Maillots" },
  "rules.jersey.body": {
    en: "Besides the stages, you can predict who wins the Yellow, Green, Polka Dot, and White jerseys. These predictions lock on the day the Tour starts. Each jersey you predict correctly adds 20 points to your leaderboard total — up to 80 points if you get all four right, on top of whatever you score from your 21 stage picks.",
    es: "Además de las etapas, puedes predecir quién gana los maillots Amarillo, Verde, de Lunares y Blanco. Estas predicciones se bloquean el día que empieza el Tour. Cada maillot que aciertes suma 20 puntos a tu clasificación — hasta 80 puntos si aciertas los cuatro, además de lo que sumes con tus 21 predicciones de etapa.",
  },
  "rules.prizes.title": { en: "Prizes", es: "Premios" },
  "rules.prizes.body": {
    en: "There will be 3 prizes at the end of the Tour, all cycling gear (exact items to be confirmed). Standings are based on total points from the stage predictions.",
    es: "Habrá 3 premios al final del Tour, todos material ciclista (los artículos exactos están por confirmar). La clasificación se basa en los puntos totales de las predicciones de etapa.",
  },
  "rules.prize1": { en: "1st place — cycling gear prize (TBD)", es: "1er puesto — premio de material ciclista (por confirmar)" },
  "rules.prize2": { en: "2nd place — cycling gear prize (TBD)", es: "2º puesto — premio de material ciclista (por confirmar)" },
  "rules.prize3": { en: "3rd place — cycling gear prize (TBD)", es: "3er puesto — premio de material ciclista (por confirmar)" },
  "rules.order.title": { en: "How the favourite order is decided", es: "Cómo se decide el orden de favoritos" },
  "rules.order.body": {
    en: "The rider order for each stage is based on their profile (sprinter, climber, puncher, time triallist) and, ideally, on bookmaker odds for that specific stage. In this prototype the data is illustrative; before the real Tour it needs updating with the official rider list and current odds.",
    es: "El orden de corredores para cada etapa se basa en su perfil (esprínter, escalador, punchador, contrarrelojista) e, idealmente, en las cuotas de apuestas para esa etapa concreta. En este prototipo los datos son ilustrativos; antes del Tour real hay que actualizarlos con la lista oficial de corredores y las cuotas actuales.",
  },

  // ---------- Stage detail page ----------
  "stage.makeYourPick": { en: "Make your pick", es: "Haz tu predicción" },
  "stage.elevationProfile": { en: "Elevation profile", es: "Perfil de altimetría" },
  "stage.stagePreview": { en: "Stage preview", es: "Previa de la etapa" },
  "stage.moreInfo": { en: "More detailed stage info", es: "Más información de la etapa" },
  "stage.allStages": { en: "All 21 stages", es: "Las 21 etapas" },
  "stage.yourPick": { en: "Your pick:", es: "Tu predicción:" },
  "stage.none": { en: "none", es: "ninguna" },
  "stage.points": { en: "points", es: "puntos" },
  "stage.of21": { en: "of 21", es: "de 21" },
  // ---------- Week headers ----------
  "week.1.title": { en: "Week 1 — Spain & the Pyrenees", es: "Semana 1 — España y los Pirineos" },
  "week.1.subtitle": {
    en: "Barcelona Grand Depart through the first mountain test",
    es: "Salida desde Barcelona hasta la primera prueba de montaña",
  },
  "week.2.title": { en: "Week 2 — Massif Central, Jura & Vosges", es: "Semana 2 — Macizo Central, Jura y Vosgos" },
  "week.2.subtitle": {
    en: "Bastille Day summit, the longest stage, and a brand new Alpine finish",
    es: "Cima en el Día de la Bastilla, la etapa más larga, y un nuevo final alpino",
  },
  "week.3.title": { en: "Week 3 — The Alps & Paris", es: "Semana 3 — Los Alpes y París" },
  "week.3.subtitle": {
    en: "One time trial, three Alpine summits, and the Montmartre finale",
    es: "Una contrarreloj, tres cimas alpinas, y el final en Montmartre",
  },
  "specialty.All": { en: "All", es: "Todos" },
  "specialty.Climber": { en: "Climber", es: "Escalador" },
  "specialty.Puncheur": { en: "Puncheur", es: "Punchador" },
  "specialty.Sprinter": { en: "Sprinter", es: "Esprínter" },
  "specialty.Time triallist": { en: "Time triallist", es: "Contrarrelojista" },
};
