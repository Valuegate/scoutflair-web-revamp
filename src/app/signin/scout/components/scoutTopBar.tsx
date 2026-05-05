"use client";

import React, { useState, useRef, useEffect } from "react";
import { Menu, Bell, X, Loader2 } from "lucide-react";
import { ScoutProfileCard } from "./scoutprofCard";
import SearchContainer from "../../scout/components/searchContainer";
import { useLanguage, Language } from "./LanguageContext"; // Ensure Language type is exported from your context

const BASE_URL = "https://scoutflair.top";

function getToken() {
  return typeof window !== "undefined"
    ? localStorage.getItem("authToken") || ""
    : "";
}

interface Notification {
  id: number;
  message: string;
  date: string;
  read?: boolean;
}

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

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  } catch {
    return dateStr;
  }
}

export default function ScoutTopbar({
  onMenuClick,
}: {
  onMenuClick: () => void;
}) {
  const { language, setLanguage } = useLanguage();

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const notificationRef = useRef<HTMLDivElement>(null);

  const fetchNotifications = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${BASE_URL}/api/v1/notifications/getNotifications?limit=10&offset=0`,
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      if (!res.ok) throw new Error(`Failed (${res.status})`);
      const data = await res.json();

      const list: Notification[] = Array.isArray(data)
        ? data.map((n: any) => ({
            id: n.id,
            message: n.message,
            date: formatDate(n.date),
            read: false,
          }))
        : [];

      setNotifications(list);
    } catch (err: any) {
      setError("Could not load notifications");
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    if (showNotifications) fetchNotifications();
  }, [showNotifications]);

  return (
    <div className="flex w-full justify-between items-center px-3 sm:px-6 py-3 border-b bg-white shadow-sm relative z-50">
      <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
        <button
          onClick={onMenuClick}
          className="p-1 rounded-md hover:bg-gray-200 flex-shrink-0 sm:hidden"
        >
          <Menu className="w-5 h-5 text-[#0A2342]" />
        </button>
        <div className="flex-1 max-w-sm sm:max-w-md">
          <SearchContainer
            placeholder={
              language === "Français" ? "Rechercher..." : "Search..."
            }
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            {notifications.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full border border-white">
                {notifications.length > 9 ? "9+" : notifications.length}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 shadow-xl rounded-lg overflow-hidden z-50">
              <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                <span className="font-semibold text-sm">Notifications</span>
                <button onClick={() => setShowNotifications(false)}>
                  <X className="w-4 h-4 text-gray-400 hover:text-black" />
                </button>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {loading ? (
                  <div className="flex justify-center items-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                  </div>
                ) : notifications.length === 0 ? (
                  <div className="p-8 text-center text-gray-500 text-sm">
                    <p className="text-2xl mb-2">🔔</p>
                    <p>No notifications yet</p>
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className="p-4 border-b last:border-0 hover:bg-gray-50 transition cursor-pointer"
                    >
                      <p className="text-sm text-gray-800">{n.message}</p>
                      <span className="text-xs text-gray-400 mt-1 block">
                        {n.date}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="hidden sm:block">
          {language === "Français" ? <FrenchFlag /> : <UKFlag />}
        </div>

        {/* FIXED: Added 'as Language' to resolve Error 2345 */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
          className="hidden sm:block text-gray-600 px-2 py-1 text-xs rounded border border-gray-300 outline-none bg-white cursor-pointer hover:border-gray-400"
        >
          <option value="English">English</option>
          <option value="Français">Français</option>
        </select>

        <ScoutProfileCard />
      </div>
    </div>
  );
}
