import { getInitials } from "../avatar";
import LogoSlot from "./LogoSlot";

export default function MenuScreen({ userName, onOpenProfile, menuRows }) {
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
