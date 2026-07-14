import {
  reports,
  companies,
  banks,
  orders,
  creditReports,
  countryEconomicOverviews,
} from "@/data/mockData";
import { getRating } from "./rating";
import { formatReportDate, formatMoney } from "./format";

const PAYMENT_HABITS = [
  { key: "prompt", label: "Prompt 0–30 Days" },
  { key: "good", label: "Good 31–60 Days" },
  { key: "average", label: "Average 61–90 Days" },
  { key: "fair", label: "Fair 91–120 Days" },
  { key: "poor", label: "Poor >120 Days" },
];

const NOT_AVAILABLE = "Not available from official sources";

// Assembles everything the PDF template renders for one report row by joining
// the existing datasets. No report content is defined here or in the template
// components — values come from the data layer or graceful fallbacks.
export function buildReportData(reportIndex) {
  const report = reports[reportIndex];
  if (!report) return null;

  const company = companies.find((c) => c.name === report.company) ?? null;
  const bank = banks.find((b) => b.bankCode === report.bank) ?? null;
  const order = orders.find((o) => o.id === report.orderNumber) ?? null;
  const profile = creditReports[report.company] ?? {};

  const rating = getRating(profile.creditScore);
  const creditLimitText =
    typeof profile.creditLimit === "number"
      ? formatMoney(profile.creditLimit, profile.creditCurrency)
      : NOT_AVAILABLE;

  const registeredName = company?.name ?? report.company;
  const registration = company?.registration ?? NOT_AVAILABLE;

  return {
    // Cover block
    bankLine: bank ? `${bank.name} ${report.branch ?? ""}`.trim() : report.bank,
    reportDate: formatReportDate(report.date),
    reportName: report.company.toUpperCase(),
    applicant: profile.applicant ?? order?.name ?? report.orderNumber ?? "",
    rating,
    creditLimitText,

    // Summary
    givenName: report.company.toUpperCase(),
    registeredName,
    givenAddress: profile.givenAddress ?? NOT_AVAILABLE,
    address: profile.tradingAddress ?? profile.givenAddress ?? NOT_AVAILABLE,
    country: report.country,
    ubo: profile.ubo ?? NOT_AVAILABLE,
    comRegNo: registration,
    mainActivity: profile.mainActivity ?? NOT_AVAILABLE,

    // Comprehensive overview
    businessNames: [registeredName, flipName(registeredName)],
    registrationNumber: registration,
    businessNumber: profile.businessNumber ?? NOT_AVAILABLE,
    founded: profile.founded ?? NOT_AVAILABLE,
    legalForm: profile.legalForm ?? NOT_AVAILABLE,
    companyStatus: profile.companyStatus ?? NOT_AVAILABLE,
    turnover: profile.turnover ?? NOT_AVAILABLE,

    // Contact information
    registeredAddress: profile.registeredAddress ?? NOT_AVAILABLE,
    website: profile.website ?? NOT_AVAILABLE,
    phone: profile.phone ?? NOT_AVAILABLE,
    email: profile.email ?? NOT_AVAILABLE,
    tradingAddress: profile.tradingAddress ?? NOT_AVAILABLE,

    // Payment habit checkboxes
    paymentHabits: PAYMENT_HABITS.map((h) => ({
      ...h,
      checked: h.key === profile.paymentHabit,
    })),

    // Ownership & structure
    shareholders: profile.shareholders ?? [],
    shareholdersNote: profile.shareholdersNote ?? NOT_AVAILABLE,
    directors: profile.directors ?? [],
    activities: profile.activities ?? [],
    employees: profile.employees ?? [],
    parentCompany: profile.parentCompany ?? null,
    groupStructure: profile.groupStructure ?? [],

    // Trade
    customersSuppliers: profile.customersSuppliers ?? [],
    importExportCountries: profile.importExportCountries ?? [],
    trademarks: profile.trademarks ?? [registeredName],

    economicOverview:
      countryEconomicOverviews[report.country] ??
      `No macroeconomic commentary is currently available for ${report.country}.`,
  };
}

// "PT Damai Karya Abadi" -> "Damai Karya Abadi, PT" style alternate name.
function flipName(name) {
  const words = String(name).split(" ");
  if (words.length < 2) return name;
  return `${words.slice(1).join(" ")}, ${words[0]}`;
}
