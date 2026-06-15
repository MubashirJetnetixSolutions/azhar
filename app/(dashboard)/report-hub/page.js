"use client";

import { useState } from "react";
import { reports } from "@/data/mockData";
import Pagination from "@/components/ui/Pagination";
import SearchInput from "@/components/ui/SearchInput";
import CreateReportModal from "@/components/modals/CreateReportModal";

const CARD = { backgroundColor: "#1a1a1a", border: "1px solid #252525", borderRadius: "14px" };
const BTN_GHOST = { backgroundColor: "#1a1a1a", border: "1px solid #252525", borderRadius: "8px", color: "#666", fontSize: "13px", padding: "7px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" };

export default function ReportHubPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h1 style={{ color: "#fff", fontSize: "22px", fontWeight: 700, letterSpacing: "-0.02em" }}>Report Hub</h1>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button style={BTN_GHOST}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Upload Reports
            </button>
            <button onClick={() => setFiltersOpen(!filtersOpen)} style={BTN_GHOST}>
              Filters
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <SearchInput placeholder="Find Reports" />
            <button onClick={() => setModalOpen(true)} style={{ backgroundColor: "#3b82f6", color: "#fff", border: "none", borderRadius: "8px", padding: "7px 16px", fontSize: "13px", fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap" }}>
              Create Report
            </button>
          </div>
        </div>

        {filtersOpen && (
          <div style={{ display: "flex", gap: "10px" }}>
            {["Bank","Company","Type","Country","Date"].map(f => (
              <select key={f} style={{ flex: 1, backgroundColor: "#1a1a1a", border: "1px solid #252525", borderRadius: "8px", color: "#555", fontSize: "12px", padding: "8px 12px", outline: "none" }}>
                <option>{f}</option>
              </select>
            ))}
          </div>
        )}

        <div style={{ ...CARD, overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "800px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #1e1e1e" }}>
                  {["File Name","File Size","Company","Bank","Country","Report Date","Actions"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "14px 16px 14px 0", paddingLeft: h === "File Name" ? "20px" : 0, color: "#3a3a3a", fontSize: "11px", fontWeight: 600, letterSpacing: "0.04em", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reports.map((r, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #1a1a1a" }}>
                    <td style={{ padding: "13px 16px 13px 20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ width: "30px", height: "30px", borderRadius: "8px", backgroundColor: "#111", border: "1px solid #252525", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#555" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <span style={{ color: "#ddd", fontSize: "12px", fontWeight: 500 }}>{r.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: "13px 16px 13px 0", color: "#666", fontSize: "12px" }}>{r.size}</td>
                    <td style={{ padding: "13px 16px 13px 0", color: "#ddd", fontSize: "12px" }}>{r.company}</td>
                    <td style={{ padding: "13px 16px 13px 0" }}>
                      <div style={{ color: "#ccc", fontSize: "12px" }}>{r.bank}</div>
                      <div style={{ color: "#3a3a3a", fontSize: "10px", marginTop: "2px" }}>{r.branch}</div>
                    </td>
                    <td style={{ padding: "13px 16px 13px 0", color: "#666", fontSize: "12px" }}>{r.country}</td>
                    <td style={{ padding: "13px 16px 13px 0", color: "#666", fontSize: "12px", whiteSpace: "nowrap" }}>{r.date}</td>
                    <td style={{ padding: "13px 20px 13px 0" }}>
                      <div style={{ display: "flex", gap: "4px" }}>
                        <button style={{ padding: "6px", borderRadius: "6px", backgroundColor: "#111", border: "1px solid #252525", color: "#555", cursor: "pointer" }}>
                          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        </button>
                        <button style={{ padding: "6px", borderRadius: "6px", backgroundColor: "#111", border: "1px solid #252525", color: "#555", cursor: "pointer" }}>
                          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ padding: "12px 20px" }}>
            <Pagination />
          </div>
        </div>
      </div>

      <CreateReportModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

