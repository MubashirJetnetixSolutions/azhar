"use client";

import { useState } from "react";
import { companies } from "@/data/mockData";
import Pagination from "@/components/ui/Pagination";
import SearchInput from "@/components/ui/SearchInput";

export default function CompanyPage() {
  const [selectedCompany, setSelectedCompany] = useState(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-white">Company</h1>
        <div className="flex items-center gap-3">
          <SearchInput placeholder="Find Company" />
          <button className="px-4 py-2 rounded-lg text-sm font-medium text-white whitespace-nowrap" style={{ backgroundColor: "#2563eb" }}>
            Create Company
          </button>
        </div>
      </div>

      <div className="flex gap-5">
        {/* Table */}
        <div className="flex-1 rounded-xl overflow-hidden" style={{ backgroundColor: "#161616", border: "1px solid #222" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid #1e1e1e" }}>
                {["Company", "Country", "Registration", "Top Share Holders", "Last Revenue", "Last Inquired", "Report Date", "Actions"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-medium whitespace-nowrap" style={{ color: "#505050" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {companies.map((c, i) => (
                <tr key={i} className="cursor-pointer hover:bg-white/[0.02] transition-colors" style={{ borderBottom: "1px solid #161616" }} onClick={() => setSelectedCompany(c)}>
                  <td className="px-5 py-3 text-xs text-white">{c.name}</td>
                  <td className="px-5 py-3 text-xs" style={{ color: "#888" }}>{c.country}</td>
                  <td className="px-5 py-3 text-xs" style={{ color: "#888" }}>{c.registration}</td>
                  <td className="px-5 py-3 text-xs text-white">{c.topShareHolders}</td>
                  <td className="px-5 py-3 text-xs text-white">{c.lastRevenue}</td>
                  <td className="px-5 py-3 text-xs" style={{ color: "#888" }}>{c.lastInquired}</td>
                  <td className="px-5 py-3 text-xs" style={{ color: "#888" }}>{c.reportDate}</td>
                  <td className="px-5 py-3">
                    <div className="flex gap-1">
                      <button className="p-1.5 rounded-lg" style={{ backgroundColor: "#111", border: "1px solid #1e1e1e", color: "#666" }}>
                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button className="p-1.5 rounded-lg" style={{ backgroundColor: "#111", border: "1px solid #1e1e1e", color: "#666" }}>
                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </button>
                      <button className="p-1.5 rounded-lg" style={{ backgroundColor: "#111", border: "1px solid #1e1e1e", color: "#666" }}>
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
          <div className="px-5 pb-4">
            <Pagination />
          </div>
        </div>

        {/* Company Detail Panel */}
        {selectedCompany && (
          <div className="w-[480px] shrink-0 rounded-xl overflow-y-auto" style={{ backgroundColor: "#161616", border: "1px solid #222", maxHeight: "calc(100vh - 150px)" }}>
            <div className="flex items-center justify-between px-5 py-3 sticky top-0" style={{ borderBottom: "1px solid #1e1e1e", backgroundColor: "#1a1a1a" }}>
              <div className="flex items-center gap-2 text-xs" style={{ color: "#888" }}>
                <span>â†’</span>
                <div>
                  <span style={{ color: "#555" }}>Company</span>
                  <p className="text-white font-medium">{selectedCompany.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-xs px-3 py-1.5 rounded-lg text-white" style={{ backgroundColor: "#1e1e1e", border: "1px solid #262626" }}>âœŽ Edit</button>
                <button onClick={() => setSelectedCompany(null)} style={{ color: "#555" }}>
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-5 space-y-5">
              {/* Verification Status */}
              <div className="p-4 rounded-xl flex items-center justify-between" style={{ backgroundColor: "#111" }}>
                <div className="flex items-center gap-2">
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#22c55e" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <div>
                    <h3 className="text-xs font-semibold text-white">Verification Status</h3>
                    <p className="text-[10px]" style={{ color: "#555" }}>Cached 2025 report available for reuse.</p>
                  </div>
                </div>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white" style={{ backgroundColor: "#2563eb" }}>
                  <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Report
                </button>
              </div>

              {/* Company Profile */}
              <div className="p-4 rounded-xl" style={{ backgroundColor: "#111" }}>
                <h3 className="text-sm font-semibold text-white mb-3">Company Profile</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                  {[
                    ["Company Name", "Shenzhen Hua Yi Trading Co."],
                    ["Country", "Guangdong, CN"],
                    ["Registry Source", "QCC"],
                    ["Registration No.", "9144-0300-MA5E"],
                  ].map(([l, v]) => (
                    <div key={l}>
                      <p className="text-[10px] mb-0.5" style={{ color: "#555" }}>{l}</p>
                      <p className="text-xs text-white font-medium">{v}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3" style={{ borderTop: "1px solid #1e1e1e" }}>
                  <p className="text-[10px] mb-1" style={{ color: "#555" }}>Registered Address</p>
                  <p className="text-xs text-white">Room 2105, Block B, Futian District, Shenzhen, Guangdong 518000, China</p>
                </div>
              </div>

              {/* Financials */}
              <div className="p-4 rounded-xl" style={{ backgroundColor: "#111" }}>
                <h3 className="text-sm font-semibold text-white mb-1">Financials</h3>
                <p className="text-[10px] mb-3" style={{ color: "#555" }}>FY2024 reported figures</p>
                <div className="grid grid-cols-3 gap-2">
                  {[["$12.4M","Revenue"],["$8.1M","Assets"],["$1.9M","Net Profit"],["$3.0M","Capital"],["142","Employees"],["11","Years Active"]].map(([v,l]) => (
                    <div key={l} className="p-3 rounded-lg" style={{ backgroundColor: "#1a1a1a" }}>
                      <p className="text-sm font-bold text-white">{v}</p>
                      <p className="text-[10px] mt-0.5" style={{ color: "#555" }}>{l}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shareholders */}
              <div className="p-4 rounded-xl" style={{ backgroundColor: "#111" }}>
                <h3 className="text-sm font-semibold text-white mb-1">Shareholders</h3>
                <p className="text-[10px] mb-3" style={{ color: "#555" }}>Each shareholders percentage of shares</p>
                <div className="grid grid-cols-3 gap-2">
                  {[["Li Wei","CEO"],["Li Wei","CEO"],["Zhang Hui","Shareholder"],["Zhang Hui","Shareholder"],["Chen Feng","Shareholder"],["Chen Feng","Shareholder"]].map(([n,r],i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-lg" style={{ backgroundColor: "#1a1a1a" }}>
                      <div>
                        <p className="text-xs text-white">{n}</p>
                        <p className="text-[10px]" style={{ color: "#555" }}>{r}</p>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded text-white" style={{ backgroundColor: "#2563eb" }}>16.6%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}




