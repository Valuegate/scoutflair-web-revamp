"use client"

import { ChevronDown, LogOut } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { links } from "./links";

export const ProfileCard = () => {
  const [imgError, setImgError] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const name = "Denis Ojua";
  const role = "Player";

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNavigate = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className="relative flex flex-col sm:flex-row sm:items-center p-4 rounded-lg w-full max-w-sm bg-white"
    >
      {/* Left side: Profile */}
      <div className="flex items-center gap-3 flex-1">
        {!imgError ? (
          <Image
            src="/images/profile.jpeg"
            alt="Profile"
            width={48}
            height={48}
            className="rounded-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-semibold">
            {initials}
          </div>
        )}

        <div className="truncate">
  <p className="font-semibold text-lg text-gray-800">{name}</p>
  <p className="text-sm text-gray-500 sm:block">{role}</p>
</div>

      </div>

      {/* Dropdown button */}
      <div className="mt-2 sm:mt-0 sm:ml-3">
        <button
          onClick={() => setOpen(!open)}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition"
        >
          <ChevronDown className="text-gray-600 w-4 h-4" />
        </button>
      </div>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute right-4 top-16 sm:top-14 bg-white border rounded-lg shadow-lg w-48 py-2 z-50">
          {links
            .filter((link) => link.label === "Profile" || link.label === "Settings")
            .map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavigate(link.href)}
                className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                {link.icon}
                {link.label}
              </button>
            ))}

          <button
            onClick={() => handleNavigate("/")}
            className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

