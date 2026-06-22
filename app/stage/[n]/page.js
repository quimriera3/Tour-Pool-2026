"use client";
// app/stage/[n]/page.js
//
// Detailed view for a single stage. Reuses the exact same data store
// (lib/store.js) as the main /predictions page, so a pick made here or
// there is always the same pick -- there's only one source of truth
// (Supabase), not two states to keep in sync.
//
// NOTE on translation: structural labels are translated via lib/i18n.js. The
// 21 stage.preview paragraphs have their own Spanish version in
// stage.previewEs (set in lib/data.js).
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { STAGES, riderById, pointsForPick, stageIsLocked, stageStartDate, TYPE_LABEL } from "../../../lib/data";
import { useSession, savePick, getPicksFor, getResults } from "../../../lib/store";
import StageProfile from "../../../components/StageProfile";
import StageTypeIcon from "../../../components/StageTypeIcon";
import TeamRiderPicker from "../../../components/TeamRiderPicker";
import Podium from "../../../components/Podium";
import { useLang, t } from "../../../lib/i18n";

const EN_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const EN_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const ES_DAYS = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];
const ES_MONTHS = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

function lockTimeLabel(stage, lang) {
  const start = stageStartDate(stage);
  const lock = new Date(start.getTime() - 60 * 60 * 1000);
  const time = lock.toTimeString().slice(0, 5);
  if (lang === "es") {
    return ES_DAYS[lock.getDay()] + " " + lock.getDate() + " " + ES_MONTHS[lock.getMonth()] + ", " + time;
  }
  return EN_DAYS[lock.getDay()] + " " + lock.getDate() + " " + EN_MONTHS[lock.getMonth()] + ", " + time;
}

export default function StageDetail() {
  const lang = useLang();
  const prefix = lang === "es" ? "/es" : "";
  const params = useParams();
  const n = parseInt(params.n, 10);
  const stage = STAGES.find((s) => s.n === n);

  const session = useSession();
  const [pick, setPick] = useState(null);
  const [result, setResult] = useState(null);
  const [ready, setReady] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let active = true;
    async function load() {
      const [userPicks, allResults] = await Promise.all([
        session ? getPicksFor(session.id) : Promise.resolve({}),
        getResults(),
      ]);
      if (!active) return;
      setPick(userPicks[n] || null);
      setResult(allResults[n] || null);
      setReady(true);
    }
    load();
    return () => {
      active = false;
    };
  }, [session, n]);

  if (!stage) {
    return (
      <div className="page-header">
        <h1>{t(lang, "stage.notFound")}</h1>
        <p className="subtitle">
          {lang === "es"
            ? "No existe la etapa número " + params.n + ". Hay 21 etapas en total."
            : "There's no stage number " + params.n + ". There are 21 stages in total."}
        </p>
        <a href={prefix + "/predictions"} className="btn" style={{ marginTop: 14, display: "inline-block" }}>
          {lang === "es" ? "Volver a todas las etapas" : "Back to all stages"}
        </a>
      </div>
    );
  }

  async function handlePick(stageN, riderId) {
    if (!session) {
      alert(lang === "es" ? "Necesitas registrarte o iniciar sesión para hacer predicciones." : "You need to sign up or log in to make predictions.");
      return;
    }
    setPick(riderId);
    await savePick(session.id, stageN, riderId);
  }

  const locked = mounted ? stageIsLocked(stage) : true;
  const pts = result ? pointsForPick(pick, result) : null;
  const pickedRider = pick ? riderById(pick) : null;
  const prevStage = STAGES.find((s) => s.n === n - 1);
  const nextStage = STAGES.find((s) => s.n === n + 1);

  const podiumItems = result
    ? [
        { label: riderById(result.first)?.name || result.first },
        { label: riderById(result.second)?.name || result.second },
        { label: riderById(result.third)?.name || result.third },
      ]
    : null;

  const navBlock = (
    <div className="stage-nav">
      {prevStage ? (
        <a href={prefix + "/stage/" + prevStage.n} className="stage-nav-link">
          ← {lang === "es" ? "Etapa" : "Stage"} {prevStage.n}
        </a>
      ) : (
        <span className="stage-nav-link disabled">← {lang === "es" ? "Etapa" : "Stage"} {n}</span>
      )}
      <a href={prefix + "/predictions"} className="stage-nav-link center">
        {t(lang, "stage.allStages")}
      </a>
      {nextStage ? (
        <a href={prefix + "/stage/" + nextStage.n} className="stage-nav-link">
          {lang === "es" ? "Etapa" : "Stage"} {nextStage.n} →
        </a>
      ) : (
        <span className="stage-nav-link disabled">{lang === "es" ? "Etapa" : "Stage"} {n} →</span>
      )}
    </div>
  );

  return (
    <div>
      {navBlock}

      <div className="page-header">
        <span className="eyebrow">
          {lang === "es" ? "Etapa " + stage.n + " de 21" : "Stage " + stage.n + " of 21"} · {stage.date.split("-").reverse().join("/")}
        </span>
        <h1>{stage.from} → {stage.to}</h1>
        <p className="subtitle" style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span className={"stage-type type-" + stage.type} style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
            <StageTypeIcon type={stage.type} size={13} />
            {TYPE_LABEL[stage.type]}
          </span>
          · {stage.km} km · ↗ {stage.elevationGain} m {lang === "es" ? "de desnivel" : "of climbing"}
          {stage.profileScore && <> · {lang === "es" ? "Dificultad" : "Difficulty score"}: {stage.profileScore}</>}
        </p>
      </div>

      <div className="card">
        <h3 style={{ fontSize: 15 }}>{t(lang, "stage.makeYourPick")}</h3>
        <p className="scoring-note" style={{ marginBottom: 12 }}>{t(lang, "scoring.stageShort")}</p>

        {!result && (
          <>
            <TeamRiderPicker
              value={pick}
              onChange={(riderId) => handlePick(stage.n, riderId)}
              disabled={locked}
              stageType={stage.type}
              selectedRiderName={pickedRider ? pickedRider.name + " — " + pickedRider.team : ""}
            />
            {!locked && (
              <p className="stage-meta" style={{ marginTop: 8 }}>
                {t(lang, "predictions.closesAt")} {lockTimeLabel(stage, lang)}
              </p>
            )}
            {locked && <p className="stage-meta" style={{ marginTop: 8 }}>{t(lang, "predictions.locked")}</p>}
          </>
        )}

        {result && (
          <>
            <Podium items={podiumItems} />
            <p className="stage-meta" style={{ marginTop: 8, textAlign: "center" }}>
              {t(lang, "stage.yourPick")} {pick ? riderById(pick)?.name : "— " + t(lang, "stage.none") + " —"}
            </p>
            <div style={{ textAlign: "center" }}>
              <span className={"points-pill points-" + pts}>{pts} {t(lang, "stage.points")}</span>
            </div>
          </>
        )}
      </div>

      {/* Real, original stage preview text -- good for SEO, not a placeholder.
          English-only for now; see the note at the top of this file. */}
      <div className="card" style={{ marginTop: 16 }}>
        <h3 style={{ fontSize: 15 }}>{t(lang, "stage.stagePreview")}</h3>
        <p className="subtitle" style={{ marginTop: 10 }}>{lang === "es" && stage.previewEs ? stage.previewEs : stage.preview}</p>
      </div>

      {/* Elevation profile -- this part is real, not a placeholder */}
      <div className="card" style={{ marginTop: 16 }}>
        <h3 style={{ fontSize: 15 }}>{t(lang, "stage.elevationProfile")}</h3>
        <StageProfile type={stage.type} elevationGain={stage.elevationGain} />
        <a
          href={stage.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "inline-block", marginTop: 10, fontSize: 12, fontWeight: 700, color: "var(--red)" }}
        >
          {t(lang, "stage.moreInfo")} ↗
        </a>
      </div>

      <div style={{ marginTop: 16 }}>{navBlock}</div>
    </div>
  );
}
