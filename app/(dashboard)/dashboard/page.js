"use client";

import { dashboardStats, recentOrders } from "@/data/mockData";

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function StatCard({ label, value }) {
  return (
    <div style={{
      backgroundColor: "#1a1a1a",
      border: "1px solid #252525",
      borderRadius: "10px",
      padding: "14px 16px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <p style={{ color: "#666", fontSize: "11px", fontWeight: 400 }}>{label}</p>
        <div style={{ backgroundColor: "#222", border: "1px solid #2a2a2a", borderRadius: "6px", padding: "5px", color: "#3a3a3a", display: "flex" }}>
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
      </div>
      <p style={{ color: "#fff", fontSize: "22px", fontWeight: 700, letterSpacing: "-0.02em", marginTop: "8px" }}>{value}</p>
    </div>
  );
}

function BarChart({ data }) {
  const max = Math.max(...data);
  return (
    <div style={{ backgroundColor: "#1a1a1a", border: "1px solid #252525", borderRadius: "10px", padding: "16px 18px", height: "100%", display: "flex", flexDirection: "column" }}>
      <p style={{ color: "#666", fontSize: "11px", marginBottom: "14px" }}>Reports per month</p>
      <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: "5px", minHeight: 0 }}>
        {data.map((v, i) => (
          <div key={i} style={{
            flex: 1,
            borderRadius: "3px 3px 0 0",
            height: `${Math.max((v / max) * 100, 8)}%`,
            backgroundColor: i === 9 ? "#3b82f6" : "#2a2a2a",
          }} />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
        {months.map(m => <span key={m} style={{ color: "#2e2e2e", fontSize: "8px" }}>{m}</span>)}
      </div>
    </div>
  );
}

function DonutChart({ percentage }) {
  const r = 40;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percentage / 100) * circ;
  return (
    <div style={{ backgroundColor: "#1a1a1a", border: "1px solid #252525", borderRadius: "10px", padding: "16px 18px", height: "100%", display: "flex", flexDirection: "column" }}>
      <p style={{ color: "#666", fontSize: "11px", marginBottom: "10px" }}>Reports Conversion</p>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px", minHeight: 0 }}>
        <div style={{ position: "relative", width: "100px", height: "100px", flexShrink: 0 }}>
          <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
            <circle cx="50" cy="50" r={r} fill="none" stroke="#252525" strokeWidth="12" />
            <circle cx="50" cy="50" r={r} fill="none" stroke="#3b82f6" strokeWidth="12"
              strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "14px", fontWeight: 700, color: "#fff" }}>{percentage}%</span>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "4px", width: "100%", textAlign: "center" }}>
          {[["Requests","168"],["Reports Generated","100"],["Availability","100"]].map(([lbl,val]) => (
            <div key={lbl}>
              <p style={{ color: "#3a3a3a", fontSize: "8px", lineHeight: 1.3, marginBottom: "3px" }}>{lbl}</p>
              <p style={{ color: "#fff", fontSize: "16px", fontWeight: 700 }}>{val}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const AVL_STYLE = {
  Online:  { color: "#22c55e" },
  Start:   { color: "#3b82f6" },
  Reuse:   { color: "#a855f7" },
  Send:    { color: "#f97316" },
  Recall:  { color: "#ef4444" },
  Review:  { color: "#888" },
  Offline: { color: "#ef4444" },
};

const ROW_ACTIONS = ["Review","Start","Reuse","Online","Send","Review"];

export default function DashboardPage() {
  const s = dashboardStats;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

      {/* Welcome row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ color: "#fff", fontSize: "20px", fontWeight: 700, letterSpacing: "-0.01em" }}>Welcome, Azhar</h1>
          <p style={{ color: "#555", fontSize: "12px", marginTop: "3px" }}>Review and manage your analytics here.</p>
        </div>
        <select style={{ backgroundColor: "#1a1a1a", border: "1px solid #252525", borderRadius: "8px", color: "#666", fontSize: "12px", padding: "6px 14px", outline: "none", cursor: "pointer" }}>
          <option>Daily</option><option>Weekly</option><option>Monthly</option>
        </select>
      </div>

      {/* ONE ROW: stats (left 2 cols) + bar chart + donut — all same height */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 2.3fr 1.15fr",
        gridTemplateRows: "1fr 1fr",
        gap: "10px",
        height: "210px",
      }}>
        {/* stat row 1 */}
        <StatCard label="Total Orders" value={s.totalOrders} />
        <StatCard label="Total Reports" value={s.totalReports} />
        {/* bar chart spans both rows, explicitly in col 3 */}
        <div style={{ gridColumn: "3", gridRow: "1 / 3" }}>
          <BarChart data={s.monthlyReports} />
        </div>
        {/* donut spans both rows, explicitly in col 4 */}
        <div style={{ gridColumn: "4", gridRow: "1 / 3" }}>
          <DonutChart percentage={s.reportsConversion} />
        </div>
        {/* stat row 2 */}
        <StatCard label="Total Pending Invoice" value={s.totalPendingInvoice} />
        <StatCard label="Total Revenue" value={s.totalRevenue} />
      </div>

      {/* Recent Orders */}
      <div style={{ backgroundColor: "#1a1a1a", border: "1px solid #252525", borderRadius: "10px", padding: "20px 22px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "16px" }}>
          <div>
            <h2 style={{ color: "#fff", fontSize: "13px", fontWeight: 600 }}>Recent Orders</h2>
            <p style={{ color: "#555", fontSize: "11px", marginTop: "3px" }}>Review and update your most recent orders.</p>
          </div>
          <div style={{ position: "relative" }}>
            <svg style={{ position: "absolute", left: "9px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="#444" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input placeholder="Find Orders" style={{ paddingLeft: "28px", paddingRight: "12px", paddingTop: "7px", paddingBottom: "7px", backgroundColor: "#111", border: "1px solid #252525", borderRadius: "7px", color: "#fff", fontSize: "12px", outline: "none", width: "170px" }} />
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "860px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #1e1e1e" }}>
                {["Order Number","Company","Country","Bank","Request Date","Start Time","Availability","Actions"].map(h => (
                  <th key={h} style={{ textAlign: "left", padding: "0 14px 10px 0", color: "#3a3a3a", fontSize: "11px", fontWeight: 500, letterSpacing: "0.02em", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o, i) => {
                const action = ROW_ACTIONS[i] || "Review";
                const avlStyle = AVL_STYLE[action] || AVL_STYLE.Review;
                return (
                  <tr key={i} style={{ borderBottom: "1px solid #1d1d1d" }}>
                    <td style={{ padding: "12px 14px 12px 0", color: "#555", fontSize: "12px" }}>{o.id}</td>
                    <td style={{ padding: "12px 14px 12px 0", color: "#ddd", fontSize: "12px", maxWidth: "180px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{o.company}</td>
                    <td style={{ padding: "12px 14px 12px 0", color: "#666", fontSize: "12px", whiteSpace: "nowrap" }}>{o.country}</td>
                    <td style={{ padding: "12px 14px 12px 0" }}>
                      <div style={{ color: "#bbb", fontSize: "12px" }}>{o.bank}</div>
                      <div style={{ color: "#3a3a3a", fontSize: "10px", marginTop: "1px" }}>{o.branch}</div>
                    </td>
                    <td style={{ padding: "12px 14px 12px 0", color: "#666", fontSize: "12px", whiteSpace: "nowrap" }}>{o.requestDate}</td>
                    <td style={{ padding: "12px 14px 12px 0" }}>
                      <div style={{ color: "#777", fontSize: "12px" }}>{o.startTime}</div>
                      <div style={{ color: "#3a3a3a", fontSize: "10px", marginTop: "1px" }}>{o.requestDate}</div>
                    </td>
                    <td style={{ padding: "12px 14px 12px 0" }}>
                      <span style={{ ...avlStyle, fontSize: "12px", fontWeight: 500 }}>{action}</span>
                    </td>
                    <td style={{ padding: "12px 0" }}>
                      <button style={{ fontSize: "11px", fontWeight: 500, padding: "4px 12px", borderRadius: "6px", cursor: "pointer", backgroundColor: "transparent", border: "1px solid #2a2a2a", color: "#777" }}>
                        Review
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
