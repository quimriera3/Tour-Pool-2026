"use client";
// components/AuthModal.js
import { useState } from "react";
import { registerUser, loginUser } from "../lib/store";
import { useLang, t } from "../lib/i18n";

export default function AuthModal({ onClose, onAuth }) {
  const lang = useLang();
  const [mode, setMode] = useState("register"); // "register" | "login"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailOptIn, setEmailOptIn] = useState(true);
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setError("");
    if (mode === "register") {
      if (!name || !email || !password) {
        setError(t(lang, "auth.fillFields"));
        return;
      }
      if (password.length < 6) {
        setError(t(lang, "auth.passwordLength"));
        return;
      }
      const res = await registerUser(name, email, password, emailOptIn);
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
            {t(lang, "auth.signup")}
          </button>
          <button
            className={mode === "login" ? "active" : ""}
            onClick={() => setMode("login")}
            type="button"
          >
            {t(lang, "auth.login")}
          </button>
        </div>

        <h2>{mode === "register" ? t(lang, "auth.joinPool") : t(lang, "auth.welcomeBack")}</h2>

        <form onSubmit={submit}>
          {mode === "register" && (
            <div className="field">
              <label>{t(lang, "auth.fullName")}</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" />
            </div>
          )}
          <div className="field">
            <label>{t(lang, "auth.email")}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
            />
          </div>
          <div className="field">
            <label>{t(lang, "auth.password")}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          {mode === "register" && (
            <label className="checkbox-field">
              <input
                type="checkbox"
                checked={emailOptIn}
                onChange={(e) => setEmailOptIn(e.target.checked)}
              />
              <span>{t(lang, "auth.optIn")}</span>
            </label>
          )}

          {error && <p className="error-text">{error}</p>}

          <div className="modal-actions">
            <button type="submit" className="btn">
              {mode === "register" ? t(lang, "auth.createAccount") : t(lang, "auth.login")}
            </button>
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              {t(lang, "auth.cancel")}
            </button>
          </div>
        </form>

        <a href={lang === "es" ? "/es/contact" : "/contact"} className="modal-help-link">
          {t(lang, "auth.needHelp")}
        </a>
      </div>
    </div>
  );
}
