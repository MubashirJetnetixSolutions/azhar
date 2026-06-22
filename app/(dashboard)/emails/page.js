"use client";

import { useState, useMemo, useEffect } from "react";
import { emails as initialEmails } from "@/data/mockData";

export default function EmailsPage() {
  const [emailList, setEmailList] = useState(initialEmails);
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarSearchTerm, setSidebarSearchTerm] = useState("");
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [scrollPos, setScrollPos] = useState(0);
  const [previewAttachment, setPreviewAttachment] = useState(null);

  // Restore scroll position when returning to list view
  useEffect(() => {
    if (!selectedEmail) {
      window.scrollTo(0, scrollPos);
    }
  }, [selectedEmail, scrollPos]);

  // Sync searches: when opening an email, populate sidebar search with current main search
  const handleSelectEmail = (email) => {
    setScrollPos(window.scrollY);
    setSidebarSearchTerm(searchTerm);
    setSelectedEmail(email);
  };

  const handleBack = () => {
    setSelectedEmail(null);
  };

  // Star / Unstar email handler
  const handleToggleStar = (emailAddress) => {
    setEmailList((prev) =>
      prev.map((e) => {
        if (e.email === emailAddress) {
          const updated = { ...e, starred: !e.starred };
          if (selectedEmail?.email === emailAddress) {
            setSelectedEmail(updated);
          }
          return updated;
        }
        return e;
      })
    );
  };

  // Mark Read / Unread handler
  const handleToggleRead = (emailAddress) => {
    setEmailList((prev) =>
      prev.map((e) => {
        if (e.email === emailAddress) {
          const updated = {
            ...e,
            status: e.status === "unread" ? "read" : "unread"
          };
          if (selectedEmail?.email === emailAddress) {
            setSelectedEmail(updated);
          }
          return updated;
        }
        return e;
      })
    );
  };

  // Delete email handler
  const handleDeleteEmail = (emailAddress) => {
    setEmailList((prev) => prev.filter((e) => e.email !== emailAddress));
    setSelectedEmail(null);
  };

  // Delete attachment handler
  const handleDeleteAttachment = (fileName) => {
    setEmailList((prev) =>
      prev.map((e) => {
        if (e.email === selectedEmail.email) {
          const updatedAttachments = (e.attachments || []).filter(
            (a) => a.name !== fileName
          );
          const updated = { ...e, attachments: updatedAttachments };
          setSelectedEmail(updated);
          return updated;
        }
        return e;
      })
    );
  };

  // Download attachment handler
  const handleDownloadAttachment = (att) => {
    const element = document.createElement("a");
    const file = new Blob([`Mock attachment content for ${att.name}`], {
      type: "text/plain"
    });
    element.href = URL.createObjectURL(file);
    element.download = att.name;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Preview attachment modal trigger
  const handlePreviewAttachment = (att) => {
    setPreviewAttachment(att);
  };

  // Quick Action alerts (Reply, Forward)
  const handleActionAlert = (action) => {
    alert(`${action} composition flow initiated.`);
  };

  // Search filtering logic for the list view
  const filteredList = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return emailList;
    return emailList.filter((row) =>
      ["sender", "email", "highlight", "subject"].some((k) =>
        String(row[k] ?? "").toLowerCase().includes(q)
      )
    );
  }, [emailList, searchTerm]);

  // Search filtering logic for the split-pane view left sidebar
  const filteredSidebar = useMemo(() => {
    const q = sidebarSearchTerm.trim().toLowerCase();
    if (!q) return emailList;
    return emailList.filter((row) =>
      ["sender", "email", "highlight", "subject"].some((k) =>
        String(row[k] ?? "").toLowerCase().includes(q)
      )
    );
  }, [emailList, sidebarSearchTerm]);

  // Find index of selected email in current sidebar filter list
  const currentEmailIndex = useMemo(() => {
    if (!selectedEmail) return -1;
    return filteredSidebar.findIndex((e) => e.email === selectedEmail.email);
  }, [selectedEmail, filteredSidebar]);

  const handleNextEmail = () => {
    if (currentEmailIndex < filteredSidebar.length - 1) {
      setSelectedEmail(filteredSidebar[currentEmailIndex + 1]);
    }
  };

  const handlePrevEmail = () => {
    if (currentEmailIndex > 0) {
      setSelectedEmail(filteredSidebar[currentEmailIndex - 1]);
    }
  };

  return (
    <div className="space-y-[24px] py-4 px-4 md:py-5 md:px-7">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-[22px] font-bold text-white tracking-[-0.019em]">
          Email
        </h1>

        {/* Search Input: Only visible when NOT viewing email details */}
        {!selectedEmail && (
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Find Email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-[240px] h-[34px] pl-[34px] pr-[12px] rounded-[6px] bg-[#111215] text-[#9ea0a6] text-[12px] leading-none outline-none border border-[#24252a] focus:border-[#3e4047] transition-colors duration-120 placeholder-[#545659]"
            />
          </div>
        )}
      </div>

      {/* Main Content Area */}
      {!selectedEmail ? (
        /* 1. Full-Width Emails List View */
        <div className="bg-[#151619] border border-[#212328] rounded-[12px] overflow-hidden shadow-2xl">
          <div className="overflow-x-auto scrolling-touch">
            <table className="w-full border-collapse min-w-[900px]">
              <thead className="bg-[#18191d] border-b border-[#212328]">
                <tr>
                  {[
                    "Sender",
                    "Email Address",
                    "Highlight",
                    "Date & Time"
                  ].map((label, idx) => (
                    <th
                      key={label}
                      className={`h-[40px] px-[16px] text-left text-[#545659] text-[11px] font-normal tracking-[0.03em] uppercase select-none ${
                        idx === 0 ? "pl-[24px]" : ""
                      } ${idx === 3 ? "pr-[24px] text-right" : ""}`}
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredList.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="p-[40px] text-center text-[#74757b] text-[12px]"
                    >
                      No emails match your search.
                    </td>
                  </tr>
                ) : (
                  filteredList.map((row, i) => (
                    <tr
                      key={i}
                      onClick={() => handleSelectEmail(row)}
                      className="hover:bg-[rgba(255,255,255,0.02)] cursor-pointer transition-colors duration-100 border-b border-[#212328] last:border-0"
                    >
                      {/* Sender */}
                      <td className="pl-[24px] pr-[16px] py-[12px] h-[60px] align-middle text-[#cdd0d6] text-[12px] font-medium whitespace-nowrap">
                        <div className="flex items-center gap-[8px]">
                          {row.starred && (
                            <svg
                              width={12}
                              height={12}
                              fill="#eab308"
                              viewBox="0 0 24 24"
                              stroke="#eab308"
                              className="shrink-0"
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          )}
                          <span
                            className={
                              row.status === "unread" ? "font-bold text-white" : ""
                            }
                          >
                            {row.sender}
                          </span>
                        </div>
                      </td>
                      {/* Email Address */}
                      <td className="px-[16px] py-[12px] h-[60px] align-middle text-[#9ea0a6] text-[12px] whitespace-nowrap">
                        {row.email}
                      </td>
                      {/* Highlight */}
                      <td className="px-[16px] py-[12px] h-[60px] align-middle text-[#9ea0a6] text-[12px] max-w-[520px] truncate">
                        <span className="text-white font-medium mr-[6px]">
                          {row.subject}
                        </span>
                        — {row.highlight}
                      </td>
                      {/* Date & Time */}
                      <td className="pl-[16px] pr-[24px] py-[12px] h-[60px] align-middle text-[#9ea0a6] text-[12px] text-right whitespace-nowrap">
                        {row.time}
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
              Showing {filteredList.length} of {emailList.length} emails
            </span>
            <div className="flex items-center gap-[8px]">
              <button
                disabled
                className="h-[28px] px-[12px] text-[11px] font-normal rounded-[6px] border border-[#212328] bg-[#111215] text-[#3e4047] cursor-not-allowed flex items-center gap-[4px]"
              >
                &lt; Prev
              </button>
              <button
                disabled
                className="h-[28px] px-[12px] text-[11px] font-normal rounded-[6px] border border-[#212328] bg-[#111215] text-[#3e4047] cursor-not-allowed flex items-center gap-[4px]"
              >
                Next &gt;
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* 2. Split-Pane Email View Layout */
        <div className="flex gap-[20px] items-stretch min-h-[640px]">
          {/* Left Column: Threads Sidebar — hidden on mobile, visible on md+ */}
          <div className="hidden md:flex w-[320px] flex-col bg-[#151619] border border-[#212328] rounded-[12px] overflow-hidden shrink-0">
            {/* Search Input: Placeholder "Find Reports" */}
            <div className="p-[16px] border-b border-[#212328]">
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Find Reports"
                  value={sidebarSearchTerm}
                  onChange={(e) => setSidebarSearchTerm(e.target.value)}
                  className="w-full h-[36px] pl-[34px] pr-[12px] rounded-[6px] bg-[#111215] text-[#9ea0a6] text-[12px] outline-none border border-[#24252a] focus:border-[#3e4047] transition-colors duration-120 placeholder-[#545659]"
                />
              </div>
            </div>

            {/* Threads List */}
            <div className="flex-1 overflow-y-auto divide-y divide-[#212328]/50 p-[8px] space-y-[4px]">
              {filteredSidebar.length === 0 ? (
                <div className="p-[20px] text-center text-[#74757b] text-[12px]">
                  No reports matched
                </div>
              ) : (
                filteredSidebar.map((email, idx) => {
                  const isSelected = selectedEmail.email === email.email;
                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedEmail(email)}
                      className={`p-[14px_16px] rounded-[8px] cursor-pointer transition-all duration-120 ${
                        isSelected
                          ? "bg-[#212328] text-white"
                          : "bg-transparent hover:bg-[rgba(255,255,255,0.02)] text-[#9ea0a6]"
                      }`}
                    >
                      <div className="flex justify-between items-start gap-[8px] mb-[2px]">
                        <span
                          className={`text-[13px] font-medium leading-tight truncate ${
                            isSelected ? "text-white" : "text-[#cdd0d6]"
                          }`}
                        >
                          {email.sender}
                        </span>
                        {email.time && (
                          <span className="text-[11px] text-[#545659] whitespace-nowrap pt-[2px]">
                            {email.time}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-[#74757b] truncate">
                        {email.subject || email.highlight}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Column: Email Detail Panel (flex-1) */}
          <div className="flex-1 flex flex-col bg-[#151619] border border-[#212328] rounded-[12px] overflow-hidden">
            {/* Detail Header */}
            <div className="flex items-center justify-between p-[16px_24px] border-b border-[#212328] h-[56px] shrink-0">
              <div className="flex items-center gap-[12px] min-w-0">
                {/* Back button */}
                <button
                  onClick={handleBack}
                  className="p-[6px] rounded-[6px] hover:bg-[rgba(255,255,255,0.04)] text-[#9ea0a6] hover:text-white transition-colors duration-120 border border-transparent hover:border-[#212328]"
                  title="Back to list"
                >
                  <svg
                    width={16}
                    height={16}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                </button>
                <h2 className="text-[15px] font-semibold text-white truncate tracking-tight">
                  {selectedEmail.subject}
                </h2>
              </div>

              {/* Thread Navigation / Pagination */}
              <div className="flex items-center gap-[12px] text-[#74757b] text-[12px] shrink-0">
                <span>
                  {currentEmailIndex + 1}-{filteredSidebar.length} of{" "}
                  {filteredSidebar.length}
                </span>
                <div className="flex items-center gap-[6px]">
                  <button
                    onClick={handlePrevEmail}
                    disabled={currentEmailIndex <= 0}
                    className={`p-[4px] rounded-[4px] border border-[#212328] bg-[#111215] text-[#9ea0a6] transition-colors duration-120 ${
                      currentEmailIndex <= 0
                        ? "opacity-30 cursor-not-allowed"
                        : "hover:text-white hover:bg-[rgba(255,255,255,0.04)]"
                    }`}
                  >
                    <svg
                      width={12}
                      height={12}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={handleNextEmail}
                    disabled={currentEmailIndex === filteredSidebar.length - 1}
                    className={`p-[4px] rounded-[4px] border border-[#212328] bg-[#111215] text-[#9ea0a6] transition-colors duration-120 ${
                      currentEmailIndex === filteredSidebar.length - 1
                        ? "opacity-30 cursor-not-allowed"
                        : "hover:text-white hover:bg-[rgba(255,255,255,0.04)]"
                    }`}
                  >
                    <svg
                      width={12}
                      height={12}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Email Body & Details scrollable view */}
            <div className="flex-1 overflow-y-auto p-[24px] space-y-[24px]">
              {/* Header Info */}
              <div className="flex justify-between items-start flex-wrap gap-[16px] pb-[16px] border-b border-[#212328]">
                <div className="flex items-center gap-[12px]">
                  {/* Sender Avatar */}
                  <div className="w-[36px] h-[36px] rounded-full bg-[#1c1e22] border border-[#212328] flex items-center justify-center text-white text-[14px] font-semibold">
                    {selectedEmail.sender[0]}
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-white flex items-center gap-[6px]">
                      <span>{selectedEmail.sender}</span>
                      <span className="text-[11px] text-[#545659] font-normal">
                        &lt;{selectedEmail.email}&gt;
                      </span>
                    </div>
                    <div className="text-[11px] text-[#74757b]">
                      to {selectedEmail.recipient || "me"}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[11px] text-[#74757b] mb-[6px]">
                    {selectedEmail.date}
                  </div>
                  {/* Toolbar Actions */}
                  <div className="flex items-center gap-[6px] justify-end">
                    {/* Star */}
                    <button
                      onClick={() => handleToggleStar(selectedEmail.email)}
                      title={selectedEmail.starred ? "Unstar" : "Star"}
                      className={`p-[6px] rounded-[6px] border border-[#212328] bg-[#111215] transition-colors duration-120 hover:bg-[rgba(255,255,255,0.04)] ${
                        selectedEmail.starred ? "text-[#eab308]" : "text-[#74757b]"
                      }`}
                    >
                      <svg
                        width={14}
                        height={14}
                        fill={selectedEmail.starred ? "currentColor" : "none"}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.246.588 1.81l-3.97 2.883a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.971-2.883a1 1 0 00-1.17 0l-3.97 2.883c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.98 9.42c-.773-.564-.374-1.81.588-1.81h4.906a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                    </button>
                    {/* Mark Read/Unread */}
                    <button
                      onClick={() => handleToggleRead(selectedEmail.email)}
                      title={
                        selectedEmail.status === "unread"
                          ? "Mark as Read"
                          : "Mark as Unread"
                      }
                      className={`p-[6px] rounded-[6px] border border-[#212328] bg-[#111215] transition-colors duration-120 hover:bg-[rgba(255,255,255,0.04)] ${
                        selectedEmail.status === "unread"
                          ? "text-white"
                          : "text-[#74757b]"
                      }`}
                    >
                      <svg
                        width={14}
                        height={14}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                    {/* Delete Email */}
                    <button
                      onClick={() => handleDeleteEmail(selectedEmail.email)}
                      title="Delete Email"
                      className="p-[6px] rounded-[6px] border border-[#212328] bg-[#111215] text-[#74757b] hover:text-red-400 hover:border-red-900/50 transition-colors duration-120 hover:bg-[rgba(239,68,68,0.05)]"
                    >
                      <svg
                        width={14}
                        height={14}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Email Content Body */}
              <div className="text-[13px] text-[#cdd0d6] leading-[1.6] space-y-[16px] whitespace-pre-line font-normal">
                {selectedEmail.body}
              </div>

              {/* Reply / Forward Buttons */}
              {/* <div className="flex items-center gap-[12px] pt-[8px]">
                <button
                  onClick={() => handleActionAlert("Reply")}
                  className="h-[32px] px-[16px] rounded-[6px] bg-[#111215] hover:bg-[#1c1e22] text-[#cdd0d6] text-[12px] font-medium border border-[#212328] hover:border-[#3e4047] transition-all flex items-center gap-[6px]"
                >
                  <svg
                    width={14}
                    height={14}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                    />
                  </svg>
                  Reply
                </button>
                <button
                  onClick={() => handleActionAlert("Forward")}
                  className="h-[32px] px-[16px] rounded-[6px] bg-[#111215] hover:bg-[#1c1e22] text-[#cdd0d6] text-[12px] font-medium border border-[#212328] hover:border-[#3e4047] transition-all flex items-center gap-[6px]"
                >
                  <svg
                    width={14}
                    height={14}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6"
                    />
                  </svg>
                  Forward
                </button>
              </div> */}

              {/* Attachments Section */}
              <div className="pt-[24px] border-t border-[#212328]">
                <h4 className="text-[12px] font-bold text-white uppercase tracking-wider mb-[12px]">
                  Attachments ({selectedEmail.attachments?.length || 0})
                </h4>

                {selectedEmail.attachments &&
                selectedEmail.attachments.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-[12px]">
                    {selectedEmail.attachments.map((att, attIdx) => (
                      <div
                        key={attIdx}
                        className="flex items-center justify-between p-[12px_16px] bg-[#111215] border border-[#212328] rounded-[8px] hover:border-[#3e4047] transition-colors duration-120"
                      >
                        <div className="flex items-center gap-[12px] min-w-0">
                          {/* File type icon */}
                          <div className="w-[36px] h-[36px] rounded-[6px] bg-[#1c1e22] flex items-center justify-center text-white shrink-0">
                            <svg
                              width={20}
                              height={20}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={1.5}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                          </div>
                          <div className="min-w-0">
                            <div
                              onClick={() => handlePreviewAttachment(att)}
                              className="text-[12px] font-medium text-white truncate cursor-pointer hover:underline"
                            >
                              {att.name}
                            </div>
                            <div className="text-[11px] text-[#545659]">
                              {att.size} • {att.type}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-[6px]">
                          {/* Download */}
                          <button
                            onClick={() => handleDownloadAttachment(att)}
                            title="Download File"
                            className="p-[6px] rounded-[6px] border border-[#212328] bg-[#151619] hover:bg-[#1c1e22] text-[#9ea0a6] hover:text-white transition-colors duration-120"
                          >
                            <svg
                              width={14}
                              height={14}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                              />
                            </svg>
                          </button>
                          {/* Delete Attachment */}
                          <button
                            onClick={() => handleDeleteAttachment(att.name)}
                            title="Delete Attachment"
                            className="p-[6px] rounded-[6px] border border-[#212328] bg-[#151619] hover:bg-[#1c1e22] text-[#9ea0a6] hover:text-red-400 transition-colors duration-120"
                          >
                            <svg
                              width={14}
                              height={14}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Empty State */
                  <div className="p-[20px] rounded-[8px] border border-dashed border-[#212328] text-center text-[#545659] text-[12px]">
                    No attachments associated with this email.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Attachment Preview Modal */}
      {previewAttachment && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-[16px]">
          <div className="bg-[#151619] border border-[#212328] rounded-[12px] w-full max-w-[600px] overflow-hidden shadow-2xl flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-[16px_24px] border-b border-[#212328]">
              <div className="flex items-center gap-[10px]">
                <svg
                  width={16}
                  height={16}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <span className="text-[14px] font-semibold text-white truncate max-w-[400px]">
                  Preview: {previewAttachment.name}
                </span>
              </div>
              <button
                onClick={() => setPreviewAttachment(null)}
                className="text-[#74757b] hover:text-white transition-colors duration-120"
              >
                <svg
                  width={18}
                  height={18}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-[24px] overflow-y-auto max-h-[400px] text-[13px] text-[#9ea0a6] space-y-[16px]">
              {previewAttachment.type === "PDF" && (
                <div className="space-y-[12px] bg-[#111215] border border-[#212328] p-[20px] rounded-[8px] font-mono text-[11px]">
                  <div className="text-white border-b border-[#212328] pb-[8px] mb-[12px] flex justify-between">
                    <span>PDF DOCUMENT PREVIEW</span>
                    <span>Page 1 of 1</span>
                  </div>
                  <p className="text-white font-bold">
                    --- FINANCIAL REPORT SUMMARY ---
                  </p>
                  <p>Order ID Reference: JI456M9</p>
                  <p>Verification Status: Reusable / Complete</p>
                  <p className="text-[#545659] mt-[20px]">
                    [Document Content Binary Stream Signatures Validated]
                  </p>
                </div>
              )}
              {previewAttachment.type === "XLSX" && (
                <div className="overflow-x-auto border border-[#212328] rounded-[6px]">
                  <table className="w-full border-collapse text-left font-mono text-[11px]">
                    <thead>
                      <tr className="bg-[#18191d] border-b border-[#212328] text-white">
                        <th className="p-[6px] border-r border-[#212328]">A</th>
                        <th className="p-[6px] border-r border-[#212328]">B</th>
                        <th className="p-[6px]">C</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#212328]">
                      <tr className="bg-[#111215]">
                        <td className="p-[6px] border-r border-[#212328] font-bold text-white">
                          Q2 Revenues
                        </td>
                        <td className="p-[6px] border-r border-[#212328]">
                          PKR 40,000
                        </td>
                        <td className="p-[6px]">Approved</td>
                      </tr>
                      <tr>
                        <td className="p-[6px] border-r border-[#212328] font-bold text-white">
                          Tax Deductions
                        </td>
                        <td className="p-[6px] border-r border-[#212328]">
                          PKR 1,200
                        </td>
                        <td className="p-[6px]">Calculated</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              {previewAttachment.type === "DOCX" && (
                <div className="bg-[#111215] border border-[#212328] p-[20px] rounded-[8px] space-y-[12px]">
                  <p className="font-semibold text-white">
                    Project Specs Document Outline
                  </p>
                  <p>
                    This document details the software specifications for the
                    new report management systems and bank API integrations.
                  </p>
                  <p>
                    1. Objectives & Scope
                    <br />
                    2. System Architecture & Flows
                    <br />
                    3. API Integrations & Security protocols
                  </p>
                </div>
              )}
              {previewAttachment.type === "ZIP" && (
                <div className="bg-[#111215] border border-[#212328] p-[16px] rounded-[8px] font-mono text-[11px] space-y-[4px]">
                  <div className="text-white font-bold mb-[8px]">
                    Archive Contents:
                  </div>
                  <div>📂 images/</div>
                  <div> bank_facade_north.png (12.4 MB)</div>
                  <div> bank_counter_interior.png (24.1 MB)</div>
                  <div>📄 inspection_notes.txt (8.6 KB)</div>
                </div>
              )}
              {(previewAttachment.type === "PNG" ||
                previewAttachment.type === "JPG") && (
                <div className="flex flex-col items-center justify-center p-[20px] bg-[#111215] border border-[#212328] rounded-[8px]">
                  <div className="w-[80px] h-[80px] rounded-full bg-[#1c1e22] flex items-center justify-center text-[#74757b] mb-[12px]">
                    <svg
                      width={32}
                      height={32}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <span className="text-[12px] font-medium text-white">
                    Image File: {previewAttachment.name}
                  </span>
                  <span className="text-[11px] text-[#545659] mt-[4px]">
                    Image preview simulated
                  </span>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-[16px_24px] border-t border-[#212328] bg-[#18191d] flex justify-end gap-[12px] shrink-0">
              <button
                onClick={() => setPreviewAttachment(null)}
                className="h-[32px] px-[16px] rounded-[6px] bg-[#111215] hover:bg-[#1c1e22] text-[#cdd0d6] text-[12px] border border-[#212328] hover:border-[#3e4047] transition-all"
              >
                Close Preview
              </button>
              <button
                onClick={() => {
                  handleDownloadAttachment(previewAttachment);
                  setPreviewAttachment(null);
                }}
                className="h-[32px] px-[16px] rounded-[6px] bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white text-[12px] font-medium hover:brightness-110 shadow-lg transition-all"
              >
                Download File
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

