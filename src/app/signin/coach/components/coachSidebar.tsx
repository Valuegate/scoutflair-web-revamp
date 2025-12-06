"use client";
import { Home, User, Image, Settings, LogOut, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ScoutFlairLogo from "@/app/ScoutflairLogo";
import { EvaluationIcons, OverViewIcon, MatchesIcon, SettingsIcon, LogOutIcons, LocalPitchIcon,PlayersIcon, AcademiesIcon } from "./coachIcons"



export default function SideBar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();

  const links = [
    { href: "/signin/coach/dashboard", label: "Overview", icon: <OverViewIcon /> },
    { href: "/signin/coach/dashboard/mysquad", label: "My Squad", icon: <EvaluationIcons /> },
     { href: "/signin/coach/dashboard/scoutingnetwork", label: "Scouting Network", icon: <PlayersIcon /> },
    { href: "/signin/coach/dashboard/aianalyst", label: " Ai Analyst", icon: <MatchesIcon /> },
    { href: "/signin/coach/dashboard/tactics", label: "Tactics", icon: <AcademiesIcon /> },
    { href: "/signin/coach/dashboard/matches", label: "Matches", icon: <LocalPitchIcon /> },
    { href: "/signin/coach/dashboard/settings", label: "Settings", icon: <SettingsIcon/> },
   
    
  ];

  const handleLinkClick = () => {
    // Close sidebar on mobile when a link is clicked
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Mobile Sidebar (overlay) */}
      <div
        className={`md:hidden fixed left-0 top-0 h-full w-[366px] bg-[#0A2342] text-white z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Header with close button */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <ScoutFlairLogo />
              <h1 className="text-xl font-bold">ScoutFlair</h1>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#13315c] rounded-md transition-colors"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-4 flex-1 -mx-6">
            {links.map(({ href, label, icon }) => (
              <Link
                key={href}
                href={href}
                onClick={handleLinkClick}
                className={`relative flex  gap-3 px-4 py-3 rounded-lg hover:bg-[#13315c] transition-colors ${
                  pathname === href ? "bg-[#13315c]" : ""
                }`}
              >
                {/* Yellow accent bar for active item */}
                {pathname === href && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-500 rounded-r-sm"></div>
                )}
                {icon} 
                <span className="text-sm font-medium">{label}</span>
              </Link>
            ))}

            {/* Logout at bottom */}
            <Link
              href="/"
              onClick={handleLinkClick}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#13315c] transition-colors mt-auto border-t border-[#13315c] pt-4"
            >
              <LogOut size={18} /> 
              <span className="text-sm font-medium">Log Out</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Desktop Sidebar (always visible) */}
      <div className="hidden md:flex h-screen w-[280px] bg-[#0A2342] p-6 text-white flex-col">
        <div className="flex items-center gap-2 mb-8">
          <ScoutFlairLogo />
          <h1 className="text-2xl font-bold">ScoutFlair</h1>
        </div>

        <nav className="flex flex-col gap-2 flex-1 -mx-6">
          {links.map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              className={`relative flex items-center   gap-3 px-4 py-3 rounded-lg hover:bg-[#13315c] transition-colors ${
                pathname === href ? "bg-[#13315c]" : ""
              }`}
            >
              {/* Yellow accent bar for active item */}
              {pathname === href && (
                <div className="absolute left-0 top-0   bottom-0 w-1 bg-yellow-600 rounded-r-sm"></div>
              )}
              {icon} 
              <span className="text-sm font-medium">{label}</span>
            </Link>
          ))}

          {/* Logout at bottom */}
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#13315c] transition-colors mt-auto border-t border-[#13315c] pt-4"
          >
            <LogOut size={18} /> 
            <span className="text-sm font-medium">Log Out</span>
          </Link>
        </nav>
      </div>
    </>
  );
}