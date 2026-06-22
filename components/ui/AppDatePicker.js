"use client";

import { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";

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
  <svg
    width="14"
    height="14"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
    style={{ display: "block" }}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

// forwardRef so react-datepicker can attach its own ref
const PickerInput = forwardRef(function PickerInput(
  { value, onClick, placeholder, size, variant, isOpen },
  ref
) {
  const s = SIZES[size] ?? SIZES.sm;
  const v = VARIANTS[variant] ?? VARIANTS.default;
  const borderColor = isOpen ? v.borderFocus : v.border;

  return (
    <div
      ref={ref}
      style={{ position: "relative", width: "100%", height: s.height }}
      onClick={onClick}
    >
      <input
        readOnly
        value={value || ""}
        placeholder={placeholder}
        style={{
          display: "block",
          width: "100%",
          height: s.height,
          paddingLeft: s.padLeft,
          paddingRight: s.padRight,
          background: v.bg,
          border: `1px solid ${borderColor}`,
          borderRadius: v.radius,
          color: value ? v.text : v.placeholder,
          fontSize: s.fontSize,
          fontFamily: "inherit",
          outline: "none",
          cursor: "pointer",
          boxSizing: "border-box",
          transition: "border-color 150ms ease",
        }}
      />
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
  );
});

export default function AppDatePicker({
  size = "sm",
  variant = "default",
  placeholder = "Select date",
  dateFormat = "dd MMM yyyy",
  selected,
  onChange,
  isClearable = false,
  ...props
}) {
  const [open, setOpen] = useState(false);

  return (
    <DatePicker
      selected={selected}
      onChange={onChange}
      customInput={
        <PickerInput
          size={size}
          variant={variant}
          placeholder={placeholder}
          isOpen={open}
        />
      }
      dateFormat={dateFormat}
      isClearable={isClearable}
      onCalendarOpen={() => setOpen(true)}
      onCalendarClose={() => setOpen(false)}
      popperPlacement="bottom-start"
      popperModifiers={[{ name: "offset", options: { offset: [0, 4] } }]}
      {...props}
    />
  );
}
