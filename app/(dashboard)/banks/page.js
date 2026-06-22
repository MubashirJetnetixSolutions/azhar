"use client";

import { useState, useMemo, useEffect } from "react";
import { banks, reports, orders, invoices } from "@/data/mockData";
import CreateBankModal from "@/components/modals/CreateBankModal";
import DeleteConfirmModal from "@/components/modals/DeleteConfirmModal";

function ActionButtons({ onEdit, onDelete }) {
  return (
    <div className="flex gap-[6px] justify-end">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onEdit?.();
        }}
        className="w-[28px] h-[28px] rounded-[6px] border border-[#212328] bg-[#111215] text-[#9ea0a6] hover:text-white hover:bg-[rgba(255,255,255,0.04)] flex items-center justify-center transition-colors duration-120 cursor-pointer"
        title="Edit"
      >
        <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onDelete?.();
        }}
        className="w-[28px] h-[28px] rounded-[6px] border border-[#212328] bg-[#111215] text-[#9ea0a6] hover:text-red-400 hover:border-red-900/50 hover:bg-[rgba(239,68,68,0.05)] flex items-center justify-center transition-colors duration-120 cursor-pointer"
        title="Delete"
      >
        <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
}

function StatusBadge({ status }) {
  const isActive = status?.toLowerCase() === "active";
  return (
    <span
      className={`inline-flex items-center justify-center h-[22px] px-[8px] rounded-[4px] text-[11px] font-medium border tracking-wide ${
        isActive
          ? "bg-[rgba(34,197,94,0.12)] border-[rgba(34,197,94,0.18)] text-[#22c55e]"
          : "bg-[rgba(239,68,68,0.12)] border-[rgba(239,68,68,0.18)] text-[#ef4444]"
      }`}
    >
      {status}
    </span>
  );
}

function EmptyState({ message, cols = 10 }) {
  return (
    <tr>
      <td colSpan={cols} className="py-[32px] text-center">
        <div className="flex flex-col items-center gap-[8px]">
          <svg width={28} height={28} fill="none" viewBox="0 0 24 24" stroke="#3e4047" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="text-[12px] text-[#545659]">{message}</span>
        </div>
      </td>
    </tr>
  );
}

export default function BanksPage() {
  const [expandedId, setExpandedId] = useState(1);
  const [createOpen, setCreateOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [drawerBranch, setDrawerBranch] = useState(null);
  const [drawerParentBank, setDrawerParentBank] = useState(null);
  const [activeTab, setActiveTab] = useState("All Reports");
  const [tabSearch, setTabSearch] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setDrawerBranch(null);
        setDrawerParentBank(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredBanks = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return banks;
    return banks.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.address.toLowerCase().includes(q) ||
        (b.branches || []).some(
          (br) =>
            br.name.toLowerCase().includes(q) ||
            br.address.toLowerCase().includes(q)
        )
    );
  }, [searchTerm]);

  // Tab data — show all records; search filters within the active tab
  const drawerReports = reports;
  const drawerOrders = orders;
  const drawerInvoices = invoices;

  const activeTabRows = useMemo(() => {
    const base =
      activeTab === "All Reports" ? drawerReports :
      activeTab === "All Orders" ? drawerOrders :
      drawerInvoices;

    const q = tabSearch.trim().toLowerCase();
    if (!q) return base;
    return base.filter((item) =>
      Object.values(item).some((v) => String(v ?? "").toLowerCase().includes(q))
    );
  }, [activeTab, tabSearch]);

  const tabLabel = activeTab === "All Reports" ? "Reports" : activeTab === "All Orders" ? "Orders" : "Invoices";
  const tabPlaceholder = activeTab === "All Reports" ? "Find Reports" : activeTab === "All Orders" ? "Find Orders" : "Find Invoices";
  const emptyStateMessage = activeTab === "All Reports" ? "No Reports Found" : activeTab === "All Orders" ? "No Orders Found" : "No Invoices Found";

  const openDrawer = (bank, branch) => {
    setDrawerParentBank(bank);
    setDrawerBranch(branch);
    setActiveTab("All Reports");
    setTabSearch("");
  };

  const closeDrawer = () => {
    setDrawerBranch(null);
    setDrawerParentBank(null);
  };

  const isDrawerOpen = drawerBranch !== null;

  return (
    <div className="space-y-[24px] py-4 px-4 md:py-5 md:px-7">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[12px]">
        <h1 className="text-[22px] font-bold text-white tracking-[-0.019em]">
          Banks
        </h1>
        <div className="flex items-center gap-[12px] flex-wrap">
          <div className="relative flex-1 sm:flex-none">
            <svg
              className="absolute left-[12px] top-1/2 -translate-y-1/2 pointer-events-none"
              width={13}
              height={13}
              fill="none"
              viewBox="0 0 24 24"
              stroke="#545659"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Find Bank"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-[240px] h-[34px] pl-[34px] pr-[12px] rounded-[6px] bg-[#111215] text-[#9ea0a6] text-[12px] leading-none outline-none border border-[#24252a] focus:border-[#3e4047] transition-colors duration-120 placeholder-[#545659]"
            />
          </div>

          <button
            onClick={() => setCreateOpen(true)}
            className="h-[34px] px-[16px] rounded-[6px] bg-[#2563eb] text-white text-[12px] font-medium hover:brightness-110 shadow-lg transition-all"
          >
            Create Bank
          </button>
        </div>
      </div>

      {/* Main listing card */}
      <div className="bg-[#151619] border border-[#212328] rounded-[12px] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto scrolling-touch">
          <table className="w-full border-collapse min-w-[1000px] table-fixed">
            <thead className="bg-[#18191d] border-b border-[#212328]">
              <tr>
                <th className="h-[40px] px-[20px] text-left text-[#545659] text-[11px] font-normal tracking-[0.03em] uppercase w-[22%] select-none">
                  Bank
                </th>
                <th className="h-[40px] px-[20px] text-left text-[#545659] text-[11px] font-normal tracking-[0.03em] uppercase w-[28%] select-none">
                  Address
                </th>
                <th className="h-[40px] px-[20px] text-left text-[#545659] text-[11px] font-normal tracking-[0.03em] uppercase w-[10%] select-none">
                  Total Reports
                </th>
                <th className="h-[40px] px-[20px] text-left text-[#545659] text-[11px] font-normal tracking-[0.03em] uppercase w-[10%] select-none">
                  Total Requests
                </th>
                <th className="h-[40px] px-[20px] text-left text-[#545659] text-[11px] font-normal tracking-[0.03em] uppercase w-[12%] select-none">
                  Total Revenue
                </th>
                <th className="h-[40px] px-[20px] text-left text-[#545659] text-[11px] font-normal tracking-[0.03em] uppercase w-[10%] select-none">
                  Creation Date
                </th>
                <th className="h-[40px] px-[20px] text-left text-[#545659] text-[11px] font-normal tracking-[0.03em] uppercase w-[8%] select-none">
                  Status
                </th>
                <th className="h-[40px] px-[20px] text-right text-[#545659] text-[11px] font-normal tracking-[0.03em] uppercase w-[10%] select-none">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredBanks.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="p-[40px] text-center text-[#74757b] text-[12px]"
                  >
                    No banks match your search.
                  </td>
                </tr>
              ) : (
                filteredBanks.map((b) => {
                  const isExpanded = expandedId === b.id;
                  return (
                    <tr key={b.id} className="bg-transparent">
                      <td colSpan={8} className="p-0">
                        <table className="w-full table-fixed border-collapse">
                          <tbody>
                            {/* Parent Row — expands/collapses only */}
                            <tr
                              onClick={() =>
                                setExpandedId((prev) => (prev === b.id ? null : b.id))
                              }
                              className={`h-[56px] hover:bg-[rgba(255,255,255,0.015)] cursor-pointer transition-colors duration-100 border-b border-[#212328] ${
                                isExpanded ? "bg-[rgba(255,255,255,0.005)]" : ""
                              }`}
                            >
                              <td className="px-[20px] text-white text-[12px] font-medium w-[22%] truncate">
                                <div className="flex items-center gap-[8px]">
                                  <svg
                                    className={`shrink-0 text-[#545659] transition-transform duration-150 ${isExpanded ? "rotate-90" : ""}`}
                                    width={12}
                                    height={12}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2.5}
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                  </svg>
                                  <span className="truncate">{b.name}</span>
                                </div>
                              </td>
                              <td className="px-[20px] text-[#9ea0a6] text-[11px] w-[28%] truncate">
                                {b.address}
                              </td>
                              <td className="px-[20px] text-[#cdd0d6] text-[12px] w-[10%]">
                                {b.totalReports}
                              </td>
                              <td className="px-[20px] text-[#cdd0d6] text-[12px] w-[10%]">
                                {b.totalRequests}
                              </td>
                              <td className="px-[20px] text-[#cdd0d6] text-[12px] w-[12%]">
                                {b.totalRevenue}
                              </td>
                              <td className="px-[20px] text-[#9ea0a6] text-[11px] w-[10%]">
                                {b.creationDate}
                              </td>
                              <td className="px-[20px] w-[8%]">
                                <StatusBadge status={b.status} />
                              </td>
                              <td className="px-[20px] w-[10%] text-right">
                                <ActionButtons
                                  onEdit={() => alert(`Editing bank ${b.name}`)}
                                  onDelete={() => setDeleteTarget(b.name)}
                                />
                              </td>
                            </tr>

                            {/* Expanded child rows (branches) */}
                            {isExpanded && b.branches && b.branches.length > 0 && (
                              <tr className="bg-transparent hover:bg-transparent">
                                <td colSpan={8} className="p-[8px_24px_16px_24px] bg-transparent">
                                  <div className="bg-[#111215] border border-[#212328] rounded-[8px] overflow-hidden shadow-inner">
                                    <table className="w-full border-collapse table-fixed">
                                      <thead>
                                        <tr className="border-b border-[#212328]/60 bg-[#16171c]/30 h-[36px]">
                                          <th className="px-[16px] text-left text-[#545659] text-[10px] font-medium uppercase tracking-[0.02em] w-[22%]">
                                            Branch Name
                                          </th>
                                          <th className="px-[16px] text-left text-[#545659] text-[10px] font-medium uppercase tracking-[0.02em] w-[28%]">
                                            Address
                                          </th>
                                          <th className="px-[16px] text-left text-[#545659] text-[10px] font-medium uppercase tracking-[0.02em] w-[10%]">
                                            Total Reports
                                          </th>
                                          <th className="px-[16px] text-left text-[#545659] text-[10px] font-medium uppercase tracking-[0.02em] w-[10%]">
                                            Total Requests
                                          </th>
                                          <th className="px-[16px] text-left text-[#545659] text-[10px] font-medium uppercase tracking-[0.02em] w-[12%]">
                                            Total Revenue
                                          </th>
                                          <th className="px-[16px] text-left text-[#545659] text-[10px] font-medium uppercase tracking-[0.02em] w-[10%]">
                                            Creation Date
                                          </th>
                                          <th className="px-[16px] text-left text-[#545659] text-[10px] font-medium uppercase tracking-[0.02em] w-[8%]">
                                            Status
                                          </th>
                                          <th className="px-[16px] text-right text-[#545659] text-[10px] font-medium uppercase tracking-[0.02em] w-[10%]">
                                            Actions
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-[#212328]/40">
                                        {b.branches.map((br, idx) => (
                                          <tr
                                            key={idx}
                                            onClick={() => openDrawer(b, br)}
                                            className="h-[48px] cursor-pointer hover:bg-[rgba(255,255,255,0.03)] transition-colors duration-100"
                                          >
                                            <td className="px-[16px] text-white text-[12px] font-medium truncate">
                                              {br.name}
                                            </td>
                                            <td className="px-[16px] text-[#9ea0a6] text-[11px] truncate">
                                              {br.address}
                                            </td>
                                            <td className="px-[16px] text-[#cdd0d6] text-[12px]">
                                              {br.totalReports}
                                            </td>
                                            <td className="px-[16px] text-[#cdd0d6] text-[12px]">
                                              {br.totalRequests}
                                            </td>
                                            <td className="px-[16px] text-[#cdd0d6] text-[12px]">
                                              {br.totalRevenue}
                                            </td>
                                            <td className="px-[16px] text-[#9ea0a6] text-[11px]">
                                              {br.creationDate}
                                            </td>
                                            <td className="px-[16px]">
                                              <StatusBadge status={br.status} />
                                            </td>
                                            <td className="px-[16px] text-right">
                                              <ActionButtons
                                                onEdit={() => alert(`Editing branch ${br.name}`)}
                                                onDelete={() => setDeleteTarget(br.name)}
                                              />
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="flex items-center justify-between p-[14px_24px_16px_24px] border-t border-[#212328] flex-wrap gap-[12px]">
          <span className="text-[#74757b] text-[12px] font-normal">
            Showing {filteredBanks.length === 0 ? "0" : "7"} of 62 invoices
          </span>
          <div className="flex items-center gap-[8px]">
            <button
              disabled
              className="h-[28px] px-[12px] text-[11px] font-medium rounded-[6px] border border-[#212328] bg-[#111215] text-[#3e4047] cursor-not-allowed flex items-center gap-[4px]"
            >
              &lt; Prev
            </button>
            <button
              disabled
              className="h-[28px] px-[12px] text-[11px] font-medium rounded-[6px] border border-[#212328] bg-[#111215] text-[#3e4047] cursor-not-allowed flex items-center gap-[4px]"
            >
              Next &gt;
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <CreateBankModal open={createOpen} onClose={() => setCreateOpen(false)} />
      <DeleteConfirmModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => {
          alert(`Deleting ${deleteTarget}`);
          setDeleteTarget(null);
        }}
      />

      {/* Right-Side Drawer — opens on child row (branch) click */}
      {isDrawerOpen && (
        <>
          {/* Backdrop overlay */}
          <div
            onClick={closeDrawer}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
          />

          {/* Sliding Panel */}
          <div className="fixed top-0 right-0 h-screen w-full max-w-[720px] bg-[#121112] border-l border-[#212328] shadow-2xl z-50 flex flex-col overflow-hidden animate-[slideIn_0.25s_ease-out_forwards]">
            <style>{`
              @keyframes slideIn {
                from { transform: translateX(100%); }
                to { transform: translateX(0); }
              }
            `}</style>

            {/* Drawer Header */}
            <div className="p-[20px_28px] border-b border-[#212328] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-[14px] min-w-0">
                <button
                  onClick={closeDrawer}
                  className="p-[6px] rounded-[6px] border border-[#212328] bg-[#111215] text-[#9ea0a6] hover:text-white hover:bg-[rgba(255,255,255,0.04)] flex items-center justify-center transition-colors duration-120 cursor-pointer"
                  title="Close panel"
                >
                  <svg width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
                <div className="min-w-0">
                  <div className="flex items-center gap-[6px] text-[11px] text-[#545659] font-medium uppercase tracking-[0.05em]">
                    <span>Bank</span>
                    <span>&gt;</span>
                    <span className="text-[#9ea0a6]">{drawerParentBank?.code || "#12341"}</span>
                    <span>&gt;</span>
                    <span className="text-[#9ea0a6]">Branch</span>
                  </div>
                  <h2 className="text-[20px] font-bold text-white tracking-[-0.015em] truncate mt-[2px]">
                    {drawerBranch?.name}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-[10px] shrink-0">
                <div className="flex items-center gap-[6px]">
                  <span className="text-[11px] text-[#545659] font-medium uppercase tracking-wider">Status</span>
                  <div className="relative">
                    <select
                      defaultValue={drawerBranch?.status}
                      className="appearance-none bg-[#111215] border border-[#212328] rounded-[6px] text-white text-[12px] font-medium pl-[12px] pr-[28px] h-[32px] outline-none cursor-pointer hover:border-[#3e4047] transition-all"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                    <svg className="absolute right-[8px] top-1/2 -translate-y-1/2 pointer-events-none text-[#545659]" width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <button
                  onClick={() => alert(`Editing ${drawerBranch?.name}`)}
                  className="h-[32px] px-[12px] rounded-[6px] bg-[#111215] border border-[#212328] hover:border-[#3e4047] text-[#cdd0d6] hover:text-white text-[11px] font-medium flex items-center gap-[6px] transition-all"
                >
                  <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Edit
                </button>
              </div>
            </div>

            {/* Drawer scrollable content */}
            <div className="flex-1 overflow-y-auto p-[28px] space-y-[24px]">
              {/* Card 1: Bank Information */}
              <div className="bg-[#151619] border border-[#212328] rounded-[12px] p-[20px] flex flex-wrap md:flex-nowrap gap-[24px]">
                <div className="w-full md:w-[50%] space-y-[16px]">
                  <h3 className="text-[12px] font-bold text-white uppercase tracking-wider">
                    Bank Information
                  </h3>
                  <div className="space-y-[12px]">
                    <div>
                      <div className="text-[10px] text-[#545659] uppercase tracking-wider">Email</div>
                      <div className="text-[13px] text-white font-medium mt-[2px]">
                        {drawerParentBank?.email || "info@meezan.com"}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#545659] uppercase tracking-wider">Phone Number</div>
                      <div className="text-[13px] text-white font-medium mt-[2px]">
                        {drawerParentBank?.phone || "0300-09008645"}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#545659] uppercase tracking-wider">Branch Address</div>
                      <div className="text-[12px] text-[#9ea0a6] leading-relaxed mt-[2px]">
                        {drawerBranch?.address}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side: Financials Grid */}
                <div className="w-full md:w-[50%] flex flex-col justify-between">
                  <h3 className="text-[12px] font-bold text-white uppercase tracking-wider mb-[16px]">
                    Financials
                  </h3>
                  <div className="grid grid-cols-2 gap-[10px]">
                    <div className="bg-[#111215] border border-[#212328] p-[12px] rounded-[8px]">
                      <div className="text-[10px] text-[#545659] font-medium uppercase tracking-wider">Total Revenue</div>
                      <div className="text-[15px] font-bold text-white mt-[4px]">{drawerBranch?.totalRevenue}</div>
                    </div>
                    <div className="bg-[#111215] border border-[#212328] p-[12px] rounded-[8px]">
                      <div className="text-[10px] text-[#545659] font-medium uppercase tracking-wider">Total Reports</div>
                      <div className="text-[15px] font-bold text-white mt-[4px]">{drawerBranch?.totalReports}</div>
                    </div>
                    <div className="bg-[#111215] border border-[#212328] p-[12px] rounded-[8px]">
                      <div className="text-[10px] text-[#545659] font-medium uppercase tracking-wider">Total Requests</div>
                      <div className="text-[15px] font-bold text-white mt-[4px]">{drawerBranch?.totalRequests}</div>
                    </div>
                    <div className="bg-[#111215] border border-[#212328] p-[12px] rounded-[8px]">
                      <div className="text-[10px] text-[#545659] font-medium uppercase tracking-wider">Creation Date</div>
                      <div className="text-[13px] font-bold text-white mt-[4px]">{drawerBranch?.creationDate}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Related Email Addresses */}
              <div className="bg-[#151619] border border-[#212328] rounded-[12px] p-[20px] space-y-[16px]">
                <div className="flex items-center justify-between">
                  <h3 className="text-[12px] font-bold text-white uppercase tracking-wider">
                    Related Email Addresses
                  </h3>
                  <div className="relative">
                    <button
                      onClick={() => alert("Export initiated")}
                      className="h-[28px] px-[12px] rounded-[6px] bg-[#111215] border border-[#212328] hover:border-[#3e4047] text-[#9ea0a6] hover:text-white text-[11px] font-medium flex items-center gap-[6px] transition-all"
                    >
                      Export
                      <svg width={10} height={10} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[16px_12px]">
                  {[
                    { name: "Danish Abbas", email: "Janecooper@gmail.com" },
                    { name: "Tahir Ali", email: "Fisherman12@gmail.com" },
                    { name: "Majid Rehman", email: "Ester123@gmail.com" },
                    { name: "Saad Mahmood", email: "Joneshighman@gmail.com" },
                    { name: "Zayd Qureshi", email: "Janecooper@gmail.com" },
                    { name: "Azeem Tariq", email: "Janecooper@gmail.com" },
                    { name: "Abdul Rahman Sheikh", email: "Fisherman12@gmail.com" },
                    { name: "Bilal Hussain", email: "Ester123@gmail.com" },
                    { name: "Abdullah Tariq", email: "Savannahbae@yahoo.com" },
                    { name: "Tariq Chaudhry", email: "Ester123@gmail.com" },
                    { name: "Musa Ali", email: "Joneshighman@gmail.com" },
                    { name: "Abdul Qadir Zaman", email: "Ester123@gmail.com" }
                  ].map((item, idx) => (
                    <div key={idx} className="min-w-0">
                      <div className="text-[12px] font-semibold text-white truncate">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-[#74757b] truncate mt-[2px]">
                        {item.email}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 3: Tabbed Data */}
              <div className="bg-[#151619] border border-[#212328] rounded-[12px] p-[20px] space-y-[16px]">
                {/* Tab Bar */}
                <div className="flex items-center gap-[8px] bg-[#111215] border border-[#212328] p-[4px] rounded-[8px]">
                  {["All Reports", "All Orders", "Invoices"].map((tab) => {
                    const isSelected = activeTab === tab;
                    return (
                      <button
                        key={tab}
                        onClick={() => {
                          setActiveTab(tab);
                          setTabSearch("");
                        }}
                        className={`flex-1 h-[32px] text-[11px] font-medium rounded-[6px] transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#212328] text-white border border-[#2d3037] shadow-lg"
                            : "text-[#74757b] hover:text-[#9ea0a6] bg-transparent"
                        }`}
                      >
                        {tab}
                      </button>
                    );
                  })}
                </div>

                {/* Sub-table Header */}
                <div className="flex items-center justify-between gap-[16px] flex-wrap">
                  <h4 className="text-[13px] font-bold text-white">{tabLabel}</h4>
                  <div className="flex items-center gap-[10px]">
                    <div className="relative">
                      <select className="appearance-none bg-[#111215] border border-[#212328] rounded-[6px] text-[#9ea0a6] text-[11px] font-medium pl-[10px] pr-[24px] h-[28px] outline-none cursor-pointer hover:border-[#3e4047] transition-all">
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                      </select>
                      <svg className="absolute right-[6px] top-1/2 -translate-y-1/2 pointer-events-none text-[#545659]" width={10} height={10} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    <div className="relative">
                      <svg className="absolute left-[8px] top-1/2 -translate-y-1/2 text-[#545659]" width={10} height={10} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <input
                        type="text"
                        placeholder={tabPlaceholder}
                        value={tabSearch}
                        onChange={(e) => setTabSearch(e.target.value)}
                        className="w-[140px] h-[28px] pl-[26px] pr-[10px] rounded-[6px] bg-[#111215] text-[#9ea0a6] text-[11px] outline-none border border-[#212328] focus:border-[#3e4047] transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Tab Content */}
                <div className="border border-[#212328] rounded-[8px] overflow-hidden">
                  {activeTab === "All Reports" && (
                    <table className="w-full border-collapse table-fixed">
                      <thead>
                        <tr className="border-b border-[#212328] bg-[#16171c]/30 h-[36px]">
                          <th className="px-[16px] text-left text-[#545659] text-[10px] font-medium uppercase tracking-[0.02em] w-[45%]">File Name</th>
                          <th className="px-[16px] text-left text-[#545659] text-[10px] font-medium uppercase tracking-[0.02em] w-[20%]">Branch</th>
                          <th className="px-[16px] text-left text-[#545659] text-[10px] font-medium uppercase tracking-[0.02em] w-[20%]">Company</th>
                          <th className="px-[16px] text-right text-[#545659] text-[10px] font-medium uppercase tracking-[0.02em] w-[15%]">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#212328]/40">
                        {activeTabRows.length === 0 ? (
                          <EmptyState message={emptyStateMessage} />
                        ) : (
                          activeTabRows.map((item, idx) => (
                            <tr key={idx} className="h-[46px] hover:bg-[rgba(255,255,255,0.01)] transition-colors duration-100">
                              <td className="px-[16px] text-white text-[12px] font-medium flex items-center gap-[8px] h-[46px]">
                                <svg className="shrink-0 text-[#74757b]" width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <span className="truncate">{item.name}</span>
                              </td>
                              <td className="px-[16px] text-[#9ea0a6] text-[11px] truncate">{item.branch}</td>
                              <td className="px-[16px] text-[#9ea0a6] text-[11px] truncate">{item.company}</td>
                              <td className="px-[16px] text-right">
                                <div className="flex gap-[4px] justify-end">
                                  <button className="p-[4px] rounded-[4px] border border-[#212328] bg-[#111215] text-[#9ea0a6] hover:text-white transition-colors cursor-pointer">
                                    <svg width={10} height={10} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                  </button>
                                  <button className="p-[4px] rounded-[4px] border border-[#212328] bg-[#111215] text-[#9ea0a6] hover:text-red-400 transition-colors cursor-pointer">
                                    <svg width={10} height={10} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
                  )}

                  {activeTab === "All Orders" && (
                    <table className="w-full border-collapse table-fixed">
                      <thead>
                        <tr className="border-b border-[#212328] bg-[#16171c]/30 h-[36px]">
                          <th className="px-[16px] text-left text-[#545659] text-[10px] font-medium uppercase tracking-[0.02em] w-[18%]">Order Number</th>
                          <th className="px-[16px] text-left text-[#545659] text-[10px] font-medium uppercase tracking-[0.02em] w-[28%]">Company</th>
                          <th className="px-[16px] text-left text-[#545659] text-[10px] font-medium uppercase tracking-[0.02em] w-[20%]">Country</th>
                          <th className="px-[16px] text-left text-[#545659] text-[10px] font-medium uppercase tracking-[0.02em] w-[17%]">Request Date</th>
                          <th className="px-[16px] text-left text-[#545659] text-[10px] font-medium uppercase tracking-[0.02em] w-[17%]">Start Time</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#212328]/40">
                        {activeTabRows.length === 0 ? (
                          <EmptyState message={emptyStateMessage} />
                        ) : (
                          activeTabRows.map((item, idx) => (
                            <tr key={idx} className="h-[50px] hover:bg-[rgba(255,255,255,0.01)] transition-colors duration-100">
                              <td className="px-[16px] text-[#9ea0a6] text-[11px] font-mono align-middle">{item.id}</td>
                              <td className="px-[16px] text-[#cdd0d6] text-[12px] truncate align-middle">{item.company}</td>
                              <td className="px-[16px] text-[#9ea0a6] text-[11px] truncate align-middle">{item.country}</td>
                              <td className="px-[16px] text-[#9ea0a6] text-[11px] align-middle">{item.requestDate}</td>
                              <td className="px-[16px] align-middle">
                                <p className="text-[12px] text-[#cdd0d6] leading-[15px] font-normal">{item.startTime}</p>
                                <p className="text-[10px] text-[#74757b] leading-[13px] mt-[1px]">{item.requestDate}</p>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  )}

                  {activeTab === "Invoices" && (
                    <table className="w-full border-collapse table-fixed">
                      <thead>
                        <tr className="border-b border-[#212328] bg-[#16171c]/30 h-[36px]">
                          <th className="px-[16px] text-left text-[#545659] text-[10px] font-medium uppercase tracking-[0.02em] w-[16%]">Invoice Number</th>
                          <th className="px-[16px] text-left text-[#545659] text-[10px] font-medium uppercase tracking-[0.02em] w-[24%]">Company</th>
                          <th className="px-[16px] text-left text-[#545659] text-[10px] font-medium uppercase tracking-[0.02em] w-[16%]">Creation Date</th>
                          <th className="px-[16px] text-left text-[#545659] text-[10px] font-medium uppercase tracking-[0.02em] w-[14%]">Amount</th>
                          <th className="px-[16px] text-left text-[#545659] text-[10px] font-medium uppercase tracking-[0.02em] w-[14%]">Due Date</th>
                          <th className="px-[16px] text-left text-[#545659] text-[10px] font-medium uppercase tracking-[0.02em] w-[16%]">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#212328]/40">
                        {activeTabRows.length === 0 ? (
                          <EmptyState message={emptyStateMessage} />
                        ) : (
                          activeTabRows.map((item, idx) => {
                            const isPaid = item.status === "Paid";
                            return (
                              <tr key={idx} className="h-[46px] hover:bg-[rgba(255,255,255,0.01)] transition-colors duration-100">
                                <td className="px-[16px] text-[#9ea0a6] text-[11px] font-mono align-middle">{item.id}</td>
                                <td className="px-[16px] text-[#cdd0d6] text-[12px] truncate align-middle">{item.company}</td>
                                <td className="px-[16px] text-[#9ea0a6] text-[11px] align-middle">{item.creationDate}</td>
                                <td className="px-[16px] text-[#cdd0d6] text-[12px] align-middle">{item.amount}</td>
                                <td className="px-[16px] text-[#9ea0a6] text-[11px] align-middle">{item.dueDate}</td>
                                <td className="px-[16px] align-middle">
                                  <div className="relative inline-flex">
                                    <select
                                      defaultValue={item.status}
                                      className={`appearance-none text-[10px] font-medium pl-[8px] pr-[20px] h-[22px] rounded-[4px] border outline-none cursor-pointer transition-all ${
                                        isPaid
                                          ? "bg-[rgba(34,197,94,0.08)] text-[#22c55e] border-[rgba(34,197,94,0.2)]"
                                          : "bg-[rgba(239,68,68,0.08)] text-[#ef4444] border-[rgba(239,68,68,0.2)]"
                                      }`}
                                    >
                                      <option value="Paid">Paid</option>
                                      <option value="Unpaid">Unpaid</option>
                                    </select>
                                    <svg
                                      className={`absolute right-[5px] top-1/2 -translate-y-1/2 pointer-events-none ${isPaid ? "text-[#22c55e]" : "text-[#ef4444]"}`}
                                      width={8} height={8} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                                    >
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

