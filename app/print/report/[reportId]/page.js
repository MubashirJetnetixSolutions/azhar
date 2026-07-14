import { notFound } from "next/navigation";
import { reports } from "@/data/mockData";
import ReportDocument from "@/pdf/components/ReportDocument";
import CorporateDocument from "@/pdf/components/corporate/CorporateDocument";
import { buildReportData } from "@/pdf/lib/reportData";
import { buildCorporateReportData } from "@/pdf/lib/corporateReportData";
import "@/pdf/styles/report.css";
import "@/pdf/styles/corporate.css";

export const metadata = {
  title: "Credit Report",
};

// Print view consumed by the PDF generator (and previewable in a browser).
// Lives outside the (dashboard) group so it renders without app chrome.
// The template is selected by the report's type: Corporate reports use the
// flowing corporate template, everything else the fixed-page SMEs template.
export default async function PrintReportPage({ params }) {
  const { reportId } = await params;
  const reportIndex = Number(reportId);
  const report = reports[reportIndex];
  if (!report) notFound();

  if (report.type === "Corporate") {
    const data = buildCorporateReportData(reportIndex);
    return <CorporateDocument data={data} />;
  }

  const data = buildReportData(reportIndex);
  return <ReportDocument data={data} />;
}
