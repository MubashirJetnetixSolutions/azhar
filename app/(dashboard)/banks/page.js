"use client";

import { useState, useMemo, useEffect } from "react";
import { banks, reports, orders, invoices } from "@/data/mockData";
import CreateBankModal from "@/components/modals/CreateBankModal";
import DeleteConfirmModal from "@/components/modals/DeleteConfirmModal";
import AppSelect from "@/components/ui/AppSelect";
import StatusBadgeSelect from "@/components/ui/StatusBadgeSelect";

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
        <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke={ok ? "#22c55e" : "#ef4444"} strokeWidth={3}>
          {ok ? <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/> : <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>}
        </svg>
      </div>
      <span className="text-[13px] text-[#cdd0d6] font-normal leading-none">{message}</span>
      <button onClick={onDismiss} className="ml-[4px] text-[#545659] hover:text-white transition-colors cursor-pointer shrink-0">
        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>
  );
}

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

function SendModal({ open, onClose, sendTarget, onToast }) {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!sendTarget) return;
    if (sendTarget.type === "report") {
      setSubject(`Report - ${sendTarget.item.name}`);
      setMessage(`Dear Recipient,\n\nPlease find attached the report "${sendTarget.item.name}" from ${sendTarget.item.branch}.\n\nBest regards`);
    } else {
      setSubject(`Invoice - ${sendTarget.item.id}`);
      setMessage(`Dear Recipient,\n\nPlease find attached Invoice ${sendTarget.item.id} for ${sendTarget.item.company}.\n\nAmount: ${sendTarget.item.amount}\nDue Date: ${sendTarget.item.dueDate}\n\nBest regards`);
    }
    setRecipientEmail("");
  }, [sendTarget]);

  if (!open) return null;

  const handleSend = async () => {
    if (!recipientEmail.trim()) return;
    setSending(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      onToast({
        type: "success",
        message: sendTarget.type === "report" ? "Report sent successfully." : "Invoice sent successfully.",
        id: Date.now(),
      });
      onClose();
    } catch {
      onToast({ type: "error", message: "Failed to send. Please try again.", id: Date.now() });
    } finally {
      setSending(false);
    }
  };

  const attachmentName =
    sendTarget?.type === "report" ? sendTarget.item.name : `Invoice_${sendTarget?.item?.id}.pdf`;
  const title = sendTarget?.type === "report" ? "Send Report" : "Send Invoice";

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative rounded-2xl w-[480px] max-w-full mx-4 bg-[#161616] border border-[#262626] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#1e1e1e] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#1e1e1e]">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#888" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </div>
            <span className="font-semibold text-white">{title}</span>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors cursor-pointer">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4 overflow-y-auto">
          {/* Attachment chip */}
          <div className="flex items-center gap-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3">
            <svg className="text-[#545659] shrink-0" width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <div className="min-w-0">
              <p className="text-[10px] text-[#888] uppercase tracking-wider font-medium">Attachment</p>
              <p className="text-[13px] text-white truncate mt-[2px]">{attachmentName}</p>
            </div>
          </div>

          {/* Recipient Email */}
          <div>
            <label className="block text-xs mb-1.5 text-[#888]">Recipient Email</label>
            <input
              type="email"
              placeholder="email@example.com"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg text-sm outline-none bg-[#1e1e1e] border border-[#2a2a2a] text-white placeholder-[#3a3a3a] focus:border-[#3a3a3a] transition-colors"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-xs mb-1.5 text-[#888]">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg text-sm outline-none bg-[#1e1e1e] border border-[#2a2a2a] text-white focus:border-[#3a3a3a] transition-colors"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs mb-1.5 text-[#888]">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              className="w-full px-3 py-2.5 rounded-lg text-sm outline-none bg-[#1e1e1e] border border-[#2a2a2a] text-white resize-none focus:border-[#3a3a3a] transition-colors leading-relaxed"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-[#1e1e1e] shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg text-sm font-medium transition-colors bg-[#1e1e1e] text-[#888] border border-[#2a2a2a] hover:text-white cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={sending || !recipientEmail.trim()}
            className="px-5 py-2 rounded-lg text-sm font-medium text-white transition-colors bg-[#2563eb] hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center gap-[6px]"
          >
            {sending ? (
              <>
                <svg className="animate-spin" width={12} height={12} fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={3} />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Sending...
              </>
            ) : (
              <>
                <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
                Send
              </>
            )}
          </button>
        </div>
      </div>
    </div>
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
  const [drawerBranchStatus, setDrawerBranchStatus] = useState(null);
  const [subTablePeriod, setSubTablePeriod] = useState({ value: "Daily", label: "Daily" });
  const [activeTab, setActiveTab] = useState("All Reports");
  const [tabSearch, setTabSearch] = useState("");
  const [toast, setToast] = useState(null);
  const [sendTarget, setSendTarget] = useState(null);
  const [invoiceStatuses, setInvoiceStatuses] = useState({});

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

  useEffect(() => {
    if (drawerBranch) setDrawerBranchStatus(drawerBranch.status ?? "Active");
  }, [drawerBranch]);

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
                      {/* Period Dropdown */}
                      <div className="w-[110px]">
                        <AppSelect
                          variant="default"
                          size="sm"
                          value={subTablePeriod}
                          onChange={setSubTablePeriod}
                          options={[
                            { value: "Daily",   label: "Daily"   },
                            { value: "Weekly",  label: "Weekly"  },
                            { value: "Monthly", label: "Monthly" },
                            { value: "Quarterly", label: "Quarterly" },
                            { value: "Yearly", label: "Yearly" },
                          ]}
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
          <table className="w-full border-collapse min-w-[1160px] table-fixed">
            <thead className="bg-[#18191d] border-b border-[#212328]">
              <tr>
                <th className="h-[40px] px-[20px] text-left text-[#545659] text-[11px] font-normal tracking-[0.03em] uppercase w-[17%] select-none">
                  Bank
                </th>
                <th className="h-[40px] px-[20px] text-left text-[#545659] text-[11px] font-normal tracking-[0.03em] uppercase w-[21%] select-none">
                  Address
                </th>
                <th className="h-[40px] px-[20px] text-left text-[#545659] text-[11px] font-normal tracking-[0.03em] uppercase w-[8%] select-none">
                  Total Reports
                </th>
                <th className="h-[40px] px-[20px] text-left text-[#545659] text-[11px] font-normal tracking-[0.03em] uppercase w-[8%] select-none">
                  Total Requests
                </th>
                <th className="h-[40px] px-[20px] text-left text-[#545659] text-[11px] font-normal tracking-[0.03em] uppercase w-[8%] select-none">
                  Paid Invoices
                </th>
                <th className="h-[40px] px-[20px] text-left text-[#545659] text-[11px] font-normal tracking-[0.03em] uppercase w-[8%] select-none">
                  Unpaid Invoices
                </th>
                <th className="h-[40px] px-[20px] text-left text-[#545659] text-[11px] font-normal tracking-[0.03em] uppercase w-[10%] select-none">
                  Total Revenue
                </th>
                <th className="h-[40px] px-[20px] text-left text-[#545659] text-[11px] font-normal tracking-[0.03em] uppercase w-[9%] select-none">
                  Creation Date
                </th>
                <th className="h-[40px] px-[20px] text-left text-[#545659] text-[11px] font-normal tracking-[0.03em] uppercase w-[7%] select-none">
                  Status
                </th>
                <th className="h-[40px] px-[20px] text-right text-[#545659] text-[11px] font-normal tracking-[0.03em] uppercase w-[8%] select-none">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredBanks.length === 0 ? (
                <tr>
                  <td
                    colSpan={10}
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
                      <td colSpan={10} className="p-0">
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
                              <td className="px-[20px] text-white text-[12px] font-medium w-[17%] truncate">
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
                              <td className="px-[20px] text-[#9ea0a6] text-[11px] w-[21%] truncate">
                                {b.address}
                              </td>
                              <td className="px-[20px] text-[#cdd0d6] text-[12px] w-[8%]">
                                {b.totalReports}
                              </td>
                              <td className="px-[20px] text-[#cdd0d6] text-[12px] w-[8%]">
                                {b.totalRequests}
                              </td>
                              <td className="px-[20px] text-[12px] w-[8%] text-[#22c55e]">
                                {b.paidInvoices ?? "—"}
                              </td>
                              <td className="px-[20px] text-[12px] w-[8%] text-[#ef4444]">
                                {b.unpaidInvoices ?? "—"}
                              </td>
                              <td className="px-[20px] text-[#cdd0d6] text-[12px] w-[10%]">
                                {b.totalRevenue}
                              </td>
                              <td className="px-[20px] text-[#9ea0a6] text-[11px] w-[9%]">
                                {b.creationDate}
                              </td>
                              <td className="px-[20px] w-[7%]">
                                <StatusBadge status={b.status} />
                              </td>
                              <td className="px-[20px] w-[8%] text-right">
                                <ActionButtons
                                  onEdit={() => alert(`Editing bank ${b.name}`)}
                                  onDelete={() => setDeleteTarget(b.name)}
                                />
                              </td>
                            </tr>

                            {/* Expanded child rows (branches) */}
                            {isExpanded && b.branches && b.branches.length > 0 && (
                              <tr className="bg-transparent hover:bg-transparent">
                                <td colSpan={10} className="p-[8px_24px_16px_24px] bg-transparent">
                                  <div className="bg-[#111215] border border-[#212328] rounded-[8px] overflow-hidden shadow-inner">
                                    <table className="w-full border-collapse table-fixed">
                                      <thead>
                                        <tr className="border-b border-[#212328]/60 bg-[#16171c]/30 h-[36px]">
                                          <th className="px-[16px] text-left text-[#545659] text-[10px] font-medium uppercase tracking-[0.02em] w-[17%]">
                                            Branch Name
                                          </th>
                                          <th className="px-[16px] text-left text-[#545659] text-[10px] font-medium uppercase tracking-[0.02em] w-[21%]">
                                            Address
                                          </th>
                                          <th className="px-[16px] text-left text-[#545659] text-[10px] font-medium uppercase tracking-[0.02em] w-[8%]">
                                            Total Reports
                                          </th>
                                          <th className="px-[16px] text-left text-[#545659] text-[10px] font-medium uppercase tracking-[0.02em] w-[8%]">
                                            Total Requests
                                          </th>
                                          <th className="px-[16px] text-left text-[#545659] text-[10px] font-medium uppercase tracking-[0.02em] w-[8%]">
                                            Paid Invoices
                                          </th>
                                          <th className="px-[16px] text-left text-[#545659] text-[10px] font-medium uppercase tracking-[0.02em] w-[8%]">
                                            Unpaid Invoices
                                          </th>
                                          <th className="px-[16px] text-left text-[#545659] text-[10px] font-medium uppercase tracking-[0.02em] w-[10%]">
                                            Total Revenue
                                          </th>
                                          <th className="px-[16px] text-left text-[#545659] text-[10px] font-medium uppercase tracking-[0.02em] w-[9%]">
                                            Creation Date
                                          </th>
                                          <th className="px-[16px] text-left text-[#545659] text-[10px] font-medium uppercase tracking-[0.02em] w-[7%]">
                                            Status
                                          </th>
                                          <th className="px-[16px] text-right text-[#545659] text-[10px] font-medium uppercase tracking-[0.02em] w-[8%]">
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
                                            <td className="px-[16px] text-[12px] text-[#22c55e]">
                                              {br.paidInvoices ?? "—"}
                                            </td>
                                            <td className="px-[16px] text-[12px] text-[#ef4444]">
                                              {br.unpaidInvoices ?? "—"}
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
          setDeleteTarget(null);
          setToast({ type: "success", message: "Bank deleted successfully.", id: Date.now() });
        }}
      />
      <SendModal
        open={!!sendTarget}
        onClose={() => setSendTarget(null)}
        sendTarget={sendTarget}
        onToast={(t) => { setSendTarget(null); setToast(t); }}
      />
      {toast && (
        <Toast key={toast.id} type={toast.type} message={toast.message} onDismiss={() => setToast(null)} />
      )}

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
                  <div className="w-[120px]">
                    <AppSelect
                      variant="default"
                      size="sm"
                      value={drawerBranchStatus ? { value: drawerBranchStatus, label: drawerBranchStatus } : null}
                      onChange={(opt) => setDrawerBranchStatus(opt?.value ?? "Active")}
                      options={[
                        { value: "Active",   label: "Active"   },
                        { value: "Inactive", label: "Inactive" },
                      ]}
                    />
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
                <div className="bg-[#151619] border border-[#212328] rounded-[12px] p-[20px] flex items-center justify-between">
                  <h3 className="text-[12px] font-bold text-white uppercase tracking-wider">
                    Invoices
                  </h3>
                  <div className="flex gap-5">
                  <div className="bg-[#111215] border border-[#212328] p-[12px] rounded-[8px]">
                      <div className="text-[10px] text-[#545659] font-medium uppercase tracking-wider">Paid Invoices</div>
                      <div className="text-[15px] font-bold text-[#22c55e] mt-[4px]">{drawerBranch?.paidInvoices ?? "—"}</div>
                    </div>
                    <div className="bg-[#111215] border border-[#212328] p-[12px] rounded-[8px]">
                      <div className="text-[10px] text-[#545659] font-medium uppercase tracking-wider">Unpaid Invoices</div>
                      <div className="text-[15px] font-bold text-[#ef4444] mt-[4px]">{drawerBranch?.unpaidInvoices ?? "—"}</div>
                    </div>
                  </div>
                </div>
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
                    <div className="w-[90px]">
                      <AppSelect
                        variant="default"
                        size="xs"
                        value={subTablePeriod}
                        onChange={setSubTablePeriod}
                        options={[
                          { value: "Daily",  label: "Daily"  },
                          { value: "Weekly", label: "Weekly" },
                          { value: "Monthly", label: "Monthly" },
                          { value: "Quarterly", label: "Quarterly" },
                          { value: "Yearly", label: "Yearly" },
                        ]}
                      />
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
                          <th className="px-[16px] text-left text-[#545659] text-[10px] font-medium uppercase tracking-[0.02em] w-[38%]">File Name</th>
                          <th className="px-[16px] text-left text-[#545659] text-[10px] font-medium uppercase tracking-[0.02em] w-[18%]">Branch</th>
                          <th className="px-[16px] text-left text-[#545659] text-[10px] font-medium uppercase tracking-[0.02em] w-[18%]">Company</th>
                          <th className="px-[16px] text-left text-[#545659] text-[10px] font-medium uppercase tracking-[0.02em] w-[18%]">Paid Invoices</th>
                          <th className="px-[16px] text-left text-[#545659] text-[10px] font-medium uppercase tracking-[0.02em] w-[18%]">Unpaid Invoices</th>
                          <th className="px-[16px] text-right text-[#545659] text-[10px] font-medium uppercase tracking-[0.02em] w-[14%]">Actions</th>
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
                              <td className="px-[16px] text-[#9ea0a6] text-[11px] truncate">{item.paidIn}</td>
                              <td className="px-[16px] text-[#9ea0a6] text-[11px] truncate">{item.unpaidInvoices}</td>
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
                                  <button
                                  onClick={(e) => { e.stopPropagation(); setSendTarget({ type: "report", item }); }}
                                  className="p-[4px] rounded-[4px] border border-[#212328] bg-[#111215] text-[#9ea0a6] hover:text-[#2563eb] hover:border-[rgba(37,99,235,0.3)] transition-colors cursor-pointer"
                                  title="Send Report"
                                >
                                  <svg width={10} height={10} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
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
                          <th className="px-[16px] text-left text-[#545659] text-[10px] font-medium uppercase tracking-[0.02em] w-[14%]">Invoice Number</th>
                          <th className="px-[16px] text-left text-[#545659] text-[10px] font-medium uppercase tracking-[0.02em] w-[21%]">Company</th>
                          <th className="px-[16px] text-left text-[#545659] text-[10px] font-medium uppercase tracking-[0.02em] w-[14%]">Creation Date</th>
                          <th className="px-[16px] text-left text-[#545659] text-[10px] font-medium uppercase tracking-[0.02em] w-[12%]">Amount</th>
                          <th className="px-[16px] text-left text-[#545659] text-[10px] font-medium uppercase tracking-[0.02em] w-[12%]">Due Date</th>
                          <th className="px-[16px] text-left text-[#545659] text-[10px] font-medium uppercase tracking-[0.02em] w-[14%]">Status</th>
                          <th className="px-[16px] text-right text-[#545659] text-[10px] font-medium uppercase tracking-[0.02em] w-[13%]">Send</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#212328]/40">
                        {activeTabRows.length === 0 ? (
                          <EmptyState message={emptyStateMessage} />
                        ) : (
                          activeTabRows.map((item, idx) => (
                              <tr key={idx} className="h-[46px] hover:bg-[rgba(255,255,255,0.01)] transition-colors duration-100">
                                <td className="px-[16px] text-[#9ea0a6] text-[11px] font-mono align-middle">{item.id}</td>
                                <td className="px-[16px] text-[#cdd0d6] text-[12px] truncate align-middle">{item.company}</td>
                                <td className="px-[16px] text-[#9ea0a6] text-[11px] align-middle">{item.creationDate}</td>
                                <td className="px-[16px] text-[#cdd0d6] text-[12px] align-middle">{item.amount}</td>
                                <td className="px-[16px] text-[#9ea0a6] text-[11px] align-middle">{item.dueDate}</td>
                                <td className="px-[16px] align-middle">
                                  <StatusBadgeSelect
                                    value={invoiceStatuses[`${item.id}-${item.company}`] ?? item.status ?? "Paid"}
                                    onChange={(val) => setInvoiceStatuses((prev) => ({ ...prev, [`${item.id}-${item.company}`]: val }))}
                                  />
                                </td>
                                <td className="px-[16px] text-right align-middle">
                                  <button
                                    onClick={(e) => { e.stopPropagation(); setSendTarget({ type: "invoice", item }); }}
                                    className="p-[4px] rounded-[4px] border border-[#212328] bg-[#111215] text-[#9ea0a6] hover:text-[#2563eb] hover:border-[rgba(37,99,235,0.3)] transition-colors cursor-pointer"
                                    title="Send Invoice"
                                  >
                                    <svg width={10} height={10} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                                    </svg>
                                  </button>
                                </td>
                              </tr>
                          ))
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

