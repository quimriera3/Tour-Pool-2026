// lib/structuredData.js
//
// Schema.org JSON-LD for the homepage: a WebSite entity for Grand Tour Pool
// itself, and a SportsEvent entity describing the real Tour de France 2026
// (the event our content and predictions are about). The SportsEvent's
// `competitor` list surfaces the riders mentioned in the preview article as
// distinct Person entities, which is what ties our "25 key riders" copy to
// real-world entities for search engines.

const SITE_URL = "https://www.grandtourpool.com";

// Same 25 riders bolded in lib/previewArticle.js. Kept as plain names (no
// team) here -- schema.org Person doesn't need the team for this purpose.
const KEY_RIDERS = [
  "Tadej Pogačar",
  "Jonas Vingegaard",
  "Remco Evenepoel",
  "Paul Seixas",
  "Isaac del Toro",
  "Florian Lipowitz",
  "Sepp Kuss",
  "Matteo Jorgenson",
  "Kévin Vauquelin",
  "David Gaudu",
  "João Almeida",
  "Mattias Skjelmose",
  "Jonathan Milan",
  "Jasper Philipsen",
  "Tim Merlier",
  "Biniam Girmay",
  "Arnaud De Lie",
  "Olav Kooij",
  "Jordi Meeus",
  "Bryan Coquard",
  "Julian Alaphilippe",
  "Mathieu van der Poel",
  "Tom Pidcock",
  "Lenny Martinez",
  "Jordan Jegat",
];

const SITE_NAME_BY_LANG = {
  en: "Grand Tour Pool",
  es: "Grand Tour Pool",
  ca: "Grand Tour Pool",
  fr: "Grand Tour Pool",
  it: "Grand Tour Pool",
  nl: "Grand Tour Pool",
};

const SITE_DESCRIPTION_BY_LANG = {
  en: "Free Tour de France 2026 predictions pool: pick a winner for every stage and jersey, and climb the live leaderboard.",
  es: "Porra gratuita del Tour de Francia 2026: elige un ganador para cada etapa y mallot, y sube en la clasificación en directo.",
};

const EVENT_DESCRIPTION_BY_LANG = {
  en: "The 2026 Tour de France: 21 stages from Barcelona to Paris, 4-26 July 2026.",
  es: "El Tour de Francia 2026: 21 etapas de Barcelona a París, del 4 al 26 de julio de 2026.",
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
    name: "Tour de France 2026",
    sport: "Cycling",
    startDate: "2026-07-04",
    endDate: "2026-07-26",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "France (start: Barcelona, Spain)",
      address: {
        "@type": "PostalAddress",
        addressCountry: "FR",
      },
    },
    image: [SITE_URL + "/og-image.png?v=2"],
    organizer: {
      "@type": "Organization",
      name: "Amaury Sport Organisation (ASO)",
      url: "https://www.letour.fr",
    },
    description: EVENT_DESCRIPTION_BY_LANG[lang] || EVENT_DESCRIPTION_BY_LANG.en,
    url: SITE_URL + (lang === "en" ? "/preview" : "/" + lang + "/preview"),
    // Real riders mentioned in our preview article. Schema.org's SportsEvent
    // accepts the same Person entities as both `competitor` (the field built
    // specifically for sports participants) and `performer` (inherited from
    // Event, which is what some validators/checkers look for) -- both are
    // true, so both are filled.
    competitor: riders,
    performer: riders,
  };
}
