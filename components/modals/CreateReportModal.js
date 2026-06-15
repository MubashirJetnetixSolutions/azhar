"use client";

import { useState } from "react";
import { orders } from "@/data/mockData";
import StatusBadge from "@/components/ui/StatusBadge";

export default function CreateReportModal({ open, onClose }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleCreate = () => {
    setStep(2);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onClose();
      setStep(1);
    }, 2000);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      {step === 1 && (
        <div className="relative rounded-2xl w-[760px] max-w-full mx-4" style={{ backgroundColor: "#161616", border: "1px solid #262626" }}>
          <div className="flex items-center gap-3 px-6 py-4" style={{ borderBottom: "1px solid #1e1e1e" }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#1e1e1e" }}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#888" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="font-semibold text-white">Create Report</span>
            <button onClick={onClose} className="ml-auto text-gray-500 hover:text-white">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Search */}
          <div className="px-6 py-4">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#666" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input className="w-full pl-9 pr-4 py-2 rounded-lg text-sm outline-none placeholder-gray-600" style={{ backgroundColor: "#1e1e1e", border: "1px solid #262626", color: "#fff" }} placeholder="Find Orders" />
            </div>
          </div>

          {/* Table */}
          <div className="px-6 pb-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid #1e1e1e" }}>
                  {["Order Number", "Company", "Country", "Bank", "Request Date", "Start Time", "Assigned to", "Status", "Actions"].map(h => (
                    <th key={h} className="text-left py-2 pr-4 text-xs font-medium" style={{ color: "#555" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 7).map((o, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #1a1a1a" }}>
                    <td className="py-2 pr-4 text-xs" style={{ color: "#888" }}>{o.id}</td>
                    <td className="py-2 pr-4 text-xs text-white">{o.company}</td>
                    <td className="py-2 pr-4 text-xs" style={{ color: "#888" }}>{o.country}</td>
                    <td className="py-2 pr-4">
                      <div className="text-xs text-white">{o.bank}</div>
                      <div className="text-[10px]" style={{ color: "#555" }}>{o.branch}</div>
                    </td>
                    <td className="py-2 pr-4 text-xs" style={{ color: "#888" }}>{o.requestDate}</td>
                    <td className="py-2 pr-4 text-xs" style={{ color: "#888" }}>{o.startTime}</td>
                    <td className="py-2 pr-4 text-xs text-white">{o.assignedTo}</td>
                    <td className="py-2 pr-4"><StatusBadge status="Complete" /></td>
                    <td className="py-2">
                      <button onClick={() => setStep(1.5)} className="text-xs px-3 py-1 rounded-lg text-white" style={{ backgroundColor: "#2563eb" }}>
                        Create Report
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {step === 1.5 && (
        <div className="relative rounded-2xl w-[460px] mx-4 p-6" style={{ backgroundColor: "#161616", border: "1px solid #262626" }}>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#1e1e1e" }}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#888" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="font-semibold text-white">Create Report</span>
            <button onClick={onClose} className="ml-auto text-gray-500 hover:text-white">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mb-5">
            <label className="block text-xs mb-1.5" style={{ color: "#888" }}>File Name</label>
            <input
              value={fileName}
              onChange={e => setFileName(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
              style={{ backgroundColor: "#1e1e1e", border: "1px solid #2a2a2a", color: "#fff" }}
            />
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="flex-1 py-2 rounded-lg text-sm font-medium transition-colors" style={{ backgroundColor: "#1e1e1e", color: "#888", border: "1px solid #2a2a2a" }}>
              Back
            </button>
            <button onClick={handleCreate} className="flex-1 py-2 rounded-lg text-sm font-medium text-white" style={{ backgroundColor: "#2563eb" }}>
              Create Report
            </button>
          </div>
        </div>
      )}

      {loading && (
        <div className="relative rounded-2xl w-[400px] mx-4 p-12 flex flex-col items-center gap-4" style={{ backgroundColor: "#161616" }}>
          <div className="flex gap-3">
            {[0, 1, 2].map(i => (
              <svg key={i} width="50" height="50" fill="none" viewBox="0 0 24 24">
                <path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" stroke="#ccc" strokeWidth={1.2} />
                <path d="M12 3v6h6" stroke="#ccc" strokeWidth={1.2} />
                <line x1="8" y1="13" x2="16" y2="13" stroke="#ccc" strokeWidth={1.2} />
                <line x1="8" y1="16" x2="14" y2="16" stroke="#ccc" strokeWidth={1.2} />
              </svg>
            ))}
          </div>
          <span className="text-white text-sm font-medium">Creating Report</span>
        </div>
      )}
    </div>
  );
}
