"use client";
// app/admin/page.js
import { useState } from "react";
import { buildEmailHtml } from "../../lib/emailTemplate";
import RichTextEditor from "../../components/RichTextEditor";
import SimpleBarChart from "../../components/SimpleBarChart";
import { STAGES, riderById, isWhiteJerseyEligible } from "../../lib/data";
import TeamRiderPicker from "../../components/TeamRiderPicker";
import JerseyIcon from "../../components/JerseyIcon";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [search, setSearch] = useState("");
  const [chartsOpen, setChartsOpen] = useState(false);
  const [kpisOpen, setKpisOpen] = useState(false);
  const [updatingOptIn, setUpdatingOptIn] = useState(null);

  const [emailOpen, setEmailOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sourceLang, setSourceLang] = useState("ca");
  const [editorKey, setEditorKey] = useState(0);
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState(null);
  const [confirmSend, setConfirmSend] = useState(false);

  const [testEmail, setTestEmail] = useState("");
  const [sendingTest, setSendingTest] = useState(false);
  const [testResult, setTestResult] = useState(null);

  const [recipientMode, setRecipientMode] = useState("all"); // "all" | "selected"
  const [selectedIds, setSelectedIds] = useState(new Set());

  const [resultsOpen, setResultsOpen] = useState(false);
  const [results, setResults] = useState({});
  const [resultStage, setResultStage] = useState(1);
  const [resultFirst, setResultFirst] = useState("");
  const [resultSecond, setResultSecond] = useState("");
  const [resultThird, setResultThird] = useState("");
  const [savingResult, setSavingResult] = useState(false);
  const [confirmSaveResult, setConfirmSaveResult] = useState(false);
  const [saveResultMsg, setSaveResultMsg] = useState(null);

  const [finalsOpen, setFinalsOpen] = useState(false);
  const [finalResults, setFinalResults] = useState({});
  const [finalYellow, setFinalYellow] = useState("");
  const [finalGreen, setFinalGreen] = useState("");
  const [finalPolka, setFinalPolka] = useState("");
  const [finalWhite, setFinalWhite] = useState("");
  const [savingFinals, setSavingFinals] = useState(false);
  const [confirmSaveFinals, setConfirmSaveFinals] = useState(false);
  const [saveFinalsMsg, setSaveFinalsMsg] = useState(null);

  async function load(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setUsers(null);
      } else {
        setUsers(data.users);
        setResults(data.results || {});
        setFinalResults(data.finalResults || {});
        if (data.finalResults) {
          setFinalYellow(data.finalResults.yellow || "");
          setFinalGreen(data.finalResults.green || "");
          setFinalPolka(data.finalResults.polka || "");
          setFinalWhite(data.finalResults.white || "");
        }
        const firstMissing = STAGES.find((s) => !(data.results || {})[s.n]);
        if (firstMissing) setResultStage(firstMissing.n);
      }
    } catch (err) {
      setError("Could not reach the server.");
    } finally {
      setLoading(false);
    }
  }

  async function toggleOptIn(user) {
    const newValue = !user.emailOptIn;
    setUpdatingOptIn(user.id);
    try {
      const res = await fetch("/api/admin/update-opt-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, userId: user.id, emailOptIn: newValue }),
      });
      if (res.ok) {
        setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, emailOptIn: newValue } : u)));
      } else {
        const data = await res.json().catch(() => ({}));
        alert("Could not update: " + (data.error || "unknown error"));
      }
    } catch (err) {
      alert("Could not reach the server.");
    } finally {
      setUpdatingOptIn(null);
    }
  }

  async function sendTest() {
    setSendingTest(true);
    setTestResult(null);
    try {
      const res = await fetch("/api/admin/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          subject: subject || "(test) Tour de France Pool",
          message: message || "This is a test email.",
          testEmail,
          sourceLang,
        }),
      });
      const data = await res.json();
      setTestResult(res.ok ? { ok: true } : { ok: false, error: data.error });
    } catch (err) {
      setTestResult({ ok: false, error: "Could not reach the server." });
    } finally {
      setSendingTest(false);
    }
  }

  async function sendEmail() {
    setSending(true);
    setSendResult(null);
    try {
      const body = { password, subject, message, sourceLang };
      if (recipientMode === "selected") {
        body.selectedEmails = users.filter((u) => selectedIds.has(u.id)).map((u) => u.email);
      }
      const res = await fetch("/api/admin/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        setSendResult({ ok: false, error: data.error });
      } else {
        setSendResult({ ok: true, sent: data.sent, total: data.total, errors: data.errors });
        setSubject("");
        setMessage("");
        setEditorKey((k) => k + 1);
        setSelectedIds(new Set());
      }
    } catch (err) {
      setSendResult({ ok: false, error: "Could not reach the server." });
    } finally {
      setSending(false);
      setConfirmSend(false);
    }
  }

  async function saveFinalResults() {
    setSavingFinals(true);
    setSaveFinalsMsg(null);
    try {
      const res = await fetch("/api/admin/save-final-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          yellow: finalYellow,
          green: finalGreen,
          polka: finalPolka,
          white: finalWhite,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSaveFinalsMsg({ ok: false, error: data.error });
      } else {
        setFinalResults({ yellow: finalYellow, green: finalGreen, polka: finalPolka, white: finalWhite });
        setSaveFinalsMsg({ ok: true });
      }
    } catch (err) {
      setSaveFinalsMsg({ ok: false, error: "Could not reach the server." });
    } finally {
      setSavingFinals(false);
      setConfirmSaveFinals(false);
    }
  }

  function toggleSelected(id) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function saveResult() {
    setSavingResult(true);
    setSaveResultMsg(null);
    try {
      const res = await fetch("/api/admin/save-result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          stageNumber: resultStage,
          first: resultFirst,
          second: resultSecond,
          third: resultThird,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSaveResultMsg({ ok: false, error: data.error });
      } else {
        setResults((prev) => ({ ...prev, [resultStage]: { first: resultFirst, second: resultSecond, third: resultThird } }));
        setSaveResultMsg({
          ok: true,
          emailed: data.emailed,
          sent: data.sent,
          total: data.total,
          warning: data.warning,
        });
        setResultFirst("");
        setResultSecond("");
        setResultThird("");
        const nextMissing = STAGES.find((s) => s.n > resultStage && !results[s.n]);
        if (nextMissing) setResultStage(nextMissing.n);
      }
    } catch (err) {
      setSaveResultMsg({ ok: false, error: "Could not reach the server." });
    } finally {
      setSavingResult(false);
      setConfirmSaveResult(false);
    }
  }

  if (!users) {
    return (
      <div>
        <div className="page-header">
          <span className="eyebrow">Admin only</span>
          <h1>Sign-ups & predictions</h1>
        </div>
        <div className="card" style={{ maxWidth: 360 }}>
          <form onSubmit={load}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              className="rider-search"
              style={{ marginBottom: 12 }}
            />
            <button type="submit" className="btn" disabled={loading} style={{ width: "100%" }}>
              {loading ? "Checking..." : "View data"}
            </button>
            {error && <p style={{ color: "var(--red)", marginTop: 10, fontSize: 13 }}>{error}</p>}
          </form>
        </div>
      </div>
    );
  }

  const query = search.trim().toLowerCase();
  const visible = query
    ? users.filter((u) => u.name.toLowerCase().includes(query) || u.email.toLowerCase().includes(query))
    : users;
  const optedInCount = users.filter((u) => u.emailOptIn).length;
  const targetCount = recipientMode === "selected" ? selectedIds.size : optedInCount;

  // ---- Chart 1: sign-ups per day, last 14 days ----
  const signupsByDay = [];
  for (let i = 13; i >= 0; i--) {
    const day = new Date();
    day.setDate(day.getDate() - i);
    const dayStr = day.toDateString();
    const count = users.filter((u) => new Date(u.joined).toDateString() === dayStr).length;
    signupsByDay.push({ label: String(day.getDate()), value: count });
  }

  // ---- Chart 2: participation -- how many stages each person has picked ----
  const buckets = [
    { label: "0", test: (n) => n === 0 },
    { label: "1-5", test: (n) => n >= 1 && n <= 5 },
    { label: "6-10", test: (n) => n >= 6 && n <= 10 },
    { label: "11-15", test: (n) => n >= 11 && n <= 15 },
    { label: "16-20", test: (n) => n >= 16 && n <= 20 },
    { label: "21", test: (n) => n === 21 },
  ];
  const participationData = buckets.map((b) => ({
    label: b.label,
    value: users.filter((u) => b.test(u.stagesPicked)).length,
  }));
  const activeCount = users.filter((u) => u.stagesPicked > 0).length;

  // ---- KPIs ----
  const totalRegistered = users.length;
  const activePct = totalRegistered > 0 ? Math.round((activeCount / totalRegistered) * 100) : 0;
  const avgStagesPicked =
    totalRegistered > 0 ? (users.reduce((sum, u) => sum + u.stagesPicked, 0) / totalRegistered).toFixed(1) : "0.0";
  const jerseyCompleteCount = users.filter((u) => Object.values(u.finals).filter(Boolean).length === 4).length;
  const optedInCount2 = users.filter((u) => u.emailOptIn).length;

  const kpis = [
    { label: "Total registered", value: totalRegistered },
    { label: "Active (≥1 pick)", value: activeCount + " (" + activePct + "%)" },
    { label: "Avg. stages picked", value: avgStagesPicked + " / 21" },
    { label: "All 4 jerseys done", value: jerseyCompleteCount },
    { label: "Opted in to emails", value: optedInCount2 },
  ];

  const previewHtml = buildEmailHtml({
    name: "Jane",
    bodyHtml: message || "<p>Your message will appear here as you type it.</p>",
    lang: sourceLang,
    showGreeting: false,
  });

  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">Admin only · {users.length} signed up</span>
        <h1>Sign-ups & predictions</h1>
      </div>

      <button
        type="button"
        className="card"
        style={{ width: "100%", textAlign: "left", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}
        onClick={() => setEmailOpen((v) => !v)}
      >
        <h3 style={{ fontSize: 16, margin: 0 }}>Send a reminder email</h3>
        <span style={{ fontSize: 13 }}>{emailOpen ? "▲ Hide" : "▼ Show"}</span>
      </button>

      {emailOpen && (
      <div className="card" style={{ marginTop: 16 }}>
        <div className="grid grid-2" style={{ marginTop: 12, alignItems: "start" }}>
          <div>
            <div className="field" style={{ marginTop: 0 }}>
              <label>I'm writing this in</label>
              <select
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
                style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1.5px solid var(--grey-light)", fontSize: 14 }}
              >
                <option value="ca">Català</option>
                <option value="es">Español</option>
                <option value="en">English</option>
              </select>
              <p className="subtitle" style={{ fontSize: 11.5, marginTop: 4 }}>
                Anyone whose preferred language is different gets an automatic translation.
              </p>
            </div>
            <div className="field">
              <label>Subject</label>
              <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Stage 5 predictions close in 1 hour!" />
            </div>
            <div className="field">
              <label>Message</label>
              <RichTextEditor
                key={editorKey}
                initialValue={message}
                onChange={setMessage}
                placeholder="Write your message (including your own greeting, e.g. 'Hi!')... use the toolbar for bold, italic, lists, and color."
              />
            </div>

            <div style={{ marginTop: 14, padding: 12, background: "#f7f7f5", borderRadius: 8 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: "var(--grey)", textTransform: "uppercase", display: "block", marginBottom: 6 }}>
                Send yourself a test copy first
              </label>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  type="email"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  placeholder="you@email.com"
                  style={{ flex: 1, padding: "9px 12px", borderRadius: 8, border: "1.5px solid var(--grey-light)", fontSize: 13 }}
                />
                <button
                  type="button"
                  className="btn btn-outline"
                  style={{ padding: "9px 16px", fontSize: 13 }}
                  disabled={!testEmail || sendingTest}
                  onClick={sendTest}
                >
                  {sendingTest ? "Sending..." : "Send test"}
                </button>
              </div>
              {testResult && (
                <p style={{ marginTop: 8, fontSize: 12, color: testResult.ok ? "var(--green)" : "var(--red)" }}>
                  {testResult.ok ? "Test sent — check your inbox." : "Error: " + testResult.error}
                </p>
              )}
            </div>

            <div style={{ marginTop: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: "var(--grey)", textTransform: "uppercase", display: "block", marginBottom: 6 }}>
                Send the real email to
              </label>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  type="button"
                  className={"chip" + (recipientMode === "all" ? " active" : "")}
                  onClick={() => setRecipientMode("all")}
                >
                  Everyone opted in ({optedInCount})
                </button>
                <button
                  type="button"
                  className={"chip" + (recipientMode === "selected" ? " active" : "")}
                  onClick={() => setRecipientMode("selected")}
                >
                  Hand-picked ({selectedIds.size} selected)
                </button>
              </div>
              {recipientMode === "selected" && (
                <p className="subtitle" style={{ marginTop: 8, fontSize: 12 }}>
                  Tick people in the table below to choose exactly who gets this one.
                </p>
              )}
              {recipientMode === "all" && (
                <p className="subtitle" style={{ marginTop: 8, fontSize: 12 }}>
                  {Object.entries(
                    users
                      .filter((u) => u.emailOptIn)
                      .reduce((acc, u) => {
                        acc[u.preferredLanguage] = (acc[u.preferredLanguage] || 0) + 1;
                        return acc;
                      }, {})
                  )
                    .map(([l, n]) => n + " " + l.toUpperCase())
                    .join(" · ")}
                  {" — translated automatically for anyone not in " + sourceLang.toUpperCase() + "."}
                </p>
              )}
            </div>

            {!confirmSend ? (
              <button
                className="btn"
                style={{ marginTop: 14 }}
                disabled={!subject || !message || targetCount === 0}
                onClick={() => setConfirmSend(true)}
              >
                Review & send to {targetCount} {targetCount === 1 ? "person" : "people"}
              </button>
            ) : (
              <div style={{ marginTop: 14, padding: 14, background: "#fff8e1", borderRadius: 8, border: "1px solid #f0d98c" }}>
                <p style={{ fontSize: 13, fontWeight: 700 }}>
                  Send &quot;{subject}&quot; to {targetCount} {targetCount === 1 ? "person" : "people"} now?
                </p>
                <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                  <button className="btn" disabled={sending} onClick={sendEmail}>
                    {sending ? "Sending..." : "Yes, send it"}
                  </button>
                  <button className="btn btn-ghost" disabled={sending} onClick={() => setConfirmSend(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {sendResult && (
              <p style={{ marginTop: 12, fontSize: 13, color: sendResult.ok ? "var(--green)" : "var(--red)" }}>
                {sendResult.ok
                  ? "Sent to " + sendResult.sent + " of " + sendResult.total + " people."
                  : "Error: " + sendResult.error}
              </p>
            )}
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: "var(--grey)", textTransform: "uppercase", display: "block", marginBottom: 6 }}>
              Live preview
            </label>
            <div style={{ background: "#e9e9e9", borderRadius: 8, padding: 14, maxHeight: 480, overflowY: "auto" }}>
              <div style={{ background: "#fff" }} dangerouslySetInnerHTML={{ __html: previewHtml }} />
            </div>
          </div>
        </div>
      </div>
      )}

      <button
        type="button"
        className="card"
        style={{ width: "100%", textAlign: "left", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16 }}
        onClick={() => setResultsOpen((v) => !v)}
      >
        <h3 style={{ fontSize: 16, margin: 0 }}>
          Stage results {Object.keys(results).length > 0 && (
            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--grey)" }}>
              ({Object.keys(results).length} / {STAGES.length} uploaded)
            </span>
          )}
        </h3>
        <span style={{ fontSize: 13 }}>{resultsOpen ? "▲ Hide" : "▼ Show"}</span>
      </button>

      {resultsOpen && (
        <div className="card" style={{ marginTop: 16 }}>
          <p className="subtitle" style={{ marginTop: 0, fontSize: 12.5 }}>
            Upload the real top 3 for a stage. This also automatically emails everyone who opted in --
            in their own language -- with the podium, a link to the leaderboard, and a reminder to make
            their next pick.
          </p>

          <div className="field" style={{ marginTop: 14 }}>
            <label>Stage</label>
            <select
              value={resultStage}
              onChange={(e) => {
                setResultStage(Number(e.target.value));
                setSaveResultMsg(null);
                setConfirmSaveResult(false);
              }}
              style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1.5px solid var(--grey-light)", fontSize: 14 }}
            >
              {STAGES.map((s) => (
                <option key={s.n} value={s.n}>
                  Stage {s.n}: {s.from} → {s.to} {results[s.n] ? "✅" : ""}
                </option>
              ))}
            </select>
            {results[resultStage] && (
              <p className="subtitle" style={{ fontSize: 12, marginTop: 6 }}>
                Already has a result: {riderById(results[resultStage].first)?.name || results[resultStage].first} ·{" "}
                {riderById(results[resultStage].second)?.name || results[resultStage].second} ·{" "}
                {riderById(results[resultStage].third)?.name || results[resultStage].third}. Uploading again
                will overwrite it and send a new email.
              </p>
            )}
          </div>

          <div className="grid grid-2" style={{ marginTop: 4 }}>
            <div className="field">
              <label>🥇 Winner</label>
              <TeamRiderPicker
                value={resultFirst}
                onChange={setResultFirst}
                selectedRiderName={riderById(resultFirst)?.name || ""}
              />
            </div>
            <div className="field">
              <label>🥈 2nd</label>
              <TeamRiderPicker
                value={resultSecond}
                onChange={setResultSecond}
                selectedRiderName={riderById(resultSecond)?.name || ""}
              />
            </div>
            <div className="field">
              <label>🥉 3rd</label>
              <TeamRiderPicker
                value={resultThird}
                onChange={setResultThird}
                selectedRiderName={riderById(resultThird)?.name || ""}
              />
            </div>
          </div>

          {!confirmSaveResult ? (
            <button
              className="btn"
              style={{ marginTop: 14 }}
              disabled={!resultFirst || !resultSecond || !resultThird}
              onClick={() => setConfirmSaveResult(true)}
            >
              UPLOAD
            </button>
          ) : (
            <div style={{ marginTop: 14, padding: 14, background: "#fff8e1", borderRadius: 8, border: "1px solid #f0d98c" }}>
              <p style={{ fontSize: 13, fontWeight: 700 }}>
                Save Stage {resultStage} result and email every opted-in user now?
              </p>
              <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                <button className="btn" disabled={savingResult} onClick={saveResult}>
                  {savingResult ? "Uploading..." : "Yes, upload"}
                </button>
                <button className="btn btn-ghost" disabled={savingResult} onClick={() => setConfirmSaveResult(false)}>
                  Cancel
                </button>
              </div>
            </div>
          )}

          {saveResultMsg && (
            <p style={{ marginTop: 12, fontSize: 13, color: saveResultMsg.ok ? "var(--green)" : "var(--red)" }}>
              {saveResultMsg.ok
                ? saveResultMsg.emailed
                  ? "Result saved and emailed to " + saveResultMsg.sent + " of " + saveResultMsg.total + " people."
                  : "Result saved. " + (saveResultMsg.warning || "No email sent.")
                : "Error: " + saveResultMsg.error}
            </p>
          )}
        </div>
      )}

      <button
        type="button"
        className="card"
        style={{ width: "100%", textAlign: "left", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16 }}
        onClick={() => setFinalsOpen((v) => !v)}
      >
        <h3 style={{ fontSize: 16, margin: 0 }}>
          Final jersey winners {Object.keys(finalResults).length > 0 && finalResults.yellow && (
            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--green)" }}>(uploaded ✅)</span>
          )}
        </h3>
        <span style={{ fontSize: 13 }}>{finalsOpen ? "▲ Hide" : "▼ Show"}</span>
      </button>

      {finalsOpen && (
        <div className="card" style={{ marginTop: 16 }}>
          <p className="subtitle" style={{ marginTop: 0, fontSize: 12.5 }}>
            Once the Tour is over, upload the real winner of each of the 4 jerseys here. This is what the
            leaderboard's final 10-points-per-jersey scoring compares everyone's picks against -- enter it
            once, save it, and you're done.
          </p>

          <div className="grid grid-2" style={{ marginTop: 14 }}>
            <div className="field">
              <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <JerseyIcon kind="yellow" size={18} /> Yellow (GC winner)
              </label>
              <TeamRiderPicker
                value={finalYellow}
                onChange={setFinalYellow}
                selectedRiderName={riderById(finalYellow)?.name || ""}
              />
            </div>
            <div className="field">
              <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <JerseyIcon kind="green" size={18} /> Green (points)
              </label>
              <TeamRiderPicker
                value={finalGreen}
                onChange={setFinalGreen}
                selectedRiderName={riderById(finalGreen)?.name || ""}
              />
            </div>
            <div className="field">
              <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <JerseyIcon kind="polka" size={18} /> Polka dot (mountains)
              </label>
              <TeamRiderPicker
                value={finalPolka}
                onChange={setFinalPolka}
                selectedRiderName={riderById(finalPolka)?.name || ""}
              />
            </div>
            <div className="field">
              <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <JerseyIcon kind="white" size={18} /> White (best young rider)
              </label>
              <TeamRiderPicker
                value={finalWhite}
                onChange={setFinalWhite}
                riderFilter={isWhiteJerseyEligible}
                selectedRiderName={riderById(finalWhite)?.name || ""}
              />
            </div>
          </div>

          {!confirmSaveFinals ? (
            <button
              className="btn"
              style={{ marginTop: 14 }}
              disabled={!finalYellow || !finalGreen || !finalPolka || !finalWhite}
              onClick={() => setConfirmSaveFinals(true)}
            >
              UPLOAD
            </button>
          ) : (
            <div style={{ marginTop: 14, padding: 14, background: "#fff8e1", borderRadius: 8, border: "1px solid #f0d98c" }}>
              <p style={{ fontSize: 13, fontWeight: 700 }}>Save the final jersey winners now?</p>
              <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                <button className="btn" disabled={savingFinals} onClick={saveFinalResults}>
                  {savingFinals ? "Uploading..." : "Yes, upload"}
                </button>
                <button className="btn btn-ghost" disabled={savingFinals} onClick={() => setConfirmSaveFinals(false)}>
                  Cancel
                </button>
              </div>
            </div>
          )}

          {saveFinalsMsg && (
            <p style={{ marginTop: 12, fontSize: 13, color: saveFinalsMsg.ok ? "var(--green)" : "var(--red)" }}>
              {saveFinalsMsg.ok ? "Final jersey winners saved." : "Error: " + saveFinalsMsg.error}
            </p>
          )}
        </div>
      )}

      <button
        type="button"
        className="card"
        style={{ width: "100%", textAlign: "left", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16 }}
        onClick={() => setKpisOpen((v) => !v)}
      >
        <h3 style={{ fontSize: 16, margin: 0 }}>Key numbers</h3>
        <span style={{ fontSize: 13 }}>{kpisOpen ? "▲ Hide" : "▼ Show"}</span>
      </button>

      {kpisOpen && (
        <div className="card" style={{ marginTop: 16 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
            {kpis.map((k) => (
              <div key={k.label} style={{ minWidth: 120 }}>
                <div style={{ fontSize: 26, fontWeight: 800 }}>{k.value}</div>
                <div style={{ fontSize: 12, color: "var(--grey)", marginTop: 2 }}>{k.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        className="card"
        style={{ width: "100%", textAlign: "left", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16 }}
        onClick={() => setChartsOpen((v) => !v)}
      >
        <h3 style={{ fontSize: 16, margin: 0 }}>Charts</h3>
        <span style={{ fontSize: 13 }}>{chartsOpen ? "▲ Hide" : "▼ Show"}</span>
      </button>

      {chartsOpen && (
        <div className="grid grid-2" style={{ marginTop: 16 }}>
          <div className="card">
            <h3 style={{ fontSize: 14 }}>Sign-ups, last 14 days</h3>
            <p className="subtitle" style={{ fontSize: 12, marginTop: 2 }}>{users.length} total so far</p>
            <div style={{ marginTop: 10 }}>
              <SimpleBarChart data={signupsByDay} barColor="#ffd400" />
            </div>
          </div>
          <div className="card">
            <h3 style={{ fontSize: 14 }}>Participation -- stages picked</h3>
            <p className="subtitle" style={{ fontSize: 12, marginTop: 2 }}>
              {activeCount} of {users.length} have made at least 1 pick
            </p>
            <div style={{ marginTop: 10 }}>
              <SimpleBarChart data={participationData} barColor="#111111" />
            </div>
          </div>
        </div>
      )}

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or email..."
        className="rider-search"
        style={{ marginTop: 16 }}
      />

      <div className="card">
        <div className="table-scroll">
          <table className="leaderboard">
            <thead>
              <tr>
                {recipientMode === "selected" && <th></th>}
                <th>Name</th>
                <th>Email</th>
                <th>Joined</th>
                <th>Emails?</th>
                <th>Stages picked</th>
                <th>Jerseys picked</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {visible.map((u) => {
                const jerseysPicked = Object.values(u.finals).filter(Boolean).length;
                const isOpen = expanded === u.id;
                return (
                  <>
                    <tr key={u.id}>
                      {recipientMode === "selected" && (
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedIds.has(u.id)}
                            onChange={() => toggleSelected(u.id)}
                          />
                        </td>
                      )}
                      <td style={{ fontWeight: 700 }}>{u.name}</td>
                      <td>{u.email}</td>
                      <td>{new Date(u.joined).toLocaleDateString()}</td>
                      <td>
                        <button
                          className="btn btn-outline"
                          style={{ padding: "4px 10px", fontSize: 11 }}
                          disabled={updatingOptIn === u.id}
                          onClick={() => toggleOptIn(u)}
                          title="Click to change this person's email preference"
                        >
                          {updatingOptIn === u.id ? "..." : u.emailOptIn ? "✅ Yes" : "— No"}
                        </button>
                      </td>
                      <td>{u.stagesPicked} / 21</td>
                      <td>{jerseysPicked} / 4</td>
                      <td>
                        <button
                          className="btn btn-outline"
                          style={{ padding: "6px 12px", fontSize: 12 }}
                          onClick={() => setExpanded(isOpen ? null : u.id)}
                        >
                          {isOpen ? "Hide" : "Details"}
                        </button>
                      </td>
                    </tr>
                    {isOpen && (
                      <tr key={u.id + "-detail"}>
                        <td colSpan={8} style={{ background: "#fafafa" }}>
                          <div style={{ padding: "10px 4px" }}>
                            <strong style={{ fontSize: 12 }}>Jersey picks:</strong>{" "}
                            <span style={{ fontSize: 12 }}>
                              Yellow: {u.finals.yellow || "—"} · Green: {u.finals.green || "—"} · Polka:{" "}
                              {u.finals.polka || "—"} · White: {u.finals.white || "—"}
                            </span>
                            <br />
                            <strong style={{ fontSize: 12 }}>Stage picks:</strong>{" "}
                            <span style={{ fontSize: 12 }}>
                              {Object.keys(u.picks).length === 0
                                ? "None yet"
                                : Object.entries(u.picks)
                                    .sort((a, b) => Number(a[0]) - Number(b[0]))
                                    .map(([stage, rider]) => "S" + stage + ": " + rider)
                                    .join(" · ")}
                            </span>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
              {visible.length === 0 && (
                <tr>
                  <td colSpan={8}>No matches.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
