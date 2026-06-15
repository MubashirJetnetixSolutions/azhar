"use client";

import { useState } from "react";
import { invoices } from "@/data/mockData";
import Pagination from "@/components/ui/Pagination";
import SearchInput from "@/components/ui/SearchInput";

export default function InvoicesPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Page title + dropdowns */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h1 style={{ color: "#fff", fontSize: "22px", fontWeight: 700, letterSpacing: "-0.02em" }}>Invoices</h1>
        <div style={{ display: "flex", gap: "8px" }}>
          <select style={{ backgroundColor: "#161616", border: "1px solid #222", borderRadius: "8px", color: "#666", fontSize: "12px", padding: "6px 12px", outline: "none", cursor: "pointer" }}>
            <option>SMEs</option><option>All</option>
          </select>
          <select style={{ backgroundColor: "#161616", border: "1px solid #222", borderRadius: "8px", color: "#666", fontSize: "12px", padding: "6px 12px", outline: "none", cursor: "pointer" }}>
            <option>Daily</option><option>Weekly</option><option>Monthly</option>
          </select>
        </div>
      </div>

      {/* 2 wide stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
        {[
          { label: "Paid Invoice Amount", value: "EUR 1200.00", sub: "Number of Invoices", subVal: "75" },
          { label: "Pending Invoice Amount", value: "EUR 1200.00", sub: "Number of Invoices", subVal: "75" },
        ].map((card, i) => (
          <div key={i} style={{ backgroundColor: "#161616", border: "1px solid #222", borderRadius: "14px", padding: "22px 24px", borderLeft: "3px solid #3b82f6", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <p style={{ color: "#555", fontSize: "11px", fontWeight: 500, marginBottom: "10px" }}>{card.label}</p>
              <p style={{ color: "#fff", fontSize: "26px", fontWeight: 700, letterSpacing: "-0.02em" }}>{card.value}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ color: "#444", fontSize: "11px", marginBottom: "10px" }}>{card.sub}</p>
              <p style={{ color: "#fff", fontSize: "26px", fontWeight: 700 }}>{card.subVal}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ backgroundColor: "#161616", border: "1px solid #222", borderRadius: "14px", padding: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
          <div>
            <h2 style={{ color: "#fff", fontSize: "14px", fontWeight: 600 }}>Invoices</h2>
            <p style={{ color: "#444", fontSize: "12px", marginTop: "3px" }}>Review, download and edit invoices</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ color: "#555", fontSize: "12px" }}>Tags</span>
              <select style={{ backgroundColor: "#111", border: "1px solid #222", borderRadius: "6px", color: "#666", fontSize: "11px", padding: "5px 10px", outline: "none" }}>
                <option>All</option>
              </select>
            </div>
            <SearchInput placeholder="Find Invoices" />
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "800px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #1e1e1e" }}>
                {["Invoice Number","Bank","Branch","Company","Creation Date","Amount","Due Date","Status","Actions"].map(h => (
                  <th key={h} style={{ textAlign: "left", padding: "8px 14px 10px 0", color: "#3a3a3a", fontSize: "11px", fontWeight: 600, letterSpacing: "0.04em", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv, i) => {
                const isPaid = inv.status === "Paid";
                return (
                  <tr key={i} style={{ borderBottom: "1px solid #1a1a1a" }}>
                    <td style={{ padding: "13px 14px 13px 0", color: "#555", fontSize: "12px" }}>{inv.id}</td>
                    <td style={{ padding: "13px 14px 13px 0", color: "#ddd", fontSize: "12px", fontWeight: 500 }}>{inv.bank}</td>
                    <td style={{ padding: "13px 14px 13px 0", color: "#666", fontSize: "12px" }}>{inv.branch}</td>
                    <td style={{ padding: "13px 14px 13px 0", color: "#ddd", fontSize: "12px", maxWidth: "180px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{inv.company}</td>
                    <td style={{ padding: "13px 14px 13px 0", color: "#666", fontSize: "12px", whiteSpace: "nowrap" }}>{inv.creationDate}</td>
                    <td style={{ padding: "13px 14px 13px 0", color: "#ddd", fontSize: "12px" }}>{inv.amount}</td>
                    <td style={{ padding: "13px 14px 13px 0", color: "#666", fontSize: "12px", whiteSpace: "nowrap" }}>{inv.dueDate}</td>
                    <td style={{ padding: "13px 14px 13px 0" }}>
                      <select style={{
                        fontSize: "11px", padding: "3px 8px", borderRadius: "6px", outline: "none", cursor: "pointer", appearance: "none",
                        backgroundColor: isPaid ? "rgba(34,197,94,0.1)" : "rgba(249,115,22,0.1)",
                        color: isPaid ? "#22c55e" : "#f97316",
                        border: `1px solid ${isPaid ? "rgba(34,197,94,0.3)" : "rgba(249,115,22,0.3)"}`,
                      }}>
                        <option>Paid</option>
                        <option>Unpaid</option>
                        <option>Bad Debt</option>
                      </select>
                    </td>
                    <td style={{ padding: "13px 0" }}>
                      <div style={{ display: "flex", gap: "4px" }}>
                        {[
                          <path key="e" strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />,
                          <path key="d" strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />,
                          <path key="t" strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />,
                        ].map((path, j) => (
                          <button key={j} style={{ padding: "6px", borderRadius: "6px", backgroundColor: "#111", border: "1px solid #1e1e1e", color: "#555", cursor: "pointer" }}>
                            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>{path}</svg>
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Pagination showing="Showing 7 of 62 invoices" />
      </div>
    </div>
  );
}
