const statusConfig = {
  Active: { bg: "#14532d20", color: "#22c55e", border: "#22c55e30" },
  Inactive: { bg: "#7f1d1d20", color: "#ef4444", border: "#ef444430" },
  Paid: { bg: "#14532d20", color: "#22c55e", border: "#22c55e30" },
  Unpaid: { bg: "#78350f20", color: "#f97316", border: "#f9731630" },
  "Bad Debt": { bg: "#7f1d1d20", color: "#ef4444", border: "#ef444430" },
  Complete: { bg: "#14532d20", color: "#22c55e", border: "#22c55e30" },
  Online: { bg: "#1e3a5f20", color: "#60a5fa", border: "#60a5fa30" },
  Flagged: { bg: "#7f1d1d20", color: "#ef4444", border: "#ef444430" },
  New: { bg: "#1e3a5f20", color: "#60a5fa", border: "#60a5fa30" },
  Reuse: { bg: "#14532d20", color: "#22c55e", border: "#22c55e30" },
  Send: { bg: "#78350f20", color: "#f97316", border: "#f9731630" },
  Review: { bg: "#4c1d9520", color: "#a78bfa", border: "#a78bfa30" },
  Start: { bg: "#1e3a5f20", color: "#60a5fa", border: "#60a5fa30" },
  Recall: { bg: "#7f1d1d20", color: "#ef4444", border: "#ef444430" },
};

export default function StatusBadge({ status }) {
  const config = statusConfig[status] || { bg: "#1a1a1a", color: "#888", border: "#333" };
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
      style={{ backgroundColor: config.bg, color: config.color, border: `1px solid ${config.border}` }}
    >
      {status}
    </span>
  );
}
