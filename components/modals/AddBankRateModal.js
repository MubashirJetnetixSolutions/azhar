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
  { value: "Hyderi",         label: "Hyderi"         },
  { value: "Gulshan-e-iqbal",label: "Gulshan-e-iqbal"},
  { value: "DHA",            label: "DHA"            },
  { value: "Clifton",        label: "Clifton"        },
  { value: "Johar",          label: "Johar"          },
  { value: "Nazimabad",      label: "Nazimabad"      },
  { value: "North Nazimabad",label: "North Nazimabad"},
  { value: "Saddar",         label: "Saddar"         },
];

const TYPE_OPTIONS = [
  { value: "SME",       label: "SME"       },
  { value: "Corporate", label: "Corporate" },
];

const EMPTY = { country: null, bank: null, branch: null, type: null, onlineRate: "", offlineRate: "" };

export default function AddBankRateModal({ open, onClose, onAdd }) {
  const [form, setForm] = useState(EMPTY);

  if (!open) return null;

  const set = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));

  const handleAdd = () => {
    if (!form.country || !form.bank || !form.type) return;
    onAdd?.({
      country:     form.country.label,
      bank:        form.bank.label,
      branches:    form.branch ? [form.branch.label, "Hyderi", "DHA", "Clifton", "Johar", "Nazimabad"] : ["Hyderi", "Gulshan-e-iqbal", "DHA", "Clifton"],
      type:        form.type.value,
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
      <div className="relative w-[480px] max-w-[calc(100vw-32px)] mx-4 bg-[#1c1d22] border border-[#28292f] rounded-[14px] shadow-2xl">

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-[24px] py-[18px] border-b border-[#212328]">
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
        <div className="px-[24px] py-[20px] space-y-[16px]">

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

          {/* Bank + Branch */}
          <div className="grid grid-cols-2 gap-[12px]">
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
            <div>
              <label className="block text-[12px] text-[#74757b] mb-[8px]">Branch</label>
              <AppSelect
                variant="default"
                size="lg"
                value={form.branch}
                onChange={(v) => set("branch", v)}
                options={BRANCH_OPTIONS}
                placeholder=""
                isSearchable
              />
            </div>
          </div>

          {/* Type */}
          <div>
            <label className="block text-[12px] text-[#74757b] mb-[8px]">Type</label>
            <AppSelect
              variant="default"
              size="lg"
              value={form.type}
              onChange={(v) => set("type", v)}
              options={TYPE_OPTIONS}
              placeholder=""
              isSearchable={false}
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
        <div className="flex items-center justify-between px-[24px] py-[16px] border-t border-[#212328]">
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
