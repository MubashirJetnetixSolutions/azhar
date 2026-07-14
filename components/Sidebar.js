"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import CreateOrderModal from "./modals/CreateOrderModal";
import CreateReportModal from "./modals/CreateReportModal";
import CreateBankModal from "./modals/CreateBankModal";
import CreateInvoiceModal from "./modals/CreateInvoiceModal";

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
      <div className={`w-[22px] h-[22px] rounded-full flex items-center justify-center shrink-0 ${
        ok ? "bg-[rgba(16,185,129,0.15)] border border-[rgba(16,185,129,0.25)]"
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

const SIDEBAR_WIDTH = 258;

const navItems = [
  { section: "MENU" },
  { label: "Dashboard", href: "/dashboard", icon: "/icons/dashboard-icon.svg" },
  { label: "Orders", href: "/orders", badge: "26", icon: "/icons/order-icon.svg" },
  { label: "Invoices", href: "/invoices", icon: "/icons/invoice.svg" },
  { section: "Management" },
  { label: "Report Hub", href: "/report-hub", icon: "/icons/folder.svg" },
  { label: "Emails", href: "/emails", icon: "/icons/chat.svg" },
  { section: "OTHERS" },
  { label: "Settings", href: "/settings", icon: "/icons/cog.svg" },
  { label: "Banks", href: "/banks", icon: "/icons/bank-icon.svg" },
  { label: "Company", href: "/company", icon: "/icons/briefcase-icon.svg" },
];

const quickActions = [
  { label: "Create Order", action: "order", icon: "/icons/order-icon.svg" },
  { label: "Create Report", action: "report", icon: "/icons/file.svg" },
  { label: "Create Invoice", action: "invoice", icon: "/icons/invoice.svg" },
  { label: "Create Bank", action: "bank", icon: "/icons/bank-icon.svg" },
];

function NavIcon({ src, size = 18 }) {
  return (
    <img
      src={src}
      width={size}
      height={size}
      alt=""
      className="block shrink-0"
    />
  );
}

function QuickActionButton({ qa, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-[8px] p-[14px_8px] min-h-[72px] border border-[#262626] rounded-[12px] cursor-pointer bg-[#161616] hover:bg-[#1f1f1f] transition-colors duration-[120ms]"
    >
      <NavIcon src={qa.icon} size={22} />
      <span className="text-[#888888] text-[11px] font-normal leading-[14px] text-center">
        {qa.label}
      </span>
    </button>
  );
}

function NavLink({ item, isActive }) {
  return (
    <Link
      href={item.href}
      className={`flex items-center gap-[12px] min-h-[44px] px-[12px] rounded-[8px] mb-[4px] no-underline text-[14px] leading-[20px] transition-[background,box-shadow,color] duration-[120ms] ${
        isActive
          ? "bg-gradient-to-r from-[#3b82f6] to-[#2563eb] shadow-[0_0_14px_rgba(37,99,235,0.32)] text-white font-medium"
          : "bg-transparent text-[#999999] font-normal hover:bg-[rgba(255,255,255,0.04)]"
      }`}
    >
      <NavIcon src={item.icon} size={18} />
      <span className="flex-1">{item.label}</span>
      {item.badge && (
        <span
          className={`text-[11px] font-medium leading-[16px] py-[2px] px-[8px] rounded-[6px] text-white ${
            isActive ? "bg-[rgba(255,255,255,0.16)]" : "bg-[#1a1a1a]"
          }`}
        >
          {item.badge}
        </span>
      )}
    </Link>
  );
}

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const [orderOpen, setOrderOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [bankOpen, setBankOpen] = useState(false);
  const [invoiceOpen, setInvoiceOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Close mobile sidebar on route change
  useEffect(() => {
    onClose?.();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <aside className={`fixed left-0 top-0 h-screen w-[258px] bg-[#121112] border-r border-[#1f1f1f] flex flex-col z-40 box-border transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}>
        {/* Logo */}
        <div className="pt-[40px] pb-[28px] px-[20px] text-center shrink-0">
          <span className="text-white font-bold text-[20px] leading-[24px] tracking-[-0.01em]">
            Auto System
          </span>
        </div>

        {/* Quick Actions 2×2 */}
        <div className="grid grid-cols-2 gap-[8px] px-[17px] pb-[24px] shrink-0">
          {quickActions.map((qa) => (
            <QuickActionButton
              key={qa.label}
              qa={qa}
              onClick={() => {
                if (qa.action === "order") setOrderOpen(true);
                if (qa.action === "report") setReportOpen(true);
                if (qa.action === "bank") setBankOpen(true);
                if (qa.action === "invoice") setInvoiceOpen(true);
              }}
            />
          ))}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-[17px] pb-[24px]">
          {navItems.map((item, i) => {
            if (item.section) {
              const isFirst = i === 0;
              return (
                <p
                  key={`section-${item.section}`}
                  className={`text-[#545456] text-[11px] font-semibold leading-[16px] m-0 ${
                    item.section === "Management" ? "tracking-normal normal-case" : "tracking-[0.06em] uppercase"
                  } ${isFirst ? "pt-0 pr-1 pb-[10px] pl-1" : "pt-[24px] pr-1 pb-[10px] pl-1"}`}
                >
                  {item.section}
                </p>
              );
            }

            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return <NavLink key={item.href} item={item} isActive={isActive} />;
          })}
        </nav>
      </aside>

      <CreateOrderModal open={orderOpen} onClose={() => setOrderOpen(false)} />
      <CreateReportModal open={reportOpen} onClose={() => setReportOpen(false)} />
      <CreateBankModal open={bankOpen} onClose={() => setBankOpen(false)} />
      <CreateInvoiceModal
        open={invoiceOpen}
        onClose={() => setInvoiceOpen(false)}
        onSuccess={() => setToast({ type: "success", message: "Invoice created successfully.", id: Date.now() })}
      />
      {toast && (
        <Toast key={toast.id} type={toast.type} message={toast.message} onDismiss={() => setToast(null)} />
      )}
    </>
  );
}

export { SIDEBAR_WIDTH };
