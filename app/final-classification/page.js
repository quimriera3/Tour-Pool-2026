"use client";
// app/final-classification/page.js
import { useEffect, useState } from "react";
import { riderById, isWhiteJerseyEligible } from "../../lib/data";
import { useSession, saveFinals, getFinalsFor } from "../../lib/store";
import JerseyIcon from "../../components/JerseyIcon";
import TeamRiderPicker from "../../components/TeamRiderPicker";

const TOUR_START = new Date("2026-07-04T07:00:00");

const QUESTIONS = [
  { key: "yellow", jersey: "yellow", label: "Yellow Jersey", sub: "Overall winner", sortType: "mountains" },
  { key: "green", jersey: "green", label: "Green Jersey", sub: "Points / consistency", sortType: "flat" },
  { key: "polka", jersey: "polka", label: "Polka Dot Jersey", sub: "Best climber", sortType: "mountains" },
  { key: "white", jersey: "white", label: "White Jersey", sub: "Best young rider (25 or under)", sortType: null, riderFilter: isWhiteJerseyEligible },
];

export default function FinalClassification() {
  const session = useSession();
  const [answers, setAnswers] = useState({});
  const [open, setOpen] = useState(null);
  const locked = new Date() >= TOUR_START;

  useEffect(() => {
    let active = true;
    async function load() {
      if (!session) return;
      const finals = await getFinalsFor(session.id);
      if (active) setAnswers(finals);
    }
    load();
    return () => {
      active = false;
    };
  }, [session]);

  async function update(key, value) {
    if (!session) {
      alert("You need to sign up or log in to make predictions.");
      return;
    }
    const next = { ...answers, [key]: value };
    setAnswers(next);
    await saveFinals(session.id, next);
  }

  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">Locks on 4 July</span>
        <h1>Jersey Predictions</h1>
        <p className="subtitle">
          Predict who takes home each jersey at the end of the Tour. Tap a jersey to make your
          pick. These predictions lock when the race starts.
        </p>
      </div>

      <div className="jersey-row">
        {QUESTIONS.map((q) => {
          const pickedRider = answers[q.key] ? riderById(answers[q.key]) : null;
          const isOpen = open === q.key;
          return (
            <div
              key={q.key}
              className={"jersey-card" + (isOpen ? " open" : "")}
              onClick={() => !locked && setOpen(isOpen ? null : q.key)}
            >
              <JerseyIcon kind={q.jersey} size={48} />
              <div className="jlabel">{q.label}</div>
              <div className="jpick">{q.sub}</div>
              <div className="jpick" style={{ marginTop: 6, fontWeight: 700, color: "var(--black)" }}>
                {pickedRider ? pickedRider.name : "Tap to pick"}
              </div>

              {isOpen && (
                <div onClick={(e) => e.stopPropagation()}>
                  <TeamRiderPicker
                    value={answers[q.key]}
                    onChange={(riderId) => update(q.key, riderId)}
                    disabled={locked}
                    stageType={q.sortType}
                    riderFilter={q.riderFilter}
                    selectedRiderName={pickedRider ? pickedRider.name + " — " + pickedRider.team : ""}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {locked && (
        <p className="lock-note" style={{ marginTop: 16 }}>
          The Tour has already started: these predictions are locked.
        </p>
      )}
    </div>
  );
}
