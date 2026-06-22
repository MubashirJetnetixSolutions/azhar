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
  { value: "Meezan Bank Limited", label: "Meezan Bank Limited" },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function DeptEmailRow({ index, row, onChange, onRemove, canRemove, error }) {
  return (
    <div className="space-y-2.5 pb-3 border-b border-[#1e1e1e] last:border-b-0 last:pb-0">
      {/* Row header: serial number + remove */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium text-[#555]">#{index + 1}</span>
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
          <label className="block text-xs mb-1.5 text-[#888]">Department</label>
          <AppSelect
            variant="dark"
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
          <label className="block text-xs mb-1.5 text-[#888]">Email</label>
          <input
            type="email"
            placeholder="email@example.com"
            value={row.email}
            onChange={(e) => onChange({ ...row, email: e.target.value })}
            className={`w-full px-3 py-2.5 rounded-lg text-sm outline-none bg-[#1e1e1e] border text-white placeholder-[#3a3a3a] transition-colors ${
              error?.email ? "border-red-500/50" : "border-[#2a2a2a]"
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
      <div className="absolute inset-0 bg-black/60" onClick={handleClose} />
      <div className="relative rounded-2xl w-[500px] max-w-full mx-4 bg-[#161616] border border-[#262626] max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#1e1e1e] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#1e1e1e]">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#888" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
              </svg>
            </div>
            <span className="font-semibold text-white">Create Bank</span>
          </div>
          <button onClick={handleClose} className="text-gray-500 hover:text-white transition-colors cursor-pointer">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable body */}
        <div className="px-6 py-5 space-y-4 overflow-y-auto">

          {/* Select Creation */}
          <div>
            <label className="block text-xs mb-1.5 text-[#888]">Select Creation</label>
            <AppSelect
              variant="dark"
              size="lg"
              value={creationType}
              onChange={(opt) => { setCreationType(opt); setDate(null); }}
              options={CREATION_OPTIONS}
            />
          </div>

          {/* Bank Name (Bank form) or Bank selector (Branch form) */}
          {creationType?.value === "Bank" ? (
            <div>
              <label className="block text-xs mb-1.5 text-[#888]">Bank Name</label>
              <input className="w-full px-3 py-2.5 rounded-lg text-sm outline-none bg-[#1e1e1e] border border-[#2a2a2a] text-white" />
            </div>
          ) : (
            <div>
              <label className="block text-xs mb-1.5 text-[#888]">Bank</label>
              <AppSelect
                variant="dark"
                size="lg"
                value={BANK_OPTIONS[0]}
                onChange={() => {}}
                options={BANK_OPTIONS}
                isDisabled
              />
            </div>
          )}

          {/* Address */}
          <div>
            <label className="block text-xs mb-1.5 text-[#888]">Address</label>
            <input className="w-full px-3 py-2.5 rounded-lg text-sm outline-none bg-[#1e1e1e] border border-[#2a2a2a] text-white" />
          </div>

          {/* Date + Phone on the same row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs mb-1.5 text-[#888]">Date</label>
              <AppDatePicker
                variant="dark"
                size="lg"
                selected={date}
                onChange={setDate}
                placeholder="Select date"
                isClearable
              />
            </div>
            <div>
              <label className="block text-xs mb-1.5 text-[#888]">Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg text-sm outline-none bg-[#1e1e1e] border border-[#2a2a2a] text-white"
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
              className="flex items-center gap-[6px] text-xs text-[#555] hover:text-[#888] transition-colors cursor-pointer"
            >
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add More
            </button>
          </div>

          {/* Toggles — always shown for both Bank and Branch */}
          <div className="flex items-center justify-between pt-1">
            <p className="text-sm text-white">Defaulter</p>
            <Toggle checked={defaulter} onChange={setDefaulter} />
          </div>
          <div className="flex items-center justify-between pt-1">
            <div>
              <p className="text-sm text-white">Invoice to Head office</p>
              <p className="text-xs mt-0.5 text-[#555]">This indicates to whom the invoice of each order be made to.</p>
            </div>
            <Toggle checked={invoiceToHead} onChange={setInvoiceToHead} />
          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-[#1e1e1e] shrink-0">
          <button
            onClick={handleClose}
            className="px-5 py-2 rounded-lg text-sm font-medium transition-colors bg-[#1e1e1e] text-[#888] border border-[#2a2a2a] hover:text-white cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 rounded-lg text-sm font-medium text-white transition-colors bg-[#2563eb] hover:bg-blue-700 cursor-pointer"
          >
            Create Bank
          </button>
        </div>
      </div>
    </div>
  );
}
