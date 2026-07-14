import AicsMark from "./AicsMark";

// Corporate invoice: issuer name top-left, AICS mark top-right above the
// right-aligned contact block, "Invoice" heading, bank/applicant/meta block
// with Customer STN/NTN lines, bright-blue items table, Notes + totals panel
// and the payment-order bar. Single A4 page.
export default function CorporateInvoiceDocument({ data }) {
  const { issuer } = data;
  return (
    <section className="cinv-page">
      <div className="cinv-top">
        <div className="cinv-issuer-name">{issuer.name}</div>
        <div className="cinv-top-right">
          <AicsMark width={96} />
          <div className="cinv-issuer-contact">
            {issuer.addressLines.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
            <div>
              <strong>EMAIL :</strong> {issuer.email}
            </div>
            <div>
              <strong>Mobile :</strong> {issuer.mobile}
            </div>
            <div>
              <strong>NTN :</strong> {issuer.ntn}
            </div>
          </div>
        </div>
      </div>

      <h1 className="cinv-heading">Invoice</h1>

      <div className="cinv-info">
        <div className="cinv-info-bank">
          <div className="cinv-bold">
            {data.bankName} {data.bankContact}
          </div>
          {data.bankAddressLines.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
          <div className="cinv-bold cinv-stn">Customer STN</div>
          <div className="cinv-bold">Customer NTN</div>
        </div>
        <div className="cinv-info-applicant">
          <div>
            <strong>Applicant</strong> {data.applicant}
          </div>
          <div>
            <strong>LC No.</strong> {data.lcNo}
          </div>
        </div>
        <div className="cinv-info-meta">
          <div>
            <strong>Invoice No.</strong> {data.invoiceNo}
          </div>
          <div>
            <strong>Invoice Date</strong> {data.invoiceDate}
          </div>
        </div>
      </div>

      <table className="cinv-items">
        <colgroup>
          <col style={{ width: "42%" }} />
          <col style={{ width: "9%" }} />
          <col style={{ width: "9%" }} />
          <col style={{ width: "13%" }} />
          <col style={{ width: "9%" }} />
          <col style={{ width: "9%" }} />
          <col style={{ width: "9%" }} />
        </colgroup>
        <thead>
          <tr>
            <th className="cinv-th-left">Beneficiary</th>
            <th>Quantity</th>
            <th>
              Ex
              <br />
              Rate
            </th>
            <th>Amount</th>
            <th>
              Sale
              <br />
              Tax
              <br />
              Rate
            </th>
            <th>
              Sales
              <br />
              Tax
            </th>
            <th>RM</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item, i) => (
            <tr key={i}>
              <td className="cinv-td-left">{item.beneficiary}</td>
              <td>{item.quantity}</td>
              <td>{item.exRate}</td>
              <td>{item.amount}</td>
              <td>{item.taxRate}</td>
              <td>{item.salesTax}</td>
              <td>{item.rm}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="cinv-bottom">
        <div className="cinv-notes">Notes</div>
        <div className="cinv-totals">
          <div className="cinv-totals-row cinv-totals-total">
            <span>Total:</span>
            <span>{data.total}</span>
          </div>
          <div className="cinv-totals-row">
            <span>Paid Amount</span>
            <span>{data.paidAmount}</span>
          </div>
        </div>
      </div>

      <div className="cinv-paybar">{issuer.payTo}</div>

      <div className="cinv-pageno">Page 1</div>
    </section>
  );
}
