"use client";

import { useRef, useState } from "react";
import AppSelect from "@/components/ui/AppSelect";
import AppDatePicker from "@/components/ui/AppDatePicker";

const SOURCE_OPTIONS = [
  { value: "Manual", label: "Manual" },
  { value: "PDF",    label: "PDF"    },
];

const ACCEPTED = ["image/jpeg", "image/png", "application/pdf",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel"];

const formatSize = (bytes) =>
  bytes >= 1024 * 1024
    ? (bytes / (1024 * 1024)).toFixed(1) + " MB"
    : (bytes / 1024).toFixed(0) + " KB";

export default function CreateOrderModal({ open, onClose }) {
  const [source,      setSource]      = useState({ value: "Manual", label: "Manual" });
  const [bank,        setBank]        = useState(null);
  const [date,        setDate]        = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging,  setIsDragging]  = useState(false);
  const [fileError,   setFileError]   = useState("");

  const fileInputRef = useRef(null);

  if (!open) return null;

  const handleFile = (file) => {
    if (!file) return;
    if (!ACCEPTED.includes(file.type) && !file.name.match(/\.(jpe?g|png|pdf|xlsx?)$/i)) {
      setFileError("Unsupported file type. Use JPEG, PNG, PDF, or XLSX.");
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      setFileError("File size exceeds 50MB.");
      return;
    }
    setFileError("");
    setSelectedFile(file);
  };

  const handleDragOver  = (e) => { e.preventDefault(); setIsDragging(true);  };
  const handleDragLeave = ()  => { setIsDragging(false); };
  const handleDrop      = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  const handleClose = () => {
    setSelectedFile(null);
    setFileError("");
    setIsDragging(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative rounded-[14px] w-[500px] max-w-[calc(100vw-32px)] mx-4 max-h-[90vh] flex flex-col bg-[#1c1d22] border border-[#28292f] shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-[24px] py-[18px] border-b border-[#212328] shrink-0">
          <div className="flex items-center gap-[12px]">
            <div className="w-[36px] h-[36px] rounded-[8px] bg-[#111215] border border-[#212328] flex items-center justify-center shrink-0">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#74757b" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="text-[15px] font-semibold text-white">Create Order</span>
          </div>
          <button onClick={handleClose} className="text-[#545659] hover:text-white transition-colors cursor-pointer">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 min-h-0 overflow-y-auto px-[24px] py-[20px] space-y-[16px]">
          {/* Source */}
          <div>
            <label className="block text-[12px] text-[#74757b] mb-[8px]">Source</label>
            <AppSelect
              variant="default"
              size="lg"
              value={source}
              onChange={(v) => { setSource(v); setSelectedFile(null); setFileError(""); }}
              options={SOURCE_OPTIONS}
            />
          </div>

          {source?.value === "PDF" && (
            <div>
              <label className="block text-[12px] text-[#74757b] mb-[8px]">Upload File</label>
              <input
                ref={fileInputRef}
                type="file"
                accept=".jpg,.jpeg,.png,.pdf,.xlsx,.xls"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => !selectedFile && fileInputRef.current?.click()}
                className={`rounded-[8px] p-[24px] flex flex-col items-center gap-[12px] border-[1.5px] border-dashed transition-colors ${
                  isDragging
                    ? "border-[#2563eb] bg-[rgba(37,99,235,0.05)]"
                    : "border-[#24252a] hover:border-[#373a42] bg-[#111215]"
                } ${!selectedFile ? "cursor-pointer" : ""}`}
              >
                {selectedFile ? (
                  <div className="flex flex-col items-center gap-[8px]">
                    <div className="w-[36px] h-[36px] rounded-[8px] border border-[#212328] bg-[#111215] flex items-center justify-center shrink-0">
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#74757b" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <p className="text-[12px] font-medium text-white max-w-[320px] truncate">{selectedFile.name}</p>
                      <p className="text-[10px] text-[#74757b] mt-[2px]">{formatSize(selectedFile.size)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setSelectedFile(null); setFileError(""); }}
                      className="text-[11px] text-[#ef4444] hover:underline cursor-pointer"
                    >
                      Remove File
                    </button>
                  </div>
                ) : (
                  <>
                    <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="#545659" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div className="text-center pointer-events-none">
                      <p className="text-[13px] font-medium text-white">Drag and drop your files</p>
                      <p className="text-[11px] mt-[4px] text-[#545659]">JPEG, PNG, PDF, and XLSX formats, up to 50MB</p>
                    </div>
                    {fileError && (
                      <p className="text-[11px] text-[#ef4444] font-medium">{fileError}</p>
                    )}
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                      className="h-[30px] px-[16px] rounded-[6px] text-[12px] font-medium text-[#9ea0a6] bg-[#111215] border border-[#212328] hover:text-white hover:border-[#3e4047] transition-colors cursor-pointer"
                    >
                      Select File
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Grid Fields */}
          <div className="grid grid-cols-2 gap-[12px]">
            <div>
              <label className="block text-[12px] text-[#74757b] mb-[8px]">Company Name</label>
              <input className="w-full h-[42px] px-[12px] rounded-[6px] text-[13px] text-white bg-[#111215] border border-[#212328] outline-none focus:border-[#3e4047] transition-colors" />
            </div>
            <div>
              <label className="block text-[12px] text-[#74757b] mb-[8px]">Country</label>
              <input className="w-full h-[42px] px-[12px] rounded-[6px] text-[13px] text-white bg-[#111215] border border-[#212328] outline-none focus:border-[#3e4047] transition-colors" />
            </div>
            <div>
              <label className="block text-[12px] text-[#74757b] mb-[8px]">LC Reference</label>
              <input className="w-full h-[42px] px-[12px] rounded-[6px] text-[13px] text-white bg-[#111215] border border-[#212328] outline-none focus:border-[#3e4047] transition-colors" />
            </div>
            <div>
              <label className="block text-[12px] text-[#74757b] mb-[8px]">Bank</label>
              <AppSelect
                variant="default"
                size="lg"
                value={bank}
                onChange={setBank}
                options={[]}
                placeholder="Select bank"
              />
            </div>
            <div>
              <label className="block text-[12px] text-[#74757b] mb-[8px]">Branch</label>
              <input className="w-full h-[42px] px-[12px] rounded-[6px] text-[13px] text-white bg-[#111215] border border-[#212328] outline-none focus:border-[#3e4047] transition-colors" />
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
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-[24px] py-[16px] border-t border-[#212328] shrink-0">
          <button
            onClick={handleClose}
            className="h-[38px] px-[20px] rounded-[8px] text-[13px] font-medium text-[#9ea0a6] bg-[#111215] border border-[#212328] hover:text-white hover:border-[#3e4047] cursor-pointer transition-colors"
          >
            Cancel
          </button>
          <button className="h-[38px] px-[20px] rounded-[8px] text-[13px] font-medium text-white bg-[#2563eb] hover:bg-[#1d4ed8] cursor-pointer transition-colors">
            Create Order
          </button>
        </div>
      </div>
    </div>
  );
}
