const TABS = [
  { id: "home", label: "Home", glyph: "▦" },
  { id: "search", label: "Search", glyph: "⌕" },
  { id: "issued", label: "Issued", glyph: "◎" },
  { id: "menu", label: "Menu", glyph: "☰" },
];

export default function TabBar({ activeTab, onTap }) {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 30,
        background: "#fff",
        borderTop: "1px solid #e7e6ee",
        padding: "9px 0 calc(22px + env(safe-area-inset-bottom))",
        display: "flex",
        alignItems: "flex-start",
      }}
    >
      <div style={{ flex: 1, display: "flex", justifyContent: "space-around", alignItems: "flex-start" }}>
        {TABS.map((t) => {
          const color = activeTab === t.id ? "#4c31ea" : "#1b1b22";
          return (
            <div
              key={t.id}
              className="dl-tap dl-tab-btn"
              onClick={() => onTap(t.id)}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, minWidth: 44, padding: "2px 4px" }}
            >
              <div style={{ fontSize: 19, lineHeight: 1, color }}>{t.glyph}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color }}>{t.label}</div>
            </div>
          );
        })}
      </div>
      <div
        className="dl-tap dl-umang-tab"
        style={{ flex: "none", width: 78, height: 44, marginRight: -6, borderRadius: "24px 0 0 24px", background: "#ef7521", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800 }}
      >
        UMANG
      </div>
    </div>
  );
}
