"use client";

import { useState, useRef, useEffect } from "react";
import { users } from "@/data/mockData";
import CreateUserModal from "@/components/modals/CreateUserModal";
import DeleteConfirmModal from "@/components/modals/DeleteConfirmModal";
import AddBankRateModal from "@/components/modals/AddBankRateModal";

const TABS = ["General", "Security", "Users", "Templates", "Integrations", "Invoice Templates", "Bank Rates"];

// ── Toast notification ────────────────────────────────────
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
      <div className={`w-[22px] h-[22px] rounded-full flex items-center justify-center shrink-0 ${ok
        ? "bg-[rgba(16,185,129,0.15)] border border-[rgba(16,185,129,0.25)]"
        : "bg-[rgba(239,68,68,0.15)] border border-[rgba(239,68,68,0.25)]"
        }`}>
        {ok ? (
          <svg width={11} height={11} fill="none" viewBox="0 0 24 24" stroke="#10b981" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg width={11} height={11} fill="none" viewBox="0 0 24 24" stroke="#ef4444" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
      </div>
      <p className="text-[13px] text-white">{message}</p>
    </div>
  );
}

// ── Password field with eye toggle ─────────────────────────
function PasswordField({ label, halfWidth = false }) {
  const [show, setShow] = useState(false);
  return (
    <div className={halfWidth ? "w-1/2" : "w-full"}>
      {label && <label className="block text-[12px] text-[#74757b] mb-[8px]">{label}</label>}
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          className="w-full h-[42px] px-[12px] pr-[40px] rounded-[6px] text-[13px] text-white bg-[#111215] border border-[#212328] outline-none focus:border-[#3e4047] transition-colors"
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="absolute right-[12px] top-1/2 -translate-y-1/2 text-[#545659] hover:text-[#9ea0a6] transition-colors cursor-pointer"
        >
          <svg width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ── Section divider ────────────────────────────────────────
function SectionDivider({ title }) {
  return (
    <div className="mb-[20px]">
      <p className="text-[13px] text-[#9ea0a6] mb-[10px]">{title}</p>
      <div className="h-px bg-[#212328]" />
    </div>
  );
}

// ── Profile picture with file upload ──────────────────────
function ProfileImageItem({ src, onImageChange, onDelete, onInvalidFile }) {
  const fileRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      onInvalidFile?.();
      e.target.value = "";
      return;
    }
    onImageChange(URL.createObjectURL(file));
    e.target.value = "";
  };

  return (
    <div className="flex items-center justify-between flex-wrap gap-[12px] py-[14px]">
      <input ref={fileRef} type="file" accept=".jpg,.jpeg,.png,.webp" onChange={handleFile} className="hidden" />
      <div className="flex items-center gap-[18px]">
        <div
          onClick={() => fileRef.current?.click()}
          className="w-[84px] h-[84px] rounded-[10px] bg-[#25273a] shrink-0 overflow-hidden cursor-pointer"
        >
          {src && <img src={src} alt="Profile" className="w-full h-full object-cover" />}
        </div>
        <div>
          <p className="text-[13px] font-medium text-white">Profile Picture</p>
          <p className="text-[12px] text-[#74757b] mt-[4px] max-w-[400px] leading-[18px]">
            This picture will be appear publicly on the platform
          </p>
        </div>
      </div>
      <div className="flex gap-[8px] shrink-0">
        <button
          onClick={() => fileRef.current?.click()}
          className="w-[30px] h-[30px] rounded-[6px] border border-[#212328] bg-[#111215] text-[#9ea0a6] hover:text-white hover:bg-[rgba(255,255,255,0.04)] flex items-center justify-center cursor-pointer transition-colors"
        >
          <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
        <button
          onClick={onDelete}
          className="w-[30px] h-[30px] rounded-[6px] border border-[#212328] bg-[#111215] text-[#9ea0a6] hover:text-red-400 hover:border-red-900/50 hover:bg-[rgba(239,68,68,0.05)] flex items-center justify-center cursor-pointer transition-colors"
        >
          <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ── Static image item (invoice templates) ─────────────────
function ImageItem({ label, description }) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-[12px] py-[14px]">
      <div className="flex items-center gap-[18px]">
        <div className="w-[84px] h-[84px] rounded-[10px] bg-[#25273a] shrink-0" />
        <div>
          <p className="text-[13px] font-medium text-white">{label}</p>
          <p className="text-[12px] text-[#74757b] mt-[4px] max-w-[400px] leading-[18px]">{description}</p>
        </div>
      </div>
      <div className="flex gap-[8px] shrink-0">
        <button className="w-[30px] h-[30px] rounded-[6px] border border-[#212328] bg-[#111215] text-[#9ea0a6] hover:text-white hover:bg-[rgba(255,255,255,0.04)] flex items-center justify-center cursor-pointer transition-colors">
          <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
        <button className="w-[30px] h-[30px] rounded-[6px] border border-[#212328] bg-[#111215] text-[#9ea0a6] hover:text-red-400 hover:border-red-900/50 hover:bg-[rgba(239,68,68,0.05)] flex items-center justify-center cursor-pointer transition-colors">
          <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ── Content panel wrapper ─────────────────────────────────
function ContentPanel({ title, subtitle, onSave, action, children }) {
  return (
    <div className="flex-1 w-full bg-[#151619] border border-[#212328] rounded-[12px] min-w-0 overflow-hidden">
      <div className="flex items-center justify-between flex-wrap gap-[12px] px-[20px] sm:px-[28px] py-[20px] border-b border-[#212328]">
        <div>
          <h2 className="text-[16px] font-semibold text-white">{title}</h2>
          <p className="text-[12px] text-[#74757b] mt-[2px]">{subtitle}</p>
        </div>
        {/* Tabs can swap the default Save Changes button for their own action */}
        {action ?? (
          <button
            onClick={onSave}
            className="h-[34px] px-[18px] rounded-[8px] text-[12px] font-medium text-white bg-[#2563eb] hover:bg-[#1d4ed8] cursor-pointer transition-colors shrink-0"
          >
            Save Changes
          </button>
        )}
      </div>
      {/* overflow-visible here so the Bank Rates table can use negative margins to break out of padding */}
      <div className="p-[20px] sm:p-[28px] overflow-visible">{children}</div>
    </div>
  );
}

// ── Tab: General ──────────────────────────────────────────
function GeneralTab({ profileImg, onImageChange, onImageDelete, onInvalidFile, form, onFormChange }) {
  return (
    <div className="space-y-[28px] py-4 px-0 sm:px-6 lg:px-[78px]">
      <div>
        <SectionDivider title="Profile Picture" />
        <ProfileImageItem
          src={profileImg}
          onImageChange={onImageChange}
          onDelete={onImageDelete}
          onInvalidFile={onInvalidFile}
        />
      </div>
      <div>
        <SectionDivider title="General Information" />
        <div className="space-y-[16px]">
          <div>
            <label className="block text-[12px] text-[#74757b] mb-[8px]">Name</label>
            <input
              value={form.name}
              onChange={(e) => onFormChange("name", e.target.value)}
              className="w-full h-[42px] px-[12px] rounded-[6px] text-[13px] text-white bg-[#111215] border border-[#212328] outline-none focus:border-[#3e4047] transition-colors"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
            <div>
              <label className="block text-[12px] text-[#74757b] mb-[8px]">Email</label>
              <input
                value={form.email}
                onChange={(e) => onFormChange("email", e.target.value)}
                className="w-full h-[42px] px-[12px] rounded-[6px] text-[13px] text-white bg-[#111215] border border-[#212328] outline-none focus:border-[#3e4047] transition-colors"
              />
            </div>
            <div>
              <label className="block text-[12px] text-[#74757b] mb-[8px]">Phone Number</label>
              <input
                value={form.phone}
                onChange={(e) => onFormChange("phone", e.target.value)}
                className="w-full h-[42px] px-[12px] rounded-[6px] text-[13px] text-white bg-[#111215] border border-[#212328] outline-none focus:border-[#3e4047] transition-colors"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Tab: Security ─────────────────────────────────────────
function SecurityTab() {
  return (
    <div className="space-y-[28px] py-4 px-0 sm:px-6 lg:px-[78px]">
      <div>
        <SectionDivider title="Password" />
        <div className="space-y-[16px]">
          <div>
            <div className="flex items-center justify-between mb-[8px]">
              <span className="text-[12px] text-[#74757b]">Current Password</span>
              <button className="text-[12px] font-bold text-white cursor-pointer">Forget Password</button>
            </div>
            <input
              type="password"
              className="w-full sm:w-1/2 h-[42px] px-[12px] rounded-[6px] text-[13px] text-white bg-[#111215] border border-[#212328] outline-none focus:border-[#3e4047] transition-colors"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
            <PasswordField label="New Password" />
            <PasswordField label="Confirm Password" />
          </div>
        </div>
      </div>
      <div>
        <SectionDivider title="Pin" />
        <div className="space-y-[16px]">
          <div>
            <div className="flex items-center justify-between mb-[8px]">
              <span className="text-[12px] text-[#74757b]">Pin</span>
              <button className="text-[12px] font-bold text-white cursor-pointer">Forget Pin</button>
            </div>
            <input
              type="password"
              className="w-full sm:w-1/2 h-[42px] px-[12px] rounded-[6px] text-[13px] text-white bg-[#111215] border border-[#212328] outline-none focus:border-[#3e4047] transition-colors"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
            <PasswordField label="New Pin" />
            <PasswordField label="Confirm Pin" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Tab: Users ────────────────────────────────────────────
function UsersTab() {
  const [search, setSearch] = useState("");
  const filtered = search
    ? users.filter((u) =>
      ["name", "email", "phone", "type"].some((k) =>
        String(u[k] ?? "").toLowerCase().includes(search.toLowerCase())
      )
    )
    : users;

  return (
    <div>
      {/* Search — the Add User button lives in the panel header */}
      <div className="flex items-center justify-end gap-[12px] mb-[20px]">
        <div className="relative w-full sm:w-auto">
          <svg className="absolute left-[10px] top-1/2 -translate-y-1/2 pointer-events-none" width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="#545659" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Find Company"
            className="w-full sm:w-[220px] h-[34px] pl-[32px] pr-[12px] rounded-[6px] text-[12px] text-[#9ea0a6] bg-[#111215] border border-[#212328] outline-none focus:border-[#3e4047] transition-colors placeholder-[#545659]"
          />
        </div>
      </div>

      {/* Horizontal scroll on narrow screens instead of squeezing columns */}
      <div className="overflow-x-auto">
      <table className="w-full border-collapse min-w-[560px]">
        <thead>
          <tr className="border-b border-[#212328]">
            {["Name", "Email", "Phone", "Type", "Actions"].map((h) => (
              <th key={h} className="text-left pb-[10px] pr-[16px] text-[11px] text-[#545659] font-normal uppercase tracking-[0.03em]">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 && (
            <tr>
              <td colSpan={5} className="py-[32px] text-center text-[#74757b] text-[12px]">
                No users match your search.
              </td>
            </tr>
          )}
          {filtered.map((u, i) => (
            <tr key={i} className="border-b border-[#212328] last:border-0 h-[52px] hover:bg-[rgba(255,255,255,0.01)] transition-colors">
              <td className="pr-[16px] text-[12px] text-white font-medium">{u.name}</td>
              <td className="pr-[16px] text-[12px] text-[#9ea0a6]">{u.email}</td>
              <td className="pr-[16px] text-[12px] text-[#9ea0a6]">{u.phone}</td>
              <td className="pr-[16px] text-[12px] text-[#9ea0a6]">{u.type}</td>
              <td>
                <div className="flex gap-[6px]">
                  <button className="w-[28px] h-[28px] rounded-[6px] border border-[#212328] bg-[#111215] text-[#9ea0a6] hover:text-white hover:bg-[rgba(255,255,255,0.04)] flex items-center justify-center cursor-pointer transition-colors">
                    <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button className="w-[28px] h-[28px] rounded-[6px] border border-[#212328] bg-[#111215] text-[#9ea0a6] hover:text-red-400 hover:border-red-900/50 hover:bg-[rgba(239,68,68,0.05)] flex items-center justify-center cursor-pointer transition-colors">
                    <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <div className="flex items-center justify-between pt-[14px] mt-[8px] border-t border-[#212328]">
        <span className="text-[#74757b] text-[12px]">Showing 7 of 62 orders</span>
        <div className="flex gap-[6px]">
          <button className="h-[28px] px-[12px] flex items-center gap-[4px] text-[11px] text-[#888] bg-[#111215] border border-[#212328] rounded-[6px] cursor-pointer hover:text-white hover:bg-[#1c1d22] transition-colors">
            <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Prev
          </button>
          <button className="h-[28px] px-[12px] flex items-center gap-[4px] text-[11px] text-[#888] bg-[#111215] border border-[#212328] rounded-[6px] cursor-pointer hover:text-white hover:bg-[#1c1d22] transition-colors">
            Next
            <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Tab: Integrations ───────────────────────────────────
const AI_INTEGRATION_SECTIONS = [
  { title: "Claude", fields: ["Secret Key", "Api Key"] },
  { title: "Gmail", fields: ["Secret Key", "Api Key"] },
  { title: "Google maps", fields: ["Secret Key"] },
];

function AiIntegrationTab() {
  return (
    <div className="space-y-[44px] py-4 px-0 sm:px-6 lg:px-[78px]">
      {AI_INTEGRATION_SECTIONS.map(({ title, fields }) => (
        <div key={title} className="border-b-1 border-solid border-[#212328] pb-[50px]">
          <p className="text-[13px] font-medium text-white mb-[18px]">{title}</p>
          <div className="space-y-[20px]">
            {fields.map((label) => (
              <PasswordField key={label} label={label} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Tab: Invoice Templates ────────────────────────────────
const INVOICE_SECTIONS = [
  {
    title: "Taxes",
    items: [
      { label: "Header", description: "This picture will appear on top of your tax based invoices." },
      { label: "Footer", description: "This picture will appear on bottom of your tax based invoices." },
    ],
  },
  {
    title: "SMEs",
    items: [
      { label: "Header", description: "This picture will appear on top of your invoices." },
      { label: "Footer", description: "This picture will appear on bottom of your invoices." },
    ],
  },
];

function InvoiceTemplatesTab() {
  return (
    <div className="space-y-[28px] py-4 px-0 sm:px-6 lg:px-[78px]">
      {INVOICE_SECTIONS.map(({ title, items }) => (
        <div key={title}>
          <SectionDivider title={title} />
          <div className="divide-y divide-[#212328]">
            {items.map(({ label, description }) => (
              <ImageItem key={label} label={label} description={description} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Tab: Bank Rates ───────────────────────────────────────
const INITIAL_BANK_RATES = [
  { id: 1, country: "Pakistan", onlineRate: 738, offlineRate: 816, bank: "United Bank Limited", branches: ["Hyderi", "Gulshan-e-iqbal", "DHA", "Clifton", "Johar", "Nazimabad"] },
  { id: 2, country: "United Arab Emirates", onlineRate: 154, offlineRate: 556, bank: "Muslim Commercial Bank", branches: ["Hyderi", "Gulshan-e-iqbal", "DHA", "Clifton", "Johar", "Nazimabad"] },
  { id: 3, country: "Saudi Arabia", onlineRate: 703, offlineRate: 922, bank: "Habib Bank Limited", branches: ["Hyderi", "Gulshan-e-iqbal", "DHA", "Clifton", "Johar", "Nazimabad"] },
  { id: 4, country: "United Kingdom", onlineRate: 536, offlineRate: 274, bank: "Bank Al Habib Limited", branches: ["Hyderi", "Gulshan-e-iqbal", "DHA", "Clifton", "Johar", "Nazimabad"] },
  { id: 5, country: "United States", onlineRate: 600, offlineRate: 357, bank: "Allied Bank Limited", branches: ["Hyderi", "Gulshan-e-iqbal", "DHA", "Clifton", "Johar", "Nazimabad"] },
  { id: 6, country: "China", onlineRate: 740, offlineRate: 883, bank: "Bank Islami", branches: ["Hyderi", "Gulshan-e-iqbal", "DHA", "Clifton", "Johar", "Nazimabad"] },
  { id: 7, country: "Germany", onlineRate: 130, offlineRate: 994, bank: "Dubai Islamic", branches: ["Hyderi", "Gulshan-e-iqbal", "DHA", "Clifton", "Johar", "Nazimabad"] },
];

const PER_PAGE_RATES = 7;

function AppliedBranches({ branches, onExpand }) {
  const visible = branches.slice(0, 2);
  const overflow = branches.length - 2;
  return (
    <div className="flex items-center gap-[4px] flex-nowrap">
      {visible.map((b) => (
        <span
          key={b}
          className="text-[11px] text-[#3b82f6] bg-[rgba(59,130,246,0.08)] border border-[rgba(59,130,246,0.2)] rounded-[4px] px-[6px] py-[2px] whitespace-nowrap"
        >
          {b}
        </span>
      ))}
      {overflow > 0 && (
        <span
          onClick={(e) => { e.stopPropagation(); onExpand?.(); }}
          className="text-[11px] text-[#9ea0a6] bg-[#1a1b1f] border border-[#2e3037] rounded-[4px] px-[6px] py-[2px] whitespace-nowrap cursor-pointer hover:bg-[rgba(255,255,255,0.06)] hover:text-white transition-colors"
        >
          +{overflow}
        </span>
      )}
    </div>
  );
}

const RATE_TABLE_COLS = ["Country Name", "Online Rate", "Offline Rate", "Bank", "Applied Branches", "Actions"];

function BankRatesTab({ addOpen, onAddClose }) {
  const [rates, setRates] = useState(INITIAL_BANK_RATES);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [drawerRow, setDrawerRow] = useState(null);

  // Close drawer on Escape
  useEffect(() => {
    if (!drawerRow) return;
    const handler = (e) => { if (e.key === "Escape") setDrawerRow(null); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [drawerRow]);

  const filtered = search.trim()
    ? rates.filter((r) =>
      ["country", "bank"].some((k) =>
        String(r[k]).toLowerCase().includes(search.toLowerCase())
      )
    )
    : rates;

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE_RATES));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered.slice((safePage - 1) * PER_PAGE_RATES, safePage * PER_PAGE_RATES);

  const confirmDelete = () => {
    setRates((prev) => prev.filter((r) => r.id !== deleteTarget));
    setDeleteTarget(null);
  };

  const handleAdd = (newRate) => {
    setRates((prev) => [...prev, { ...newRate, id: Date.now() }]);
    onAddClose();
  };

  return (
    <>
      {/* Search — the Add New Rate button lives in the panel header */}
      <div className="flex items-center justify-between gap-[12px] mb-[20px] flex-wrap">
        <div className="relative w-full sm:w-auto">
          <svg
            className="absolute left-[10px] top-1/2 -translate-y-1/2 pointer-events-none"
            width={13} height={13} fill="none" viewBox="0 0 24 24"
            stroke="#545659" strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search"
            className="w-full sm:w-[220px] h-[34px] pl-[32px] pr-[12px] rounded-[6px] text-[12px] text-[#9ea0a6] bg-[#111215] border border-[#212328] outline-none focus:border-[#3e4047] transition-colors placeholder-[#545659]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto scrolling-touch -mx-[20px] sm:-mx-[28px]">
        <table className="w-full border-collapse min-w-[780px]">
          <thead>
            <tr className="border-b border-[#212328]">
              {RATE_TABLE_COLS.map((h, idx) => (
                <th
                  key={h}
                  className={`pb-[12px] text-left text-[11px] text-[#545659] font-normal uppercase tracking-[0.03em] whitespace-nowrap ${idx === 0
                    ? "pl-[28px] pr-[16px]"
                    : idx === RATE_TABLE_COLS.length - 1
                      ? "pl-[16px] pr-[28px] text-right"
                      : "px-[16px]"
                    }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.length === 0 ? (
              <tr>
                <td colSpan={RATE_TABLE_COLS.length} className="py-[32px] text-center text-[#74757b] text-[12px]">
                  No rates match your search.
                </td>
              </tr>
            ) : (
              pageRows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-[#212328] last:border-0 hover:bg-[rgba(255,255,255,0.01)] transition-colors"
                >
                  <td className="pl-[28px] pr-[16px] py-[14px] h-[56px] align-middle text-[12px] text-[#cdd0d6] font-medium whitespace-nowrap">
                    {row.country}
                  </td>
                  <td className="px-[16px] py-[14px] h-[56px] align-middle text-[12px] text-[#9ea0a6]">
                    {row.onlineRate}
                  </td>
                  <td className="px-[16px] py-[14px] h-[56px] align-middle text-[12px] text-[#9ea0a6]">
                    {row.offlineRate}
                  </td>
                  <td className="px-[16px] py-[14px] h-[56px] align-middle text-[12px] text-[#cdd0d6] whitespace-nowrap">
                    {row.bank}
                  </td>
                  <td className="px-[16px] py-[14px] h-[56px] align-middle">
                    <AppliedBranches branches={row.branches} onExpand={() => setDrawerRow(row)} />
                  </td>
                  <td className="pl-[16px] pr-[28px] py-[14px] h-[56px] align-middle">
                    <div className="flex gap-[6px] justify-end">
                      <button className="w-[28px] h-[28px] rounded-[6px] border border-[#212328] bg-[#111215] text-[#9ea0a6] hover:text-white hover:bg-[rgba(255,255,255,0.04)] flex items-center justify-center cursor-pointer transition-colors">
                        <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setDeleteTarget(row.id)}
                        className="w-[28px] h-[28px] rounded-[6px] border border-[#212328] bg-[#111215] text-[#9ea0a6] hover:text-red-400 hover:border-red-900/50 hover:bg-[rgba(239,68,68,0.05)] flex items-center justify-center cursor-pointer transition-colors"
                      >
                        <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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

      {/* Pagination */}
      <div className="flex items-center justify-between pt-[14px] mt-[4px] border-t border-[#212328]">
        <span className="text-[#74757b] text-[12px]">
          Showing {pageRows.length} of {search.trim() ? filtered.length : Math.max(filtered.length, 62)} orders
        </span>
        <div className="flex gap-[6px]">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
            className={`h-[28px] px-[12px] flex items-center gap-[4px] text-[11px] rounded-[6px] border border-[#212328] bg-[#111215] transition-colors ${safePage === 1
              ? "text-[#3e4047] cursor-not-allowed"
              : "text-[#888] hover:text-white hover:bg-[#1c1d22] cursor-pointer"
              }`}
          >
            &lt; Prev
          </button>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages}
            className={`h-[28px] px-[12px] flex items-center gap-[4px] text-[11px] rounded-[6px] border border-[#212328] bg-[#111215] transition-colors ${safePage === totalPages
              ? "text-[#3e4047] cursor-not-allowed"
              : "text-[#888] hover:text-white hover:bg-[#1c1d22] cursor-pointer"
              }`}
          >
            Next &gt;
          </button>
        </div>
      </div>

      <AddBankRateModal open={addOpen} onClose={onAddClose} onAdd={handleAdd} />
      <DeleteConfirmModal
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />

      {/* ── Branch detail drawer ── */}
      {drawerRow && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setDrawerRow(null)}
          />

          {/* Slide-over panel — same animation/styling as Banks drawer */}
          <div className="fixed top-0 right-0 h-screen w-full max-w-[440px] bg-[#121112] border-l border-[#212328] shadow-2xl z-50 flex flex-col overflow-hidden animate-[slideInRate_0.25s_ease-out_forwards]">
            <style>{`@keyframes slideInRate{from{transform:translateX(100%)}to{transform:translateX(0%)}}`}</style>

            {/* Header */}
            <div className="flex items-center justify-between px-[24px] py-[18px] border-b border-[#1e2025] shrink-0">
              <div className="min-w-0">
                <p className="text-[11px] text-[#545659] leading-none mb-[6px] uppercase tracking-[0.04em]">Bank Rate Details</p>
                <h2 className="text-[16px] font-semibold text-white leading-none truncate">{drawerRow.country}</h2>
              </div>
              <button
                onClick={() => setDrawerRow(null)}
                className="shrink-0 ml-[16px] w-[30px] h-[30px] rounded-[6px] bg-[#1a1b1f] border border-[#212328] flex items-center justify-center text-[#545659] hover:text-white hover:bg-[rgba(255,255,255,0.06)] transition-colors cursor-pointer"
                aria-label="Close"
              >
                <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto p-[20px] space-y-[16px]">

              {/* ── Rate Details card ── */}
              <div className="bg-[#151619] border border-[#212328] rounded-[12px] p-[20px]">
                <h3 className="text-[13px] font-semibold text-white leading-none mb-[16px]">Rate Details</h3>
                {[
                  { label: "Country", value: drawerRow.country },
                  { label: "Bank", value: drawerRow.bank },
                  { label: "Online Rate", value: drawerRow.onlineRate },
                  { label: "Offline Rate", value: drawerRow.offlineRate },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between py-[10px] border-b border-[#212328] last:border-0">
                    <span className="text-[12px] text-[#74757b]">{label}</span>
                    <span className="text-[12px] text-white font-medium">{value}</span>
                  </div>
                ))}
              </div>

              {/* ── All Branches card ── */}
              <div className="bg-[#151619] border border-[#212328] rounded-[12px] p-[20px]">
                <div className="flex items-center justify-between mb-[16px]">
                  <h3 className="text-[13px] font-semibold text-white leading-none">Applied Branches</h3>
                  <span className="text-[11px] text-[#545659] bg-[#111215] border border-[#212328] rounded-[4px] px-[8px] py-[3px]">
                    {drawerRow.branches.length} total
                  </span>
                </div>
                <div className="flex flex-col gap-[8px]">
                  {drawerRow.branches.map((branch) => (
                    <span
                      key={branch}
                      className="text-[12px] text-[#ffffff] bg-[transparent] border-b border-[rgba(77,77,77,0.2)] py-[6px] whitespace-nowrap"
                    >
                      {branch}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </>
      )}
    </>
  );
}

// ── Main Settings Page ────────────────────────────────────
const PANEL_META = {
  General: { title: "General", subtitle: "Basic user info can be managed from here." },
  Security: { title: "Security", subtitle: "You can update your password and pin from here." },
  Users: { title: "Users", subtitle: "You can create different users of the system from here" },
  Templates: { title: "Templates", subtitle: "Manage your report templates from here." },
  Integrations: { title: "Integration", subtitle: "Your open-ai integration details are here." },
  "Invoice Templates": { title: "Invoice Template", subtitle: "Your invoice header and footer can be updated from here." },
  "Bank Rates": { title: "Bank Rates", subtitle: "Update bank rates per country." },
};

export default function SettingsPage() {
  const [active, setActive] = useState("General");
  const [createUserOpen, setCreateUserOpen] = useState(false);
  const [deleteImgOpen, setDeleteImgOpen] = useState(false);
  const [addRateOpen, setAddRateOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // General tab state — lifted here so Save Changes can read them
  const [profileImg, setProfileImg] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const showToast = (type, message) => setToast({ type, message, id: Date.now() });

  const handleGeneralSave = () => {
    showToast("success", "Profile updated successfully");
  };

  const { title, subtitle } = PANEL_META[active];

  return (
    <div className="py-4 px-4 md:py-5 md:px-7">
      <h1 className="text-[22px] font-bold text-white tracking-[-0.015em] mb-[24px]">Settings</h1>

      <div className="flex flex-col lg:flex-row gap-[20px] items-start">
        {/* ── Left Sidebar ── */}
        <div className="w-full lg:sticky lg:top-[70px] lg:w-[260px] shrink-0 bg-[#151619] border border-[#212328] rounded-[12px] overflow-hidden">
          {TABS.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`w-full text-left px-[20px] h-[52px] flex items-center text-[13px] cursor-pointer transition-colors duration-100 ${i < TABS.length - 1 ? "border-b border-[#212328]" : ""
                } ${active === tab
                  ? "bg-[rgba(255,255,255,0.045)] text-white font-medium"
                  : "text-[#74757b] hover:text-[#9ea0a6] hover:bg-[rgba(255,255,255,0.02)]"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Right Content Panel ── */}
        <ContentPanel
          title={title}
          subtitle={subtitle}
          onSave={active === "General" ? handleGeneralSave : undefined}
          action={
            active === "Bank Rates" ? (
              <button
                onClick={() => setAddRateOpen(true)}
                className="h-[34px] px-[16px] rounded-[6px] items-center flex gap-2 text-[12px] font-medium text-[#cdd0d6] bg-[#1e2027] border border-[#373a42] hover:bg-[#272b34] hover:border-[#484b54] cursor-pointer transition-colors whitespace-nowrap shrink-0"
              >
                <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                <span>Add New Rate</span>
              </button>
            ) : active === "Users" ? (
              <button
                onClick={() => setCreateUserOpen(true)}
                className="h-[34px] px-[18px] rounded-[8px] text-[12px] font-medium text-white bg-[#2563eb] hover:bg-[#1d4ed8] cursor-pointer transition-colors shrink-0 whitespace-nowrap"
              >
                Add User
              </button>
            ) : undefined
          }
        >
          {active === "General" && (
            <GeneralTab
              profileImg={profileImg}
              onImageChange={setProfileImg}
              onImageDelete={() => setDeleteImgOpen(true)}
              onInvalidFile={() => showToast("error", "Invalid file type. Please use JPG, PNG, or WEBP.")}
              form={form}
              onFormChange={(field, val) => setForm((prev) => ({ ...prev, [field]: val }))}
            />
          )}
          {active === "Security" && <SecurityTab />}
          {active === "Users" && <UsersTab />}
          {active === "Templates" && <p className="text-[#74757b] text-[13px]">No templates configured.</p>}
          {active === "Integrations" && <AiIntegrationTab />}
          {active === "Invoice Templates" && <InvoiceTemplatesTab />}
          {active === "Bank Rates" && (
            <BankRatesTab addOpen={addRateOpen} onAddClose={() => setAddRateOpen(false)} />
          )}
        </ContentPanel>
      </div>

      {toast && (
        <Toast
          key={toast.id}
          type={toast.type}
          message={toast.message}
          onDismiss={() => setToast(null)}
        />
      )}

      <CreateUserModal open={createUserOpen} onClose={() => setCreateUserOpen(false)} />
      <DeleteConfirmModal
        open={deleteImgOpen}
        onClose={() => setDeleteImgOpen(false)}
        onConfirm={() => {
          setProfileImg(null);
          setDeleteImgOpen(false);
          showToast("success", "Profile picture removed.");
        }}
      />
    </div>
  );
}
