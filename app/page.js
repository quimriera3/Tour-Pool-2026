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
  const prevResult = prevStage ? results[prevStage.n] : null;
  const totalDistance = totalKm();
  const distanceDone = kmCompleted();
  const progressPct = Math.round((distanceDone / totalDistance) * 100);
  const prevPodiumItems = prevResult
    ? [
        { label: riderById(prevResult.first)?.name || prevResult.first },
        { label: riderById(prevResult.second)?.name || prevResult.second },
        { label: riderById(prevResult.third)?.name || prevResult.third },
      ]
    : null;

  const leaderboardCard = (
    <div className="card">
      <h3 style={{ fontSize: 16 }}>{t(lang, "home.leaderboard")}</h3>
      {podiumItems.length > 0 ? (
        <Podium items={podiumItems} valueSuffix=" pts" />
      ) : (
        <p className="subtitle" style={{ marginTop: 10 }}>{t(lang, "home.noResultsYet")}</p>
      )}
      <a href={(lang === "es" ? "/es" : "") + "/leaderboard"} className="btn btn-outline" style={{ marginTop: 18, display: "inline-block" }}>
        {t(lang, "home.viewFullLeaderboard")}
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
        <div className="hero" style={{ marginTop: 18 }}>
          <div className="hero-inner">
            <span className="eyebrow">{t(lang, "home.nextStageIn")}</span>
            <div className="hero-countdown">
              <div>
                <span className="num">{String(countdown.d).padStart(2, "0")}</span>
                <span className="lab">{t(lang, "home.days")}</span>
              </div>
              <div>
                <span className="num">{String(countdown.h).padStart(2, "0")}</span>
                <span className="lab">{t(lang, "home.hours")}</span>
              </div>
              <div>
                <span className="num">{String(countdown.m).padStart(2, "0")}</span>
                <span className="lab">{t(lang, "home.min")}</span>
              </div>
              <div>
                <span className="num">{String(countdown.s).padStart(2, "0")}</span>
                <span className="lab">{t(lang, "home.sec")}</span>
              </div>
            </div>

            <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <span style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>
                {t(lang, "home.stageWord")} {stage.n}: {stage.from} {t(lang, "home.toWord")} {stage.to}
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, color: "#bbb" }}>
                <StageTypeIcon type={stage.type} size={13} color="var(--yellow)" />
                {TYPE_LABEL[stage.type]} - {t(lang, "home.climbing")} {stage.elevationGain} m
              </span>
            </div>
            <a href={(lang === "es" ? "/es" : "") + "/stage/" + stage.n} style={{ display: "inline-block", marginTop: 6, fontSize: 12, color: "var(--yellow)", fontWeight: 700 }}>
              {t(lang, "home.seeAndPredict")} &#8599;
            </a>

            <div style={{ marginTop: 16, position: "relative", zIndex: 2 }}>
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 4, fontSize: 11, color: "#999", marginBottom: 8 }}>
                <span>{prevStage ? t(lang, "home.stageWord") + " " + prevStage.n + " " + t(lang, "home.stageOf21Done") : t(lang, "home.notStartedYet")}</span>
                <span>{distanceDone.toLocaleString()} / {totalDistance.toLocaleString()} km · {progressPct}%</span>
              </div>
              <div style={{ position: "relative", height: 12 }}>
                <div
                  style={{
                    position: "absolute",
                    left: ((stage.n - 0.5) / 21) * 100 + "%",
                    top: 0,
                    transform: "translateX(-50%)",
                    fontSize: 11,
                    lineHeight: 1,
                    color: "var(--yellow)",
                  }}
                >
                  ▼
                </div>
              </div>
              <div style={{ height: 6, background: "#2a2a2a", borderRadius: 999, overflow: "hidden", position: "relative" }}>
                <div style={{ height: "100%", width: progressPct + "%", background: "var(--yellow)", borderRadius: 999 }} />
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      top: 0,
                      bottom: 0,
                      left: ((i + 1) / 21) * 100 + "%",
                      width: 1,
                      background: "rgba(0,0,0,0.35)",
                    }}
                  />
                ))}
              </div>
              <p style={{ fontSize: 10, color: "#777", marginTop: 6 }}>{t(lang, "home.stagesMarker")}</p>
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

      {prevStage ? (
        <div className="grid grid-2" style={{ marginTop: 22 }}>
          <div className="card">
            <h3 style={{ fontSize: 16 }}>{t(lang, "home.stageWord")} {prevStage.n} {t(lang, "home.recapTitle")}</h3>
            <p className="subtitle" style={{ marginTop: 6 }}>
              {prevStage.from} {t(lang, "home.toWord")} {prevStage.to}
            </p>
            {prevPodiumItems ? (
              <Podium items={prevPodiumItems} />
            ) : (
              <p className="subtitle" style={{ marginTop: 10 }}>{t(lang, "home.resultNotEntered")}</p>
            )}
          </div>
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
