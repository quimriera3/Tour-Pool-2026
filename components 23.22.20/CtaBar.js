"use client";
// components/CtaBar.js
import { useLang, t } from "../lib/i18n";

export default function CtaBar() {
  const lang = useLang();
  const prefix = lang === "es" ? "/es" : "";

  return (
    <div className="cta-bar">
      <div className="container cta-bar-inner">
        <a href={prefix + "/predictions"} className="cta-bar-btn">
          {t(lang, "cta.stage")}<br className="cta-break" /> {t(lang, "cta.stageLine2")}
        </a>
        <a href={prefix + "/final-classification"} className="cta-bar-btn">
          {t(lang, "cta.jersey")}<br className="cta-break" /> {t(lang, "cta.jerseyLine2")}
        </a>
      </div>
    </div>
  );
}
