"use client";
import { useState, useEffect, useRef } from "react";
import { Star, RefreshCw } from "lucide-react";
import AddTaskForm from "./addNewTask";

export const SCOUTING_REFRESH_EVENT = "scoutingDataRefresh";

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
}

interface ScoutProfile {
  fullName?: string;
  imageFileKey?: string | null;
}

function extractList(raw: unknown): ScoutPlayer[] {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  const r = raw as Record<string, unknown>;
  if (Array.isArray(r?.data)) return r.data as ScoutPlayer[];
  const obj = r?.data as Record<string, unknown> | undefined;
  if (Array.isArray(obj?.obj)) return obj!.obj as ScoutPlayer[];
  if (Array.isArray(r?.content)) return r.content as ScoutPlayer[];
  // Log so we can see the actual shape
  console.log(
    "extractList — unrecognized shape:",
    JSON.stringify(raw).slice(0, 300)
  );
  return [];
}

const NaijaImg = () => (
  <svg width="18" height="13" viewBox="0 0 18 13" fill="none">
    <path
      d="M2.8125 0.3125C0.948656 0.3125 0 1.69766 0 3.40625V9.59375C0 11.3023 0.948656 12.6875 2.8125 12.6875H6.1875V0.3125H2.8125ZM15.1875 0.3125H11.8125V12.6875H15.1875C17.0513 12.6875 18 11.3023 18 9.59375V3.40625C18 1.69766 17.0513 0.3125 15.1875 0.3125Z"
      fill="#128807"
    />
  </svg>
);

function SkeletonCard() {
  return (
    <div className="bg-gray-50 w-full rounded-lg p-2 sm:p-3 text-center border border-gray-200 animate-pulse">
      <div className="h-3 w-20 bg-gray-200 rounded mx-auto mb-2" />
      <div className="mx-auto mb-2 rounded-md w-16 h-20 sm:w-20 sm:h-24 bg-gray-200" />
      <div className="flex justify-center gap-0.5 mb-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-2.5 h-2.5 bg-gray-200 rounded" />
        ))}
      </div>
      <div className="h-3 w-16 bg-gray-200 rounded mx-auto mb-1" />
      <div className="h-2.5 w-12 bg-gray-100 rounded mx-auto" />
    </div>
  );
}

export default function ScoutingPlanWidget() {
  const [showModal, setShowModal] = useState(false);
  const [players, setPlayers] = useState<ScoutPlayer[]>([]);
  const [prospects, setProspects] = useState<ScoutPlayer[]>([]);
  const [profile, setProfile] = useState<ScoutProfile | null>(null);
  const [fetching, setFetching] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  // Use ref to prevent stale closure / infinite loop
  const loadingRef = useRef(false);

  async function load() {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setFetching(true);
    setFetchError(null);

    try {
      const [profileRes, playersRes, prospectsRes] = await Promise.allSettled([
        scoutGet("/profile/scout/getScoutProfile"),
        scoutGet("/profile/scout/getScoutPlayers?limit=4&offset=0"),
        scoutGet("/profile/scout/getScoutPlayerProspects"),
      ]);

      console.log(
        "Widget RAW profile:",
        profileRes.status === "fulfilled"
          ? JSON.stringify(profileRes.value).slice(0, 300)
          : profileRes.reason
      );
      console.log(
        "Widget RAW players:",
        playersRes.status === "fulfilled"
          ? JSON.stringify(playersRes.value).slice(0, 300)
          : playersRes.reason
      );
      console.log(
        "Widget RAW prospects:",
        prospectsRes.status === "fulfilled"
          ? JSON.stringify(prospectsRes.value).slice(0, 300)
          : prospectsRes.reason
      );

      if (profileRes.status === "fulfilled") {
        const raw = profileRes.value;
        // Profile might be nested under data or at root
        const p = raw?.data?.obj ?? raw?.data ?? raw;
        setProfile(p ?? null);
      }

      if (playersRes.status === "fulfilled") {
        setPlayers(extractList(playersRes.value).slice(0, 4));
      }

      if (prospectsRes.status === "fulfilled") {
        setProspects(extractList(prospectsRes.value).slice(0, 3));
      }
    } catch (e) {
      console.error("Widget load error:", e);
      setFetchError("Failed to load scouting data.");
    } finally {
      setFetching(false);
      loadingRef.current = false;
    }
  }

  // Run once on mount only — no dependency array tricks
  useEffect(() => {
    load();

    function handleRefresh() {
      load();
    }
    window.addEventListener(SCOUTING_REFRESH_EVENT, handleRefresh);
    return () =>
      window.removeEventListener(SCOUTING_REFRESH_EVENT, handleRefresh);
    // eslint-disable-next-line react-hooks/exhaustive-deps

    // Add this temporarily anywhere in scoutingPlanWidget.tsx useEffect
useEffect(() => {
  const token = localStorage.getItem("authToken");
  fetch("https://scoutflair.top/api/v1/profile/scout/getScoutPlayers?limit=4&offset=0", {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(r => r.json())
    .then(d => console.log("RAW getScoutPlayers:", JSON.stringify(d, null, 2)))
    .catch(e => console.error("RAW error:", e));
  
  fetch("https://scoutflair.top/api/v1/profile/scout/getScoutPlayerProspects", {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(r => r.json())
    .then(d => console.log("RAW getProspects:", JSON.stringify(d, null, 2)))
    .catch(e => console.error("RAW error:", e));

  fetch("https://scoutflair.top/api/v1/profile/scout/getScoutProfile", {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(r => r.json())
    .then(d => console.log("RAW getProfile:", JSON.stringify(d, null, 2)))
    .catch(e => console.error("RAW error:", e));
}, []);

  }, []);

  function handleTaskSaved() {
    setShowModal(false);
    load();
    window.dispatchEvent(new Event(SCOUTING_REFRESH_EVENT));
  }

  const profileInitial = profile?.fullName?.[0]?.toUpperCase() ?? "S";

  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center gap-2">
          <svg width="20" height="21" viewBox="0 0 20 21" fill="none">
            <path
              d="M14.1874 3.02833L13.3916 2.81583C11.1416 2.21583 10.0166 1.91666 9.13074 2.42583C8.24408 2.93416 7.94241 4.05333 7.33908 6.29L6.48741 9.45416C5.88408 11.6917 5.58241 12.81 6.09491 13.6917C6.60658 14.5725 7.73158 14.8725 9.98158 15.4717L10.7766 15.6842C13.0266 16.2842 14.1516 16.5833 15.0382 16.0742C15.9241 15.5658 16.2257 14.4467 16.8282 12.21L17.6807 9.04583C18.2841 6.80833 18.5849 5.69 18.0732 4.80833C17.5616 3.92666 16.4382 3.6275 14.1874 3.02833Z"
              stroke="#222"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.0003 17.955L9.20701 18.1717C6.96201 18.7825 5.84035 19.0883 4.95535 18.5692C4.07201 18.0508 3.77035 16.9108 3.16951 14.6292L2.31868 11.4025C1.71701 9.12167 1.41618 7.98084 1.92701 7.0825C2.36868 6.305 3.33368 6.33334 4.58368 6.33334M14.0453 6.69417C14.0453 7.3725 13.492 7.9225 12.8095 7.9225C12.1278 7.9225 11.5745 7.3725 11.5745 6.69417C11.5745 6.01584 12.1278 5.46584 12.8095 5.46584C13.4928 5.46584 14.0453 6.01584 14.0453 6.69417Z"
              stroke="#222"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Scouting Plan
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => load()}
            disabled={fetching}
            className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition"
            title="Refresh"
          >
            <RefreshCw size={14} className={fetching ? "animate-spin" : ""} />
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="text-gray-900 border border-black font-semibold px-3 py-2 rounded-md text-xs sm:text-sm hover:bg-blue-700 hover:text-white transition"
          >
            Add Task
          </button>
        </div>
      </div>

      {showModal && (
        <AddTaskForm
          onCancel={() => setShowModal(false)}
          onSave={handleTaskSaved}
        />
      )}

      {/* Scout Profile */}
      <div className="flex items-center mb-4 gap-2.5">
        {profile?.imageFileKey ? (
          <img
            src={profile.imageFileKey}
            alt={profile.fullName}
            className="rounded-full w-9 h-9 sm:w-10 sm:h-10 object-cover border border-gray-200"
          />
        ) : (
          <div className="rounded-full w-9 h-9 sm:w-10 sm:h-10 bg-[#0A2342] flex items-center justify-center text-white text-sm font-bold shrink-0">
            {profileInitial}
          </div>
        )}
        <p className="text-sm font-medium text-gray-800">
          {profile?.fullName ?? "—"}
        </p>
      </div>

      {fetchError && (
        <div className="mb-3 text-xs text-red-500 bg-red-50 rounded-lg px-3 py-2">
          {fetchError}
        </div>
      )}

      {/* Player Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
        {fetching ? (
          Array(4)
            .fill(0)
            .map((_, i) => <SkeletonCard key={i} />)
        ) : players.length > 0 ? (
          players.map((player, i) => (
            <div
              key={player.playerId ?? i}
              className="bg-[rgba(255,250,250,1)] w-full sm:max-w-[151px] rounded-lg p-2 sm:p-3 text-center border border-gray-300"
            >
              <div className="flex justify-center items-center gap-1 text-[10px] sm:text-xs font-medium text-green-600 mb-2">
                <span className="truncate max-w-[80px]">
                  {player.currentTeam ?? "—"}
                </span>
                <NaijaImg />
              </div>
              {player.imageFileKey ? (
                <img
                  src={player.imageFileKey}
                  alt={player.fullName}
                  className="mx-auto mb-2 rounded-md w-16 h-20 sm:w-20 sm:h-24 object-cover"
                />
              ) : (
                <div className="mx-auto mb-2 rounded-md w-16 h-20 sm:w-20 sm:h-24 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-2xl">
                  👤
                </div>
              )}
              <div className="flex justify-center mb-1">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    size={11}
                    className="text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
              <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                {player.fullName ?? "Unknown"}
              </p>
              <p className="text-[10px] sm:text-xs text-gray-700">
                {player.position ?? "—"}
              </p>
              {(player.height || player.weight) && (
                <p className="text-[10px] sm:text-xs text-gray-500">
                  {player.height ? `H ${player.height}` : ""}
                  {player.height && player.weight ? " • " : ""}
                  {player.weight ? `W ${player.weight}` : ""}
                </p>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-4 flex flex-col items-center justify-center py-8 text-center">
            <div className="text-4xl mb-2">🔍</div>
            <p className="text-sm font-medium text-gray-600">
              No players tracked yet
            </p>
            <p className="text-xs text-gray-400 mt-1 mb-3">
              Add a scouting task to start tracking players
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="text-xs font-semibold text-white bg-[#0A2342] px-3 py-1.5 rounded-lg hover:bg-blue-900 transition"
            >
              + Add Task
            </button>
          </div>
        )}
      </div>

      {/* Top 3 Players */}
      <h4 className="text-sm sm:text-base font-semibold mb-2 text-gray-800">
        Top 3 Players
      </h4>
      <div className="flex flex-wrap gap-2 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {fetching ? (
          Array(3)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-2 p-2 rounded-lg border border-gray-200 w-full animate-pulse"
              >
                <div className="rounded-full w-8 h-8 bg-gray-200 shrink-0" />
                <div className="flex-1 space-y-1">
                  <div className="h-3 w-20 bg-gray-200 rounded" />
                  <div className="h-2.5 w-14 bg-gray-100 rounded" />
                </div>
              </div>
            ))
        ) : prospects.length > 0 ? (
          prospects.map((p, i) => (
            <div
              key={p.playerId ?? i}
              className="bg-[rgba(255,250,250,1)] flex items-center gap-2 p-2 rounded-lg border border-gray-300 w-full sm:max-w-[220px]"
            >
              {p.imageFileKey ? (
                <img
                  src={p.imageFileKey}
                  alt={p.fullName}
                  className="rounded-full w-8 h-8 object-cover shrink-0"
                />
              ) : (
                <div className="rounded-full w-8 h-8 bg-[#0A2342] flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {p.fullName?.[0]?.toUpperCase() ?? "P"}
                </div>
              )}
              <NaijaImg />
              <div className="min-w-0 ml-0.5">
                <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
                  {p.fullName ?? "—"}
                </p>
                <p className="text-[10px] sm:text-xs text-gray-500">
                  {p.position ?? "—"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-xs text-gray-400 col-span-3">
            No prospects added yet.
          </p>
        )}
      </div>
    </div>
  );
}
