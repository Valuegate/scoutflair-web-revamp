"use client";
import { useState, useEffect, useRef } from "react";
import {
  Search,
  Filter,
  Plus,
  MapPin,
  Calendar,
  ChevronDown,
  X,
  CheckCircle2,
  MoreHorizontal,
  TrendingUp,
  FileText,
  Zap,
  RefreshCw,
} from "lucide-react";
import AddTaskForm from "./addNewTask";
import { SCOUTING_REFRESH_EVENT } from "./scoutingPlanWidget";

const BASE = "https://scoutflair.top/api/v1";

function getToken() {
  return typeof window !== "undefined"
    ? localStorage.getItem("authToken") ?? ""
    : "";
}

async function scoutGet(path: string) {
  const res = await fetch(`${BASE}${path}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error(`${path} → ${res.status}`);
  return res.json();
}

interface ScoutPlayer {
  playerId?: number;
  fullName?: string;
  position?: string;
  height?: string;
  weight?: string;
  currentTeam?: string;
  imageFileKey?: string | null;
  location?: string;
}

interface ActivityItem {
  id: number;
  message: string;
  date: string;
}

interface NewRequest {
  title: string;
  club: string;
  deadline: string;
}

function extractList(raw: unknown): ScoutPlayer[] {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  const r = raw as Record<string, unknown>;
  if (Array.isArray(r?.data)) return r.data as ScoutPlayer[];
  const obj = r?.data as Record<string, unknown> | undefined;
  if (Array.isArray(obj?.obj)) return obj!.obj as ScoutPlayer[];
  if (Array.isArray(r?.content)) return r.content as ScoutPlayer[];
  console.log(
    "extractList — unrecognized shape:",
    JSON.stringify(raw).slice(0, 300)
  );
  return [];
}

function TaskSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 animate-pulse flex items-center gap-4">
      <div className="w-14 h-14 rounded-full bg-gray-200 shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-36 bg-gray-200 rounded" />
        <div className="h-3 w-48 bg-gray-100 rounded" />
        <div className="h-3 w-32 bg-gray-100 rounded" />
      </div>
      <div className="h-8 w-24 bg-gray-200 rounded-xl shrink-0" />
    </div>
  );
}

function PlayerTaskCard({
  player,
  index,
}: {
  player: ScoutPlayer;
  index: number;
}) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 hover:border-[#0A2342]/20 hover:shadow-md transition-all duration-200 group">
      <div className="flex items-center gap-4">
        <div className="relative shrink-0">
          {player.imageFileKey ? (
            <img
              src={player.imageFileKey}
              alt={player.fullName}
              className="w-14 h-14 rounded-full object-cover border-2 border-gray-100"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0A2342] to-blue-500 flex items-center justify-center text-white font-bold text-xl">
              {player.fullName?.[0]?.toUpperCase() ?? "P"}
            </div>
          )}
          {index % 3 === 1 && (
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 text-sm truncate">
            {player.fullName ?? "Unknown Player"}
          </p>
          <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
            <MapPin size={11} className="shrink-0" />
            <span className="truncate">
              {player.location ?? "TBD"} |{" "}
              {player.currentTeam ?? "Unknown Club"}
            </span>
          </div>
          <div className="flex items-center gap-3 mt-1.5 flex-wrap">
            <span className="flex items-center gap-1 text-[11px] text-gray-400">
              <Calendar size={10} /> Pending evaluation
            </span>
            {player.position && (
              <span className="text-[11px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                {player.position}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] font-medium px-2.5 py-1 rounded-full border bg-amber-50 text-amber-600 border-amber-200">
            Pending
          </span>
          <button className="bg-[#0A2342] text-white text-xs font-semibold px-3 py-2 rounded-xl hover:bg-blue-900 transition whitespace-nowrap">
            Start Report
          </button>
          <button className="text-gray-400 hover:text-gray-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ScoutingPlanPage() {
  const [showModal, setShowModal] = useState(false);
  const [players, setPlayers] = useState<ScoutPlayer[]>([]);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [prospectsCount, setProspectsCount] = useState(0);
  const [newRequest, setNewRequest] = useState<NewRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"Name" | "Date">("Date");
  const loadingRef = useRef(false);

  async function load() {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);

    try {
      const [playersRes, activityRes, prospectsRes] = await Promise.allSettled([
        scoutGet("/profile/scout/getScoutPlayers?limit=20&offset=0"),
        scoutGet("/profile/scout/getActivityFeed?limit=5&offset=0"),
        scoutGet("/profile/scout/getScoutPlayerProspects"),
      ]);

      console.log(
        "Page RAW players:",
        playersRes.status === "fulfilled"
          ? JSON.stringify(playersRes.value).slice(0, 300)
          : playersRes.reason
      );
      console.log(
        "Page RAW activity:",
        activityRes.status === "fulfilled"
          ? JSON.stringify(activityRes.value).slice(0, 300)
          : activityRes.reason
      );
      console.log(
        "Page RAW prospects:",
        prospectsRes.status === "fulfilled"
          ? JSON.stringify(prospectsRes.value).slice(0, 300)
          : prospectsRes.reason
      );

      if (playersRes.status === "fulfilled") {
        setPlayers(extractList(playersRes.value));
      }

      if (activityRes.status === "fulfilled") {
        const list = extractList(activityRes.value);
        setActivity(
          list.map((a: Record<string, unknown>, idx: number) => ({
            id: idx,
            message: String(a.message ?? a.description ?? "Activity recorded"),
            date: String(a.date ?? a.createdAt ?? ""),
          }))
        );
      }

      if (prospectsRes.status === "fulfilled") {
        const raw = prospectsRes.value as Record<string, unknown>;
        const list = extractList(raw);
        const count =
          ((raw?.data as Record<string, unknown>)?.totalCount as number) ??
          list.length;
        setProspectsCount(count);
        if (list.length > 0) {
          const first = list[0];
          setNewRequest({
            title: `${first.position ?? "Player"} — ${
              first.fullName ?? "Prospect"
            }`,
            club: first.currentTeam ?? "Unknown Club",
            deadline: "3 Days",
          });
        } else {
          setNewRequest(null);
        }
      }
    } catch (e) {
      console.error("Page load error:", e);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }

  useEffect(() => {
    load();
    function handleRefresh() {
      load();
    }
    window.addEventListener(SCOUTING_REFRESH_EVENT, handleRefresh);
    return () =>
      window.removeEventListener(SCOUTING_REFRESH_EVENT, handleRefresh);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleTaskSaved() {
    setShowModal(false);
    load();
    window.dispatchEvent(new Event(SCOUTING_REFRESH_EVENT));
  }

  const filtered = players
    .filter((p) => {
      const q = search.toLowerCase();
      return (
        !q ||
        p.fullName?.toLowerCase().includes(q) ||
        p.currentTeam?.toLowerCase().includes(q) ||
        p.location?.toLowerCase().includes(q) ||
        p.position?.toLowerCase().includes(q)
      );
    })
    .sort((a, b) =>
      sortBy === "Name" ? (a.fullName ?? "").localeCompare(b.fullName ?? "") : 0
    );

  const totalReports = 20;
  const progressPct = Math.min((prospectsCount / totalReports) * 100, 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {showModal && (
        <AddTaskForm
          onCancel={() => setShowModal(false)}
          onSave={handleTaskSaved}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Scouting Plan</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Manage your schedule, routes, and scouting assignments.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => load()}
              disabled={loading}
              className="p-2 rounded-xl border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 transition"
              title="Refresh"
            >
              <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 bg-white rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
              <Calendar size={15} /> Calendar View
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#0A2342] text-white rounded-xl text-sm font-semibold hover:bg-blue-900 transition shadow-sm"
            >
              <Plus size={15} /> Add Task
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main */}
          <div className="lg:col-span-2 space-y-5">
            {/* Search */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by player, club, or location..."
                  className="w-full pl-9 pr-9 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0A2342]/20"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>
              <button className="flex items-center gap-1.5 px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition">
                <Filter size={14} />
                <ChevronDown size={13} />
              </button>
            </div>

            {/* New Request Banner */}
            {newRequest && !loading && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full whitespace-nowrap">
                        <Zap size={10} /> NEW REQUEST
                      </span>
                      <span className="text-xs text-gray-500">
                        From Coach Dave
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-base truncate">
                      {newRequest.title}
                    </h3>
                    <p className="text-xs text-gray-600 mt-0.5">
                      High priority for{" "}
                      <span className="font-semibold">{newRequest.club}</span>.
                      Deadline:{" "}
                      <span className="text-red-500 font-semibold">
                        {newRequest.deadline}
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button className="flex items-center gap-1.5 bg-[#0A2342] text-white text-xs font-semibold px-3 py-2 rounded-xl hover:bg-blue-900 transition">
                      <CheckCircle2 size={12} /> Accept
                    </button>
                    <button
                      onClick={() => setNewRequest(null)}
                      className="flex items-center gap-1.5 border border-gray-200 bg-white text-gray-600 text-xs font-medium px-3 py-2 rounded-xl hover:bg-gray-50 transition"
                    >
                      <X size={12} /> Dismiss
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tasks List */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-gray-900 text-sm">
                  Upcoming Tasks{" "}
                  <span className="ml-1.5 text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                    {loading ? "…" : filtered.length}
                  </span>
                </h2>
                <button
                  onClick={() => setSortBy(sortBy === "Date" ? "Name" : "Date")}
                  className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#0A2342] transition"
                >
                  Sort by{" "}
                  <span className="font-semibold text-gray-700 ml-0.5">
                    {sortBy}
                  </span>
                  <ChevronDown size={12} />
                </button>
              </div>

              <div className="space-y-3">
                {loading ? (
                  Array(3)
                    .fill(0)
                    .map((_, i) => <TaskSkeleton key={i} />)
                ) : filtered.length > 0 ? (
                  filtered.map((player, i) => (
                    <PlayerTaskCard
                      key={player.playerId ?? `player-${i}`}
                      player={player}
                      index={i}
                    />
                  ))
                ) : (
                  <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-12 text-center">
                    <div className="text-4xl mb-3">{search ? "🔍" : "📋"}</div>
                    <p className="text-sm font-medium text-gray-600">
                      {search
                        ? `No results for "${search}"`
                        : "No scouting tasks yet"}
                    </p>
                    <p className="text-xs text-gray-400 mt-1 mb-4">
                      {search
                        ? "Try a different name, club, or location"
                        : "Add a task to get started"}
                    </p>
                    {!search && (
                      <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-1.5 mx-auto bg-[#0A2342] text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-blue-900 transition"
                      >
                        <Plus size={13} /> Add Task
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Route */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="flex items-center justify-between px-4 pt-4 pb-2">
                <span className="text-sm font-semibold text-gray-800">
                  Today&apos;s Route
                </span>
                <span className="flex items-center gap-1 text-[11px] text-purple-500 font-medium">
                  <Zap size={11} /> AI Optimized
                </span>
              </div>
              <div className="mx-4 mb-3 h-32 bg-gradient-to-br from-slate-100 to-gray-200 rounded-xl flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <MapPin size={22} className="mx-auto mb-1 opacity-40" />
                  <span className="text-xs opacity-60">
                    Interactive Map View
                  </span>
                </div>
              </div>
              <div className="mx-4 mb-4 bg-purple-50 rounded-xl p-3 flex gap-2.5 items-start">
                <div className="mt-0.5 p-1.5 bg-purple-100 rounded-lg shrink-0">
                  <TrendingUp size={13} className="text-purple-500" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-800">
                    Efficiency Insight
                  </p>
                  <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                    {filtered.length > 1
                      ? `${filtered.length} tasks scheduled. Group nearby venues to save travel time.`
                      : "Add more tasks to get route optimisation suggestions."}
                  </p>
                </div>
              </div>
              <div className="px-4 pb-4">
                <button className="w-full text-sm font-semibold text-[#0A2342] border border-[#0A2342]/20 rounded-xl py-2.5 hover:bg-[#0A2342]/5 transition flex items-center justify-center gap-1.5">
                  Apply Optimized Route →
                </button>
              </div>
            </div>

            {/* Monthly Targets */}
            <div className="bg-[#0A2342] rounded-2xl p-5 text-white">
              <div className="flex items-center gap-2 mb-3">
                <FileText size={15} className="text-blue-300" />
                <span className="text-sm font-semibold">Monthly Targets</span>
              </div>
              <div className="flex items-end gap-1.5 mb-1">
                <span className="text-4xl font-bold">{prospectsCount}</span>
                <span className="text-blue-300 text-sm mb-1.5">
                  / {totalReports} Reports Filed
                </span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2 mb-3">
                <div
                  className="bg-blue-400 h-2 rounded-full transition-all duration-700"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <p className="text-blue-200 text-xs">
                {prospectsCount >= totalReports
                  ? "🎉 Monthly target reached!"
                  : "You are on track! Keep scouting to hit your target."}
              </p>
            </div>

            {/* Activity */}
            {activity.length > 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-3">
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {activity.map((item) => (
                    <div key={item.id} className="flex gap-2.5 items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs text-gray-700 leading-relaxed">
                          {item.message}
                        </p>
                        {item.date && (
                          <p className="text-[10px] text-gray-400 mt-0.5">
                            {item.date}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              !loading && (
                <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-4 text-center">
                  <p className="text-xs text-gray-400">
                    Activity will appear here as you scout players.
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
