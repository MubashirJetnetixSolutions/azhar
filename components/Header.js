export default function Header() {
  return (
    <header style={{
      position: "fixed", top: 0, left: "210px", right: 0, height: "56px", zIndex: 30,
      backgroundColor: "#111111",
      borderBottom: "1px solid #1c1c1c",
      display: "flex", alignItems: "center", justifyContent: "flex-end",
      padding: "0 24px", gap: "14px",
    }}>
      {/* Bell */}
      <button style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", cursor: "pointer", color: "#555", padding: "4px" }}>
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      </button>

      {/* User */}
      <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
        <div style={{
          width: "30px", height: "30px", borderRadius: "50%",
          backgroundColor: "#2a2a2a", border: "1px solid #333",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          overflow: "hidden",
        }}>
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#666" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <span style={{ color: "#ccc", fontSize: "13px", fontWeight: 500 }}>Audrey Lay</span>
      </div>
    </header>
  );
}
