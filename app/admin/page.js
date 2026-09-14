"use client";

import { Fragment, useMemo, useState } from "react";
import RichTextEditor from "../../components/RichTextEditor";
import TeamRiderPicker from "../../components/TeamRiderPicker";
import { buildEmailHtml } from "../../lib/emailTemplate";
import { racesByDate, getRace, hasJerseys, localised } from "../../lib/races";

const JERSEYS = [
  ["yellow", "General classification"],
  ["green", "Points classification"],
  ["polka", "Mountains classification"],
  ["white", "Young rider classification"],
];

function eventLabel(stage, race) {
  if (stage.eventName) return localised(stage.eventName, "en");
  return `Stage ${stage.n}`;
}

export default function Admin() {
  const raceOptions = useMemo(() => racesByDate(), []);
  const [selectedRaceSlug, setSelectedRaceSlug] = useState("worlds-2026");
  const selectedRace = getRace(selectedRaceSlug);
  const [password, setPassword] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [expandedUser, setExpandedUser] = useState(null);
  const [updatingOptIn, setUpdatingOptIn] = useState(null);

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sourceLang, setSourceLang] = useState("ca");
  const [editorKey, setEditorKey] = useState(0);
  const [recipientMode, setRecipientMode] = useState("all");
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [testEmail, setTestEmail] = useState("");
  const [emailState, setEmailState] = useState(null);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [confirmEmail, setConfirmEmail] = useState(false);

  const [resultStage, setResultStage] = useState(1);
  const [resultFirst, setResultFirst] = useState("");
  const [resultSecond, setResultSecond] = useState("");
  const [resultThird, setResultThird] = useState("");
  const [resultState, setResultState] = useState(null);
  const [savingResult, setSavingResult] = useState(false);
  const [sendingResultEmail, setSendingResultEmail] = useState(false);
  const [confirmResultEmail, setConfirmResultEmail] = useState(false);

  const [finals, setFinals] = useState({ yellow: "", green: "", polka: "", white: "" });
  const [finalState, setFinalState] = useState(null);

  async function load(event, raceSlug = selectedRaceSlug) {
    if (event) event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, race: raceSlug }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Could not load admin data.");
      setData(json);
      setFinals({
        yellow: json.finalResults?.yellow || "",
        green: json.finalResults?.green || "",
        polka: json.finalResults?.polka || "",
        white: json.finalResults?.white || "",
      });
      const race = getRace(raceSlug);
      const firstMissing = race?.stages.find((s) => !json.results?.[s.n]);
      const nextN = firstMissing?.n || race?.stages?.[0]?.n || 1;
      setResultStage(nextN);
      hydrateResult(nextN, json.results || {});
      setResultState(null);
      setEmailState(null);
      setFinalState(null);
    } catch (err) {
      setError(err.message || "Could not reach the server.");
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  function changeRace(slug) {
    setSelectedRaceSlug(slug);
    setData(null);
    setResultFirst("");
    setResultSecond("");
    setResultThird("");
    setExpandedUser(null);
    if (password) load(null, slug);
  }

  function hydrateResult(stageN, source = data?.results || {}) {
    const saved = source?.[stageN] || {};
    setResultFirst(saved.first || "");
    setResultSecond(saved.second || "");
    setResultThird(saved.third || "");
  }

  function chooseResultStage(value) {
    const n = Number(value);
    setResultStage(n);
    hydrateResult(n);
    setResultState(null);
    setConfirmResultEmail(false);
  }

  async function saveResult() {
    setSavingResult(true);
    setResultState(null);
    try {
      const res = await fetch("/api/admin/save-result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, race: selectedRaceSlug, stageNumber: resultStage, first: resultFirst, second: resultSecond, third: resultThird }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Could not save result.");
      setData((prev) => prev ? { ...prev, results: { ...prev.results, [resultStage]: { first: resultFirst, second: resultSecond, third: resultThird } } } : prev);
      setResultState({ ok: true, text: "Result saved. No email was sent." });
    } catch (err) {
      setResultState({ ok: false, text: err.message });
    } finally {
      setSavingResult(false);
    }
  }

  async function sendResultEmail(testOnly = false) {
    setSendingResultEmail(true);
    setResultState(null);
    try {
      const res = await fetch("/api/admin/send-result-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, race: selectedRaceSlug, stageNumber: resultStage, testEmail: testOnly ? testEmail : undefined }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Could not send result email.");
      setResultState({ ok: true, text: testOnly ? `Test sent to ${testEmail}.` : `Result email sent to ${json.sent}/${json.total} opted-in players.${json.errors?.length ? ` ${json.errors.join(" · ")}` : ""}` });
      setConfirmResultEmail(false);
    } catch (err) {
      setResultState({ ok: false, text: err.message });
    } finally {
      setSendingResultEmail(false);
    }
  }

  async function sendManualEmail(testOnly = false) {
    setSendingEmail(true);
    setEmailState(null);
    try {
      const body = { password, race: selectedRaceSlug, subject, message, sourceLang };
      if (testOnly) body.testEmail = testEmail;
      if (!testOnly && recipientMode === "selected") {
        body.selectedEmails = (data?.users || []).filter((u) => selectedIds.has(u.id) && u.emailOptIn).map((u) => u.email);
      }
      const res = await fetch("/api/admin/send-email", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Could not send email.");
      setEmailState({ ok: true, text: testOnly ? `Test sent to ${testEmail}.` : `Sent ${json.sent}/${json.total}.${json.errors?.length ? ` ${json.errors.join(" · ")}` : ""}` });
      if (!testOnly) {
        setSubject("");
        setMessage("");
        setEditorKey((n) => n + 1);
        setSelectedIds(new Set());
        setConfirmEmail(false);
      }
    } catch (err) {
      setEmailState({ ok: false, text: err.message });
    } finally {
      setSendingEmail(false);
    }
  }

  async function saveFinalResults() {
    setFinalState(null);
    try {
      const res = await fetch("/api/admin/save-final-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, race: selectedRaceSlug, ...finals }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Could not save jersey winners.");
      setFinalState({ ok: true, text: "Final jersey winners saved." });
    } catch (err) {
      setFinalState({ ok: false, text: err.message });
    }
  }

  async function toggleOptIn(user) {
    setUpdatingOptIn(user.id);
    try {
      const value = !user.emailOptIn;
      const res = await fetch("/api/admin/update-opt-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, userId: user.id, emailOptIn: value }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Update failed.");
      setData((prev) => ({ ...prev, users: prev.users.map((u) => u.id === user.id ? { ...u, emailOptIn: value } : u) }));
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdatingOptIn(null);
    }
  }

  const users = data?.users || [];
  const filteredUsers = users.filter((u) => `${u.name} ${u.email}`.toLowerCase().includes(search.toLowerCase()));
  const optedIn = users.filter((u) => u.emailOptIn).length;
  const participants = users.filter((u) => u.stagesPicked > 0).length;
  const complete = users.filter((u) => u.stagesPicked === selectedRace?.stages.length).length;
  const savedResult = data?.results?.[resultStage];
  const selectedEvent = selectedRace?.stages.find((s) => s.n === resultStage);
  const selectedRecipients = users.filter((u) => selectedIds.has(u.id) && u.emailOptIn).length;

  if (!data) {
    return (
      <main className="admin-shell">
        <div className="admin-login-card">
          <p className="eyebrow">Grand Tour Pool · Operations</p>
          <h1>Admin control room</h1>
          <p>Manage one race at a time. Results, emails and participant data stay isolated by race.</p>
          <form onSubmit={load} className="admin-login-form">
            <label>Race
              <select value={selectedRaceSlug} onChange={(e) => setSelectedRaceSlug(e.target.value)}>
                {raceOptions.map((race) => <option key={race.slug} value={race.slug}>{localised(race.name, "en")} {race.category ? `— ${race.category}` : ""}</option>)}
              </select>
            </label>
            <label>Admin password
              <input type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            <button className="btn primary" disabled={loading}>{loading ? "Loading…" : "Open admin"}</button>
          </form>
          {error && <p className="admin-message error" role="alert">{error}</p>}
        </div>
      </main>
    );
  }

  return (
    <main className="admin-shell">
      <header className="admin-topbar">
        <div>
          <p className="eyebrow">Operations</p>
          <h1>Admin control room</h1>
          <p>{data.race.name}{data.race.category ? ` · ${data.race.category}` : ""}</p>
        </div>
        <label className="admin-race-select">Race
          <select value={selectedRaceSlug} onChange={(e) => changeRace(e.target.value)}>
            {raceOptions.map((race) => <option key={race.slug} value={race.slug}>{localised(race.name, "en")} {race.category ? `— ${race.category}` : ""}</option>)}
          </select>
        </label>
      </header>

      {error && <p className="admin-message error" role="alert">{error}</p>}

      <section className="admin-kpis" aria-label="Key metrics">
        <div><strong>{users.length}</strong><span>Registered users</span></div>
        <div><strong>{participants}</strong><span>Participants</span></div>
        <div><strong>{complete}</strong><span>{selectedRace?.stages.length}/{selectedRace?.stages.length} picks</span></div>
        <div><strong>{optedIn}</strong><span>Email opt-ins</span></div>
      </section>

      <section className="admin-panel admin-critical">
        <div className="admin-panel-head">
          <div><p className="eyebrow">Results</p><h2>Save podium</h2></div>
          <span className="admin-safe-badge">Saving does not send email</span>
        </div>
        <div className="admin-grid two">
          <label>Event
            <select value={resultStage} onChange={(e) => chooseResultStage(e.target.value)}>
              {selectedRace?.stages.map((stage) => <option key={stage.n} value={stage.n}>{eventLabel(stage, selectedRace)} · {stage.date}</option>)}
            </select>
          </label>
          <div className="admin-event-summary">
            <strong>{selectedEvent ? eventLabel(selectedEvent, selectedRace) : "—"}</strong>
            <span>{selectedEvent ? `${selectedEvent.km} km · ${selectedEvent.startTime} · ${selectedEvent.from}${selectedEvent.to !== selectedEvent.from ? ` → ${selectedEvent.to}` : ""}` : ""}</span>
          </div>
        </div>
        {selectedRace?.riders.length ? (
          <div className="admin-podium-grid">
            <TeamRiderPicker race={selectedRace} value={resultFirst} onChange={setResultFirst} label="1st — winner" />
            <TeamRiderPicker race={selectedRace} value={resultSecond} onChange={setResultSecond} label="2nd" />
            <TeamRiderPicker race={selectedRace} value={resultThird} onChange={setResultThird} label="3rd" />
          </div>
        ) : <p className="admin-message warning">This race has no complete startlist yet. Results cannot be entered safely.</p>}
        <div className="admin-actions">
          <button className="btn primary" onClick={saveResult} disabled={savingResult || !resultFirst || !resultSecond || !resultThird}>{savingResult ? "Saving…" : savedResult ? "Update saved result" : "Save result"}</button>
          {savedResult && <span className="admin-saved-note">A result is saved for this event.</span>}
        </div>
        {resultState && <p className={`admin-message ${resultState.ok ? "success" : "error"}`}>{resultState.text}</p>}

        <div className="admin-email-separator" />
        <h3>Result email</h3>
        <p className="admin-help">Send only after checking the saved podium. Recipients are always limited to users with explicit email opt-in.</p>
        <div className="admin-actions wrap">
          <input className="admin-inline-input" type="email" placeholder="Test address" value={testEmail} onChange={(e) => setTestEmail(e.target.value)} />
          <button className="btn secondary" onClick={() => sendResultEmail(true)} disabled={!savedResult || !testEmail || sendingResultEmail}>Send test</button>
          {!confirmResultEmail ? (
            <button className="btn danger-outline" onClick={() => setConfirmResultEmail(true)} disabled={!savedResult}>Prepare live send</button>
          ) : (
            <div className="admin-confirm-row">
              <strong>Send to all opted-in players?</strong>
              <button className="btn danger" onClick={() => sendResultEmail(false)} disabled={sendingResultEmail}>{sendingResultEmail ? "Sending…" : "Yes, send result email"}</button>
              <button className="btn ghost" onClick={() => setConfirmResultEmail(false)}>Cancel</button>
            </div>
          )}
        </div>
      </section>

      <section className="admin-panel">
        <div className="admin-panel-head"><div><p className="eyebrow">Communication</p><h2>Send a reminder email</h2></div><span>{optedIn} opted in</span></div>
        <div className="admin-grid two">
          <label>Source language
            <select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}><option value="ca">Català</option><option value="es">Español</option><option value="en">English</option></select>
          </label>
          <label>Subject
            <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Reminder subject" />
          </label>
        </div>
        <label className="admin-label">Message</label>
        <RichTextEditor key={editorKey} initialValue="" onChange={setMessage} placeholder="Write the email…" />
        <div className="admin-recipient-row">
          <label><input type="radio" checked={recipientMode === "all"} onChange={() => setRecipientMode("all")} /> Everyone opted in ({optedIn})</label>
          <label><input type="radio" checked={recipientMode === "selected"} onChange={() => setRecipientMode("selected")} /> Selected opted-in users ({selectedRecipients})</label>
        </div>
        {recipientMode === "selected" && <p className="admin-help">Select recipients in the user table below. Opted-out users can never be sent a reminder from this screen.</p>}
        <details className="admin-preview">
          <summary>Preview branded email</summary>
          <div dangerouslySetInnerHTML={{ __html: buildEmailHtml({ bodyHtml: message || "<p>Your message will appear here.</p>", lang: sourceLang, showGreeting: false, raceSlug: selectedRaceSlug }) }} />
        </details>
        <div className="admin-actions wrap">
          <input className="admin-inline-input" type="email" placeholder="Test address" value={testEmail} onChange={(e) => setTestEmail(e.target.value)} />
          <button className="btn secondary" onClick={() => sendManualEmail(true)} disabled={sendingEmail || !testEmail || !subject || !message}>Send test</button>
          {!confirmEmail ? <button className="btn primary" onClick={() => setConfirmEmail(true)} disabled={!subject || !message || (recipientMode === "selected" && selectedRecipients === 0)}>Review live send</button> : (
            <div className="admin-confirm-row"><strong>Send now?</strong><button className="btn danger" onClick={() => sendManualEmail(false)} disabled={sendingEmail}>{sendingEmail ? "Sending…" : `Yes, send to ${recipientMode === "all" ? optedIn : selectedRecipients}`}</button><button className="btn ghost" onClick={() => setConfirmEmail(false)}>Cancel</button></div>
          )}
        </div>
        {emailState && <p className={`admin-message ${emailState.ok ? "success" : "error"}`}>{emailState.text}</p>}
      </section>

      {hasJerseys(selectedRace) && (
        <section className="admin-panel">
          <p className="eyebrow">Grand Tour only</p><h2>Final jersey winners</h2>
          <div className="admin-podium-grid jersey-grid">
            {JERSEYS.map(([key, label]) => <TeamRiderPicker key={key} race={selectedRace} value={finals[key]} onChange={(id) => setFinals((prev) => ({ ...prev, [key]: id }))} label={label} />)}
          </div>
          <button className="btn primary" onClick={saveFinalResults} disabled={JERSEYS.some(([key]) => !finals[key])}>Save final classifications</button>
          {finalState && <p className={`admin-message ${finalState.ok ? "success" : "error"}`}>{finalState.text}</p>}
        </section>
      )}

      <section className="admin-panel">
        <div className="admin-panel-head"><div><p className="eyebrow">Players</p><h2>User table</h2></div><span>{filteredUsers.length} shown</span></div>
        <input className="admin-search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name or email" />
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th></th><th>Name</th><th>Email</th><th>Picks</th><th>Lang</th><th>Email opt-in</th></tr></thead>
            <tbody>
              {filteredUsers.map((user) => (
                <Fragment key={user.id}>
                  <tr>
                    <td>{recipientMode === "selected" && user.emailOptIn ? <input aria-label={`Select ${user.email}`} type="checkbox" checked={selectedIds.has(user.id)} onChange={() => setSelectedIds((prev) => { const next = new Set(prev); next.has(user.id) ? next.delete(user.id) : next.add(user.id); return next; })} /> : null}</td>
                    <td><button className="admin-name-button" onClick={() => setExpandedUser(expandedUser === user.id ? null : user.id)}>{user.name}</button></td>
                    <td>{user.email}</td><td>{user.stagesPicked}/{selectedRace?.stages.length}</td><td>{user.preferredLanguage}</td>
                    <td><button className={`optin-toggle ${user.emailOptIn ? "on" : "off"}`} disabled={updatingOptIn === user.id} onClick={() => toggleOptIn(user)}>{updatingOptIn === user.id ? "…" : user.emailOptIn ? "Opted in" : "Opted out"}</button></td>
                  </tr>
                  {expandedUser === user.id && <tr key={`${user.id}-detail`} className="admin-user-detail"><td colSpan="6"><strong>Predictions:</strong> {selectedRace?.stages.map((stage) => `${eventLabel(stage, selectedRace)}: ${user.picks?.[stage.n] || "—"}`).join(" · ")}{hasJerseys(selectedRace) && <><br /><strong>Finals:</strong> {JERSEYS.map(([key, label]) => `${label}: ${user.finals?.[key] || "—"}`).join(" · ")}</>}</td></tr>}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
