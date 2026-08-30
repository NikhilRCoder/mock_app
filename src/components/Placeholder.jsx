// Dashed placeholder for a branded asset (app logo, government emblem, issuer
// logo, UMANG artwork, utility icons, profile photo) that isn't ours to draw.
// Swap the `children` for a real <img> once the asset file is available.
export default function Placeholder({ label, style, textStyle }) {
  return (
    <div
      style={{
        border: "1.4px dashed #c9c8d6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        font: "9px/1.2 ui-monospace, Menlo, monospace",
        color: "#8c8ba0",
        ...style,
      }}
    >
      <span style={{ whiteSpace: "pre-line", ...textStyle }}>{label}</span>
    </div>
  );
}
