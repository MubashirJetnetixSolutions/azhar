"use client";

import { useState } from "react";
import Toggle from "@/components/ui/Toggle";

function SelectField({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-xs mb-1.5 text-[#888]">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg text-sm appearance-none outline-none bg-[#1e1e1e] border border-[#2a2a2a] text-white"
        >
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#666" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}

export default function CreateBankModal({ open, onClose }) {
  const [creationType, setCreationType] = useState("Bank");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative rounded-2xl w-[500px] max-w-full mx-4 bg-[#161616] border border-[#262626]">
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#1e1e1e]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#1e1e1e]">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#888" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
              </svg>
            </div>
            <span className="font-semibold text-white">Create Bank</span>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          <SelectField label="Select Creation" value={creationType} onChange={setCreationType} options={["Bank", "Branch"]} />

          {creationType === "Bank" ? (
            <>
              <div>
                <label className="block text-xs mb-1.5 text-[#888]">Bank Name</label>
                <input className="w-full px-3 py-2.5 rounded-lg text-sm outline-none bg-[#1e1e1e] border border-[#2a2a2a] text-white" />
              </div>
              <div>
                <label className="block text-xs mb-1.5 text-[#888]">Address</label>
                <input className="w-full px-3 py-2.5 rounded-lg text-sm outline-none bg-[#1e1e1e] border border-[#2a2a2a] text-white" />
              </div>
              <div>
                <label className="block text-xs mb-1.5 text-[#888]">Date</label>
                <div className="relative">
                  <input type="text" className="w-full px-3 py-2.5 rounded-lg text-sm outline-none bg-[#1e1e1e] border border-[#2a2a2a] text-white" />
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#666" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <SelectField label="Department" value="Bank" onChange={() => {}} options={["Bank"]} />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs mb-1.5 text-[#888]">Email</label>
                  <input className="w-full px-3 py-2.5 rounded-lg text-sm outline-none bg-[#1e1e1e] border border-[#2a2a2a] text-white" />
                </div>
                <div>
                  <label className="block text-xs mb-1.5 text-[#888]">Phone</label>
                  <input className="w-full px-3 py-2.5 rounded-lg text-sm outline-none bg-[#1e1e1e] border border-[#2a2a2a] text-white" />
                </div>
              </div>
            </>
          ) : (
            <>
              <SelectField label="Select Creation" value="Meezan Bank Limited" onChange={() => {}} options={["Meezan Bank Limited"]} />
              <div>
                <label className="block text-xs mb-1.5 text-[#888]">Address</label>
                <input className="w-full px-3 py-2.5 rounded-lg text-sm outline-none bg-[#1e1e1e] border border-[#2a2a2a] text-white" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs mb-1.5 text-[#888]">Email</label>
                  <input className="w-full px-3 py-2.5 rounded-lg text-sm outline-none bg-[#1e1e1e] border border-[#2a2a2a] text-white" />
                </div>
                <div>
                  <label className="block text-xs mb-1.5 text-[#888]">Phone</label>
                  <input className="w-full px-3 py-2.5 rounded-lg text-sm outline-none bg-[#1e1e1e] border border-[#2a2a2a] text-white" />
                </div>
              </div>
              <div>
                <label className="block text-xs mb-1.5 text-[#888]">Date</label>
                <div className="relative">
                  <input type="text" className="w-full px-3 py-2.5 rounded-lg text-sm outline-none bg-[#1e1e1e] border border-[#2a2a2a] text-white" />
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#666" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div>
                <label className="block text-xs mb-1.5 text-[#888]">Tags</label>
                <input className="w-full px-3 py-2.5 rounded-lg text-sm outline-none bg-[#1e1e1e] border border-[#2a2a2a] text-white" />
              </div>
              <div className="flex items-center justify-between pt-1">
                <div>
                  <p className="text-sm text-white">Invoice to Head office</p>
                  <p className="text-xs mt-0.5 text-[#555]">This indicates to whom the invoice of each order be made to.</p>
                </div>
                <Toggle checked={false} onChange={() => {}} />
              </div>
            </>
          )}
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 border-t border-[#1e1e1e]">
          <button onClick={onClose} className="px-5 py-2 rounded-lg text-sm font-medium transition-colors bg-[#1e1e1e] text-[#888] border border-[#2a2a2a] hover:text-white">
            Cancel
          </button>
          <button className="px-5 py-2 rounded-lg text-sm font-medium text-white transition-colors bg-[#2563eb] hover:bg-blue-700">
            Create Bank
          </button>
        </div>
      </div>
    </div>
  );
}
