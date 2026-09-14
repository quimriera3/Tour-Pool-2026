import { getRace, getActiveRace, localised, raceBasePath } from "./races";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.grandtourpool.com";

function raceFor(slug) { return getRace(slug) || getActiveRace(); }

export function getWebSiteSchema(lang = "en", raceSlug) {
  const race = raceFor(raceSlug);
  const base = raceBasePath(race, lang === "es" ? "es" : "en");
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Grand Tour Pool",
    url: SITE_URL + (base || "/"),
    description: lang === "es"
      ? `Porra gratuita de ${localised(race.name, "es")}: haz tus predicciones y compite en la clasificación.`
      : `Free ${localised(race.name, "en")} prediction pool: make your picks and compete on the live leaderboard.`,
    inLanguage: lang,
  };
}

export function getSportsEventSchema(lang = "en", raceSlug) {
  const race = raceFor(raceSlug);
  const base = raceBasePath(race, lang === "es" ? "es" : "en");
  const confirmed = (race.riders || []).filter((r) => r.confirmed === true).slice(0, 12);
  const category = race.category === "women" ? (lang === "es" ? "femenina élite" : "elite women") : race.category === "men" ? (lang === "es" ? "masculina élite" : "elite men") : "";
  const mainStage = race.stages?.[race.stages.length - 1];
  const description = lang === "es"
    ? `${localised(race.name, "es")}${category ? `, categoría ${category}` : ""}, en ${race.host?.city || ""}. ${mainStage ? `${mainStage.km} km${mainStage.elevationGain ? ` y ${mainStage.elevationGain.toLocaleString("es-ES")} m de desnivel` : ""}.` : ""}`
    : `${localised(race.name, "en")}${category ? `, ${category}` : ""}, in ${race.host?.city || ""}. ${mainStage ? `${mainStage.km} km${mainStage.elevationGain ? ` with ${mainStage.elevationGain.toLocaleString("en-US")} m of climbing` : ""}.` : ""}`;

  return {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: `${localised(race.name, lang)}${race.category ? ` — ${race.category}` : ""}`,
    sport: "Cycling",
    startDate: race.startDate,
    endDate: race.endDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: race.host ? {
      "@type": "Place",
      name: `${race.host.city}, ${race.host.country}`,
      address: { "@type": "PostalAddress", addressCountry: race.host.country === "Canada" ? "CA" : race.host.country, addressLocality: race.host.city },
    } : undefined,
    image: [SITE_URL + "/og-image.png?v=5"],
    organizer: { "@type": "Organization", name: "Union Cycliste Internationale (UCI)", url: "https://www.uci.org" },
    description,
    url: SITE_URL + base + "/preview",
    ...(confirmed.length ? { competitor: confirmed.map((r) => ({ "@type": "Person", name: r.name })) } : {}),
  };
}
