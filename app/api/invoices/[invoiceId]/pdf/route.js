import { invoices } from "@/data/mockData";
import { generateInvoicePdf } from "@/pdf/lib/generatePdf";

// Headless-browser PDF rendering needs more than the default serverless
// function timeout, especially on a cold start.
export const maxDuration = 60;

export async function GET(request, ctx) {
  const { invoiceId } = await ctx.params;
  const invoiceIndex = Number(invoiceId);
  const invoice = invoices[invoiceIndex];
  if (!Number.isInteger(invoiceIndex) || !invoice) {
    return Response.json({ error: "Invoice not found" }, { status: 404 });
  }

  const origin = new URL(request.url).origin;

  let pdf;
  try {
    pdf = await generateInvoicePdf({ origin, invoiceIndex });
  } catch (err) {
    // Log the full stack so the real exception appears in Vercel Function Logs.
    console.error("[API /invoices/pdf] PDF generation error:", err?.stack ?? err);
    return Response.json(
      // String(err) fallback: a thrown non-Error would otherwise leave
      // `detail` empty and the client toast generic.
      { error: "Failed to generate the invoice PDF.", detail: err?.message || String(err) },
      { status: 500 }
    );
  }

  const filename = `Invoice ${invoice.invoiceNo ?? invoiceIndex} - ${invoice.company.replace(/[^\w\- ]+/g, "")}.pdf`;
  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
