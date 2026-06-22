"use client";

import { useState } from "react";
import AppDatePicker from "@/components/ui/AppDatePicker";

export default function CreateCompanyModal({ open, onClose }) {
  const [date, setDate] = useState(null);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative rounded-2xl w-[500px] max-w-full mx-4 bg-[#161616] border border-[#262626]">
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#1e1e1e]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#1e1e1e]">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#888" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <span className="font-semibold text-white">Create Company</span>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-xs mb-1.5 text-[#888]">Company Name</label>
            <input className="w-full px-3 py-2.5 rounded-lg text-sm outline-none bg-[#1e1e1e] border border-[#2a2a2a] text-white" />
          </div>
          <div>
            <label className="block text-xs mb-1.5 text-[#888]">Address</label>
            <input className="w-full px-3 py-2.5 rounded-lg text-sm outline-none bg-[#1e1e1e] border border-[#2a2a2a] text-white" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs mb-1.5 text-[#888]">Registration</label>
              <input className="w-full px-3 py-2.5 rounded-lg text-sm outline-none bg-[#1e1e1e] border border-[#2a2a2a] text-white" />
            </div>
            <div>
              <label className="block text-xs mb-1.5 text-[#888]">Country</label>
              <input className="w-full px-3 py-2.5 rounded-lg text-sm outline-none bg-[#1e1e1e] border border-[#2a2a2a] text-white" />
            </div>
          </div>
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
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 border-t border-[#1e1e1e]">
          <button onClick={onClose} className="px-5 py-2 rounded-lg text-sm font-medium transition-colors bg-[#1e1e1e] text-[#888] border border-[#2a2a2a] hover:text-white">
            Cancel
          </button>
          <button className="px-5 py-2 rounded-lg text-sm font-medium text-white transition-colors bg-[#2563eb] hover:bg-blue-700">
            Create Company
          </button>
        </div>
      </div>
    </div>
  );
}
