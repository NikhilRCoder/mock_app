export default function Toast({ message }) {
  if (!message) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: 20,
        right: 20,
        bottom: 104,
        zIndex: 80,
        background: "#1b1b22",
        color: "#fff",
        borderRadius: 12,
        padding: "13px 16px",
        fontSize: 14,
        fontWeight: 600,
        boxShadow: "0 8px 24px rgba(0,0,0,.25)",
        animation: "dlRise .26s ease both",
      }}
    >
      {message}
    </div>
  );
}
