"use client";

import { Bell, LoaderCircle, RefreshCw, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { findNotificationById, getNotifications } from "@/lib/api";

type NotificationRecord = Record<string, unknown>;

type NotificationItem = {
  id: string;
  title: string;
  message: string;
  timeLabel: string;
  rawTime: number;
  unread: boolean;
};

type NotificationBellProps = {
  initialCount?: number;
};

function isRecord(value: unknown): value is NotificationRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function pickString(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return "";
}

function pickNumber(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }

    if (typeof value === "string" && value.trim()) {
      const parsed = Number(value);
      if (!Number.isNaN(parsed)) {
        return parsed;
      }
    }
  }

  return 0;
}

function pickBoolean(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === "boolean") {
      return value;
    }
  }

  return false;
}

function extractNotificationList(payload: unknown): NotificationRecord[] {
  if (Array.isArray(payload)) {
    return payload.filter(isRecord);
  }

  if (!isRecord(payload)) {
    return [];
  }

  const preferredKeys = ["data", "obj", "items", "rows", "result", "results", "content"];
  for (const key of preferredKeys) {
    if (key in payload) {
      const nested = extractNotificationList(payload[key]);
      if (nested.length > 0) {
        return nested;
      }
    }
  }

  return [];
}

function extractNotificationRecord(payload: unknown): NotificationRecord | null {
  if (isRecord(payload)) {
    const id = pickString(payload.id, payload.notificationId, payload._id);
    if (id) {
      return payload;
    }

    const preferredKeys = ["data", "obj", "item", "result", "notification"];
    for (const key of preferredKeys) {
      if (key in payload) {
        const nested = extractNotificationRecord(payload[key]);
        if (nested) {
          return nested;
        }
      }
    }
  }

  if (Array.isArray(payload)) {
    for (const item of payload) {
      const nested = extractNotificationRecord(item);
      if (nested) {
        return nested;
      }
    }
  }

  return null;
}

function getTimestamp(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }

    if (typeof value === "string" && value.trim()) {
      const direct = Number(value);
      if (!Number.isNaN(direct)) {
        return direct;
      }

      const parsed = new Date(value).getTime();
      if (!Number.isNaN(parsed)) {
        return parsed;
      }
    }
  }

  return 0;
}

function formatRelativeTime(timestamp: number) {
  if (!timestamp) {
    return "Recent";
  }

  const diffMs = Date.now() - timestamp;
  const diffMinutes = Math.max(0, Math.floor(diffMs / 60000));

  if (diffMinutes < 1) {
    return "Just now";
  }

  if (diffMinutes < 60) {
    return `${diffMinutes}m ago`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) {
    return `${diffDays}d ago`;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(timestamp);
}

function toNotificationItem(record: NotificationRecord): NotificationItem {
  const timestamp = getTimestamp(
    record.createdAt,
    record.updatedAt,
    record.time,
    record.timestamp,
    record.date,
  );

  return {
    id: pickString(record.id, record.notificationId, record._id) || `${Date.now()}-${Math.random()}`,
    title:
      pickString(record.title, record.subject, record.notificationTitle, record.type) || "Notification",
    message:
      pickString(
        record.message,
        record.body,
        record.description,
        record.notificationMessage,
        record.text,
      ) || "You have a new update on your ScoutFlair account.",
    timeLabel:
      pickString(record.timeAgo, record.relativeTime) || formatRelativeTime(timestamp),
    rawTime: timestamp,
    unread: !pickBoolean(record.read, record.isRead, record.seen, record.isSeen),
  };
}

export default function NotificationBell({ initialCount = 0 }: NotificationBellProps) {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [selectedNotification, setSelectedNotification] = useState<NotificationItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [error, setError] = useState("");
  const [detailsError, setDetailsError] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const notificationCount = useMemo(() => {
    if (notifications.length === 0) {
      return initialCount;
    }

    const hasExplicitReadState = notifications.some((item) => item.unread === false);
    if (!hasExplicitReadState) {
      return notifications.length;
    }

    return notifications.filter((item) => item.unread).length;
  }, [initialCount, notifications]);

  const loadNotifications = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await getNotifications(20, 0);
      const nextNotifications = extractNotificationList(response)
        .map(toNotificationItem)
        .sort((a, b) => b.rawTime - a.rawTime);

      setNotifications(nextNotifications);
      if (nextNotifications.length > 0) {
        setSelectedNotification((current) =>
          current ? nextNotifications.find((item) => item.id === current.id) || nextNotifications[0] : nextNotifications[0],
        );
      } else {
        setSelectedNotification(null);
      }
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Failed to load notifications.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadNotificationDetails = async (notificationId: string) => {
    setIsLoadingDetails(true);
    setDetailsError("");

    try {
      const response = await findNotificationById(notificationId);
      const detailedRecord = extractNotificationRecord(response);

      if (!detailedRecord) {
        return;
      }

      const detailedNotification = toNotificationItem(detailedRecord);
      setSelectedNotification(detailedNotification);
      setNotifications((current) =>
        current.map((item) =>
          item.id === notificationId ? { ...detailedNotification, unread: false } : item,
        ),
      );
    } catch (detailError) {
      setDetailsError(detailError instanceof Error ? detailError.message : "Failed to load notification details.");
    } finally {
      setIsLoadingDetails(false);
    }
  };

  const handleToggleOpen = async () => {
    const nextOpen = !open;
    setOpen(nextOpen);

    if (nextOpen && notifications.length === 0 && !isLoading) {
      await loadNotifications();
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => void handleToggleOpen()}
        className="relative rounded-full p-2 transition hover:bg-gray-100"
        aria-label="Open notifications"
      >
        <Bell className="h-[24px] w-[21px] text-gray-700" />
        {notificationCount > 0 ? (
          <div className="absolute right-1 top-0 flex h-[16px] w-[16px] -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
            {notificationCount > 9 ? "9+" : notificationCount}
          </div>
        ) : null}
      </button>

      {open ? (
        <div className="absolute right-0 z-50 mt-3 w-[320px] overflow-hidden rounded-[18px] border border-gray-200 bg-white shadow-[0_20px_45px_rgba(15,23,42,0.12)] sm:w-[380px]">
          <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-gray-900">Notifications</p>
              <p className="text-xs text-gray-500">Player dashboard updates</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => void loadNotifications()}
                className="rounded-full p-1 text-gray-500 transition hover:bg-gray-200 hover:text-gray-800"
                aria-label="Refresh notifications"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-1 text-gray-500 transition hover:bg-gray-200 hover:text-gray-800"
                aria-label="Close notifications"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid max-h-[420px] min-h-[280px] grid-cols-1 sm:grid-cols-[160px_1fr]">
            <div className="border-b border-gray-100 sm:max-h-[420px] sm:overflow-y-auto sm:border-b-0 sm:border-r">
              {isLoading ? (
                <div className="flex h-full min-h-[180px] items-center justify-center text-sm text-gray-500">
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </div>
              ) : error ? (
                <div className="p-4">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              ) : notifications.length > 0 ? (
                notifications.map((item) => {
                  const active = selectedNotification?.id === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => void loadNotificationDetails(item.id)}
                      className={`w-full border-b border-gray-100 px-4 py-3 text-left transition last:border-b-0 ${
                        active ? "bg-[#F5F8FC]" : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <span
                          className={`mt-1 h-2 w-2 rounded-full ${
                            item.unread ? "bg-red-500" : "bg-gray-300"
                          }`}
                        />
                        <div className="min-w-0">
                          <p className="truncate text-xs font-semibold text-gray-900">{item.title}</p>
                          <p className="mt-1 max-h-8 overflow-hidden text-[11px] leading-4 text-gray-600">
                            {item.message}
                          </p>
                          <p className="mt-2 text-[10px] text-gray-400">{item.timeLabel}</p>
                        </div>
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="p-4 text-sm text-gray-500">No notifications yet.</div>
              )}
            </div>

            <div className="min-h-[180px] bg-white p-4 sm:min-h-[280px]">
              {isLoadingDetails ? (
                <div className="flex h-full items-center justify-center text-sm text-gray-500">
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  Loading details...
                </div>
              ) : detailsError ? (
                <p className="text-sm text-red-600">{detailsError}</p>
              ) : selectedNotification ? (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0A2342]">
                    Notification
                  </p>
                  <h3 className="mt-2 text-base font-semibold text-gray-900">
                    {selectedNotification.title}
                  </h3>
                  <p className="mt-2 text-xs text-gray-400">{selectedNotification.timeLabel}</p>
                  <p className="mt-4 text-sm leading-6 text-gray-600">
                    {selectedNotification.message}
                  </p>
                </div>
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-gray-500">
                  Select a notification to view details.
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
