"use client";

// The Worlds navigation is intentionally game-first. Historical races stay in
// the archive/footer; the top bar only contains actions that matter right now.
// Plain <a> tags are deliberate — see HANDOFF: next/link caused silent failures.
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import AuthModal from "./AuthModal";
import CategorySwitcher from "./CategorySwitcher";
import { raceFromPathname, localised, hasJerseys } from "../lib/races";
import { useRaceBase } from "../lib/useRace";
import { useSession, logoutUser } from "../lib/store";
import { useLang, t } from "../lib/i18n";

function navLinks(lang, base, race) {
  const prefix = base !== undefined ? base : (lang === "es" ? "/es" : "");
  return [
    { href: prefix || "/", key: "nav.home", icon: "home", mobileOnly: true },
    { href: prefix + "/predictions", key: "nav.stages", icon: "flag", play: true },
    ...(hasJerseys(race) ? [{ href: prefix + "/final-classification", key: "nav.jerseys", icon: "jersey" }] : []),
    { href: prefix + "/leaderboard", key: "nav.leaderboard", icon: "trophy" },
    { href: prefix + "/riders", key: "nav.riders", icon: "riders" },
    { href: prefix + "/rules", key: "nav.rules", icon: "book", info: true },
    { href: prefix + "/faq", key: "nav.faq", icon: "help", mobileOnly: true },
  ];
}

function NavIcon({ name }) {
  const common = { width: 17, height: 17, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
  const paths = {
    home: <><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /></>,
    flag: <><path d="M4 21V4" /><path d="M4 4h12l-2 4 2 4H4" /></>,
    jersey: <><path d="M8 3 5 5l-2 3 3 2v11h12V10l3-2-2-3-3-2" /><path d="M8 3a4 4 0 0 0 8 0" /></>,
    riders: <><circle cx="9" cy="8" r="3" /><path d="M3 21v-1a6 6 0 0 1 12 0v1" /><path d="M17 11a3 3 0 1 0 0-6" /><path d="M19 21v-1a5 5 0 0 0-2-4" /></>,
    trophy: <><path d="M7 4h10v6a5 5 0 0 1-10 0V4Z" /><path d="M7 6H4v2a3 3 0 0 0 3 3" /><path d="M17 6h3v2a3 3 0 0 1-3 3" /><path d="M10 20h4" /><path d="M12 15v5" /></>,
    book: <><path d="M4 4h11a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3Z" /><path d="M18 7h2v13H7" /></>,
    help: <><circle cx="12" cy="12" r="9" /><path d="M9.5 9.5a2.5 2.5 0 1 1 3 2.5v1.5" /><path d="M12 17h.01" /></>,
  };
  return <svg {...common} aria-hidden="true">{paths[name] || paths.home}</svg>;
}

const LANGUAGES = [
  { code: "en", short: "EN", label: "English" },
  { code: "es", short: "ES", label: "Español" },
  { code: "fr", short: "FR", label: "Français" },
  { code: "it", short: "IT", label: "Italiano" },
  { code: "nl", short: "NL", label: "Nederlands" },
  { code: "ca", short: "CA", label: "Català" },
];

function currentLangCode(pathname) {
  const match = LANGUAGES.find((l) => l.code !== "en" && pathname.startsWith("/" + l.code));
  return match ? match.code : "en";
}

function languageHref(code, pathname) {
  const stripped = pathname.replace(/^\/(es|fr|it|nl|ca)(?=\/|$)/, "") || "/";
  if (code === "en") return stripped;
  if (code === "es") return "/es" + (stripped === "/" ? "" : stripped);
  // CA/FR/IT/NL have editorial landing + preview only.
  return "/" + code + (stripped === "/preview" ? "/preview" : "");
}

function LangSwitcher({ pathname }) {
  const [open, setOpen] = useState(false);
  const current = currentLangCode(pathname);
  const currentShort = LANGUAGES.find((l) => l.code === current)?.short || "EN";

  return (
    <div className="lang-switcher nav-v98-language">
      <button type="button" onClick={() => setOpen((v) => !v)} className="lang-switcher-btn" aria-expanded={open} aria-haspopup="menu" aria-label="Language">
        {currentShort}<span aria-hidden="true">⌄</span>
      </button>
      {open && (
        <div className="lang-menu" role="menu">
          {LANGUAGES.map((l) => (
            <a key={l.code} href={languageHref(l.code, pathname)} className={l.code === current ? "active" : ""} role="menuitem">{l.label}</a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const lang = useLang();
  const session = useSession();
  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event) => { if (event.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const raceBase = useRaceBase();
  const currentRace = raceFromPathname(pathname);
  const links = navLinks(lang, raceBase, currentRace);
  const logoHref = raceBase || "/";

  return (
    <nav className="nav nav-v98">
      <div className="nav-inner nav-v98-inner">
        <a href={logoHref} className="logo-link nav-v98-brand" aria-label={localised(currentRace.brandName, lang)}>
          <span className="brand"><span className="brand-race">{localised(currentRace.brandName, lang)}</span><span className="brand-pool">POOL</span></span>
          <small>MONTRÉAL · 2026</small>
        </a>

        <div id="site-navigation" className={"nav-links nav-v98-links" + (menuOpen ? " open" : "")}>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={
                "nav-btn nav-v98-link" +
                (l.play ? " nav-v98-play" : "") +
                (l.info ? " nav-v98-info" : "") +
                (pathname === l.href ? " active" : "") +
                (l.mobileOnly ? " mobile-only" : "")
              }
            >
              <span className="nav-btn-icon"><NavIcon name={l.icon} /></span>
              <span>{t(lang, l.key)}</span>
              {l.play && <b aria-hidden="true">→</b>}
            </a>
          ))}
          <div className="nav-v98-mobile-actions">
            <LangSwitcher pathname={pathname} />
            {session ? (
              <button className="btn btn-ghost nav-v98-mobile-account" onClick={() => logoutUser()}>{session.name} · {t(lang, "nav.logout")}</button>
            ) : (
              <button className="btn nav-v98-mobile-account" onClick={() => setShowModal(true)}>{t(lang, "nav.signup")}</button>
            )}
          </div>
        </div>

        <div className="nav-v98-tools">
          <CategorySwitcher />
          <div className="nav-v98-desktop-tool"><LangSwitcher pathname={pathname} /></div>
          <div className="nav-user nav-v98-user nav-v98-desktop-tool">
            {session ? (
              <>
                <span className="nav-v98-username">{session.name}</span>
                <button className="btn btn-ghost nav-v98-account" onClick={() => logoutUser()}>{t(lang, "nav.logout")}</button>
              </>
            ) : (
              <button className="btn nav-v98-account" onClick={() => setShowModal(true)}>{t(lang, "nav.signup")}</button>
            )}
          </div>
        </div>

        <button
          className="nav-hamburger nav-v98-hamburger"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {menuOpen ? <><line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" /></> : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>}
          </svg>
        </button>
      </div>
      {showModal && <AuthModal onClose={() => setShowModal(false)} onAuth={() => setShowModal(false)} />}
      {currentRace.theme?.rainbow && <div className="rainbow-band" />}
    </nav>
  );
}
