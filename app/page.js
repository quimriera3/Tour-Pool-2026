"use client";
// app/page.js
//
// Shared Dashboard component for both the English ("/") and Spanish ("/es")
// homepages -- same pattern as predictions/riders/leaderboard/etc: ONE
// component, language detected from the URL via useLang(), every string
// pulled from lib/i18n.js. app/es/page.js just re-exports this; its SEO
// metadata lives in app/es/layout.js since this file can't export metadata
// (it's a client component).
//
// IMPORTANT: this page is statically generated at build/deploy time. Anything
// that depends on "now" (nextStage(), previousStage(), the countdown, the
// session) must never be computed directly during the initial render --
// otherwise the HTML baked in at build time won't match what the browser
// computes when a real visitor opens the page later, causing a React
// hydration-mismatch error. The fix: render a static placeholder first, then
// compute and swap in the real, date-dependent content only after mount.

import { useEffect, useState } from "react";
import {
  nextStage,
  previousStage,
  riderById,
  totalKm,
  kmCompleted,
  stageStartDate,
  jerseyLockDate,
  jerseyPredictionsLocked,
  TYPE_LABEL,
  STAGES,
} from "../lib/data";
import { computeLeaderboard, getResults, useSession } from "../lib/store";
import StageTypeIcon from "../components/StageTypeIcon";
import Podium from "../components/Podium";
import AuthModal from "../components/AuthModal";
import PreviewArticleContent from "../components/PreviewArticleContent";
import StructuredData from "../components/StructuredData";
import { useLang, t } from "../lib/i18n";

const DAY_NAMES = {
  en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  es: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
};
const MONTH_NAMES = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  es: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
};

function useCountdown(targetDate) {
  const [left, setLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    if (!targetDate) return;
    function tick() {
      const diff = Math.max(0, new Date(targetDate).getTime() - Date.now());
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setLeft({ d, h, m, s });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return left;
}

export default function Dashboard() {
  const lang = useLang();
  const session = useSession();
  const [showAuth, setShowAuth] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [stage, setStage] = useState(null);
  const [prevStage, setPrevStage] = useState(null);
  const [board, setBoard] = useState([]);
  const [results, setResults] = useState({});

  useEffect(() => {
    setStage(nextStage());
    setPrevStage(previousStage());
    setMounted(true);
  }, []);

  useEffect(() => {
    let active = true;
    Promise.all([computeLeaderboard(), getResults()]).then(([b, r]) => {
      if (active) {
        setBoard(b);
        setResults(r);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const countdown = useCountdown(stage ? stageStartDate(stage) : null);

  if (!mounted) {
    return (
      <div>
        <StructuredData lang={lang} />
        <div className="page-header" style={{ paddingBottom: 0 }}>
          <span className="eyebrow">{t(lang, "home.eyebrow")}</span>
          <h1>{t(lang, "home.title")}</h1>
          <p className="subtitle">{t(lang, "home.subtitle")}</p>
        </div>
        <div className="hero" style={{ marginTop: 18 }}>
          <div className="hero-inner">
            <span className="eyebrow">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  const podiumItems = board.slice(0, 3).map((row) => ({ label: row.name, value: row.total }));

  // Find the most recent stage that has a result uploaded — this might be
  // prevStage, or an earlier one if the admin hasn't entered the latest yet.
  const lastResultStage = (() => {
    if (!prevStage) return null;
    for (let n = prevStage.n; n >= 1; n--) {
      if (results[n]) return { n, result: results[n] };
    }
    return null;
  })();

  const totalDistance = totalKm();
  const distanceDone = kmCompleted();
  const progressPct = Math.round((distanceDone / totalDistance) * 100);

  const lastPodiumItems = lastResultStage
    ? [
        { label: riderById(lastResultStage.result.first)?.name || lastResultStage.result.first },
        { label: riderById(lastResultStage.result.second)?.name || lastResultStage.result.second },
        { label: riderById(lastResultStage.result.third)?.name || lastResultStage.result.third },
      ]
    : null;

  // Leaderboard card — dark card with yellow accent to distinguish it from the
  // stage recap card (which is a plain white card)
  const leaderboardCard = (
    <div className="card">
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 16 }}>
        <span style={{ fontSize: 16, fontWeight: 800 }}>{t(lang, "home.leaderboard")}</span>
        <span style={{ fontSize: 10, fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: 1 }}>
          {t(lang, "home.liveStandings")}
        </span>
      </div>

      {podiumItems.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {podiumItems.map((row, i) => (
            <div key={i} style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: i === 0 ? "#fff9e0" : "transparent",
              borderRadius: 8,
              padding: "10px 12px",
              borderLeft: i === 0 ? "3px solid var(--accent)" : "3px solid var(--grey-light)",
            }}>
              <span style={{
                fontSize: 13,
                fontWeight: 900,
                color: i === 0 ? "#9a7d00" : "var(--grey)",
                minWidth: 16,
                textAlign: "center",
              }}>{i + 1}</span>
              <span style={{ fontSize: 13, fontWeight: 700, flex: 1 }}>{row.label}</span>
              <span style={{ fontSize: 13, fontWeight: 800, color: i === 0 ? "#9a7d00" : "var(--grey)" }}>
                {row.value} pts
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="subtitle" style={{ marginTop: 10 }}>{t(lang, "home.noResultsYet")}</p>
      )}

      <a href={(lang === "es" ? "/es" : "") + "/leaderboard"} className="btn btn-outline" style={{
        display: "block",
        marginTop: 16,
        textAlign: "center",
      }}>
        {t(lang, "home.viewFullLeaderboard")} →
      </a>
    </div>
  );

  return (
    <div>
      <StructuredData lang={lang} />
      <div className="page-header" style={{ paddingBottom: 0 }}>
        {!session && (
          <div style={{ marginBottom: 18 }}>
            <button
              onClick={() => setShowAuth(true)}
              className="hero-signup-btn"
            >
              {t(lang, "home.signupBtn")}
            </button>
            <p className="hero-signup-sub">{t(lang, "home.signupSub")}</p>
          </div>
        )}
        {showAuth && <AuthModal onClose={() => setShowAuth(false)} onAuth={() => setShowAuth(false)} />}

        <span className="eyebrow">{t(lang, "home.eyebrow")}</span>
        <h1>{t(lang, "home.title")}</h1>
        <p className="subtitle">{t(lang, "home.subtitle")}</p>
      </div>

      {stage ? (
        <div className="hero-v2" style={{ marginTop: 18 }}>
          {/* Left: yellow — stage info + CTA */}
          <div className="hero-v2-left">
            <div>
              <span className="hero-v2-eyebrow">
                {t(lang, "home.stageWord")} {stage.n} · {(() => {
                  const d = stageStartDate(stage);
                  const days = DAY_NAMES[lang] || DAY_NAMES.en;
                  const months = MONTH_NAMES[lang] || MONTH_NAMES.en;
                  return days[d.getDay()] + " " + d.getDate() + " " + months[d.getMonth()];
                })()}
              </span>
              <div className="hero-v2-route">
                {stage.from}<br />→ {stage.to}
              </div>
              <div className="hero-v2-badges">
                <span className="hero-v2-badge">
                  <StageTypeIcon type={stage.type} size={11} color="var(--accent)" /> {TYPE_LABEL[stage.type]}
                </span>
                <span className="hero-v2-badge-km">{stage.km} km{stage.elevationGain ? " · " + stage.elevationGain.toLocaleString() + " m ↑" : ""}</span>
              </div>
            </div>
            <div>
              <a href={(lang === "es" ? "/es" : "") + "/stage/" + stage.n} className="hero-v2-cta">
                {t(lang, "home.seeAndPredict")} ↗
              </a>
              <p className="hero-v2-closes">⏰ {t(lang, "home.pickCloses")}</p>
            </div>
          </div>

          {/* Right: dark — countdown + dot progress */}
          <div className="hero-v2-right">
            <div>
              <span className="hero-v2-cd-label">{t(lang, "home.nextStageIn")}</span>
              <div className="hero-v2-countdown">
                <div className="hero-v2-cd-unit">
                  <span className="hero-v2-cd-num">{String(countdown.d).padStart(2, "0")}</span>
                  <span className="hero-v2-cd-lab">{t(lang, "home.days")}</span>
                </div>
                <span className="hero-v2-cd-sep">:</span>
                <div className="hero-v2-cd-unit">
                  <span className="hero-v2-cd-num">{String(countdown.h).padStart(2, "0")}</span>
                  <span className="hero-v2-cd-lab">{t(lang, "home.hours")}</span>
                </div>
                <span className="hero-v2-cd-sep">:</span>
                <div className="hero-v2-cd-unit">
                  <span className="hero-v2-cd-num">{String(countdown.m).padStart(2, "0")}</span>
                  <span className="hero-v2-cd-lab">{t(lang, "home.min")}</span>
                </div>
                <span className="hero-v2-cd-sep">:</span>
                <div className="hero-v2-cd-unit">
                  <span className="hero-v2-cd-num">{String(countdown.s).padStart(2, "0")}</span>
                  <span className="hero-v2-cd-lab">{t(lang, "home.sec")}</span>
                </div>
              </div>
            </div>

            {/* Dot progress — 21 blocks, one per stage */}
            <div className="hero-v2-progress">
              <div className="hero-v2-prog-meta">
                <span>{t(lang, "home.tourProgress")}</span>
                <span>{distanceDone.toLocaleString()} / {totalDistance.toLocaleString()} km</span>
              </div>
              <div className="hero-v2-dots">
                {Array.from({ length: 21 }).map((_, i) => {
                  const sn = i + 1;
                  const isDone = prevStage && sn < stage.n;
                  const isCurrent = sn === stage.n;
                  return (
                    <div
                      key={sn}
                      className={"hero-v2-dot" + (isDone ? " done" : isCurrent ? " current" : "")}
                    >
                      {isCurrent && <span className="hero-v2-dot-arrow">▼</span>}
                    </div>
                  );
                })}
              </div>
              <div className="hero-v2-dots-labels">
                <span>{t(lang, "home.stageWord")} 1</span>
                <span>{t(lang, "home.stageWord")} 21</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="hero" style={{ marginTop: 18 }}>
          <div className="hero-inner">
            <span className="eyebrow">{t(lang, "home.wrapEyebrow")}</span>
            <p className="hero-stage-line" style={{ marginTop: 8, fontSize: 20 }}>
              {t(lang, "home.wrapBody")}
            </p>
          </div>
        </div>
      )}

      {mounted && !jerseyPredictionsLocked() && (
        <a href={(lang === "es" ? "/es" : "") + "/final-classification"} className="jersey-banner">
          <span className="jersey-banner-icon">🏆</span>
          <span>
            <strong>{t(lang, "home.jerseyBannerLock")}</strong> {t(lang, "home.jerseyBannerBody")}{" "}
            {(() => {
              const d = jerseyLockDate();
              const days = DAY_NAMES[lang] || DAY_NAMES.en;
              const months = MONTH_NAMES[lang] || MONTH_NAMES.en;
              return days[d.getDay()] + " " + d.getDate() + " " + months[d.getMonth()] + " " + (lang === "es" ? "a las" : "at") + " " + d.toTimeString().slice(0, 5);
            })()}{" "}
            — {t(lang, "home.jerseyBannerAfter")}
          </span>
          <span className="jersey-banner-arrow">→</span>
        </a>
      )}

      {lastResultStage || prevStage ? (
        <div className="grid grid-2" style={{ marginTop: 22 }}>
          {/* Stage recap — plain white card */}
          <div className="card">
            <span className="eyebrow" style={{ fontSize: 10 }}>
              {t(lang, "home.stageWord")} {lastResultStage ? lastResultStage.n : prevStage.n} {t(lang, "home.recapTitle")}
            </span>
            <p style={{ fontWeight: 700, fontSize: 14, marginTop: 4, color: "var(--black)" }}>
              {lastResultStage
                ? (STAGES.find(s => s.n === lastResultStage.n)?.from + " → " + STAGES.find(s => s.n === lastResultStage.n)?.to)
                : (prevStage.from + " → " + prevStage.to)}
            </p>
            {lastPodiumItems ? (
              <Podium items={lastPodiumItems} />
            ) : (
              <p className="subtitle" style={{ marginTop: 10 }}>{t(lang, "home.resultNotEntered")}</p>
            )}
          </div>
          {/* Leaderboard — dark styled card */}
          {leaderboardCard}
        </div>
      ) : (
        <div style={{ marginTop: 22 }}>{leaderboardCard}</div>
      )}

      <PreviewArticleContent lang={lang} variant="home" />

      <div className="card" style={{ marginTop: 16 }}>
        <h3 style={{ fontSize: 16 }}>{t(lang, "home.howScoringWorks")}</h3>
        <p className="subtitle" style={{ marginTop: 10 }}>
          {t(lang, "home.scoringExplainer")} <a href={(lang === "es" ? "/es" : "") + "/rules"} style={{ textDecoration: "underline", color: "var(--black)" }}>{t(lang, "home.fullRules")}</a> {t(lang, "home.scoringExplainerAfter")}
        </p>
      </div>
    </div>
  );
}
