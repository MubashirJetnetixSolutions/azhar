"use client";

import { useState, useMemo, useEffect } from "react";
import { invoices } from "@/data/mockData";
import CreateInvoiceModal from "@/components/modals/CreateInvoiceModal";
import DeleteConfirmModal from "@/components/modals/DeleteConfirmModal";
import AppSelect from "@/components/ui/AppSelect";
import StatusBadgeSelect from "@/components/ui/StatusBadgeSelect";

// ── Toast ─────────────────────────────────────────────────
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
      <div className={`w-[22px] h-[22px] rounded-full flex items-center justify-center shrink-0 ${
        ok
          ? "bg-[rgba(16,185,129,0.15)] border border-[rgba(16,185,129,0.25)]"
          : "bg-[rgba(239,68,68,0.15)] border border-[rgba(239,68,68,0.25)]"
      }`}>
        {ok ? (
          <svg width={11} height={11} fill="none" viewBox="0 0 24 24" stroke="#10b981" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg width={11} height={11} fill="none" viewBox="0 0 24 24" stroke="#ef4444" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
      </div>
      <p className="text-[13px] text-white">{message}</p>
    </div>
  );
}

const PER_PAGE = 7;

const summaryCards = [
  { label: "Paid Invoice Amount", value: "EUR 1200.00", countLabel: "Number of Invoices", count: "75" },
  { label: "Pending Invoice Amount", value: "EUR 1200.00", countLabel: "Number of Invoices", count: "75" },
  { label: "Total Texes", value: "EUR 1200.00", countLabel: "Number of Invoices", count: "75" }
];

export default function InvoicesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [createInvoiceOpen, setCreateInvoiceOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);

  // State-driven additions
  const [invoiceType, setInvoiceType] = useState({ value: "Normal", label: "Normal" });
  const [period, setPeriod] = useState({ value: "Daily", label: "Daily" });
  const [tags, setTags] = useState(null);

  // Enrich mock data with originalIndex to reliably update individual rows
  const initialInvoices = useMemo(() => {
    return invoices.map((row, idx) => ({ ...row, originalIndex: idx }));
  }, []);
  const [invoiceList, setInvoiceList] = useState(initialInvoices);

  const handleStatusChange = (originalIndex, newStatus) => {
    setInvoiceList(prev =>
      prev.map(row => (row.originalIndex === originalIndex ? { ...row, status: newStatus } : row))
    );
  };

  // Filtering
  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return invoiceList;
    return invoiceList.filter(row =>
      ["id", "bank", "branch", "company", "amount", "status"].some(k =>
        String(row[k] ?? "").toLowerCase().includes(q)
      )
    );
  }, [searchTerm, invoiceList]);

  // Sorting
  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const av = String(a[sortKey] ?? "");
      const bv = String(b[sortKey] ?? "");
      return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
    });
  }, [filtered, sortKey, sortDir]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sorted.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const pageRows = sorted.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  function handleSort(k) {
    if (sortKey === k) {
      setSortDir(d => d === "asc" ? "desc" : "asc");
    } else {
      setSortKey(k);
      setSortDir("asc");
    }
  }

  // Active Summary Cards based on Invoice Type Selector
  const activeSummaryCards = useMemo(() => {
    if (invoiceType?.value === "SMEs") {
      return summaryCards.filter(c => c.label !== "Total Texes" && c.label !== "Total Taxes");
    }
    return summaryCards;
  }, [invoiceType]);

  function renderStatusBadge(row) {
    return (
      <StatusBadgeSelect
        value={row.status ?? "Paid"}
        onChange={(newVal) => handleStatusChange(row.originalIndex, newVal)}
      />
    );
  }

  return (
    <div className="space-y-[24px] py-4 px-4 md:py-5 md:px-7">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-[22px] font-bold text-white tracking-[-0.019em]">Invoices</h1>
        <div className="flex items-center gap-[8px]">
          {/* Invoice Type Dropdown Selector */}
          <div className="w-[110px]">
            <AppSelect
              variant="default"
              size="sm"
              value={invoiceType}
              onChange={setInvoiceType}
              options={[
                { value: "Normal", label: "Normal" },
                { value: "SMEs",   label: "SMEs"   },
              ]}
            />
          </div>
          {/* Period Dropdown */}
          <div className="w-[110px]">
            <AppSelect
              variant="default"
              size="sm"
              value={period}
              onChange={setPeriod}
              options={[
                { value: "Daily",   label: "Daily"   },
                { value: "Weekly",  label: "Weekly"  },
                { value: "Monthly", label: "Monthly" },
                { value: "Quarterly", label: "Quarterly" },
                { value: "Yearly", label: "Yearly" },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className={`grid gap-[16px] transition-all duration-300 ${invoiceType?.value === "SMEs" ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"}`}>
        {activeSummaryCards.map((card) => (
          <div
            key={card.label}
            className="relative bg-[#151619] border border-[#212328] rounded-[12px] p-[16px_20px_16px_28px] overflow-hidden flex items-center justify-between min-h-[80px]"
          >
            {/* Vertical Accent Strip */}
            <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#2563eb]"></div>
            <div>
              <p className="text-[#74757b] text-[11px] font-normal tracking-[0.02em] mb-[4px]">{card.label}</p>
              <p className="text-white text-[22px] font-semibold leading-none tracking-[-0.01em]">{card.value}</p>
            </div>
            <div className="text-right">
              <p className="text-[#74757b] text-[11px] font-normal tracking-[0.02em] mb-[4px]">{card.countLabel}</p>
              <p className="text-white text-[26px] font-semibold leading-none tracking-[-0.01em]">{card.count}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Table Card Container */}
      <div className="bg-[#151619] border border-[#212328] rounded-[12px] overflow-hidden">
        {/* Header Section */}
        <div className="flex items-center justify-between p-[24px_24px_16px_24px] flex-wrap gap-[16px]">
          <div>
            <h2 className="m-0 text-[#dce0e8] text-[16px] font-semibold leading-[22px] tracking-[-0.01em]">
              Invoices
            </h2>
            <p className="mt-[4px] mb-0 text-[#74757b] text-[12px] leading-[16px] font-normal">
              Review, download and edit invoices
            </p>
          </div>
          <div className="flex items-center gap-[12px]">
            {/* Tags Select */}
            <div className="w-[110px]">
              <AppSelect
                variant="default"
                size="md"
                value={tags}
                onChange={setTags}
                placeholder="Tags"
                isClearable
                options={[{ value: "Tags", label: "Tags" }]}
              />
            </div>
            {/* Search Input */}
            <div className="relative">
              <svg
                className="absolute left-[12px] top-1/2 -translate-y-1/2 pointer-events-none"
                width={13}
                height={13}
                fill="none"
                viewBox="0 0 24 24"
                stroke="#545659"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Find Orders"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
                className="w-full sm:w-[240px] h-[34px] pl-[34px] pr-[12px] rounded-[6px] bg-[#111215] text-[#9ea0a6] text-[12px] leading-none outline-none border border-[#24252a] focus:border-[#3e4047] transition-colors duration-120"
              />
            </div>
            {/* Create Invoice Button */}
            <button
              onClick={() => setCreateInvoiceOpen(true)}
              className="h-[34px] px-[16px] rounded-[6px] text-[12px] font-medium text-white bg-[#2563eb] hover:bg-[#1d4ed8] active:bg-[#1e40af] cursor-pointer transition-colors duration-100 whitespace-nowrap flex items-center gap-[6px]"
            >
              <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Create Invoice
            </button>
          </div>
        </div>

        {/* Invoices Table */}
        <div className="overflow-x-auto scrolling-touch">
          <table className="w-full border-collapse min-w-[1000px]">
            <thead className="bg-[#18191d] border-t border-b border-[#212328]">
              <tr>
                {[
                  { label: "Invoice Number", key: "id" },
                  { label: "Bank", key: "bank" },
                  { label: "Branch", key: "branch" },
                  { label: "Type", key: "type" },
                  { label: "Company", key: "company" },
                  { label: "Creation Date", key: "creationDate" },
                  { label: "Amount", key: "amount" },
                  { label: "Due Date", key: "dueDate" },
                  { label: "Status", key: "status" },
                  { label: "Actions", key: null }
                ].map((col, idx) => (
                  <th
                    key={col.label}
                    onClick={col.key ? () => handleSort(col.key) : undefined}
                    className={`h-[40px] px-[16px] text-left text-[#545659] text-[11px] font-normal tracking-[0.03em] uppercase select-none ${
                      col.key ? "cursor-pointer hover:text-white" : "cursor-default"
                    } ${idx === 0 ? "pl-[24px]" : ""} ${idx === 8 ? "pr-[24px]" : ""}`}
                  >
                    <div className="flex items-center gap-[4px]">
                      {col.label}
                      {col.key && sortKey === col.key && (
                        <span className="text-[9px] text-[#9ea0a6]">
                          {sortDir === "asc" ? "▲" : "▼"}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageRows.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-[40px] text-center text-[#74757b] text-[12px]">
                    No invoices match your search.
                  </td>
                </tr>
              ) : (
                pageRows.map((row) => (
                  <tr
                    key={row.originalIndex}
                    className="hover:bg-[rgba(255,255,255,0.02)] transition-colors duration-100 border-b border-[#212328]"
                  >
                    <td className="pl-[24px] pr-[16px] py-[12px] h-[60px] text-[12px] text-[#9ea0a6] whitespace-nowrap align-middle">
                      {row.id}
                    </td>
                    <td className="px-[16px] py-[12px] h-[60px] text-[12px] text-[#cdd0d6] whitespace-nowrap align-middle">
                      {row.bank}
                    </td>
                    <td className="px-[16px] py-[12px] h-[60px] text-[12px] text-[#9ea0a6] whitespace-nowrap align-middle">
                      {row.branch}
                    </td>
                    <td className="px-[16px] py-[12px] h-[60px] text-[12px] text-[#cdd0d6] whitespace-nowrap align-middle">
                      {row.type}
                    </td>
                    <td className="px-[16px] py-[12px] h-[60px] text-[12px] text-[#cdd0d6] whitespace-nowrap max-w-[200px] truncate align-middle">
                      {row.company}
                    </td>
                    <td className="px-[16px] py-[12px] h-[60px] text-[12px] text-[#9ea0a6] whitespace-nowrap align-middle">
                      {row.creationDate}
                    </td>
                    <td className="px-[16px] py-[12px] h-[60px] text-[12px] text-[#cdd0d6] whitespace-nowrap align-middle">
                      {row.amount}
                    </td>
                    <td className="px-[16px] py-[12px] h-[60px] text-[12px] text-[#9ea0a6] whitespace-nowrap align-middle">
                      {row.dueDate}
                    </td>
                    <td className="px-[16px] py-[12px] h-[60px] align-middle">
                      {renderStatusBadge(row)}
                    </td>
                    <td className="pl-[16px] pr-[24px] py-[12px] h-[60px] align-middle">
                      <div className="flex items-center gap-[6px]">
                        {/* Edit Button */}
                        <button className="w-[32px] h-[32px] rounded-[6px] border border-[#373a42] bg-[#1e2027] hover:border-[#484b54] hover:bg-[#272b34] flex items-center justify-center text-[#cdd0d6] hover:text-white cursor-pointer transition-colors duration-100">
                          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        {/* Download Button */}
                        <button className="w-[32px] h-[32px] rounded-[6px] border border-[#373a42] bg-[#1e2027] hover:border-[#484b54] hover:bg-[#272b34] flex items-center justify-center text-[#cdd0d6] hover:text-white cursor-pointer transition-colors duration-100">
                          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        </button>
                        {/* Delete Button */}
                        <button
                          onClick={(e) => { e.stopPropagation(); setDeleteTarget(row); }}
                          className="w-[32px] h-[32px] rounded-[6px] border border-[#373a42] bg-[#1e2027] hover:border-red-900/50 hover:bg-[rgba(239,68,68,0.06)] flex items-center justify-center text-[#cdd0d6] hover:text-red-400 cursor-pointer transition-colors duration-100"
                        >
                          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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

        {/* Pagination Section */}
        <div className="flex items-center justify-between p-[14px_24px_16px_24px] border-t border-[#212328] flex-wrap gap-[12px]">
          <span className="text-[#74757b] text-[12px] font-normal">
            {sorted.length === 0
              ? "Showing 0 of 0 invoices"
              : `Showing ${pageRows.length} of ${searchTerm ? sorted.length : 62} invoices`}
          </span>
          <div className="flex items-center gap-[8px]">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={safePage === 1}
              className={`h-[28px] px-[12px] text-[11px] font-normal rounded-[6px] border border-[#212328] bg-[#111215] transition-colors duration-100 flex items-center gap-[4px] ${
                safePage === 1
                  ? "text-[#3e4047] cursor-not-allowed"
                  : "text-[#888] hover:bg-[#1c1d22] hover:text-white cursor-pointer"
              }`}
            >
              &lt; Prev
            </button>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              className={`h-[28px] px-[12px] text-[11px] font-normal rounded-[6px] border border-[#212328] bg-[#111215] transition-colors duration-100 flex items-center gap-[4px] ${
                safePage === totalPages
                  ? "text-[#3e4047] cursor-not-allowed"
                  : "text-[#888] hover:bg-[#1c1d22] hover:text-white cursor-pointer"
              }`}
            >
              Next &gt;
            </button>
          </div>
        </div>
      </div>

      <CreateInvoiceModal
        open={createInvoiceOpen}
        onClose={() => setCreateInvoiceOpen(false)}
        onSuccess={() => setToast({ type: "success", message: "Invoice created successfully.", id: Date.now() })}
      />
      <DeleteConfirmModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => {
          setInvoiceList((prev) => prev.filter((r) => r.originalIndex !== deleteTarget?.originalIndex));
          setDeleteTarget(null);
          setToast({ type: "success", message: "Invoice deleted successfully.", id: Date.now() });
        }}
      />

      {toast && (
        <Toast
          key={toast.id}
          type={toast.type}
          message={toast.message}
          onDismiss={() => setToast(null)}
        />
      )}
    </div>
  );
}
