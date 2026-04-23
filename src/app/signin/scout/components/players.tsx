"use client";

import { useState } from "react";
import { playersData } from "@/lib/data";
import Link from "next/link";
import { Search, SlidersHorizontal, X } from "lucide-react";

// ── Country flag using flagcdn.com ───────────────────────────────────────────
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

// ── Search bar ───────────────────────────────────────────────────────────────
type SearchContainerProps = {
  query: string;
  onQueryChange: (query: string) => void;
};

const SearchContainer = ({ query, onQueryChange }: SearchContainerProps) => (
  <div className="relative flex-grow">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
    <input
      type="text"
      placeholder="Search for players"
      value={query}
      onChange={(e) => onQueryChange(e.target.value)}
      className="bg-gray-50 rounded-lg border pl-9 sm:pl-10 pr-4 py-2 w-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition-colors"
    />
  </div>
);

// ── Positions list ───────────────────────────────────────────────────────────
const ALL_POSITIONS = Array.from(
  new Set(playersData.map((p) => p.position))
).sort();

// ── Filter panel ─────────────────────────────────────────────────────────────
type FilterPanelProps = {
  open: boolean;
  onClose: () => void;
  selectedPositions: string[];
  onTogglePosition: (pos: string) => void;
  ageRange: [number, number];
  onAgeChange: (range: [number, number]) => void;
  onClear: () => void;
};

const FilterPanel = ({
  open,
  onClose,
  selectedPositions,
  onTogglePosition,
  ageRange,
  onAgeChange,
  onClear,
}: FilterPanelProps) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative z-10 bg-white w-80 h-full shadow-2xl flex flex-col p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">Filter Players</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">
            Position
          </h3>
          <div className="flex flex-col gap-2 max-h-64 overflow-y-auto pr-1">
            {ALL_POSITIONS.map((pos) => (
              <label
                key={pos}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedPositions.includes(pos)}
                  onChange={() => onTogglePosition(pos)}
                  className="accent-orange-400 w-4 h-4"
                />
                <span className="text-sm text-gray-700 group-hover:text-orange-500 transition-colors">
                  {pos}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">
            Age Range: {ageRange[0]}–{ageRange[1]} yrs
          </h3>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500 w-6">Min</span>
              <input
                type="range"
                min={18}
                max={40}
                step={1}
                value={ageRange[0]}
                onChange={(e) =>
                  onAgeChange([
                    Math.min(Number(e.target.value), ageRange[1] - 1),
                    ageRange[1],
                  ])
                }
                className="w-full accent-orange-400"
              />
              <span className="text-xs font-medium w-6">{ageRange[0]}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500 w-6">Max</span>
              <input
                type="range"
                min={18}
                max={40}
                step={1}
                value={ageRange[1]}
                onChange={(e) =>
                  onAgeChange([
                    ageRange[0],
                    Math.max(Number(e.target.value), ageRange[0] + 1),
                  ])
                }
                className="w-full accent-orange-400"
              />
              <span className="text-xs font-medium w-6">{ageRange[1]}</span>
            </div>
          </div>
        </div>

        <div className="mt-auto flex gap-3">
          <button
            onClick={onClear}
            className="flex-1 border border-orange-300 rounded-full py-2 text-sm text-gray-600 hover:bg-orange-50 transition"
          >
            Clear
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-orange-400 text-white rounded-full py-2 text-sm font-medium hover:bg-orange-500 transition"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Player avatar with fallback ──────────────────────────────────────────────
function PlayerAvatar({ src, name }: { src: string; name: string }) {
  const fallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&size=150&background=fed7aa&color=7c2d12&bold=true`;

  return (
    <img
      src={src}
      alt={name}
      width={96}
      height={96}
      className="rounded-full w-24 h-24 object-cover border-2 border-orange-300"
      referrerPolicy="no-referrer"
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.onerror = null; // prevent infinite loop
        target.src = fallback;
      }}
    />
  );
}

// ── Main page ────────────────────────────────────────────────────────────────
export default function PlayersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  const [ageRange, setAgeRange] = useState<[number, number]>([18, 40]);

  const togglePosition = (pos: string) =>
    setSelectedPositions((prev) =>
      prev.includes(pos) ? prev.filter((p) => p !== pos) : [...prev, pos]
    );

  const clearFilters = () => {
    setSelectedPositions([]);
    setAgeRange([18, 40]);
  };

  const activeFilterCount =
    selectedPositions.length +
    (ageRange[0] !== 18 || ageRange[1] !== 40 ? 1 : 0);

  const filteredPlayers = playersData
    .filter((player) => {
      const matchesSearch = player.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesPosition =
        selectedPositions.length === 0 ||
        selectedPositions.includes(player.position);
      const age = parseInt(player.AGE);
      const matchesAge = age >= ageRange[0] && age <= ageRange[1];
      return matchesSearch && matchesPosition && matchesAge;
    })
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
    <>
      <FilterPanel
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        selectedPositions={selectedPositions}
        onTogglePosition={togglePosition}
        ageRange={ageRange}
        onAgeChange={setAgeRange}
        onClear={clearFilters}
      />

      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Available Players</h1>
          {activeFilterCount > 0 && (
            <span className="text-xs text-orange-500 font-medium">
              {activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""}{" "}
              active
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <SearchContainer query={searchQuery} onQueryChange={setSearchQuery} />
          <button
            onClick={() => setFilterOpen(true)}
            className="relative flex-shrink-0 bg-[#1a3a5c] text-white rounded-lg p-2.5 hover:bg-[#254d7a] transition"
            aria-label="Open filters"
          >
            <SlidersHorizontal className="w-5 h-5" />
            {activeFilterCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-orange-400 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
          {filteredPlayers.map((player) => (
            <div
              key={player.id}
              className="bg-white shadow rounded-lg flex gap-4 p-4 items-center hover:shadow-md transition-shadow"
            >
              <div className="flex-shrink-0">
                <PlayerAvatar src={player.image} name={player.name} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <h2 className="text-base sm:text-lg font-bold truncate">
                    {player.name}
                  </h2>
                  <div className="flex-shrink-0 pt-0.5">
                    <CountryFlag code={player.countryFlag} />
                  </div>
                </div>
                <div className="flex gap-1 flex-wrap text-xs text-gray-600">
                  <span>{player.position},</span>
                  <span>No. {player.number}</span>
                </div>
                <p className="text-sm text-gray-700">AGE: {player.AGE}</p>
                <div className="flex gap-2 text-xs text-gray-600">
                  <span>{player.cm}cm</span>
                  <span>{player.lb}lb</span>
                </div>
                <Link href={`/signin/scout/dashboard/profile/${player.id}`}>
                  <button className="mt-2 border border-orange-300 rounded-full px-3 py-1 text-xs text-gray-600 hover:bg-orange-50 transition">
                    View profile
                  </button>
                </Link>
              </div>
            </div>
          ))}

          {filteredPlayers.length === 0 && (
            <p className="col-span-full text-center text-gray-500 mt-8">
              No players found.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
