"use client";

import NotificationBell from "./notisfication";
import {ProfileCard} from "../components/profCard"
import SearchContainer from "./searchContainer"

const UKFlag = () => (
  <svg viewBox="0 0 20 15" className="w-8 h-6 inline-block rounded-md ml-2"> {/* ml-2 shifts right */}
    <rect width="30" height="20" fill="#012169"/>
    <path d="M0 0l20 15M20 0L0 15" stroke="#fff" strokeWidth="2"/>
    <path d="M0 0l20 15M20 0L0 15" stroke="#C8102E" strokeWidth="1"/>
    <path d="M8 0v15M0 6h20" stroke="#fff" strokeWidth="3"/>
    <path d="M8 0v15M0 6h20" stroke="#C8102E" strokeWidth="2"/>
  </svg>
);

export default function Topbar() {
  return (
    <div className="flex justify-between items-center px-6 py-3 border-b bg-white shadow-sm">
     <SearchContainer/>
      <div className="flex items-center gap-4">
   <div  >
    <NotificationBell/>
  </div>
  <div className="ml-2">
    <UKFlag  />
  </div>
  
  <select className=" text-gray-500 px-2 py-1">
    <option>English</option>
    <option>French</option>
  </select>
  
  <ProfileCard/>
</div>
    </div>
  );
}
