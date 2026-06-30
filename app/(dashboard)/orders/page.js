"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { orders } from "@/data/mockData";
import CreateOrderModal from "@/components/modals/CreateOrderModal";
import OrderDetailPanel from "@/components/OrderDetailPanel";

// ── Order Status Select ──────────────────────────────────────────────────────

const STATUS_CONFIG = {
  "New":                { color: "#3b82f6", bg: "rgba(59,130,246,0.08)",  border: "rgba(59,130,246,0.2)"  },
  "Customer Responded": { color: "#d9a71e", bg: "rgba(234,179,8,0.08)",   border: "rgba(234,179,8,0.2)"   },
  "For Reviewal":       { color: "#a855f7", bg: "rgba(168,85,247,0.08)",  border: "rgba(168,85,247,0.2)"  },
  "Ready to send":          { color: "#22c55e", bg: "rgba(34,197,94,0.08)",   border: "rgba(34,197,94,0.2)"   },
  "Flagged":          { color: "#c5222aff", bg: "rgba(197, 59, 34, 0.08)",   border:"rgba(239,68,68,0.2)"   },
};

const STATUS_KEYS = Object.keys(STATUS_CONFIG);

// Custom portal-based dropdown — bypasses all table overflow/z-index/event
// propagation issues without relying on react-select's internal event handling.
function OrderStatusSelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  // pos uses `top` when opening below, `bottom` when opening above (fixed coords)
  const [pos, setPos]   = useState({ top: 0, bottom: undefined, left: 0 });
  const triggerRef      = useRef(null);
  const menuRef         = useRef(null);

  const cfg = STATUS_CONFIG[value] ?? { color: "#9ea0a6", bg: "#1f2025", border: "#2e3037" };

  // ~29px per option × 4 options + 8px padding
  const MENU_H = 124;

  const computePos = () => {
    if (!triggerRef.current) return;
    const rect       = triggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const openAbove  = spaceBelow < MENU_H && spaceAbove > spaceBelow;
    setPos(openAbove
      ? { top: undefined, bottom: window.innerHeight - rect.top + 4, left: rect.left }
      : { top: rect.bottom + 4, bottom: undefined,                   left: rect.left }
    );
  };

  const toggle = (e) => {
    e.stopPropagation();
    if (open) { setOpen(false); return; }
    computePos();
    setOpen(true);
  };

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (
        !triggerRef.current?.contains(e.target) &&
        !menuRef.current?.contains(e.target)
      ) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  // Recompute position on scroll or resize (handles zoom changes too)
  useEffect(() => {
    if (!open) return;
    window.addEventListener("scroll", computePos, true);
    window.addEventListener("resize", computePos);
    return () => {
      window.removeEventListener("scroll", computePos, true);
      window.removeEventListener("resize", computePos);
    };
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {/* Badge trigger */}
      <div
        ref={triggerRef}
        onClick={toggle}
        style={{
          display: "inline-flex", alignItems: "center", gap: 4,
          fontSize: 10, fontWeight: 500, lineHeight: 1,
          borderRadius: 4, padding: "4px 6px 4px 8px",
          border: `1px solid ${cfg.border}`, background: cfg.bg, color: cfg.color,
          cursor: "pointer", userSelect: "none", whiteSpace: "nowrap",
          transition: "opacity 100ms",
        }}
      >
        {value}
        <svg width="8" height="8" fill="none" viewBox="0 0 24 24" stroke={cfg.color} strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </div>

      {/* Options menu — portalled to document.body at computed fixed position */}
      {open && typeof document !== "undefined" && createPortal(
        <div
          ref={menuRef}
          onMouseDown={(e) => e.stopPropagation()}
          style={{
            position: "fixed",
            top: pos.top,
            bottom: pos.bottom,
            left: pos.left,
            zIndex: 9999,
            background: "#111215",
            border: "1px solid #212328",
            borderRadius: 8,
            boxShadow: "0 8px 24px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.03)",
            minWidth: 170,
            padding: "4px",
            overflow: "hidden",
          }}
        >
          {STATUS_KEYS.map((status) => {
            const isSelected = status === value;
            return (
              <div
                key={status}
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(status);
                  setOpen(false);
                }}
                style={{
                  padding: "7px 10px",
                  fontSize: 11,
                  borderRadius: 6,
                  cursor: "pointer",
                  color: "#cdd0d6",
                  background: isSelected ? "rgba(37,99,235,0.12)" : "transparent",
                  transition: "background 80ms",
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) e.currentTarget.style.background = "transparent";
                }}
              >
                {status}
              </div>
            );
          })}
        </div>,
        document.body
      )}
    </>
  );
}

const PER_PAGE = 7;

const stats = [
  {
    label: "New Orders",
    value: "28",
    icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ea0a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
      </svg>
    )
  },
  {
    label: "For Reviewal",
    value: "14",
    icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ea0a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
        <path d="m9 14 2 2 4-4"></path>
      </svg>
    )
  },
  {
    label: "Reusable Reports",
    value: "9",
    icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ea0a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
      </svg>
    )
  },
  {
    label: "Flagged",
    value: "5",
    isRed: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>
    )
  }
];

const TABS = [
  { label: "All Orders", value: "all" },
  { label: "New Orders", value: "New" },
  { label: "Customer Responded", value: "Customer Responded" },
  { label: "For Reviewal", value: "For Reviewal" },
  { label: "Ready to send", value: "Ready to send" },
  { label: "Flagged", value: "Flaged" }
];

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  // Per-row status overrides keyed by composite id|company|date
  const [statusOverrides, setStatusOverrides] = useState({});

  const rowKey  = (row) => `${row.id}|${row.company}|${row.requestDate}`;
  const getStatus = (row) => statusOverrides[rowKey(row)] ?? row.status ?? "New";
  const setStatus = (row, val) =>
    setStatusOverrides((prev) => ({ ...prev, [rowKey(row)]: val }));

  // Filtering logic
  const filtered = useMemo(() => {
    let result = orders;

    // Filter by tab
    if (activeTab !== "all") {
      result = result.filter(o => o.status === activeTab);
    }

    // Filter by search query
    const q = search.trim().toLowerCase();
    if (q) {
      result = result.filter(r =>
        ["id", "company", "country", "bank", "branch", "assignedTo", "status"].some(k =>
          String(r[k] ?? "").toLowerCase().includes(q)
        )
      );
    }

    return result;
  }, [search, activeTab]);

  // Sorting logic
  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const av = String(a[sortKey] ?? "");
      const bv = String(b[sortKey] ?? "");
      return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
    });
  }, [filtered, sortKey, sortDir]);

  // Pagination logic
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

  // Helper to render availability badge
  function renderAvailability(value) {
    const isOnline = value === "Online";
    return (
      <span
        className={`inline-block text-[10px] font-medium leading-none py-[4px] px-[8px] rounded-[4px] border ${
          isOnline
            ? "bg-[rgba(34,197,94,0.08)] text-[#22c55e] border-[rgba(34,197,94,0.2)]"
            : "bg-[rgba(239,68,68,0.08)] text-[#ef4444] border-[rgba(239,68,68,0.2)]"
        }`}
      >
        {value}
      </span>
    );
  }

  // Helper to render status badge
  function renderStatus(value) {
    let classes = "";
    switch (value) {
      case "Customer Responded":
        classes = "bg-[rgba(234,179,8,0.08)] text-[#d9a71e] border-[rgba(234,179,8,0.2)]";
        break;
      case "New":
        classes = "bg-[rgba(59,130,246,0.08)] text-[#3b82f6] border-[rgba(59,130,246,0.2)]";
        break;
      case "For Reviewal":
        classes = "bg-[rgba(168,85,247,0.08)] text-[#a855f7] border-[rgba(168,85,247,0.2)]";
        break;
      case "Ready to send":
        classes = "bg-[rgba(34,197,94,0.08)] text-[#22c55e] border-[rgba(34,197,94,0.2)]";
        break;
      case "Flagged":
        classes = "bg-[rgba(239,68,68,0.08)] text-[#ef4444] border-[rgba(239,68,68,0.2)]";
        break;
      default:
        classes = "bg-[#1f2025] text-[#9ea0a6] border-[#2e3037]";
    }
    return (
      <span className={`inline-block text-[10px] font-medium leading-none py-[4px] px-[8px] rounded-[4px] border ${classes}`}>
        {value}
      </span>
    );
  }

  return (
    <div className="space-y-[24px] py-4 px-4 md:py-5 md:px-7">
      {/* Root Page Title */}
      <div>
        <h1 className="text-[22px] font-bold text-white tracking-[-0.019em]">Orders</h1>
      </div>

      {/* Grid of Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-[16px]">
        {stats.map((c) => (
          <div
            key={c.label}
            className="bg-[#151619] border border-[#212328] rounded-[12px] p-[16px_20px] flex items-center justify-between"
          >
            <div>
              <p className="text-[#74757b] text-[11px] font-normal tracking-[0.02em] uppercase mb-[6px]">
                {c.label}
              </p>
              <p className={`text-[26px] font-semibold leading-none tracking-[-0.01em] ${c.isRed ? "text-[#ef4444]" : "text-white"}`}>
                {c.value}
              </p>
            </div>
            <div className={`w-[36px] h-[36px] rounded-[8px] flex items-center justify-center border ${
              c.isRed
                ? "bg-[rgba(239,68,68,0.08)] border-[rgba(239,68,68,0.2)]"
                : "bg-[rgba(255,255,255,0.03)] border-[#2e3037]"
            }`}>
              {c.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Main Table Card Container */}
      <div className="bg-[#151619] border border-[#212328] rounded-[12px] overflow-hidden">
        {/* Header section with Actions */}
        <div className="flex items-center justify-between p-[24px_24px_16px_24px] flex-wrap gap-[16px]">
          <div>
            <h2 className="m-0 text-[#dce0e8] text-[16px] font-semibold leading-[22px] tracking-[-0.01em]">
              Orders
            </h2>
            <p className="mt-[4px] mb-0 text-[#74757b] text-[12px] leading-[16px] font-normal">
              Review, Reuse and Send order details to clients
            </p>
          </div>
          <div className="flex items-center gap-[12px]">
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
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full sm:w-[240px] h-[34px] pl-[34px] pr-[12px] rounded-[6px] bg-[#111215] text-[#9ea0a6] text-[12px] leading-none outline-none border border-[#24252a] focus:border-[#3e4047] transition-colors duration-120"
              />
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="h-[34px] px-[16px] text-[12px] font-medium rounded-[6px] bg-[#2563eb] hover:bg-[#1d4ed8] text-white cursor-pointer transition-colors duration-120 flex items-center justify-center"
            >
              Create Order
            </button>
          </div>
        </div>

        {/* Custom Navigation Tab Bar */}
        <div className="px-[24px] pb-[16px] overflow-x-auto">
          <div className="flex items-center gap-[4px] p-[4px] bg-[#111215] rounded-[8px] border border-[#212328] min-w-max">
            {TABS.map((tab) => {
              const active = activeTab === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => {
                    setActiveTab(tab.value);
                    setPage(1);
                  }}
                  className={`flex-1 py-[8px] text-[12px] leading-none rounded-[6px] cursor-pointer transition-colors duration-120 ${
                    active
                      ? "bg-[#22242a] text-white font-medium shadow-[0_2px_4px_rgba(0,0,0,0.12)]"
                      : "text-[#74757b] hover:text-[#9ea0a6] font-normal"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto scrolling-touch">
          <table className="w-full border-collapse min-w-[1000px]">
            <thead className="bg-[#18191d] border-t border-b border-[#212328]">
              <tr>
                {[
                  { label: "Order Number", key: "id" },
                  { label: "Request Date", key: "requestDate" },
                  { label: "Company", key: "company" },
                  { label: "Country", key: "country" },
                  { label: "Bank", key: null },
                  { label: "Applicant Name", key: 'name' },
                  { label: "Start Time", key: null },
                  { label: "End Time", key: null },
                  { label: "Report Date", key: "report_date" },
                //   { label: "Assigned to", key: "assignedTo" },
                  { label: "Availability", key: "availability" },
                  { label: "Status", key: "status" },
                  { label: "Actions", key: null }
                ].map((col, idx) => (
                  <th
                    key={col.label}
                    onClick={col.key ? () => handleSort(col.key) : undefined}
                    className={`h-[40px] px-[16px] text-left text-[#545659] text-[11px] font-normal tracking-[0.03em] uppercase select-none ${
                      col.key ? "cursor-pointer hover:text-white" : "cursor-default"
                    } ${idx === 0 ? "pl-[24px]" : ""} ${idx === 9 ? "pr-[24px]" : ""}`}
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
                  <td colSpan={10} className="p-[40px] text-center text-[#74757b] text-[12px]">
                    No orders match your search.
                  </td>
                </tr>
              ) : (
                pageRows.map((row, i) => (
                  <tr
                    key={`${row.id}-${i}`}
                    onClick={() => setSelectedOrder(row)}
                    className="cursor-pointer hover:bg-[rgba(255,255,255,0.02)] transition-colors duration-100 border-b border-[#212328]"
                  >
                    <td className="pl-[24px] pr-[16px] py-[12px] h-[60px] text-[12px] text-[#9ea0a6] whitespace-nowrap align-middle">
                      {row.id}
                    </td>
                    <td className="px-[16px] py-[12px] h-[60px] text-[12px] text-[#9ea0a6] whitespace-nowrap align-middle">
                      {row.requestDate}
                    </td>
                    <td className="px-[16px] py-[12px] h-[60px] text-[12px] text-[#cdd0d6] whitespace-nowrap max-w-[200px] truncate align-middle">
                      {row.company}
                    </td>
                    <td className="px-[16px] py-[12px] h-[60px] text-[12px] text-[#9ea0a6] whitespace-nowrap align-middle">
                      {row.country}
                    </td>
                    <td className="px-[16px] py-[12px] h-[60px] whitespace-nowrap align-middle">
                      <div>
                        <p className="text-[12px] text-[#cdd0d6] leading-[15px] font-normal">{row.bank}</p>
                        <p className="text-[10px] text-[#74757b] leading-[13px] mt-[1px] font-normal">{row.branch}</p>
                      </div>
                    </td>
                    <td className="px-[16px] py-[12px] h-[60px] text-[12px] text-[#9ea0a6] whitespace-nowrap align-middle">
                      {row.name}
                    </td>
                    <td className="px-[16px] py-[12px] h-[60px] whitespace-nowrap align-middle">
                      <div>
                        <p className="text-[12px] text-[#cdd0d6] leading-[15px] font-normal">{row.startTime}</p>
                        <p className="text-[10px] text-[#74757b] leading-[13px] mt-[1px] font-normal">{row.requestDate}</p>
                      </div>
                    </td>
                    <td className="px-[16px] py-[12px] h-[60px] whitespace-nowrap align-middle">
                      <div>
                        <p className="text-[12px] text-[#cdd0d6] leading-[15px] font-normal">{row.endTime}</p>
                        <p className="text-[10px] text-[#74757b] leading-[13px] mt-[1px] font-normal">{row.requestDate}</p>
                      </div>
                    </td>
                    <td className="px-[16px] py-[12px] h-[60px] text-[12px] text-[#9ea0a6] whitespace-nowrap align-middle">
                      {row.report_date}
                    </td>
                    {/* <td className="px-[16px] py-[12px] h-[60px] text-[12px] text-[#cdd0d6] whitespace-nowrap align-middle">
                      {row.assignedTo}
                    </td> */}
                    <td className="px-[16px] py-[12px] h-[60px] align-middle">
                      {renderAvailability(row.availability ?? "Online")}
                    </td>
                    <td className="px-[16px] py-[12px] h-[60px] align-middle">
                      <OrderStatusSelect
                        value={getStatus(row)}
                        onChange={(val) => setStatus(row, val)}
                      />
                    </td>
                    <td className="pl-[16px] pr-[24px] py-[12px] h-[60px] align-middle" onClick={(e) => e.stopPropagation()}>
                      <button
                        className="inline-flex items-center justify-center min-w-[58px] h-[28px] px-[14px] text-[11px] font-normal leading-none rounded-[6px] cursor-pointer whitespace-nowrap text-[#cdd0d6] border border-[#373a42] bg-[#1e2027] hover:border-[#484b54] hover:bg-[#272b34] transition-colors duration-100"
                      >
                        {row.action ?? "Review"}
                      </button>
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
              ? "Showing 0 of 0 orders"
              : `Showing ${pageRows.length} of ${search || activeTab !== "all" ? sorted.length : 62} orders`}
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

      {/* Create Order Modal */}
      <CreateOrderModal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* Right-side drawer overlay */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="flex-1 bg-[rgba(0,0,0,.50)]"
            onClick={() => setSelectedOrder(null)}
          />
          <div className="w-full md:w-[760px] shrink-0 h-full">
            <OrderDetailPanel order={selectedOrder} onClose={() => setSelectedOrder(null)} />
          </div>
        </div>
      )}
    </div>
  );
}
