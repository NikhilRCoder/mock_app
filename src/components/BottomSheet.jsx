import Placeholder from "./Placeholder";

export default function BottomSheet({ sheet, sheetDoc, onClose }) {
  if (!sheet) return null;

  const isVcard = sheet === "vcard";
  const title = isVcard ? "Your vCard" : sheetDoc?.title || "";
  const sub = isVcard ? "Share your verified identity by QR" : sheetDoc?.issuer || "";
  const placeholderText = isVcard ? "QR code\n(generated)" : "document preview\nPDF render";
  const primaryLabel = isVcard ? "Share vCard" : "Download PDF";

  return (
    <div
      onClick={onClose}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 70,
        background: "rgba(20,18,40,.42)",
        animation: "dlFade .22s ease both",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: "#fff", borderRadius: "20px 20px 0 0", padding: "10px 20px calc(34px + env(safe-area-inset-bottom))", animation: "dlUp .34s cubic-bezier(.22,1,.36,1) both" }}
      >
        <div style={{ width: 42, height: 4, borderRadius: 2, background: "#dcdbe6", margin: "4px auto 18px" }} />
        <div style={{ fontSize: 21, fontWeight: 800, letterSpacing: "-.2px" }}>{title}</div>
        <div style={{ marginTop: 6, fontSize: 14, color: "#6c6b80" }}>{sub}</div>
        <Placeholder
          label={placeholderText}
          style={{
            marginTop: 18,
            height: 180,
            borderRadius: 12,
            font: "11px/1.4 ui-monospace, Menlo, monospace",
            background: "linear-gradient(100deg,#f7f6fa 30%,#eeedf5 50%,#f7f6fa 70%)",
            backgroundSize: "400px 100%",
            animation: "dlShine 1.6s linear infinite",
          }}
        />
        <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
          <div
            className="dl-tap dl-sheet-primary"
            style={{ flex: 1, textAlign: "center", padding: 14, borderRadius: 26, background: "#4c31ea", color: "#fff", fontSize: 15, fontWeight: 800 }}
          >
            {primaryLabel}
          </div>
          <div
            className="dl-tap"
            onClick={onClose}
            style={{ flex: "none", padding: "14px 22px", borderRadius: 26, border: "1px solid #d5d4e0", color: "#4b4a5c", fontSize: 15, fontWeight: 700 }}
          >
            Close
          </div>
        </div>
      </div>
    </div>
  );
}
