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
  "brand.race": { en: "GRAND TOUR", es: "GRAND TOUR", ca: "GRAND TOUR", fr: "GRAND TOUR", it: "GRAND TOUR", nl: "GRAND TOUR" },
  "nav.stages": { en: "Races", es: "Pruebas" },
  "nav.jerseys": { en: "Jerseys", es: "Maillots" },
  "nav.rules": { en: "Rules", es: "Reglas" },
  "nav.faq": { en: "FAQ", es: "FAQ" },
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
    en: "🏆 10 points for every jersey you call correctly — up to 40 points total",
    es: "🏆 10 puntos por cada maillot que aciertes — hasta 40 puntos en total",
  },

  // ---------- Stage Predictions page ----------
  "predictions.eyebrow": { en: "Your predictions", es: "Tus predicciones" },
  "predictions.title": { en: "Race Predictions", es: "Predicciones de Prueba" },
  "predictions.subtitle": {
    en: "Pick who you think will win each event. You can change your pick until one hour before the official start.",
    es: "Elige quién crees que ganará cada prueba. Puedes cambiar tu pick hasta una hora antes de la salida oficial.",
  },
  "predictions.pickPlaceholder": { en: "Pick the winner...", es: "Elige el ganador..." },
  "predictions.locked": { en: "This stage is locked.", es: "Esta etapa está bloqueada." },
  "predictions.closesAt": { en: "Predictions close at", es: "Las predicciones cierran a las" },
  "predictions.seeDetails": { en: "See full stage details", es: "Ver todos los detalles de la etapa" },

  // ---------- Jersey Predictions page ----------
  "jersey.eyebrow": { en: "Locks on 26 August", es: "Se bloquea el 26 de agosto" },
  "jersey.title": { en: "Jersey Predictions", es: "Predicciones de Maillots" },
  "jersey.subtitle": {
    en: "Predict the available final classifications for this Grand Tour before their deadline.",
    es: "Predice las clasificaciones finales disponibles para esta gran vuelta antes de su fecha límite.",
  },
  // "yellow" is the database column name (kept for compatibility); at the
  // Vuelta the leader's jersey is red.
  "jersey.yellow": { en: "Red Jersey", es: "Maillot Rojo" },
  "jersey.yellowSub": { en: "Overall winner", es: "Ganador general" },
  "jersey.green": { en: "Green Jersey", es: "Maillot Verde" },
  "jersey.greenSub": { en: "Points / consistency", es: "Puntos / regularidad" },
  "jersey.polka": { en: "Polka Dot Jersey", es: "Maillot de Lunares" },
  "jersey.polkaSub": { en: "Best climber", es: "Mejor escalador" },
  "jersey.white": { en: "White Jersey", es: "Maillot Blanco" },
  "jersey.whiteSub": { en: "Best young rider (25 or under)", es: "Mejor joven (25 años o menos)" },
  "jersey.tapToPick": { en: "Tap to pick", es: "Toca para elegir" },

  // ---------- Riders page ----------
  "riders.eyebrow": { en: "Start list by nation", es: "Lista de corredores por selección" },
  "riders.title": { en: "Nations & riders", es: "Selecciones y corredores" },
  "riders.subtitle": {
    en: "Tap a nation to see its riders, or search a name directly. At the World Championships riders race for their country, not their trade team. Selections are provisional until each federation confirms its final squad in the days before the race.",
    es: "Toca una selección para ver sus corredores, o busca un nombre directamente. En el Mundial los corredores compiten por su país, no por su equipo comercial. Las listas son provisionales hasta que cada federación confirme su selección definitiva en los días previos.",
  },
  "riders.searchPlaceholder": { en: "Search a rider by name...", es: "Busca un corredor por nombre..." },
  "riders.unconfirmed": { en: "unconfirmed", es: "sin confirmar" },
  "riders.tbc": { en: "TBC", es: "Por confirmar" },
  "riders.officialLineup": { en: "Official lineup", es: "Alineación oficial" },
  "riders.noRidersYet": {
    en: "No riders confirmed for this team yet — check back closer to the race.",
    es: "Todavía no hay corredores confirmados para este equipo — vuelve más cerca de la carrera.",
  },

  // ---------- Leaderboard page ----------
  "leaderboard.eyebrow": { en: "Overall standings", es: "Clasificación general" },
  "leaderboard.title": { en: "Leaderboard", es: "Clasificación" },
  "leaderboard.subtitle": {
    en: "10 points for the winner, 5 if your pick finishes 2nd and 2 if they finish 3rd. Grand Tours may also include final-classification points.",
    es: "10 puntos por acertar el ganador, 5 si tu pick llega 2º y 2 si llega 3º. Las grandes vueltas también pueden incluir puntos por clasificaciones finales.",
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
  "leaderboard.colJerseysFull": { en: "Jerseys won", es: "Maillots ganados" },
  "leaderboard.colJerseysShort": { en: "Jerseys", es: "Maillots" },

  // ---------- Rules page ----------
  "rules.eyebrow": { en: "How it works", es: "Cómo funciona" },
  "rules.title": { en: "Rules", es: "Reglas" },
  "rules.stagePred.title": { en: "Stage predictions", es: "Predicciones de etapa" },
  "rules.stagePred.body": {
    en: "For every event in the active pool, pick one rider: the one you think will win.",
    es: "Para cada prueba de la porra activa, eliges un corredor: el que crees que ganará.",
  },
  "rules.2nd": { en: "2nd place", es: "2º puesto" },
  "rules.winner": { en: "Winner", es: "Ganador" },
  "rules.3rd": { en: "3rd place", es: "3er puesto" },
  "rules.zeroPoints": { en: "0 points if your rider finishes outside the podium.", es: "0 puntos si tu corredor no acaba en el podio." },
  "rules.locking.title": { en: "Locking predictions", es: "Bloqueo de predicciones" },
  "rules.locking.body": {
    en: "Each pick locks exactly one hour before the event's official start. Until then, you can change it as many times as you like.",
    es: "Cada pick se cierra exactamente una hora antes de la salida oficial de la prueba. Hasta entonces puedes cambiarlo tantas veces como quieras.",
  },
  "rules.jersey.title": { en: "Jersey Predictions", es: "Predicciones de Maillots" },
  "rules.jersey.body": {
    en: "A World Championship has no general classification, so there are no jersey predictions here — each race is decided on the day. Your score comes entirely from the winners you pick for each championship event.",
    es: "El Mundial no tiene clasificación general, así que aquí no hay predicciones de maillots: cada prueba se decide en el día. Tu puntuación sale por completo de los ganadores que aciertes en cada prueba del Mundial.",
  },
  "rules.prizes.title": { en: "Prizes", es: "Premios" },
  "rules.prizes.body": {
    en: "There will be 3 prizes at the end of the Championships, all cycling gear (exact items to be confirmed). Standings are based on total points from your race predictions.",
    es: "Habrá 3 premios al final del Mundial, todos material ciclista (los artículos exactos están por confirmar). La clasificación se basa en los puntos totales de tus predicciones de prueba.",
  },
  "rules.prize1": { en: "1st place — cycling gear prize (TBD)", es: "1er puesto — premio de material ciclista (por confirmar)" },
  "rules.prize2": { en: "2nd place — cycling gear prize (TBD)", es: "2º puesto — premio de material ciclista (por confirmar)" },
  "rules.prize3": { en: "3rd place — cycling gear prize (TBD)", es: "3er puesto — premio de material ciclista (por confirmar)" },

  // ---------- Stage detail page ----------
  "stage.makeYourPick": { en: "Make your pick", es: "Haz tu predicción" },
  "stage.elevationProfile": { en: "Course character", es: "Carácter del recorrido" },
  "stage.stagePreview": { en: "Stage preview", es: "Previa de la etapa" },
  "stage.moreInfo": { en: "More detailed stage info", es: "Más información de la etapa" },
  "stage.allStages": { en: "All events", es: "Todas las pruebas" },
  "stage.yourPick": { en: "Your pick:", es: "Tu predicción:" },
  "stage.none": { en: "none", es: "ninguna" },
  "stage.points": { en: "points", es: "puntos" },
  "stage.of21": { en: "of all events", es: "de todas las pruebas" },
  "stage.notFound": { en: "Stage not found", es: "Etapa no encontrada" },
  // ---------- Week headers ----------
  "week.1.title": { en: "Week 1 — Monaco to the Mediterranean", es: "Semana 1 — De Mónaco al Mediterráneo" },
  "week.1.subtitle": {
    en: "Monaco time trial, the Pyrenees, Andorra and the gravel stage",
    es: "Crono en Mónaco, los Pirineos, Andorra y la etapa de grava",
  },
  "week.2.title": { en: "Week 2 — Murcia, Almería & Granada", es: "Semana 2 — Murcia, Almería y Granada" },
  "week.2.subtitle": {
    en: "Calar Alto and the brutal summit finish on the Sierra de la Pandera",
    es: "Calar Alto y el durísimo final en alto de la Sierra de la Pandera",
  },
  "week.3.title": { en: "Week 3 — Andalusia & the Alhambra", es: "Semana 3 — Andalucía y la Alhambra" },
  "week.3.subtitle": {
    en: "The decisive Jerez time trial, the queen stage, and the climb to the Alhambra",
    es: "La crono decisiva de Jerez, la etapa reina, y la subida a la Alhambra",
  },
  "specialty.All": { en: "All", es: "Todos" },
  "specialty.Climber": { en: "Climber", es: "Escalador" },
  "specialty.Puncheur": { en: "Puncheur", es: "Punchador" },
  "specialty.Sprinter": { en: "Sprinter", es: "Esprínter" },
  "specialty.Time triallist": { en: "Time triallist", es: "Contrarrelojista" },

  // ---------- Disclaimer banner ----------
  "disclaimer.text": {
    en: "National selections are still provisional. Federations confirm their final squads in the days before each race, so names here may still change.",
    es: "Las selecciones nacionales todavía son provisionales. Las federaciones confirman sus listas definitivas en los días previos a cada prueba, así que los nombres pueden cambiar.",
  },

  // ---------- Cookie banner ----------
  "cookie.text": { en: "We use cookies for basic analytics and to show ads. See our", es: "Usamos cookies para analítica básica y para mostrar anuncios. Consulta nuestra" },
  "cookie.privacyLink": { en: "privacy policy", es: "política de privacidad" },
  "cookie.forDetails": { en: "for details.", es: "para más información." },
  "cookie.gotIt": { en: "Got it", es: "Entendido" },

  // ---------- Auth modal ----------
  "auth.signup": { en: "Sign up", es: "Regístrate" },
  "auth.login": { en: "Log in", es: "Inicia sesión" },
  "auth.joinPool": { en: "Join the pool", es: "Únete a la porra" },
  "auth.welcomeBack": { en: "Welcome back", es: "Bienvenido de nuevo" },
  "auth.fullName": { en: "Full name", es: "Nombre completo" },
  "auth.email": { en: "Email", es: "Correo electrónico" },
  "auth.password": { en: "Password", es: "Contraseña" },
  "auth.createAccount": { en: "Create account & play", es: "Crear cuenta y jugar" },
  "auth.cancel": { en: "Cancel", es: "Cancelar" },
  "auth.needHelp": { en: "Need help? Contact us.", es: "¿Necesitas ayuda? Contáctanos." },
  "auth.fillFields": { en: "Please fill in every field.", es: "Por favor, rellena todos los campos." },
  "auth.passwordLength": { en: "Password must be at least 6 characters.", es: "La contraseña debe tener al menos 6 caracteres." },
  "auth.optIn": {
    en: "Send me optional game updates, reminders and result emails. You can opt out any time.",
    es: "Envíame actualizaciones opcionales del juego, recordatorios y correos de resultados. Puedes darte de baja cuando quieras.",
  },
  "auth.preferredLanguage": { en: "Preferred language", es: "Idioma preferido" },
  "auth.consentNote": {
    en: "Creating an account does not subscribe you to optional game emails. You can opt in separately and change that preference later.",
    es: "Crear una cuenta no te suscribe a correos opcionales del juego. Puedes aceptarlos por separado y cambiar esa preferencia más adelante.",
  },
  "auth.forgotPassword": { en: "Forgot your password?", es: "¿Has olvidado tu contraseña?" },
  "auth.resetPassword": { en: "Reset your password", es: "Recupera tu contraseña" },
  "auth.sendResetLink": { en: "Send reset link", es: "Enviar enlace de recuperación" },
  "auth.backToLogin": { en: "Back to log in", es: "Volver a iniciar sesión" },
  "auth.resetSent": { en: "If an account exists for that email, we've sent a password reset link to", es: "Si existe una cuenta con ese correo, te hemos enviado un enlace de recuperación a" },

  // ---------- Home (app/page.js, the shared Dashboard) ----------
  "home.eyebrow": { en: "UCI Road World Championships · Montreal, 20—27 September 2026", es: "Mundial de Ciclismo en Ruta · Montreal, 20—27 de septiembre de 2026" },
  "home.title": { en: "Road Worlds Pool 2026", es: "Porra del Mundial 2026" },
  "home.subtitle": {
    en: "Predict who takes the rainbow jersey in Montreal. 273.7 km · 3,803 m of climbing · twelve laps of Mount Royal · the most open Worlds in years, with Pogacar absent.",
    es: "Predice quién se lleva el maillot arcoíris en Montreal. 273,7 km · 3.803 m de desnivel · doce vueltas al Mont Royal · el Mundial más abierto en años, con Pogacar ausente.",
  },
  "home.signupBtn": { en: "Sign up free - start predicting", es: "Regístrate gratis y empieza a jugar" },
  "home.signupSub": { en: "Free forever - takes 30 seconds", es: "Gratis para siempre - tarda 30 segundos" },
  "home.nextStageIn": { en: "Next stage in", es: "Próxima etapa en" },
  "home.days": { en: "days", es: "días" },
  "home.hours": { en: "hours", es: "horas" },
  "home.min": { en: "min", es: "min" },
  "home.sec": { en: "sec", es: "seg" },
  "home.stageWord": { en: "Race", es: "Prueba" },
  "home.toWord": { en: "to", es: "a" },
  "home.climbing": { en: "climbing", es: "desnivel" },
  "home.seeAndPredict": { en: "See and predict this stage", es: "Ver y predecir esta etapa" },
  "home.stageOf21Done": { en: "of 21 done", es: "de 21 hecha" },
  "home.notStartedYet": { en: "Not started yet", es: "Aún no ha empezado" },
  "home.stagesMarker": { en: "Events · ▼ marks where we are", es: "Pruebas · ▼ marca dónde estamos" },
  "home.wrapEyebrow": { en: "That's a wrap", es: "Eso es todo" },
  "home.wrapBody": { en: "All events are done. Thanks for playing!", es: "Todas las pruebas han terminado. ¡Gracias por jugar!" },
  "home.jerseyBannerLock": { en: "Lock in your jersey predictions!", es: "¡Asegura tus pronósticos de maillots!" },
  "home.jerseyBannerBody": {
    en: "Red, Green, Polka Dot & White picks close",
    es: "Las predicciones de maillots Rojo, Verde, Topos y Blanco se cierran",
  },
  "home.jerseyBannerAfter": { en: "Wed 26 August at 12:15 CEST — don't leave it too late.", es: "miércoles 26 de agosto a las 12:15 CEST — ¡no lo dejes para el último momento!" },
  "home.recapTitle": { en: "recap", es: "resumen" },
  "home.resultNotEntered": { en: "Result not entered yet.", es: "Resultado aún no introducido." },
  "home.leaderboard": { en: "Leaderboard", es: "Clasificación" },
  "home.noResultsYet": { en: "No results have been entered yet.", es: "Aún no se ha introducido ningún resultado." },
  "home.viewFullLeaderboard": { en: "View full leaderboard", es: "Ver clasificación completa" },
  "home.tourProgress": { en: "Championship progress", es: "Progreso del Mundial" },
  "home.pickCloses": { en: "Pick closes 1h before the start", es: "El pick se cierra 1h antes de la salida" },
  "home.liveStandings": { en: "Live standings", es: "Clasificación en directo" },
  "home.scoringExplainer": {
    en: "10 points for a correct winner, 5 if your rider finishes 2nd and 2 if they finish 3rd. See the",
    es: "10 puntos si aciertas al ganador, 5 si tu corredor llega 2º y 2 si llega 3º. Consulta las",
  },
  "home.fullRules": { en: "full rules", es: "normas completas" },
  "home.scoringExplainerAfter": { en: "for deadlines, ties and prizes.", es: "para ver los cierres, desempates y premios." },
};
