"use client";
// app/rules/page.js
import { useLang, t } from "../../lib/i18n";

export default function Rules() {
  const lang = useLang();
  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">{t(lang, "rules.eyebrow")}</span>
        <h1>{t(lang, "rules.title")}</h1>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <h3 style={{ fontSize: 16 }}>{t(lang, "rules.stagePred.title")}</h3>
          <p className="subtitle" style={{ marginTop: 10 }}>{t(lang, "rules.stagePred.body")}</p>
          <div className="points-podium">
            <div className="step">
              <div className="bar" style={{ height: 68, background: "var(--black)" }}>5</div>
              <p className="jpick" style={{ marginTop: 6 }}>{t(lang, "rules.2nd")}</p>
            </div>
            <div className="step">
              <div className="bar" style={{ height: 86, background: "var(--yellow)", color: "var(--black)" }}>10</div>
              <p className="jpick" style={{ marginTop: 6 }}>{t(lang, "rules.winner")}</p>
            </div>
            <div className="step">
              <div className="bar" style={{ height: 50, background: "var(--black)" }}>2</div>
              <p className="jpick" style={{ marginTop: 6 }}>{t(lang, "rules.3rd")}</p>
            </div>
          </div>
          <p className="subtitle" style={{ marginTop: 14, textAlign: "center" }}>{t(lang, "rules.zeroPoints")}</p>
        </div>

        <div className="card">
          <h3 style={{ fontSize: 16 }}>{t(lang, "rules.locking.title")}</h3>
          <p className="subtitle" style={{ marginTop: 10 }}>{t(lang, "rules.locking.body")}</p>
          <h3 style={{ fontSize: 16, marginTop: 18 }}>{t(lang, "rules.jersey.title")}</h3>
          <p className="subtitle" style={{ marginTop: 10 }}>{t(lang, "rules.jersey.body")}</p>
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3 style={{ fontSize: 16 }}>{t(lang, "rules.prizes.title")}</h3>
        <p className="subtitle" style={{ marginTop: 10 }}>{t(lang, "rules.prizes.body")}</p>
        <ul style={{ marginTop: 14, paddingLeft: 18, fontSize: 14, lineHeight: 1.7 }}>
          <li>{t(lang, "rules.prize1")}</li>
          <li>{t(lang, "rules.prize2")}</li>
          <li>{t(lang, "rules.prize3")}</li>
        </ul>
      </div>
    </div>
  );
}
