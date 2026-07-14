"use client";

import { useState } from "react";
import AppSelect from "@/components/ui/AppSelect";

const COUNTRY_OPTIONS = [
  { value: "Pakistan",             label: "Pakistan"             },
  { value: "United Arab Emirates", label: "United Arab Emirates" },
  { value: "Saudi Arabia",         label: "Saudi Arabia"         },
  { value: "United Kingdom",       label: "United Kingdom"       },
  { value: "United States",        label: "United States"        },
  { value: "China",                label: "China"                },
  { value: "Germany",              label: "Germany"              },
  { value: "Italy",                label: "Italy"                },
  { value: "Australia",            label: "Australia"            },
];

const BANK_OPTIONS = [
  { value: "United Bank Limited",       label: "United Bank Limited"       },
  { value: "Muslim Commercial Bank",    label: "Muslim Commercial Bank"    },
  { value: "Habib Bank Limited",        label: "Habib Bank Limited"        },
  { value: "Bank Al Habib Limited",     label: "Bank Al Habib Limited"     },
  { value: "Allied Bank Limited",       label: "Allied Bank Limited"       },
  { value: "Bank Islami",               label: "Bank Islami"               },
  { value: "Dubai Islamic",             label: "Dubai Islamic"             },
  { value: "Meezan Bank Limited",       label: "Meezan Bank Limited"       },
  { value: "National Bank of Pakistan", label: "National Bank of Pakistan" },
];

const BRANCH_OPTIONS = [
  { value: "Hyderi",          label: "Hyderi"          },
  { value: "Gulshan-e-iqbal", label: "Gulshan-e-iqbal" },
  { value: "DHA",             label: "DHA"             },
  { value: "Clifton",         label: "Clifton"         },
  { value: "Johar",           label: "Johar"           },
  { value: "Nazimabad",       label: "Nazimabad"       },
  { value: "North Nazimabad", label: "North Nazimabad" },
  { value: "Saddar",          label: "Saddar"          },
];

// ── Branch multi-select helpers ───────────────────────────────────────────────

const SELECT_ALL_OPT = { value: "__all__", label: "Select All" };
const BRANCH_OPTIONS_MULTI = [SELECT_ALL_OPT, ...BRANCH_OPTIONS];

function BranchOption({ innerRef, innerProps, isSelected, isFocused, data, children }) {
  const isAll = data.value === "__all__";
  return (
    <div
      ref={innerRef}
      {...innerProps}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8,
        padding: isAll ? "6px 10px 8px" : "6px 10px",
        fontSize: 11,
        borderRadius: 6,
        cursor: "pointer",
        background: isFocused ? "rgba(255,255,255,0.05)" : "transparent",
        borderBottom: isAll ? "1px solid #1f2025" : "none",
        marginBottom: isAll ? 4 : 0,
        transition: "background 80ms",
      }}
    >
      <span style={{ color: isAll ? "#ffffff" : "#cdd0d6", fontWeight: isAll ? 500 : 400 }}>
        {children}
      </span>
      <div style={{
        width: 14,
        height: 14,
        borderRadius: 3,
        border: `1px solid ${isSelected ? "#2563eb" : "#3e4047"}`,
        background: isSelected ? "#2563eb" : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        transition: "border-color 100ms, background 100ms",
      }}>
        {isSelected && (
          <svg width={9} height={7} fill="none" viewBox="0 0 9 7">
            <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth={1.6}
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
    </div>
  );
}

function BranchMultiValue({ index, data, getValue, removeProps }) {
  if (data.value === "__all__") return null;

  const branches = getValue().filter(v => v.value !== "__all__");
  const firstBranchIdx = getValue().findIndex(v => v.value !== "__all__");

  if (branches.length > 4) {
    if (index !== firstBranchIdx) return null;
    return (
      <div style={{
        display: "inline-flex",
        alignItems: "center",
        background: "rgba(37,99,235,0.15)",
        borderRadius: 4,
        padding: "2px 8px",
        fontSize: 11,
        color: "#cdd0d6",
        margin: "2px",
      }}>
        {branches.length === BRANCH_OPTIONS.length
          ? `All ${BRANCH_OPTIONS.length} branches`
          : `${branches.length} branches selected`}
      </div>
    );
  }

  return (
    <div style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      background: "rgba(37,99,235,0.15)",
      borderRadius: 4,
      padding: "2px 6px",
      fontSize: 11,
      color: "#cdd0d6",
      margin: "2px",
    }}>
      <span>{data.label}</span>
      <span
        {...removeProps}
        style={{ cursor: "pointer", color: "#545659", lineHeight: 1, fontSize: 14 }}
      >
        ×
      </span>
    </div>
  );
}

const BRANCH_COMPONENTS = { Option: BranchOption, MultiValue: BranchMultiValue };

// ── Form ─────────────────────────────────────────────────────────────────────

const EMPTY = { country: null, bank: null, branch: [], onlineRate: "", offlineRate: "" };

export default function AddBankRateModal({ open, onClose, onAdd }) {
  const [form, setForm] = useState(EMPTY);

  if (!open) return null;

  const set = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));

  // Include SELECT_ALL in the displayed value only when every branch is selected —
  // this makes "Select All" appear checked in the dropdown without storing it in state.
  const branchDisplayValue = form.branch.length === BRANCH_OPTIONS.length
    ? [SELECT_ALL_OPT, ...form.branch]
    : form.branch;

  const handleBranchChange = (opts) => {
    const options = opts || [];
    const nextHasAll     = options.some(o => o.value === "__all__");
    const currAllSelected = form.branch.length === BRANCH_OPTIONS.length;

    if (nextHasAll && !currAllSelected) {
      set("branch", [...BRANCH_OPTIONS]);
    } else if (!nextHasAll && currAllSelected) {
      set("branch", []);
    } else {
      set("branch", options.filter(o => o.value !== "__all__"));
    }
  };

  const handleAdd = () => {
    if (!form.country || !form.bank) return;
    onAdd?.({
      country:     form.country.label,
      bank:        form.bank.label,
      branches:    form.branch.length > 0 ? form.branch.map(b => b.label) : [],
      onlineRate:  Number(form.onlineRate) || 0,
      offlineRate: Number(form.offlineRate) || 0,
    });
    setForm(EMPTY);
  };

  const handleClose = () => { setForm(EMPTY); onClose(); };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

      {/* Modal */}
      <div className="relative w-[480px] max-w-[calc(100vw-32px)] mx-4 max-h-[90vh] flex flex-col bg-[#1c1d22] border border-[#28292f] rounded-[14px] shadow-2xl">

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-[24px] py-[18px] border-b border-[#212328] shrink-0">
          <div className="flex items-center gap-[12px]">
            <div className="w-[36px] h-[36px] rounded-[8px] bg-[#111215] border border-[#212328] flex items-center justify-center shrink-0">
              <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="#74757b" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <span className="text-[15px] font-semibold text-white">Bank Rates</span>
          </div>
          <button
            onClick={handleClose}
            className="text-[#545659] hover:text-white transition-colors cursor-pointer"
          >
            <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ── Form Body ── */}
        <div className="flex-1 min-h-0 overflow-y-auto px-[24px] py-[20px] space-y-[16px]">

          {/* Country */}
          <div>
            <label className="block text-[12px] text-[#74757b] mb-[8px]">Country</label>
            <AppSelect
              variant="default"
              size="lg"
              value={form.country}
              onChange={(v) => set("country", v)}
              options={COUNTRY_OPTIONS}
              placeholder=""
              isSearchable
            />
          </div>

          {/* Bank */}
          <div>
            <label className="block text-[12px] text-[#74757b] mb-[8px]">Bank</label>
            <AppSelect
              variant="default"
              size="lg"
              value={form.bank}
              onChange={(v) => set("bank", v)}
              options={BANK_OPTIONS}
              placeholder=""
              isSearchable
            />
          </div>

          {/* Branch — multi-select with Select All */}
          <div>
            <label className="block text-[12px] text-[#74757b] mb-[8px]">Branch</label>
            <AppSelect
              isMulti
              variant="default"
              size="lg"
              value={branchDisplayValue}
              onChange={handleBranchChange}
              options={BRANCH_OPTIONS_MULTI}
              placeholder="Select branches"
              isSearchable={false}
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              components={BRANCH_COMPONENTS}
            />
          </div>

          {/* Online Rate + Offline Rate */}
          <div className="grid grid-cols-2 gap-[12px]">
            <div>
              <label className="block text-[12px] text-[#74757b] mb-[8px]">Online Rate</label>
              <input
                type="number"
                min={0}
                value={form.onlineRate}
                onChange={(e) => set("onlineRate", e.target.value)}
                className="w-full h-[42px] px-[12px] rounded-[6px] text-[13px] text-white bg-[#111215] border border-[#212328] outline-none focus:border-[#3e4047] transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
            <div>
              <label className="block text-[12px] text-[#74757b] mb-[8px]">Offline Rate</label>
              <input
                type="number"
                min={0}
                value={form.offlineRate}
                onChange={(e) => set("offlineRate", e.target.value)}
                className="w-full h-[42px] px-[12px] rounded-[6px] text-[13px] text-white bg-[#111215] border border-[#212328] outline-none focus:border-[#3e4047] transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="flex items-center justify-between px-[24px] py-[16px] border-t border-[#212328] shrink-0">
          <button
            onClick={handleClose}
            className="h-[38px] px-[20px] rounded-[8px] text-[13px] font-medium text-[#9ea0a6] bg-[#111215] border border-[#212328] hover:text-white hover:border-[#3e4047] cursor-pointer transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="h-[38px] px-[20px] rounded-[8px] text-[13px] font-medium text-white bg-[#2563eb] hover:bg-[#1d4ed8] cursor-pointer transition-colors"
          >
            Add Rate
          </button>
        </div>
      </div>
    </div>
  );
}
