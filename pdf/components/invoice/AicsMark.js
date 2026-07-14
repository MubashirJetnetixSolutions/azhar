// AICS swoosh mark used on both invoice letterheads, drawn as vector SVG.
export default function AicsMark({ width = 120 }) {
  return (
    <svg viewBox="0 0 120 62" width={width} height={(width * 62) / 120} aria-label="AICS">
      <ellipse cx="60" cy="31" rx="55" ry="24" fill="none" stroke="#1F9ED9" strokeWidth="3.2" />
      <path d="M8 38 C 34 56, 88 56, 114 30" fill="none" stroke="#1F4E9C" strokeWidth="4.4" strokeLinecap="round" />
      <path d="M6 26 C 32 6, 86 6, 114 24" fill="none" stroke="#2E9E4F" strokeWidth="3" strokeLinecap="round" />
      <text x="60" y="39" textAnchor="middle" fontFamily="Arial, sans-serif" fontStyle="italic" fontWeight="bold" fontSize="24" fill="#1F4E9C">
        AICS
      </text>
    </svg>
  );
}
