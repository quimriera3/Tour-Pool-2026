"use client";
// components/Nav.js
//
// Deliberately using plain <a> tags (not next/link's <Link>) -- see the note
// in the git history: Link's client-side navigation silently failed in a way
// we couldn't fully root-cause, while plain anchors always work reliably.
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import AuthModal from "./AuthModal";
import { useSession, logoutUser } from "../lib/store";
import { useLang, t } from "../lib/i18n";

// Stage/Jersey Predictions already get their own big buttons in the sitewide
// CTA bar (components/CtaBar.js) -- no need to repeat them here too.
function navLinks(lang) {
  const prefix = lang === "es" ? "/es" : "";
  return [
    { href: prefix || "/", key: "nav.home", icon: "home" },
    { href: prefix + "/predictions", key: "cta.stage", icon: "flag", mobileOnly: true },
    { href: prefix + "/final-classification", key: "cta.jersey", icon: "jersey", mobileOnly: true },
    { href: prefix + "/riders", key: "nav.riders", icon: "riders" },
    { href: prefix + "/leaderboard", key: "nav.leaderboard", icon: "trophy" },
    { href: prefix + "/rules", key: "nav.rules", icon: "book" },
    { href: prefix + "/faq", key: "nav.faq", icon: "help" },
  ];
}

// Small inline icons for the mobile menu. Kept as tiny inline SVG rather than
// an icon font so there's no extra network request and they inherit colour.
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
  { code: "en", short: "ENG", label: "English", href: "/" },
  { code: "es", short: "ESP", label: "Español", href: "/es" },
  { code: "fr", short: "FRA", label: "Français", href: "/fr" },
  { code: "it", short: "ITA", label: "Italiano", href: "/it" },
  { code: "nl", short: "NLD", label: "Nederlands", href: "/nl" },
  { code: "ca", short: "CAT", label: "Català", href: "/ca" },
];

function currentLangCode(pathname) {
  const match = LANGUAGES.find((l) => l.code !== "en" && pathname.startsWith("/" + l.code));
  return match ? match.code : "en";
}

function LangSwitcher({ pathname }) {
  const [open, setOpen] = useState(false);
  const current = currentLangCode(pathname);
  const currentShort = LANGUAGES.find((l) => l.code === current)?.short || "ENG";

  return (
    <div className="lang-switcher" style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="lang-switcher-btn"
      >
        {currentShort} <span style={{ fontSize: 9 }}>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            marginTop: 4,
            background: "var(--white)",
            border: "1.5px solid var(--black)",
            borderRadius: 8,
            overflow: "hidden",
            zIndex: 20,
            minWidth: 140,
          }}
        >
          {LANGUAGES.map((l) => (
            <a
              key={l.code}
              href={l.href}
              style={{
                display: "block",
                padding: "10px 14px",
                fontSize: 13,
                fontWeight: 700,
                color: l.code === current ? "var(--red)" : "var(--black)",
                borderBottom: "1px solid var(--grey-light)",
                textDecoration: "none",
              }}
            >
              {l.label}
            </a>
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

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const links = navLinks(lang);
  const logoHref = lang === "es" ? "/es" : "/";

  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href={logoHref} className="logo-link">
          <span className={"brand" + (menuOpen ? " brand-hidden-mobile" : "")}>
            <span style={{ color: "var(--accent)" }}>{t(lang, "brand.race")}</span>{" "}
            <span style={{ color: "var(--white)" }}>POOL</span>
          </span>
        </a>

        <LangSwitcher pathname={pathname} />

        <button
          className="nav-hamburger"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
            {menuOpen ? (
              <>
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>

        <div className={"nav-links" + (menuOpen ? " open" : "")}>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={
                "nav-btn secondary" +
                (pathname === l.href ? " active" : "") +
                (l.mobileOnly ? " mobile-only" : "")
              }
            >
              <span className="nav-btn-icon"><NavIcon name={l.icon} /></span>
              <span>{t(lang, l.key)}</span>
            </a>
          ))}
        </div>

        <div className={"nav-user" + (menuOpen ? " open" : "")}>
          {session ? (
            <>
              <span>{session.name}</span>
              <button className="btn btn-ghost" onClick={() => logoutUser()}>
                {t(lang, "nav.logout")}
              </button>
            </>
          ) : (
            <button className="btn" onClick={() => setShowModal(true)}>
              {t(lang, "nav.signup")}
            </button>
          )}
        </div>
      </div>
      {showModal && (
        <AuthModal onClose={() => setShowModal(false)} onAuth={() => setShowModal(false)} />
      )}
    </nav>
  );
}
