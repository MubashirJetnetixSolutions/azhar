"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { reports } from "@/data/mockData";
import CreateReportModal from "@/components/modals/CreateReportModal";
import UploadReportsModal from "@/components/modals/UploadReportsModal";
import DeleteConfirmModal from "@/components/modals/DeleteConfirmModal";
import AppSelect from "@/components/ui/AppSelect";

function Toast({ message, type, onDismiss }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 3500);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const ok = type === "success";
  return (
    <div className="fixed bottom-[24px] right-[24px] z-[200] flex items-center gap-[12px] px-[18px] py-[14px] bg-[#1c1d22] border border-[#212328] rounded-[12px] shadow-2xl animate-[toastIn_0.2s_ease-out_forwards]">
      <style>{`@keyframes toastIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div className={`w-[18px] h-[18px] rounded-full flex items-center justify-center shrink-0 ${ok ? "bg-[rgba(34,197,94,0.15)]" : "bg-[rgba(239,68,68,0.15)]"}`}>
        {ok ? (
          <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke={ok ? "#22c55e" : "#ef4444"} strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
        ) : (
          <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="#ef4444" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
        )}
      </div>
      <span className="text-[13px] text-[#cdd0d6] font-normal leading-none">{message}</span>
      <button onClick={onDismiss} className="ml-[4px] text-[#545659] hover:text-white transition-colors cursor-pointer shrink-0">
        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>
  );
}

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

  // Filter States (react-select options: { value, label } | null)
  const [orderNumberFilter, setOrderNumberFilter] = useState("");
  const [bankFilter, setBankFilter] = useState(null);
  const [assignedToFilter, setAssignedToFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);
  const [typeFilter, setTypeFilter] = useState(null);
  const [countryFilter, setCountryFilter] = useState(null);
  const [dateFilter, setDateFilter] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);
  const [downloadingRow, setDownloadingRow] = useState(null);
  const toastSeq = useRef(0);

  const handleDownload = async (row) => {
    if (downloadingRow) return;
    // Rows rendered from the seed data keep their original identity, so the
    // index into the `reports` dataset doubles as the report id server-side.
    const reportIndex = reports.indexOf(row);
    if (reportIndex === -1) {
      setToast({ type: "error", message: "No generated report exists for this file yet.", id: `dl-${++toastSeq.current}` });
      return;
    }
    setDownloadingRow(row);
    try {
      const res = await fetch(`/api/reports/${reportIndex}/pdf`);
      if (!res.ok) {
        // The API reports the underlying failure in `detail`; surface it so
        // production errors are diagnosable from the toast instead of only
        // the Vercel function logs.
        const body = await res.json().catch(() => null);
        throw new Error(body?.detail || body?.error || `Request failed (${res.status})`);
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${row.company} - Credit Report.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setToast({ type: "success", message: "Report downloaded successfully.", id: `dl-${++toastSeq.current}` });
    } catch (err) {
      setToast({
        type: "error",
        message: err?.message || "Failed to generate the report PDF.",
        id: `dl-${++toastSeq.current}`,
      });
    } finally {
      setDownloadingRow(null);
    }
  };

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
    setBankFilter(null);
    setAssignedToFilter(null);
    setStatusFilter(null);
    setTypeFilter(null);
    setCountryFilter(null);
    setDateFilter(null);
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
        String(row.bank ?? "").toUpperCase() === bankFilter.value.toUpperCase()
      );
    }

    if (assignedToFilter) {
      result = result.filter(row =>
        String(row.assignedTo ?? "").toLowerCase() === assignedToFilter.value.toLowerCase()
      );
    }

    if (statusFilter) {
      result = result.filter(row =>
        String(row.status ?? "").toLowerCase() === statusFilter.value.toLowerCase()
      );
    }

    if (typeFilter) {
      result = result.filter(row =>
        String(row.type ?? "").toLowerCase() === typeFilter.value.toLowerCase()
      );
    }

    if (countryFilter) {
      result = result.filter(row =>
        String(row.country ?? "").toLowerCase() === countryFilter.value.toLowerCase()
      );
    }

    if (dateFilter) {
      const df = dateFilter.value;
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      result = result.filter(row => {
        const rowDate = parseDateString(row.date);
        if (!rowDate) return false;

        const diffTime = today.getTime() - rowDate.getTime();
        const diffDays = Math.floor(diffTime / (1024 * 60 * 60 * 24));

        if (df === "Today") {
          return diffDays === 0;
        } else if (df === "Last 7 Days") {
          return diffDays >= 0 && diffDays <= 7;
        } else if (df === "Last 30 Days") {
          return diffDays >= 0 && diffDays <= 30;
        } else if (df === "This Month") {
          return rowDate.getMonth() === today.getMonth() && rowDate.getFullYear() === today.getFullYear();
        }
        return true;
      });
    }

    return result;
  }, [searchTerm, reportsList, orderNumberFilter, bankFilter, assignedToFilter, statusFilter, typeFilter, countryFilter, dateFilter]);

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
                <AppSelect
                  variant="default"
                  size="md"
                  value={bankFilter}
                  onChange={(opt) => { setBankFilter(opt); setPage(1); }}
                  placeholder="All Banks"
                  isClearable
                  options={[
                    { value: "MBL",  label: "MBL"  },
                    { value: "UBL",  label: "UBL"  },
                    { value: "HBL",  label: "HBL"  },
                    { value: "ABL",  label: "ABL"  },
                    { value: "BAHL", label: "BAHL" },
                    { value: "MCB",  label: "MCB"  },
                  ]}
                />
              </div>

              {/* Assigned To Filter */}
              <div className="flex-1">
                <label className="block text-[11px] text-[#74757b] font-normal mb-[6px]">Assigned To</label>
                <AppSelect
                  variant="default"
                  size="md"
                  value={assignedToFilter}
                  onChange={(opt) => { setAssignedToFilter(opt); setPage(1); }}
                  placeholder="All Assignees"
                  isClearable
                  isSearchable
                  options={[
                    { value: "Zaki Javed",    label: "Zaki Javed"    },
                    { value: "Asad Chaudhry", label: "Asad Chaudhry" },
                    { value: "Khalil Rizvi",  label: "Khalil Rizvi"  },
                    { value: "Tariq Javed",   label: "Tariq Javed"   },
                    { value: "Zain Raza",     label: "Zain Raza"     },
                    { value: "Shujaat Khan",  label: "Shujaat Khan"  },
                    { value: "Wajid Farooq",  label: "Wajid Farooq"  },
                  ]}
                />
              </div>

              {/* Status Filter */}
              <div className="flex-1">
                <label className="block text-[11px] text-[#74757b] font-normal mb-[6px]">Status</label>
                <AppSelect
                  variant="default"
                  size="md"
                  value={statusFilter}
                  onChange={(opt) => { setStatusFilter(opt); setPage(1); }}
                  placeholder="All Statuses"
                  isClearable
                  options={[
                    { value: "Complete",    label: "Complete"    },
                    { value: "Pending",     label: "Pending"     },
                    { value: "In Progress", label: "In Progress" },
                    { value: "Cancelled",   label: "Cancelled"   },
                  ]}
                />
              </div>

              {/* Type Filter */}
              <div className="flex-1">
                <label className="block text-[11px] text-[#74757b] font-normal mb-[6px]">Type</label>
                <AppSelect
                  variant="default"
                  size="md"
                  value={typeFilter}
                  onChange={(opt) => { setTypeFilter(opt); setPage(1); }}
                  placeholder="All Types"
                  isClearable
                  options={[
                    { value: "SMEs",      label: "SMEs"      },
                    { value: "Corporate", label: "Corporate" },
                  ]}
                />
              </div>

              {/* Country Filter */}
              <div className="flex-1">
                <label className="block text-[11px] text-[#74757b] font-normal mb-[6px]">Country</label>
                <AppSelect
                  variant="default"
                  size="md"
                  value={countryFilter}
                  onChange={(opt) => { setCountryFilter(opt); setPage(1); }}
                  placeholder="All Countries"
                  isClearable
                  isSearchable
                  options={[
                    { value: "Pakistan",           label: "Pakistan"           },
                    { value: "UAE",                label: "UAE"                },
                    { value: "Saudi Arabia",       label: "Saudi Arabia"       },
                    { value: "Germany",            label: "Germany"            },
                    { value: "Italy",              label: "Italy"              },
                    { value: "China",              label: "China"              },
                    { value: "Australia",          label: "Australia"          },
                    { value: "Spain",              label: "Spain"              },
                    { value: "Russian Federation", label: "Russian Federation" },
                  ]}
                />
              </div>

              {/* Date Filter */}
              <div className="flex-1">
                <label className="block text-[11px] text-[#74757b] font-normal mb-[6px]">Date</label>
                <AppSelect
                  variant="default"
                  size="md"
                  value={dateFilter}
                  onChange={(opt) => { setDateFilter(opt); setPage(1); }}
                  placeholder="All Dates"
                  isClearable
                  options={[
                    { value: "Today",         label: "Today"         },
                    { value: "Last 7 Days",   label: "Last 7 Days"   },
                    { value: "Last 30 Days",  label: "Last 30 Days"  },
                    { value: "This Month",    label: "This Month"    },
                    { value: "Custom Range",  label: "Custom Range"  },
                  ]}
                />
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
                    "Type",
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
                      {/* Type */}
                      <td className="px-[16px] py-[12px] h-[60px] text-[12px] text-[#9ea0a6] align-middle whitespace-nowrap">
                        {row.type}
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
                          <button
                            onClick={(e) => { e.stopPropagation(); handleDownload(row); }}
                            disabled={downloadingRow === row}
                            className="w-[32px] h-[32px] rounded-[6px] border border-[#373a42] bg-[#1e2027] hover:border-[#484b54] hover:bg-[#272b34] flex items-center justify-center text-[#cdd0d6] hover:text-white cursor-pointer transition-colors duration-100 disabled:opacity-60 disabled:cursor-wait"
                          >
                            {downloadingRow === row ? (
                              <svg className="animate-spin" width="12" height="12" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                              </svg>
                            ) : (
                              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                            )}
                          </button>
                          {/* Delete */}
                          <button
                            onClick={(e) => { e.stopPropagation(); setDeleteTarget(row); }}
                            className="w-[32px] h-[32px] rounded-[6px] border border-[#373a42] bg-[#1e2027] hover:border-red-900/50 hover:bg-[rgba(239,68,68,0.06)] flex items-center justify-center text-[#cdd0d6] hover:text-red-400 cursor-pointer transition-colors duration-100"
                          >
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
      <DeleteConfirmModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => {
          setReportsList((prev) => prev.filter((r) => r !== deleteTarget));
          setDeleteTarget(null);
          setToast({ type: "success", message: "Report deleted successfully.", id: Date.now() });
        }}
      />
      {toast && (
        <Toast key={toast.id} type={toast.type} message={toast.message} onDismiss={() => setToast(null)} />
      )}
    </>
  );
}
