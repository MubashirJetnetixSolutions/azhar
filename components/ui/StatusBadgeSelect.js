"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// Same portal pattern as OrderStatusSelect and AppDatePicker:
// renders the menu in document.body at a computed fixed position so it is
// never clipped by table overflow, z-index stacking, or row-level click handlers.

const STATUS_CONFIG = {
  Paid:   { color: "#22c55e", bg: "rgba(34,197,94,0.08)",  border: "rgba(34,197,94,0.2)"  },
  Unpaid: { color: "#ef4444", bg: "rgba(239,68,68,0.08)",  border: "rgba(239,68,68,0.2)"  },
};

const OPTIONS = ["Paid", "Unpaid"];

export default function StatusBadgeSelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos]   = useState({ top: 0, left: 0 });
  const triggerRef      = useRef(null);
  const menuRef         = useRef(null);

  const cfg = STATUS_CONFIG[value] ?? STATUS_CONFIG.Paid;

  const toggle = (e) => {
    e.stopPropagation(); // prevent any parent row click from firing
    if (open) { setOpen(false); return; }
    const rect = triggerRef.current.getBoundingClientRect();
    setPos({ top: rect.bottom + 4, left: rect.left });
    setOpen(true);
  };

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (
        !triggerRef.current?.contains(e.target) &&
        !menuRef.current?.contains(e.target)
      ) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  return (
    <>
      {/* Badge trigger */}
      <div
        ref={triggerRef}
        onClick={toggle}
        style={{
          display: "inline-flex", alignItems: "center", gap: 4,
          fontSize: 10, fontWeight: 500, lineHeight: 1,
          borderRadius: 4, padding: "4px 6px 4px 8px",
          border: `1px solid ${cfg.border}`, background: cfg.bg, color: cfg.color,
          cursor: "pointer", userSelect: "none", whiteSpace: "nowrap",
          transition: "opacity 100ms",
        }}
      >
        {value}
        <svg width="8" height="8" fill="none" viewBox="0 0 24 24" stroke={cfg.color} strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </div>

      {/* Options menu portalled to document.body */}
      {open && typeof document !== "undefined" && createPortal(
        <div
          ref={menuRef}
          onMouseDown={(e) => e.stopPropagation()}
          style={{
            position: "fixed",
            top: pos.top,
            left: pos.left,
            zIndex: 9999,
            background: "#111215",
            border: "1px solid #212328",
            borderRadius: 8,
            boxShadow: "0 8px 24px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.03)",
            minWidth: 100,
            padding: "4px",
            overflow: "hidden",
          }}
        >
          {OPTIONS.map((status) => {
            const isSelected = status === value;
            return (
              <div
                key={status}
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(status);
                  setOpen(false);
                }}
                style={{
                  padding: "7px 10px",
                  fontSize: 11,
                  borderRadius: 6,
                  cursor: "pointer",
                  color: "#cdd0d6",
                  background: isSelected ? "rgba(37,99,235,0.12)" : "transparent",
                  transition: "background 80ms",
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) e.currentTarget.style.background = "transparent";
                }}
              >
                {status}
              </div>
            );
          })}
        </div>,
        document.body
      )}
    </>
  );
}
