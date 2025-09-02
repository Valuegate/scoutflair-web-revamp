"use client";

import { Menu } from "lucide-react";
import NotificationBell from "./notisfication";
import { ProfileCard } from "../components/profCard";
import SearchContainer from "./searchContainer";

const UKFlag = () => (
  <svg viewBox="0 0 20 15" className="w-6 h-4 sm:w-8 sm:h-4 inline-block rounded-md ml-2">
    <rect width="30" height="20" fill="#012169" />
    <path d="M0 0l20 15M20 0L0 15" stroke="#fff" strokeWidth="2" />
    <path d="M0 0l20 15M20 0L0 15" stroke="#C8102E" strokeWidth="1" />
    <path d="M8 0v15M0 6h20" stroke="#fff" strokeWidth="3" />
    <path d="M8 0v15M0 6h20" stroke="#C8102E" strokeWidth="2" />
  </svg>
);

export default function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <div className="flex w-full justify-between items-center px-3 sm:px-6 py-3 border-b bg-white shadow-sm">
      {/* Left side */}
      <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
        {/* Menu button - only visible on mobile */}
        <button
          onClick={onMenuClick}
          className="p-1 rounded-md hover:bg-gray-200 flex-shrink-0 sm:hidden"
        >
          <Menu className="w-5 h-5 text-[#0A2342] font-bold-400" />
        </button>
        <div className="flex-1 max-w-sm sm:max-w-md">
          <SearchContainer />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
        <NotificationBell />
        
        {/* UK Flag - hidden on mobile */}
        <div className="hidden sm:block">
          <UKFlag />
        </div>
        
        {/* Language selector - hidden on mobile */}
        <select className="hidden sm:block text-gray-500 px-2 py-1 text-sm rounded border">
          <option className="w-[44px">English</option>
          <option  className="w-[44px">French</option>
        </select>
        
        <ProfileCard />
      </div>
    </div>
  );
}