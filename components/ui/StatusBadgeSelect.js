"use client";

import Select from "react-select";

// Custom Control renders the colored pill badge as the trigger (no standard input).
function BadgeControl({ innerRef, innerProps, selectProps }) {
  const val    = selectProps.value?.value ?? "";
  const isPaid = val === "Paid";
  const color  = isPaid ? "#22c55e"              : "#ef4444";
  const bg     = isPaid ? "rgba(34,197,94,0.08)" : "rgba(239,68,68,0.08)";
  const border = isPaid ? "rgba(34,197,94,0.2)"  : "rgba(239,68,68,0.2)";

  return (
    <div
      ref={innerRef}
      {...innerProps}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        fontSize: 10,
        fontWeight: 500,
        lineHeight: 1,
        borderRadius: 4,
        padding: "4px 6px 4px 8px",
        border: `1px solid ${border}`,
        background: bg,
        color: color,
        cursor: "pointer",
        userSelect: "none",
        whiteSpace: "nowrap",
        transition: "opacity 100ms",
      }}
    >
      {val}
      <svg
        width="8"
        height="8"
        fill="none"
        viewBox="0 0 24 24"
        stroke={color}
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
      </svg>
    </div>
  );
}

const STYLES = {
  container:           (b) => ({ ...b, display: "inline-flex" }),
  control:             ()  => ({}),
  valueContainer:      ()  => ({ display: "none" }),
  indicatorsContainer: ()  => ({ display: "none" }),
  indicatorSeparator:  ()  => ({ display: "none" }),
  menu: (b) => ({
    ...b,
    background: "#111215",
    border: "1px solid #212328",
    borderRadius: 8,
    boxShadow: "0 8px 24px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.03)",
    overflow: "hidden",
    minWidth: 100,
    marginTop: 4,
    zIndex: 9999,
  }),
  menuPortal: (b) => ({ ...b, zIndex: 9999 }),
  menuList: (b) => ({ ...b, padding: "4px" }),
  option: (b, state) => ({
    ...b,
    background: state.isSelected
      ? "rgba(37,99,235,0.12)"
      : state.isFocused
      ? "rgba(255,255,255,0.04)"
      : "transparent",
    color: "#cdd0d6",
    fontSize: 11,
    borderRadius: 6,
    padding: "6px 10px",
    cursor: "pointer",
    "&:active": { background: "rgba(255,255,255,0.04)" },
  }),
};

const OPTIONS = [
  { value: "Paid",   label: "Paid"   },
  { value: "Unpaid", label: "Unpaid" },
];

export default function StatusBadgeSelect({ value, onChange }) {
  return (
    <Select
      value={{ value, label: value }}
      onChange={(opt) => onChange(opt?.value ?? value)}
      options={OPTIONS}
      isSearchable={false}
      components={{ Control: BadgeControl }}
      styles={STYLES}
      menuPortalTarget={typeof document !== "undefined" ? document.body : null}
    />
  );
}
