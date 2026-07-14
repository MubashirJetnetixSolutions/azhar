import { CORPORATE_RATING_BANDS, RISK_GRID } from "../../lib/corporateRating";

function OwnerBullets({ owners, withPct = true }) {
  return (
    <ul className="crp-bullets">
      {owners.map((o, i) => (
        <li key={i}>
          <span className="crp-owner-name">{o.name}</span>
          {withPct && o.pct && <span className="crp-owner-pct">{o.pct}</span>}
        </li>
      ))}
    </ul>
  );
}

/* ─── Cover table + summary ─── */

export function CoverSection({ data }) {
  return (
    <>
      <table className="crp-table crp-cover-table">
        <colgroup>
          <col style={{ width: "36%" }} />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <td className="crp-label">Bank</td>
            <td>{data.bankLine}</td>
          </tr>
          <tr>
            <td className="crp-label">Report Date</td>
            <td>{data.reportDate}</td>
          </tr>
          <tr>
            <td className="crp-label">Report Name</td>
            <td>{data.reportName}</td>
          </tr>
          <tr>
            <td className="crp-label">Ref No/ LC No/ Applicant</td>
            <td>{data.refApplicant}</td>
          </tr>
          <tr>
            <td className="crp-label">Credit Rating / Score</td>
            <td>{data.rating.label}</td>
          </tr>
          <tr>
            <td className="crp-label">UBO</td>
            <td>
              <OwnerBullets owners={data.ubo} />
            </td>
          </tr>
        </tbody>
      </table>

      <table className="crp-table crp-summary-table">
        <colgroup>
          <col style={{ width: "36%" }} />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <td className="crp-label" colSpan={2}>
              &nbsp;SUMMARY
            </td>
          </tr>
          <tr>
            <td className="crp-label">Given Name:</td>
            <td>{data.givenName}</td>
          </tr>
          <tr>
            <td className="crp-label">Business Name</td>
            <td>{data.businessName}</td>
          </tr>
          <tr>
            <td className="crp-label">Address:</td>
            <td>{data.address}</td>
          </tr>
          <tr>
            <td className="crp-label">Country</td>
            <td>{data.country}</td>
          </tr>
          <tr>
            <td className="crp-label">Company Registration number</td>
            <td>{data.comRegNo}</td>
          </tr>
          <tr>
            <td className="crp-label">Main Activity/Main Commodity</td>
            <td>{data.mainActivity}</td>
          </tr>
          <tr>
            <td className="crp-label">Proposed Credit Limit / Line with Currency</td>
            <td>{data.creditLimitText}</td>
          </tr>
          <tr>
            <td className="crp-label">
              Credit Rating / Score Description (also mention proposed rating i.e. High Risk, Low Risk,
            </td>
            <td>{data.rating.label}</td>
          </tr>
          <tr>
            <td className="crp-label">UBO</td>
            <td>
              <OwnerBullets owners={data.ubo} />
            </td>
          </tr>
          <tr>
            <td className="crp-label">SHARE HOLDER NAMES AND/OR PERCENTAGES.</td>
            <td>
              <OwnerBullets owners={data.ubo} />
            </td>
          </tr>
          <tr>
            <td className="crp-label">Directors And Management</td>
            <td>
              <OwnerBullets owners={data.directors} withPct={false} />
            </td>
          </tr>
          <tr>
            <td className="crp-label">Financials year</td>
            <td>{data.financialYear}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

/* ─── Boxed centered heading (IDENTIFICATION, RATING & COMMENTS, …) ─── */

export function BoxedHeading({ children }) {
  return (
    <div className="crp-boxed-heading">
      <span>{children}</span>
    </div>
  );
}

/* ─── Identification ─── */

export function IdentificationSection({ data }) {
  const rows = [
    ["Registered Name:", data.businessName],
    ["Business Name:", data.businessName],
    data.machineTranslatedName && ["Machine translated as:", data.machineTranslatedName],
    data.localName && [`${data.localNameLabel}:`, data.localName],
    ["Registered Office:", data.address],
    ["Previous address:", data.previousAddress],
    ["Country:", data.country],
    ["Date of Incorporation:", data.incorporationDate],
    ["Com. Reg. No:", data.comRegNo],
    data.unifiedCode && ["Unified Social Credit Code:", data.unifiedCode],
    ["Legal Form:", data.legalForm],
    ["Line of Business:", data.mainActivity],
    ["No. of Employees:", data.employees],
    ["Financial year:", data.financialYear],
    ["Revenue:", data.revenue],
    ["Credit Limit", data.creditLimitText],
  ].filter(Boolean);

  return (
    <>
      <BoxedHeading>IDENTIFICATION</BoxedHeading>
      <table className="crp-table crp-ident-table">
        <colgroup>
          <col style={{ width: "30%" }} />
          <col />
        </colgroup>
        <tbody>
          {rows.map(([label, value], i) => (
            <tr key={i} className={i > 0 ? "crp-ident-gap" : undefined}>
              <td className="crp-label">{label}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

/* ─── Rating & comments ─── */

export function RatingSection({ data }) {
  return (
    <>
      <BoxedHeading>RATING &amp; COMMENTS</BoxedHeading>

      <table className="crp-table crp-rating-bar">
        <colgroup>
          <col style={{ width: "30%" }} />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <td className="crp-label crp-rating-bar-label">Rating:</td>
            <td className="crp-rating-bar-value">{data.rating.code}</td>
          </tr>
        </tbody>
      </table>

      <table className="crp-risk-grid">
        <tbody>
          {RISK_GRID.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  style={cell ? { backgroundColor: cell.color, color: cell.textColor } : undefined}
                >
                  {cell?.text ?? ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <table className="crp-table crp-rating-table">
        <colgroup>
          <col style={{ width: "17%" }} />
          <col style={{ width: "21%" }} />
          <col />
        </colgroup>
        <tbody>
          <tr className="crp-navy-head">
            <td>Rating</td>
            <td>Explanation</td>
            <td>Rating Comments</td>
          </tr>
          <tr style={{ backgroundColor: data.rating.color, color: data.rating.textColor }}>
            <td>{data.rating.code}</td>
            <td>{data.rating.risk}</td>
            <td>{data.rating.comments}</td>
          </tr>
        </tbody>
      </table>

      <table className="crp-table crp-status-table">
        <colgroup>
          <col style={{ width: "30%" }} />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <td className="crp-label">Status:</td>
            <td>{data.rating.comments}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

/* ─── Executive summary (colon-aligned list) ─── */

export function ExecutiveSummarySection({ data }) {
  const rows = [
    ["REGISTRATION NO.", data.comRegNo],
    ["ORGANIZATION CODE", data.organizationCode],
    data.unifiedCode && ["UNIFIED SOCIAL CREDIT CODE", data.unifiedCode],
    ["COMPANY NAME", data.businessName.toUpperCase()],
    data.localName && [`${data.localNameLabel.toUpperCase()}`, data.localName],
    ["INCORPORATION DATE", data.incorporationDate],
    ["COMPANY STATUS", "ACTIVE"],
    ["LEGAL FORM", data.legalForm.toUpperCase()],
    ["REGISTERED ADDRESS", data.address.toUpperCase()],
    ["BUSINESS ADDRESS", data.address.toUpperCase()],
    ["TEL.NO.", data.tel],
    ["EMAIL", data.email],
    ["REGISTRATION AUTHORITY", data.registrationAuthority],
    ["REGISTERED CAPITAL", data.registeredCapital],
    ["PAID-IN CAPITAL", data.paidInCapital],
    ["STAFF STRENGTH", data.employees.toUpperCase()],
    ["PRINCIPAL ACTIVITY", data.mainActivity.toUpperCase()],
    ["BANKER (S)", data.banker],
    ["LITIGATION", data.litigation],
    ["FINANCIAL CONDITION", data.financialCondition],
    ["MANAGEMENT CAPABILITY", data.managementCapability],
    ["COMMERCIAL RISK", data.commercialRisk],
  ].filter(Boolean);

  return (
    <>
      <h3 className="crp-heading">EXECUTIVE SUMMARY</h3>
      <table className="crp-exec-table">
        <colgroup>
          <col style={{ width: "27%" }} />
          <col style={{ width: "3%" }} />
          <col />
        </colgroup>
        <tbody>
          {rows.map(([label, value], i) => (
            <tr key={i}>
              <td>{label}</td>
              <td>:</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

/* ─── History / background + activity codes ─── */

export function HistorySection({ data }) {
  return (
    <>
      <h3 className="crp-heading">HISTORY / BACKGROUND</h3>
      <p className="crp-paragraph crp-indent">
        The Subject <strong>{data.businessName}</strong> Is located at <strong>{data.address}.</strong>{" "}
        {data.mainActivity}
      </p>
      <p className="crp-subheading">The activity codes are the following for the subject.</p>
      <ul className="crp-bullets crp-bullets-loose">
        {data.activityCodes.map((code, i) => (
          <li key={i}>{code}</li>
        ))}
      </ul>
    </>
  );
}

/* ─── People sections (directors / UBO / shareholders) ─── */

function PersonEntry({ rows }) {
  return (
    <table className="crp-exec-table crp-person">
      <colgroup>
        <col style={{ width: "30%" }} />
        <col style={{ width: "3%" }} />
        <col />
      </colgroup>
      <tbody>
        {rows.map(([label, value], i) => (
          <tr key={i}>
            <td>{label}</td>
            <td>{label ? ":" : ""}</td>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function DirectorsSection({ data }) {
  return (
    <>
      <h3 className="crp-heading">DIRECTOR/ MANAGEMENT</h3>
      {data.directors.map((d, i) => (
        <PersonEntry
          key={i}
          rows={[
            ["Name Of Subject", d.name],
            ...(d.localName ? [["", d.localName]] : []),
            ["Position", d.position],
          ]}
        />
      ))}
    </>
  );
}

export function OwnershipSection({ data, title }) {
  return (
    <>
      <h3 className="crp-heading">{title}</h3>
      {data.ubo.map((o, i) => (
        <PersonEntry
          key={i}
          rows={[
            ["Name Of Subject", o.name],
            ...(o.localName ? [["", o.localName]] : []),
            ["% of shares", o.pct],
            ["Subscribed capital contribution", o.contribution],
          ]}
        />
      ))}
    </>
  );
}

/* ─── Change log ─── */

export function ChangeLogSection({ data }) {
  if (!data.changeLog.length) return null;
  return (
    <>
      <h3 className="crp-heading">CHANGE LOG</h3>
      <table className="crp-changelog">
        <colgroup>
          <col style={{ width: "15%" }} />
          <col style={{ width: "25%" }} />
          <col style={{ width: "30%" }} />
          <col style={{ width: "30%" }} />
        </colgroup>
        <tbody>
          <tr className="crp-changelog-head">
            <td>CHANGE DATE</td>
            <td>CHANGE PROJECT</td>
            <td>BEFORE THE CHANGE</td>
            <td>AFTER THE CHANGE</td>
          </tr>
          {data.changeLog.map((c, i) => (
            <tr key={i}>
              <td className="crp-changelog-date">{c.date}</td>
              <td>{c.project}</td>
              <td>{c.before}</td>
              <td>{c.after}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

/* ─── Trade + financial analysis + economic overview ─── */

export function TradeSection({ data }) {
  return (
    <>
      <h3 className="crp-heading">CUSTOMER/ SUPPLIER</h3>
      <ul className="crp-bullets crp-bullets-loose">
        {data.customersSuppliers.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>

      <h3 className="crp-heading">IMPORT AND EXPORT COUNTRIES</h3>
      <ul className="crp-bullets crp-bullets-loose">
        {data.importExportCountries.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>

      <h3 className="crp-heading">FINANCIAL ANALYSIS</h3>
      <p className="crp-paragraph crp-indent">
        The said subject is not obliged to make its accounts public due to the lack of a clear government policy
        regarding the transparency of enterprise financial information, and no financial information was released by
        the company or submitted by outside sources. Hence., no financial information available for this said subject.
      </p>
    </>
  );
}

export function EconomicOverviewSection({ data }) {
  return (
    <>
      <BoxedHeading>{data.country.toUpperCase()}- ECONOMIC OVERVIEW</BoxedHeading>
      <p className="crp-paragraph crp-justify">{data.economicOverview}</p>
    </>
  );
}

/* ─── Rating explanations + closing ─── */

export function RatingExplanationsSection() {
  return (
    <>
      <BoxedHeading>RATING EXPLANATIONS</BoxedHeading>
      <table className="crp-table crp-explain-table">
        <colgroup>
          <col style={{ width: "17%" }} />
          <col style={{ width: "21%" }} />
          <col />
        </colgroup>
        <tbody>
          <tr className="crp-navy-head">
            <td>Rating</td>
            <td>Explanation</td>
            <td>Rating Comments</td>
          </tr>
          {CORPORATE_RATING_BANDS.map((band) => (
            <tr key={band.code} style={{ backgroundColor: band.color, color: band.textColor }}>
              <td>{band.code}</td>
              <td>{band.risk}</td>
              <td>{band.comments}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="crp-paragraph">
        NB is stated where there is insufficient information to facilitate rating. However, it is not to be considered
        as unfavourable.
      </p>
      <p className="crp-paragraph">
        This rating serves as a reference to assess SC&rsquo;s credit risk and to set the amount of credit to be
        extended. It is calculated from a composite of weighted scores obtained from each of the major sections of
        this report. The assessed factors are as follows:
      </p>
      <ul className="crp-bullets crp-bullets-red">
        <li>Financial condition covering various ratios</li>
        <li>Company background and operations size</li>
        <li>Promoters / Management background</li>
        <li>Payment record</li>
        <li>Litigation against the subject</li>
        <li>Industry scenario / competitor analysis</li>
        <li>Supplier / Customer / Banker review (wherever available)</li>
      </ul>
      <div className="crp-end">*** END OF THIS REPORT ***</div>
    </>
  );
}
