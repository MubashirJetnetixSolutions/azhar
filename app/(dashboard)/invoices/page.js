"use client";

import { useState } from "react";
import { invoices } from "@/data/mockData";
import Pagination from "@/components/ui/Pagination";
import SearchInput from "@/components/ui/SearchInput";

const CARD = { backgroundColor: "#1a1a1a", border: "1px solid #252525", borderRadius: "10px" };

export default function InvoicesPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      {/* Title + dropdowns */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h1 style={{ color: "#fff", fontSize: "20px", fontWeight: 700, letterSpacing: "-0.01em" }}>Invoices</h1>
        <div style={{ display: "flex", gap: "8px" }}>
          <select style={{ backgroundColor: "#1a1a1a", border: "1px solid #252525", borderRadius: "7px", color: "#666", fontSize: "12px", padding: "6px 12px", outline: "none" }}>
            <option>SMEs</option><option>All</option>
          </select>
          <select style={{ backgroundColor: "#1a1a1a", border: "1px solid #252525", borderRadius: "7px", color: "#666", fontSize: "12px", padding: "6px 12px", outline: "none" }}>
            <option>Daily</option><option>Weekly</option><option>Monthly</option>
          </select>
        </div>
      </div>

      {/* 3 wide stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
        {[
          { label: "Paid Invoice Amount", value: "EUR 1200.00", subLabel: "Number of Invoices", subValue: "75" },
          { label: "Pending Invoice Amount", value: "EUR 1200.00", subLabel: "Number of Invoices", subValue: "75" },
          { label: "Bad Debt Invoice Amount", value: "EUR 1200.00", subLabel: "Number of Invoices", subValue: "75" },
        ].map((c, i) => (
          <div key={i} style={{ ...CARD, borderLeft: "3px solid #3b82f6", padding: "18px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <p style={{ color: "#555", fontSize: "11px", marginBottom: "8px" }}>{c.label}</p>
              <p style={{ color: "#fff", fontSize: "22px", fontWeight: 700, letterSpacing: "-0.02em" }}>{c.value}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ color: "#555", fontSize: "11px", marginBottom: "8px" }}>{c.subLabel}</p>
              <p style={{ color: "#fff", fontSize: "22px", fontWeight: 700 }}>{c.subValue}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ ...CARD, padding: "20px 22px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
          <div>
            <h2 style={{ color: "#fff", fontSize: "13px", fontWeight: 600 }}>Invoices</h2>
            <p style={{ color: "#555", fontSize: "11px", marginTop: "3px" }}>Review, download and edit invoices</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
              <span style={{ color: "#555", fontSize: "12px" }}>Tags</span>
              <select style={{ backgroundColor: "#111", border: "1px solid #222", borderRadius: "6px", color: "#555", fontSize: "11px", padding: "4px 8px", outline: "none" }}>
                <option>All</option>
              </select>
            </div>
            <SearchInput placeholder="Find Orders" />
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "780px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #1e1e1e" }}>
                {["Invoice Number","Bank","Branch","Company","Creation Date","Amount","Due Date","Status","Actions"].map(h => (
                  <th key={h} style={{ textAlign: "left", padding: "0 12px 10px 0", color: "#3a3a3a", fontSize: "11px", fontWeight: 500, whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv, i) => {
                const isPaid = inv.status === "Paid";
                return (
                  <tr key={i} style={{ borderBottom: "1px solid #1d1d1d" }}>
                    <td style={{ padding: "11px 12px 11px 0", color: "#555", fontSize: "12px" }}>{inv.id}</td>
                    <td style={{ padding: "11px 12px 11px 0", color: "#ddd", fontSize: "12px", fontWeight: 500 }}>{inv.bank}</td>
                    <td style={{ padding: "11px 12px 11px 0", color: "#666", fontSize: "12px" }}>{inv.branch}</td>
                    <td style={{ padding: "11px 12px 11px 0", color: "#ddd", fontSize: "12px", maxWidth: "160px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{inv.company}</td>
                    <td style={{ padding: "11px 12px 11px 0", color: "#666", fontSize: "12px", whiteSpace: "nowrap" }}>{inv.creationDate}</td>
                    <td style={{ padding: "11px 12px 11px 0", color: "#ddd", fontSize: "12px" }}>{inv.amount}</td>
                    <td style={{ padding: "11px 12px 11px 0", color: "#666", fontSize: "12px", whiteSpace: "nowrap" }}>{inv.dueDate}</td>
                    <td style={{ padding: "11px 12px 11px 0" }}>
                      <select style={{
                        fontSize: "11px", padding: "3px 7px", borderRadius: "5px", outline: "none", cursor: "pointer", appearance: "none",
                        backgroundColor: isPaid ? "rgba(34,197,94,0.1)" : "rgba(249,115,22,0.1)",
                        color: isPaid ? "#22c55e" : "#f97316",
                        border: `1px solid ${isPaid ? "rgba(34,197,94,0.25)" : "rgba(249,115,22,0.25)"}`,
                      }}>
                        <option>Paid</option><option>Unpaid</option><option>Bad Debt</option>
                      </select>
                    </td>
                    <td style={{ padding: "11px 0" }}>
                      <div style={{ display: "flex", gap: "4px" }}>
                        {[
                          "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z",
                          "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4",
                          "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16",
                        ].map((d, j) => (
                          <button key={j} style={{ padding: "5px", borderRadius: "5px", backgroundColor: "#111", border: "1px solid #1e1e1e", color: "#555", cursor: "pointer", display: "flex" }}>
                            <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d={d} />
                            </svg>
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
