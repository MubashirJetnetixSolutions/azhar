"use client";

import { useRef, useState } from "react";
import Toggle from "@/components/ui/Toggle";
import AppSelect from "@/components/ui/AppSelect";
import AppDatePicker from "@/components/ui/AppDatePicker";

const CREATION_OPTIONS = [
  { value: "Bank",   label: "Bank"   },
  { value: "Branch", label: "Branch" },
];

const DEPARTMENT_OPTIONS = [
  { value: "Bank",     label: "Bank"     },
  { value: "Accounts", label: "Accounts" },
  { value: "Sales",    label: "Sales"    },
  { value: "HR",       label: "HR"       },
  { value: "IT",       label: "IT"       },
  { value: "Finance",  label: "Finance"  },
];

const BANK_OPTIONS = [
  { value: "Meezan Bank Limited",    label: "Meezan Bank Limited"    },
  { value: "United Bank Limited",    label: "United Bank Limited"    },
  { value: "Muslim Commercial Bank", label: "Muslim Commercial Bank" },
  { value: "Habib Bank Limited",     label: "Habib Bank Limited"     },
  { value: "Bank Al Habib Limited",  label: "Bank Al Habib Limited"  },
  { value: "Allied Bank Limited",    label: "Allied Bank Limited"    },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function DeptEmailRow({ index, row, onChange, onRemove, canRemove, error }) {
  return (
    <div className="space-y-2.5 pb-3 border-b border-[#212328] last:border-b-0 last:pb-0">
      {/* Row header: serial number + remove */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium text-[#545659]">#{index + 1}</span>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="flex text-red-500 items-center gap-[5px] text-[11px] hover:text-red-400 transition-colors cursor-pointer"
          >
            <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Remove
          </button>
        )}
      </div>

      {/* Department + Email grid */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[12px] text-[#74757b] mb-[8px]">Department</label>
          <AppSelect
            variant="default"
            size="lg"
            value={row.department}
            onChange={(opt) => onChange({ ...row, department: opt })}
            options={DEPARTMENT_OPTIONS}
            placeholder="Select dept"
          />
          {error?.department && (
            <p className="mt-[4px] text-[10px] text-red-400">{error.department}</p>
          )}
        </div>
        <div>
          <label className="block text-[12px] text-[#74757b] mb-[8px]">Email</label>
          <input
            type="email"
            placeholder="email@example.com"
            value={row.email}
            onChange={(e) => onChange({ ...row, email: e.target.value })}
            className={`w-full h-[42px] px-[12px] rounded-[6px] text-[13px] text-white bg-[#111215] outline-none transition-colors ${
              error?.email
                ? "border border-red-500/50"
                : "border border-[#212328] focus:border-[#3e4047]"
            }`}
          />
          {error?.email && (
            <p className="mt-[4px] text-[10px] text-red-400">{error.email}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CreateBankModal({ open, onClose }) {
  const nextId = useRef(2);

  const [creationType, setCreationType] = useState({ value: "Bank", label: "Bank" });
  const [selectedBank, setSelectedBank] = useState(null);
  const [date, setDate] = useState(null);
  const [phone, setPhone] = useState("");
  const [deptRows, setDeptRows] = useState([{ id: 1, department: null, email: "" }]);
  const [rowErrors, setRowErrors] = useState([{}]);
  const [defaulter, setDefaulter] = useState(false);
  const [invoiceToHead, setInvoiceToHead] = useState(false);

  if (!open) return null;

  const addRow = () => {
    setDeptRows((prev) => [...prev, { id: nextId.current++, department: null, email: "" }]);
    setRowErrors((prev) => [...prev, {}]);
  };

  const removeRow = (idx) => {
    setDeptRows((prev) => prev.filter((_, i) => i !== idx));
    setRowErrors((prev) => prev.filter((_, i) => i !== idx));
  };

  const updateRow = (idx, updated) => {
    setDeptRows((prev) => prev.map((r, i) => (i === idx ? updated : r)));
    setRowErrors((prev) =>
      prev.map((e, i) => {
        if (i !== idx) return e;
        const next = { ...e };
        if (updated.department) delete next.department;
        if (updated.email && EMAIL_RE.test(updated.email)) delete next.email;
        return next;
      })
    );
  };

  const validate = () => {
    const newErrors = deptRows.map((row) => {
      const err = {};
      if (!row.department) err.department = "Required";
      if (!row.email.trim()) err.email = "Required";
      else if (!EMAIL_RE.test(row.email)) err.email = "Invalid email";
      return err;
    });
    setRowErrors(newErrors);
    return newErrors.every((e) => Object.keys(e).length === 0);
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const payload = {
      type: creationType?.value,
      date,
      phone,
      departments: deptRows.map((r) => ({
        department: r.department?.value ?? "",
        email: r.email,
      })),
      defaulter,
      invoiceToHead,
    };
    console.log("Create Bank:", payload);
    handleClose();
  };

  const handleClose = () => {
    setSelectedBank(null);
    setDate(null);
    setPhone("");
    setDeptRows([{ id: 1, department: null, email: "" }]);
    setRowErrors([{}]);
    setDefaulter(false);
    setInvoiceToHead(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative w-[480px] max-w-[calc(100vw-32px)] mx-4 bg-[#1c1d22] border border-[#28292f] rounded-[14px] shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-[24px] py-[18px] border-b border-[#212328]">
          <div className="flex items-center gap-3">
            <div className="w-[36px] h-[36px] rounded-[8px] bg-[#111215] border border-[#212328] flex items-center justify-center shrink-0">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#74757b" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
              </svg>
            </div>
            <span className="text-[15px] font-semibold text-white">Create Bank</span>
          </div>
          <button onClick={handleClose} className="text-[#545659] hover:text-white transition-colors cursor-pointer">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable body */}
        <div className="px-6 py-5 space-y-4 overflow-y-auto">

          {/* Select Creation */}
          <div>
            <label className="block text-[12px] text-[#74757b] mb-[8px]">Select Creation</label>
            <AppSelect
              variant="default"
              size="lg"
              value={creationType}
              onChange={(opt) => { setCreationType(opt); setDate(null); }}
              options={CREATION_OPTIONS}
            />
          </div>

          {/* Bank Name (Bank form) or Bank selector (Branch form) */}
          {creationType?.value === "Bank" ? (
            <div>
              <label className="block text-[12px] text-[#74757b] mb-[8px]">Bank Name</label>
              <input className="w-full h-[42px] px-[12px] rounded-[6px] text-[13px] text-white bg-[#111215] border border-[#212328] outline-none focus:border-[#3e4047] transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
            </div>
          ) : (
            <div className="flex justify-between gap-4">
              <div className="w-[50%]">
                <label className="block text-[12px] text-[#74757b] mb-[8px]">Branch Name</label>
                <input
                  type="text"
                  placeholder="Enter branch name"
                  className="w-full h-[42px] px-[12px] rounded-[6px] text-[13px] text-white bg-[#111215] border border-[#212328] outline-none focus:border-[#3e4047] transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
              <div className="w-[50%]">
                <label className="block text-[12px] text-[#74757b] mb-[8px]">Select Bank</label>
                <AppSelect
                  variant="default"
                  size="lg"
                  value={selectedBank}
                  onChange={setSelectedBank}
                  options={BANK_OPTIONS}
                  placeholder="Select bank"
                />
              </div>
            </div>
          )}

          {/* Address */}
          <div>
            <label className="block text-[12px] text-[#74757b] mb-[8px]">Address</label>
            <input className="w-full h-[42px] px-[12px] rounded-[6px] text-[13px] text-white bg-[#111215] border border-[#212328] outline-none focus:border-[#3e4047] transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
          </div>

          {/* Date + Phone on the same row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] text-[#74757b] mb-[8px]">Date</label>
              <AppDatePicker
                variant="default"
                size="lg"
                selected={date}
                onChange={setDate}
                placeholder="Select date"
                isClearable
              />
            </div>
            <div>
              <label className="block text-[12px] text-[#74757b] mb-[8px]">Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-[42px] px-[12px] rounded-[6px] text-[13px] text-white bg-[#111215] border border-[#212328] outline-none focus:border-[#3e4047] transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
          </div>

          {/* Dynamic Department + Email rows */}
          <div className="space-y-3">
            {deptRows.map((row, idx) => (
              <DeptEmailRow
                key={row.id}
                index={idx}
                row={row}
                onChange={(updated) => updateRow(idx, updated)}
                onRemove={() => removeRow(idx)}
                canRemove={deptRows.length > 1}
                error={rowErrors[idx]}
              />
            ))}

            {/* Add More */}
            <button
              type="button"
              onClick={addRow}
              className="flex items-center gap-[6px] text-xs text-[#999999] hover:text-[#888] transition-colors cursor-pointer"
            >
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add More
            </button>
          </div>

          {/* Toggles — always shown for both Bank and Branch */}
          <div className="flex items-center justify-between pt-1">
            <p className="text-[13px] text-white">Defaulter</p>
            <Toggle checked={defaulter} onChange={setDefaulter} />
          </div>
          <div className="flex items-center justify-between pt-1">
            <div>
              <p className="text-[13px] text-white">Invoice to Head office</p>
              <p className="text-[11px] mt-[2px] text-[#545659]">This indicates to whom the invoice of each order be made to.</p>
            </div>
            <Toggle checked={invoiceToHead} onChange={setInvoiceToHead} />
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-[24px] py-[16px] border-t border-[#212328] shrink-0">
          <button
            onClick={handleClose}
            className="h-[38px] px-[20px] rounded-[8px] text-[13px] font-medium text-[#9ea0a6] bg-[#111215] border border-[#212328] hover:text-white hover:border-[#3e4047] cursor-pointer transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="h-[38px] px-[20px] rounded-[8px] text-[13px] font-medium text-white bg-[#2563eb] hover:bg-[#1d4ed8] cursor-pointer transition-colors"
          >
            Create Bank
          </button>
        </div>
      </div>
    </div>
  );
}
