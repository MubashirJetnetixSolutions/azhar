"use client";

import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { createPortal } from "react-dom";
import { format } from "date-fns";

// react-datepicker v9 uses @floating-ui/react internally, so the old
// popperProps / popperContainer / popperModifiers API has no effect on
// calendar positioning. We bypass the library's floating logic entirely:
// render the trigger ourselves, compute position via getBoundingClientRect,
// and portal an inline DatePicker to document.body.

const VARIANTS = {
  default: {
    bg: "#111215",
    border: "#212328",
    borderFocus: "#3e4047",
    text: "#cdd0d6",
    placeholder: "#545659",
    radius: "6px",
  },
  dark: {
    bg: "#1e1e1e",
    border: "#2a2a2a",
    borderFocus: "#3e3e3e",
    text: "#ffffff",
    placeholder: "#666666",
    radius: "8px",
  },
};

const SIZES = {
  sm: { height: 34, fontSize: 11, padLeft: 12, padRight: 34 },
  lg: { height: 40, fontSize: 13, padLeft: 14, padRight: 36 },
};

const CalIcon = () => (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ display: "block" }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ClearIcon = () => (
  <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ display: "block" }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default function AppDatePicker({
  size = "sm",
  variant = "default",
  placeholder = "Select date",
  dateFormat = "dd MMM yyyy",
  selected,
  onChange,
  isClearable = false,
  // Consume (and ignore) old popper props so callers don't need to change
  popperPlacement,
  popperProps,
  popperModifiers,
  ...props
}) {
  const [open, setOpen]  = useState(false);
  // pos uses `top` when opening below, `bottom` when opening above (fixed coords)
  const [pos, setPos]    = useState({ top: 0, bottom: undefined, left: 0 });
  const triggerRef       = useRef(null);
  const calendarRef      = useRef(null);

  const s = SIZES[size]    ?? SIZES.sm;
  const v = VARIANTS[variant] ?? VARIANTS.default;

  // Inline react-datepicker calendar: ~35px header + ~30px day-of-week + 6×30px rows = ~275px
  const CAL_H = 300;

  const computePos = () => {
    if (!triggerRef.current) return;
    const rect       = triggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const openAbove  = spaceBelow < CAL_H && spaceAbove > spaceBelow;
    setPos(openAbove
      ? { top: undefined, bottom: window.innerHeight - rect.top + 4, left: rect.left }
      : { top: rect.bottom + 4, bottom: undefined,                   left: rect.left }
    );
  };

  const openCal = () => {
    computePos();
    setOpen(true);
  };

  const toggleCal = () => (open ? setOpen(false) : openCal());

  // Keep position in sync when scrolling or resizing while open
  useEffect(() => {
    if (!open) return;
    const update = () => computePos();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (
        !triggerRef.current?.contains(e.target) &&
        !calendarRef.current?.contains(e.target)
      ) {
        setOpen(false);
      }
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

  const displayValue = selected ? format(selected, dateFormat) : "";

  return (
    <>
      {/* ── Trigger ── */}
      <div
        ref={triggerRef}
        onClick={toggleCal}
        style={{
          position: "relative",
          width: "100%",
          height: s.height,
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        {/* Text / placeholder */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            height: s.height,
            paddingLeft: s.padLeft,
            paddingRight: isClearable && selected ? s.padRight + 18 : s.padRight,
            background: v.bg,
            border: `1px solid ${open ? v.borderFocus : v.border}`,
            borderRadius: v.radius,
            color: displayValue ? v.text : v.placeholder,
            fontSize: s.fontSize,
            fontFamily: "inherit",
            boxSizing: "border-box",
            transition: "border-color 150ms ease",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          {displayValue || placeholder}
        </div>

        {/* Clear button */}
        {isClearable && selected && (
          <span
            onClick={(e) => { e.stopPropagation(); onChange(null); setOpen(false); }}
            style={{
              position: "absolute",
              right: 28,
              top: "50%",
              transform: "translateY(-50%)",
              color: v.placeholder,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              padding: "2px",
            }}
          >
            <ClearIcon />
          </span>
        )}

        {/* Calendar icon */}
        <span
          style={{
            position: "absolute",
            right: 10,
            top: "50%",
            transform: "translateY(-50%)",
            color: v.placeholder,
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
          }}
        >
          <CalIcon />
        </span>
      </div>

      {/* ── Inline calendar rendered in a portal at computed fixed position ── */}
      {open && typeof document !== "undefined" && createPortal(
        <div
          ref={calendarRef}
          style={{
            position: "fixed",
            top: pos.top,
            bottom: pos.bottom,
            left: pos.left,
            zIndex: 9999,
          }}
          // Prevent mousedown from bubbling to the outside-click handler
          onMouseDown={(e) => e.stopPropagation()}
        >
          <DatePicker
            inline
            selected={selected}
            onChange={(date) => {
              onChange(date);
              setOpen(false);
            }}
            {...props}
          />
        </div>,
        document.body
      )}
    </>
  );
}
