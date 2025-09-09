"use client";

import { useState } from "react";

import SideBar from "../components/ScoutSidebar";
import ScoutTopbar from "../components/scoutTopBar";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full">
      <SideBar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex flex-col flex-1 bg-gray-100 overflow-y-auto">
        <ScoutTopbar onMenuClick={() => setIsSidebarOpen((prev) => !prev)} />
        <main className="flex-1 p-6 bg-gray-100">{children}</main>
      </div>
    </div>
  );
}
