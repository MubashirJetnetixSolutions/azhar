"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

// ── User profile data ──────────────────────────────────────
const USER = {
  name: "Audrey Lay",
  email: "audrey.lay@autosystem.io",
  role: "Admin",
  initials: "AL",
};

// ── Mock notifications ─────────────────────────────────────
const INITIAL_NOTIFICATIONS = [
  {
    id: 1, category: "order", type: "info",
    title: "New Order Assigned",
    message: "Order #JI456M9 has been assigned to you for review",
    time: "Just now", read: false, href: "/orders",
  },
  {
    id: 2, category: "invoice", type: "success",
    title: "Invoice Created",
    message: "Invoice #INV-1042 was created successfully",
    time: "5 min ago", read: false, href: "/invoices",
  },
  {
    id: 3, category: "system", type: "error",
    title: "Sanctions Alert",
    message: "Potential sanctions match detected on Order #AB123",
    time: "28 min ago", read: false, href: "/orders",
  },
  {
    id: 4, category: "report", type: "warning",
    title: "Report Pending Review",
    message: "Al Fardan Group Q2 report is awaiting your approval",
    time: "1 hour ago", read: false, href: "/report-hub",
  },
  {
    id: 5, category: "company", type: "success",
    title: "Company Verified",
    message: "Zhongke Aerospace Ltd has passed all verification checks",
    time: "3 hours ago", read: true, href: "/company",
  },
  {
    id: 6, category: "user", type: "info",
    title: "Permissions Updated",
    message: "Admin granted you report export access",
    time: "Yesterday", read: true, href: "/settings",
  },
  {
    id: 7, category: "report", type: "success",
    title: "Report Generated",
    message: "Q2 2024 financial report has been generated and is ready",
    time: "Yesterday", read: true, href: "/report-hub",
  },
  {
    id: 8, category: "order", type: "info",
    title: "Order Status Changed",
    message: "Order #XY789 has moved to In Verification stage",
    time: "2 days ago", read: true, href: "/orders",
  },
];

// ── Category icon styles ───────────────────────────────────
const CAT = {
  order:   { bg: "rgba(168,85,247,0.1)",  border: "rgba(168,85,247,0.22)", color: "#a855f7" },
  invoice: { bg: "rgba(59,130,246,0.1)",  border: "rgba(59,130,246,0.22)", color: "#3b82f6" },
  report:  { bg: "rgba(99,102,241,0.1)",  border: "rgba(99,102,241,0.22)", color: "#6366f1" },
  company: { bg: "rgba(20,184,166,0.1)",  border: "rgba(20,184,166,0.22)", color: "#14b8a6" },
  user:    { bg: "rgba(249,115,22,0.1)",  border: "rgba(249,115,22,0.22)", color: "#f97316" },
  system:  { bg: "rgba(239,68,68,0.1)",   border: "rgba(239,68,68,0.22)",  color: "#ef4444" },
};

const TYPE_DOT = { success: "#22c55e", info: "#3b82f6", warning: "#eab308", error: "#ef4444" };

// ── Category icons ─────────────────────────────────────────
function CatIcon({ category }) {
  const s = CAT[category] || CAT.system;
  const c = s.color;
  const paths = {
    order: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
        <rect x="8" y="2" width="8" height="4" rx="1" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m9 14 2 2 4-4" />
      </>
    ),
    invoice: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    ),
    report: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    ),
    company: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    ),
    user: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    ),
    system: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="m21.73 18-8-14a2 2 0 00-3.48 0l-8 14A2 2 0 004 21h16a2 2 0 001.73-3z" />
        <line x1="12" y1="9" x2="12" y2="13" strokeLinecap="round" />
        <line x1="12" y1="17" x2="12.01" y2="17" strokeLinecap="round" />
      </>
    ),
  };
  return (
    <div
      className="w-[36px] h-[36px] rounded-[10px] flex items-center justify-center shrink-0"
      style={{ background: s.bg, border: `1px solid ${s.border}` }}
    >
      <svg width={15} height={15} fill="none" viewBox="0 0 24 24" stroke={c} strokeWidth={2}>
        {paths[category] || paths.system}
      </svg>
    </div>
  );
}

// ── Notification item row ──────────────────────────────────
function NotifItem({ notif, onClick }) {
  const dot = TYPE_DOT[notif.type] || "#3b82f6";
  return (
    <button
      type="button"
      onClick={() => onClick(notif)}
      className="w-full text-left px-[14px] py-[11px] flex items-start gap-[11px] transition-colors duration-100 hover:bg-[rgba(255,255,255,0.03)] cursor-pointer"
      style={!notif.read ? { background: "rgba(37,99,235,0.04)" } : undefined}
    >
      <div className="relative shrink-0 mt-[1px]">
        <CatIcon category={notif.category} />
        {!notif.read && (
          <span
            className="absolute -top-[2px] -right-[2px] w-[9px] h-[9px] rounded-full"
            style={{ background: dot, border: "2px solid #1c1d22" }}
          />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-[6px]">
          <p
            className="text-[12px] leading-[15px] truncate"
            style={{ color: notif.read ? "#9ea0a6" : "#fff", fontWeight: notif.read ? 400 : 600 }}
          >
            {notif.title}
          </p>
          <span className="text-[10px] text-[#4b4d55] whitespace-nowrap shrink-0 mt-[1px] leading-none">
            {notif.time}
          </span>
        </div>
        <p className="text-[11px] text-[#555860] leading-[15px] mt-[3px] line-clamp-2">
          {notif.message}
        </p>
      </div>
    </button>
  );
}

// ── Notification dropdown panel ────────────────────────────
function NotifPanel({ notifications, onMarkAllRead, onNotifClick, innerRef }) {
  const unread = notifications.filter((n) => !n.read).length;
  return (
    <div
      ref={innerRef}
      className="bg-[#1c1d22] border border-[#282930] rounded-[14px] overflow-hidden"
      style={{ boxShadow: "0 8px 48px rgba(0,0,0,0.65), 0 2px 8px rgba(0,0,0,0.3)" }}
    >
      <style>{`
        @keyframes dropIn { from { opacity:0; transform:translateY(-6px) scale(0.98); } to { opacity:1; transform:translateY(0) scale(1); } }
      `}</style>

      {/* Header */}
      <div className="flex items-center justify-between px-[14px] py-[13px] border-b border-[#282930]">
        <div className="flex items-center gap-[8px]">
          <span className="text-[13px] font-semibold text-white">Notifications</span>
          {unread > 0 && (
            <span className="min-w-[18px] h-[18px] px-[5px] flex items-center justify-center text-[10px] font-bold text-white bg-[#2563eb] rounded-full">
              {unread}
            </span>
          )}
        </div>
        {unread > 0 && (
          <button
            onClick={onMarkAllRead}
            className="text-[11px] font-medium text-[#3b82f6] hover:text-[#60a5fa] transition-colors cursor-pointer"
          >
            Mark all read
          </button>
        )}
      </div>

      {/* List */}
      <div className="max-h-[380px] overflow-y-auto divide-y divide-[#282930]/50">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-[44px] px-[16px]">
            <div
              className="w-[52px] h-[52px] rounded-full flex items-center justify-center mb-[14px]"
              style={{ background: "#111215", border: "1px solid #212328" }}
            >
              <svg width={22} height={22} fill="none" viewBox="0 0 24 24" stroke="#3e4047" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <p className="text-[13px] font-semibold text-[#cdd0d6]">No notifications yet</p>
            <p className="text-[12px] text-[#545659] mt-[4px]">You're all caught up.</p>
          </div>
        ) : (
          notifications.map((n) => (
            <NotifItem key={n.id} notif={n} onClick={onNotifClick} />
          ))
        )}
      </div>

      {/* Footer */}
      {/* {notifications.length > 0 && (
        <div className="border-t border-[#282930] p-[8px]">
          <button
            type="button"
            className="w-full h-[34px] text-[12px] font-medium text-[#3b82f6] hover:text-[#60a5fa] hover:bg-[rgba(59,130,246,0.07)] rounded-[8px] transition-colors cursor-pointer"
          >
            View All Notifications
          </button>
        </div>
      )} */}
    </div>
  );
}

// ── Profile dropdown panel ─────────────────────────────────
function ProfilePanel({ onLogout, onClose, innerRef }) {
  return (
    <div
      ref={innerRef}
      className="bg-[#1c1d22] border border-[#282930] rounded-[14px] overflow-hidden"
      style={{ boxShadow: "0 8px 48px rgba(0,0,0,0.65), 0 2px 8px rgba(0,0,0,0.3)" }}
    >
      {/* User card */}
      <div className="px-[14px] py-[14px] border-b border-[#282930]">
        <div className="flex items-center gap-[11px]">
          <div
            className="w-[44px] h-[44px] rounded-[12px] flex items-center justify-center shrink-0 text-[14px] font-bold text-white"
            style={{ background: "linear-gradient(135deg, #1d4ed8, #3b82f6)" }}
          >
            {USER.initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold text-white truncate">{USER.name}</p>
            <p className="text-[11px] text-[#74757b] truncate mt-[1px]">{USER.email}</p>
            <span
              className="inline-block mt-[5px] text-[10px] font-semibold px-[7px] py-[2px] rounded-[4px]"
              style={{
                color: "#3b82f6",
                background: "rgba(37,99,235,0.1)",
                border: "1px solid rgba(37,99,235,0.2)",
              }}
            >
              {USER.role}
            </span>
          </div>
        </div>
      </div>

      {/* Menu items */}
      <div className="p-[6px]">
        <ProfileMenuItem
          onClose={onClose}
          href="/settings"
          label="Profile"
          icon={
            <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          }
        />
        <ProfileMenuItem
          onClose={onClose}
          href="/settings"
          label="Settings"
          icon={
            <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
        />
        <ProfileMenuItem
          onClose={onClose}
          href="#"
          label="Help Center"
          icon={
            <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />

        {/* Divider */}
        <div className="my-[4px] border-t border-[#282930]" />

        {/* Logout */}
        <button
          type="button"
          onClick={onLogout}
          className="w-full flex items-center gap-[9px] px-[10px] py-[8px] rounded-[8px] text-left text-[12px] font-medium text-[#ef4444] hover:bg-[rgba(239,68,68,0.07)] transition-colors cursor-pointer"
        >
          <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Log Out
        </button>
      </div>
    </div>
  );
}

// ── Profile menu item ──────────────────────────────────────
function ProfileMenuItem({ icon, label, href, onClose }) {
  const router = useRouter();
  const handleClick = () => {
    onClose();
    if (href !== "#") router.push(href);
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      className="w-full flex items-center gap-[9px] px-[10px] py-[8px] rounded-[8px] text-left text-[12px] font-normal text-[#9ea0a6] hover:text-white hover:bg-[rgba(255,255,255,0.04)] transition-colors cursor-pointer"
    >
      <span className="text-[#545659]">{icon}</span>
      {label}
    </button>
  );
}

// ── Logout confirmation modal ──────────────────────────────
function LogoutModal({ onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/65 backdrop-blur-[3px]" onClick={onClose} />
      <div
        className="relative w-[95vw] max-w-[340px] bg-[#1c1d22] border border-[#28292f] rounded-[16px] p-[24px] flex flex-col gap-[18px]"
        style={{
          boxShadow: "0 24px 80px rgba(0,0,0,0.7)",
          animation: "modalIn 0.2s ease-out forwards",
        }}
      >
        <style>{`@keyframes modalIn { from { opacity:0; transform:scale(0.95) translateY(6px); } to { opacity:1; transform:scale(1) translateY(0); } }`}</style>

        {/* Icon */}
        <div
          className="w-[46px] h-[46px] rounded-[12px] flex items-center justify-center"
          style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}
        >
          <svg width={20} height={20} fill="none" viewBox="0 0 24 24" stroke="#ef4444" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </div>

        <div>
          <h3 className="text-[15px] font-semibold text-white">Log Out</h3>
          <p className="text-[12px] text-[#74757b] mt-[6px] leading-[18px]">
            Are you sure you want to log out? You'll need to sign in again to access your account.
          </p>
        </div>

        <div className="flex items-center gap-[8px]">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 h-[36px] rounded-[8px] text-[12px] font-medium text-[#9ea0a6] bg-[#111215] border border-[#212328] hover:text-white hover:bg-[rgba(255,255,255,0.04)] transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 h-[36px] rounded-[8px] text-[12px] font-medium text-white bg-[#ef4444] hover:bg-[#dc2626] transition-colors cursor-pointer"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Toast ──────────────────────────────────────────────────
function Toast({ message, onDismiss }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 3200);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      className="fixed bottom-[24px] right-[24px] z-[300] flex items-center gap-[12px] px-[18px] py-[13px] bg-[#1c1d22] border border-[#212328] rounded-[12px]"
      style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.5)", animation: "toastIn 0.2s ease-out forwards" }}
    >
      <style>{`@keyframes toastIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }`}</style>
      <div
        className="w-[22px] h-[22px] rounded-full flex items-center justify-center shrink-0"
        style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.25)" }}
      >
        <svg width={11} height={11} fill="none" viewBox="0 0 24 24" stroke="#10b981" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <p className="text-[13px] text-white">{message}</p>
    </div>
  );
}

// ── Main Header ────────────────────────────────────────────
export default function Header({ onMenuClick }) {
  const router = useRouter();

  const [notifOpen, setNotifOpen]     = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [logoutOpen, setLogoutOpen]   = useState(false);
  const [toast, setToast]             = useState(null);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [notifStyle, setNotifStyle]   = useState({ top: 68, right: 12 });
  const [profileStyle, setProfileStyle] = useState({ top: 68, right: 12 });

  const notifBtnRef    = useRef(null);
  const profileBtnRef  = useRef(null);
  const notifPanelRef  = useRef(null);
  const profilePanelRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // ── Click outside to close ─────────────────────────────
  useEffect(() => {
    if (!notifOpen) return;
    const fn = (e) => {
      if (
        !notifBtnRef.current?.contains(e.target) &&
        !notifPanelRef.current?.contains(e.target)
      ) setNotifOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [notifOpen]);

  useEffect(() => {
    if (!profileOpen) return;
    const fn = (e) => {
      if (
        !profileBtnRef.current?.contains(e.target) &&
        !profilePanelRef.current?.contains(e.target)
      ) setProfileOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [profileOpen]);

  // ── ESC key ────────────────────────────────────────────
  useEffect(() => {
    const fn = (e) => {
      if (e.key !== "Escape") return;
      setNotifOpen(false);
      setProfileOpen(false);
      setLogoutOpen(false);
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, []);

  // ── Compute dropdown position from trigger rect ────────
  const computePos = (btnRef) => {
    if (!btnRef.current) return { top: 68, right: 12 };
    const r = btnRef.current.getBoundingClientRect();
    return {
      top: r.bottom + 8,
      right: Math.max(8, window.innerWidth - r.right),
    };
  };

  const handleBellClick = () => {
    const pos = computePos(notifBtnRef);
    setNotifStyle(pos);
    setNotifOpen((v) => !v);
    setProfileOpen(false);
  };

  const handleAvatarClick = () => {
    const pos = computePos(profileBtnRef);
    setProfileStyle(pos);
    setProfileOpen((v) => !v);
    setNotifOpen(false);
  };

  const handleMarkAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const handleNotifClick = (notif) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n))
    );
    setNotifOpen(false);
    router.push(notif.href);
  };

  const handleLogoutClick = () => {
    setProfileOpen(false);
    setLogoutOpen(true);
  };

  const handleLogoutConfirm = () => {
    setLogoutOpen(false);
    setToast("Successfully logged out");
    setTimeout(() => {
      localStorage.removeItem("autosystem_auth");
      router.push("/login");
    }, 1600);
  };

  return (
    <>
      {/* ── Header bar ── */}
      <div className="sticky top-0 z-20 bg-[rgba(18,17,18,.92)] backdrop-blur-sm h-[60px] px-4 md:px-8 border-b border-[#1e1e1e] flex items-center gap-[10px] pointer-events-none">

        {/* Hamburger — mobile only */}
        <button
          type="button"
          onClick={onMenuClick}
          className="flex items-center justify-center text-[#555] hover:text-[#9ea0a6] p-[4px] rounded-[6px] shrink-0 pointer-events-auto lg:hidden transition-colors"
          aria-label="Open navigation"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </button>

        <div className="flex-1" />

        {/* Bell icon */}
        <button
          ref={notifBtnRef}
          type="button"
          onClick={handleBellClick}
          className="relative flex items-center justify-center text-[#555] hover:text-[#9ea0a6] p-[7px] rounded-[8px] hover:bg-[rgba(255,255,255,0.05)] transition-colors cursor-pointer pointer-events-auto"
          aria-label="Notifications"
        >
          <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          {unreadCount > 0 && (
            <span
              className="absolute top-[5px] right-[5px] w-[8px] h-[8px] rounded-full"
              style={{ background: "#2563eb", border: "2px solid rgba(18,17,18,.92)" }}
            />
          )}
        </button>

        {/* Avatar + name */}
        <button
          ref={profileBtnRef}
          type="button"
          onClick={handleAvatarClick}
          className="flex items-center gap-[8px] px-[6px] py-[4px] rounded-[8px] hover:bg-[rgba(255,255,255,0.04)] transition-colors cursor-pointer pointer-events-auto"
          aria-label="Profile menu"
        >
          <div
            className="w-[30px] h-[30px] rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold text-white"
            style={{ background: "linear-gradient(135deg, #1d4ed8, #3b82f6)" }}
          >
            AL
          </div>
          <span className="hidden sm:block text-[#bfc1c7] text-[13px] font-medium whitespace-nowrap">
            Audrey Lay
          </span>
          <svg
            className="hidden sm:block text-[#454649] shrink-0"
            width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
      </div>

      {/* ── Notification dropdown — fixed, outside header stacking context ── */}
      {notifOpen && (
        <div
          className="fixed z-[150] w-[360px] max-w-[calc(100vw-20px)]"
          style={{ top: notifStyle.top, right: notifStyle.right, animation: "dropIn 0.18s ease-out forwards" }}
        >
          <style>{`@keyframes dropIn { from { opacity:0; transform:translateY(-6px) scale(0.98); } to { opacity:1; transform:translateY(0) scale(1); } }`}</style>
          <NotifPanel
            notifications={notifications}
            onMarkAllRead={handleMarkAllRead}
            onNotifClick={handleNotifClick}
            innerRef={notifPanelRef}
          />
        </div>
      )}

      {/* ── Profile dropdown — fixed, outside header stacking context ── */}
      {profileOpen && (
        <div
          className="fixed z-[150] w-[258px]"
          style={{ top: profileStyle.top, right: profileStyle.right, animation: "dropIn 0.18s ease-out forwards" }}
        >
          <ProfilePanel
            onLogout={handleLogoutClick}
            onClose={() => setProfileOpen(false)}
            innerRef={profilePanelRef}
          />
        </div>
      )}

      {/* ── Logout modal ── */}
      {logoutOpen && (
        <LogoutModal
          onClose={() => setLogoutOpen(false)}
          onConfirm={handleLogoutConfirm}
        />
      )}

      {/* ── Toast ── */}
      {toast && (
        <Toast key={toast} message={toast} onDismiss={() => setToast(null)} />
      )}
    </>
  );
}
