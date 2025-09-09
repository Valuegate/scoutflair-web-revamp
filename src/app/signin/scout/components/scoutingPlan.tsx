import { Wand2, Star } from "lucide-react";

export default function ScoutingPlan() {
  const players = [
    { club: "Scoutflair FC", name: "Abubakar Kabir", position: "Midfielder", height: 178, weight: 69, games: 50, assists: 15, goals: 5 },
    { club: "Scoutflair FC", name: "Abubakar Kabir", position: "Midfielder", height: 178, weight: 69, games: 50, assists: 15, goals: 5 },
    { club: "Scoutflair FC", name: "Abubakar Kabir", position: "Midfielder", height: 178, weight: 69, games: 50, assists: 15, goals: 5 },
    { club: "Scoutflair FC", name: "Abubakar Kabir", position: "Midfielder", height: 178, weight: 69, games: 50, assists: 15, goals: 5 },
  ];

  const topPlayers = [
    { name: "Abubakar Mansoor", position: "Midfielder" },
    { name: "Abubakar Mansoor", position: "Midfielder" },
    { name: "Abubakar Mansoor", position: "Midfielder" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <Wand2 size={20} className="mr-2 text-gray-600" />
          Scouting Plan
        </h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
          Add Task
        </button>
      </div>

      {/* Scout Profile */}
      <div className="flex items-center mb-6">
        <img src="https://placehold.co/40x40?text=J" alt="Joshua Fayomi" className="rounded-full mr-3 w-10 h-10" />
        <p className="text-sm font-medium text-gray-800">Joshua Fayomi</p>
      </div>

      {/* Player Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {players.map((player, i) => (
          <div key={i} className="bg-white rounded-lg p-3 text-center border border-gray-100">
            <div className="flex justify-center items-center mb-1 text-sm font-medium text-green-600">
              {player.club} <span className="ml-1">🇳🇬</span>
            </div>
            <img
              src={`https://placehold.co/80x120?text=${player.name[0]}`}
              alt={player.name}
              className="mx-auto mb-1 rounded-md w-20 h-28 object-cover"
            />
            <div className="flex justify-center mb-1">
              {[...Array(5)].map((_, j) => (
                <Star key={j} size={12} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-sm font-medium text-gray-800">{player.name}</p>
            <p className="text-xs text-gray-600">{player.position}</p>
            <p className="text-xs text-gray-500">Height {player.height} Weight {player.weight}</p>
            <p className="text-xs text-gray-500 mt-2">Academy Stats</p>
            <div className="flex justify-around text-xs text-gray-500">
              <span>Games {player.games}</span>
              <span>Assists {player.assists}</span>
              <span>Goals {player.goals}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Top 3 Players */}
      <h4 className="text-md font-semibold mb-3 text-gray-800">Top 3 players</h4>
      <div className="grid grid-cols-3 gap-4">
        {topPlayers.map((top, i) => (
          <div key={i} className="bg-white rounded-full p-2 flex items-center border border-gray-100">
            <img
              src={`https://placehold.co/32x32?text=${top.name[0]}`}
              alt={top.name}
              className="rounded-full mr-2 w-8 h-8"
            />
            <span className="text-xs">🇳🇬</span>
            <div className="ml-1">
              <p className="text-sm font-medium text-gray-800">{top.name}</p>
              <p className="text-xs text-gray-600">{top.position}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
