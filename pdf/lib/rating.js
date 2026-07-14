// Credit-rating band definitions and score → rating mapping.
// This single table drives the summary row, the gauge needle, the credit
// rating box and the "Rating Explanations" page, so every rendering of the
// rating stays consistent with the score coming from the data layer.

export const RATING_BANDS = [
  {
    code: "A+",
    risk: "Very Low Risk",
    min: 71,
    max: 100,
    scoreRange: "71–100",
    color: "#00B050",
    comments:
      "Business dealings permissible with high confidence. Strong financial condition, reliable payment record, solid operational history.",
  },
  {
    code: "A",
    risk: "Acceptable Risk",
    min: 51,
    max: 70,
    scoreRange: "51–70",
    color: "#92D050",
    comments:
      "Business dealings permissible with acceptable risk. Financial condition and payment records are reasonably satisfactory.",
  },
  {
    code: "B",
    risk: "Moderate Risk",
    min: 30,
    max: 50,
    scoreRange: "30–50",
    color: "#A9D08E",
    comments:
      "Suggests moderate financial condition, fair payment history, variable operations. Dealings permissible with regular monitoring.",
  },
  {
    code: "C+",
    risk: "Medium High Risk",
    min: 21,
    max: 29,
    scoreRange: "21–29",
    color: "#FFFF00",
    comments:
      "Business dealings permissible on secured terms. Financial instability or poor payment record likely.",
  },
  {
    code: "C",
    risk: "High Risk",
    min: 1,
    max: 20,
    scoreRange: "1–20",
    color: "#FFC000",
    comments:
      "Dealings not recommended. Severe financial issues or highly unstable operations.",
  },
  {
    code: "D",
    risk: "High Risk",
    scoreRange: "No Score",
    color: "#FF0000",
    comments:
      "Business dealings not recommended due to default, closure, dissolution, or dormancy.",
  },
  {
    code: "NB",
    risk: "-",
    scoreRange: "No Score",
    color: "#FF0000",
    comments:
      "No recommendation. Entity is new. Collateral may be required for credit.",
  },
  {
    code: "NR",
    risk: "High Risk",
    scoreRange: "No Score",
    color: "#FF0000",
    comments: "No credit rating available. Insufficient or missing data.",
  },
  {
    code: "NT",
    risk: "N/A",
    scoreRange: "No Score",
    color: "#FF0000",
    comments: "Business not traceable. Insufficient data.",
  },
];

const NO_RATING = RATING_BANDS.find((b) => b.code === "NR");

export function getRating(score) {
  if (typeof score !== "number" || Number.isNaN(score)) {
    return { ...NO_RATING, score: null, label: `${NO_RATING.code} (${NO_RATING.risk})` };
  }
  const band =
    RATING_BANDS.find(
      (b) => typeof b.min === "number" && score >= b.min && score <= b.max
    ) ?? NO_RATING;
  return { ...band, score, label: `${band.code} (${band.risk})` };
}

// Representative score used to position a gauge needle for a band as a whole
// (used by the small per-band gauges in the Rating Explanations table).
export function bandMidScore(band) {
  if (typeof band.min !== "number") return 5;
  return Math.round((band.min + band.max) / 2);
}

// The five gauge segments map onto the five scored bands, highest risk on the
// left: C, C+, B, A, A+. The needle position is therefore the band index plus
// the score's progress within that band — e.g. score 45 sits 75% through the
// middle (B) segment, tilting the needle just right of vertical.
const GAUGE_BAND_ORDER = ["C", "C+", "B", "A", "A+"];

export function gaugeFraction(score) {
  if (typeof score !== "number" || Number.isNaN(score)) return 0.04;
  const clamped = Math.max(1, Math.min(100, score));
  const band = RATING_BANDS.find(
    (b) => typeof b.min === "number" && clamped >= b.min && clamped <= b.max
  );
  if (!band) return 0.04;
  const index = GAUGE_BAND_ORDER.indexOf(band.code);
  const within = (clamped - band.min) / (band.max - band.min);
  return (index + within) / GAUGE_BAND_ORDER.length;
}
