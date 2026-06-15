import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function DashboardLayout({ children }) {
  return (
    <div style={{ backgroundColor: "#0a0a0a", minHeight: "100vh" }}>
      <Sidebar />
      <Header />
      <main style={{ marginLeft: "210px", paddingTop: "56px", minHeight: "100vh", backgroundColor: "#0a0a0a" }}>
        <div style={{ padding: "28px" }}>{children}</div>
      </main>
    </div>
  );
}



