"use client";

import { useState } from "react";

const ROW_ACTIONS = ["Review", "Review", "Review", "Send", "Reuse", "Send"];

const COLS = [
  { label: "Order Number",  key: "id"           },
  { label: "Request Date",  key: "requestDate"  },
  { label: "Company",       key: "company"      },
  { label: "Country",       key: "country"      },
  { label: "Bank",          key: "bank"         },
  { label: "Applicant Name",key: "name"         },
  { label: "Start Time",    key: "startTime"    },
  { label: "End Time",      key: "endTime"      },
  { label: "Availability",  key: "availability" },
  { label: "Actions",       key: null           },
];

function SearchBar({ value, onChange }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative shrink-0 w-full sm:w-auto">
      <svg
        className="absolute left-[10px] top-1/2 -translate-y-1/2 pointer-events-none"
        width={12} height={12} fill="none" viewBox="0 0 24 24"
        stroke="#66686f" strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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
      <div className="text-[#cdd0d6] text-[12px] font-medium leading-[16px] whitespace-nowrap">
        {primary}
      </div>
      <div className="text-[#424549] text-[10px] font-normal leading-[14px] mt-[2px] whitespace-nowrap">
        {secondary}
      </div>
    </div>
  );
}

export default function RecentOrdersTable({ data = [], searchTerm, onSearchChange }) {
  return (
    <div className="bg-[#1a1a1a] rounded-[12px] overflow-hidden">
      {/* Card header */}
      <div className="flex flex-wrap items-start justify-between gap-[16px] px-[24px] pt-[20px] pb-[16px]">
        <div>
          <h2 className="m-0 text-[#d9d9db] text-[22px] font-normal leading-[24px] tracking-[-0.01em]">
            Recent Orders
          </h2>
          <p className="mt-[4px] mb-0 text-[#74757b] text-[13px] font-normal leading-[18px]">
            Review and update your most recent orders.
          </p>
        </div>
        <SearchBar value={searchTerm} onChange={onSearchChange} />
      </div>

      {/* Scrollable table — same pattern as Orders / Invoices pages */}
      <div className="overflow-x-auto scrolling-touch">
        <table className="w-full border-collapse min-w-[1100px]">

          <thead className="bg-[#111111] border-t border-b border-[#1f1f1f]">
            <tr>
              {COLS.map((col, idx) => (
                <th
                  key={col.label}
                  className={`h-[40px] text-left text-[#545659] text-[11px] font-normal tracking-[0.03em] uppercase select-none whitespace-nowrap ${
                    idx === 0
                      ? "pl-[24px] pr-[16px]"
                      : idx === COLS.length - 1
                      ? "pl-[16px] pr-[24px]"
                      : "px-[16px]"
                  }`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={COLS.length}
                  className="py-[40px] text-center text-[#424549] text-[12px]"
                >
                  No orders match your search.
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr
                  key={`${row.id}-${i}`}
                  className="hover:bg-[rgba(255,255,255,0.018)] transition-colors duration-100 border-b border-[#1f1f1f] last:border-b-0"
                >
                  {/* Order Number */}
                  <td className="pl-[24px] pr-[16px] py-[12px] h-[60px] align-middle text-[#727479] text-[12px] font-medium whitespace-nowrap">
                    {row.id}
                  </td>

                  {/* Request Date */}
                  <td className="px-[16px] py-[12px] h-[60px] align-middle text-[#727479] text-[12px] font-normal whitespace-nowrap">
                    {row.requestDate}
                  </td>

                  {/* Company */}
                  <td className="px-[16px] py-[12px] h-[60px] align-middle max-w-[200px]">
                    <span className="block text-[#cdd0d6] text-[12px] font-normal truncate">
                      {row.company}
                    </span>
                  </td>

                  {/* Country */}
                  <td className="px-[16px] py-[12px] h-[60px] align-middle text-[#727479] text-[12px] font-normal whitespace-nowrap">
                    {row.country}
                  </td>

                  {/* Bank */}
                  <td className="px-[16px] py-[12px] h-[60px] align-middle whitespace-nowrap">
                    <TwoLineCell primary={row.bank} secondary={row.branch} />
                  </td>

                  {/* Representative */}
                  <td className="px-[16px] py-[12px] h-[60px] align-middle text-[#727479] text-[12px] font-normal whitespace-nowrap">
                    {row.name}
                  </td>

                  {/* Start Time */}
                  <td className="px-[16px] py-[12px] h-[60px] align-middle whitespace-nowrap">
                    <TwoLineCell primary={row.startTime} secondary={row.requestDate} />
                  </td>

                  {/* End Time */}
                  <td className="px-[16px] py-[12px] h-[60px] align-middle whitespace-nowrap">
                    <TwoLineCell primary={row.endTime} secondary={row.requestDate} />
                  </td>

                  {/* Availability */}
                  <td className="px-[16px] py-[12px] h-[60px] align-middle">
                    <AvailBadge value={row.availability ?? "Online"} />
                  </td>

                  {/* Actions */}
                  <td className="pl-[16px] pr-[24px] py-[12px] h-[60px] align-middle">
                    <ActionBtn label={ROW_ACTIONS[i] ?? "Review"} />
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}
