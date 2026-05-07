"use client";

import { useState, useEffect } from "react";
import { AllPlayersIcon, FilterIcon } from "../ScoutIcons";
import PlayerCard from "./playerCard";
import Link from "next/link";
import { X, ChevronDown, Loader2 } from "lucide-react";

const BASE_URL = "https://scoutflair.top";

function getToken() {
  return localStorage.getItem("authToken") || "";
}

async function getImageUrl(fileKey: string): Promise<string> {
  if (!fileKey || fileKey.trim() === "") return "";
  try {
    const res = await fetch(
      `${BASE_URL}/scoutflair/v1/storage/presign-download/${fileKey}`,
      { headers: { Authorization: `Bearer ${getToken()}` } }
    );
    const data = await res.json();
    return data?.presignedUrl || "";
  } catch {
    return "";
  }
}

type ApiPlayer = {
  playerId: number;
  fullName: string;
  position: string;
  jerseyNumber: string;
  nationality: string;
  imageFileKey: string;
  height: string;
  weight: string;
  dob: string;
  email: string;
};

type Player = {
  id: number;
  name: string;
  surname: string;
  age: number;
  nationality: string;
  flag: string;
  position: string;
  number: number;
  image: string;
  email: string;
};

function getFlagEmoji(nationality: string): string {
  const flags: Record<string, string> = {
    Nigerian: "🇳🇬",
    Ghanaian: "🇬🇭",
    Senegalese: "🇸🇳",
    American: "🇺🇸",
    Brazilian: "🇧🇷",
    Portuguese: "🇵🇹",
    Spanish: "🇪🇸",
    Egyptian: "🇪🇬",
    Turkish: "🇹🇷",
    Croatian: "🇭🇷",
    German: "🇩🇪",
    Irish: "🇮🇪",
    Argentine: "🇦🇷",
    French: "🇫🇷",
    English: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    "South African": "🇿🇦",
    Ivorian: "🇨🇮",
    Cameroonian: "🇨🇲",
  };
  return flags[nationality] || "🌍";
}

function getAge(dob: string): number {
  if (!dob) return 0;
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

function getFirstAndSurname(fullName: string): {
  name: string;
  surname: string;
} {
  const parts = (fullName || "").trim().split(" ");
  const name = parts[0] || "";
  const surname = parts.slice(1).join(" ") || "";
  return { name, surname };
}

export default function AllPlayers() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    async function fetchPlayers() {
      setLoading(true);
      setError("");
      try {
        const token = getToken();
        const res = await fetch(
          `${BASE_URL}/api/v1/profile/scout/getPlayers?limit=50&offset=0`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!res.ok) throw new Error(`Failed to fetch players (${res.status})`);

        const data: ApiPlayer[] = await res.json();

        const mapped = await Promise.all(
          data.map(async (p) => {
            const imageUrl =
              p.imageFileKey && p.imageFileKey.trim() !== ""
                ? await getImageUrl(p.imageFileKey)
                : "";
            const { name, surname } = getFirstAndSurname(p.fullName);
            return {
              id: p.playerId,
              name,
              surname,
              age: getAge(p.dob),
              nationality: p.nationality || "Unknown",
              flag: getFlagEmoji(p.nationality || ""),
              position: p.position || "Unknown",
              number: parseInt(p.jerseyNumber) || 0,
              image: imageUrl,
              email: p.email,
            };
          })
        );

        setPlayers(mapped);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchPlayers();
  }, []);

  const positions = [
    "All",
    ...Array.from(new Set(players.map((p) => p.position))),
  ];

  const filtered =
    activeFilter === "All"
      ? players
      : players.filter((p) => p.position === activeFilter);

  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold flex items-center gap-2">
          <AllPlayersIcon /> All Players
          <span className="text-xs font-normal text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
            {filtered.length}
          </span>
        </h1>

        {/* Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            disabled={loading}
            className={`flex items-center gap-2 px-4 py-2 border rounded-lg shadow-sm hover:bg-gray-50 transition-colors ${
              activeFilter !== "All"
                ? "border-blue-300 bg-blue-50 text-blue-700"
                : ""
            }`}
          >
            <FilterIcon />
            <span className="text-gray-500 text-sm">
              {activeFilter !== "All" ? activeFilter : "Filter"}
            </span>
            <ChevronDown
              size={14}
              className={`text-gray-400 transition-transform ${
                filterOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {filterOpen && (
            <div className="absolute right-0 top-11 bg-white border border-gray-200 rounded-xl shadow-lg z-20 w-44 py-1 overflow-hidden">
              {positions.map((pos) => (
                <button
                  key={pos}
                  onClick={() => {
                    setActiveFilter(pos);
                    setFilterOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                    activeFilter === pos
                      ? "font-semibold text-[#0A2342]"
                      : "text-gray-600"
                  }`}
                >
                  {pos}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Active filter badge */}
      {activeFilter !== "All" && (
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs text-gray-500">Filtering by:</span>
          <span className="flex items-center gap-1 text-xs font-medium bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
            {activeFilter}
            <button
              onClick={() => setActiveFilter("All")}
              className="ml-1 hover:text-blue-900"
            >
              <X size={11} />
            </button>
          </span>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-400">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-sm">Loading players...</p>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="text-center py-12 text-red-500 text-sm">
          <p>⚠️ {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 text-xs underline text-gray-500 hover:text-gray-700"
          >
            Try again
          </button>
        </div>
      )}

      {/* Grid — PlayerCard handles its own modals now */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-6">
          {filtered.length > 0 ? (
            filtered.map((player) => <PlayerCard key={player.id} {...player} />)
          ) : (
            <div className="col-span-full text-center py-12 text-gray-400 text-sm">
              No players found for "{activeFilter}".
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-center mt-10">
        <Link href="/signin/scout/dashboard">
          <button className="px-6 py-2 border rounded-lg shadow-sm hover:bg-gray-100 transition-colors text-sm">
            ← Return to Menu
          </button>
        </Link>
      </div>
    </div>
  );
}
