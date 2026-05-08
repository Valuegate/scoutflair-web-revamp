"use client";

import { Search, PencilLine, Trash2, RefreshCw, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getStorageDownloadUrl } from "@/lib/api";
import { usePlayerProfile } from "../profile/usePlayerAvatar";

type GalleryEntry = {
  id: string;
  image: string;
  alt: string;
  title: string;
  description: string;
  category: string;
  createdDate: string;
  dateLabel: string;
  isVideo: boolean;
};

type NewsItem = {
  id: string;
  image: string;
  category: string;
  timeAgo: string;
  headline: string;
};

type UnknownRecord = Record<string, unknown>;

const R2_PUBLIC_BASE_URL = "https://pub-cc6bfa4db4fa4eb8b3d35333dcfdca5e.r2.dev";
const PAGE_SIZE = 12;

const newsItems: NewsItem[] = [
  {
    id: "n1",
    image: "/images/round.png",
    category: "Sport News",
    timeAgo: "2 hours ago",
    headline: "Valuegate Football Academy unveils new 300-seater local stadium in Abuja, Nigeria.",
  },
  {
    id: "n2",
    image: "/images/dpone.png",
    category: "Sport News",
    timeAgo: "2 hours ago",
    headline: "Weekend development fixtures to spotlight emerging midfield talent across local academies.",
  },
  {
    id: "n3",
    image: "/images/scdp.png",
    category: "Sport News",
    timeAgo: "2 hours ago",
    headline: "Performance staff introduce recovery-focused microcycles ahead of the next trial window.",
  },
  {
    id: "n4",
    image: "/images/post_1.png",
    category: "Sport News",
    timeAgo: "2 hours ago",
    headline: "Coaches highlight smarter pressing triggers as a key development target for young players.",
  },
  {
    id: "n5",
    image: "/images/spotlight2.png",
    category: "Sport News",
    timeAgo: "2 hours ago",
    headline: "Training centres invest in match-realistic sessions to improve decision-making under pressure.",
  },
];

function isRecord(value: unknown): value is UnknownRecord {
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

function extractFirstArray(payload: unknown): UnknownRecord[] {
  const queue: unknown[] = [payload];
  const seen = new Set<unknown>();

  while (queue.length > 0) {
    const current = queue.shift();

    if (!current || seen.has(current)) {
      continue;
    }

    seen.add(current);

    if (Array.isArray(current)) {
      return current.filter(isRecord);
    }

    if (!isRecord(current)) {
      continue;
    }

    ["data", "obj", "items", "rows", "content", "result", "results"].forEach((key) => {
      if (key in current) {
        queue.push(current[key]);
      }
    });
  }

  return [];
}

function extractTotalCount(payload: unknown) {
  if (!isRecord(payload)) {
    return 0;
  }

  const data = isRecord(payload.data) ? payload.data : null;
  return pickNumber(payload.totalCount, data?.totalCount, data?.total, payload.total);
}

function extractFirstRecord(payload: unknown): UnknownRecord | null {
  if (isRecord(payload)) {
    for (const key of ["data", "obj", "item", "result"]) {
      if (key in payload) {
        const nested = extractFirstRecord(payload[key]);
        if (nested) {
          return nested;
        }
      }
    }

    return payload;
  }

  if (Array.isArray(payload)) {
    for (const item of payload) {
      const nested = extractFirstRecord(item);
      if (nested) {
        return nested;
      }
    }
  }

  return null;
}

function isDisplayableUrl(value: string) {
  return /^(https?:\/\/|blob:|data:|\/images\/|\/)/i.test(value);
}

function fileKeyToPublicUrl(value: string) {
  return `${R2_PUBLIC_BASE_URL}/${value.replace(/^\/+/, "")}`;
}

function isVideoUrl(url: string) {
  return /\.(mp4|webm|ogg|mov|m4v)(\?|#|$)/i.test(url);
}

async function resolveMediaUrl(value: string) {
  if (!value.trim()) {
    return "";
  }

  if (isDisplayableUrl(value)) {
    return value.trim();
  }

  try {
    const response = await getStorageDownloadUrl(value.trim());
    const record = extractFirstRecord(response);
    const downloadUrl = record
      ? pickString(record.presignedUrl, record.publicUrl, record.url, record.downloadUrl)
      : "";
    return downloadUrl || fileKeyToPublicUrl(value);
  } catch {
    return fileKeyToPublicUrl(value);
  }
}

function formatDateLabel(value: string) {
  const parsedDate = value ? new Date(value) : null;

  if (!parsedDate || Number.isNaN(parsedDate.getTime())) {
    return "RECENT UPLOADS";
  }

  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })
    .format(parsedDate)
    .toUpperCase()
    .replace(", ", ",");
}

async function mapGalleryRecord(record: UnknownRecord): Promise<GalleryEntry | null> {
  const mediaKey = pickString(
    record.mediaFileKey,
    record.file,
    record.fileKey,
    record.url,
    record.publicUrl,
    record.imageUrl,
  );

  if (!mediaKey) {
    return null;
  }

  const image = await resolveMediaUrl(mediaKey);
  if (!image) {
    return null;
  }

  const title = pickString(record.title, record.fileName) || "Untitled media";
  const description = pickString(record.description);
  const category = pickString(record.category);
  const createdDate = pickString(record.createdDate, record.createdAt, record.date);

  return {
    id: String(pickNumber(record.id, record.mediaId) || mediaKey),
    image,
    alt: description || title,
    title,
    description,
    category,
    createdDate,
    dateLabel: formatDateLabel(createdDate),
    isVideo: isVideoUrl(mediaKey) || isVideoUrl(image),
  };
}

function groupGalleryByDate(entries: GalleryEntry[]) {
  return entries.reduce<Record<string, GalleryEntry[]>>((acc, entry) => {
    if (!acc[entry.dateLabel]) {
      acc[entry.dateLabel] = [];
    }
    acc[entry.dateLabel].push(entry);
    return acc;
  }, {});
}

export default function GalleryPage() {
  const [query, setQuery] = useState("");
  const [entries, setEntries] = useState<GalleryEntry[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [deleting, setDeleting] = useState(false);
  const profile = usePlayerProfile();

  const fetchGalleryPage = useCallback(async (offset: number, append = false) => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Please log in again to view your gallery.");
      }

      const params = new URLSearchParams({
        limit: String(PAGE_SIZE),
        offset: String(offset),
      });

      if (profile.email) {
        params.set("playeremail", profile.email);
      }

      const response = await fetch(`/api/gallery?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "*/*",
        },
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        const message =
          payload && typeof payload === "object" && "message" in payload
            ? String(payload.message)
            : payload && typeof payload === "object" && "error" in payload
              ? String(payload.error)
              : "Failed to load gallery.";
        throw new Error(message);
      }

      const mappedEntries = await Promise.all(extractFirstArray(payload).map(mapGalleryRecord));
      const nextEntries = mappedEntries.filter((entry): entry is GalleryEntry => Boolean(entry));
      setEntries((currentEntries) => (append ? [...currentEntries, ...nextEntries] : nextEntries));
      setTotalCount(extractTotalCount(payload));
      setSelectedId("");
    } catch (loadError) {
      setEntries([]);
      setTotalCount(0);
      setError(loadError instanceof Error ? loadError.message : "Failed to load gallery.");
    } finally {
      setLoading(false);
    }
  }, [profile.email]);

  const loadGallery = useCallback(() => fetchGalleryPage(0), [fetchGalleryPage]);

  useEffect(() => {
    void loadGallery();
  }, [loadGallery]);

  const filteredEntries = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return entries;
    }

    return entries.filter((entry) =>
      [entry.title, entry.description, entry.category, entry.alt]
        .join(" ")
        .toLowerCase()
        .includes(normalized),
    );
  }, [entries, query]);

  const groupedEntries = useMemo(() => groupGalleryByDate(filteredEntries), [filteredEntries]);
  const selectedEntry = entries.find((entry) => entry.id === selectedId);
  const canLoadMore = totalCount > entries.length;

  const handleDelete = async () => {
    if (!selectedEntry || deleting) {
      return;
    }

    const shouldDelete = window.confirm(`Delete "${selectedEntry.title}" from your gallery?`);
    if (!shouldDelete) {
      return;
    }

    setDeleting(true);

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Please log in again to delete gallery media.");
      }

      const response = await fetch(`/api/gallery?mediaId=${encodeURIComponent(selectedEntry.id)}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "*/*",
        },
      });

      const payload = await response.json().catch(() => null);
      if (!response.ok) {
        const message =
          payload && typeof payload === "object" && "message" in payload
            ? String(payload.message)
            : payload && typeof payload === "object" && "error" in payload
              ? String(payload.error)
              : "Failed to delete gallery media.";
        throw new Error(message);
      }

      setEntries((currentEntries) => currentEntries.filter((entry) => entry.id !== selectedEntry.id));
      setTotalCount((currentTotal) => Math.max(0, currentTotal - 1));
      setSelectedId("");
    } catch (deleteError) {
      alert(deleteError instanceof Error ? deleteError.message : "Failed to delete gallery media.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="px-2 py-7 md:px-1">
      <div className="flex flex-col gap-6 xl:flex-row">
        <div className="min-w-0 flex-1">
          <div className="rounded-[22px] bg-white p-4 shadow-[0_14px_32px_rgba(15,23,42,0.08)]">
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <div className="flex h-12 flex-1 items-center rounded-xl bg-[#F5F5F5] px-4">
                <Search className="mr-3 h-4 w-4 text-[#9CA3AF]" strokeWidth={1.7} />
                <input
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="search..."
                  className="w-full bg-transparent text-sm text-[#374151] outline-none placeholder:text-[#9CA3AF]"
                />
                <div className="ml-3 flex items-center gap-3 text-[#6B7280]">
                  <Link
                    href="/signin/player/dashboard/gallery/uploadgallery"
                    className="transition hover:text-[#0A2342]"
                    title="Add media"
                  >
                    <PencilLine className="h-4 w-4" strokeWidth={1.8} />
                  </Link>
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={!selectedEntry || deleting}
                    className="transition hover:text-[#0A2342] disabled:cursor-not-allowed disabled:opacity-40"
                    title="Delete selected media"
                  >
                    <Trash2 className="h-4 w-4" strokeWidth={1.8} />
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => loadGallery()}
                disabled={loading}
                className="flex h-12 min-w-[90px] items-center justify-center gap-2 rounded-[10px] border border-[#A7B2C3] px-6 text-sm font-medium text-[#384152] transition hover:bg-[#F8FAFC] disabled:opacity-60"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} strokeWidth={1.8} />
                Filter
              </button>
            </div>
          </div>

          <div className="mt-6 rounded-[24px] bg-white p-4 shadow-[0_14px_32px_rgba(15,23,42,0.08)] sm:p-5">
            {loading ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="h-[138px] animate-pulse rounded-[10px] bg-[#F5F5F5]" />
                ))}
              </div>
            ) : error ? (
              <div className="rounded-2xl border border-dashed border-[#D1D5DB] px-6 py-12 text-center text-sm text-[#6B7280]">
                {error}
              </div>
            ) : filteredEntries.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[#D1D5DB] px-6 py-12 text-center text-sm text-[#6B7280]">
                {query.trim() ? "No gallery items match your search." : "Your gallery is empty."}
              </div>
            ) : (
              <>
                {Object.entries(groupedEntries).map(([dateLabel, dateEntries]) => (
                  <section key={dateLabel} className="mb-6 last:mb-0">
                    <h2 className="mb-4 text-[15px] font-semibold uppercase tracking-tight text-[#404040]">
                      {dateLabel}
                    </h2>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {dateEntries.map((entry) => (
                        <button
                          type="button"
                          key={entry.id}
                          onClick={() => setSelectedId((currentId) => (currentId === entry.id ? "" : entry.id))}
                          className={`relative overflow-hidden rounded-[10px] bg-[#F5F5F5] text-left ring-offset-2 transition ${
                            selectedId === entry.id ? "ring-2 ring-[#0A2342]" : "hover:opacity-95"
                          }`}
                          title={entry.title}
                        >
                          {entry.isVideo ? (
                            <>
                              <video
                                src={entry.image}
                                className="h-[138px] w-full object-cover"
                                muted
                                playsInline
                                preload="metadata"
                              />
                              <span className="absolute inset-0 flex items-center justify-center bg-black/10 text-white">
                                <Play className="h-8 w-8 fill-white" strokeWidth={1.8} />
                              </span>
                            </>
                          ) : (
                            <img
                              src={entry.image}
                              alt={entry.alt}
                              className="h-[138px] w-full object-cover"
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </section>
                ))}

                {canLoadMore && (
                  <div className="pt-2 text-center">
                    <button
                      type="button"
                      onClick={() => fetchGalleryPage(entries.length, true)}
                      disabled={loading}
                      className="rounded-[10px] border border-[#A7B2C3] px-5 py-2 text-xs font-medium text-[#384152] transition hover:bg-[#F8FAFC] disabled:opacity-60"
                    >
                      Load more
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <aside className="w-full xl:w-[340px]">
          <div className="rounded-[24px] bg-white p-4 shadow-[0_14px_32px_rgba(15,23,42,0.08)]">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-[18px] font-bold text-[#222222]">News Feed</h3>
              <button type="button" className="text-xs text-[#6B7280] transition hover:text-[#0A2342]">
                View All
              </button>
            </div>

            <div className="relative mb-6 overflow-hidden rounded-[14px]">
              <Image
                src="/images/grass.jpg"
                alt="Featured football news"
                width={680}
                height={380}
                className="h-[160px] w-full object-cover"
              />
              <div className="absolute inset-0 flex items-start justify-between bg-[linear-gradient(180deg,rgba(4,25,49,0.76)_0%,rgba(4,25,49,0.88)_100%)] p-4">
                <div className="max-w-[66%]">
                  <div className="mb-3 flex items-center gap-2 text-[10px] text-white">
                    <span className="font-semibold">Local News</span>
                    <span className="h-1 w-1 rounded-full bg-white/80" />
                    <span>2 hours ago</span>
                  </div>
                  <p className="text-sm leading-6 text-white">
                    Valuegate Football Academy unveils new 300-seater local stadium, located in Abuja, Nigeria.
                  </p>
                </div>
                <Image
                  src="/images/round.png"
                  alt="Featured story thumbnail"
                  width={92}
                  height={70}
                  className="h-[70px] w-[92px] rounded-md object-cover"
                />
              </div>
            </div>

            <div>
              {newsItems.map((item, index) => (
                <div key={item.id} className={`${index < newsItems.length - 1 ? "mb-4 border-b border-[#ECECEC] pb-4" : ""}`}>
                  <div className="flex gap-4">
                    <Image
                      src={item.image}
                      alt={item.headline}
                      width={72}
                      height={72}
                      className="h-[62px] w-[62px] rounded-md object-cover"
                    />
                    <div className="min-w-0">
                      <div className="mb-2 flex items-center gap-2 text-[10px] text-[#6B7280]">
                        <span className="font-semibold text-[#404040]">{item.category}</span>
                        <span className="h-1 w-1 rounded-full bg-[#9CA3AF]" />
                        <span>{item.timeAgo}</span>
                      </div>
                      <p className="text-xs leading-5 text-[#666666]">{item.headline}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-[24px] bg-white p-4 shadow-[0_14px_32px_rgba(15,23,42,0.08)]">
            <div className="flex h-full gap-4">
              <div className="flex flex-1 flex-col justify-between py-2">
                <div>
                  <h3 className="mb-10 text-[18px] font-bold text-[#222222]">Featured Ads</h3>
                  <h4 className="mb-3 max-w-[180px] text-[18px] font-semibold leading-6 text-[#222222]">
                    Subscribe to Scoutflair Premium Plan
                  </h4>
                  <p className="mb-6 max-w-[190px] text-xs leading-5 text-[#666666]">
                    Unlock verified exposure tools, richer player analytics, and premium promotion features built to help standout performances reach the right audience.
                  </p>
                </div>

                <button
                  type="button"
                  className="h-11 w-full max-w-[132px] rounded-[10px] bg-[#0A2342] px-6 text-sm font-semibold text-white transition hover:opacity-95"
                >
                  Subscribe
                </button>
              </div>

              <div className="flex w-[132px] items-end justify-end">
                <Image
                  src="/images/image.png"
                  alt="Featured premium ad player"
                  width={240}
                  height={320}
                  className="h-auto w-full object-contain"
                />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
