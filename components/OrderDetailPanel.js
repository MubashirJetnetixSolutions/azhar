"use client";

import { useState } from "react";
import { companies } from "@/data/mockData";
import AppSelect from "@/components/ui/AppSelect";

function statusClasses(status) {
  switch (status) {
    case "In Verification": return "bg-[rgba(234,179,8,0.08)] text-[#d9a71e] border-[rgba(234,179,8,0.2)]";
    case "New":             return "bg-[rgba(59,130,246,0.08)] text-[#3b82f6] border-[rgba(59,130,246,0.2)]";
    case "Reusable":        return "bg-[rgba(168,85,247,0.08)] text-[#a855f7] border-[rgba(168,85,247,0.2)]";
    case "Complete":        return "bg-[rgba(34,197,94,0.08)] text-[#22c55e] border-[rgba(34,197,94,0.2)]";
    case "Flagged":         return "bg-[rgba(239,68,68,0.08)] text-[#ef4444] border-[rgba(239,68,68,0.2)]";
    default:                return "bg-[#1f2025] text-[#9ea0a6] border-[#2e3037]";
  }
}

const CHECKS = [
  {
    label: "Bank Availability",
    value: "Online",
    badgeClass: "bg-[rgba(34,197,94,0.08)] text-[#22c55e] border-[rgba(34,197,94,0.2)]",
    icon: (
      <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="#22c55e" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: "UBO Screening",
    value: "Verified",
    badgeClass: "bg-[rgba(34,197,94,0.08)] text-[#22c55e] border-[rgba(34,197,94,0.2)]",
    icon: (
      <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="#22c55e" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: "Financial Review",
    value: "In Progress",
    badgeClass: "bg-[rgba(234,179,8,0.08)] text-[#d9a71e] border-[rgba(234,179,8,0.2)]",
    icon: (
      <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="#d9a71e" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
  },
  {
    label: "Sanctions Check",
    value: "Pending",
    badgeClass: "bg-[#1f2025] text-[#9ea0a6] border-[#2e3037]",
    icon: (
      <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="#4b5563" strokeWidth={2}>
        <circle cx={12} cy={12} r={9} />
      </svg>
    ),
  },
];

const SHAREHOLDERS = [
  { name: "Li Wei",    role: "CEO",         pct: "62%" },
  { name: "Zhang Hui", role: "Shareholder", pct: "28%" },
  { name: "Chen Feng", role: "Shareholder", pct: "10%" },
];

const ASSIGNEE_OPTIONS = [
  { value: "Sufyan Rehan", label: "Sufyan Rehan" },
  { value: "Usama Aslam",  label: "Usama Aslam"  },
  { value: "Arslan",       label: "Arslan"        },
];

export default function OrderDetailPanel({ order, onClose }) {
  const [assignedTo, setAssignedTo] = useState(null);

  if (!order) return null;

  const company = companies.find((c) => c.name === order.company) || {};

  const orderInfoRows = [
    { label: "LC Reference", value: "LC-PK-0091" },
    { label: "Bank",         value: order.bank },
    { label: "Branch",       value: order.branch },
    { label: "Date",         value: order.requestDate || "12 Jun 2024" },
    { label: "Analyst",      value: order.assignedTo || "Ayesha Khan" },
    { label: "Source",       value: "Email Intake" },
  ];

  const financials = [
    { label: "Revenue",      value: company.lastRevenue || "$12.4M" },
    { label: "Assets",       value: "$8.1M" },
    { label: "Net Profit",   value: "$1.9M" },
    { label: "Capital",      value: "$3.0M" },
    { label: "Employees",    value: "142" },
    { label: "Years Active", value: "11" },
  ];

  return (
    <div className="h-full flex flex-col bg-[#131417] text-white border-l border-[#212328] overflow-hidden">

      {/* ── Drawer header (fixed) ── */}
      <div className="px-[24px] pt-[16px] pb-[14px] border-b border-[#1e2025] shrink-0">

        {/* Row 1: arrow + breadcrumb (left) | status badge + actions (right) */}
        <div className="flex items-center justify-between gap-[12px]">
          <div className="flex items-center gap-[10px] min-w-0">
            <button
              onClick={onClose}
              className="text-[#4b4d55] hover:text-[#9ea0a6] transition-colors cursor-pointer shrink-0"
              aria-label="Close"
            >
              <svg width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
            <span className="text-[11px] leading-none whitespace-nowrap">
              <span
                className="text-[#555] hover:text-[#9ea0a6] transition-colors cursor-pointer"
                onClick={onClose}
              >
                Orders
              </span>
              <span className="text-[#333] mx-[5px]">›</span>
              <span className="text-[#74757b]">#{order.id}</span>
            </span>
          </div>

          <div className="flex items-center gap-[7px] shrink-0">
            <span className={`text-[10px] font-medium leading-none py-[4px] px-[9px] rounded-[5px] border ${statusClasses(order.status)}`}>
              {order.status}
            </span>
            <button className="h-[28px] px-[11px] text-[11px] font-normal rounded-[6px] text-[#cdd0d6] border border-[#2a2c32] bg-[#18191d] hover:bg-[#202228] cursor-pointer flex items-center gap-[5px] transition-colors whitespace-nowrap">
              <svg width={11} height={11} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
              View Email
            </button>
            <button className="h-[28px] px-[11px] text-[11px] font-normal rounded-[6px] text-[#cdd0d6] border border-[#2a2c32] bg-[#18191d] hover:bg-[#202228] cursor-pointer flex items-center gap-[5px] transition-colors whitespace-nowrap">
              <svg width={11} height={11} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
              Edit
            </button>
          </div>
        </div>

        {/* Row 2: order title — indented to align with breadcrumb text */}
        <h1 className="text-[17px] font-semibold text-white leading-none tracking-[-0.012em] mt-[10px] ml-[25px] truncate">
          {order.company}
        </h1>
      </div>

      {/* ── Scrollable content ── */}
      <div className="flex-1 overflow-y-auto p-[20px] space-y-[16px]">

      {/* ── Verification Status ── */}
      <div className="bg-[#151619] border border-[#212328] rounded-[12px] p-[16px_20px]">
        {/* Card header */}
        <div className="flex items-center justify-between mb-[16px]">
          <h2 className="text-[14px] font-semibold text-white leading-none">Verification Status</h2>
          <div className="flex items-center gap-[8px]">
            <span className="text-[11px] text-[#74757b]">Assigned to</span>
            <div className="w-[140px]">
              <AppSelect
                variant="default"
                size="sm"
                value={assignedTo ?? (order.assignedTo ? { value: order.assignedTo, label: order.assignedTo } : null)}
                onChange={setAssignedTo}
                options={[
                  { value: order.assignedTo, label: order.assignedTo },
                  ...ASSIGNEE_OPTIONS.filter((o) => o.value !== order.assignedTo),
                ]}
              />
            </div>
          </div>
        </div>

        {/* Check items */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-[12px]">
          {CHECKS.map((check) => (
            <div key={check.label} className="bg-[#111215] border border-[#212328] rounded-[8px] p-[12px] flex flex-col gap-[10px]">
              <div className="flex items-center gap-[6px]">
                {check.icon}
                <span className="text-[11px] font-medium text-[#cdd0d6] leading-tight">{check.label}</span>
              </div>
              <span className={`self-start text-[10px] font-medium leading-none py-[3px] px-[7px] rounded-[4px] border ${check.badgeClass}`}>
                {check.value}
              </span>
            </div>
          ))}
        </div>

        {/* Cached report row */}
        <div className="flex items-center justify-between mt-[16px] pt-[16px] border-t border-[#212328]">
          <div className="flex items-center gap-[6px] text-[11px] text-[#74757b]">
            <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89H18" />
            </svg>
            <span>Cached 2025 report available for reuse.</span>
          </div>
          <button className="h-[30px] px-[14px] text-[11px] font-medium rounded-[6px] bg-[#2563eb] hover:bg-[#1d4ed8] text-white cursor-pointer transition-colors flex items-center gap-[6px]">
            <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
            </svg>
            Reuse Report
          </button>
        </div>
      </div>

      {/* ── Company Profile + Order Info ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
        {/* Company Profile */}
        <div className="bg-[#151619] border border-[#212328] rounded-[12px] p-[20px]">
          <h2 className="text-[14px] font-semibold text-white leading-none">Company Profile</h2>
          <p className="text-[11px] text-[#74757b] mt-[4px]">Registry-sourced entity details</p>

          <div className="grid grid-cols-2 gap-x-[16px] gap-y-[14px] mt-[16px]">
            <div>
              <p className="text-[10px] text-[#74757b] uppercase tracking-[0.02em] mb-[4px]">Company Name</p>
              <p className="text-[12px] font-medium text-white leading-tight truncate">{order.company}</p>
            </div>
            <div>
              <p className="text-[10px] text-[#74757b] uppercase tracking-[0.02em] mb-[4px]">Country</p>
              <div className="flex items-center gap-[4px] text-[12px] font-medium text-white">
                <svg width={11} height={11} fill="none" viewBox="0 0 24 24" stroke="#74757b" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx={12} cy={10} r={3} />
                </svg>
                {order.country}
              </div>
            </div>
            <div>
              <p className="text-[10px] text-[#74757b] uppercase tracking-[0.02em] mb-[4px]">Registry Source</p>
              <p className="text-[12px] font-medium text-white">QCC</p>
            </div>
            <div>
              <p className="text-[10px] text-[#74757b] uppercase tracking-[0.02em] mb-[4px]">Registration No.</p>
              <p className="text-[12px] font-medium text-white truncate">{company.registration || "9144-0300-MA5E"}</p>
            </div>
          </div>

          <div className="mt-[14px] pt-[14px] border-t border-[#212328]">
            <p className="text-[10px] text-[#74757b] uppercase tracking-[0.02em] mb-[6px]">Registered Address</p>
            <p className="text-[11px] text-[#cdd0d6] leading-[16px]">
              Room 2105, Block B, Futian District, Shenzhen, Guangdong 518000, China
            </p>
          </div>
        </div>

        {/* Order Info */}
        <div className="bg-[#151619] border border-[#212328] rounded-[12px] p-[20px]">
          <h2 className="text-[14px] font-semibold text-white leading-none mb-[16px]">Order Info</h2>
          <div>
            {orderInfoRows.map((row) => (
              <div key={row.label} className="flex items-center justify-between py-[9px] border-b border-[#212328] last:border-0">
                <span className="text-[12px] text-[#74757b]">{row.label}</span>
                <span className="text-[12px] text-white font-medium text-right max-w-[200px] truncate">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Financials + Shareholders ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
        {/* Financials */}
        <div className="bg-[#151619] border border-[#212328] rounded-[12px] p-[20px]">
          <h2 className="text-[14px] font-semibold text-white leading-none">Financials</h2>
          <p className="text-[11px] text-[#74757b] mt-[4px] mb-[16px]">FY2024 reported figures</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-[10px]">
            {financials.map((stat) => (
              <div key={stat.label} className="bg-[#111215] border border-[#212328] rounded-[8px] p-[12px]">
                <p className="text-[10px] text-[#74757b] leading-none mb-[8px]">{stat.label}</p>
                <p className="text-[18px] font-semibold text-white leading-none tracking-[-0.01em]">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Shareholders */}
        <div className="bg-[#151619] border border-[#212328] rounded-[12px] p-[20px]">
          <h2 className="text-[14px] font-semibold text-white leading-none">Shareholders</h2>
          <p className="text-[11px] text-[#74757b] mt-[4px] mb-[16px]">Each shareholders percentage of shares</p>

          <div>
            {SHAREHOLDERS.map((sh) => (
              <div key={sh.name} className="flex items-center justify-between py-[12px] border-b border-[#212328] last:border-0">
                <div>
                  <p className="text-[13px] font-medium text-white leading-none">{sh.name}</p>
                  <p className="text-[11px] text-[#74757b] mt-[4px] leading-none">{sh.role}</p>
                </div>
                <span className="text-[11px] font-medium text-white bg-[#111215] border border-[#2e3037] px-[9px] py-[4px] rounded-[6px]">
                  {sh.pct}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      </div>
    </div>
  );
}
