import { reports } from "@/data/mockData";
import { generateReportPdf } from "@/pdf/lib/generatePdf";

// Headless-browser PDF rendering needs more than the default serverless
// function timeout, especially on a cold start.
export const maxDuration = 60;

export async function GET(request, ctx) {
  const { reportId } = await ctx.params;
  const reportIndex = Number(reportId);
  const report = reports[reportIndex];
  if (!Number.isInteger(reportIndex) || !report) {
    return Response.json({ error: "Report not found" }, { status: 404 });
  }

  const origin = new URL(request.url).origin;

  let pdf;
  try {
    pdf = await generateReportPdf({ origin, reportIndex });
  } catch (err) {
    // Log the full stack so the real exception appears in Vercel Function Logs.
    console.error("[API /reports/pdf] PDF generation error:", err?.stack ?? err);
    return Response.json(
      // String(err) fallback: a thrown non-Error would otherwise leave
      // `detail` empty and the client toast generic.
      { error: "Failed to generate the report PDF.", detail: err?.message || String(err) },
      { status: 500 }
    );
  }

  const filename = `${report.company.replace(/[^\w\- ]+/g, "")} - Credit Report.pdf`;
  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
