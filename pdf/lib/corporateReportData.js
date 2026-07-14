import {
  reports,
  companies,
  banks,
  orders,
  corporateReports,
  countryEconomicOverviews,
} from "@/data/mockData";
import { getCorporateRating } from "./corporateRating";
import { formatMoney } from "./format";

const NOT_AVAILABLE = "N/A";

// "26 MAR 2026" -> "26-03-2026" (corporate cover date style).
function formatCorporateDate(dateStr) {
  if (!dateStr) return "";
  const months = { JAN: "01", FEB: "02", MAR: "03", APR: "04", MAY: "05", JUN: "06", JUL: "07", AUG: "08", SEP: "09", OCT: "10", NOV: "11", DEC: "12" };
  const parts = String(dateStr).trim().split(/\s+/);
  if (parts.length !== 3) return dateStr;
  const month = months[parts[1].toUpperCase()];
  if (!month) return dateStr;
  return `${parts[0].padStart(2, "0")}-${month}-${parts[2]}`;
}

// Assembles the Corporate report model for one report row by joining the
// existing datasets, mirroring the SMEs builder but for the corporate
// template's very different section structure.
export function buildCorporateReportData(reportIndex) {
  const report = reports[reportIndex];
  if (!report) return null;

  const company = companies.find((c) => c.name === report.company) ?? null;
  const bank = banks.find((b) => b.bankCode === report.bank) ?? null;
  const order = orders.find((o) => o.id === report.orderNumber) ?? null;
  const profile = corporateReports[report.company] ?? {};

  const rating = getCorporateRating(profile.ratingCode);
  const creditLimitText =
    typeof profile.creditLimit === "number"
      ? formatMoney(profile.creditLimit, profile.creditCurrency)
      : NOT_AVAILABLE;
  const comRegNo = company?.registration ?? NOT_AVAILABLE;
  const ubo = profile.ubo ?? [];

  return {
    // Cover block
    bankLine: bank ? `${bank.name} ${report.branch ?? ""}`.trim() : report.bank,
    reportDate: formatCorporateDate(report.date),
    reportName: report.company,
    refApplicant: [profile.refNo ?? report.orderNumber, profile.applicant ?? order?.name]
      .filter(Boolean)
      .join("/ "),
    rating,
    ubo,
    creditLimitText,

    // Summary
    givenName: report.company,
    businessName: profile.businessName ?? report.company,
    address: profile.address ?? NOT_AVAILABLE,
    country: report.country,
    comRegNo,
    mainActivity: profile.lineOfBusiness ?? NOT_AVAILABLE,
    directors: profile.directors ?? [],
    financialYear: profile.financialYear ?? NOT_AVAILABLE,

    // Identification
    machineTranslatedName: profile.machineTranslatedName ?? null,
    localNameLabel: profile.localNameLabel ?? "Local name",
    localName: profile.localName ?? null,
    previousAddress: profile.previousAddress ?? NOT_AVAILABLE,
    incorporationDate: profile.incorporationDate ?? NOT_AVAILABLE,
    unifiedCode: profile.unifiedCode ?? null,
    legalForm: profile.legalForm ?? NOT_AVAILABLE,
    employees: profile.employees ?? NOT_AVAILABLE,
    revenue: profile.revenue ?? NOT_AVAILABLE,

    // Executive summary
    organizationCode: profile.organizationCode ?? NOT_AVAILABLE,
    tel: profile.tel ?? NOT_AVAILABLE,
    email: profile.email ?? NOT_AVAILABLE,
    registrationAuthority: profile.registrationAuthority ?? NOT_AVAILABLE,
    registeredCapital: profile.registeredCapital ?? NOT_AVAILABLE,
    paidInCapital: profile.paidInCapital ?? NOT_AVAILABLE,
    banker: profile.banker ?? "NOT DIVULGE",
    litigation: profile.litigation ?? NOT_AVAILABLE,
    financialCondition: profile.financialCondition ?? NOT_AVAILABLE,
    managementCapability: profile.managementCapability ?? NOT_AVAILABLE,
    commercialRisk: profile.commercialRisk ?? NOT_AVAILABLE,

    // History / trade / changes
    activityCodes: profile.activityCodes ?? [],
    changeLog: profile.changeLog ?? [],
    customersSuppliers: profile.customersSuppliers ?? [],
    importExportCountries: profile.importExportCountries ?? [],

    economicOverview:
      countryEconomicOverviews[report.country] ??
      `No macroeconomic commentary is currently available for ${report.country}.`,
  };
}
