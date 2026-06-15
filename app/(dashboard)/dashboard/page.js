"use client";

import { dashboardStats, recentOrders } from "@/data/mockData";
import StatusBadge from "@/components/ui/StatusBadge";

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function DocIcon() {
  return (
    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

function StatCard({ label, value }) {
  return (
    <div style={{ backgroundColor: "#161616", border: "1px solid #222", borderRadius: "14px", padding: "22px 24px", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "110px" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <p style={{ color: "#555", fontSize: "12px", fontWeight: 500 }}>{label}</p>
        <div style={{ backgroundColor: "#1e1e1e", border: "1px solid #2a2a2a", borderRadius: "8px", padding: "6px", color: "#444" }}>
          <DocIcon />
        </div>
      </div>
      <p style={{ color: "#ffffff", fontSize: "28px", fontWeight: 700, letterSpacing: "-0.02em", marginTop: "14px" }}>{value}</p>
    </div>
  );
}

function BarChart({ data }) {
  const max = Math.max(...data);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "120px" }}>
      {data.map((v, i) => (
        <div key={i} style={{
          flex: 1,
          borderRadius: "4px 4px 0 0",
          height: `${Math.max((v / max) * 100, 6)}%`,
          backgroundColor: i === 9 ? "#3b82f6" : "#252525",
        }} />
      ))}
    </div>
  );
}

function DonutChart({ percentage }) {
  const r = 42;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percentage / 100) * circ;
  return (
    <div style={{ position: "relative", width: "120px", height: "120px", flexShrink: 0 }}>
      <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
        <circle cx="50" cy="50" r={r} fill="none" stroke="#222" strokeWidth="12" />
        <circle cx="50" cy="50" r={r} fill="none" stroke="#3b82f6" strokeWidth="12"
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: "15px", fontWeight: 700, color: "#fff" }}>{percentage}%</span>
      </div>
    </div>
  );
}

const rowActions = ["Review","Start","Reuse","Online","Send","Review"];
const actionStyle = {
  Review: { backgroundColor: "transparent", border: "1px solid #2a2a2a", color: "#666" },
  Start:  { backgroundColor: "#3b82f6", border: "none", color: "#fff" },
  Online: { backgroundColor: "transparent", border: "none", color: "#22c55e" },
  Reuse:  { backgroundColor: "transparent", border: "1px solid #2a2a2a", color: "#666" },
  Send:   { backgroundColor: "#3b82f6", border: "none", color: "#fff" },
};

export default function DashboardPage() {
  const s = dashboardStats;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ color: "#fff", fontSize: "22px", fontWeight: 700, letterSpacing: "-0.02em" }}>Welcome, Azhar</h1>
          <p style={{ color: "#444", fontSize: "13px", marginTop: "4px" }}>Review and manage your analytics here.</p>
        </div>
        <select style={{ backgroundColor: "#161616", border: "1px solid #222", borderRadius: "8px", color: "#666", fontSize: "13px", padding: "7px 14px", outline: "none", cursor: "pointer" }}>
          <option>Daily</option><option>Weekly</option><option>Monthly</option>
        </select>
      </div>

      {/* 2×2 Stat Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
        <StatCard label="Total Orders" value={s.totalOrders} />
        <StatCard label="Total Reports" value={s.totalReports} />
        <StatCard label="Total Pending Invoice" value={s.totalPendingInvoice} />
        <StatCard label="Total Revenue" value={s.totalRevenue} />
      </div>

      {/* Charts Row: bar 2/3 + donut 1/3 */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "14px" }}>
        <div style={{ backgroundColor: "#161616", border: "1px solid #222", borderRadius: "14px", padding: "24px" }}>
          <p style={{ color: "#666", fontSize: "12px", fontWeight: 500, marginBottom: "20px" }}>Reports per month</p>
          <BarChart data={s.monthlyReports} />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
            {months.map(m => <span key={m} style={{ color: "#333", fontSize: "9px" }}>{m}</span>)}
          </div>
        </div>
        <div style={{ backgroundColor: "#161616", border: "1px solid #222", borderRadius: "14px", padding: "24px", display: "flex", flexDirection: "column" }}>
          <p style={{ color: "#666", fontSize: "12px", fontWeight: 500, marginBottom: "20px" }}>Reports Conversion</p>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "20px" }}>
            <DonutChart percentage={s.reportsConversion} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "6px", width: "100%", textAlign: "center" }}>
              {[{ label: "Requests", val: "168" },{ label: "Reports Generated", val: "100" },{ label: "Availability", val: "100" }].map((item) => (
                <div key={item.label}>
                  <p style={{ color: "#444", fontSize: "9px", lineHeight: 1.3, marginBottom: "3px" }}>{item.label}</p>
                  <p style={{ color: "#fff", fontSize: "18px", fontWeight: 700 }}>{item.val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div style={{ backgroundColor: "#161616", border: "1px solid #222", borderRadius: "14px", padding: "24px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "20px" }}>
          <div>
            <h2 style={{ color: "#fff", fontSize: "14px", fontWeight: 600 }}>Recent Orders</h2>
            <p style={{ color: "#444", fontSize: "12px", marginTop: "3px" }}>Review and update your most recent orders.</p>
          </div>
          <div style={{ position: "relative" }}>
            <svg style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#444" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input placeholder="Find Orders" style={{ paddingLeft: "32px", paddingRight: "14px", paddingTop: "8px", paddingBottom: "8px", backgroundColor: "#111", border: "1px solid #222", borderRadius: "8px", color: "#fff", fontSize: "12px", outline: "none", width: "180px" }} />
          </div>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "900px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #1e1e1e" }}>
                {["Order Number","Company","Country","Bank","Request Date","Start Time","Assigned to","Availability","Actions"].map(h => (
                  <th key={h} style={{ textAlign: "left", padding: "8px 14px 10px 0", color: "#3a3a3a", fontSize: "11px", fontWeight: 600, letterSpacing: "0.04em", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o, i) => {
                const action = rowActions[i] || "Review";
                const aStyle = actionStyle[action] || actionStyle.Review;
                return (
                  <tr key={i} style={{ borderBottom: "1px solid #1a1a1a" }}>
                    <td style={{ padding: "13px 14px 13px 0", color: "#555", fontSize: "12px" }}>{o.id}</td>
                    <td style={{ padding: "13px 14px 13px 0", color: "#fff", fontSize: "12px", maxWidth: "180px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{o.company}</td>
                    <td style={{ padding: "13px 14px 13px 0", color: "#666", fontSize: "12px", whiteSpace: "nowrap" }}>{o.country}</td>
                    <td style={{ padding: "13px 14px 13px 0" }}>
                      <div style={{ color: "#ccc", fontSize: "12px" }}>{o.bank}</div>
                      <div style={{ color: "#3a3a3a", fontSize: "10px", marginTop: "2px" }}>{o.branch}</div>
                    </td>
                    <td style={{ padding: "13px 14px 13px 0", color: "#666", fontSize: "12px", whiteSpace: "nowrap" }}>{o.requestDate}</td>
                    <td style={{ padding: "13px 14px 13px 0", color: "#666", fontSize: "12px", whiteSpace: "nowrap" }}>{o.startTime}</td>
                    <td style={{ padding: "13px 14px 13px 0", color: "#ccc", fontSize: "12px", whiteSpace: "nowrap" }}>{o.assignedTo}</td>
                    <td style={{ padding: "13px 14px 13px 0" }}><StatusBadge status={o.status} /></td>
                    <td style={{ padding: "13px 0" }}>
                      <button style={{ ...aStyle, fontSize: "11px", fontWeight: 500, padding: "5px 14px", borderRadius: "6px", cursor: "pointer", whiteSpace: "nowrap" }}>
                        {action}
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
