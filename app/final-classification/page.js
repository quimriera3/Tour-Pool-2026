"use client";
// app/final-classification/page.js
import { useEffect, useState } from "react";
import { riderById, isWhiteJerseyEligible, jerseyLockDate, jerseyPredictionsLocked } from "../../lib/data";
import { useSession, saveFinals, getFinalsFor } from "../../lib/store";
import JerseyIcon from "../../components/JerseyIcon";
import TeamRiderPicker from "../../components/TeamRiderPicker";
import AutoSaveNotice from "../../components/AutoSaveNotice";
import { useLang, t } from "../../lib/i18n";
import { hasJerseys, localised } from "../../lib/races";
import { useRace, useRaceBase } from "../../lib/useRace";

const QUESTIONS = [
  { key: "yellow", jersey: "yellow", labelKey: "jersey.yellow", subKey: "jersey.yellowSub", sortType: "mountains" },
  { key: "green", jersey: "green", labelKey: "jersey.green", subKey: "jersey.greenSub", sortType: "flat" },
  { key: "polka", jersey: "polka", labelKey: "jersey.polka", subKey: "jersey.polkaSub", sortType: "mountains" },
  { key: "white", jersey: "white", labelKey: "jersey.white", subKey: "jersey.whiteSub", sortType: null, riderFilter: isWhiteJerseyEligible },
];

// "Wednesday 26 August at 12:15" / "miércoles 26 de agosto a las 12:15"
function formatLockDateTime(date, lang) {
  if (!date) return "";
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
  const race = useRace();
  const base = useRaceBase();
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
      const finals = await getFinalsFor(session.id, race.slug);
      if (active) setAnswers(finals);
    }
    load();
    return () => {
      active = false;
    };
  }, [session, race.slug]);

  async function update(key, value) {
    if (!session) {
      alert(lang === "es" ? "Necesitas registrarte o iniciar sesión para hacer predicciones." : "You need to sign up or log in to make predictions.");
      return;
    }
    const next = { ...answers, [key]: value };
    setAnswers(next);
    await saveFinals(session.id, next, race.slug);
  }

  const locked = mounted ? jerseyPredictionsLocked(undefined, race) : true;
  const lockLabel = formatLockDateTime(jerseyLockDate(race), lang);

  // Championships and one-day races have no general classification, so there
  // are no jerseys to predict. Say so rather than rendering a broken page.
  if (!hasJerseys(race)) {
    return (
      <div>
        <div className="page-header">
          <span className="eyebrow">{localised(race.shortName, lang)}</span>
          <h1>{lang === "es" ? "Sin clasificaciones finales" : "No jersey predictions"}</h1>
          <p className="subtitle">
            {lang === "es"
              ? "El Mundial no tiene clasificación general ni maillots que durar\u00e9n toda la carrera: cada prueba se gana en el d\u00eda, y el premio es el maillot arcoíris. Haz tus predicciones prueba a prueba."
              : "A World Championship has no general classification and no jerseys running through it \u2014 each race is won on the day, and the prize is the rainbow jersey itself. Make your predictions race by race instead."}
          </p>
        </div>
        <div className="card" style={{ textAlign: "center" }}>
          <a href={base + "/predictions"} className="btn" style={{ display: "inline-block" }}>
            {lang === "es" ? "Ir a las predicciones" : "Go to predictions"}
          </a>
        </div>
      </div>
    );
  }

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
            ? "Tus predicciones de maillots se cierran el miércoles 26 de agosto a las 12:15 CEST (1h antes del inicio de la Etapa 5). ¡Hazlas antes!"
            : "Your jersey predictions close on Wed 26 August at 12:15 CEST — 1 hour before Stage 5 starts. Get them in before then!"}
        </p>
      </div>

      <div style={{ marginTop: 14 }}>
        <AutoSaveNotice lang={lang} />
      </div>

      <div className="jersey-row">
        {QUESTIONS.map((q) => {
          const pickedRider = answers[q.key] ? riderById(answers[q.key], race) : null;
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
                    race={race}
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
