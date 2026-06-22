"use client";

import { useState, useMemo } from "react";
import { reports } from "@/data/mockData";
import CreateReportModal from "@/components/modals/CreateReportModal";
import UploadReportsModal from "@/components/modals/UploadReportsModal";

const PER_PAGE = 8; // Showing 8 rows as in the mockup screenshot

const parseDateString = (dateStr) => {
  if (!dateStr) return null;
  const parts = dateStr.trim().split(/\s+/);
  if (parts.length !== 3) return null;
  const day = parseInt(parts[0], 10);
  const monthStr = parts[1].toUpperCase();
  const year = parseInt(parts[2], 10);

  const months = {
    JAN: 0, FEB: 1, MAR: 2, APR: 3, MAY: 4, JUN: 5,
    JUL: 6, AUG: 7, SEP: 8, OCT: 9, NOV: 10, DEC: 11
  };

  const month = months[monthStr];
  if (month === undefined || isNaN(day) || isNaN(year)) return null;
  return new Date(year, month, day);
};

export default function ReportHubPage() {
  const [reportsList, setReportsList] = useState(reports);
  const [modalOpen, setModalOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  // Filter States
  const [orderNumberFilter, setOrderNumberFilter] = useState("");
  const [bankFilter, setBankFilter] = useState("");
  const [assignedToFilter, setAssignedToFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const handleUploadReport = (newReport) => {
    const enrichedReport = {
      orderNumber: "",
      assignedTo: "Zaki Javed",
      status: "Complete",
      ...newReport
    };
    setReportsList(prev => [enrichedReport, ...prev]);
    setPage(1);
  };

  const handleResetFilters = () => {
    setOrderNumberFilter("");
    setBankFilter("");
    setAssignedToFilter("");
    setStatusFilter("");
    setCountryFilter("");
    setDateFilter("");
    setPage(1);
  };

  const handleApplyFilters = () => {
    setFiltersOpen(false);
  };

  // Filtering
  const filtered = useMemo(() => {
    let result = reportsList;

    const q = searchTerm.trim().toLowerCase();
    if (q) {
      result = result.filter(row =>
        ["name", "company", "bank", "branch", "country"].some(k =>
          String(row[k] ?? "").toLowerCase().includes(q)
        )
      );
    }

    if (orderNumberFilter.trim()) {
      const orderQ = orderNumberFilter.trim().toLowerCase();
      result = result.filter(row =>
        String(row.orderNumber ?? "").toLowerCase().includes(orderQ)
      );
    }

    if (bankFilter) {
      result = result.filter(row =>
        String(row.bank ?? "").toUpperCase() === bankFilter.toUpperCase()
      );
    }

    if (assignedToFilter) {
      result = result.filter(row =>
        String(row.assignedTo ?? "").toLowerCase() === assignedToFilter.toLowerCase()
      );
    }

    if (statusFilter) {
      result = result.filter(row =>
        String(row.status ?? "").toLowerCase() === statusFilter.toLowerCase()
      );
    }

    if (countryFilter) {
      result = result.filter(row =>
        String(row.country ?? "").toLowerCase() === countryFilter.toLowerCase()
      );
    }

    if (dateFilter) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      result = result.filter(row => {
        const rowDate = parseDateString(row.date);
        if (!rowDate) return false;

        const diffTime = today.getTime() - rowDate.getTime();
        const diffDays = Math.floor(diffTime / (1024 * 60 * 60 * 24));

        if (dateFilter === "Today") {
          return diffDays === 0;
        } else if (dateFilter === "Last 7 Days") {
          return diffDays >= 0 && diffDays <= 7;
        } else if (dateFilter === "Last 30 Days") {
          return diffDays >= 0 && diffDays <= 30;
        } else if (dateFilter === "This Month") {
          return rowDate.getMonth() === today.getMonth() && rowDate.getFullYear() === today.getFullYear();
        }
        return true;
      });
    }

    return result;
  }, [searchTerm, reportsList, orderNumberFilter, bankFilter, assignedToFilter, statusFilter, countryFilter, dateFilter]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  return (
    <>
      <div className="space-y-[24px] py-4 px-4 md:py-5 md:px-7">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[12px]">
          <h1 className="text-[22px] font-bold text-white tracking-[-0.019em]">Report Hub</h1>
          <div className="flex items-center gap-[10px] flex-wrap">
            {/* Upload Reports Button */}
            <button
              onClick={() => setUploadOpen(true)}
              className="h-[34px] px-[14px] text-[12px] font-medium rounded-[6px] text-[#cdd0d6] border border-[#373a42] bg-[#1e2027] hover:border-[#484b54] hover:bg-[#272b34] cursor-pointer flex items-center gap-[6px] transition-colors duration-100"
            >
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.25}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Upload Reports
            </button>
            {/* Filters Button */}
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="h-[34px] px-[14px] text-[12px] font-medium rounded-[6px] text-[#cdd0d6] border border-[#373a42] bg-[#1e2027] hover:border-[#484b54] hover:bg-[#272b34] cursor-pointer flex items-center gap-[6px] transition-colors duration-100"
            >
              Filters
              <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.25}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {/* Search Input */}
            <div className="relative">
              <svg
                className="absolute left-[12px] top-1/2 -translate-y-1/2 pointer-events-none"
                width={13}
                height={13}
                fill="none"
                viewBox="0 0 24 24"
                stroke="#545659"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Find Reports"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
                className="w-full sm:w-[240px] h-[34px] pl-[34px] pr-[12px] rounded-[6px] bg-[#111215] text-[#9ea0a6] text-[12px] leading-none outline-none border border-[#24252a] focus:border-[#3e4047] transition-colors duration-120"
              />
            </div>
            {/* Create Report Button */}
            <button
              onClick={() => setModalOpen(true)}
              className="h-[34px] px-[16px] text-[12px] font-medium rounded-[6px] bg-[#2563eb] hover:bg-[#1d4ed8] text-white cursor-pointer transition-colors duration-120 flex items-center justify-center whitespace-nowrap"
            >
              Create Report
            </button>
          </div>
        </div>

        {/* Filters dropdown row */}
        {filtersOpen && (
          <div className="space-y-[12px] w-full">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-[12px] w-full">
              {/* Order Number Filter */}
              <div className="flex-1">
                <label className="block text-[11px] text-[#74757b] font-normal mb-[6px]">Order Number</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search Order Number"
                    value={orderNumberFilter}
                    onChange={(e) => {
                      setOrderNumberFilter(e.target.value);
                      setPage(1);
                    }}
                    className="w-full h-[34px] bg-[#111215] border border-[#24252a] rounded-[6px] text-white text-[11px] px-[12px] outline-none placeholder-[#545659] focus:border-[#3e4047] transition-colors"
                  />
                </div>
              </div>

              {/* Bank Filter */}
              <div className="flex-1">
                <label className="block text-[11px] text-[#74757b] font-normal mb-[6px]">Bank</label>
                <div className="relative">
                  <select
                    value={bankFilter}
                    onChange={(e) => {
                      setBankFilter(e.target.value);
                      setPage(1);
                    }}
                    className="w-full h-[34px] bg-[#111215] border border-[#24252a] rounded-[6px] text-[#cdd0d6] text-[11px] px-[10px] outline-none appearance-none cursor-pointer pr-[24px] focus:border-[#3e4047]"
                  >
                    <option value="">All Banks</option>
                    <option value="MBL">MBL</option>
                    <option value="UBL">UBL</option>
                    <option value="HBL">HBL</option>
                    <option value="ABL">ABL</option>
                    <option value="BAHL">BAHL</option>
                    <option value="MCB">MCB</option>
                  </select>
                  <div className="absolute right-[8px] top-1/2 -translate-y-1/2 pointer-events-none text-[#74757b]">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Assigned To Filter */}
              <div className="flex-1">
                <label className="block text-[11px] text-[#74757b] font-normal mb-[6px]">Assigned To</label>
                <div className="relative">
                  <select
                    value={assignedToFilter}
                    onChange={(e) => {
                      setAssignedToFilter(e.target.value);
                      setPage(1);
                    }}
                    className="w-full h-[34px] bg-[#111215] border border-[#24252a] rounded-[6px] text-[#cdd0d6] text-[11px] px-[10px] outline-none appearance-none cursor-pointer pr-[24px] focus:border-[#3e4047]"
                  >
                    <option value="">All Assignees</option>
                    <option value="Zaki Javed">Zaki Javed</option>
                    <option value="Asad Chaudhry">Asad Chaudhry</option>
                    <option value="Khalil Rizvi">Khalil Rizvi</option>
                    <option value="Tariq Javed">Tariq Javed</option>
                    <option value="Zain Raza">Zain Raza</option>
                    <option value="Shujaat Khan">Shujaat Khan</option>
                    <option value="Wajid Farooq">Wajid Farooq</option>
                  </select>
                  <div className="absolute right-[8px] top-1/2 -translate-y-1/2 pointer-events-none text-[#74757b]">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Status Filter */}
              <div className="flex-1">
                <label className="block text-[11px] text-[#74757b] font-normal mb-[6px]">Status</label>
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value);
                      setPage(1);
                    }}
                    className="w-full h-[34px] bg-[#111215] border border-[#24252a] rounded-[6px] text-[#cdd0d6] text-[11px] px-[10px] outline-none appearance-none cursor-pointer pr-[24px] focus:border-[#3e4047]"
                  >
                    <option value="">All Statuses</option>
                    <option value="Complete">Complete</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  <div className="absolute right-[8px] top-1/2 -translate-y-1/2 pointer-events-none text-[#74757b]">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Country Filter */}
              <div className="flex-1">
                <label className="block text-[11px] text-[#74757b] font-normal mb-[6px]">Country</label>
                <div className="relative">
                  <select
                    value={countryFilter}
                    onChange={(e) => {
                      setCountryFilter(e.target.value);
                      setPage(1);
                    }}
                    className="w-full h-[34px] bg-[#111215] border border-[#24252a] rounded-[6px] text-[#cdd0d6] text-[11px] px-[10px] outline-none appearance-none cursor-pointer pr-[24px] focus:border-[#3e4047]"
                  >
                    <option value="">All Countries</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="UAE">UAE</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="Germany">Germany</option>
                    <option value="Italy">Italy</option>
                    <option value="China">China</option>
                    <option value="Australia">Australia</option>
                    <option value="Spain">Spain</option>
                    <option value="Russian Federation">Russian Federation</option>
                  </select>
                  <div className="absolute right-[8px] top-1/2 -translate-y-1/2 pointer-events-none text-[#74757b]">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Date Filter */}
              <div className="flex-1">
                <label className="block text-[11px] text-[#74757b] font-normal mb-[6px]">Date</label>
                <div className="relative">
                  <select
                    value={dateFilter}
                    onChange={(e) => {
                      setDateFilter(e.target.value);
                      setPage(1);
                    }}
                    className="w-full h-[34px] bg-[#111215] border border-[#24252a] rounded-[6px] text-[#cdd0d6] text-[11px] px-[10px] outline-none appearance-none cursor-pointer pr-[24px] focus:border-[#3e4047]"
                  >
                    <option value="">All Dates</option>
                    <option value="Today">Today</option>
                    <option value="Last 7 Days">Last 7 Days</option>
                    <option value="Last 30 Days">Last 30 Days</option>
                    <option value="This Month">This Month</option>
                    <option value="Custom Range">Custom Range</option>
                  </select>
                  <div className="absolute right-[8px] top-1/2 -translate-y-1/2 pointer-events-none text-[#74757b]">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Reset / Apply Filters Buttons */}
            <div className="flex justify-end gap-[10px] pt-[4px]">
              <button
                onClick={handleResetFilters}
                className="h-[30px] px-[14px] text-[11px] font-normal rounded-[6px] border border-[#373a42] bg-[#1e2027] text-[#888] hover:text-white transition-colors duration-100 cursor-pointer"
              >
                Reset Filters
              </button>
              <button
                onClick={handleApplyFilters}
                className="h-[30px] px-[14px] text-[11px] font-medium text-white rounded-[6px] bg-[#2563eb] hover:bg-[#1d4ed8] transition-colors duration-120 cursor-pointer"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* Main Table Card Container */}
        <div className="bg-[#151619] border border-[#212328] rounded-[12px] overflow-hidden">
          <div className="overflow-x-auto scrolling-touch">
            <table className="w-full border-collapse min-w-[1000px]">
              <thead className="bg-[#18191d] border-b border-[#212328]">
                <tr>
                  {[
                    "File Name",
                    "File Size",
                    "Company",
                    "Bank",
                    "Country",
                    "Report Date",
                    "Actions"
                  ].map((label, idx) => (
                    <th
                      key={label}
                      className={`h-[40px] px-[16px] text-left text-[#545659] text-[11px] font-normal tracking-[0.03em] uppercase select-none ${
                        idx === 0 ? "pl-[24px]" : ""
                      } ${idx === 6 ? "pr-[24px]" : ""}`}
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pageRows.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-[40px] text-center text-[#74757b] text-[12px]">
                      No reports match your search.
                    </td>
                  </tr>
                ) : (
                  pageRows.map((row, i) => (
                    <tr
                      key={i}
                      className="hover:bg-[rgba(255,255,255,0.02)] transition-colors duration-100 border-b border-[#212328] last:border-0"
                    >
                      {/* File Name */}
                      <td className="pl-[24px] pr-[16px] py-[12px] h-[60px] align-middle">
                        <div className="flex items-center gap-[10px] group cursor-pointer">
                          <div className="w-[32px] h-[32px] rounded-[6px] border border-[#212328] bg-[#111215] flex items-center justify-center shrink-0 group-hover:border-[#373a42] transition-colors duration-100">
                            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#74757b" className="group-hover:stroke-[#9ea0a6] transition-colors duration-100" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <span className="text-[#cdd0d6] text-[12px] font-medium group-hover:text-white transition-colors duration-100">{row.name}</span>
                        </div>
                      </td>
                      {/* File Size */}
                      <td className="px-[16px] py-[12px] h-[60px] text-[12px] text-[#9ea0a6] align-middle whitespace-nowrap">
                        {row.size}
                      </td>
                      {/* Company */}
                      <td className="px-[16px] py-[12px] h-[60px] text-[12px] text-[#cdd0d6] max-w-[200px] truncate align-middle">
                        {row.company}
                      </td>
                      {/* Bank */}
                      <td className="px-[16px] py-[12px] h-[60px] align-middle whitespace-nowrap">
                        <div>
                          <p className="text-[12px] text-[#cdd0d6] leading-[15px] font-normal">{row.bank}</p>
                          <p className="text-[10px] text-[#74757b] leading-[13px] mt-[1px] font-normal">{row.branch}</p>
                        </div>
                      </td>
                      {/* Country */}
                      <td className="px-[16px] py-[12px] h-[60px] text-[12px] text-[#9ea0a6] align-middle whitespace-nowrap">
                        {row.country}
                      </td>
                      {/* Report Date */}
                      <td className="px-[16px] py-[12px] h-[60px] text-[12px] text-[#9ea0a6] align-middle whitespace-nowrap">
                        {row.date}
                      </td>
                      {/* Actions */}
                      <td className="pl-[16px] pr-[24px] py-[12px] h-[60px] align-middle">
                        <div className="flex items-center gap-[6px]">
                          {/* Download */}
                          <button className="w-[32px] h-[32px] rounded-[6px] border border-[#373a42] bg-[#1e2027] hover:border-[#484b54] hover:bg-[#272b34] flex items-center justify-center text-[#cdd0d6] hover:text-white cursor-pointer transition-colors duration-100">
                            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                          </button>
                          {/* Delete */}
                          <button className="w-[32px] h-[32px] rounded-[6px] border border-[#373a42] bg-[#1e2027] hover:border-[#484b54] hover:bg-[#272b34] flex items-center justify-center text-[#cdd0d6] hover:text-white cursor-pointer transition-colors duration-100">
                            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Section */}
          <div className="flex items-center justify-between p-[14px_24px_16px_24px] border-t border-[#212328] flex-wrap gap-[12px]">
            <span className="text-[#74757b] text-[12px] font-normal">
              {filtered.length === 0
                ? "Showing 0 of 0 orders"
                : `Showing ${pageRows.length} of ${filtered.length} orders`}
            </span>
            <div className="flex items-center gap-[8px]">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={safePage === 1}
                className={`h-[28px] px-[12px] text-[11px] font-normal rounded-[6px] border border-[#212328] bg-[#111215] transition-colors duration-100 flex items-center gap-[4px] ${
                  safePage === 1
                    ? "text-[#3e4047] cursor-not-allowed"
                    : "text-[#888] hover:bg-[#1c1d22] hover:text-white cursor-pointer"
                }`}
              >
                &lt; Prev
              </button>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                className={`h-[28px] px-[12px] text-[11px] font-normal rounded-[6px] border border-[#212328] bg-[#111215] transition-colors duration-100 flex items-center gap-[4px] ${
                  safePage === totalPages
                    ? "text-[#3e4047] cursor-not-allowed"
                    : "text-[#888] hover:bg-[#1c1d22] hover:text-white cursor-pointer"
                }`}
              >
                Next &gt;
              </button>
            </div>
          </div>
        </div>
      </div>

      <CreateReportModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <UploadReportsModal open={uploadOpen} onClose={() => setUploadOpen(false)} onUpload={handleUploadReport} />
    </>
  );
}
