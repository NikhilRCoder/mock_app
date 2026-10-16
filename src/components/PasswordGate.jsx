import { useState } from "react";
import { verifyPassword } from "../passwordAuth";
import { logAttempt } from "../tracker";

// Deliberately generic — no app name, logo, or brand color here. Anyone who
// hits this screen before unlocking shouldn't be able to tell what's behind
// it.
export default function PasswordGate({ onUnlock }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(false);

  async function submit(e) {
    e.preventDefault();
    if (!value || checking) return;
    setChecking(true);
    const ok = await verifyPassword(value);
    logAttempt(ok);
    setChecking(false);
    if (ok) {
      onUnlock();
    } else {
      setError(true);
      setValue("");
    }
  }

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "#1b1b22",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 22,
        padding: "0 32px",
      }}
    >
      <div style={{ fontSize: 34, opacity: .55 }}>🔒</div>
      <form onSubmit={submit} style={{ width: "100%", maxWidth: 280, display: "flex", flexDirection: "column", gap: 12 }}>
        <input
          type="password"
          autoFocus
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError(false);
          }}
          placeholder="Password"
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "13px 16px",
            borderRadius: 14,
            border: error ? "1.5px solid #ff8a80" : "1.5px solid rgba(255,255,255,.2)",
            background: "rgba(255,255,255,.08)",
            color: "#fff",
            fontSize: 16,
            outline: "none",
          }}
        />
        <button
          type="submit"
          disabled={checking}
          style={{
            width: "100%",
            padding: 14,
            borderRadius: 26,
            border: "none",
            background: "#fff",
            color: "#1b1b22",
            fontSize: 15,
            fontWeight: 800,
            cursor: "pointer",
          }}
        >
          {checking ? "Checking…" : "Continue"}
        </button>
        {error && (
          <div style={{ textAlign: "center", fontSize: 13, color: "#ffcdd2" }}>Incorrect — try again</div>
        )}
      </form>
    </div>
  );
}
