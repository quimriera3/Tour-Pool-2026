"use client";
// components/AuthModal.js
import { useState } from "react";
import { registerUser, loginUser } from "../lib/store";

export default function AuthModal({ onClose, onAuth }) {
  const [mode, setMode] = useState("register"); // "register" | "login"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setError("");
    if (mode === "register") {
      if (!name || !email || !password) {
        setError("Please fill in every field.");
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
      }
      const res = await registerUser(name, email, password);
      if (!res.ok) {
        setError(res.error);
        return;
      }
    } else {
      const res = await loginUser(email, password);
      if (!res.ok) {
        setError(res.error);
        return;
      }
    }
    onAuth();
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="tab-switch">
          <button
            className={mode === "register" ? "active" : ""}
            onClick={() => setMode("register")}
            type="button"
          >
            Sign up
          </button>
          <button
            className={mode === "login" ? "active" : ""}
            onClick={() => setMode("login")}
            type="button"
          >
            Log in
          </button>
        </div>

        <h2>{mode === "register" ? "Join the pool" : "Welcome back"}</h2>

        <form onSubmit={submit}>
          {mode === "register" && (
            <div className="field">
              <label>Full name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" />
            </div>
          )}
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          {error && <p className="error-text">{error}</p>}

          <div className="modal-actions">
            <button type="submit" className="btn">
              {mode === "register" ? "Create account & play" : "Log in"}
            </button>
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>

        <a href="/contact" className="modal-help-link">
          Need help? Contact us.
        </a>
      </div>
    </div>
  );
}
