"use client";
import { useState } from "react";
import { AllPlayersIcon, FilterIcon } from "../ScoutIcons";
import PlayerCard from "./playerCard";
import Link from "next/link";
import { X, ChevronDown } from "lucide-react";

const players = [
  {
    name: "Adams",
    surname: "Taylor",
    age: 17,
    nationality: "Nigerian",
    flag: "🇳🇬",
    position: "Midfielder",
    number: 3,
    image: "/images/allpone.png",
  },
  {
    name: "Emeka",
    surname: "Okafor",
    age: 19,
    nationality: "Nigerian",
    flag: "🇳🇬",
    position: "Striker",
    number: 9,
    image: "/images/EmekaO.png",
  },
  {
    name: "Kwame",
    surname: "Mensah",
    age: 20,
    nationality: "Ghanaian",
    flag: "🇬🇭",
    position: "Defender",
    number: 5,
    image: "/images/Kwame.png",
  },
  {
    name: "Yusuf",
    surname: "Bello",
    age: 18,
    nationality: "Nigerian",
    flag: "🇳🇬",
    position: "Winger",
    number: 11,
    image: "/images/Bello.png",
  },
  {
    name: "Kofi",
    surname: "Asante",
    age: 21,
    nationality: "Ghanaian",
    flag: "🇬🇭",
    position: "Goalkeeper",
    number: 1,
    image: "/images/Asante.png",
  },
  {
    name: "Chidi",
    surname: "Nwosu",
    age: 17,
    nationality: "Nigerian",
    flag: "🇳🇬",
    position: "Midfielder",
    number: 8,
    image: "/images/Nwosu.png",
  },
  {
    name: "Segun",
    surname: "Adeyemi",
    age: 22,
    nationality: "Nigerian",
    flag: "🇳🇬",
    position: "Defender",
    number: 4,
    image: "/images/Adeyemi.png",
  },
  {
    name: "Moussa",
    surname: "Diallo",
    age: 19,
    nationality: "Senegalese",
    flag: "🇸🇳",
    position: "Striker",
    number: 10,
    image: "/images/Diallo.png",
  },
];

const positions = [
  "All",
  ...Array.from(new Set(players.map((p) => p.position))),
];

type Player = (typeof players)[0];

function PlayerDetailModal({
  player,
  onClose,
}: {
  player: Player;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
        {/* Hero */}
        <div className="relative bg-gradient-to-br from-[#0A2342] to-blue-700 p-6 text-white text-center">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
          >
            <X size={16} />
          </button>
          <img
            src={player.image}
            alt={player.name}
            className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-white/30 object-cover bg-white/10"
          />
          <h2 className="text-xl font-bold">
            {player.name} {player.surname}
          </h2>
          <p className="text-blue-200 text-sm">{player.position}</p>
        </div>

        {/* Stats */}
        <div className="p-5 space-y-3">
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { label: "Number", value: `#${player.number}` },
              { label: "Age", value: player.age },
              { label: "Nationality", value: player.flag },
            ].map((stat) => (
              <div key={stat.label} className="bg-gray-50 rounded-xl p-3">
                <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 rounded-xl p-3 text-sm text-gray-700">
            <span className="font-medium">Nationality:</span>{" "}
            {player.nationality} {player.flag}
          </div>
          <div className="flex gap-2 pt-1">
            <button className="flex-1 py-2.5 bg-[#0A2342] text-white text-sm font-semibold rounded-xl hover:bg-blue-800 transition-colors">
              Start Report
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 border border-gray-200 text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AllPlayers() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const filtered =
    activeFilter === "All"
      ? players
      : players.filter((p) => p.position === activeFilter);

  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
      {/* Detail Modal */}
      {selectedPlayer && (
        <PlayerDetailModal
          player={selectedPlayer}
          onClose={() => setSelectedPlayer(null)}
        />
      )}

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

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-6">
        {filtered.length > 0 ? (
          filtered.map((player, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedPlayer(player)}
              className="cursor-pointer hover:scale-[1.02] transition-transform"
            >
              <PlayerCard {...player} />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-400 text-sm">
            No players found for "{activeFilter}".
          </div>
        )}
      </div>

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
