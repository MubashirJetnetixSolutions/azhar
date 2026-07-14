"use client";

import { useState } from "react";
import AppSelect from "@/components/ui/AppSelect";

const SUBPERMS = ["View", "Edit", "Delete", "Download"];
const ACCESS_SECTIONS = ["Order Section", "Report Hub", "Invoice", "Emails", "Banks", "Company"];

// Order Section keeps its historical defaults; the rest start fully off.
const DEFAULT_ACCESS = Object.fromEntries(
  ACCESS_SECTIONS.map((s) => [
    s,
    s === "Order Section"
      ? { enabled: true, perms: { View: true, Edit: true, Delete: false, Download: false } }
      : { enabled: false, perms: { View: false, Edit: false, Delete: false, Download: false } },
  ])
);

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange?.(!checked)}
      className={`relative shrink-0 w-[38px] h-[22px] rounded-full transition-colors duration-200 cursor-pointer ${checked ? "bg-[#2563eb]" : "bg-[#2a2b32]"
        }`}
    >
      <span
        className={`absolute top-[3px] left-[3px] w-[16px] h-[16px] rounded-full bg-white transition-transform duration-200 ${checked ? "translate-x-[16px]" : "translate-x-0"
          }`}
      />
    </button>
  );
}

// Boxed main toggle that reveals its sub-permission toggles while enabled.
// Sub-toggle states are preserved (not reset) when the section is collapsed,
// matching the original Order Section behavior.
function PermissionSection({ label, enabled, perms, onToggle, onPermChange }) {
  return (
    <div className="bg-[#111215] border border-[#212328] rounded-[10px] overflow-hidden">
      <div className="flex items-center justify-between px-[16px] py-[10px]">
        <span className="text-[13px] text-white">{label}</span>
        <Toggle checked={enabled} onChange={onToggle} />
      </div>

      {enabled && (
        <div className="px-[16px] pb-[12px] space-y-[10px]">
          {SUBPERMS.map((perm) => (
            <div key={perm} className="flex items-center justify-between pl-[12px]">
              <span className="text-[12px] text-[#9ea0a6]">{perm}</span>
              <Toggle checked={perms[perm]} onChange={(v) => onPermChange(perm, v)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const ROLE_OPTIONS = [
  { value: "Admin", label: "Admin" },
  { value: "Data Entry", label: "Data Entry" },
  { value: "Track", label: "Track" },
  { value: "Account", label: "Account" },
];

export default function CreateUserModal({ open, onClose }) {
  const [role, setRole] = useState(null);
  const [access, setAccess] = useState(DEFAULT_ACCESS);

  if (!open) return null;

  const toggleSection = (section, enabled) =>
    setAccess((prev) => ({ ...prev, [section]: { ...prev[section], enabled } }));

  const setSectionPerm = (section, perm, value) =>
    setAccess((prev) => ({
      ...prev,
      [section]: { ...prev[section], perms: { ...prev[section].perms, [perm]: value } },
    }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-[480px] max-w-[calc(100vw-32px)] mx-4 max-h-[90vh] flex flex-col bg-[#1c1d22] border border-[#28292f] rounded-[14px] shadow-2xl">

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-[24px] py-[18px] border-b border-[#212328] shrink-0">
          <div className="flex items-center gap-[12px]">
            <div className="w-[36px] h-[36px] rounded-[8px] bg-[#111215] border border-[#212328] flex items-center justify-center shrink-0">
              <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="#74757b" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="text-[15px] font-semibold text-white">Create User</span>
          </div>
          <button
            onClick={onClose}
            className="text-[#545659] hover:text-white transition-colors cursor-pointer"
          >
            <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ── Form Body ── */}
        <div className="flex-1 min-h-0 overflow-y-auto px-[24px] py-[20px] space-y-[16px]">

          {/* Name */}
          <div>
            <label className="block text-[12px] text-[#74757b] mb-[8px]">Name</label>
            <input className="w-full h-[42px] px-[12px] rounded-[6px] text-[13px] text-white bg-[#111215] border border-[#212328] outline-none focus:border-[#3e4047] transition-colors" />
          </div>

          {/* Email + Phone */}
          <div className="grid grid-cols-2 gap-[12px]">
            <div>
              <label className="block text-[12px] text-[#74757b] mb-[8px]">Email</label>
              <input className="w-full h-[42px] px-[12px] rounded-[6px] text-[13px] text-white bg-[#111215] border border-[#212328] outline-none focus:border-[#3e4047] transition-colors" />
            </div>
            <div>
              <label className="block text-[12px] text-[#74757b] mb-[8px]">Phone</label>
              <input className="w-full h-[42px] px-[12px] rounded-[6px] text-[13px] text-white bg-[#111215] border border-[#212328] outline-none focus:border-[#3e4047] transition-colors" />
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="block text-[12px] text-[#74757b] mb-[8px]">Role</label>
            <AppSelect
              variant="default"
              size="lg"
              value={role}
              onChange={setRole}
              options={ROLE_OPTIONS}
              placeholder="Select role"
              isSearchable={false}
            />
          </div>

          {/* Divider */}
          <div className="h-px bg-[#212328]" />

          {/* Access section label */}
          <p className="text-[13px] font-semibold text-white">Access</p>

          {/* Permission sections — each expands independently */}
          <div className="space-y-[2px]">
            {ACCESS_SECTIONS.map((s) => (
              <PermissionSection
                key={s}
                label={s}
                enabled={access[s].enabled}
                perms={access[s].perms}
                onToggle={(v) => toggleSection(s, v)}
                onPermChange={(perm, v) => setSectionPerm(s, perm, v)}
              />
            ))}
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="flex items-center justify-between px-[24px] py-[16px] border-t border-[#212328] shrink-0">
          <button
            onClick={onClose}
            className="h-[38px] px-[20px] rounded-[8px] text-[13px] font-medium text-[#9ea0a6] bg-[#111215] border border-[#212328] hover:text-white hover:border-[#3e4047] cursor-pointer transition-colors"
          >
            Cancel
          </button>
          <button className="h-[38px] px-[20px] rounded-[8px] text-[13px] font-medium text-white bg-[#2563eb] hover:bg-[#1d4ed8] cursor-pointer transition-colors">
            Create User
          </button>
        </div>
      </div>
    </div>
  );
}
