"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import CreateOrderModal from "./modals/CreateOrderModal";
import CreateReportModal from "./modals/CreateReportModal";

const navItems = [
  { section: "MENU" },
  { label: "Dashboard", href: "/dashboard", icon: <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg> },
  { label: "Orders", href: "/orders", badge: "28", icon: <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg> },
  { label: "Invoices", href: "/invoices", icon: <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg> },
  { section: "Management" },
  { label: "Report Hub", href: "/report-hub", icon: <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg> },
  { label: "Emails", href: "/emails", icon: <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg> },
  { section: "OTHERS" },
  { label: "Settings", href: "/settings", icon: <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg> },
  { label: "Banks", href: "/banks", icon: <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"/></svg> },
  { label: "Company", href: "/company", icon: <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg> },
];

const quickActions = [
  { label: "Create Order", action: "order", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg> },
  { label: "Create Report", action: "report", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg> },
  { label: "Create Invoice", action: null, icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg> },
  { label: "Create Bank", action: null, icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4"/></svg> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [orderOpen, setOrderOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);

  return (
    <>
      <aside style={{
        position: "fixed", left: 0, top: 0, height: "100%", width: "210px",
        backgroundColor: "#111111",
        borderRight: "1px solid #1c1c1c",
        display: "flex", flexDirection: "column", zIndex: 40,
      }}>
        {/* Logo */}
        <div style={{ padding: "16px 18px", borderBottom: "1px solid #1c1c1c" }}>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: "15px", letterSpacing: "-0.01em" }}>Auto System</span>
        </div>

        {/* Quick Actions 2×2 */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: "1px solid #1c1c1c" }}>
          {quickActions.map((qa) => (
            <button key={qa.label} onClick={() => {
              if (qa.action === "order") setOrderOpen(true);
              if (qa.action === "report") setReportOpen(true);
            }} style={{
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              gap: "5px", padding: "12px 6px",
              backgroundColor: "transparent", border: "none",
              borderRight: qa.label === "Create Order" || qa.label === "Create Invoice" ? "1px solid #1c1c1c" : "none",
              borderBottom: qa.label === "Create Order" || qa.label === "Create Report" ? "1px solid #1c1c1c" : "none",
              cursor: "pointer",
            }}>
              <span style={{ color: "#555" }}>{qa.icon}</span>
              <span style={{ color: "#4a4a4a", fontSize: "9px", textAlign: "center", lineHeight: 1.2 }}>{qa.label}</span>
            </button>
          ))}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, overflowY: "auto", padding: "8px 10px" }}>
          {navItems.map((item, i) => {
            if (item.section) {
              return (
                <p key={i} style={{ color: "#2e2e2e", fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", padding: "12px 8px 5px", textTransform: "uppercase" }}>
                  {item.section}
                </p>
              );
            }
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href} style={{
                display: "flex", alignItems: "center", gap: "9px",
                padding: "8px 10px", borderRadius: "7px", marginBottom: "1px",
                textDecoration: "none",
                backgroundColor: isActive ? "#3b82f6" : "transparent",
                color: isActive ? "#fff" : "#5a5a5a",
                fontSize: "13px", fontWeight: isActive ? 500 : 400,
              }}>
                <span style={{ color: isActive ? "#fff" : "#444", flexShrink: 0 }}>{item.icon}</span>
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge && (
                  <span style={{
                    fontSize: "10px", fontWeight: 600, padding: "1px 5px", borderRadius: "4px",
                    backgroundColor: isActive ? "rgba(255,255,255,0.2)" : "#1e1e1e",
                    color: isActive ? "#fff" : "#555",
                  }}>{item.badge}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      <CreateOrderModal open={orderOpen} onClose={() => setOrderOpen(false)} />
      <CreateReportModal open={reportOpen} onClose={() => setReportOpen(false)} />
    </>
  );
}
