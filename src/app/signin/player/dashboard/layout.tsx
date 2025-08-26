"use client";

import { useState } from "react";
import Topbar from "./components/topBar";
import Sidebar from "./components/sideBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex flex-col flex-1 bg-gray-100 overflow-y-auto">
        <Topbar onMenuClick={() => setIsSidebarOpen((prev) => !prev)} />
        <main className="flex-1 p-6 bg-gray-100">{children}</main>
      </div>
    </div>
  );
}


