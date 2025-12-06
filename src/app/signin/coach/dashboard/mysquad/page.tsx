"use client";

import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  LayoutList, 
  LayoutGrid,
  Sparkles, 
  HeartPulse,
  User
} from "lucide-react";

// Mock Data for the Squad with AI Fields
const squadData = [
  {
    id: 1,
    name: "Daniel Okon",
    number: 9,
    position: "Forward",
    role: "Striker",
    age: 22,
    height: "183cm",
    status: "Active",
    fitness: 94,
    form: ["W", "W", "D", "W", "L"],
    image: "/images/avaplone.png",
    appearances: 12,
    goals: 8,
    assists: 3,
    aiRating: 8.9,
    injuryRisk: "Low"
  },
  {
    id: 2,
    name: "Tola Aina",
    number: 4,
    position: "Defender",
    role: "Centre Back",
    age: 24,
    height: "188cm",
    status: "Injured",
    fitness: 0,
    form: ["D", "L", "D", "-", "-"],
    image: "/images/avaptwo.png",
    appearances: 8,
    goals: 1,
    assists: 0,
    aiRating: 6.2,
    injuryRisk: "Critical"
  },
  {
    id: 3,
    name: "Ahmed Al-Tamimi",
    number: 6,
    position: "Midfielder",
    role: "CDM",
    age: 30,
    height: "180cm",
    status: "Active",
    fitness: 82,
    form: ["W", "D", "W", "W", "D"],
    image: "/images/avapfive.png",
    appearances: 14,
    goals: 2,
    assists: 6,
    aiRating: 7.8,
    injuryRisk: "High"
  },
  {
    id: 4,
    name: "Ibrahim Diallo",
    number: 1,
    position: "Goalkeeper",
    role: "GK",
    age: 31,
    height: "193cm",
    status: "Active",
    fitness: 98,
    form: ["W", "W", "L", "W", "W"],
    image: "/images/avapfour.png",
    appearances: 15,
    goals: 0,
    assists: 1,
    aiRating: 8.5,
    injuryRisk: "Low"
  },
  {
    id: 5,
    name: "Emeka Nwosu",
    number: 7,
    position: "Forward",
    role: "Winger",
    age: 25,
    height: "172cm",
    status: "Active",
    fitness: 91,
    form: ["L", "W", "W", "D", "L"],
    image: "/images/avaplone.png",
    appearances: 10,
    goals: 4,
    assists: 5,
    aiRating: 7.5,
    injuryRisk: "Medium"
  },
  {
    id: 6,
    name: "James Obi",
    number: 11,
    position: "Forward",
    role: "Winger",
    age: 21,
    height: "175cm",
    status: "Recovery",
    fitness: 65,
    form: ["-", "-", "L", "D", "W"],
    image: "/images/avapthree.png",
    appearances: 6,
    goals: 1,
    assists: 2,
    aiRating: 6.8,
    injuryRisk: "Medium"
  }
];

// Helper component for status badges
const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    Active: "bg-green-100 text-green-700 border-green-200",
    Injured: "bg-red-100 text-red-700 border-red-200",
    Recovery: "bg-orange-100 text-orange-700 border-orange-200",
    Suspended: "bg-gray-100 text-gray-700 border-gray-200",
  };
  return (
    <span className={`px-2 py-1 rounded-full text-[10px] md:text-xs font-semibold border ${styles[status] || styles.Active}`}>
      {status}
    </span>
  );
};

// Helper for AI Injury Risk Badge
const InjuryRiskBadge = ({ risk }: { risk: string }) => {
  const styles: Record<string, string> = {
    Low: "text-green-600 bg-green-50",
    Medium: "text-yellow-600 bg-yellow-50",
    High: "text-orange-600 bg-orange-50",
    Critical: "text-red-600 bg-red-50",
  };
  return (
    <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] md:text-xs font-medium w-fit ${styles[risk] || styles.Low}`}>
      <HeartPulse size={14} />
      {risk} Risk
    </div>
  );
};

export default function MySquadPage() {
  const [view, setView] = useState<"list" | "depth">("list");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSquad = squadData.filter(player => 
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    player.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8 min-h-screen bg-gray-50">
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Squad</h1>
          <p className="text-sm md:text-base text-gray-500 mt-1">Manage your roster, track fitness, and analyze depth.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search players..." 
              className="w-full sm:w-64 pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <div className="flex bg-gray-100 p-1 rounded-lg shrink-0">
              <button 
                onClick={() => setView("list")}
                className={`p-2 rounded-md transition-all ${view === "list" ? "bg-white shadow text-blue-900" : "text-gray-500 hover:text-gray-700"}`}
              >
                <LayoutList size={18} />
              </button>
              <button 
                onClick={() => setView("depth")}
                className={`p-2 rounded-md transition-all ${view === "depth" ? "bg-white shadow text-blue-900" : "text-gray-500 hover:text-gray-700"}`}
              >
                <LayoutGrid size={18} />
              </button>
            </div>
            
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 text-gray-700 bg-white whitespace-nowrap">
              <Filter size={16} /> Filter
            </button>
          </div>
        </div>
      </div>

      {/* --- AI PHYSIO INSIGHTS BANNER --- */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 rounded-xl p-4 flex flex-col sm:flex-row items-start gap-4">
        <div className="bg-white p-2 rounded-lg shadow-sm shrink-0">
          <Sparkles className="text-blue-600" size={20} />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-blue-900 mb-1">AI Physio Insight</h3>
          <p className="text-xs md:text-sm text-blue-700 leading-relaxed">
            Attention Coach: <span className="font-semibold">Ahmed Al-Tamimi</span> is showing signs of muscle fatigue based on recent match load. 
            AI suggests reducing his training intensity by 20% this week or benching him for the upcoming match to prevent a potential hamstring injury.
          </p>
        </div>
        <button className="w-full sm:w-auto text-xs font-semibold text-blue-600 hover:text-purple-800 bg-white px-4 py-2 rounded-lg border border-purple-200 shadow-sm transition-colors whitespace-nowrap">
          View Analysis
        </button>
      </div>

      {/* --- LIST VIEW --- */}
      {view === "list" && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 md:px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Player</th>
                  <th className="px-4 md:px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Position</th>
                  <th className="px-4 md:px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 md:px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">AI Injury Risk</th>
                  <th className="px-4 md:px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">AI Rating</th>
                  <th className="px-4 md:px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Stats</th>
                  <th className="px-4 md:px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredSquad.map((player) => (
                  <tr key={player.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-gray-400 w-4 hidden sm:block">{player.number}</span>
                        <img src={player.image} alt={player.name} className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border border-gray-200" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{player.name}</p>
                          <p className="text-xs text-gray-500">{player.age} yrs • {player.height}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{player.position}</div>
                      <div className="text-xs text-gray-500">{player.role}</div>
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={player.status} />
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                      <InjuryRiskBadge risk={player.injuryRisk} />
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="relative w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle cx="50%" cy="50%" r="40%" stroke="currentColor" strokeWidth="3" fill="transparent" className="text-gray-200" />
                            <circle 
                              cx="50%" cy="50%" r="40%"
                              stroke="currentColor" 
                              strokeWidth="3" 
                              fill="transparent" 
                              strokeDasharray={100} 
                              strokeDashoffset={100 - (player.aiRating * 10)} 
                              className={`${player.aiRating >= 8 ? 'text-green-500' : player.aiRating >= 6 ? 'text-yellow-500' : 'text-red-500'}`} 
                            />
                          </svg>
                          <span className="absolute text-[10px] md:text-xs font-bold text-gray-700">{player.aiRating}</span>
                        </div>
                        <span className="text-[10px] text-gray-400">/10</span>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-xs text-gray-600">
                        <span className="font-semibold text-gray-900">{player.appearances}</span> Apps
                      </div>
                      <div className="text-xs text-gray-500">
                        {player.goals}G / {player.assists}A
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-right">
                      <button className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full">
                        <MoreHorizontal size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- DEPTH CHART VIEW --- */}
      {view === "depth" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {['Goalkeeper', 'Defender', 'Midfielder', 'Forward'].map((pos) => (
            <div key={pos} className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-full">
              <div className="p-4 border-b border-gray-100 bg-gray-50 rounded-t-xl flex justify-between items-center">
                <h3 className="font-semibold text-gray-800">{pos}s</h3>
                <span className="bg-white text-xs font-bold px-2 py-1 rounded text-gray-500 border border-gray-200">
                  {filteredSquad.filter(p => p.position === pos).length}
                </span>
              </div>
              <div className="p-3 space-y-3 flex-1">
                {filteredSquad.filter(p => p.position === pos).map((player) => (
                  <div key={player.id} className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-lg hover:shadow-md transition-shadow cursor-pointer group relative">
                    {/* Visual Status Indicator Strip */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-lg ${player.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    
                    <img src={player.image} alt={player.name} className="w-10 h-10 rounded-full object-cover ml-2" />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <p className="text-sm font-semibold text-gray-900 truncate pr-1">{player.name}</p>
                        {/* AI Risk Dot in Depth Chart */}
                        {player.injuryRisk === 'High' && <span title="High Injury Risk" className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0 mt-1.5"></span>}
                      </div>
                      <p className="text-xs text-gray-500">{player.role}</p>
                    </div>
                    <div className="text-right">
                      <span className="block text-xs font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">{player.aiRating}</span>
                    </div>
                  </div>
                ))}
                {filteredSquad.filter(p => p.position === pos).length === 0 && (
                  <div className="h-20 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
                    <User size={24} className="mb-1 opacity-50" />
                    <span className="text-xs">No players</span>
                  </div>
                )}
              </div>
              <div className="p-3 border-t border-gray-100 bg-gray-50 rounded-b-xl">
                <button className="w-full py-2 text-xs font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors flex items-center justify-center gap-1">
                   <Search size={14} /> Scout for {pos}s
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}