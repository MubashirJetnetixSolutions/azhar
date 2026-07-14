// Speedometer-style gauge rendered as inline SVG. Because Chromium prints SVG
// as vector data, the chart stays razor-sharp at any zoom level in the final
// PDF (no rasterisation step, so it can never appear blurry or stretched).
// The needle position is computed from the live credit score every render.

import { gaugeFraction } from "../lib/rating";

// Left → right: C, C+, B, A, A+ band colours.
const SEGMENT_COLORS = ["#E2231A", "#F5821F", "#F7D842", "#97CA45", "#2FA84F"];
const SEGMENTS = 5;
const GAP_DEG = 5;

function polar(cx, cy, r, deg) {
  const rad = (deg * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy - r * Math.sin(rad)];
}

function arcPath(cx, cy, r, startDeg, endDeg) {
  const [x1, y1] = polar(cx, cy, r, startDeg);
  const [x2, y2] = polar(cx, cy, r, endDeg);
  return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
}

export default function GaugeChart({ score, width = 240, ...svgProps }) {
  const cx = 120;
  const cy = 112;
  const r = 82;
  const stroke = 27;
  const span = 180 / SEGMENTS;
  const halfGap = GAP_DEG / 2;

  // Flat (butt) caps cut each segment on the radial line, so only the inner
  // gap edges are trimmed — the two outer ends stay flush with the baseline.
  const segments = Array.from({ length: SEGMENTS }, (_, i) => {
    const start = 180 - i * span - (i === 0 ? 0 : halfGap);
    const end = 180 - (i + 1) * span + (i === SEGMENTS - 1 ? 0 : halfGap);
    return { d: arcPath(cx, cy, r, start, end), color: SEGMENT_COLORS[i] };
  });

  // score 0 → far left (180°), score 100 → far right (0°).
  const angle = 180 - gaugeFraction(score) * 180;
  const hubR = 11;
  const [tipX, tipY] = polar(cx, cy, r - stroke / 2 - 2, angle);
  const [b1x, b1y] = polar(cx, cy, hubR * 0.82, angle + 90);
  const [b2x, b2y] = polar(cx, cy, hubR * 0.82, angle - 90);

  return (
    <svg
      viewBox="0 0 240 130"
      width={width}
      height={(width * 130) / 240}
      role="img"
      aria-label={`Credit score gauge${typeof score === "number" ? `: ${score}` : ""}`}
      {...svgProps}
    >
      {segments.map((seg, i) => (
        <path
          key={i}
          d={seg.d}
          fill="none"
          stroke={seg.color}
          strokeWidth={stroke}
          strokeLinecap="butt"
        />
      ))}
      <path
        d={`M ${b1x.toFixed(2)} ${b1y.toFixed(2)} L ${tipX.toFixed(2)} ${tipY.toFixed(2)} L ${b2x.toFixed(2)} ${b2y.toFixed(2)} Z`}
        fill="#33261D"
      />
      <circle cx={cx} cy={cy} r={hubR} fill="#33261D" />
    </svg>
  );
}
