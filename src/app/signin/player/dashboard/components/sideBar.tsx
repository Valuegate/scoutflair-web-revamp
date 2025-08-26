"use client";
import { Home, User, Image, Settings, LogOut } from "lucide-react";
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

  return (
    <>
      {/* Desktop Sidebar (pushes content) */}
   {/* Desktop Sidebar (pushes content) */}
<div
  className={`hidden md:flex h-screen flex-col transition-all duration-300 overflow-hidden ${
    isOpen ? "w-[366px] bg-[#0A2342] p-6 text-white" : "w-0"
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
