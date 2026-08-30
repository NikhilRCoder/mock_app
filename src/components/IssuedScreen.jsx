import Placeholder from "./Placeholder";
import LogoSlot from "./LogoSlot";
import { DOCS } from "../data";

export default function IssuedScreen({ onOpenDoc }) {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", background: "#f4f4f7", animation: "dlTab .3s ease both" }}>
      <div style={{ background: "#4c31ea", padding: "calc(20px + env(safe-area-inset-top)) 20px 22px", color: "#fff" }}>
        <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-.3px" }}>Issued Documents</div>
        <div style={{ marginTop: 6, fontSize: 14, opacity: .85 }}>{DOCS.length} documents in your locker</div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 104px" }}>
        {DOCS.map((doc, i) => (
          <div
            key={doc.id}
            className="dl-tap dl-issued-card"
            onClick={() => onOpenDoc(doc)}
            style={{
              background: "#fff",
              borderRadius: 14,
              padding: 16,
              marginBottom: 12,
              boxShadow: "0 3px 12px rgba(27,27,45,.07)",
              display: "flex",
              alignItems: "center",
              gap: 14,
              animation: `dlRise .4s ease ${i * 0.04}s both`,
            }}
          >
            <LogoSlot
              slotKey={`issuerLogo:${doc.id}`}
              alt={`${doc.title} issuer logo`}
              editSize={15}
              imgFit="contain"
              stripWhiteBg
              style={{ width: 52, height: 52, borderRadius: 9 }}
              fallback={<Placeholder label={"issuer\nlogo"} style={{ width: "100%", height: "100%", borderRadius: 9, font: "8px/1.2 ui-monospace, Menlo, monospace" }} />}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 17, fontWeight: 800 }}>{doc.title}</div>
              <div style={{ marginTop: 4, fontSize: 14, color: "#6c6b80", letterSpacing: ".3px" }}>{doc.sub}</div>
              <div style={{ marginTop: 4, fontSize: 12, color: "#8c8ba0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{doc.issuer}</div>
            </div>
            <span style={{ fontSize: 18, color: "#c3c2d2" }}>›</span>
          </div>
        ))}
      </div>
    </div>
  );
}
