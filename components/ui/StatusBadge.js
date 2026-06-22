const statusConfig = {
  Active:     "bg-[#14532d20] text-[#22c55e] border border-[#22c55e30]",
  Inactive:   "bg-[#7f1d1d20] text-[#ef4444] border border-[#ef444430]",
  Paid:       "bg-[#14532d20] text-[#22c55e] border border-[#22c55e30]",
  Unpaid:     "bg-[#78350f20] text-[#f97316] border border-[#f9731630]",
  "Bad Debt": "bg-[#7f1d1d20] text-[#ef4444] border border-[#ef444430]",
  Complete:   "bg-[#14532d20] text-[#22c55e] border border-[#22c55e30]",
  Online:     "bg-[#1e3a5f20] text-[#60a5fa] border border-[#60a5fa30]",
  Flagged:    "bg-[#7f1d1d20] text-[#ef4444] border border-[#ef444430]",
  New:        "bg-[#1e3a5f20] text-[#60a5fa] border border-[#60a5fa30]",
  Reuse:      "bg-[#14532d20] text-[#22c55e] border border-[#22c55e30]",
  Send:       "bg-[#78350f20] text-[#f97316] border border-[#f9731630]",
  Review:     "bg-[#4c1d9520] text-[#a78bfa] border border-[#a78bfa30]",
  Start:      "bg-[#1e3a5f20] text-[#60a5fa] border border-[#60a5fa30]",
  Recall:     "bg-[#7f1d1d20] text-[#ef4444] border border-[#ef444430]",
};

export default function StatusBadge({ status }) {
  const classes = statusConfig[status] || "bg-[#1a1a1a] text-[#888] border border-[#333]";
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${classes}`}
    >
      {status}
    </span>
  );
}
