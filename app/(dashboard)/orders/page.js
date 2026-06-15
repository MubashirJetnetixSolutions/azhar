"use client";

import { useState } from "react";
import { orders } from "@/data/mockData";
import StatusBadge from "@/components/ui/StatusBadge";
import Pagination from "@/components/ui/Pagination";
import SearchInput from "@/components/ui/SearchInput";
import CreateOrderModal from "@/components/modals/CreateOrderModal";
import OrderDetailPanel from "@/components/OrderDetailPanel";

const tabs = ["All Orders","New Orders","In Verification","Reputation Reports","Flagged","Complete"];

const rowActions = ["Online","Online","Online","Start","Review","Recall","Send"];
const actionStyle = {
  Online: { color: "#22c55e", bg: "transparent", border: "none" },
  Start:  { color: "#3b82f6", bg: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.3)" },
  Review: { color: "#888", bg: "transparent", border: "1px solid #2a2a2a" },
  Recall: { color: "#f97316", bg: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.25)" },
  Send:   { color: "#3b82f6", bg: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.3)" },
};

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("All Orders");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const displayOrders = orders.map((o, i) => ({ ...o, action: rowActions[i] || "Online" }));

  return (
    <>
      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Stat boxes */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "14px", marginBottom: "20px" }}>
            {[
              { label: "New Orders", value: "28" },
              { label: "In Verification", value: "14" },
              { label: "Reusable Reports", value: "9" },
              { label: "Flagged", value: "!", alert: true },
            ].map((s, i) => (
              <div key={i} style={{ backgroundColor: "#161616", border: `1px solid ${s.alert ? "rgba(239,68,68,0.2)" : "#222"}`, borderRadius: "14px", padding: "18px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <p style={{ color: "#555", fontSize: "11px", fontWeight: 500, marginBottom: "8px" }}>{s.label}</p>
                  <p style={{ color: s.alert ? "#ef4444" : "#fff", fontSize: "26px", fontWeight: 700, letterSpacing: "-0.02em" }}>{s.value}</p>
                </div>
                {s.alert && (
                  <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "rgba(239,68,68,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#ef4444" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Table card */}
          <div style={{ backgroundColor: "#161616", border: "1px solid #222", borderRadius: "14px", padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "16px" }}>
              <div>
                <h2 style={{ color: "#fff", fontSize: "14px", fontWeight: 600 }}>Orders</h2>
                <p style={{ color: "#444", fontSize: "12px", marginTop: "3px" }}>Review, approve and Send order details to clients</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <SearchInput placeholder="Find Orders" />
                <button onClick={() => setModalOpen(true)} style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "#3b82f6", color: "#fff", border: "none", borderRadius: "8px", padding: "8px 16px", fontSize: "13px", fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap" }}>
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Create Order
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", gap: "4px", marginBottom: "20px", overflowX: "auto" }}>
              {tabs.map(t => (
                <button key={t} onClick={() => setActiveTab(t)} style={{
                  padding: "6px 14px", borderRadius: "8px", fontSize: "12px", fontWeight: 500, whiteSpace: "nowrap", cursor: "pointer",
                  backgroundColor: activeTab === t ? "#3b82f6" : "transparent",
                  color: activeTab === t ? "#fff" : "#555",
                  border: "none",
                }}>
                  {t}
                </button>
              ))}
            </div>

            {/* Table */}
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
                  {displayOrders.map((o, i) => {
                    const as_ = actionStyle[o.action] || actionStyle.Review;
                    return (
                      <tr key={i} onClick={() => setSelectedOrder(o)} style={{ borderBottom: "1px solid #1a1a1a", cursor: "pointer" }}>
                        <td style={{ padding: "13px 14px 13px 0", color: "#555", fontSize: "12px" }}>{o.id}</td>
                        <td style={{ padding: "13px 14px 13px 0", color: "#ddd", fontSize: "12px", maxWidth: "180px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{o.company}</td>
                        <td style={{ padding: "13px 14px 13px 0", color: "#666", fontSize: "12px", whiteSpace: "nowrap" }}>{o.country}</td>
                        <td style={{ padding: "13px 14px 13px 0" }}>
                          <div style={{ color: "#ccc", fontSize: "12px" }}>{o.bank}</div>
                          <div style={{ color: "#3a3a3a", fontSize: "10px", marginTop: "2px" }}>{o.branch}</div>
                        </td>
                        <td style={{ padding: "13px 14px 13px 0", color: "#666", fontSize: "12px", whiteSpace: "nowrap" }}>{o.requestDate}</td>
                        <td style={{ padding: "13px 14px 13px 0" }}>
                          <div style={{ color: "#888", fontSize: "12px" }}>{o.startTime}</div>
                          <div style={{ color: "#3a3a3a", fontSize: "10px", marginTop: "2px" }}>{o.requestDate}</div>
                        </td>
                        <td style={{ padding: "13px 14px 13px 0", color: "#ccc", fontSize: "12px", whiteSpace: "nowrap" }}>{o.assignedTo}</td>
                        <td style={{ padding: "13px 14px 13px 0" }}>
                          <span style={{ fontSize: "11px", fontWeight: 500, padding: "3px 10px", borderRadius: "6px", backgroundColor: as_.bg, color: as_.color, border: as_.border }}>
                            {o.action}
                          </span>
                        </td>
                        <td style={{ padding: "13px 0" }}>
                          <button onClick={e => e.stopPropagation()} style={{ fontSize: "11px", fontWeight: 500, padding: "5px 14px", borderRadius: "6px", cursor: "pointer", backgroundColor: "#3b82f6", color: "#fff", border: "none" }}>
                            Review
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Pagination />
          </div>
        </div>

        {selectedOrder && (
          <OrderDetailPanel order={selectedOrder} onClose={() => setSelectedOrder(null)} />
        )}
      </div>

      <CreateOrderModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
