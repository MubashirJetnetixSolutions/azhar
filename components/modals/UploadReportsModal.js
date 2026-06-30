"use client";

import { useState, useRef } from "react";
import AppSelect from "@/components/ui/AppSelect";
import AppDatePicker from "@/components/ui/AppDatePicker";

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

const BANK_SELECT_OPTIONS = BANKS.map((b) => ({ value: b.code, label: b.name }));
const COUNTRY_OPTIONS = COUNTRIES.map((c) => ({ value: c, label: c }));

const formatDateStr = (d) => {
  if (!d) return "";
  const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
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
  const [bank, setBank] = useState(null);
  const [branch, setBranch] = useState(null);
  const [country, setCountry] = useState(null);
  const [date, setDate] = useState(new Date());
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
        bank: bank?.value ?? "",
        branch: branch?.value ?? "",
        country: country?.value ?? "",
        date: formatDateStr(date),
      });
    }
    setSelectedFile(null);
    setCompanyName("");
    setBank(null);
    setBranch(null);
    setCountry(null);
    setDate(new Date());
    setError("");
    onClose();
  };

  const availableBranchOptions = bank
    ? (BANK_BRANCHES[bank.value] || []).map((b) => ({ value: b, label: b }))
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative rounded-[14px] w-[500px] max-w-[calc(100vw-32px)] mx-4 bg-[#1c1d22] border border-[#28292f] shadow-2xl flex flex-col overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-[24px] py-[18px] border-b border-[#212328]">
          <div className="flex items-center gap-[12px]">
            <div className="w-[36px] h-[36px] rounded-[8px] bg-[#111215] border border-[#212328] flex items-center justify-center shrink-0">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#74757b" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
            <span className="text-[15px] font-semibold text-white">Upload Reports</span>
          </div>
          <button onClick={onClose} className="text-[#545659] hover:text-white transition-colors cursor-pointer">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Content */}
        <div className="px-[24px] py-[20px] space-y-[16px]">
          {/* File Upload Box */}
          <div>
            <label className="block text-[12px] text-[#74757b] mb-[8px]">Upload File</label>
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
                  ? "border-[#2563eb] bg-[rgba(37,99,235,0.05)]"
                  : "border-[#24252a] hover:border-[#373a42] bg-[#111215]"
              }`}
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
                    className="h-[30px] px-[16px] rounded-[6px] text-[12px] font-medium text-[#9ea0a6] bg-[#111215] border border-[#212328] hover:text-white hover:border-[#3e4047] transition-colors cursor-pointer"
                  >
                    Select File
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-[12px] text-[#74757b] mb-[8px]">Company Name</label>
            <input
              type="text"
              placeholder="Enter Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full h-[42px] px-[12px] rounded-[6px] text-[13px] text-white bg-[#111215] border border-[#212328] outline-none focus:border-[#3e4047] transition-colors placeholder-[#545659]"
            />
          </div>

          {/* Grid fields */}
          <div className="grid grid-cols-2 gap-[16px]">
            <div>
              <label className="block text-[12px] text-[#74757b] mb-[8px]">Bank</label>
              <AppSelect
                variant="default"
                size="md"
                value={bank}
                onChange={(opt) => { setBank(opt); setBranch(null); }}
                options={BANK_SELECT_OPTIONS}
                placeholder="Select Bank"
                isSearchable
                isClearable
              />
            </div>
            <div>
              <label className="block text-[12px] text-[#74757b] mb-[8px]">Branch</label>
              <AppSelect
                variant="default"
                size="md"
                value={branch}
                onChange={setBranch}
                options={availableBranchOptions}
                placeholder="Select Branch"
                isDisabled={!bank}
                isSearchable
              />
            </div>
            <div>
              <label className="block text-[12px] text-[#74757b] mb-[8px]">Country</label>
              <AppSelect
                variant="default"
                size="md"
                value={country}
                onChange={setCountry}
                options={COUNTRY_OPTIONS}
                placeholder="Select Country"
                isSearchable
              />
            </div>
            <div>
              <label className="block text-[12px] text-[#74757b] mb-[8px]">Date</label>
              <AppDatePicker
                variant="default"
                size="md"
                selected={date}
                onChange={setDate}
                placeholder="Select date"
                isClearable
              />
            </div>
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
          <button
            onClick={handleSubmit}
            disabled={!selectedFile || !companyName || !bank || !branch || !country || !date}
            className="h-[38px] px-[20px] rounded-[8px] text-[13px] font-medium text-white bg-[#2563eb] hover:bg-[#1d4ed8] disabled:bg-[#2563eb]/40 disabled:text-white/40 disabled:cursor-not-allowed cursor-pointer transition-colors"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
