"use client";
// app/final-classification/page.js
import { useEffect, useState } from "react";
import { riderById, isWhiteJerseyEligible, jerseyLockDate, jerseyPredictionsLocked } from "../../lib/data";
import { useSession, saveFinals, getFinalsFor } from "../../lib/store";
import JerseyIcon from "../../components/JerseyIcon";
import TeamRiderPicker from "../../components/TeamRiderPicker";
import AutoSaveNotice from "../../components/AutoSaveNotice";
import { useLang, t } from "../../lib/i18n";

const QUESTIONS = [
  { key: "yellow", jersey: "yellow", labelKey: "jersey.yellow", subKey: "jersey.yellowSub", sortType: "mountains" },
  { key: "green", jersey: "green", labelKey: "jersey.green", subKey: "jersey.greenSub", sortType: "flat" },
  { key: "polka", jersey: "polka", labelKey: "jersey.polka", subKey: "jersey.polkaSub", sortType: "mountains" },
  { key: "white", jersey: "white", labelKey: "jersey.white", subKey: "jersey.whiteSub", sortType: null, riderFilter: isWhiteJerseyEligible },
];

// "Saturday 4 July at 16:05" / "sábado 4 de julio a las 16:05"
function formatLockDateTime(date, lang) {
  const time = date.toTimeString().slice(0, 5);
  if (lang === "es") {
    const days = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
    const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    return days[date.getDay()] + " " + date.getDate() + " de " + months[date.getMonth()] + " a las " + time;
  }
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return days[date.getDay()] + " " + date.getDate() + " " + months[date.getMonth()] + " at " + time;
}

export default function FinalClassification() {
  const lang = useLang();
  const session = useSession();
  const [answers, setAnswers] = useState({});
  const [open, setOpen] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      alert(lang === "es" ? "Necesitas registrarte o iniciar sesión para hacer predicciones." : "You need to sign up or log in to make predictions.");
      return;
    }
    const next = { ...answers, [key]: value };
    setAnswers(next);
    await saveFinals(session.id, next);
  }

  const locked = mounted ? jerseyPredictionsLocked() : true;
  const lockLabel = formatLockDateTime(jerseyLockDate(), lang);

  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">
          {lang === "es" ? "Se bloquea el " : "Locks "}{lockLabel}
        </span>
        <h1>{t(lang, "jersey.title")}</h1>
        <p className="subtitle">{t(lang, "jersey.subtitle")}</p>
        <p className="scoring-note">{t(lang, "scoring.jersey")}</p>
        <p className="scoring-note" style={{ background: "#fdeaea", color: "#8a2c2c", borderColor: "#f0c4c4", marginTop: 8 }}>
          ⏰ {lang === "es"
            ? "Estas predicciones se bloquean 1 hora antes de la salida de la Etapa 1 — " + lockLabel + ". ¡Hazlas antes!"
            : "These predictions lock 1 hour before Stage 1 starts — " + lockLabel + ". Get them in before then!"}
        </p>
      </div>

      <div style={{ marginTop: 14 }}>
        <AutoSaveNotice lang={lang} />
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
              <div className="jlabel">{t(lang, q.labelKey)}</div>
              <div className="jpick">{t(lang, q.subKey)}</div>
              <div className="jpick" style={{ marginTop: 6, fontWeight: 700, color: "var(--black)" }}>
                {pickedRider ? pickedRider.name : t(lang, "jersey.tapToPick")}
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

              <a
                href={lang === "fr" ? "https://www.letour.fr/fr/classements" : "https://www.letour.fr/en/rankings"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{ display: "block", marginTop: 10, fontSize: 11, fontWeight: 700, color: "var(--red)", textAlign: "center" }}
              >
                {lang === "es" ? "Ver clasificación oficial" : "See official ranking"} ↗
              </a>
            </div>
          );
        })}
      </div>

      {locked && (
        <p className="lock-note" style={{ marginTop: 16 }}>
          {lang === "es" ? "El Tour ya ha empezado: estas predicciones están bloqueadas." : "The Tour has already started: these predictions are locked."}
        </p>
      )}
    </div>
  );
}
