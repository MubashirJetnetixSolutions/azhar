const MONTH_NAMES = {
  JAN: "January",
  FEB: "February",
  MAR: "March",
  APR: "April",
  MAY: "May",
  JUN: "June",
  JUL: "July",
  AUG: "August",
  SEP: "September",
  OCT: "October",
  NOV: "November",
  DEC: "December",
};

// "26 MAR 2026" -> "26-March-26" (report-cover date style).
export function formatReportDate(dateStr) {
  if (!dateStr) return "";
  const parts = String(dateStr).trim().split(/\s+/);
  if (parts.length !== 3) return dateStr;
  const [day, mon, year] = parts;
  const month = MONTH_NAMES[mon.toUpperCase()];
  if (!month) return dateStr;
  return `${day}-${month}-${year.slice(-2)}`;
}

export function formatMoney(amount, currency) {
  if (typeof amount !== "number") return "Not available";
  return `${amount.toLocaleString("en-US")} ${currency ?? ""}`.trim();
}

// "PKR 40,000" -> 40000
export function parseAmount(amountStr) {
  const digits = String(amountStr ?? "").replace(/[^\d.]/g, "");
  const value = Number(digits);
  return Number.isFinite(value) ? value : 0;
}

// 6000 -> "6,000.00"
export function formatDecimal(value) {
  return Number(value ?? 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// "26 MAR 2026" -> "26/03/2026"
export function formatSlashDate(dateStr) {
  const months = { JAN: "01", FEB: "02", MAR: "03", APR: "04", MAY: "05", JUN: "06", JUL: "07", AUG: "08", SEP: "09", OCT: "10", NOV: "11", DEC: "12" };
  const parts = String(dateStr ?? "").trim().split(/\s+/);
  if (parts.length !== 3) return dateStr ?? "";
  const month = months[parts[1].toUpperCase()];
  if (!month) return dateStr;
  return `${parts[0].padStart(2, "0")}/${month}/${parts[2]}`;
}
