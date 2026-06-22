"use client";

export default function DeleteConfirmModal({ open, onClose, onConfirm }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative rounded-2xl w-[420px] max-w-full mx-4 bg-[#161616] border border-[#262626]">
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#1e1e1e]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#1e1e1e]">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#888" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <span className="font-semibold text-white">Delete</span>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-5">
          <p className="text-sm text-[#888]">
            Are your sure you want to delete? once deleted, this step can not be undo
          </p>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 border-t border-[#1e1e1e]">
          <button onClick={onClose} className="px-5 py-2 rounded-lg text-sm font-medium transition-colors bg-[#1e1e1e] text-[#888] border border-[#2a2a2a] hover:text-white">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-5 py-2 rounded-lg text-sm font-medium text-white transition-colors bg-[#ef4444] hover:bg-red-600">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
