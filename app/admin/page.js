"use client";
// app/admin/page.js
import { useState } from "react";
import { buildEmailHtml } from "../../lib/emailTemplate";
import RichTextEditor from "../../components/RichTextEditor";
import SimpleBarChart from "../../components/SimpleBarChart";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [search, setSearch] = useState("");
  const [tableOpen, setTableOpen] = useState(false);
  const [chartsOpen, setChartsOpen] = useState(false);
  const [updatingOptIn, setUpdatingOptIn] = useState(null);

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

  async function toggleOptIn(user) {
    setUpdatingOptIn(user.id);
    const newValue = !user.emailOptIn;
    try {
      const res = await fetch("/api/admin/update-opt-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, userId: user.id, emailOptIn: newValue }),
      });
      if (res.ok) {
        setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, emailOptIn: newValue } : u)));
      }
    } finally {
      setUpdatingOptIn(null);
    }
  }

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
      }
    } catch (err) {
      setError("Could not reach the server.");
    } finally {
      setLoading(false);
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

  function toggleSelected(id) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
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

  const previewHtml = buildEmailHtml({
    name: "Jane",
    bodyHtml: message || "<p>Your message will appear here as you type it.</p>",
    lang: sourceLang,
  });

  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">Admin only · {users.length} signed up</span>
        <h1>Sign-ups & predictions</h1>
      </div>

      <div className="card">
        <h3 style={{ fontSize: 16 }}>Send a reminder email</h3>

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
                placeholder="Write your message... use the toolbar for bold, italic, lists, and color."
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

      <button
        type="button"
        className="card"
        style={{ width: "100%", textAlign: "left", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16 }}
        onClick={() => setTableOpen((v) => !v)}
      >
        <h3 style={{ fontSize: 16, margin: 0 }}>
          View all sign-ups & predictions ({users.length})
        </h3>
        <span style={{ fontSize: 13 }}>{tableOpen ? "▲ Hide" : "▼ Show"}</span>
      </button>

      {tableOpen && (
        <>
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
                <th>Lang</th>
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
                      <td>{u.emailOptIn ? "✅" : "—"}</td>
                      <td>{(u.preferredLanguage || "en").toUpperCase()}</td>
                      <td>{u.stagesPicked} / 21</td>
                      <td>{jerseysPicked} / 4</td>
                      <td style={{ display: "flex", gap: 6 }}>
                        <button
                          className="btn btn-outline"
                          style={{ padding: "6px 12px", fontSize: 12 }}
                          onClick={() => setExpanded(isOpen ? null : u.id)}
                        >
                          {isOpen ? "Hide" : "Details"}
                        </button>
                        <button
                          className="btn btn-outline"
                          style={{ padding: "6px 12px", fontSize: 12 }}
                          disabled={updatingOptIn === u.id}
                          onClick={() => toggleOptIn(u)}
                          title={u.emailOptIn ? "Remove from email list" : "Add back to email list"}
                        >
                          {updatingOptIn === u.id ? "..." : u.emailOptIn ? "Unsubscribe" : "Resubscribe"}
                        </button>
                      </td>
                    </tr>
                    {isOpen && (
                      <tr key={u.id + "-detail"}>
                        <td colSpan={9} style={{ background: "#fafafa" }}>
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
                  <td colSpan={9}>No matches.</td>
                </tr>
              )}
            </tbody>
          </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
