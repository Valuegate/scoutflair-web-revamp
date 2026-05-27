"use client";

import { ChevronDown, LogOut } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { links } from "./scoutLinks";
import { apiFetch } from "@/lib/api";

interface ScoutProfile {
  fullName?: string;
  imageFileKey?: string;
  email?: string;
}

function isFullUrl(value: string): boolean {
  return value.startsWith("http://") || value.startsWith("https://");
}

export const ScoutProfileCard = () => {
  const [imgError, setImgError] = useState(false);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const role = "Scout";

  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  useEffect(() => {
    async function load() {
      try {
        // Fixed: Removed the type parameter from apiFetch and casted the assignment instead
        const profile = (await apiFetch(
          "profile/scout/getScoutProfile"
        )) as ScoutProfile | null;

        if (profile?.fullName) setName(profile.fullName);

        const fileKey = profile?.imageFileKey ?? "";

        if (!fileKey || fileKey.trim() === "") {
          // No image uploaded yet — initials fallback
          return;
        }

        if (isFullUrl(fileKey)) {
          // imageFileKey is already a direct CDN URL — use it straight away
          setProfileImage(fileKey);
          setImgError(false);
          return;
        }

        // It's a real file key (short string) — fetch presigned URL via proxy
        try {
          const token =
            typeof window !== "undefined"
              ? localStorage.getItem("authToken") ?? ""
              : "";
          const res = await fetch(
            `/api/scout?path=${encodeURIComponent(
              `/scoutflair/v1/storage/presign-download/${fileKey}`
            )}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (res.ok) {
            const data = await res.json();
            const url =
              data?.presignedUrl ?? data?.url ?? data?.downloadUrl ?? "";
            if (url) {
              setProfileImage(url);
              setImgError(false);
            }
          }
        } catch {
          // presign failed — fall back to initials
        }
      } catch (e) {
        console.error("Profile card load error:", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavigate = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("selectedSignInRole");
    localStorage.removeItem("userSession");
    router.push("/");
  };

  const AvatarImage = ({ size }: { size: "sm" | "md" }) => {
    const dimension = size === "sm" ? "w-9 h-9" : "w-10 h-10";

    if (loading) {
      return (
        <div
          className={`${dimension} rounded-full bg-gray-200 animate-pulse flex-shrink-0`}
        />
      );
    }

    if (profileImage && !imgError) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={profileImage}
          alt={name}
          width={size === "sm" ? 36 : 40}
          height={size === "sm" ? 36 : 40}
          className={`${dimension} rounded-full object-cover flex-shrink-0 border-2 border-white shadow-sm`}
          onError={() => setImgError(true)}
        />
      );
    }

    return (
      <div
        className={`${dimension} rounded-full bg-[#0A2342] flex items-center justify-center text-white font-semibold text-sm flex-shrink-0`}
      >
        {initials || "FO"}
      </div>
    );
  };

  return (
    <div ref={dropdownRef} className="relative">
      {/* Mobile */}
      <div className="sm:hidden">
        <button
          onClick={() => setOpen(!open)}
          className="relative flex items-center p-1 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Profile menu"
        >
          <AvatarImage size="sm" />
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
            <ChevronDown
              className={`w-2 h-2 text-white transition-transform ${
                open ? "rotate-180" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Desktop */}
      <button
        onClick={() => setOpen(!open)}
        className="hidden sm:flex items-center gap-3 p-2 rounded-lg bg-white hover:bg-gray-50 transition-colors w-full"
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <AvatarImage size="md" />
          <div className="hidden md:block text-left min-w-0">
            {loading ? (
              <div className="space-y-1">
                <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
                <div className="h-2.5 w-12 bg-gray-100 rounded animate-pulse" />
              </div>
            ) : (
              <>
                <p className="font-semibold text-sm text-gray-800 truncate max-w-[120px]">
                  {name || "Scout"}
                </p>
                <p className="text-xs text-gray-500">{role}</p>
              </>
            )}
          </div>
        </div>
        <div className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-300 bg-gray-50 shrink-0">
          <ChevronDown
            className={`text-gray-600 w-3 h-3 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-12 sm:top-14 bg-white border border-gray-100 rounded-xl shadow-lg w-52 py-2 z-50">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
            <AvatarImage size="sm" />
            <div className="min-w-0">
              <p className="font-semibold text-gray-800 text-sm truncate">
                {name || "Scout"}
              </p>
              <p className="text-xs text-gray-500">{role}</p>
            </div>
          </div>

          <div className="py-1">
            {links
              .filter((link) => link.label === "Settings")
              .map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavigate(link.href)}
                  className="flex items-center gap-3 w-full text-left px-4 py-2.5 hover:bg-gray-50 transition-colors text-gray-700"
                >
                  {link.icon}
                  <span className="text-sm font-medium">{link.label}</span>
                </button>
              ))}

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full text-left px-4 py-2.5 hover:bg-red-50 transition-colors text-red-600 border-t border-gray-100 mt-1"
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
