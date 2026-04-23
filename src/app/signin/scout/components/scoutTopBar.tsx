"use client";

import React, { useState, useRef, useEffect } from "react";
import { Menu, Bell, X } from "lucide-react";
import { ScoutProfileCard } from "./scoutprofCard";
import SearchContainer from "../../player/dashboard/components/searchContainer";

// Mock Notifications
const NOTIFICATIONS = [
  { id: 1, text: "New pitch added in Lagos", time: "2m ago", unread: true },
  {
    id: 2,
    text: "Valuegate Stadium updated details",
    time: "1h ago",
    unread: false,
  },
  { id: 3, text: "New scout message received", time: "3h ago", unread: true },
];

const UKFlag = () => (
  <svg
    viewBox="0 0 20 15"
    className="w-6 h-4 sm:w-8 sm:h-4 inline-block rounded-md ml-2"
  >
    <rect width="30" height="20" fill="#012169" />
    <path d="M0 0l20 15M20 0L0 15" stroke="#fff" strokeWidth="2" />
    <path d="M0 0l20 15M20 0L0 15" stroke="#C8102E" strokeWidth="1" />
    <path d="M8 0v15M0 6h20" stroke="#fff" strokeWidth="3" />
    <path d="M8 0v15M0 6h20" stroke="#C8102E" strokeWidth="2" />
  </svg>
);

const FrenchFlag = () => (
  <svg
    viewBox="0 0 20 15"
    className="w-6 h-4 sm:w-8 sm:h-4 inline-block rounded-md ml-2"
  >
    <rect width="6.66" height="20" fill="#002395" />
    <rect x="6.66" width="6.66" height="20" fill="#ffffff" />
    <rect x="13.32" width="6.66" height="20" fill="#ED2939" />
  </svg>
);

export default function ScoutTopbar({
  onMenuClick,
}: {
  onMenuClick: () => void;
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [language, setLanguage] = useState("English");
  const notificationRef = useRef<HTMLDivElement>(null);

  // Close notifications when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex w-full justify-between items-center px-3 sm:px-6 py-3 border-b bg-white shadow-sm relative z-50">
      {/* Left side */}
      <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
        <button
          onClick={onMenuClick}
          className="p-1 rounded-md hover:bg-gray-200 flex-shrink-0 sm:hidden"
        >
          <Menu className="w-5 h-5 text-[#0A2342]" />
        </button>
        <div className="flex-1 max-w-sm sm:max-w-md">
          <SearchContainer
            placeholder={language === "French" ? "Rechercher..." : "Search..."}
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
        {/* Notification Bell */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 shadow-xl rounded-lg overflow-hidden animate-in fade-in slide-in-from-top-1">
              <div className="p-3 border-b flex justify-between items-center bg-gray-50">
                <span className="font-bold text-xs text-gray-700">
                  Notifications
                </span>
                <button onClick={() => setShowNotifications(false)}>
                  <X className="w-4 h-4 text-gray-400 hover:text-black" />
                </button>
              </div>
              <div className="max-h-60 overflow-y-auto">
                {NOTIFICATIONS.map((n) => (
                  <div
                    key={n.id}
                    className="p-3 border-b last:border-0 hover:bg-gray-50 transition cursor-pointer"
                  >
                    <p
                      className={`text-[11px] ${
                        n.unread ? "font-bold text-black" : "text-gray-600"
                      }`}
                    >
                      {n.text}
                    </p>
                    <span className="text-[9px] text-gray-400">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Flag Display */}
        <div className="hidden sm:block">
          {language === "French" ? <FrenchFlag /> : <UKFlag />}
        </div>

        {/* Language selector */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="hidden sm:block text-gray-600 px-2 py-1 text-xs rounded border border-gray-300 outline-none bg-white cursor-pointer hover:border-gray-400"
        >
          <option value="English">English</option>
          <option value="French">Français</option>
        </select>

        <ScoutProfileCard />
      </div>
    </div>
  );
}
