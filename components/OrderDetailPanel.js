export default function OrderDetailPanel({ order, onClose }) {
  const checks = [
    { label: "Bank Availability", status: "Verified", color: "#22c55e" },
    { label: "UBO Screening", status: "Verified", color: "#22c55e" },
    { label: "Financial Review", status: "In Progress", color: "#f97316" },
    { label: "Sanctions Check", status: "Pending", color: "#666" },
  ];

  return (
    <div className="w-[420px] shrink-0 rounded-xl overflow-hidden" style={{ backgroundColor: "#1a1a1a", border: "1px solid #1e1e1e" }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid #1e1e1e" }}>
        <div className="flex items-center gap-2 text-xs" style={{ color: "#666" }}>
          <span>Orders</span>
          <span>/</span>
          <span className="text-white">{order.company}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-0.5 rounded text-orange-400" style={{ backgroundColor: "#78350f20", border: "1px solid #f9731630" }}>Flagged</span>
          <button className="text-xs px-3 py-1 rounded-lg text-white" style={{ backgroundColor: "#1e1e1e", border: "1px solid #262626" }}>View Email</button>
          <button className="text-xs px-3 py-1 rounded-lg" style={{ backgroundColor: "#1e1e1e", border: "1px solid #262626", color: "#888" }}>Edit</button>
          <button onClick={onClose} className="text-gray-600 hover:text-white ml-1">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 180px)" }}>
        {/* Verification Status */}
        <div className="p-4" style={{ borderBottom: "1px solid #1e1e1e" }}>
          <h3 className="text-sm font-semibold text-white mb-3">Verification Status</h3>
          <div className="grid grid-cols-2 gap-2">
            {checks.map((c, i) => (
              <div key={i} className="flex items-start gap-2 p-2 rounded-lg" style={{ backgroundColor: "#111" }}>
                <div style={{ width: "14px", height: "14px", borderRadius: "50%", backgroundColor: c.color === "#22c55e" ? "rgba(34,197,94,0.15)" : c.color === "#f97316" ? "rgba(249,115,22,0.15)" : "#1e1e1e", border: `1px solid ${c.color === "#22c55e" ? "rgba(34,197,94,0.4)" : c.color === "#f97316" ? "rgba(249,115,22,0.4)" : "#2a2a2a"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>
                  {c.color === "#22c55e" && (
                    <svg width="8" height="8" fill="none" viewBox="0 0 24 24" stroke="#22c55e" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="text-[10px]" style={{ color: "#666" }}>{c.label}</p>
                  <p className="text-[10px] font-medium" style={{ color: c.color }}>{c.status}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-3 w-full py-2 rounded-lg text-xs font-medium text-white" style={{ backgroundColor: "#3b82f6" }}>
            Pursue Report
          </button>
        </div>

        {/* Company Profile */}
        <div className="p-4" style={{ borderBottom: "1px solid #1e1e1e" }}>
          <h3 className="text-sm font-semibold text-white mb-3">Company Profile</h3>
          <p className="text-[10px] mb-3" style={{ color: "#555" }}>Principal requested entity details</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
            {[
              ["Company Name", "Shenzhen Hua Yi Trading Co."],
              ["Country", "Guangdong, CN"],
              ["QCC", "Registry Source"],
              ["9144-0300-MA5E", "Registration No."],
            ].map(([v, l], i) => (
              <div key={i}>
                <p style={{ color: "#555" }}>{i % 2 === 0 ? l : "Country"}</p>
                <p className="text-white font-medium">{v}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 p-2 rounded-lg" style={{ backgroundColor: "#111" }}>
            <p className="text-[10px]" style={{ color: "#555" }}>Registered Address</p>
            <p className="text-xs text-white mt-0.5">Room 2105, Block B, Futian District, Shenzhen, Guangdong 518000, China</p>
          </div>
        </div>

        {/* Order Info */}
        <div className="p-4" style={{ borderBottom: "1px solid #1e1e1e" }}>
          <h3 className="text-sm font-semibold text-white mb-3">Order Info</h3>
          <div className="space-y-2 text-xs">
            {[
              ["LC-PN-0000", "LC Ref."],
              ["United Bank Limited", "Bank"],
              ["12 Jun 2024", "Date"],
              [order.assignedTo || "Azhar Khan", "Inquired by"],
              ["Email Index", "Invoice"],
            ].map(([v, l]) => (
              <div key={l} className="flex justify-between">
                <span style={{ color: "#555" }}>{l}</span>
                <span className="text-white">{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Financials */}
        <div className="p-4" style={{ borderBottom: "1px solid #1e1e1e" }}>
          <h3 className="text-sm font-semibold text-white mb-1">Financials</h3>
          <p className="text-[10px] mb-3" style={{ color: "#555" }}>FY2024 reported figures</p>
          <div className="grid grid-cols-3 gap-2">
            {[["$12.4M","Revenue"],["$8.1M","Assets"],["$1.9M","Net Profit"],["$3.0M","Capital"],["142","Employees"],["11","Years Active"]].map(([v,l]) => (
              <div key={l} className="p-2.5 rounded-lg" style={{ backgroundColor: "#111" }}>
                <p className="text-xs font-bold text-white">{v}</p>
                <p className="text-[10px] mt-0.5" style={{ color: "#555" }}>{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Shareholders */}
        <div className="p-4">
          <h3 className="text-sm font-semibold text-white mb-1">Shareholders</h3>
          <p className="text-[10px] mb-3" style={{ color: "#555" }}>Each shareholders percentage of shares</p>
          <div className="grid grid-cols-3 gap-2">
            {[["Li Wei","CEO"],["Li Wei","CEO"],["Zhang Hui","Shareholder"],["Zhang Hui","Shareholder"],["Chen Feng","Shareholder"],["Chen Feng","Shareholder"]].map(([n,r],i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded-lg" style={{ backgroundColor: "#111" }}>
                <div>
                  <p className="text-xs text-white">{n}</p>
                  <p className="text-[10px]" style={{ color: "#555" }}>{r}</p>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded text-white" style={{ backgroundColor: "#2563eb" }}>16.6%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
