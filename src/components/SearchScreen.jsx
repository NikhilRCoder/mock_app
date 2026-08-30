import Placeholder from "./Placeholder";
import { CATALOG } from "../data";

export default function SearchScreen({ query, onQueryChange, onOpenDoc }) {
  const q = query.trim().toLowerCase();
  const results = q
    ? CATALOG.filter((d) => (d.title + " " + d.issuer).toLowerCase().includes(q))
    : CATALOG.slice(0, 5);
  const resultLabel = q ? `${results.length} results` : "Popular documents";

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", background: "#f4f4f7", animation: "dlTab .3s ease both" }}>
      <div style={{ background: "#4c31ea", padding: "56px 20px 20px", color: "#fff" }}>
        <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-.3px" }}>Search</div>
        <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 10, background: "#fff", borderRadius: 14, padding: "0 14px", height: 48 }}>
          <span style={{ fontSize: 17, color: "#8c8ba0" }}>⌕</span>
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search issuers or documents"
            style={{ flex: 1, border: 0, outline: "none", fontSize: 16, color: "#1b1b22", background: "transparent" }}
          />
          <span className="dl-tap" onClick={() => onQueryChange("")} style={{ fontSize: 15, color: "#a9a8ba" }}>✕</span>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px 104px" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#8c8ba0", letterSpacing: ".4px", textTransform: "uppercase", margin: "6px 0 12px" }}>
          {resultLabel}
        </div>
        {results.map((r) => (
          <div
            key={r.id}
            className="dl-tap dl-search-row"
            onClick={() => onOpenDoc(r)}
            style={{ background: "#fff", borderRadius: 12, padding: "14px 16px", marginBottom: 10, display: "flex", alignItems: "center", gap: 14 }}
          >
            <Placeholder label="icon" style={{ width: 40, height: 40, flex: "none", border: "1.3px dashed #c9c8d6", borderRadius: 9, font: "8px/1 ui-monospace, Menlo, monospace" }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 16, fontWeight: 700 }}>{r.title}</div>
              <div style={{ marginTop: 3, fontSize: 13, color: "#6c6b80", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.issuer}</div>
            </div>
            <span style={{ fontSize: 17, color: "#c3c2d2" }}>›</span>
          </div>
        ))}
      </div>
    </div>
  );
}
