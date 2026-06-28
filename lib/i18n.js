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
    en: "🏆 10 points for every jersey you call correctly — up to 40 points total",
    es: "🏆 10 puntos por cada maillot que aciertes — hasta 40 puntos en total",
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
    en: "Tap a team to see its riders, or search a name directly. Teams marked \u2713 Official lineup have their full Tour 2026 squad confirmed — everyone else's roster is still being filled in as teams announce their riders.",
    es: "Toca un equipo para ver sus corredores, o busca un nombre directamente. Los equipos marcados con \u2713 Alineación oficial ya tienen su equipo completo confirmado para el Tour 2026 — el resto se irá completando a medida que los equipos anuncien a sus corredores.",
  },
  "riders.searchPlaceholder": { en: "Search a rider by name...", es: "Busca un corredor por nombre..." },
  "riders.unconfirmed": { en: "unconfirmed", es: "sin confirmar" },
  "riders.tbc": { en: "TBC", es: "Por confirmar" },
  "riders.officialLineup": { en: "Official lineup", es: "Alineación oficial" },
  "riders.noRidersYet": {
    en: "No riders confirmed for this team yet — check back closer to the Tour.",
    es: "Todavía no hay corredores confirmados para este equipo — vuelve más cerca del Tour.",
  },

  // ---------- Leaderboard page ----------
  "leaderboard.eyebrow": { en: "Overall standings", es: "Clasificación general" },
  "leaderboard.title": { en: "Leaderboard", es: "Clasificación" },
  "leaderboard.subtitle": {
    en: "10 points for the right winner, 5 if your pick finishes 2nd, 2 if they finish 3rd — plus 10 points for every jersey you call correctly.",
    es: "10 puntos por acertar el ganador, 5 si tu corredor llega 2º, 2 si llega 3º — más 10 puntos por cada maillot que aciertes.",
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
    en: "Besides the stages, you can predict who wins the Yellow, Green, Polka Dot, and White jerseys. These predictions lock on the day the Tour starts. Each jersey you predict correctly adds 10 points to your leaderboard total — up to 40 points if you get all four right, on top of whatever you score from your 21 stage picks.",
    es: "Además de las etapas, puedes predecir quién gana los maillots Amarillo, Verde, de Lunares y Blanco. Estas predicciones se bloquean el día que empieza el Tour. Cada maillot que aciertes suma 10 puntos a tu clasificación — hasta 40 puntos si aciertas los cuatro, además de lo que sumes con tus 21 predicciones de etapa.",
  },
  "rules.prizes.title": { en: "Prizes", es: "Premios" },
  "rules.prizes.body": {
    en: "There will be 3 prizes at the end of the Tour, all cycling gear (exact items to be confirmed). Standings are based on total points from the stage predictions.",
    es: "Habrá 3 premios al final del Tour, todos material ciclista (los artículos exactos están por confirmar). La clasificación se basa en los puntos totales de las predicciones de etapa.",
  },
  "rules.prize1": { en: "1st place — cycling gear prize (TBD)", es: "1er puesto — premio de material ciclista (por confirmar)" },
  "rules.prize2": { en: "2nd place — cycling gear prize (TBD)", es: "2º puesto — premio de material ciclista (por confirmar)" },
  "rules.prize3": { en: "3rd place — cycling gear prize (TBD)", es: "3er puesto — premio de material ciclista (por confirmar)" },

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
  "stage.notFound": { en: "Stage not found", es: "Etapa no encontrada" },
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

  // ---------- Disclaimer banner ----------
  "disclaimer.text": {
    en: "Rider squads aren't official yet. The Tour de France 2026 has 23 teams, but full 8-rider rosters are usually only confirmed 1-2 weeks before the start. The riders you see here are a partial, growing list — more will be added as teams confirm them.",
    es: "Las plantillas todavía no son oficiales. El Tour de Francia 2026 tiene 23 equipos, pero las plantillas completas de 8 corredores normalmente solo se confirman 1-2 semanas antes de la salida. Los corredores que ves aquí son una lista parcial y creciente — se irán añadiendo más a medida que los equipos los confirmen.",
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
    en: "Send me essential emails about this game (like reminders before predictions close). You can opt out any time.",
    es: "Envíame correos esenciales sobre el juego (como recordatorios antes de que cierren las predicciones). Puedes darte de baja cuando quieras.",
  },
  "auth.preferredLanguage": { en: "Preferred language", es: "Idioma preferido" },
  "auth.consentNote": {
    en: "By signing up, you agree to receive essential emails about this game (like deadline reminders). You can ask to stop these any time via our contact page.",
    es: "Al registrarte, aceptas recibir correos esenciales sobre el juego (como recordatorios de plazos). Puedes pedir que dejemos de enviártelos cuando quieras desde nuestra página de contacto.",
  },
  "auth.forgotPassword": { en: "Forgot your password?", es: "¿Has olvidado tu contraseña?" },
  "auth.resetPassword": { en: "Reset your password", es: "Recupera tu contraseña" },
  "auth.sendResetLink": { en: "Send reset link", es: "Enviar enlace de recuperación" },
  "auth.backToLogin": { en: "Back to log in", es: "Volver a iniciar sesión" },
  "auth.resetSent": { en: "If an account exists for that email, we've sent a password reset link to", es: "Si existe una cuenta con ese correo, te hemos enviado un enlace de recuperación a" },

  // ---------- Home (app/page.js, the shared Dashboard) ----------
  "home.eyebrow": { en: "Tour de France 2026 · 4 — 26 July", es: "Tour de Francia 2026 · 4 — 26 de julio" },
  "home.title": { en: "Tour de France Pool", es: "Porra del Tour de Francia 2026" },
  "home.subtitle": {
    en: "Pick a winner for every stage, beat your friends, and win cycling gear. 3,321 km · 21 stages · 56,308 m of climbing · Barcelona to Paris, with Alpe d'Huez twice in the final week.",
    es: "Elige un ganador para cada etapa, demuestra a tus amigos que sabes más de ciclismo, y gana material de ciclismo. 3.321 km · 21 etapas · 56.308 m de desnivel · de Barcelona a París, con doble ascensión a Alpe d'Huez en la última semana.",
  },
  "home.signupBtn": { en: "Sign up free - start predicting", es: "Regístrate gratis y empieza a jugar" },
  "home.signupSub": { en: "Free forever - takes 30 seconds", es: "Gratis para siempre - tarda 30 segundos" },
  "home.nextStageIn": { en: "Next stage in", es: "Próxima etapa en" },
  "home.days": { en: "days", es: "días" },
  "home.hours": { en: "hours", es: "horas" },
  "home.min": { en: "min", es: "min" },
  "home.sec": { en: "sec", es: "seg" },
  "home.stageWord": { en: "Stage", es: "Etapa" },
  "home.toWord": { en: "to", es: "a" },
  "home.climbing": { en: "climbing", es: "desnivel" },
  "home.seeAndPredict": { en: "See and predict this stage", es: "Ver y predecir esta etapa" },
  "home.stageOf21Done": { en: "of 21 done", es: "de 21 hecha" },
  "home.notStartedYet": { en: "Not started yet", es: "Aún no ha empezado" },
  "home.stagesMarker": { en: "21 stages · ▼ marks where we are", es: "21 etapas · ▼ marca dónde estamos" },
  "home.wrapEyebrow": { en: "That's a wrap", es: "Eso es todo" },
  "home.wrapBody": { en: "All 21 stages are done. See you next July!", es: "Las 21 etapas han terminado. ¡Nos vemos en julio!" },
  "home.jerseyBannerLock": { en: "Lock in your jersey predictions now.", es: "Asegura ya tus pronósticos de maillots." },
  "home.jerseyBannerBody": {
    en: "Yellow, Green, Polka Dot & White jersey picks close",
    es: "Las predicciones de los maillots Amarillo, Verde, de Topos y Blanco se bloquean",
  },
  "home.jerseyBannerAfter": { en: "once the Tour starts, it's too late.", es: "una vez empiece el Tour, ya no podrás cambiarlas." },
  "home.recapTitle": { en: "recap", es: "resumen" },
  "home.resultNotEntered": { en: "Result not entered yet.", es: "Resultado aún no introducido." },
  "home.leaderboard": { en: "Leaderboard", es: "Clasificación" },
  "home.noResultsYet": { en: "No results have been entered yet.", es: "Aún no se ha introducido ningún resultado." },
  "home.viewFullLeaderboard": { en: "View full leaderboard", es: "Ver clasificación completa" },
  "home.howScoringWorks": { en: "How scoring works", es: "Cómo funciona la puntuación" },
  "home.scoringExplainer": {
    en: "10 points for a correct winner, 5 if your rider finishes 2nd, 2 if they finish 3rd — plus 10 points for every jersey you call correctly. See the",
    es: "10 puntos si aciertas al ganador, 5 si tu corredor llega 2º, 2 si llega 3º — además de 10 puntos por cada maillot que aciertes. Consulta las",
  },
  "home.fullRules": { en: "full rules", es: "normas completas" },
  "home.scoringExplainerAfter": { en: "for jerseys and prizes.", es: "para ver los premios y los maillots." },
};
