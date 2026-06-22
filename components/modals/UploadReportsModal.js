"use client";

import { useState, useRef } from "react";

const BANKS = [
  { code: "MBL", name: "MBL" },
  { code: "UBL", name: "UBL" },
  { code: "MCB", name: "MCB" },
  { code: "HBL", name: "HBL" },
  { code: "BAHL", name: "BAHL" },
  { code: "ABL", name: "ABL" }
];

const BANK_BRANCHES = {
  MBL: ["Hyderi Branch", "Johar Branch", "Nagan Chorangi Branch"],
  UBL: ["Gulshan Branch"],
  MCB: ["Ii Chundrigar Branch", "U Chundrigarh Branch"],
  HBL: ["3 Talwar Branch"],
  BAHL: ["Hyderi Branch"],
  ABL: ["Bahadurabad Branch"]
};

const COUNTRIES = [
  "Russian Federation",
  "Italy",
  "Australia",
  "China",
  "Hong Kong",
  "Germany",
  "Spain"
];

const getTodayFormatted = () => {
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const d = new Date();
  const day = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
};

const formatFileSize = (bytes) => {
  if (bytes >= 1024 * 1024) {
    return (bytes / (1024 * 1024)).toFixed(0) + " Mb";
  }
  return (bytes / 1024).toFixed(0) + " Kb";
};

export default function UploadReportsModal({ open, onClose, onUpload }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [bank, setBank] = useState("");
  const [branch, setBranch] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(getTodayFormatted());
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef(null);

  if (!open) return null;

  const handleFile = (file) => {
    if (!file) return;
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setError("Only PDF files are supported.");
      setSelectedFile(null);
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      setError("File size exceeds the 50MB limit.");
      setSelectedFile(null);
      return;
    }
    setError("");
    setSelectedFile(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    handleFile(file);
  };

  const handleContainerClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = () => {
    if (!selectedFile || !companyName || !bank || !branch || !country || !date) return;
    if (onUpload) {
      onUpload({
        name: selectedFile.name,
        size: formatFileSize(selectedFile.size),
        company: companyName,
        bank: bank,
        branch: branch,
        country: country,
        date: date
      });
    }
    // Reset state and close
    setSelectedFile(null);
    setCompanyName("");
    setBank("");
    setBranch("");
    setCountry("");
    setDate(getTodayFormatted());
    setError("");
    onClose();
  };

  const availableBranches = bank ? (BANK_BRANCHES[bank] || []) : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px]" onClick={onClose} />

      <div className="relative rounded-[12px] w-[500px] max-w-full mx-4 bg-[#151619] border border-[#212328] shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-[12px] p-[20px_24px] border-b border-[#212328]">
          <div className="w-[32px] h-[32px] rounded-[6px] border border-[#212328] bg-[#111215] flex items-center justify-center shrink-0">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#74757b" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </div>
          <span className="text-[16px] font-semibold text-white">Upload Reports</span>
          <button onClick={onClose} className="ml-auto text-[#74757b] hover:text-white cursor-pointer transition-colors duration-100">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Content */}
        <div className="p-[20px_24px_24px_24px] space-y-[16px]">
          {/* File Upload Box */}
          <div>
            <label className="block text-[11px] text-[#74757b] font-normal mb-[6px]">Upload File</label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf"
              className="hidden"
            />
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleContainerClick}
              className={`rounded-[8px] p-[24px] flex flex-col items-center gap-[12px] border-[1.5px] border-dashed transition-colors duration-150 cursor-pointer ${
                isDragging
                  ? "border-[#2563eb] bg-[#1c1e24]"
                  : "border-[#24252a] hover:border-[#373a42] bg-[#111215]"
              }`}
            >
              {selectedFile ? (
                <div className="flex flex-col items-center gap-[8px]">
                  <div className="w-[32px] h-[32px] rounded-[6px] border border-[#212328] bg-[#111215] flex items-center justify-center shrink-0">
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#74757b" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="text-[12px] font-medium text-white max-w-[320px] truncate">{selectedFile.name}</p>
                    <p className="text-[10px] text-[#74757b] mt-[2px]">{formatFileSize(selectedFile.size)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFile(null);
                    }}
                    className="text-[11px] text-[#ef4444] hover:underline mt-[4px] cursor-pointer"
                  >
                    Remove File
                  </button>
                </div>
              ) : (
                <>
                  <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="#545659" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div className="text-center pointer-events-none">
                    <p className="text-[13px] font-medium text-white">Drag and drop your files</p>
                    <p className="text-[11px] mt-[4px] text-[#545659]">PDF formats, up to 50MB</p>
                  </div>
                  {error && (
                    <p className="text-[11px] text-[#ef4444] font-medium mt-[2px]">{error}</p>
                  )}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    className="h-[30px] px-[16px] rounded-[6px] text-[12px] font-medium text-white transition-colors bg-[#1e2027] border border-[#373a42] hover:bg-[#272b34] cursor-pointer"
                  >
                    Select File
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-[11px] text-[#74757b] font-normal mb-[6px]">Company Name</label>
            <input
              type="text"
              placeholder="Enter Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full h-[34px] px-[12px] rounded-[6px] bg-[#111215] border border-[#24252a] text-white text-[12px] focus:border-[#3e4047] outline-none placeholder-[#545659]"
            />
          </div>

          {/* Grid fields */}
          <div className="grid grid-cols-2 gap-[16px]">
            {/* Bank */}
            <div>
              <label className="block text-[11px] text-[#74757b] font-normal mb-[6px]">Bank</label>
              <div className="relative">
                <select
                  value={bank}
                  onChange={(e) => {
                    setBank(e.target.value);
                    setBranch("");
                  }}
                  className="w-full h-[34px] bg-[#111215] border border-[#24252a] rounded-[6px] text-[#cdd0d6] text-[11px] px-[10px] outline-none appearance-none cursor-pointer pr-[24px]"
                >
                  <option value="">Select Bank</option>
                  {BANKS.map((b) => (
                    <option key={b.code} value={b.code}>{b.name}</option>
                  ))}
                </select>
                <div className="absolute right-[8px] top-1/2 -translate-y-1/2 pointer-events-none text-[#74757b]">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Branch */}
            <div>
              <label className="block text-[11px] text-[#74757b] font-normal mb-[6px]">Branch</label>
              <div className="relative">
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  disabled={!bank}
                  className="w-full h-[34px] bg-[#111215] border border-[#24252a] rounded-[6px] text-[#cdd0d6] text-[11px] px-[10px] outline-none appearance-none cursor-pointer pr-[24px] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">Select Branch</option>
                  {availableBranches.map((br) => (
                    <option key={br} value={br}>{br}</option>
                  ))}
                </select>
                <div className="absolute right-[8px] top-1/2 -translate-y-1/2 pointer-events-none text-[#74757b]">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Country */}
            <div>
              <label className="block text-[11px] text-[#74757b] font-normal mb-[6px]">Country</label>
              <div className="relative">
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full h-[34px] bg-[#111215] border border-[#24252a] rounded-[6px] text-[#cdd0d6] text-[11px] px-[10px] outline-none appearance-none cursor-pointer pr-[24px]"
                >
                  <option value="">Select Country</option>
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <div className="absolute right-[8px] top-1/2 -translate-y-1/2 pointer-events-none text-[#74757b]">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="block text-[11px] text-[#74757b] font-normal mb-[6px]">Date</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. 19 JUN 2026"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full h-[34px] pl-[12px] pr-[34px] rounded-[6px] bg-[#111215] border border-[#24252a] text-white text-[12px] focus:border-[#3e4047] outline-none placeholder-[#545659]"
                />
                <div className="absolute right-[10px] top-1/2 -translate-y-1/2 pointer-events-none text-[#74757b]">
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-[10px] px-[24px] py-[16px] border-t border-[#212328]">
          <button
            onClick={onClose}
            className="h-[34px] px-[16px] rounded-[6px] text-[12px] font-medium transition-colors bg-[#1e2027] text-[#888] border border-[#373a42] hover:bg-[#272b34] hover:text-white cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedFile || !companyName || !bank || !branch || !country || !date}
            className="h-[34px] px-[16px] rounded-[6px] text-[12px] font-medium text-white transition-colors bg-[#2563eb] hover:bg-[#1d4ed8] disabled:bg-[#2563eb]/40 disabled:text-white/40 disabled:cursor-not-allowed cursor-pointer"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
