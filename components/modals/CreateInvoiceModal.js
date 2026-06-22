"use client";

import { useState } from "react";
import { orders } from "@/data/mockData";

export default function CreateInvoiceModal({ open, onClose, onSuccess }) {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const filtered = search.trim()
    ? orders.filter((o) =>
        ["id", "company", "country", "bank", "branch", "assignedTo"].some((k) =>
          String(o[k] ?? "").toLowerCase().includes(search.trim().toLowerCase())
        )
      )
    : orders;

  const handleCreate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSearch("");
      onSuccess?.();
      onClose();
    }, 1500);
  };

  const handleClose = () => {
    if (loading) return;
    setSearch("");
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px]" onClick={handleClose} />

      {/* Order list modal */}
      {!loading && (
        <div className="relative rounded-[12px] w-[95vw] max-w-[1100px] max-h-[90vh] bg-[#151619] border border-[#212328] shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-[12px] p-[20px_24px] border-b border-[#212328]">
            <div className="w-[32px] h-[32px] rounded-[6px] border border-[#212328] bg-[#111215] flex items-center justify-center shrink-0">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#74757b" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="text-[16px] font-semibold text-white">Create Invoice</span>
            <button onClick={handleClose} className="ml-auto text-[#74757b] hover:text-white cursor-pointer transition-colors duration-100">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Search */}
          <div className="p-[20px_24px_16px_24px]">
            <div className="relative">
              <svg className="absolute left-[12px] top-1/2 -translate-y-1/2 pointer-events-none" width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="#545659" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Find Orders"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-[34px] pl-[34px] pr-[12px] rounded-[6px] bg-[#111215] text-[#9ea0a6] text-[12px] leading-none outline-none border border-[#24252a] focus:border-[#3e4047] transition-colors duration-120"
              />
            </div>
          </div>

          {/* Table */}
          <div className="px-[24px] pb-[24px] overflow-x-auto">
            <table className="w-full border-collapse min-w-[950px]">
              <thead className="bg-[#18191d] border-t border-b border-[#212328]">
                <tr>
                  {["Order Number", "Company", "Country", "Bank", "Request Date", "Start Time", "Assigned to", "Status", "Actions"].map((h, idx) => (
                    <th
                      key={h}
                      className={`h-[40px] px-[8px] text-left text-[#545659] text-[11px] font-normal tracking-[0.03em] uppercase select-none ${
                        idx === 0 ? "pl-[20px]" : ""
                      } ${idx === 8 ? "pr-[20px]" : ""}`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="p-[40px] text-center text-[#74757b] text-[12px]">
                      No orders match your search.
                    </td>
                  </tr>
                ) : (
                  filtered.slice(0, 7).map((o, i) => (
                    <tr key={i} className="hover:bg-[rgba(255,255,255,0.02)] transition-colors duration-100 border-b border-[#212328] last:border-0">
                      <td className="pl-[20px] pr-[8px] py-[12px] h-[60px] text-[12px] text-[#9ea0a6] whitespace-nowrap align-middle">
                        {o.id}
                      </td>
                      <td className="px-[8px] py-[12px] h-[60px] text-[12px] text-[#cdd0d6] whitespace-nowrap max-w-[180px] truncate align-middle">
                        {o.company}
                      </td>
                      <td className="px-[8px] py-[12px] h-[60px] text-[12px] text-[#9ea0a6] whitespace-nowrap align-middle">
                        {o.country}
                      </td>
                      <td className="px-[8px] py-[12px] h-[60px] whitespace-nowrap align-middle">
                        <div>
                          <p className="text-[12px] text-[#cdd0d6] leading-[15px] font-normal">{o.bank}</p>
                          <p className="text-[10px] text-[#74757b] leading-[13px] mt-[1px] font-normal">{o.branch}</p>
                        </div>
                      </td>
                      <td className="px-[8px] py-[12px] h-[60px] text-[12px] text-[#9ea0a6] whitespace-nowrap align-middle">
                        {o.requestDate}
                      </td>
                      <td className="px-[8px] py-[12px] h-[60px] whitespace-nowrap align-middle">
                        <div>
                          <p className="text-[12px] text-[#cdd0d6] leading-[15px] font-normal">{o.startTime}</p>
                          <p className="text-[10px] text-[#74757b] leading-[13px] mt-[1px] font-normal">{o.requestDate}</p>
                        </div>
                      </td>
                      <td className="px-[8px] py-[12px] h-[60px] text-[12px] text-[#cdd0d6] whitespace-nowrap align-middle">
                        {o.assignedTo}
                      </td>
                      <td className="px-[8px] py-[12px] h-[60px] align-middle">
                        <span className="bg-[rgba(34,197,94,0.08)] text-[#22c55e] border border-[rgba(34,197,94,0.2)] rounded-[4px] px-[8px] py-[3px] text-[10px] font-medium leading-none inline-block">
                          Complete
                        </span>
                      </td>
                      <td className="pl-[8px] pr-[20px] py-[12px] h-[60px] align-middle">
                        <button
                          onClick={handleCreate}
                          className="h-[28px] px-[14px] text-[11px] font-normal rounded-[6px] text-white border border-[#373a42] bg-[#1e2027] hover:border-[#484b54] hover:bg-[#272b34] transition-colors duration-100 cursor-pointer whitespace-nowrap"
                        >
                          Create Invoice
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="relative rounded-[12px] w-[95vw] max-w-[400px] p-[48px] flex flex-col items-center gap-[16px] bg-[#151619] border border-[#212328] shadow-2xl">
          <div className="flex gap-[12px]">
            {[0, 1, 2].map((i) => (
              <svg key={i} width="40" height="40" fill="none" viewBox="0 0 24 24">
                <path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" stroke="#74757b" strokeWidth={1.5} />
                <path d="M12 3v6h6" stroke="#74757b" strokeWidth={1.5} />
                <line x1="8" y1="13" x2="16" y2="13" stroke="#74757b" strokeWidth={1.5} />
                <line x1="8" y1="16" x2="14" y2="16" stroke="#74757b" strokeWidth={1.5} />
              </svg>
            ))}
          </div>
          <span className="text-white text-[13px] font-medium mt-[8px]">Creating Invoice...</span>
        </div>
      )}
    </div>
  );
}
