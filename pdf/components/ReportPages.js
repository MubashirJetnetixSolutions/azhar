import GaugeChart from "../charts/GaugeChart";
import SectionBar from "./SectionBar";
import { RATING_BANDS, bandMidScore } from "../lib/rating";

function KVTable({ rows, labelWidth = "33%", className = "" }) {
  return (
    <table className={`rpt-table ${className}`}>
      <colgroup>
        <col style={{ width: labelWidth }} />
        <col />
      </colgroup>
      <tbody>
        {rows.map(([label, value], i) => (
          <tr key={i}>
            <td className="rpt-label">{label}</td>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Bullets({ items }) {
  return (
    <ul className="rpt-bullets">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

/* ─── Page 1: cover tables + summary + rating table header ─── */

export function PageCover({ data }) {
  return (
    <>
      <KVTable
        className="rpt-cover-table"
        labelWidth="32%"
        rows={[
          ["Bank", data.bankLine],
          ["Report Date", data.reportDate],
          ["Report Name", data.reportName],
          ["Ref No/ LC No/ Applicant", data.applicant],
          ["Credit Rating / Score", data.rating.label],
          ["UBO", data.ubo],
        ]}
      />

      <table className="rpt-table rpt-summary-table">
        <colgroup>
          <col style={{ width: "33%" }} />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <td className="rpt-label" colSpan={2}>SUMMARY</td>
          </tr>
          {[
            ["Given Name:", data.givenName],
            ["Registered Name:", data.registeredName],
            ["Given Address:", data.givenAddress],
            ["Address:", data.address],
            ["Country:", data.country],
            ["Ultimate Beneficiary Ownership:", data.ubo],
            ["Com. Reg. No:", data.comRegNo],
            ["Main Activity:", data.mainActivity],
            ["International score", data.rating.label],
            ["Proposed Credit Limit/Line with Currency", data.creditLimitText],
          ].map(([label, value], i) => (
            <tr key={i}>
              <td className="rpt-label">{label}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <RatingTableHead data={data} />
    </>
  );
}

function RatingTableHead({ data }) {
  return (
    <table className="rpt-table rpt-rating-strip">
      <tbody>
        <tr className="rpt-navy-row">
          <td colSpan={3}>
            <sup>(ID)</sup>
            {data.registeredName}
          </td>
          <td colSpan={2} className="rpt-navy-right">
            Company Number: {data.registrationNumber}
          </td>
        </tr>
        <tr className="rpt-cols-head">
          <td>Rating</td>
          <td>Credit Score</td>
          <td>Credit Limit</td>
          <td>Status</td>
          <td>Graph</td>
        </tr>
      </tbody>
    </table>
  );
}

/* ─── Page 2: rating values row + overview + contact + payment habit ─── */

export function PageOverview({ data }) {
  return (
    <>
      <table className="rpt-table rpt-rating-strip">
        <tbody>
          <tr className="rpt-rating-values">
            <td>{data.rating.label}</td>
            <td>{data.rating.score ?? "No Score"}</td>
            <td>{data.creditLimitText}</td>
            <td>{data.companyStatus.includes("Active") ? "Active" : data.companyStatus}</td>
            <td className="rpt-gauge-cell">
              <GaugeChart score={data.rating.score} width={56} />
            </td>
          </tr>
        </tbody>
      </table>

      <div className="rpt-strip" />

      <SectionBar icon="overview">Comprehensive Overview</SectionBar>
      <KVTable
        labelWidth="38%"
        rows={[
          ["Registered Company Name", data.registeredName],
          [
            "Business name",
            <span key="names">
              {data.businessNames.map((n, i) => (
                <span key={i}>
                  {n}
                  {i < data.businessNames.length - 1 && <br />}
                </span>
              ))}
            </span>,
          ],
          ["Registration Number", data.registrationNumber],
          ["Business Number", data.businessNumber],
          ["found", data.founded],
          ["Legal Form", data.legalForm],
          ["Principal Activity", data.mainActivity],
          ["Company Status", data.companyStatus],
          ["Turnover/revenue", data.turnover],
        ]}
      />

      <SectionBar>Contact Information</SectionBar>
      <KVTable
        labelWidth="38%"
        rows={[
          ["Registered Address", data.registeredAddress],
          ["Website", data.website],
          ["Phone Number", data.phone],
          ["Email", data.email],
          ["Business/trading address", data.tradingAddress],
        ]}
      />

      <SectionBar>Overall, Payment Habit</SectionBar>
      <table className="rpt-table rpt-habit-table">
        <tbody>
          <tr>
            {data.paymentHabits.slice(0, 3).map((h) => (
              <HabitCell key={h.key} habit={h} />
            ))}
          </tr>
          <tr>
            {data.paymentHabits.slice(3).map((h) => (
              <HabitCell key={h.key} habit={h} />
            ))}
            <td className="rpt-label" />
            <td />
          </tr>
        </tbody>
      </table>

      <div className="rpt-strip" />

      <SectionBar>Rating, Score and Comments</SectionBar>
    </>
  );
}

function HabitCell({ habit }) {
  return (
    <>
      <td className="rpt-label rpt-habit-label">{habit.label}</td>
      <td className="rpt-habit-box">{habit.checked ? "[ X ]" : "[  ]"}</td>
    </>
  );
}

/* ─── Page 3: rating box + gauge + explanations + shareholders ─── */

export function PageRating({ data }) {
  return (
    <>
      <div className="rpt-rating-box">
        <div className="rpt-rating-box-head">
          <div>
            <span className="rpt-rating-head-label">Credit Rating:&nbsp;&nbsp;</span>
            <span className="rpt-rating-head-value">{data.rating.label}</span>
          </div>
          <div className="rpt-score-cell">Credit Score: {data.rating.score ?? "No Score"}</div>
        </div>
        <div className="rpt-rating-box-body">
          <GaugeChart score={data.rating.score} width={230} />
          <div className="rpt-rating-box-label">{data.rating.label}</div>
        </div>
        <div className="rpt-rating-box-limit">
          <span className="rpt-label-inline">CREDIT LIMIT:</span> {data.creditLimitText}
        </div>
      </div>

      <SectionBar>Rating Explanations</SectionBar>
      <table className="rpt-table rpt-explain-table">
        <colgroup>
          <col style={{ width: "7%" }} />
          <col style={{ width: "9%" }} />
          <col style={{ width: "13%" }} />
          <col style={{ width: "9%" }} />
          <col />
          <col style={{ width: "10%" }} />
        </colgroup>
        <tbody>
          <tr className="rpt-cols-head">
            <td>Rating</td>
            <td>Rating colors</td>
            <td>Risk Level</td>
            <td>Score Range</td>
            <td>Rating Comments</td>
            <td>GRAPH</td>
          </tr>
          {RATING_BANDS.map((band) => (
            <tr key={band.code}>
              <td>{band.code}</td>
              <td style={{ backgroundColor: band.color }} />
              <td>{band.risk}</td>
              <td>{band.scoreRange === "No Score" ? "No Score" : band.scoreRange}</td>
              <td className="rpt-comments">{band.comments}</td>
              <td className="rpt-gauge-cell">
                <GaugeChart score={typeof band.min === "number" ? bandMidScore(band) : null} width={40} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <SectionBar>Shareholders Information</SectionBar>
      <table className="rpt-table">
        <tbody>
          <tr>
            <td className="rpt-mini-head">NAME</td>
          </tr>
          {data.shareholders.map((s, i) => (
            <tr key={i}>
              <td>{s}</td>
            </tr>
          ))}
          <tr>
            <td>{data.shareholdersNote}</td>
          </tr>
        </tbody>
      </table>

      <div className="rpt-strip" />

      <SectionBar icon="people">Ultimate Beneficiary Ownership (UBO)</SectionBar>
    </>
  );
}

/* ─── Page 4: UBO + directors + financials + activities + structure ─── */

export function PageOwnership({ data }) {
  return (
    <>
      <table className="rpt-table">
        <tbody>
          <tr>
            <td className="rpt-mini-head">Beneficiary Name</td>
          </tr>
          <tr>
            <td>{data.ubo}</td>
          </tr>
        </tbody>
      </table>

      <SectionBar>Current Directors/Officers</SectionBar>
      <table className="rpt-table">
        <colgroup>
          <col style={{ width: "50%" }} />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <td className="rpt-label">Name</td>
            <td className="rpt-label">Position</td>
          </tr>
          {data.directors.map((d, i) => (
            <tr key={i}>
              <td>{d.name}</td>
              <td>{d.position}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <SectionBar icon="chart">Financials</SectionBar>
      <p className="rpt-paragraph">
        The entity is not required to disclose its financial records publicly, and no financial information has been
        disclosed by the entity, citing reasons of confidentiality or obtained from external sources. As a result, there
        is no financial information accessible for this entity.
      </p>

      <SectionBar>Activities</SectionBar>
      <div className="rpt-boxed">
        <Bullets items={data.activities} />
      </div>

      <SectionBar icon="people">Employee Information</SectionBar>
      <table className="rpt-table rpt-borderless">
        <colgroup>
          <col style={{ width: "50%" }} />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <td className="rpt-label">Year</td>
            <td className="rpt-label">Number of Employees</td>
          </tr>
          {data.employees.map((e, i) => (
            <tr key={i}>
              <td className="rpt-label">{e.year}</td>
              <td>{e.range}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {data.parentCompany && (
        <>
          <SectionBar>Parent company</SectionBar>
          <table className="rpt-table">
            <colgroup>
              <col style={{ width: "50%" }} />
              <col />
            </colgroup>
            <tbody>
              <tr>
                <td className="rpt-mini-head">NAME</td>
                <td>address</td>
              </tr>
              <tr>
                <td>{data.parentCompany.name}</td>
                <td>{data.parentCompany.address}</td>
              </tr>
            </tbody>
          </table>
        </>
      )}

      <SectionBar>Group Structure</SectionBar>
      <table className="rpt-table">
        <tbody>
          <tr>
            <td className="rpt-mini-head">NAME</td>
          </tr>
          <tr>
            <td>
              <Bullets items={data.groupStructure} />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

/* ─── Page 5: trade + trademarks + economic overview ─── */

export function PageTrade({ data }) {
  return (
    <>
      <SectionBar icon="handshake">Customers And Suppliers</SectionBar>
      <div className="rpt-boxed">
        <Bullets items={data.customersSuppliers} />
      </div>

      <SectionBar icon="arrows">Import And Export Countries</SectionBar>
      <div className="rpt-boxed">
        <Bullets items={data.importExportCountries} />
      </div>

      <SectionBar icon="trademark">Trademarks</SectionBar>
      <div className="rpt-boxed">
        <ul className="rpt-bullets">
          {data.trademarks.map((t, i) => (
            <li key={i}>
              <span className="rpt-trademark">
                <svg viewBox="0 0 16 16" width="12" height="12">
                  <path d="M2 12 C 4 6, 8 3, 14 3 C 10 5, 8 8, 7 12 z" fill="#F5821F" />
                  <path d="M4 13 C 6 9, 9 7, 13 6 C 10 8, 8 10, 7 13 z" fill="#E2231A" />
                </svg>
                {t}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <SectionBar>{data.country} Economic Overview</SectionBar>
      <div className="rpt-boxed rpt-overview-text">{data.economicOverview}</div>

      <div className="rpt-end">*** END OF REPORT ***</div>
    </>
  );
}
