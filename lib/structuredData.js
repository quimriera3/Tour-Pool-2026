// lib/structuredData.js
//
// Schema.org JSON-LD for the homepage: a WebSite entity for Grand Tour Pool
// itself, and a SportsEvent entity describing the real race
// (the event our content and predictions are about). The SportsEvent's
// `competitor` list surfaces the riders mentioned in the preview article as
// distinct Person entities, which is what ties our "25 key riders" copy to
// real-world entities for search engines.

const SITE_URL = "https://www.grandtourpool.com";

// Same 25 riders bolded in lib/previewArticle.js. Kept as plain names (no
// team) here -- schema.org Person doesn't need the team for this purpose.
// Riders are only listed once a startlist is published. La Vuelta's squads are
// confirmed in the week before the start, so this stays empty until then --
// listing riders who may not ride would be inventing data.
const KEY_RIDERS = [];

const SITE_NAME_BY_LANG = {
  en: "Grand Tour Pool",
  es: "Grand Tour Pool",
  ca: "Grand Tour Pool",
  fr: "Grand Tour Pool",
  it: "Grand Tour Pool",
  nl: "Grand Tour Pool",
};

const SITE_DESCRIPTION_BY_LANG = {
  en: "Free La Vuelta 2026 predictions pool: pick a winner for every stage and jersey, and climb the live leaderboard.",
  es: "Porra gratuita de La Vuelta 2026: elige un ganador para cada etapa y maillot, y sube en la clasificación en directo.",
};

const EVENT_DESCRIPTION_BY_LANG = {
  en: "La Vuelta a España 2026: 21 stages from Monaco to Granada, 22 August - 13 September 2026.",
  es: "La Vuelta a España 2026: 21 etapas de Mónaco a Granada, del 22 de agosto al 13 de septiembre de 2026.",
};

export function getWebSiteSchema(lang) {
  const path = lang === "en" ? "/" : "/" + lang;
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME_BY_LANG[lang] || SITE_NAME_BY_LANG.en,
    url: SITE_URL + path,
    description: SITE_DESCRIPTION_BY_LANG[lang] || SITE_DESCRIPTION_BY_LANG.en,
    inLanguage: lang,
  };
}

export function getSportsEventSchema(lang) {
  const riders = KEY_RIDERS.map((name) => ({ "@type": "Person", name }));
  return {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: "La Vuelta a España 2026",
    sport: "Cycling",
    startDate: "2026-08-22",
    endDate: "2026-09-13",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Spain (start: Monaco; also France and Andorra)",
      address: {
        "@type": "PostalAddress",
        addressCountry: "ES",
      },
    },
    image: [SITE_URL + "/og-image.png?v=2"],
    organizer: {
      "@type": "Organization",
      name: "Unipublic",
      url: "https://www.lavuelta.es",
    },
    description: EVENT_DESCRIPTION_BY_LANG[lang] || EVENT_DESCRIPTION_BY_LANG.en,
    url: SITE_URL + (lang === "en" ? "/preview" : "/" + lang + "/preview"),
    // Real riders mentioned in our preview article. Schema.org's SportsEvent
    // accepts the same Person entities as both `competitor` (the field built
    // specifically for sports participants) and `performer` (inherited from
    // Event, which is what some validators/checkers look for) -- both are
    // true, so both are filled.
    ...(riders.length ? { competitor: riders, performer: riders } : {}),
  };
}
