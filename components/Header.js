export default function Header() {
  return (
    <header style={{
      position: "fixed", top: 0, right: 0, left: "210px", height: "56px", zIndex: 30,
      backgroundColor: "#0d0d0d", borderBottom: "1px solid #1a1a1a",
      display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "0 24px", gap: "16px",
    }}>
      {/* Bell */}
      <button style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "34px", height: "34px", borderRadius: "8px", background: "none", border: "none", cursor: "pointer", color: "#555" }}>
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      </button>

      {/* Divider */}
      <div style={{ width: "1px", height: "20px", backgroundColor: "#1e1e1e" }} />

      {/* User */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{
          width: "32px", height: "32px", borderRadius: "50%", overflow: "hidden",
          backgroundColor: "#2a2a2a", border: "2px solid #2e2e2e",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "11px", fontWeight: 700, color: "#fff", flexShrink: 0,
          backgroundImage: "linear-gradient(135deg, #3b4aad 0%, #5b6abf 100%)",
        }}>
          AL
        </div>
        <div>
          <p style={{ color: "#ddd", fontSize: "13px", fontWeight: 500, lineHeight: 1 }}>Audrey Lay</p>
          <p style={{ color: "#444", fontSize: "10px", marginTop: "2px" }}>Admin</p>
        </div>
      </div>
    </header>
  );
}
