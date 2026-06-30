"use client";

import { useState } from "react";
import AppDatePicker from "@/components/ui/AppDatePicker";

export default function CreateCompanyModal({ open, onClose }) {
  const [date, setDate] = useState(null);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative rounded-[14px] w-[500px] max-w-[calc(100vw-32px)] mx-4 bg-[#1c1d22] border border-[#28292f] shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-[24px] py-[18px] border-b border-[#212328]">
          <div className="flex items-center gap-[12px]">
            <div className="w-[36px] h-[36px] rounded-[8px] bg-[#111215] border border-[#212328] flex items-center justify-center shrink-0">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#74757b" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <span className="text-[15px] font-semibold text-white">Create Company</span>
          </div>
          <button onClick={onClose} className="text-[#545659] hover:text-white transition-colors cursor-pointer">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-[24px] py-[20px] space-y-[16px]">
          <div>
            <label className="block text-[12px] text-[#74757b] mb-[8px]">Company Name</label>
            <input className="w-full h-[42px] px-[12px] rounded-[6px] text-[13px] text-white bg-[#111215] border border-[#212328] outline-none focus:border-[#3e4047] transition-colors" />
          </div>
          <div>
            <label className="block text-[12px] text-[#74757b] mb-[8px]">Address</label>
            <input className="w-full h-[42px] px-[12px] rounded-[6px] text-[13px] text-white bg-[#111215] border border-[#212328] outline-none focus:border-[#3e4047] transition-colors" />
          </div>
          <div className="grid grid-cols-2 gap-[12px]">
            <div>
              <label className="block text-[12px] text-[#74757b] mb-[8px]">Registration</label>
              <input className="w-full h-[42px] px-[12px] rounded-[6px] text-[13px] text-white bg-[#111215] border border-[#212328] outline-none focus:border-[#3e4047] transition-colors" />
            </div>
            <div>
              <label className="block text-[12px] text-[#74757b] mb-[8px]">Country</label>
              <input className="w-full h-[42px] px-[12px] rounded-[6px] text-[13px] text-white bg-[#111215] border border-[#212328] outline-none focus:border-[#3e4047] transition-colors" />
            </div>
          </div>
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
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-[24px] py-[16px] border-t border-[#212328]">
          <button
            onClick={onClose}
            className="h-[38px] px-[20px] rounded-[8px] text-[13px] font-medium text-[#9ea0a6] bg-[#111215] border border-[#212328] hover:text-white hover:border-[#3e4047] cursor-pointer transition-colors"
          >
            Cancel
          </button>
          <button className="h-[38px] px-[20px] rounded-[8px] text-[13px] font-medium text-white bg-[#2563eb] hover:bg-[#1d4ed8] cursor-pointer transition-colors">
            Create Company
          </button>
        </div>
      </div>
    </div>
  );
}
