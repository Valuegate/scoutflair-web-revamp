"use client";
import { Home, User, Image, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ScoutFlairLogo from "@/app/ScoutflairLogo";


export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/signin/player/dashboard", label: "Spotlight", icon: <Home size={18} /> },
    { href: "/signin/player/dashboard/profile", label: "Profile", icon: <User size={18} /> },
    { href: "/signin/player/dashboard/gallery", label: "Gallery", icon: <Image size={18} /> },
    { href: "/signin/player/dashboard/settings", label: "Settings", icon: <Settings size={18} /> },
  ];

  return (
    <div className="bg-[#0A2342]   text-white w-[366px] h-screen flex flex-col p-6">
      <div className="flex items-center gap-2 mb-8">
        {/* Logo SVG */}
       <ScoutFlairLogo/>
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
    </div>
  );
}