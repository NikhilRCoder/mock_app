export default function StatusBar({ color = "#fff" }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "calc(50px + env(safe-area-inset-top))",
        zIndex: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "env(safe-area-inset-top) 22px 0 26px",
        boxSizing: "border-box",
        fontSize: 15,
        fontWeight: 700,
        letterSpacing: ".2px",
        pointerEvents: "none",
        color,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
        <span>5:43</span>
        <span style={{ fontSize: 11 }}>➤</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 11 }}>
          <i style={{ display: "block", width: 3, height: 4, background: "currentColor", borderRadius: 1 }} />
          <i style={{ display: "block", width: 3, height: 7, background: "currentColor", borderRadius: 1 }} />
          <i style={{ display: "block", width: 3, height: 10, background: "currentColor", opacity: .45, borderRadius: 1 }} />
        </span>
        <span style={{ fontSize: 12 }}>◕</span>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 26,
            height: 15,
            borderRadius: 4,
            background: "#fff",
            fontSize: 10,
            fontWeight: 800,
            padding: "0 3px",
            color: "#3f27d9",
          }}
        >
          93
        </span>
      </div>
    </div>
  );
}
