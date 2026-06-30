"use client";

import Select from "react-select";

// ── Colour variants ──────────────────────────────────────────────────────────
const VARIANTS = {
  default: {
    bg: "#111215",
    border: "#212328",
    borderHover: "#3e4047",
    borderFocus: "#3e4047",
    text: "#cdd0d6",
    placeholder: "#545659",
    menuBg: "#111215",
    menuBorder: "#212328",
    optionHoverBg: "rgba(255,255,255,0.04)",
    optionSelectedBg: "rgba(37,99,235,0.12)",
    radius: "6px",
  },
  dark: {
    bg: "#1e1e1e",
    border: "#2a2a2a",
    borderHover: "#3e3e3e",
    borderFocus: "#3e3e3e",
    text: "#ffffff",
    placeholder: "#666666",
    menuBg: "#1e1e1e",
    menuBorder: "#2a2a2a",
    optionHoverBg: "rgba(255,255,255,0.06)",
    optionSelectedBg: "rgba(37,99,235,0.15)",
    radius: "8px",
  },
  dash: {
    bg: "#1a1a1a",
    border: "#252525",
    borderHover: "#3a3a3a",
    borderFocus: "#3a3a3a",
    text: "#888888",
    placeholder: "#666666",
    menuBg: "#1a1a1a",
    menuBorder: "#252525",
    optionHoverBg: "rgba(255,255,255,0.05)",
    optionSelectedBg: "rgba(37,99,235,0.12)",
    radius: "8px",
  },
};

// ── Size presets ─────────────────────────────────────────────────────────────
const SIZES = {
  xs: { minHeight: 28, fontSize: 11, padX: 8,  iconSize: 10 },
  sm: { minHeight: 32, fontSize: 11, padX: 10, iconSize: 10 },
  md: { minHeight: 34, fontSize: 11, padX: 10, iconSize: 10 },
  lg: { minHeight: 40, fontSize: 13, padX: 12, iconSize: 14 },
};

function buildStyles(v, s, isMulti = false) {
  return {
    control: (base, state) => ({
      ...base,
      minHeight: s.minHeight,
      height: isMulti ? "auto" : s.minHeight,
      background: v.bg,
      border: `1px solid ${state.isFocused ? v.borderFocus : v.border}`,
      borderRadius: v.radius,
      boxShadow: "none",
      cursor: "pointer",
      transition: "border-color 150ms ease",
      "&:hover": { borderColor: v.borderHover },
    }),
    valueContainer: (base) => ({
      ...base,
      minHeight: s.minHeight,
      height: isMulti ? "auto" : s.minHeight,
      padding: isMulti ? `4px ${s.padX}px` : `0 ${s.padX}px`,
      flexWrap: isMulti ? "wrap" : "nowrap",
      gap: isMulti ? "2px" : 0,
    }),
    singleValue: (base) => ({
      ...base,
      color: v.text,
      fontSize: s.fontSize,
      lineHeight: 1,
      margin: 0,
    }),
    placeholder: (base) => ({
      ...base,
      color: v.placeholder,
      fontSize: s.fontSize,
      lineHeight: 1,
      margin: 0,
    }),
    input: (base) => ({
      ...base,
      color: v.text,
      fontSize: s.fontSize,
      margin: 0,
      padding: 0,
    }),
    indicatorsContainer: (base) => ({
      ...base,
      height: s.minHeight,
      alignSelf: isMulti ? "flex-start" : "auto",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: v.placeholder,
      padding: `0 ${s.padX - 2}px`,
      "&:hover": { color: v.placeholder },
      "& svg": { width: s.iconSize, height: s.iconSize },
    }),
    clearIndicator: (base) => ({
      ...base,
      color: v.placeholder,
      padding: "0 4px",
      cursor: "pointer",
      "&:hover": { color: "#aaaaaa" },
    }),
    indicatorSeparator: () => ({ display: "none" }),
    menu: (base) => ({
      ...base,
      background: v.menuBg,
      border: `1px solid ${v.menuBorder}`,
      borderRadius: "8px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.03)",
      overflow: "hidden",
      zIndex: 9999,
      marginTop: 4,
      marginBottom: 4,
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    menuList: (base) => ({
      ...base,
      padding: "4px",
      maxHeight: 220,
    }),
    option: (base, state) => ({
      ...base,
      background: state.isSelected
        ? v.optionSelectedBg
        : state.isFocused
        ? v.optionHoverBg
        : "transparent",
      color: v.text,
      fontSize: s.fontSize,
      borderRadius: "6px",
      padding: `6px ${s.padX}px`,
      cursor: "pointer",
      "&:active": { background: v.optionHoverBg },
    }),
    noOptionsMessage: (base) => ({
      ...base,
      color: v.placeholder,
      fontSize: s.fontSize,
      padding: "8px 12px",
    }),
    loadingMessage: (base) => ({
      ...base,
      color: v.placeholder,
      fontSize: s.fontSize,
      padding: "8px 12px",
    }),
    multiValue: (base) => ({
      ...base,
      background: "rgba(37,99,235,0.15)",
      borderRadius: "4px",
      margin: "1px 2px",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: v.text,
      fontSize: Math.max(s.fontSize - 1, 10),
      padding: "2px 6px",
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: v.placeholder,
      borderRadius: "0 4px 4px 0",
      "&:hover": { background: "rgba(239,68,68,0.15)", color: "#ef4444" },
    }),
    groupHeading: (base) => ({
      ...base,
      color: v.placeholder,
      fontSize: s.fontSize - 1,
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      padding: "4px 12px 2px",
    }),
  };
}

export default function AppSelect({
  variant = "default",
  size = "md",
  isSearchable = false,
  isClearable = false,
  isMulti = false,
  menuPlacement = "auto",
  // Sync with maxHeight in menuList styles — react-select's auto-flip calculation
  // uses maxMenuHeight to decide if there's enough space, so this must match the
  // actual rendered CSS limit (220px) rather than react-select's 300px default.
  maxMenuHeight = 220,
  ...props
}) {
  const v = VARIANTS[variant] ?? VARIANTS.default;
  const s = SIZES[size] ?? SIZES.md;

  return (
    <Select
      styles={buildStyles(v, s, isMulti)}
      isSearchable={isSearchable}
      isClearable={isClearable}
      isMulti={isMulti}
      menuPlacement={menuPlacement}
      maxMenuHeight={maxMenuHeight}
      menuPortalTarget={typeof document !== "undefined" ? document.body : null}
      classNamePrefix="appsel"
      {...props}
    />
  );
}
