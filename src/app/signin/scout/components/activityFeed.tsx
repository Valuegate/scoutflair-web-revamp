"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Loader2, RefreshCw } from "lucide-react";

const BASE_URL = "https://scoutflair.top";

function getToken(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("authToken") || "";
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  } catch {
    return dateStr;
  }
}

type Activity = {
  id: number;
  action: string;
  time: string;
  initials: string;
  color: string;
};

const AVATAR_COLORS = [
  "bg-blue-500", "bg-orange-400", "bg-green-500",
  "bg-purple-500", "bg-red-400", "bg-yellow-500",
  "bg-pink-500", "bg-teal-500", "bg-indigo-500",
];

function getColor(index: number): string {
  return AVATAR_COLORS[index % AVATAR_COLORS.length];
}

function getInitials(message: string): string {
  const words = message.trim().split(" ");
  return words.slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

const PREVIEW_COUNT = 4;

export default function ActivityFeed() {
  const [expanded, setExpanded] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadActivities = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `${BASE_URL}/api/v1/notifications/getNotifications?limit=20&offset=0`,
        {
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      if (!res.ok) throw new Error(`Failed to load activity (${res.status})`);

      const data = await res.json();
      const list = Array.isArray(data) ? data : [];

      const mapped: Activity[] = list.map((n: any, i: number) => ({
        id: n.id,
        action: n.message || "New activity",
        time: formatDate(n.date),
        initials: getInitials(n.message || "SF"),
        color: getColor(i),
      }));

      setActivities(mapped);
    } catch (err: any) {
      setError(err.message || "Failed to load activity.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActivities();
  }, []);

  const visible = expanded
    ? activities
    : activities.slice(0, PREVIEW_COUNT);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Activity Feed</h3>
        <div className="flex items-center gap-3">
          <button
            onClick={loadActivities}
            disabled={loading}
            className="text-gray-400 hover:text-blue-500 transition-colors disabled:opacity-40"
            title="Refresh"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          </button>
          {activities.length > PREVIEW_COUNT && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-gray-800 text-sm font-medium hover:underline flex items-center gap-1 hover:text-blue-600"
            >
              {expanded ? (
                <><ChevronUp size={14} /> Show Less</>
              ) : (
                <>View All <ChevronDown size={14} /></>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-10 text-gray-400">
          <Loader2 className="w-5 h-5 animate-spin mr-2" />
          <span className="text-sm">Loading activity…</span>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="text-center py-6">
          <p className="text-sm text-red-500 mb-3">{error}</p>
          <button
            onClick={loadActivities}
            className="text-xs text-blue-500 hover:underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && activities.length === 0 && (
        <div className="text-center py-10 text-gray-400">
          <p className="text-2xl mb-2">📋</p>
          <p className="text-sm">No activity yet.</p>
        </div>
      )}

      {/* Activity list */}
      {!loading && !error && activities.length > 0 && (
        <>
          <div className="space-y-4">
            {visible.map((activity, i) => (
              <div
                key={activity.id}
                className="flex items-start p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full mr-3 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold ${activity.color}`}
                >
                  {activity.initials}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <p className="text-sm text-gray-700 leading-snug">
                      {activity.action}
                    </p>
                    <p className="text-xs text-gray-400 shrink-0 mt-0.5">
                      {activity.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!expanded && activities.length > PREVIEW_COUNT && (
            <button
              onClick={() => setExpanded(true)}
              className="w-full mt-4 py-2 text-xs text-gray-500 hover:text-blue-600 border border-dashed border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
            >
              +{activities.length - PREVIEW_COUNT} more activities
            </button>
          )}
        </>
      )}
    </div>
  );
}