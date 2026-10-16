import { useState } from "react";
import { getInitials } from "../avatar";
import LogoSlot from "./LogoSlot";
import AppMark from "./AppMark";
import { useEditMode } from "../editMode";
import { getAttempts, clearAttempts } from "../tracker";

// Purely presentational — the enclosing row owns the click, so the whole
// row (label included) is one tap target instead of two competing ones.
function Switch({ checked }) {
  return (
    <div
      role="switch"
      aria-checked={checked}
      style={{
        width: 46,
        height: 27,
        borderRadius: 14,
        background: checked ? "#22a25a" : "#d5d4e0",
        position: "relative",
        flex: "none",
        transition: "background .18s ease",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 2,
          left: checked ? 21 : 2,
          width: 23,
          height: 23,
          borderRadius: "50%",
          background: "#fff",
          boxShadow: "0 1px 3px rgba(0,0,0,.3)",
          transition: "left .18s ease",
        }}
      />
    </div>
  );
}

function AttemptsRow() {
  const [open, setOpen] = useState(false);
  const [attempts, setAttempts] = useState([]);

  function toggle() {
    if (!open) setAttempts(getAttempts());
    setOpen((v) => !v);
  }

  return (
    <div style={{ padding: "16px 18px", borderTop: "1px solid #f0eff5" }}>
      <div className="dl-tap" onClick={toggle} style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 22, height: 22, flex: "none", border: "1.2px dashed #c3c2d2", borderRadius: 6 }} />
        <div style={{ flex: 1, fontSize: 16, fontWeight: 600, color: "#1b1b22" }}>Password Attempts</div>
        <span style={{ fontSize: 17, color: "#c3c2d2" }}>{open ? "⌄" : "›"}</span>
      </div>
      {open && (
        <div style={{ marginTop: 12 }}>
          {attempts.length === 0 ? (
            <div style={{ fontSize: 13, color: "#8c8ba0" }}>No attempts recorded on this device yet.</div>
          ) : (
            <>
              <div style={{ maxHeight: 180, overflowY: "auto", display: "flex", flexDirection: "column", gap: 6 }}>
                {attempts.map((a, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: a.success ? "#22a25a" : "#c0392b" }}>
                    <span>{a.success ? "✓ Unlocked" : "✗ Wrong password"}</span>
                    <span style={{ color: "#8c8ba0" }}>{new Date(a.at).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div
                className="dl-tap"
                onClick={() => {
                  clearAttempts();
                  setAttempts([]);
                }}
                style={{ marginTop: 10, fontSize: 12, color: "#8c8ba0", textAlign: "center" }}
              >
                Clear log
              </div>
            </>
          )}
          <div style={{ marginTop: 8, fontSize: 11, color: "#a9a8ba" }}>
            Only shows attempts made on this device/browser — there's no server to collect them from elsewhere unless a tracker webhook is configured in the code.
          </div>
        </div>
      )}
    </div>
  );
}

export default function MenuScreen({ userName, onOpenProfile, menuRows, onLock }) {
  const { editMode, setEditMode } = useEditMode();

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", background: "#f4f4f7", animation: "dlTab .3s ease both" }}>
      <div style={{ background: "#4c31ea", padding: "calc(20px + env(safe-area-inset-top)) 20px 22px", color: "#fff", display: "flex", alignItems: "center", gap: 14 }}>
        <LogoSlot
          slotKey="profilePhoto"
          alt="Profile photo"
          className="dl-tap"
          onClick={onOpenProfile}
          editSize={16}
          style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(255,255,255,.22)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 800, letterSpacing: "-.02em" }}
          fallback={getInitials(userName)}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-.2px" }}>{userName}</div>
          <div className="dl-tap" onClick={onOpenProfile} style={{ marginTop: 3, fontSize: 14, opacity: .85 }}>View my profile ›</div>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 104px" }}>
        <div
          className="dl-tap"
          onClick={() => setEditMode((v) => !v)}
          style={{ background: "#fff", borderRadius: 14, padding: "14px 18px", marginBottom: 16, display: "flex", alignItems: "center", gap: 14, boxShadow: "0 3px 12px rgba(27,27,45,.06)" }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 16, fontWeight: 700 }}>Edit Mode</div>
            <div style={{ marginTop: 2, fontSize: 12, color: "#8c8ba0" }}>Show logo/photo upload and field edit controls</div>
          </div>
          <Switch checked={editMode} />
        </div>

        <div style={{ background: "#fff", borderRadius: 14, padding: "14px 18px", marginBottom: 16, display: "flex", alignItems: "center", gap: 14, boxShadow: "0 3px 12px rgba(27,27,45,.06)" }}>
          <LogoSlot
            slotKey="appIcon"
            alt="App icon"
            editSize={16}
            imgFit="cover"
            style={{ width: 44, height: 44, borderRadius: 12, background: "#ede9fc" }}
            fallback={<AppMark size={44} rx={12} />}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 16, fontWeight: 700 }}>App Icon</div>
            <div style={{ marginTop: 2, fontSize: 12, color: "#8c8ba0" }}>Browser tab and home screen icon</div>
          </div>
        </div>

        <div style={{ background: "#fff", borderRadius: 14, overflow: "hidden", marginBottom: 16, boxShadow: "0 3px 12px rgba(27,27,45,.06)" }}>
          <div
            className="dl-tap dl-menu-row"
            onClick={onLock}
            style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 18px" }}
          >
            <div style={{ width: 22, height: 22, flex: "none", border: "1.2px dashed #c3c2d2", borderRadius: 6 }} />
            <div style={{ flex: 1, fontSize: 16, fontWeight: 600, color: "#1b1b22" }}>Lock App Now</div>
            <span style={{ fontSize: 17, color: "#c3c2d2" }}>›</span>
          </div>
          <AttemptsRow />
        </div>

        <div style={{ background: "#fff", borderRadius: 14, overflow: "hidden", boxShadow: "0 3px 12px rgba(27,27,45,.06)" }}>
          {menuRows.map((m) => (
            <div
              key={m.label}
              className="dl-tap dl-menu-row"
              onClick={m.onTap}
              style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 18px", borderTop: "1px solid #f0eff5" }}
            >
              <div style={{ width: 22, height: 22, flex: "none", border: "1.2px dashed #c3c2d2", borderRadius: 6 }} />
              <div style={{ flex: 1, fontSize: 16, fontWeight: 600, color: m.color }}>{m.label}</div>
              <span style={{ fontSize: 17, color: "#c3c2d2" }}>›</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 18, textAlign: "center", font: "11px/1.4 ui-monospace, Menlo, monospace", color: "#a9a8ba" }}>
          prototype build · v0.3
        </div>
      </div>
    </div>
  );
}
