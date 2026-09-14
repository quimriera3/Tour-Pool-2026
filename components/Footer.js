"use client";
import { useLang } from "../lib/i18n";
import { useRaceBase } from "../lib/useRace";

export default function Footer() {
  const lang = useLang();
  const prefix = lang === "es" ? "/es" : "";
  const base = useRaceBase();
  return (
    <footer className="footer-note container">
      <div className="footer-primary"><strong>Grand Tour Pool</strong><span>Free cycling prediction games.</span></div>
      <nav className="footer-links" aria-label="Footer">
        <a href={base + "/rules"}>{lang === "es" ? "Reglas" : "Rules"}</a>
        <a href={base + "/faq"}>FAQ</a>
        <a href={prefix + "/privacy"}>{lang === "es" ? "Privacidad" : "Privacy"}</a>
        <a href={prefix + "/contact"}>{lang === "es" ? "Contacto" : "Contact"}</a>
        <a href="/tour-de-france-2026">{lang === "es" ? "Archivo: Tour 2026" : "Archive: Tour 2026"}</a>
      </nav>
      <div className="footer-languages">{lang === "es" ? "Idiomas editoriales:" : "Editorial languages:"} <a href="/">English</a> · <a href="/es">Español</a> · <a href="/ca">Català</a> · <a href="/fr">Français</a> · <a href="/it">Italiano</a> · <a href="/nl">Nederlands</a></div>
      <small>© 2026 Grand Tour Pool. All rights reserved.</small>
    </footer>
  );
}
