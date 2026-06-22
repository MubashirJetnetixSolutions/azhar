"use client";

import { useState } from "react";

export default function CreateOrderModal({ open, onClose }) {
  const [source, setSource] = useState("Manual");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative rounded-2xl w-[500px] max-w-full mx-4 bg-[#161616] border border-[#262626]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#1e1e1e]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#1e1e1e]">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#888" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="font-semibold text-white">Create Order</span>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          {/* Source */}
          <div>
            <label className="block text-xs mb-1.5 text-[#888]">Source</label>
            <div className="relative">
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg text-sm appearance-none outline-none bg-[#1e1e1e] border border-[#2a2a2a] text-white"
              >
                <option value="Manual">Manual</option>
                <option value="PDF">PDF</option>
              </select>
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#666" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {source === "PDF" && (
            <div>
              <label className="block text-xs mb-1.5 text-[#888]">Upload File</label>
              <div className="rounded-xl p-6 flex flex-col items-center gap-3 border-[1.5px] border-dashed border-[#333] bg-[#1a1a1a]">
                <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="#555" strokeWidth={1.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div className="text-center">
                  <p className="text-sm text-white">Drag and drop your files</p>
                  <p className="text-xs mt-1 text-[#555]">JPEG, PNG, PDF, and Xlxs formats, up to 50MB</p>
                </div>
                <button className="px-4 py-1.5 rounded-lg text-sm text-white transition-colors bg-[#222] border border-[#333] hover:bg-[#2e2e2e]">
                  Select File
                </button>
              </div>
            </div>
          )}

          {/* Grid Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs mb-1.5 text-[#888]">Company Name</label>
              <input className="w-full px-3 py-2.5 rounded-lg text-sm outline-none bg-[#1e1e1e] border border-[#2a2a2a] text-white" />
            </div>
            <div>
              <label className="block text-xs mb-1.5 text-[#888]">Country</label>
              <input className="w-full px-3 py-2.5 rounded-lg text-sm outline-none bg-[#1e1e1e] border border-[#2a2a2a] text-white" />
            </div>
            <div>
              <label className="block text-xs mb-1.5 text-[#888]">LC Reference</label>
              <input className="w-full px-3 py-2.5 rounded-lg text-sm outline-none bg-[#1e1e1e] border border-[#2a2a2a] text-white" />
            </div>
            <div>
              <label className="block text-xs mb-1.5 text-[#888]">Bank</label>
              <div className="relative">
                <select className="w-full px-3 py-2.5 rounded-lg text-sm appearance-none outline-none bg-[#1e1e1e] border border-[#2a2a2a] text-white">
                  <option value=""></option>
                </select>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#666" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <div>
              <label className="block text-xs mb-1.5 text-[#888]">Branch</label>
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
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-[#1e1e1e]">
          <button onClick={onClose} className="px-5 py-2 rounded-lg text-sm font-medium transition-colors bg-[#1e1e1e] text-[#888] border border-[#2a2a2a] hover:text-white">
            Cancel
          </button>
          <button className="px-5 py-2 rounded-lg text-sm font-medium text-white transition-colors bg-[#2563eb] hover:bg-blue-700">
            Create Order
          </button>
        </div>
      </div>
    </div>
  );
}
