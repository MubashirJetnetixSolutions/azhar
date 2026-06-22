"use client";

import { useState } from "react";

const ROW_ACTIONS = ["Review", "Review", "Review", "Start", "Reuse", "Send"];

const COLS = [
  "Order Number",
  "Company",
  "Country",
  "Bank",
  "Request Date",
  "Start Time",
  "Assigned to",
  "Availability",
  "Actions",
];

function SearchBar({ value, onChange }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative shrink-0 w-full sm:w-auto">
      <svg
        className="absolute left-[10px] top-1/2 -translate-y-1/2 pointer-events-none"
        width={12}
        height={12}
        fill="none"
        viewBox="0 0 24 24"
        stroke="#66686f"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        placeholder="Find Orders"
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full sm:w-[220px] h-[34px] pl-[30px] pr-[12px] bg-[#141519] rounded-[7px] text-[#9b9ca1] text-[12px] leading-[12px] outline-none border transition-[border-color] duration-[120ms] ${
          focused ? "border-[#3b3d42]" : "border-[#252525]"
        }`}
      />
    </div>
  );
}

function AvailBadge({ value }) {
  const online = value === "Online";
  return (
    <span
      className={`inline-block text-[11px] font-medium leading-[14px] py-[2px] px-[10px] rounded-[5px] whitespace-nowrap border ${
        online
          ? "text-[#10b981] bg-[rgba(16,185,129,0.12)] border-[rgba(16,185,129,0.28)]"
          : "text-[#ef4444] bg-[rgba(239,68,68,0.12)] border-[rgba(239,68,68,0.28)]"
      }`}
    >
      {value}
    </span>
  );
}

function ActionBtn({ label }) {
  return (
    <button
      type="button"
      className="inline-flex items-center justify-center min-w-[52px] h-[30px] px-[14px] text-[12px] font-normal leading-none rounded-[7px] cursor-pointer whitespace-nowrap text-[#d6d7da] border border-[#3b3d42] bg-transparent hover:bg-[rgba(255,255,255,0.03)] hover:border-[#484b54] transition-[background-color,border-color] duration-[120ms]"
    >
      {label}
    </button>
  );
}

function TwoLineCell({ primary, secondary }) {
  return (
    <div>
      <div className="text-[#cdd0d6] text-[12px] font-medium leading-[16px]">
        {primary}
      </div>
      <div className="text-[#424549] text-[10px] font-normal leading-[14px] mt-[2px]">
        {secondary}
      </div>
    </div>
  );
}

function OrderRow({ row, action }) {
  return (
    <div
      className="grid gap-x-[16px] transition-colors duration-100 bg-transparent hover:bg-[rgba(255,255,255,0.018)] grid-cols-[minmax(88px,0.85fr)_minmax(160px,1.65fr)_minmax(110px,1fr)_minmax(96px,0.9fr)_minmax(100px,0.95fr)_minmax(100px,0.95fr)_minmax(96px,0.9fr)_minmax(88px,0.8fr)_minmax(72px,0.75fr)]"
    >
      <div className="flex items-center py-[12px] text-[#727479] text-[12px] font-medium leading-[16px]">
        {row.id}
      </div>

      <div className="flex items-center py-[12px] text-[#cdd0d6] text-[12px] font-normal leading-[16px] overflow-hidden text-ellipsis whitespace-nowrap">
        {row.company}
      </div>

      <div className="flex items-center py-[12px] text-[#727479] text-[12px] font-normal leading-[16px]">
        {row.country}
      </div>

      <div className="flex items-center py-[12px]">
        <TwoLineCell primary={row.bank} secondary={row.branch} />
      </div>

      <div className="flex items-center py-[12px] text-[#727479] text-[12px] font-normal leading-[16px]">
        {row.requestDate}
      </div>

      <div className="flex items-center py-[12px]">
        <TwoLineCell primary={row.startTime} secondary={row.requestDate} />
      </div>

      <div className="flex items-center py-[12px] text-[#9ea0a6] text-[12px] font-normal leading-[16px]">
        {row.assignedTo}
      </div>

      <div className="flex items-center py-[12px]">
        <AvailBadge value={row.availability ?? "Online"} />
      </div>

      <div className="flex items-center py-[12px]">
        <ActionBtn label={action} />
      </div>
    </div>
  );
}

export default function RecentOrdersTable({ data = [], searchTerm, onSearchChange }) {
  return (
    <div className="bg-[#1a1a1a] rounded-[12px] pt-[20px] pr-[24px] pl-[24px] pb-[16px] w-full min-w-0 box-border">
      {/* Card header */}
      <div className="flex flex-wrap items-start justify-between gap-[16px] mb-0">
        <div className="mb-4">
          <h2 className="m-0 text-[#d9d9db] text-[22px] font-normal leading-[24px] tracking-[-0.01em]">
            Recent Orders
          </h2>
          <p className="mt-[4px] mb-0 text-[#74757b] text-[13px] font-normal leading-[18px]">
            Review and update your most recent orders.
          </p>
        </div>
        <SearchBar value={searchTerm} onChange={onSearchChange} />
      </div>

      {/* Column headers */}
      <div
        className="-mx-[24px] px-[24px] py-[14px] border-t border-[#1f1f1f] border-b border-[#1f1f1f] bg-[#111111]"
      >
        <div className="overflow-x-auto scrolling-touch">
          <div
            className="grid gap-x-[16px] min-w-[960px] grid-cols-[minmax(88px,0.85fr)_minmax(160px,1.65fr)_minmax(110px,1fr)_minmax(96px,0.9fr)_minmax(100px,0.95fr)_minmax(100px,0.95fr)_minmax(96px,0.9fr)_minmax(88px,0.8fr)_minmax(72px,0.75fr)]"
          >
            {COLS.map((label) => (
              <div
                key={label}
                className="text-[#888888] text-[12px] font-normal leading-[16px] whitespace-nowrap"
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Data rows */}
      <div className="overflow-x-auto scrolling-touch">
        <div className="min-w-[960px]">
          {data.length === 0 ? (
            <div className="py-[40px] text-center text-[#424549] text-[12px]">
              No orders match your search.
            </div>
          ) : (
            data.map((row, i) => (
              <OrderRow
                key={`${row.id}-${i}`}
                row={row}
                action={ROW_ACTIONS[i] ?? "Review"}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
