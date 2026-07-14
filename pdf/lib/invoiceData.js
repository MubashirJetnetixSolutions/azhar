import { invoices, banks, invoiceIssuers } from "@/data/mockData";
import { parseAmount, formatDecimal, formatSlashDate } from "./format";

// Assembles everything either invoice template renders for one invoice row.
// Line-item maths follow the app's data: quantity 1 at the invoiced amount,
// zero-rated sales tax, and paid amount derived from the invoice status.
export function buildInvoiceData(invoiceIndex) {
  const invoice = invoices[invoiceIndex];
  if (!invoice) return null;

  const bank = banks.find((b) => b.bankCode === invoice.bank) ?? null;
  const issuer = invoiceIssuers[invoice.type] ?? invoiceIssuers.SMEs;

  const amount = parseAmount(invoice.amount);
  const quantity = 1;
  const exRate = amount / quantity;
  const taxRate = 0;
  const salesTax = amount * taxRate;
  const total = amount + salesTax;
  const paidAmount = invoice.status === "Paid" ? total : 0;

  return {
    type: invoice.type,
    issuer,

    // Bill-to block
    bankName: bank?.name ?? invoice.bank,
    bankContact: invoice.bankContact ?? "",
    bankAddressLines: [
      `${invoice.branch}${bank ? ` ${bank.address}` : ""}`,
      "Pakistan",
    ],
    applicant: invoice.applicant ?? "",
    lcNo: invoice.lcNo ?? "",

    invoiceNo: invoice.invoiceNo ?? String(invoiceIndex + 1),
    invoiceDate: formatSlashDate(invoice.creationDate),
    dueDate: formatSlashDate(invoice.dueDate),

    // Line items (one per invoice in the current data model)
    items: [
      {
        beneficiary: invoice.company,
        quantity,
        exRate,
        amount: formatDecimal(amount),
        taxRate: `${taxRate * 100}%`,
        salesTax: formatDecimal(salesTax),
        rm: formatDecimal(0),
      },
    ],

    subTotal: formatDecimal(amount),
    total: `Rs. ${formatDecimal(total)}`,
    paidAmount: formatDecimal(paidAmount),
  };
}
