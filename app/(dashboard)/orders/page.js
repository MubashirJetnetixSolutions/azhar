"use client";

import { useState } from "react";
import { orders } from "@/data/mockData";
import StatusBadge from "@/components/ui/StatusBadge";
import Pagination from "@/components/ui/Pagination";
import SearchInput from "@/components/ui/SearchInput";
import CreateOrderModal from "@/components/modals/CreateOrderModal";
import OrderDetailPanel from "@/components/OrderDetailPanel";

const tabs = ["All Orders","New Orders","In Verification","Reputation Reports","Flagged","Complete"];

const AVL = {
  Online:  { color: "#22c55e", bg: "rgba(34,197,94,0.1)",  border: "rgba(34,197,94,0.25)" },
  Start:   { color: "#3b82f6", bg: "rgba(59,130,246,0.1)", border: "rgba(59,130,246,0.25)" },
  Reuse:   { color: "#a855f7", bg: "rgba(168,85,247,0.1)", border: "rgba(168,85,247,0.25)" },
  Send:    { color: "#f97316", bg: "rgba(249,115,22,0.1)", border: "rgba(249,115,22,0.25)" },
  Recall:  { color: "#ef4444", bg: "rgba(239,68,68,0.1)",  border: "rgba(239,68,68,0.25)" },
  Review:  { color: "#888",    bg: "transparent",           border: "#2a2a2a" },
};
const ROW_AVL = ["Online","Online","Online","Start","Review","Recall","Send"];

const CARD = { backgroundColor: "#1a1a1a", border: "1px solid #252525", borderRadius: "10px" };

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("All Orders");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const displayOrders = orders.map((o, i) => ({ ...o, avl: ROW_AVL[i] || "Online" }));

  return (
    <>
      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "14px" }}>

          {/* 4 stat boxes */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "10px" }}>
            {[
              { label: "New Orders", value: "28" },
              { label: "In Verification", value: "14" },
              { label: "Reusable Reports", value: "9" },
              { label: "Flagged", value: "!", alert: true },
            ].map((s) => (
              <div key={s.label} style={{ ...CARD, padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <p style={{ color: "#555", fontSize: "11px", marginBottom: "7px" }}>{s.label}</p>
                  <p style={{ color: s.alert ? "#ef4444" : "#fff", fontSize: "24px", fontWeight: 700, letterSpacing: "-0.02em" }}>{s.value}</p>
                </div>
                {s.alert && (
                  <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "rgba(239,68,68,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#ef4444" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Table card */}
          <div style={{ ...CARD, padding: "20px 22px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "4px" }}>
              <div>
                <h2 style={{ color: "#fff", fontSize: "13px", fontWeight: 600 }}>Orders</h2>
                <p style={{ color: "#555", fontSize: "11px", marginTop: "3px" }}>Review, approve and Send order details to clients</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <SearchInput placeholder="Find Orders" />
                <button onClick={() => setModalOpen(true)} style={{ display: "flex", alignItems: "center", gap: "5px", backgroundColor: "#3b82f6", color: "#fff", border: "none", borderRadius: "7px", padding: "7px 14px", fontSize: "12px", fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap" }}>
                  <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                  Create Order
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", gap: "2px", margin: "14px 0 16px", overflowX: "auto" }}>
              {tabs.map(t => (
                <button key={t} onClick={() => setActiveTab(t)} style={{
                  padding: "5px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: 400,
                  whiteSpace: "nowrap", cursor: "pointer", border: "none",
                  backgroundColor: activeTab === t ? "#3b82f6" : "transparent",
                  color: activeTab === t ? "#fff" : "#555",
                }}>{t}</button>
              ))}
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "860px" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #1e1e1e" }}>
                    {["Order Number","Company","Country","Bank","Request Date","Start Time","Assigned to","Availability","Actions"].map(h => (
                      <th key={h} style={{ textAlign: "left", padding: "0 12px 10px 0", color: "#3a3a3a", fontSize: "11px", fontWeight: 500, whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {displayOrders.map((o, i) => {
                    const av = AVL[o.avl] || AVL.Review;
                    return (
                      <tr key={i} onClick={() => setSelectedOrder(o)} style={{ borderBottom: "1px solid #1d1d1d", cursor: "pointer" }}>
                        <td style={{ padding: "11px 12px 11px 0", color: "#555", fontSize: "12px" }}>{o.id}</td>
                        <td style={{ padding: "11px 12px 11px 0", color: "#ddd", fontSize: "12px", maxWidth: "160px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{o.company}</td>
                        <td style={{ padding: "11px 12px 11px 0", color: "#666", fontSize: "12px", whiteSpace: "nowrap" }}>{o.country}</td>
                        <td style={{ padding: "11px 12px 11px 0" }}>
                          <div style={{ color: "#bbb", fontSize: "12px" }}>{o.bank}</div>
                          <div style={{ color: "#3a3a3a", fontSize: "10px", marginTop: "1px" }}>{o.branch}</div>
                        </td>
                        <td style={{ padding: "11px 12px 11px 0", color: "#666", fontSize: "12px", whiteSpace: "nowrap" }}>{o.requestDate}</td>
                        <td style={{ padding: "11px 12px 11px 0" }}>
                          <div style={{ color: "#777", fontSize: "12px" }}>{o.startTime}</div>
                          <div style={{ color: "#3a3a3a", fontSize: "10px", marginTop: "1px" }}>{o.requestDate}</div>
                        </td>
                        <td style={{ padding: "11px 12px 11px 0", color: "#aaa", fontSize: "12px", whiteSpace: "nowrap" }}>{o.assignedTo}</td>
                        <td style={{ padding: "11px 12px 11px 0" }}>
                          <span style={{ fontSize: "11px", fontWeight: 500, padding: "3px 9px", borderRadius: "5px", backgroundColor: av.bg, color: av.color, border: `1px solid ${av.border}` }}>
                            {o.avl}
                          </span>
                        </td>
                        <td style={{ padding: "11px 0" }}>
                          <button onClick={e => e.stopPropagation()} style={{ fontSize: "11px", padding: "4px 11px", borderRadius: "6px", cursor: "pointer", backgroundColor: "transparent", border: "1px solid #2a2a2a", color: "#777" }}>
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

        {selectedOrder && <OrderDetailPanel order={selectedOrder} onClose={() => setSelectedOrder(null)} />}
      </div>

      <CreateOrderModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
