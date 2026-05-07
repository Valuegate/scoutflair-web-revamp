"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Loader2, RefreshCw } from "lucide-react";

// Static fallback avatars (API returns no image/user fields)
const FALLBACK_AVATARS = [
  "/images/actone.png",
  "/images/acttwo.png",
  "/images/actthree.png",
  "/images/Adewale.png",
  "/images/scdp.png",
  "/images/Larry.png",
  "/images/Robinson.png",
  "/images/Dare.png",
  "/images/Eniola.png",
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("authToken");
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor(diffMs / (1000 * 60));

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

async function fetchNotifications(limit = 19, offset = 0) {
  const token = getToken();
  const res = await fetch(
    `https://scoutflair.top/api/v1/notifications/getNotifications?limit=${limit}&offset=${offset}`,
    {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) throw new Error(`Failed to fetch notifications (${res.status})`);
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

// ── Static fallback data (shown when API returns empty) ───────────────────────
const FALLBACK_ACTIVITIES = [
  {
    user: "John Boyega",
    action: "Submitted a report on Henry Ishaya.",
    time: "Yesterday",
    image: "/images/actone.png",
  },
  {
    user: "James Austin",
    action: "Added Tobi Irefin to Top Prospect list.",
    time: "Yesterday",
    image: "/images/acttwo.png",
  },
  {
    user: "Cynthia Peacok",
    action: "Attended a Local match in Kaduna.",
    time: "Yesterday",
    image: "/images/actthree.png",
  },
  {
    user: "Adewale Usman",
    action: "Added a note on Tobi Irefin.",
    time: "2 days ago",
    image: "/images/Adewale.png",
  },
  {
    user: "Olumide Balogun",
    action: "Scouted Kasim Peter in California.",
    time: "2 days ago",
    image: "/images/scdp.png",
  },
  {
    user: "Larry Smith",
    action: "Scouted Chinedu Okonkwo in Jos.",
    time: "3 days ago",
    image: "/images/Larry.png",
  },
  {
    user: "Angel Robinson",
    action: "Scouted Babajide Akinyemi in Lagos.",
    time: "3 days ago",
    image: "/images/Robinson.png",
  },
  {
    user: "Dare Emmanuel",
    action: "Scouted Adesola Bankole in Abuja.",
    time: "4 days ago",
    image: "/images/Dare.png",
  },
  {
    user: "Eniola Adekoya",
    action: "Scouted Kasim Segun in Abuja.",
    time: "4 days ago",
    image: "/images/Eniola.png",
  },
];

const PREVIEW_COUNT = 4;

// ── Main component ────────────────────────────────────────────────────────────
export default function ActivityFeed() {
  const [expanded, setExpanded] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadNotifications = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchNotifications(19, 0);
      setNotifications(data);
    } catch (err) {
      setError(err.message || "Failed to load activity.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  // Use real API data if available, fallback to static data if empty
  const useRealData = notifications.length > 0;

  const allActivities = useRealData
    ? notifications.map((n, i) => ({
        user: "ScoutFlair",
        action: n.message,
        time: formatDate(n.date),
        image: FALLBACK_AVATARS[i % FALLBACK_AVATARS.length],
      }))
    : FALLBACK_ACTIVITIES;

  const visible = expanded
    ? allActivities
    : allActivities.slice(0, PREVIEW_COUNT);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Activity Feed</h3>
        <div className="flex items-center gap-3">
          <button
            onClick={loadNotifications}
            disabled={loading}
            className="text-gray-400 hover:text-blue-500 transition-colors disabled:opacity-40"
            title="Refresh"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          </button>

          {allActivities.length > PREVIEW_COUNT && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-gray-800 text-sm font-medium hover:underline flex items-center gap-1 transition-colors hover:text-blue-600"
            >
              {expanded ? (
                <>
                  <ChevronUp size={14} /> Show Less
                </>
              ) : (
                <>
                  View All <ChevronDown size={14} />
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center py-10 text-gray-400">
          <Loader2 className="w-5 h-5 animate-spin mr-2" />
          <span className="text-sm">Loading activity…</span>
        </div>
      )}

      {/* Error state */}
      {!loading && error && (
        <div className="text-center py-6">
          <p className="text-sm text-red-500 mb-3">{error}</p>
          <button
            onClick={loadNotifications}
            className="text-xs text-blue-500 hover:underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Activity list */}
      {!loading && !error && (
        <>
          <div className="space-y-4">
            {visible.map((activity, i) => (
              <div
                key={i}
                className="flex items-start p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
              >
                <img
                  src={activity.image}
                  width={32}
                  height={32}
                  alt={activity.user}
                  className="rounded-full h-8 w-8 mr-3 object-cover shrink-0"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      activity.user
                    )}&size=32&background=e2e8f0&color=475569`;
                  }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 group-hover:text-[#0A2342] transition-colors">
                    {activity.user}
                  </p>
                  <div className="flex justify-between items-start gap-2">
                    <p className="text-sm text-gray-600 leading-snug">
                      {activity.action}
                    </p>
                    <p className="text-xs text-gray-400 shrink-0 mt-0.5">
                      {activity.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {allActivities.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-6">
                No activity yet.
              </p>
            )}
          </div>

          {!expanded && allActivities.length > PREVIEW_COUNT && (
            <button
              onClick={() => setExpanded(true)}
              className="w-full mt-4 py-2 text-xs text-gray-500 hover:text-blue-600 border border-dashed border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
            >
              +{allActivities.length - PREVIEW_COUNT} more activities
            </button>
          )}
        </>
      )}
    </div>
  );
}
