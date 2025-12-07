"use client";

// 1. Import the 'Repeat' icon for the switch functionality
import { ChevronDown, LogOut, Repeat } from "lucide-react"; 
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {links} from "./coachlinks"

export const ScoutProfileCard = () => {
  const [imgError, setImgError] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const name = "Denis Ojua";
  const role = "Coach";

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
    <div ref={dropdownRef} className="relative">
      {/* Mobile: Avatar as clickable trigger */}
      <div className="sm:hidden">
        <button
          onClick={() => setOpen(!open)}
          className="relative flex items-center p-1 rounded-full hover:bg-gray-100 transition-colors active:scale-95"
          aria-label="Open profile menu"
        >
          {!imgError ? (
            <Image
              src="/images/profile.jpeg"
              alt="Profile"
              width={36}
              height={36}
              className="rounded-full object-cover ring-2 ring-transparent hover:ring-blue-200 transition-all"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-semibold text-sm ring-2 ring-transparent hover:ring-blue-200 transition-all">
              {initials}
            </div>
          )}
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
            <ChevronDown className={`w-2 h-2 text-white transition-transform ${open ? 'rotate-180' : ''}`} />
          </div>
        </button>
      </div>

      {/* Desktop: Full profile card */}
      <button
        onClick={() => setOpen(!open)}
        className="hidden sm:flex items-center gap-3 p-2 rounded-lg bg-white hover:bg-gray-50 transition-colors w-full"
      >
        <div className="flex items-center gap-3 flex-1">
          {!imgError ? (
            <Image
              src="/images/profile.jpeg"
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-semibold text-sm">
              {initials}
            </div>
          )}
          <div className="hidden md:block text-left">
            <p className="font-semibold text-sm text-gray-800 truncate max-w-[100px]">{name}</p>
            <p className="text-xs text-gray-500">{role}</p>
          </div>
        </div>
        <div className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-300 bg-gray-50">
          <ChevronDown className={`text-gray-600 w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute right-0 top-12 sm:top-14 bg-white border rounded-lg shadow-lg w-48 py-2 z-50">
          <div className="sm:hidden px-4 py-3 border-b border-gray-100">
            <p className="font-semibold text-gray-800">{name}</p>
            <p className="text-sm text-gray-500">{role}</p>
          </div>

          <div className="py-1">
           
            
            {/* 3. Updated filter to only get the "Settings" link */}
            {links
              .filter((link) => link.label === "Settings")
              .map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavigate(link.href)}
                  className="flex items-center gap-3 w-full text-left px-4 py-3 sm:py-2 hover:bg-gray-100 transition-colors text-gray-700"
                >
                  {link.icon}
                  <span className="text-sm font-medium">{link.label}</span>
                </button>
              ))}

            <button
              onClick={() => handleNavigate("/")}
              className="flex items-center gap-3 w-full text-left px-4 py-3 sm:py-2 hover:bg-gray-100 transition-colors text-red-600 border-t border-gray-100 mt-1"
            >
              <LogOut size={18} />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
