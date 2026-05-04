"use client";

import { useState, useEffect } from "react";
import { AllPlayersFilterIcon } from "../ScoutIcons";
import Link from "next/link";
import { Search, Loader2 } from "lucide-react";

const BASE_URL = "https://scoutflair.top";

function getToken() {
  return localStorage.getItem("authToken") || "";
}

async function getImageUrl(fileKey: string): Promise<string> {
  if (!fileKey) return "";
  try {
    const res = await fetch(
      `${BASE_URL}/scoutflair/v1/storage/presign-download/${fileKey}`,
      { headers: { Authorization: `Bearer ${getToken()}` } }
    );
    const data = await res.json();
    return data?.url || data?.presignedUrl || data?.downloadUrl || "";
  } catch {
    return "";
  }
}

interface Player {
  id: string;
  name: string;
  position: string;
  number: number;
  AGE: string;
  countryFlag: string;
  cm: number;
  lb: string;
  image: string;
  email: string;
}

function getCountryCode(nationality: string): string {
  const map: Record<string, string> = {
    Nigerian: "ng",
    Ghanaian: "gh",
    Senegalese: "sn",
    American: "us",
    Brazilian: "br",
    Portuguese: "pt",
    Spanish: "es",
    Egyptian: "eg",
    Turkish: "tr",
    Croatian: "hr",
    German: "de",
    Irish: "ie",
    Argentine: "ar",
    French: "fr",
    English: "gb-eng",
    "South African": "za",
    Ivorian: "ci",
    Cameroonian: "cm",
    Kenyan: "ke",
    Moroccan: "ma",
    Algerian: "dz",
    Tunisian: "tn",
    Malian: "ml",
    Burkinabe: "bf",
  };
  return map[nationality] || "un";
}

function getAge(dob: string): string {
  if (!dob) return "N/A";
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return `${age} years`;
}

function CountryFlag({ code }: { code: string }) {
  return (
    <img
      src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`}
      alt={code.toUpperCase()}
      width={24}
      height={16}
      style={{ display: "inline-block", borderRadius: 2, objectFit: "cover" }}
    />
  );
}

type SearchContainerProps = {
  query: string;
  onQueryChange: (query: string) => void;
};

const SearchContainer = ({ query, onQueryChange }: SearchContainerProps) => (
  <div className="relative flex-grow">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
    <input
      type="text"
      placeholder="Search for players"
      value={query}
      onChange={(e) => onQueryChange(e.target.value)}
      className="bg-gray-50 rounded-lg border pl-9 sm:pl-10 pr-4 py-2 w-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
    />
  </div>
);

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

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

        const data = await res.json();

        const mapped: Player[] = await Promise.all(
          data.map(async (p: any) => {
            const imageUrl = p.imageFileKey
              ? await getImageUrl(p.imageFileKey)
              : "";
            return {
              id: String(p.playerId),
              name: p.fullName || "Unknown",
              position: p.position || "Unknown",
              number: parseInt(p.jerseyNumber) || 0,
              AGE: getAge(p.dob),
              countryFlag: getCountryCode(p.nationality),
              cm: parseInt(p.height) || 0,
              lb: p.weight || "0",
              image: imageUrl,
              email: p.email || "",
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

  const sortedPlayers = [...players]
    .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      const q = searchQuery.toLowerCase();
      if (!q) return 0;
      const aM = a.name.toLowerCase().startsWith(q);
      const bM = b.name.toLowerCase().startsWith(q);
      if (aM && !bM) return -1;
      if (!aM && bM) return 1;
      return 0;
    });

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Available Players</h1>
      </div>

      <div className="flex items-center gap-4">
        <SearchContainer query={searchQuery} onQueryChange={setSearchQuery} />
        <AllPlayersFilterIcon />
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
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

      {/* Players Grid */}
      {!loading && !error && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
          {sortedPlayers.map((player) => (
            <div
              key={player.id}
              className="bg-white shadow rounded-[8px] flex gap-4 p-4 items-center"
            >
              <div className="flex-shrink-0">
                <img
                  src={
                    player.image ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      player.name
                    )}&size=150&background=fed7aa&color=7c2d12&bold=true`
                  }
                  alt={player.name}
                  className="rounded-full w-24 h-24 object-cover border-2 border-orange-300"
                  onError={(e) => {
                    const t = e.target as HTMLImageElement;
                    t.onerror = null;
                    t.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      player.name
                    )}&size=150&background=fed7aa&color=7c2d12&bold=true`;
                  }}
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h1 className="text-base sm:text-lg font-bold">
                    {player.name}
                  </h1>
                  <div className="pt-1 pr-2">
                    <CountryFlag code={player.countryFlag} />
                  </div>
                </div>
                <div className="flex gap-1 flex-wrap text-xs text-gray-600">
                  <span>{player.position},</span>
                  <span>No. {player.number || "—"}</span>
                </div>
                <p className="text-sm text-gray-700">AGE: {player.AGE}</p>
                {(player.cm > 0 || player.lb !== "0") && (
                  <div className="flex gap-2 text-xs text-gray-600">
                    {player.cm > 0 && <span>{player.cm}cm</span>}
                    {player.lb !== "0" && <span>{player.lb}lb</span>}
                  </div>
                )}
                <Link href={`/signin/scout/dashboard/profile/${player.id}`}>
                  <button className="mt-2 border border-orange-300 rounded-full px-3 py-1 text-xs text-gray-600 hover:bg-orange-50 transition">
                    View profile
                  </button>
                </Link>
              </div>
            </div>
          ))}

          {sortedPlayers.length === 0 && (
            <p className="col-span-full text-center text-gray-500 mt-8">
              No players found.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
