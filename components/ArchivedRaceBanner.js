"use client";
// components/ArchivedRaceBanner.js
//
// Shown at the top of pages belonging to a race that is over.
//
// These pages stay online and fully readable — they are removed from the site
// navigation, but anyone arriving from a search result still gets the real
// content plus a clear pointer to the current race. That is deliberate: they
// have months of accumulated search ranking, and serving a different page to
// crawlers than to people would be cloaking, which risks a penalty on the
// whole domain.
import { useLang } from "../lib/i18n";

const COPY = {
  en: {
    label: "Archive",
    body: (race) => `This page covers ${race}, which has finished. Results and standings below are final.`,
    cta: "Go to the current race",
  },
  es: {
    label: "Archivo",
    body: (race) => `Esta página corresponde al ${race}, que ya ha terminado. Los resultados y la clasificación son definitivos.`,
    cta: "Ir a la carrera actual",
  },
};

export default function ArchivedRaceBanner({ raceName, href = "/" }) {
  const lang = useLang();
  const c = COPY[lang] || COPY.en;

  return (
    <div className="archive-banner">
      <span className="archive-banner-label">{c.label}</span>
      <p>{c.body(raceName)}</p>
      <a href={href}>{c.cta} →</a>
    </div>
  );
}
