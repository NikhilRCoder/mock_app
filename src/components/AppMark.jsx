// Original document+checkmark mark for this app — not a reproduction of any
// government emblem or the real DigiLocker logo.
export default function AppMark({ size = 40, background = "#fff", glyph = "#4c31ea", rx = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <rect width="100" height="100" rx={rx} fill={background} />
      <g stroke={glyph} strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect x="28" y="18" width="44" height="60" rx="6" />
        <line x1="36" y1="32" x2="64" y2="32" />
        <line x1="36" y1="44" x2="64" y2="44" opacity=".7" />
        <line x1="36" y1="56" x2="52" y2="56" opacity=".5" />
      </g>
      <circle cx="68" cy="72" r="15" fill={glyph} />
      <path d="M61 72l4.5 4.5 9-9" stroke={background} strokeWidth="5.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
