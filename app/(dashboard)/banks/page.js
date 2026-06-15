"use client";

import { useState } from "react";
import { banks } from "@/data/mockData";
import StatusBadge from "@/components/ui/StatusBadge";
import Pagination from "@/components/ui/Pagination";
import SearchInput from "@/components/ui/SearchInput";

export default function BanksPage() {
  const [selectedBank, setSelectedBank] = useState(null);
  const [activeTab, setActiveTab] = useState("All Reports");

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-white">Banks</h1>
        <div className="flex items-center gap-3">
          <SearchInput placeholder="Find Bank" />
          <button className="px-4 py-2 rounded-lg text-sm font-medium text-white whitespace-nowrap" style={{ backgroundColor: "#2563eb" }}>
            Create Bank
          </button>
        </div>
      </div>

      <div className={`flex gap-5 ${selectedBank ? "" : ""}`}>
        {/* Table */}
        <div className="flex-1 rounded-xl overflow-hidden" style={{ backgroundColor: "#1a1a1a", border: "1px solid #252525" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid #1e1e1e" }}>
                {["Bank", "Address", "Total Reports", "Total Requests", "Total Revenue", "Creation Date", "Status", "Actions"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-medium whitespace-nowrap" style={{ color: "#3a3a3a" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {banks.map((b, i) => (
                <>
                  <tr key={`b-${i}`} className="cursor-pointer hover:bg-white/[0.02] transition-colors" style={{ borderBottom: "1px solid #161616" }} onClick={() => setSelectedBank(selectedBank?.id === b.id ? null : b)}>
                    <td className="px-5 py-3 text-xs text-white font-medium">{b.name}</td>
                    <td className="px-5 py-3 text-xs max-w-[220px] truncate" style={{ color: "#888" }}>{b.address}</td>
                    <td className="px-5 py-3 text-xs text-white">{b.totalReports}</td>
                    <td className="px-5 py-3 text-xs text-white">{b.totalRequests}</td>
                    <td className="px-5 py-3 text-xs text-white">{b.totalRevenue}</td>
                    <td className="px-5 py-3 text-xs" style={{ color: "#888" }}>{b.creationDate}</td>
                    <td className="px-5 py-3"><StatusBadge status={b.status} /></td>
                    <td className="px-5 py-3">
                      <div className="flex gap-1">
                        <button className="p-1.5 rounded-lg" style={{ backgroundColor: "#111", border: "1px solid #252525", color: "#666" }}>
                          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        <button className="p-1.5 rounded-lg" style={{ backgroundColor: "#111", border: "1px solid #252525", color: "#666" }}>
                          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                  {/* Branches */}
                  {b.branches?.map((br, j) => (
                    <tr key={`br-${i}-${j}`} className="hover:bg-white/[0.01]" style={{ borderBottom: "1px solid #141414", backgroundColor: "#141414" }}>
                      <td className="pl-10 pr-5 py-2 text-xs" style={{ color: "#888" }}>{br.name}</td>
                      <td className="px-5 py-2 text-xs max-w-[220px] truncate" style={{ color: "#555" }}>{br.address}</td>
                      <td className="px-5 py-2 text-xs" style={{ color: "#888" }}>{br.totalReports}</td>
                      <td className="px-5 py-2 text-xs" style={{ color: "#888" }}>{br.totalRequests}</td>
                      <td className="px-5 py-2 text-xs" style={{ color: "#888" }}>{br.totalRevenue}</td>
                      <td className="px-5 py-2 text-xs" style={{ color: "#555" }}>{br.creationDate}</td>
                      <td className="px-5 py-2"><StatusBadge status={br.status} /></td>
                      <td className="px-5 py-2">
                        <div className="flex gap-1">
                          <button className="p-1.5 rounded-lg" style={{ backgroundColor: "#111", border: "1px solid #252525", color: "#666" }}>
                            <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                          <button className="p-1.5 rounded-lg" style={{ backgroundColor: "#111", border: "1px solid #252525", color: "#666" }}>
                            <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
          <div className="px-5 pb-4">
            <Pagination showing="Showing 7 of 62 invoices" />
          </div>
        </div>

        {/* Bank Detail Panel */}
        {selectedBank && (
          <div className="w-[420px] shrink-0 rounded-xl overflow-hidden" style={{ backgroundColor: "#1a1a1a", border: "1px solid #252525" }}>
            <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid #1e1e1e" }}>
              <div className="flex items-center gap-2 text-xs" style={{ color: "#888" }}>
                <span>Banks</span>
                <span>/</span>
                <span className="text-white">{selectedBank.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded text-green-400" style={{ backgroundColor: "#14532d20", border: "1px solid #22c55e30" }}>Active</span>
                <button className="text-xs px-2 py-1 rounded" style={{ backgroundColor: "#1e1e1e", border: "1px solid #262626", color: "#888" }}>âœŽ Edit</button>
                <button onClick={() => setSelectedBank(null)} style={{ color: "#555" }}>
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="overflow-y-auto p-4 space-y-4" style={{ maxHeight: "calc(100vh - 180px)" }}>
              {/* Bank Info */}
              <div className="p-4 rounded-xl" style={{ backgroundColor: "#111" }}>
                <h3 className="text-xs font-semibold text-white mb-3">Bank Information</h3>
                <div className="space-y-2 text-xs">
                  <div><p style={{ color: "#555" }}>Email</p><p className="text-white">info@meezanbank.com</p></div>
                  <div><p style={{ color: "#555" }}>Phone Number</p><p className="text-white">(300) 08000661</p></div>
                  <div><p style={{ color: "#555" }}>Registered Address</p><p className="text-white">{selectedBank.address}</p></div>
                  <div><p style={{ color: "#555" }}>Employees</p><p className="text-white">4575</p></div>
                </div>
              </div>

              {/* Financials */}
              <div className="p-4 rounded-xl" style={{ backgroundColor: "#111" }}>
                <h3 className="text-xs font-semibold text-white mb-3">Financials</h3>
                <div className="grid grid-cols-3 gap-2">
                  {[["PKR 12.4M","Total Revenue"],["PKR 8.1M","Total Requests"],["PKR 5.3M","Total Reports"]].map(([v,l]) => (
                    <div key={l} className="p-2 rounded-lg" style={{ backgroundColor: "#1a1a1a" }}>
                      <p className="text-xs font-bold text-white">{v}</p>
                      <p className="text-[10px] mt-0.5" style={{ color: "#555" }}>{l}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Emails */}
              <div className="p-4 rounded-xl" style={{ backgroundColor: "#111" }}>
                <h3 className="text-xs font-semibold text-white mb-3">Related Email Addresses</h3>
                <div className="grid grid-cols-3 gap-2 text-[11px]">
                  {["Danish Abbas","Tahir Ali","Majid Rehman","Saad Mehmood","Zaid Goneri","Aateen Tariq","Abdul Rahman Sheikh","Bilal Hussain","Abdullah Tang","Tariq Chaudhry","Musa Ali","Nadir Qasir"].map(n => (
                    <p key={n} style={{ color: "#888" }}>{n}</p>
                  ))}
                </div>
              </div>

              {/* Tabs */}
              <div>
                <div className="flex gap-2 mb-3">
                  {["All Reports","All Orders","Invoices"].map(t => (
                    <button key={t} onClick={() => setActiveTab(t)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                      style={{ backgroundColor: activeTab === t ? "#2563eb" : "#111", color: activeTab === t ? "#fff" : "#666", border: activeTab === t ? "none" : "1px solid #1e1e1e" }}>
                      {t}
                    </button>
                  ))}
                  <div className="ml-auto relative">
                    <input className="pl-7 pr-3 py-1.5 rounded-lg text-[11px] outline-none placeholder-gray-600 w-32" style={{ backgroundColor: "#111", border: "1px solid #252525", color: "#fff" }} placeholder="Find Report" />
                    <svg className="absolute left-2 top-1/2 -translate-y-1/2" width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="#666" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>

                <table className="w-full text-xs">
                  <thead>
                    <tr style={{ borderBottom: "1px solid #1e1e1e" }}>
                      {["File Name","File Size","Company","Actions"].map(h => (
                        <th key={h} className="text-left py-1.5 pr-3 text-[10px] font-medium" style={{ color: "#3a3a3a" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[1,2,3,4,5].map(i => (
                      <tr key={i} style={{ borderBottom: "1px solid #141414" }}>
                        <td className="py-2 pr-3"><div className="flex items-center gap-1.5"><svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="#666" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg><span style={{ color: "#888" }}>Report name_T1.pdf</span></div></td>
                        <td className="py-2 pr-3" style={{ color: "#555" }}>18 Mb</td>
                        <td className="py-2 pr-3 text-white">S&P Credit...</td>
                        <td className="py-2">
                          <div className="flex gap-1">
                            <button className="p-1 rounded" style={{ backgroundColor: "#1a1a1a", color: "#555" }}>
                              <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                            </button>
                            <button className="p-1 rounded" style={{ backgroundColor: "#1a1a1a", color: "#555" }}>
                              <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}





