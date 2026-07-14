"use client";

import { useState, useMemo, useEffect } from "react";
import { companies } from "@/data/mockData";
import CreateCompanyModal from "@/components/modals/CreateCompanyModal";
import DeleteConfirmModal from "@/components/modals/DeleteConfirmModal";

const PER_PAGE = 7;

function Toast({ message, type, onDismiss }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 3500);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const ok = type === "success";
  return (
    <div className="fixed bottom-[24px] right-[24px] z-[200] flex items-center gap-[12px] px-[18px] py-[14px] bg-[#1c1d22] border border-[#212328] rounded-[12px] shadow-2xl animate-[toastIn_0.2s_ease-out_forwards]">
      <style>{`@keyframes toastIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div className={`w-[18px] h-[18px] rounded-full flex items-center justify-center shrink-0 ${ok ? "bg-[rgba(34,197,94,0.15)]" : "bg-[rgba(239,68,68,0.15)]"}`}>
        <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke={ok ? "#22c55e" : "#ef4444"} strokeWidth={3}>
          {ok ? <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/> : <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>}
        </svg>
      </div>
      <span className="text-[13px] text-[#cdd0d6] font-normal leading-none">{message}</span>
      <button onClick={onDismiss} className="ml-[4px] text-[#545659] hover:text-white transition-colors cursor-pointer shrink-0">
        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>
  );
}

// Drawer content: shareholders per-company (derived from topShareHolders count)
function buildShareholders(company) {
  const base = [
    { name: "Li Wei", role: "CEO", pct: "62%" },
    { name: "Zhang Hui", role: "Shareholder", pct: "28%" },
    { name: "Chen Feng", role: "Shareholder", pct: "10%" },
  ];
  const count = Math.min(company.topShareHolders || 3, 6);
  // Repeat/extend to fill the grid nicely
  const result = [];
  for (let i = 0; i < Math.max(3, Math.min(count, 6)); i++) {
    result.push(base[i % base.length]);
  }
  return result;
}

export default function CompanyPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [createOpen, setCreateOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedCompany(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return companies;
    return companies.filter((row) =>
      ["name", "country", "registration"].some((k) =>
        String(row[k] ?? "").toLowerCase().includes(q)
      )
    );
  }, [search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  const shareholders = selectedCompany ? buildShareholders(selectedCompany) : [];

  return (
    <div className="space-y-[24px] py-4 px-4 md:py-5 md:px-7">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[12px]">
        <h1 className="text-[22px] font-bold text-white tracking-[-0.019em]">Company</h1>
        <div className="flex items-center gap-[12px] flex-wrap">
          <div className="relative flex-1 sm:flex-none">
            <svg
              className="absolute left-[12px] top-1/2 -translate-y-1/2 pointer-events-none"
              width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="#545659" strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Find Company"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full sm:w-[240px] h-[34px] pl-[34px] pr-[12px] rounded-[6px] bg-[#111215] text-[#9ea0a6] text-[12px] leading-none outline-none border border-[#24252a] focus:border-[#3e4047] transition-colors duration-120 placeholder-[#545659]"
            />
          </div>
          <button
            onClick={() => setCreateOpen(true)}
            className="h-[34px] px-[16px] text-[12px] font-medium rounded-[6px] bg-[#2563eb] hover:bg-[#1d4ed8] text-white cursor-pointer transition-colors duration-120 flex items-center whitespace-nowrap"
          >
            Create Company
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-[#151619] border border-[#212328] rounded-[12px] overflow-hidden">
        <div className="overflow-x-auto scrolling-touch">
          <table className="w-full border-collapse min-w-[1000px]">
            <thead className="bg-[#18191d] border-b border-[#212328]">
              <tr>
                <th className="h-[40px] pl-[24px] pr-[16px] text-left text-[#545659] text-[11px] font-normal tracking-[0.03em] uppercase select-none">Company</th>
                <th className="h-[40px] px-[16px] text-left text-[#545659] text-[11px] font-normal tracking-[0.03em] uppercase select-none">Country</th>
                <th className="h-[40px] px-[16px] text-left text-[#545659] text-[11px] font-normal tracking-[0.03em] uppercase select-none">Registration</th>
                <th className="h-[40px] px-[16px] text-left text-[#545659] text-[11px] font-normal tracking-[0.03em] uppercase select-none">Top Share Holders</th>
                <th className="h-[40px] px-[16px] text-left text-[#545659] text-[11px] font-normal tracking-[0.03em] uppercase select-none">Last Revenue</th>
                <th className="h-[40px] px-[16px] text-left text-[#545659] text-[11px] font-normal tracking-[0.03em] uppercase select-none">Last Inquired</th>
                <th className="h-[40px] px-[16px] text-left text-[#545659] text-[11px] font-normal tracking-[0.03em] uppercase select-none">Report Date</th>
                <th className="h-[40px] pl-[16px] pr-[24px] text-right text-[#545659] text-[11px] font-normal tracking-[0.03em] uppercase select-none">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-[40px] text-center text-[#74757b] text-[12px]">
                    No companies match your search.
                  </td>
                </tr>
              ) : (
                pageRows.map((row, i) => (
                  <tr
                    key={i}
                    onClick={() => setSelectedCompany(row)}
                    className="border-b border-[#212328] last:border-0 cursor-pointer hover:bg-[rgba(255,255,255,0.02)] transition-colors duration-100"
                  >
                    <td className="pl-[24px] pr-[16px] h-[60px] text-[12px] text-white font-medium align-middle max-w-[200px]">
                      <span className="block truncate">{row.name}</span>
                    </td>
                    <td className="px-[16px] h-[60px] text-[12px] text-[#9ea0a6] align-middle whitespace-nowrap">{row.country}</td>
                    <td className="px-[16px] h-[60px] text-[12px] text-[#9ea0a6] align-middle whitespace-nowrap">{row.registration}</td>
                    <td className="px-[16px] h-[60px] text-[12px] text-[#cdd0d6] align-middle">{row.topShareHolders}</td>
                    <td className="px-[16px] h-[60px] text-[12px] text-[#cdd0d6] align-middle whitespace-nowrap">{row.lastRevenue}</td>
                    <td className="px-[16px] h-[60px] text-[12px] text-[#9ea0a6] align-middle whitespace-nowrap">{row.lastInquired}</td>
                    <td className="px-[16px] h-[60px] text-[12px] text-[#9ea0a6] align-middle whitespace-nowrap">{row.reportDate}</td>
                    <td className="pl-[16px] pr-[24px] h-[60px] align-middle" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-[6px] justify-end">
                        <button
                          className="w-[28px] h-[28px] rounded-[6px] border border-[#212328] bg-[#111215] text-[#9ea0a6] hover:text-white hover:bg-[rgba(255,255,255,0.04)] flex items-center justify-center transition-colors duration-120 cursor-pointer"
                          title="Edit"
                        >
                          <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        <button
                          className="w-[28px] h-[28px] rounded-[6px] border border-[#212328] bg-[#111215] text-[#9ea0a6] hover:text-white hover:bg-[rgba(255,255,255,0.04)] flex items-center justify-center transition-colors duration-120 cursor-pointer"
                          title="Download"
                        >
                          <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setDeleteTarget(row.name)}
                          className="w-[28px] h-[28px] rounded-[6px] border border-[#212328] bg-[#111215] text-[#9ea0a6] hover:text-red-400 hover:border-red-900/50 hover:bg-[rgba(239,68,68,0.05)] flex items-center justify-center transition-colors duration-120 cursor-pointer"
                          title="Delete"
                        >
                          <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination */}
        <div className="flex items-center justify-between p-[14px_24px_16px_24px] border-t border-[#212328] flex-wrap gap-[12px]">
          <span className="text-[#74757b] text-[12px] font-normal">
            Showing {pageRows.length} of {filtered.length === 0 ? 0 : 62} orders
          </span>
          <div className="flex items-center gap-[8px]">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
              className={`h-[28px] px-[12px] text-[11px] font-normal rounded-[6px] border border-[#212328] bg-[#111215] transition-colors duration-100 flex items-center gap-[4px] ${
                safePage === 1 ? "text-[#3e4047] cursor-not-allowed" : "text-[#888] hover:bg-[#1c1d22] hover:text-white cursor-pointer"
              }`}
            >
              &lt; Prev
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              className={`h-[28px] px-[12px] text-[11px] font-normal rounded-[6px] border border-[#212328] bg-[#111215] transition-colors duration-100 flex items-center gap-[4px] ${
                safePage === totalPages ? "text-[#3e4047] cursor-not-allowed" : "text-[#888] hover:bg-[#1c1d22] hover:text-white cursor-pointer"
              }`}
            >
              Next &gt;
            </button>
          </div>
        </div>
      </div>

      {/* ───── Company Detail Drawer ───── */}
      {selectedCompany && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setSelectedCompany(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Sliding Panel */}
          <div className="fixed top-0 right-0 h-screen w-full max-w-[760px] bg-[#131417] border-l border-[#212328] shadow-2xl z-50 flex flex-col overflow-hidden animate-[slideIn_0.25s_ease-out_forwards]">
            <style>{`
              @keyframes slideIn {
                from { transform: translateX(100%); }
                to   { transform: translateX(0); }
              }
            `}</style>

            {/* ── Drawer Header ── */}
            <div className="p-[20px_28px] border-b border-[#212328] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-[14px] min-w-0">
                {/* Close / Back button */}
                <button
                  onClick={() => setSelectedCompany(null)}
                  className="p-[6px] rounded-[6px] border border-[#212328] bg-[#111215] text-[#9ea0a6] hover:text-white hover:bg-[rgba(255,255,255,0.04)] flex items-center justify-center transition-colors duration-120 cursor-pointer shrink-0"
                >
                  <svg width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
                <div className="min-w-0">
                  <p className="text-[11px] text-[#545659] font-medium uppercase tracking-[0.05em]">Company</p>
                  <h2 className="text-[20px] font-bold text-white tracking-[-0.015em] truncate mt-[2px]">
                    {selectedCompany.name}
                  </h2>
                </div>
              </div>
              {/* Edit button */}
              <button className="h-[32px] px-[14px] rounded-[6px] bg-[#111215] border border-[#212328] hover:border-[#3e4047] text-[#cdd0d6] hover:text-white text-[11px] font-medium flex items-center gap-[6px] transition-all cursor-pointer shrink-0">
                <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Edit
              </button>
            </div>

            {/* ── Scrollable Content ── */}
            <div className="flex-1 overflow-y-auto p-[24px] space-y-[20px]">

              {/* Card 1 — Verification Status */}
              <div className="bg-[#151619] border border-[#212328] rounded-[14px] p-[20px_24px]">
                <h3 className="text-[15px] font-semibold text-white mb-[16px]">Verification Status</h3>
                <div className="flex items-center justify-between gap-[16px]">
                  <div className="flex items-center gap-[8px] text-[12px] text-[#74757b]">
                    <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="shrink-0 text-[#74757b]">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>Cached 2025 report available for reuse.</span>
                  </div>
                  <button className="h-[34px] px-[16px] text-[12px] font-medium rounded-[8px] bg-[#2563eb] hover:bg-[#1d4ed8] text-white cursor-pointer flex items-center gap-[6px] transition-colors duration-120 shrink-0">
                    <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                    </svg>
                    Download Report
                  </button>
                </div>
              </div>

              {/* Card 2 — Company Profile */}
              <div className="bg-[#151619] border border-[#212328] rounded-[14px] p-[20px_24px]">
                <h3 className="text-[15px] font-semibold text-white mb-[20px]">Company Profile</h3>

                {/* 4-column info grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-[16px]">
                  <div>
                    <p className="text-[10px] text-[#74757b] uppercase tracking-[0.04em] mb-[6px]">Company Name</p>
                    <p className="text-[12px] text-white font-medium leading-snug">
                      {selectedCompany.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#74757b] uppercase tracking-[0.04em] mb-[6px]">Country</p>
                    <div className="flex items-center gap-[4px]">
                      <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#74757b" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span className="text-[12px] text-white font-medium">{selectedCompany.country}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#74757b] uppercase tracking-[0.04em] mb-[6px]">Registry Source</p>
                    <p className="text-[12px] text-white font-medium">QCC</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#74757b] uppercase tracking-[0.04em] mb-[6px]">Registration No.</p>
                    <p className="text-[12px] text-white font-medium truncate">{selectedCompany.registration}</p>
                  </div>
                </div>

                {/* Address row */}
                <div className="mt-[20px] pt-[18px] border-t border-[#212328]">
                  <p className="text-[10px] text-[#74757b] uppercase tracking-[0.04em] mb-[6px]">Registered Address</p>
                  <p className="text-[12px] text-[#cdd0d6] leading-[18px]">
                    Room 2105, Block B, Futian District, Shenzhen, Guangdong 518000, China
                  </p>
                </div>
              </div>

              {/* Card 3 — Financials */}
              <div className="bg-[#151619] border border-[#212328] rounded-[14px] p-[20px_24px]">
                <h3 className="text-[15px] font-semibold text-white">Financials</h3>
                <p className="text-[11px] text-[#74757b] mt-[3px] mb-[20px]">FY2024 reported figures</p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-[10px]">
                  {[
                    { label: "Revenue",      value: selectedCompany.lastRevenue || "$12.4M" },
                    { label: "Assets",       value: "$8.1M" },
                    { label: "Net Profit",   value: "$1.9M" },
                    { label: "Capital",      value: "$3.0M" },
                    { label: "Employees",    value: "142" },
                    { label: "Years Active", value: "11" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-[#111215] border border-[#212328] rounded-[10px] p-[14px_16px] flex flex-col justify-between min-h-[80px]"
                    >
                      <p className="text-[10px] text-[#74757b] leading-none">{stat.label}</p>
                      <p className="text-[20px] font-semibold text-white leading-none mt-[10px]">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 4 — Shareholders */}
              <div className="bg-[#151619] border border-[#212328] rounded-[14px] p-[20px_24px]">
                <h3 className="text-[15px] font-semibold text-white">Shareholders</h3>
                <p className="text-[11px] text-[#74757b] mt-[3px] mb-[20px]">Each shareholders percentage of shares</p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-[8px]">
                  {shareholders.map((sh, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-[10px_12px] bg-[#111215] border border-[#212328] rounded-[8px]"
                    >
                      <div className="min-w-0 mr-[8px]">
                        <p className="text-[12px] font-semibold text-white leading-none truncate">{sh.name}</p>
                        <p className="text-[10px] text-[#74757b] mt-[4px] leading-none">{sh.role}</p>
                      </div>
                      <span className="text-[10px] font-medium text-[#9ea0a6] border border-[#2e3037] bg-[rgba(255,255,255,0.03)] px-[7px] py-[3px] rounded-[4px] shrink-0 whitespace-nowrap">
                        16.6%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </>
      )}

      {/* Modals */}
      <CreateCompanyModal open={createOpen} onClose={() => setCreateOpen(false)} />
      <DeleteConfirmModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => {
          setDeleteTarget(null);
          setToast({ type: "success", message: "Company deleted successfully.", id: Date.now() });
        }}
      />
      {toast && (
        <Toast key={toast.id} type={toast.type} message={toast.message} onDismiss={() => setToast(null)} />
      )}
    </div>
  );
}
