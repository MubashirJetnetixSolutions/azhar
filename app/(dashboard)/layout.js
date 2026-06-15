import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function DashboardLayout({ children }) {
  return (
    <div style={{ backgroundColor: "#111111", minHeight: "100vh" }}>
      <Sidebar />
      <Header />
      <main style={{ marginLeft: "210px", paddingTop: "56px", minHeight: "100vh", backgroundColor: "#111111" }}>
        <div style={{ padding: "24px 28px" }}>{children}</div>
      </main>
    </div>
  );
}



