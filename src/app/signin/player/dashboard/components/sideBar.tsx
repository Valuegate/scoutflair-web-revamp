"use client";
import { Home, User, Image, Settings, LogOut, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ScoutFlairLogo from "@/app/ScoutflairLogo";

export default function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();

  const links = [
    { href: "/signin/player/dashboard", label: "Spotlight", icon: <Home size={18} /> },
    { href: "/signin/player/dashboard/profile", label: "Profile", icon: <User size={18} /> },
    { href: "/signin/player/dashboard/gallery", label: "Gallery", icon: <Image size={18} /> },
    { href: "/signin/player/dashboard/settings", label: "Settings", icon: <Settings size={18} /> },
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
          <nav className="flex flex-col gap-4 flex-1">
            {links.map(({ href, label, icon }) => (
              <Link
                key={href}
                href={href}
                onClick={handleLinkClick}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#13315c] transition-colors ${
                  pathname === href ? "bg-[#13315c]" : ""
                }`}
              >
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

      {/* Desktop Sidebar (pushes content) */}
      <div
        className={`hidden md:flex h-screen flex-col transition-all duration-300 overflow-hidden ${
          isOpen ? "w-[280px] bg-[#0A2342] p-6 text-white" : "w-0"
        }`}
      >
        {isOpen && (
          <>
            <div className="flex items-center gap-2 mb-8">
              <ScoutFlairLogo />
              <h1 className="text-2xl font-bold">ScoutFlair</h1>
            </div>

            <nav className="flex flex-col gap-4">
              {links.map(({ href, label, icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-2 px-2 py-1 rounded hover:bg-[#13315c] ${
                    pathname === href ? "bg-[#13315c]" : ""
                  }`}
                >
                  {icon} {label}
                </Link>
              ))}

              <Link
                href="/"
                className="flex items-center gap-2 mt-auto px-2 py-1 rounded hover:bg-[#13315c]"
              >
                <LogOut size={18} /> Log Out
              </Link>
            </nav>
          </>
        )}
      </div>
    </>
  );
}