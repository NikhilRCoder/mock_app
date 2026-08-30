// Generic line-icon set for the DigiLocker Utility grid — original shapes,
// not any issuer's or government body's trademark.
export default function UtilityIcon({ label, size = 20, color = "#4c31ea" }) {
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  switch (label) {
    case "Authenticator":
      return (
        <svg {...props}>
          <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "Drive":
      return (
        <svg {...props}>
          <path d="M4 7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7z" />
        </svg>
      );
    case "Verifiable Credential":
      return (
        <svg {...props}>
          <circle cx="12" cy="9" r="5" />
          <path d="M9 13.5L7 21l5-3 5 3-2-7.5" />
        </svg>
      );
    case "Govt. Services":
      return (
        <svg {...props}>
          <path d="M4 10l8-5 8 5" />
          <path d="M5 10v8M9 10v8M15 10v8M19 10v8" />
          <path d="M3 20h18" />
        </svg>
      );
    case "Family Locker":
      return (
        <svg {...props}>
          <path d="M4 11l8-6 8 6" />
          <path d="M6 10.5V19a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-8.5" />
          <rect x="10" y="14" width="4" height="6" />
        </svg>
      );
    case "Verify Document":
      return (
        <svg {...props}>
          <path d="M7 3h7l4 4v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
}
