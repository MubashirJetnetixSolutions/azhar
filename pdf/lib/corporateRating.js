// Rating scheme used by the Corporate report template. It is a different
// scale from the SMEs report (letter grades instead of numeric scores), so it
// gets its own band table. One table drives the cover line, the risk grid,
// the rating/status rows and the "Rating Explanations" section.

export const CORPORATE_RATING_BANDS = [
  {
    code: "A++",
    risk: "Minimum Risk",
    color: "#92D050",
    textColor: "#000",
    comments: "Business dealings permissible with minimum risk of default",
  },
  {
    code: "A+",
    risk: "Low Risk",
    color: "#92D050",
    textColor: "#000",
    comments: "Business dealings permissible with low risk of default",
  },
  {
    code: "A",
    risk: "Acceptable Risk",
    color: "#92D050",
    textColor: "#000",
    comments: "Business dealings permissible with moderate risk of default",
  },
  {
    code: "B",
    risk: "Medium Risk",
    color: "#00B0F0",
    textColor: "#000",
    comments: "Business dealings permissible on a regular monitoring basis",
  },
  {
    code: "C",
    risk: "High Risk",
    color: "#FF0000",
    textColor: "#fff",
    comments: "Business dealings on secured terms only",
  },
  {
    code: "D",
    risk: "Deceased",
    color: "#FF0000",
    textColor: "#fff",
    comments: "Deceased / Closed Down / Dissolved / Dormant. Business dealings not recommended",
  },
  {
    code: "NB",
    risk: "New Business",
    color: "#FF0000",
    textColor: "#fff",
    comments: "No recommendation can be done due to business in infancy stage",
  },
  {
    code: "NT",
    risk: "No Trace",
    color: "#FF0000",
    textColor: "#fff",
    comments: "No recommendation can be done as the business is not traceable",
  },
];

const NO_TRACE = CORPORATE_RATING_BANDS.find((b) => b.code === "NT");

export function getCorporateRating(code) {
  const band = CORPORATE_RATING_BANDS.find((b) => b.code === code) ?? NO_TRACE;
  return { ...band, label: `${band.code} (${band.risk})` };
}

// Layout of the 3×4 risk-level grid shown under "Rating:" — column 1 is the
// green (safe) group, column 2 the medium group, column 3 the red group.
export const RISK_GRID = [
  [
    { text: "Minimum Risk", color: "#92D050", textColor: "#000" },
    { text: "Medium Risk", color: "#00B0F0", textColor: "#000" },
    { text: "High Risk", color: "#FF0000", textColor: "#fff" },
  ],
  [
    { text: "Low Risk", color: "#92D050", textColor: "#000" },
    null,
    { text: "Deceased", color: "#FF0000", textColor: "#fff" },
  ],
  [
    { text: "Acceptable Risk", color: "#92D050", textColor: "#000" },
    null,
    { text: "New Business", color: "#FF0000", textColor: "#fff" },
  ],
  [
    { text: "", color: "#92D050", textColor: "#000" },
    null,
    { text: "No Trace", color: "#FF0000", textColor: "#fff" },
  ],
];
