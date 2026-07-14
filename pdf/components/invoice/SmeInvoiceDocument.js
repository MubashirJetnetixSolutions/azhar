import AicsMark from "./AicsMark";

// SMEs invoice: AICS mark top-left, issuer block right, NTN line, three-column
// bank/applicant/invoice-meta block, royal-blue items table, grey totals panel
// and the blue payment-order bar. Single A4 page.
export default function SmeInvoiceDocument({ data }) {
  const { issuer } = data;
  return (
    <section className="sinv-page">
      <div className="sinv-top">
        <AicsMark width={128} />
        <div className="sinv-issuer">
          <div className="sinv-issuer-name">{issuer.name}</div>
          {issuer.addressLines.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
          <div>
            <strong>Phone :</strong> {issuer.phone}
          </div>
        </div>
      </div>

      <div className="sinv-ntn">NTN : {issuer.ntn}</div>

      <div className="sinv-info">
        <div className="sinv-info-bank">
          <div className="sinv-bold">
            {data.bankName} {data.bankContact}
          </div>
          {data.bankAddressLines.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
        <div className="sinv-info-applicant">
          <div>
            <strong>Applicant</strong> {data.applicant}
          </div>
          <div>
            <strong>LC No</strong> {data.lcNo}
          </div>
        </div>
        <div className="sinv-info-meta">
          <div>
            <strong>Invoice No :</strong> {data.invoiceNo}
          </div>
          <div>
            <strong>Invoice Date :</strong> {data.invoiceDate}
          </div>
          <div>
            <strong>Due Date :</strong> {data.dueDate}
          </div>
        </div>
      </div>

      <table className="sinv-items">
        <colgroup>
          <col style={{ width: "7%" }} />
          <col style={{ width: "29%" }} />
          <col style={{ width: "9%" }} />
          <col style={{ width: "10%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "10%" }} />
          <col style={{ width: "10%" }} />
          <col style={{ width: "10%" }} />
        </colgroup>
        <thead>
          <tr>
            <th className="sinv-th-left">SrNo</th>
            <th className="sinv-th-left">Beneficiery</th>
            <th>USD</th>
            <th>Ex. Rate</th>
            <th>Amount</th>
            <th>
              Sales Tax
              <br />
              Rate
            </th>
            <th>Sales Tax</th>
            <th>RM</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item, i) => (
            <tr key={i}>
              <td className="sinv-td-left">{i + 1}</td>
              <td className="sinv-td-left">{item.beneficiary}</td>
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

      <div className="sinv-totals">
        <div className="sinv-totals-row">
          <span>Sub Total:</span>
          <span>{data.subTotal}</span>
        </div>
        <div className="sinv-totals-row sinv-totals-total">
          <span>Total:</span>
          <span>{data.total}</span>
        </div>
        <div className="sinv-totals-row">
          <span>Paid Amount</span>
          <span>{data.paidAmount}</span>
        </div>
      </div>

      <div className="sinv-paybar">{issuer.payTo}</div>

      <div className="sinv-pageno">Page 1</div>
    </section>
  );
}
