import { useState } from "react";
import AppMark from "./AppMark";
import { verifyPassword } from "../passwordAuth";
import { logAttempt } from "../tracker";

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
        background: "linear-gradient(160deg,#5b3ff5 0%,#4c31ea 42%,#3f27d9 100%)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 22,
        padding: "0 32px",
      }}
    >
      <AppMark size={88} rx={18} />
      <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-.3px" }}>DigiLocker</div>
      <form onSubmit={submit} style={{ width: "100%", maxWidth: 280, display: "flex", flexDirection: "column", gap: 12 }}>
        <input
          type="password"
          autoFocus
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError(false);
          }}
          placeholder="Enter password"
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "13px 16px",
            borderRadius: 14,
            border: error ? "1.5px solid #ff8a80" : "1.5px solid rgba(255,255,255,.3)",
            background: "rgba(255,255,255,.12)",
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
            color: "#4c31ea",
            fontSize: 15,
            fontWeight: 800,
            cursor: "pointer",
          }}
        >
          {checking ? "Checking…" : "Unlock"}
        </button>
        {error && (
          <div style={{ textAlign: "center", fontSize: 13, color: "#ffcdd2" }}>Wrong password — try again</div>
        )}
      </form>
    </div>
  );
}
