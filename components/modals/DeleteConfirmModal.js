"use client";

import { useEffect, useRef, useState } from "react";

export default function DeleteConfirmModal({ open, onClose, onConfirm }) {
  const [loading, setLoading] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  useEffect(() => {
    if (!open) { setLoading(false); return; }
    const handler = (e) => { if (e.key === "Escape" && !loading) onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, loading, onClose]);

  if (!open) return null;

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={!loading ? onClose : undefined} />
      <div className="relative rounded-[14px] w-[440px] max-w-[calc(100vw-32px)] mx-4 bg-[#1c1d22] border border-[#28292f] shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-[24px] py-[18px] border-b border-[#212328]">
          <div className="flex items-center gap-[12px]">
            <div className="w-[36px] h-[36px] rounded-[8px] bg-[#111215] border border-[#212328] flex items-center justify-center shrink-0">
              <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="#74757b" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <span className="text-[15px] font-semibold text-white">Delete</span>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="text-[#545659] hover:text-white transition-colors cursor-pointer disabled:opacity-40"
          >
            <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-[24px] py-[20px]">
          <p className="text-[13px] text-[#74757b] leading-[20px]">
            Are you sure you want to delete? Once deleted, this action cannot be undone.
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-[24px] py-[16px] border-t border-[#212328]">
          <button
            onClick={onClose}
            disabled={loading}
            className="h-[38px] px-[20px] rounded-[8px] text-[13px] font-medium text-[#9ea0a6] bg-[#111215] border border-[#212328] hover:text-white hover:border-[#3e4047] cursor-pointer transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="h-[38px] px-[20px] rounded-[8px] text-[13px] font-medium text-white bg-[#ef4444] hover:bg-[#dc2626] disabled:opacity-70 flex items-center gap-[8px] cursor-pointer min-w-[80px] justify-center transition-colors"
          >
            {loading && (
              <svg className="animate-spin w-[13px] h-[13px] shrink-0" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            )}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
