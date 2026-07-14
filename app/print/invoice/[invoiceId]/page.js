import { notFound } from "next/navigation";
import { invoices } from "@/data/mockData";
import SmeInvoiceDocument from "@/pdf/components/invoice/SmeInvoiceDocument";
import CorporateInvoiceDocument from "@/pdf/components/invoice/CorporateInvoiceDocument";
import { buildInvoiceData } from "@/pdf/lib/invoiceData";
import "@/pdf/styles/invoice.css";

export const metadata = {
  title: "Invoice",
};

// Print view for invoice PDFs; the template is selected by the invoice type,
// mirroring the report print route.
export default async function PrintInvoicePage({ params }) {
  const { invoiceId } = await params;
  const invoiceIndex = Number(invoiceId);
  const invoice = invoices[invoiceIndex];
  if (!invoice) notFound();

  const data = buildInvoiceData(invoiceIndex);
  return invoice.type === "Corporate" ? (
    <CorporateInvoiceDocument data={data} />
  ) : (
    <SmeInvoiceDocument data={data} />
  );
}
