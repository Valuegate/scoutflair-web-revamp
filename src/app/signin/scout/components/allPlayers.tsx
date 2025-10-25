
import { AllPlayersIcon, FilterIcon } from "../ScoutIcons";
import PlayerCard from "./playerCard";
import Link from "next/link";
export default function AllPlayers() {
  const players = Array(8).fill({
    name: "Adams",
    surname: "Taylor",
    age: 17,
    nationality: "Nigerian",
    flag: "🇳🇬",
    position: "Midfielder",
    number: 3,
    image: "/images/allpone.png",
    
  });

  return (
   <div   className="bg-white rounded-xl shadow-md   p-4 sm:p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold flex items-center gap-2">
          <span><AllPlayersIcon/></span> All Players
        </h1>
      <div>
  <button className="flex items-center gap-2 px-4 py-2 border rounded-lg shadow-sm hover:bg-gray-100">
    <FilterIcon  />
    <span className="text-gray-500">Filter</span>
  </button>
</div>

       
      </div>

      {/* Grid of Players */}
      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-2 gap-6">
        {players.map((player, idx) => (
          <PlayerCard key={idx} {...player} />
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-center mt-10">
        <Link
        href={"/signin/scout/dashboard"}>
          <button className="px-6 py-2 border rounded-lg shadow-sm hover:bg-gray-100">
          ← Return to Menu
        </button>
        </Link>
        
        
        
      </div>
    </div>
  );
}
