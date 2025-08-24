import Topbar from "./components/topBar";
import Sidebar from "./components/sideBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen  w-[1512px]">
      <Sidebar />

      <div className=" bg-gray-100 flex flex-col flex-1 overflow-y-auto">
        
       
          <Topbar />
        <main className=" flex-1 p-6 bg-gray-100">
         
          {children}</main>
        
      </div>
    </div>
  );
}
