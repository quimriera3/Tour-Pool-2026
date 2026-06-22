"use client";
// app/admin/page.js
import { useState } from "react";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [search, setSearch] = useState("");

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState(null);
  const [confirmSend, setConfirmSend] = useState(false);

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

  async function sendEmail() {
    setSending(true);
    setSendResult(null);
    try {
      const res = await fetch("/api/admin/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, subject, message }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSendResult({ ok: false, error: data.error });
      } else {
        setSendResult({ ok: true, sent: data.sent, total: data.total, errors: data.errors });
        setSubject("");
        setMessage("");
      }
    } catch (err) {
      setSendResult({ ok: false, error: "Could not reach the server." });
    } finally {
      setSending(false);
      setConfirmSend(false);
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

  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">Admin only · {users.length} signed up</span>
        <h1>Sign-ups & predictions</h1>
      </div>

      {/* ---------- Send a reminder email ---------- */}
      <div className="card">
        <h3 style={{ fontSize: 16 }}>Send a reminder email</h3>
        <p className="subtitle" style={{ marginTop: 6 }}>
          Goes only to the <strong>{optedInCount} of {users.length}</strong> users who opted in
          to essential game emails when they signed up.
        </p>
        <div className="field">
          <label>Subject</label>
          <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Stage 5 predictions close in 1 hour!" />
        </div>
        <div className="field">
          <label>Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="One line per paragraph -- this becomes the email body."
            rows={5}
            style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1.5px solid var(--grey-light)", fontSize: 14, fontFamily: "inherit" }}
          />
        </div>

        {!confirmSend ? (
          <button
            className="btn"
            style={{ marginTop: 14 }}
            disabled={!subject || !message || optedInCount === 0}
            onClick={() => setConfirmSend(true)}
          >
            Review & send to {optedInCount} {optedInCount === 1 ? "person" : "people"}
          </button>
        ) : (
          <div style={{ marginTop: 14, padding: 14, background: "#fff8e1", borderRadius: 8, border: "1px solid #f0d98c" }}>
            <p style={{ fontSize: 13, fontWeight: 700 }}>
              Send &quot;{subject}&quot; to {optedInCount} {optedInCount === 1 ? "person" : "people"} now?
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
                      <td style={{ fontWeight: 700 }}>{u.name}</td>
                      <td>{u.email}</td>
                      <td>{new Date(u.joined).toLocaleDateString()}</td>
                      <td>{u.emailOptIn ? "✅" : "—"}</td>
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
                        <td colSpan={7} style={{ background: "#fafafa" }}>
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
                  <td colSpan={7}>No matches.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
