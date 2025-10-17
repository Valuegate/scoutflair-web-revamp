// 1. Import the Link component from Next.js
import Link from "next/link";
import { NaijaImg } from "../ScoutIcons";
import { playersData } from "@/lib/data";

export default function Players() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
      {/* 4. Using the unique player.id is better for the key */}
      {playersData.map((player) => (
        <div
          key={player.id}
          className="bg-white shadow rounded-[8px] flex gap-4 p-4 items-center"
        >
          {/* img container */}
          <div className="flex-shrink-0">
            <img
              src={player.image}
              alt={player.name}
              className="rounded-full w-24 h-24 object-cover border-2 border-orange-300"
            />
          </div>

          {/* player details container */}
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
            
            <Link href={`/profile${player.id}`}>
              <button className="mt-2 border border-orange-300 rounded-full px-3 py-1 text-xs text-gray-600 hover:bg-orange-50 transition">
                View profile
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}