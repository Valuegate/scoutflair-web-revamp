import Topbar from "./components/topBar";
import Sidebar from "./components/sideBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="overflow-y-auto bg-gray-100 flex-1">{children}</main>
      </div>
    </div>
  );
}
