"use client";
// app/page.js
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
  TYPE_LABEL,
} from "../lib/data";
import { computeLeaderboard, getResults, useSession } from "../lib/store";
import StageTypeIcon from "../components/StageTypeIcon";
import Podium from "../components/Podium";
import AuthModal from "../components/AuthModal";

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
        <div className="page-header" style={{ paddingBottom: 0 }}>
          <span className="eyebrow">Tour de France 2026 · 4 — 26 July</span>
          <h1>Tour de France Pool</h1>
          <p className="subtitle">
            Pick a winner for every stage, beat your friends, and win cycling gear. 3,321 km · 21
            stages · 56,308 m of climbing · Barcelona to Paris.
          </p>
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
      <h3 style={{ fontSize: 16 }}>Leaderboard</h3>
      {podiumItems.length > 0 ? (
        <Podium items={podiumItems} valueSuffix=" pts" />
      ) : (
        <p className="subtitle" style={{ marginTop: 10 }}>No results have been entered yet.</p>
      )}
      <a href="/leaderboard" className="btn btn-outline" style={{ marginTop: 18, display: "inline-block" }}>
        View full leaderboard
      </a>
    </div>
  );

  return (
    <div>
      <div className="page-header" style={{ paddingBottom: 0 }}>
        {!session && (
          <button
            onClick={() => setShowAuth(true)}
            className="btn"
            style={{ display: "block", width: "100%", fontSize: 17, padding: "16px 20px", marginBottom: 18 }}
          >
            Sign up free - start predicting
          </button>
        )}
        {showAuth && <AuthModal onClose={() => setShowAuth(false)} onAuth={() => setShowAuth(false)} />}

        <span className="eyebrow">Tour de France 2026 · 4 — 26 July</span>
        <h1>Tour de France Pool</h1>
        <p className="subtitle">
          Pick a winner for every stage, beat your friends, and win cycling gear. 3,321 km · 21
          stages · 56,308 m of climbing · Barcelona to Paris, with Alpe d&apos;Huez twice in the
          final week.
        </p>
      </div>

      {stage ? (
        <div className="hero" style={{ marginTop: 18 }}>
          <div className="hero-inner">
            <span className="eyebrow">Next stage in</span>
            <div className="hero-countdown">
              <div>
                <span className="num">{String(countdown.d).padStart(2, "0")}</span>
                <span className="lab">days</span>
              </div>
              <div>
                <span className="num">{String(countdown.h).padStart(2, "0")}</span>
                <span className="lab">hours</span>
              </div>
              <div>
                <span className="num">{String(countdown.m).padStart(2, "0")}</span>
                <span className="lab">min</span>
              </div>
              <div>
                <span className="num">{String(countdown.s).padStart(2, "0")}</span>
                <span className="lab">sec</span>
              </div>
            </div>

            <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <span style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>
                Stage {stage.n}: {stage.from} to {stage.to}
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, color: "#bbb" }}>
                <StageTypeIcon type={stage.type} size={13} color="var(--yellow)" />
                {TYPE_LABEL[stage.type]} - climbing {stage.elevationGain} m
              </span>
            </div>
            <a href={"/stage/" + stage.n} style={{ display: "inline-block", marginTop: 6, fontSize: 12, color: "var(--yellow)", fontWeight: 700 }}>
              See and predict this stage &#8599;
            </a>

            <div style={{ marginTop: 16, position: "relative", zIndex: 2 }}>
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 4, fontSize: 11, color: "#999", marginBottom: 8 }}>
                <span>{prevStage ? "Stage " + prevStage.n + " of 21 done" : "Not started yet"}</span>
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
              <p style={{ fontSize: 10, color: "#777", marginTop: 6 }}>21 stages · ▼ marks where we are</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="hero" style={{ marginTop: 18 }}>
          <div className="hero-inner">
            <span className="eyebrow">That&apos;s a wrap</span>
            <p className="hero-stage-line" style={{ marginTop: 8, fontSize: 20 }}>
              All 21 stages are done. See you next July!
            </p>
          </div>
        </div>
      )}

      <p style={{ textAlign: "center", marginTop: 10 }}>
        <a href="/preview" style={{ fontSize: 13, fontWeight: 700, color: "var(--red)", textDecoration: "underline" }}>
          Read our 2026 Tour de France preview: favourites, sprinters & outsiders →
        </a>
      </p>

      {prevStage ? (
        <div className="grid grid-2" style={{ marginTop: 22 }}>
          <div className="card">
            <h3 style={{ fontSize: 16 }}>Stage {prevStage.n} recap</h3>
            <p className="subtitle" style={{ marginTop: 6 }}>
              {prevStage.from} to {prevStage.to}
            </p>
            {prevPodiumItems ? (
              <Podium items={prevPodiumItems} />
            ) : (
              <p className="subtitle" style={{ marginTop: 10 }}>Result not entered yet.</p>
            )}
          </div>
          {leaderboardCard}
        </div>
      ) : (
        <div style={{ marginTop: 22 }}>{leaderboardCard}</div>
      )}

      <div className="card" style={{ marginTop: 16 }}>
        <h3 style={{ fontSize: 16 }}>How scoring works</h3>
        <p className="subtitle" style={{ marginTop: 10 }}>
          10 points for a correct winner, 5 if your rider finishes 2nd, 2 if they finish 3rd —
          plus 20 points for every jersey you call correctly. See
          the <a href="/rules" style={{ textDecoration: "underline", color: "var(--black)" }}>full rules</a> for jerseys and prizes.
        </p>
      </div>
    </div>
  );
}
