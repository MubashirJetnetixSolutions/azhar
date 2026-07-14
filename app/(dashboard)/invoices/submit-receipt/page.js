"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AppSelect from "@/components/ui/AppSelect";
import AppDatePicker from "@/components/ui/AppDatePicker";

// ── Mock data ────────────────────────────────────────────────────────────────

const CUSTOMER_OPTIONS = [
  { value: "meezan-arslan",  label: "Meezan Bank Ltd ARSLAN"    },
  { value: "ubl-gulshan",    label: "UBL Gulshan"                },
  { value: "mcb-lahore",     label: "MCB Lahore"                 },
  { value: "hbl-clifton",    label: "HBL Clifton"                },
];

const BANK_OPTIONS = [
  { value: "meezan", label: "Meezan Bank Ltd"       },
  { value: "ubl",    label: "United Bank Ltd"        },
  { value: "mcb",    label: "Muslim Commercial Bank" },
  { value: "hbl",    label: "Habib Bank Ltd"         },
  { value: "bahl",   label: "Bank Al Habib Ltd"      },
  { value: "abl",    label: "Allied Bank Ltd"        },
];

const MODE_OPTIONS = [
  { value: "online", label: "Online Transfer" },
  { value: "cheque", label: "Cheque"          },
  { value: "cash",   label: "Cash"            },
  { value: "draft",  label: "Bank Draft"      },
];

const WHT_OPTIONS = [
  { value: "sr-11",  label: "SR-11%" },
  { value: "sr-5",   label: "SR-5%"  },
  { value: "no-gst", label: "No GST" },
];

// Map raw invoice whtRate strings to select options
const whtStringToOption = (raw) => {
  if (raw === "sr-11%") return { value: "sr-11",  label: "SR-11%" };
  if (raw === "sr-5%")  return { value: "sr-5",   label: "SR-5%"  };
  if (raw === "no-gst") return { value: "no-gst", label: "No GST" };
  return null;
};

const ALL_INVOICES = [
  { id: "16842", date: "03/12/2025", dueDate: "03/12/2025", gst: "1,125.00",  originalAmount: "8,625.00",  whtRate: "sr-11%", wht: "948.75",   gstRate: "0.00", total: "8625.00"  },
  { id: "17075", date: "09/12/2025", dueDate: "09/12/2025", gst: "1,725.00",  originalAmount: "13,225.00", whtRate: "sr-11%", wht: "1,454.75", gstRate: "0.00", total: "13225.00" },
  { id: "17096", date: "09/12/2025", dueDate: "09/12/2025", gst: "1,125.00",  originalAmount: "8,625.00",  whtRate: "no-gst", wht: "0.00",     gstRate: "0.00", total: "0.00"     },
  { id: "17120", date: "12/12/2025", dueDate: "12/12/2025", gst: "850.00",    originalAmount: "6,500.00",  whtRate: "sr-11%", wht: "715.00",   gstRate: "0.00", total: "6500.00"  },
  { id: "17145", date: "15/12/2025", dueDate: "15/12/2025", gst: "2,100.00",  originalAmount: "16,100.00", whtRate: "sr-11%", wht: "1,771.00", gstRate: "0.00", total: "16100.00" },
  { id: "17188", date: "18/12/2025", dueDate: "18/12/2025", gst: "975.00",    originalAmount: "7,475.00",  whtRate: "sr-5%",  wht: "373.75",   gstRate: "0.00", total: "7475.00"  },
  { id: "17201", date: "20/12/2025", dueDate: "20/12/2025", gst: "1,350.00",  originalAmount: "10,350.00", whtRate: "sr-11%", wht: "1,138.50", gstRate: "0.00", total: "10350.00" },
  { id: "17234", date: "22/12/2025", dueDate: "22/12/2025", gst: "625.00",    originalAmount: "4,800.00",  whtRate: "no-gst", wht: "0.00",     gstRate: "0.00", total: "0.00"     },
  { id: "17267", date: "24/12/2025", dueDate: "24/12/2025", gst: "1,900.00",  originalAmount: "14,575.00", whtRate: "sr-11%", wht: "1,603.25", gstRate: "0.00", total: "14575.00" },
  { id: "17290", date: "26/12/2025", dueDate: "26/12/2025", gst: "780.00",    originalAmount: "5,985.00",  whtRate: "sr-5%",  wht: "299.25",   gstRate: "0.00", total: "5985.00"  },
  { id: "17312", date: "28/12/2025", dueDate: "28/12/2025", gst: "2,250.00",  originalAmount: "17,250.00", whtRate: "sr-11%", wht: "1,897.50", gstRate: "0.00", total: "17250.00" },
  { id: "17345", date: "30/12/2025", dueDate: "30/12/2025", gst: "1,050.00",  originalAmount: "8,050.00",  whtRate: "sr-11%", wht: "885.50",   gstRate: "0.00", total: "8050.00"  },
];

const PER_PAGE = 3;

// ── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n) {
  const num = parseFloat(String(n).replace(/,/g, ""));
  if (isNaN(num)) return "0.00";
  return num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Numbers-only input: allows digits, one decimal point, optional leading minus
function onNumericInput(setter) {
  return (e) => {
    const raw = e.target.value;
    if (raw === "" || /^\d*\.?\d*$/.test(raw)) setter(raw);
  };
}

// ── Custom Checkbox ───────────────────────────────────────────────────────────

function Checkbox({ checked, onChange, onClick }) {
  return (
    <label
      className="relative flex items-center cursor-pointer select-none"
      onClick={onClick}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
      />
      <div
        className={`
          w-[15px] h-[15px] rounded-[3px] border flex items-center justify-center
          transition-all duration-100
          ${checked
            ? "bg-[#2563eb] border-[#2563eb]"
            : "bg-[#1a1b1f] border-[#2d2f36] hover:border-[#4b5563]"}
        `}
      >
        {checked && (
          <svg width={9} height={7} fill="none" viewBox="0 0 9 7">
            <path
              d="M1 3.5L3.5 6L8 1"
              stroke="white"
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    </label>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function SubmitReceiptPage() {
  const router = useRouter();

  // Form state
  const [customer, setCustomer]               = useState({ value: "meezan-arslan", label: "Meezan Bank Ltd ARSLAN" });
  const [bank, setBank]                       = useState({ value: "meezan", label: "Meezan Bank Ltd" });
  const [mode, setMode]                       = useState(null);
  const [address, setAddress]                 = useState("");
  const [date, setDate]                       = useState(new Date("2026-06-24"));
  const [refNo, setRefNo]                     = useState("");
  const [whtRate, setWhtRate]                 = useState(null);
  const [unallocatedBalance, setUnallocated]  = useState("0.00");
  const [additionalWht, setAdditionalWht]     = useState("0.00");

  // Per-row WHT rate overrides: { [invoiceId]: option }
  const [rowWhtRates, setRowWhtRates] = useState({});

  const getRowWhtRate = (inv) =>
    rowWhtRates[inv.id] !== undefined
      ? rowWhtRates[inv.id]
      : whtStringToOption(inv.whtRate);

  const setRowWhtRate = (id, opt) =>
    setRowWhtRates((prev) => ({ ...prev, [id]: opt }));

  // Table state
  const [selected, setSelected] = useState(new Set());
  const [page, setPage]         = useState(1);
  const [search, setSearch]     = useState("");

  // Filtered + paginated invoices
  const filtered = ALL_INVOICES.filter((inv) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return Object.values(inv).some((v) => String(v).toLowerCase().includes(q));
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pageRows   = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const toggleRow = (id) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const allChecked = pageRows.length > 0 && pageRows.every((inv) => selected.has(inv.id));
  const toggleAll = () => {
    if (allChecked) {
      setSelected((prev) => { const n = new Set(prev); pageRows.forEach((inv) => n.delete(inv.id)); return n; });
    } else {
      setSelected((prev) => { const n = new Set(prev); pageRows.forEach((inv) => n.add(inv.id)); return n; });
    }
  };

  const selectedTotal = ALL_INVOICES
    .filter((inv) => selected.has(inv.id))
    .reduce((sum, inv) => sum + parseFloat(String(inv.total).replace(/,/g, "")), 0);

  // Amount dropdown — options from selected invoices, deduplicated by value
  const amountOptions = useMemo(() => {
    const seen = new Set();
    return ALL_INVOICES
      .filter((inv) => selected.has(inv.id))
      .map((inv) => ({ value: inv.total, label: inv.originalAmount }))
      .filter((opt) => !seen.has(opt.value) && seen.add(opt.value));
  }, [selected]);

  const [amount, setAmount] = useState("");

  // Auto-fill from selected invoices when there is exactly one distinct amount
  useEffect(() => {
    if (amountOptions.length === 1) {
      setAmount(amountOptions[0].label);
    } else if (amountOptions.length === 0) {
      setAmount("");
    }
  }, [amountOptions]);

  const pageButtons = Array.from({ length: Math.min(totalPages, 4) }, (_, i) => i + 1);

  return (
    <div className="space-y-[20px] py-4 px-4 md:py-5 md:px-7 pb-[130px] sm:pb-[90px]">

      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div>
          <h1 className="text-[22px] font-bold text-white tracking-[-0.019em]">
            Invoice Accounting
          </h1>
          <p className="text-[12px] text-[#74757b] mt-[4px]">
            Review and update bulk payment status for pending invoices.
          </p>
        </div>
        <button className="flex-none h-[34px] px-[14px] flex items-center gap-[7px] rounded-[6px] bg-[#111215] border border-[#212328] text-[#9ea0a6] hover:text-white text-[12px] font-medium transition-colors cursor-pointer whitespace-nowrap">
          <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export Statement
        </button>
      </div>

      {/* ── Form Card ── */}
      <div className="bg-[#151619] border border-[#212328] rounded-[12px] p-5 md:p-6">

        {/* Row 1: Customer | Bank | Mode */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-[10px] text-[#545659] uppercase tracking-[0.06em] font-medium mb-[6px]">
              Customer <span className="text-[#ef4444]">*</span>
            </label>
            {/* isSearchable enables type-to-filter */}
            <AppSelect
              variant="default"
              size="lg"
              isSearchable
              value={customer}
              onChange={setCustomer}
              options={CUSTOMER_OPTIONS}
            />
          </div>
          <div>
            <label className="block text-[10px] text-[#545659] uppercase tracking-[0.06em] font-medium mb-[6px]">
              Bank <span className="text-[#ef4444]">*</span>
            </label>
            <AppSelect
              variant="default"
              size="lg"
              isSearchable
              value={bank}
              onChange={setBank}
              options={BANK_OPTIONS}
            />
          </div>
          <div>
            <label className="block text-[10px] text-[#545659] uppercase tracking-[0.06em] font-medium mb-[6px]">
              Mode
            </label>
            <AppSelect
              variant="default"
              size="lg"
              value={mode}
              onChange={setMode}
              options={MODE_OPTIONS}
              placeholder="Select Mode"
            />
          </div>
        </div>

        {/* Rows 2–3: spanning textarea + right-side fields */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          {/* Mailing Address — spans 2 rows on sm+ */}
          <div className="sm:row-span-2 flex flex-col">
            <label className="block text-[10px] text-[#545659] uppercase tracking-[0.06em] font-medium mb-[6px]">
              Mailing Address
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="flex-1 min-h-[100px] px-[12px] py-[10px] rounded-[6px] text-[12px] outline-none bg-[#111215] border border-[#212328] text-[#9ea0a6] placeholder-[#545659] focus:border-[#3e4047] transition-colors resize-none leading-relaxed"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-[10px] text-[#545659] uppercase tracking-[0.06em] font-medium mb-[6px]">
              Date <span className="text-[#ef4444]">*</span>
            </label>
            <AppDatePicker
              variant="default"
              size="lg"
              selected={date}
              onChange={setDate}
              placeholder="DD/MM/YYYY"
              dateFormat="dd/MM/yyyy"
            />
          </div>

          {/* Ref. No. */}
          <div>
            <label className="block text-[10px] text-[#545659] uppercase tracking-[0.06em] font-medium mb-[6px]">
              Ref. No.
            </label>
            <input
              type="text"
              value={refNo}
              onChange={(e) => setRefNo(e.target.value)}
              placeholder="Ref. No."
              className="w-full h-[40px] px-[12px] rounded-[6px] text-[12px] outline-none bg-[#111215] border border-[#212328] text-white placeholder-[#545659] focus:border-[#3e4047] transition-colors"
            />
          </div>

          {/* Amount | WHT Rate | Unallocated Balance | Additional WHT */}
          <div className="col-span-1 sm:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-[10px] text-[#545659] uppercase tracking-[0.06em] font-medium mb-[6px]">
                Amount <span className="text-[#ef4444]">*</span>
              </label>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={selected.size === 0 ? "00.0" : `$${selectedTotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                readOnly
                className={`w-full h-[40px] px-[12px] rounded-[6px] text-right outline-none bg-[#111215] border border-[#212328] text-[#ffffff] focus:border-[#3e4047] transition-colors ${selected.size === 0 ? "text-[12px] placeholder-[#545659]" : "text-[16px] placeholder-[#ffffff]"}`}
              />
            </div>
            <div>
              <label className="block text-[10px] text-[#545659] uppercase tracking-[0.06em] font-medium mb-[6px]">
                WHT Rate
              </label>
              <AppSelect
                variant="default"
                size="lg"
                value={whtRate}
                onChange={setWhtRate}
                options={WHT_OPTIONS}
                placeholder="Select WHT Rate"
              />
            </div>
            <div>
              <label className="block text-[10px] text-[#545659] uppercase tracking-[0.06em] font-medium mb-[6px]">
                Unallocated Balance
              </label>
              <input
                type="text"
                inputMode="decimal"
                value={unallocatedBalance}
                onChange={onNumericInput(setUnallocated)}
                onFocus={(e) => { if (e.target.value === "0.00") setUnallocated(""); }}
                onBlur={(e)  => { if (e.target.value === "") setUnallocated("0.00"); }}
                className="w-full h-[40px] px-[12px] rounded-[6px] text-[12px] outline-none bg-[#111215] border border-[#212328] text-[#cdd0d6] text-right focus:border-[#3e4047] transition-colors"
              />
            </div>
            <div>
              <label className="block text-[10px] text-[#545659] uppercase tracking-[0.06em] font-medium mb-[6px]">
                Additional WHT
              </label>
              <input
                type="text"
                inputMode="decimal"
                value={additionalWht}
                onChange={onNumericInput(setAdditionalWht)}
                onFocus={(e) => { if (e.target.value === "0.00") setAdditionalWht(""); }}
                onBlur={(e)  => { if (e.target.value === "") setAdditionalWht("0.00"); }}
                className="w-full h-[40px] px-[12px] rounded-[6px] text-[12px] outline-none bg-[#111215] border border-[#212328] text-[#cdd0d6] text-right focus:border-[#3e4047] transition-colors"
              />
            </div>
          </div>

        </div>
      </div>

      {/* ── Outstanding Invoices ── */}
      <div className="bg-[#151619] border border-[#212328] rounded-[12px] overflow-hidden">

        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-[#212328]">
          <h2 className="text-[14px] font-bold text-white flex items-center gap-[8px]">
            Outstanding Invoices
            {customer?.label && (
              <span className="text-[#545659] font-normal text-[13px]">— {customer.label}</span>
            )}
          </h2>
          <div className="relative flex-none">
            <svg
              className="absolute left-[10px] top-1/2 -translate-y-1/2 pointer-events-none"
              width={11} height={11} fill="none" viewBox="0 0 24 24"
              stroke="#545659" strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Find Invoices"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="h-[32px] w-[180px] pl-[28px] pr-[10px] rounded-[6px] bg-[#111215] border border-[#212328] text-[#9ea0a6] text-[11px] outline-none focus:border-[#3e4047] transition-colors placeholder-[#545659]"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto scrolling-touch">
          <table className="w-full border-collapse min-w-[900px]">
            <thead className="bg-[#18191d] border-b border-[#212328]">
              <tr>
                <th className="pl-5 pr-2 py-[10px] w-[40px]">
                  <Checkbox checked={allChecked} onChange={toggleAll} onClick={(e) => e.stopPropagation()} />
                </th>
                {[
                  ["Date",            "text-left"  ],
                  ["Inv. No.",        "text-left"  ],
                  ["Due Date",        "text-left"  ],
                  ["GST",             "text-right" ],
                  ["Original Amount", "text-right" ],
                  ["WHT Rate",        "text-left"  ],
                  ["WHT",             "text-right" ],
                  ["GST Rate",        "text-right" ],
                  ["Total",           "text-right" ],
                ].map(([label, align]) => (
                  <th
                    key={label}
                    className={`px-3 py-[10px] ${align} text-[10px] font-medium text-[#545659] uppercase tracking-[0.05em] whitespace-nowrap`}
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#212328]/50">
              {pageRows.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-[32px] text-center text-[12px] text-[#545659]">
                    No invoices found.
                  </td>
                </tr>
              ) : (
                pageRows.map((inv) => {
                  const isSelected = selected.has(inv.id);
                  return (
                    <tr
                      key={inv.id}
                      onClick={() => toggleRow(inv.id)}
                      className={`h-[50px] cursor-pointer transition-colors duration-100 ${
                        isSelected
                          ? "bg-[rgba(37,99,235,0.07)]"
                          : "hover:bg-[rgba(255,255,255,0.015)]"
                      }`}
                    >
                      <td className="pl-5 pr-2">
                        <Checkbox
                          checked={isSelected}
                          onChange={() => toggleRow(inv.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </td>
                      <td className="px-3 text-[12px] text-[#9ea0a6]">{inv.date}</td>
                      <td className="px-3 text-[12px] text-[#2563eb] font-medium">{inv.id}</td>
                      <td className="px-3 text-[12px] text-[#9ea0a6]">{inv.dueDate}</td>
                      <td className="px-3 text-[12px] text-[#cdd0d6] text-right">{inv.gst}</td>
                      <td className="px-3 text-[12px] text-white font-semibold text-right">{inv.originalAmount}</td>
                      {/* WHT Rate — per-row select */}
                      <td className="px-3 py-[6px]" onClick={(e) => e.stopPropagation()}>
                        <AppSelect
                          variant="default"
                          size="xs"
                          value={getRowWhtRate(inv)}
                          onChange={(opt) => setRowWhtRate(inv.id, opt)}
                          options={WHT_OPTIONS}
                          menuPlacement="auto"
                        />
                      </td>
                      <td className="px-3 text-[12px] text-[#cdd0d6] text-right">{inv.wht}</td>
                      <td className="px-3 text-[12px] text-[#cdd0d6] text-right">{inv.gstRate}</td>
                      <td className="px-3 pr-5 text-[12px] text-white font-semibold text-right">
                        {fmt(inv.total)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table footer / pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-3 border-t border-[#212328]">
          <span className="text-[11px] text-[#74757b]">
            Showing {filtered.length === 0 ? "0" : `${(page - 1) * PER_PAGE + 1}–${Math.min(page * PER_PAGE, filtered.length)}`} of {filtered.length} invoices
          </span>
          <div className="flex items-center gap-[4px]">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="h-[28px] px-[10px] text-[11px] font-medium rounded-[6px] border border-[#212328] bg-[#111215] text-[#545659] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            {pageButtons.map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`w-[28px] h-[28px] text-[11px] font-medium rounded-[6px] border transition-colors ${
                  page === n
                    ? "bg-[#2563eb] border-[#2563eb] text-white"
                    : "border-[#212328] bg-[#111215] text-[#545659] hover:text-white"
                }`}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="h-[28px] px-[10px] text-[11px] font-medium rounded-[6px] border border-[#212328] bg-[#111215] text-[#545659] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* ── Sticky Bottom Action Bar ── */}
      <div className="fixed bottom-0 left-0 lg:left-[258px] right-0 z-30 bg-[#0f1011] border-t border-[#212328]">
        <div className="flex items-center justify-between flex-wrap gap-x-[16px] gap-y-[10px] px-5 md:px-7 py-[14px]">
          <div className="flex items-center gap-[16px] md:gap-[24px]">
            <div>
              <p className="text-[9px] text-[#545659] uppercase tracking-[0.08em] font-semibold leading-none">
                Invoices Selected
              </p>
              <p className="text-[15px] font-bold text-white mt-[4px] leading-none">
                {selected.size} items
              </p>
            </div>
            <div className="w-px h-[32px] bg-[#212328]" />
            <div>
              <p className="text-[9px] text-[#545659] uppercase tracking-[0.08em] font-semibold leading-none">
                Total Amount
              </p>
              <p className="text-[15px] font-bold text-white mt-[4px] leading-none">
                ${selectedTotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-[10px]">
            <button
              onClick={() => router.back()}
              className="h-[34px] px-[16px] rounded-[6px] text-[12px] font-medium text-[#9ea0a6] hover:text-white border border-[#212328] bg-[#111215] hover:border-[#3e4047] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              disabled={selected.size === 0}
              className="h-[34px] px-[16px] rounded-[6px] text-[12px] font-medium text-white bg-[#2563eb] hover:bg-[#1d4ed8] disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer whitespace-nowrap"
            >
              Mark as Paid &amp; Update
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
