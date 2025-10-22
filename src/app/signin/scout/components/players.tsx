"use client";

import { useState } from "react";
import { playersData } from "@/lib/data"; // Adjust path if needed
import { NaijaImg, AllPlayersFilterIcon} from  "../ScoutIcons" // 1. Use your custom filter icon
import Link from "next/link";
import { Search } from "lucide-react"; 

// Define the PlayerData interface for type safety
interface PlayerData {
  id: string;
  name: string;
  position: string;
  number: number;
  AGE: string;
  countryFlag: string;
  cm: number;
  lb: string;
  image: string;
}

// --- SearchContainer component is defined inside this file ---
type SearchContainerProps = {
  query: string;
  onQueryChange: (query: string) => void;
};

const SearchContainer = ({ query, onQueryChange }: SearchContainerProps) => {
  return (
    // Adjusted to be part of a flex container
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
};

// --- Main Page Component ---
export default function PlayersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Sorting logic to rank matching players at the top
  const sortedPlayers = [...playersData].sort((a, b) => {
    const query = searchQuery.toLowerCase();
    if (!query) return 0;

    const aMatches = a.name.toLowerCase().includes(query);
    const bMatches = b.name.toLowerCase().includes(query);

    if (aMatches && !bMatches) return -1; // a comes first
    if (!aMatches && bMatches) return 1;  // b comes first
    return 0; // maintain original order
  });

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Available Players</h1>
       
      </div>

      {/* 2. Created a new flex container for search and filter */}
      <div className="flex items-center gap-4">
        <SearchContainer 
          query={searchQuery} 
          onQueryChange={setSearchQuery} 
        />

          <AllPlayersFilterIcon />
        
      </div>
      
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
        {sortedPlayers.map((player) => (
          <div
            key={player.id}
            className="bg-white shadow rounded-[8px] flex gap-4 p-4 items-center"
          >
            <div className="flex-shrink-0">
              <img
                src={player.image}
                alt={player.name}
                className="rounded-full w-24 h-24 object-cover border-2 border-orange-300"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h1 className="text-base sm:text-lg font-bold">{player.name}</h1>
                <div className="pt-1 pr-6">
                  <NaijaImg />
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
              {/* Updated Link path */}
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
    </div>
  );
}

