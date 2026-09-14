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
// The riders our preview analyses in depth. Listing them as Person entities
// ties the article's names to real-world identities for search engines.
const KEY_RIDERS = [
  "Remco Evenepoel",
  "Isaac del Toro",
  "Mathieu van der Poel",
  "Tom Pidcock",
  "Wout van Aert",
  "Primož Roglič",
  "Juan Ayuso",
  "Paul Seixas",
  "Richard Carapaz",
  "Marc Hirschi",
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
  en: "Free 2026 Road World Championships prediction pool: pick who takes the rainbow jersey in Montreal and climb the live leaderboard.",
  es: "Porra gratuita del Mundial de Ciclismo 2026: elige quién se lleva el maillot arcoíris en Montreal y sube en la clasificación en directo.",
};

const EVENT_DESCRIPTION_BY_LANG = {
  en: "The 99th UCI Road World Championships, Montreal, 20-27 September 2026. The elite men\u0027s road race covers 273.4 km with 3,803 m of climbing on the Mount Royal circuit.",
  es: "El 99.\u00ba Mundial de Ciclismo en Ruta UCI, Montreal, del 20 al 27 de septiembre de 2026. La prueba \u00e9lite masculina recorre 273,4 km con 3.803 m de desnivel en el circuito del Mont Royal.",
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
    name: "2026 UCI Road World Championships",
    sport: "Cycling",
    startDate: "2026-09-20",
    endDate: "2026-09-27",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Montreal, Quebec, Canada",
      address: {
        "@type": "PostalAddress",
        addressCountry: "CA",
        addressLocality: "Montreal",
        addressRegion: "Quebec",
      },
    },
    image: [SITE_URL + "/og-image.png?v=2"],
    organizer: {
      "@type": "Organization",
      name: "Union Cycliste Internationale (UCI)",
      url: "https://www.uci.org",
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
