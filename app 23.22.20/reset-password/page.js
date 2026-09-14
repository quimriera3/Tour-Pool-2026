"use client";
// app/reset-password/page.js
import { useEffect, useState } from "react";
import { updatePassword } from "../../lib/store";
import { supabase } from "../../lib/supabaseClient";
import { useLang, t } from "../../lib/i18n";

export default function ResetPassword() {
  const lang = useLang();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Supabase reads the recovery token from the URL and establishes a
    // temporary session automatically; we just wait for that to settle
    // before allowing the form to submit.
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      setReady(true);
    });
    // In case the event already fired before we attached the listener.
    supabase.auth.getSession().then(() => setReady(true));
    return () => listener.subscription.unsubscribe();
  }, []);

  async function submit(e) {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError(t(lang, "auth.passwordLength"));
      return;
    }
    const res = await updatePassword(password);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    setDone(true);
  }

  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">{lang === "es" ? "Cuenta" : "Account"}</span>
        <h1>{t(lang, "auth.resetPassword")}</h1>
      </div>

      <div className="card" style={{ maxWidth: 380 }}>
        {done ? (
          <div>
            <p className="subtitle">
              {lang === "es" ? "Tu contraseña se ha actualizado correctamente." : "Your password has been updated."}
            </p>
            <a href={lang === "es" ? "/es" : "/"} className="btn" style={{ marginTop: 14, display: "inline-block" }}>
              {lang === "es" ? "Ir al inicio" : "Go to home"}
            </a>
          </div>
        ) : (
          <form onSubmit={submit}>
            <div className="field">
              <label>{lang === "es" ? "Nueva contraseña" : "New password"}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={!ready}
              />
            </div>
            {error && <p className="error-text">{error}</p>}
            <button type="submit" className="btn" disabled={!ready} style={{ marginTop: 14, width: "100%" }}>
              {lang === "es" ? "Guardar nueva contraseña" : "Save new password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
