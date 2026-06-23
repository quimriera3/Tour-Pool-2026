"use client";
// components/CtaBar.js
import { usePathname } from "next/navigation";
import { useLang, t } from "../lib/i18n";

// On the homepage (in every language) the "Sign up free" button in the Hero
// is the one true primary CTA, so this bar recedes into soft, ghost-style
// text links instead of competing yellow pill buttons. Everywhere else on
// the site it keeps its normal, prominent look.
const HOME_PATHS = new Set(["/", "/es", "/ca", "/fr", "/it", "/nl"]);

export default function CtaBar() {
  const lang = useLang();
  const pathname = usePathname();
  const isHome = HOME_PATHS.has(pathname);
  const prefix = lang === "es" ? "/es" : "";

  if (isHome) {
    return (
      <div className="cta-bar cta-bar-soft">
        <div className="container cta-bar-inner">
          <a href={prefix + "/predictions"} className="cta-bar-btn ghost-text">
            {t(lang, "cta.stage")} {t(lang, "cta.stageLine2")}
          </a>
          <a href={prefix + "/final-classification"} className="cta-bar-btn ghost-text">
            {t(lang, "cta.jersey")} {t(lang, "cta.jerseyLine2")}
          </a>
        </div>
      </div>
    );
  }

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
