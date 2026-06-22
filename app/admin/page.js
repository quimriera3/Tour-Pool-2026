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

  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">Admin only · {users.length} signed up</span>
        <h1>Sign-ups & predictions</h1>
      </div>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or email..."
        className="rider-search"
      />

      <div className="card">
        <div className="table-scroll">
          <table className="leaderboard">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Joined</th>
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
                        <td colSpan={6} style={{ background: "#fafafa" }}>
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
                  <td colSpan={6}>No matches.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
