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
    { href: prefix || "/", key: "nav.home" },
    { href: prefix + "/riders", key: "nav.riders" },
    { href: prefix + "/leaderboard", key: "nav.leaderboard" },
    { href: prefix + "/rules", key: "nav.rules" },
  ];
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
            <span style={{ color: "var(--yellow)" }}>TOUR DE FRANCE</span>{" "}
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
            <a key={l.href} href={l.href} className={"nav-btn secondary" + (pathname === l.href ? " active" : "")}>
              {t(lang, l.key)}
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
