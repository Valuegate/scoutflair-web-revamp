"use client";

import { useEffect, useState } from "react";
import { UpdatesIcon } from "../ScoutIcons";
import { Loader2 } from "lucide-react";

const BASE_URL = "https://scoutflair.top";

function getToken() {
  return localStorage.getItem("authToken") || "";
}

type Update = {
  id: number;
  text: string;
  time: string;
};

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hrs ago`;
    if (diff < 172800) return "Yesterday";
    return date.toLocaleDateString();
  } catch {
    return dateStr;
  }
}

function getInitials(text: string): string {
  return text?.trim().slice(0, 2).toUpperCase() || "SF";
}

function UpdateAvatar({ text }: { text: string }) {
  const colors = [
    "bg-blue-500",
    "bg-orange-400",
    "bg-green-500",
    "bg-purple-500",
    "bg-red-400",
    "bg-yellow-500",
  ];
  const color = colors[text.charCodeAt(0) % colors.length];
  return (
    <div
      className={`h-8 w-8 rounded-full mr-3 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold ${color}`}
    >
      {getInitials(text)}
    </div>
  );
}

export default function Updates() {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchUpdates() {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch(
          `${BASE_URL}/api/v1/profile/scout/getActivityFeed?limit=10&offset=0`,
          { headers: { Authorization: `Bearer ${getToken()}` } }
        );
        if (!res.ok) throw new Error();
        const data = await res.json();

        // Response wrapper: { data: { obj: [...] } }
        const list = data?.data?.obj || data?.data || [];

        const mapped: Update[] = list.map((item: any) => ({
          id: item.id,
          text:
            item.message || item.activity || item.description || "New activity",
          time: formatDate(item.date || item.createdAt || item.dateCreated),
        }));

        setUpdates(mapped);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchUpdates();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold style-lato text-gray-800 flex items-center">
          <UpdatesIcon />
          Updates
        </h3>
        <a
          href="#"
          className="text-gray-800 text-sm font-medium hover:underline"
        >
          View All
        </a>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="text-center py-8 text-gray-400 text-sm">
          <p className="text-2xl mb-2">📰</p>
          <p>No updates available</p>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && updates.length === 0 && (
        <div className="text-center py-8 text-gray-400 text-sm">
          <p className="text-2xl mb-2">📰</p>
          <p>No updates yet</p>
        </div>
      )}

      {/* Updates list */}
      {!loading && !error && updates.length > 0 && (
        <div className="space-y-4">
          {updates.map((update) => (
            <div key={update.id} className="flex items-start">
              <UpdateAvatar text={update.text} />
              <div className="flex-1">
                <p className="text-sm text-gray-800">{update.text}</p>
                <p className="text-xs text-gray-500 mt-1">{update.time}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
