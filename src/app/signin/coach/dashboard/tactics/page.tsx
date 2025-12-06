"use client";

import React, { useState } from "react";
import { 
  Users, 
  ChevronDown, 
  Shield, 
  Zap, 
  Move, 
  RotateCcw,
  Save
} from "lucide-react";

// Mock Squad Data
const squad = [
  { id: 1, name: "Ibrahim Diallo", pos: "GK", num: 1, status: "fit" },
  { id: 2, name: "Denis Ojua", pos: "RB", num: 2, status: "fit" },
  { id: 3, name: "Tola Aina", pos: "CB", num: 4, status: "injured" },
  { id: 4, name: "Luka Ivanov", pos: "CB", num: 5, status: "fit" },
  { id: 5, name: "Samuel Akinbiyi", pos: "LB", num: 3, status: "fit" },
  { id: 6, name: "Ahmed Al-Tamimi", pos: "CDM", num: 6, status: "fit" },
  { id: 7, name: "Kwaku Addo", pos: "CM", num: 8, status: "fit" },
  { id: 8, name: "Miguel Santos", pos: "CAM", num: 10, status: "fit" },
  { id: 9, name: "Emeka Nwosu", pos: "RW", num: 7, status: "fit" },
  { id: 10, name: "Daniel Okon", pos: "ST", num: 9, status: "fit" },
  { id: 11, name: "James Obi", pos: "LW", num: 11, status: "recovery" },
  { id: 12, name: "Felix Müller", pos: "GK", num: 12, status: "fit" },
];

const formations = [
  { name: "4-3-3 Attack", defenders: 4, midfielders: 3, attackers: 3 },
  { name: "4-4-2 Flat", defenders: 4, midfielders: 4, attackers: 2 },
  { name: "3-5-2", defenders: 3, midfielders: 5, attackers: 2 },
  { name: "4-2-3-1", defenders: 4, midfielders: 5, attackers: 1 },
];

export default function TacticsPage() {
  const [selectedFormation, setSelectedFormation] = useState(formations[0]);
  const [activeTab, setActiveTab] = useState<"lineup" | "instructions">("lineup");

  // Mock Starting XI positions based on 4-3-3
  // In a real app, these would be calculated dynamically based on the formation
  const pitchPositions = [
    { id: 'gk', top: '85%', left: '50%', label: 'GK', player: squad[0] },
    { id: 'lb', top: '65%', left: '15%', label: 'LB', player: squad[4] },
    { id: 'cb1', top: '70%', left: '38%', label: 'CB', player: squad[3] },
    { id: 'cb2', top: '70%', left: '62%', label: 'CB', player: null }, // Empty slot example
    { id: 'rb', top: '65%', left: '85%', label: 'RB', player: squad[1] },
    { id: 'cm1', top: '45%', left: '30%', label: 'CM', player: squad[6] },
    { id: 'cdm', top: '55%', left: '50%', label: 'CDM', player: squad[5] },
    { id: 'cm2', top: '45%', left: '70%', label: 'CM', player: squad[7] },
    { id: 'lw', top: '25%', left: '20%', label: 'LW', player: squad[10] }, // Injured/Recovery
    { id: 'st', top: '15%', left: '50%', label: 'ST', player: squad[9] },
    { id: 'rw', top: '25%', left: '80%', label: 'RW', player: squad[8] },
  ];

  return (
    <div className="flex flex-col h-full md:h-[calc(100vh-8rem)] gap-4 md:gap-6 p-4 md:p-0">
      {/* Header Controls */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm shrink-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full xl:w-auto">
          <div className="relative w-full sm:w-auto">
            <select 
              className="appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full sm:w-40 p-2.5 pr-8 font-medium"
              value={selectedFormation.name}
              onChange={(e) => setSelectedFormation(formations.find(f => f.name === e.target.value) || formations[0])}
            >
              {formations.map(f => <option key={f.name} value={f.name}>{f.name}</option>)}
            </select>
            <ChevronDown className="absolute right-2 top-3 text-gray-500 pointer-events-none" size={16} />
          </div>
          <div className="h-px w-full sm:h-8 sm:w-px bg-gray-200"></div>
          <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-full sm:w-auto">
            <button 
              onClick={() => setActiveTab("lineup")}
              className={`flex-1 sm:flex-none px-3 py-1.5 text-xs font-medium rounded-md transition-all ${activeTab === "lineup" ? "bg-white shadow text-blue-900" : "text-gray-500 hover:text-gray-700"}`}
            >
              Lineup
            </button>
            <button 
              onClick={() => setActiveTab("instructions")}
              className={`flex-1 sm:flex-none px-3 py-1.5 text-xs font-medium rounded-md transition-all ${activeTab === "instructions" ? "bg-white shadow text-blue-900" : "text-gray-500 hover:text-gray-700"}`}
            >
              Instructions
            </button>
          </div>
        </div>
        
        <div className="flex gap-2 w-full xl:w-auto">
          <button className="flex-1 xl:flex-none flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <RotateCcw size={14} /> Reset
          </button>
          <button className="flex-1 xl:flex-none flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-white bg-[#0A2342] rounded-lg hover:bg-blue-800">
            <Save size={14} /> Save Tactics
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 min-h-0">
        
        {/* --- LEFT: PITCH VIEW (2/3) --- */}
        {/* On mobile, give it a min-height so it looks like a pitch. On desktop, it takes available height */}
        <div className="lg:col-span-2 bg-green-600 rounded-xl shadow-inner relative overflow-hidden border-4 border-green-700 min-h-[500px] lg:min-h-0">
          {/* Pitch Markings */}
          <div className="absolute inset-4 border-2 border-white/30 rounded-sm pointer-events-none"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-16 border-b-2 border-l-2 border-r-2 border-white/30 rounded-b-sm pointer-events-none"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-16 border-t-2 border-l-2 border-r-2 border-white/30 rounded-t-sm pointer-events-none"></div>
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-white/30 -translate-y-1/2 pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-white/30 rounded-full pointer-events-none"></div>

          {/* Players on Pitch */}
          {pitchPositions.map((pos) => (
            <div 
              key={pos.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group"
              style={{ top: pos.top, left: pos.left }}
            >
              <div className={`w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full border-2 flex items-center justify-center text-[10px] md:text-xs lg:text-sm font-bold shadow-lg transition-transform hover:scale-110 relative ${
                pos.player 
                  ? "bg-white border-white text-gray-800" 
                  : "bg-green-700/50 border-white/50 text-white/50 border-dashed"
              }`}>
                {pos.player ? (
                  <>
                    <span className="z-10">{pos.player.num}</span>
                    {/* Status Indicator Dot */}
                    {pos.player.status !== 'fit' && (
                      <span className={`absolute -top-1 -right-1 w-2.5 h-2.5 md:w-3 md:h-3 rounded-full border-2 border-white ${
                        pos.player.status === 'injured' ? 'bg-red-500' : 'bg-orange-500'
                      }`}></span>
                    )}
                  </>
                ) : (
                  pos.label
                )}
              </div>
              
              {pos.player && (
                <div className="mt-1 bg-gray-900/80 text-white text-[8px] md:text-[10px] lg:text-xs px-1.5 py-0.5 rounded backdrop-blur-sm truncate max-w-[60px] md:max-w-[80px]">
                  {pos.player.name.split(' ').pop()}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* --- RIGHT: SIDEBAR (1/3) --- */}
        {/* On mobile, give it a fixed height or allow scroll. On desktop, it fills height */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden h-[400px] lg:h-auto">
          
          {activeTab === "lineup" ? (
            <>
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h3 className="font-semibold text-gray-800 text-sm">Squad Selection</h3>
                <div className="mt-2 relative">
                  <input 
                    type="text" 
                    placeholder="Search squad..." 
                    className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  />
                  <Users size={12} className="absolute left-2.5 top-2 text-gray-400" />
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {squad.map((player) => (
                  <div key={player.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-grab active:cursor-grabbing border border-transparent hover:border-gray-100">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      player.pos === 'GK' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {player.pos}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium text-gray-900">{player.name}</p>
                        {player.status !== 'fit' && (
                          <span className={`text-[10px] px-1.5 rounded ${
                            player.status === 'injured' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
                          }`}>
                            {player.status === 'injured' ? 'Inj' : 'Rec'}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">#{player.num}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* TACTICAL INSTRUCTIONS VIEW */}
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h3 className="font-semibold text-gray-800 text-sm">Team Instructions</h3>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                
                {/* Build Up Play */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Move size={16} className="text-blue-500" /> Build Up Play
                  </div>
                  <div className="space-y-4 px-2">
                    <div>
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Short Passing</span>
                        <span>Long Ball</span>
                      </div>
                      <input type="range" className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Slow Pace</span>
                        <span>Fast Pace</span>
                      </div>
                      <input type="range" className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                    </div>
                  </div>
                </div>

                <hr className="border-gray-100" />

                {/* Defense */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Shield size={16} className="text-red-500" /> Defensive Style
                  </div>
                  <div className="space-y-4 px-2">
                    <div>
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Deep Line</span>
                        <span>High Line</span>
                      </div>
                      <input type="range" className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Stand Off</span>
                        <span>Pressing</span>
                      </div>
                      <input type="range" className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600" />
                    </div>
                  </div>
                </div>

                <hr className="border-gray-100" />

                <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
                  <h4 className="text-xs font-bold text-purple-800 mb-1 flex items-center gap-1">
                    <Zap size={12} /> AI Insight
                  </h4>
                  <p className="text-[10px] text-purple-700 leading-tight">
                    Your current "High Press" setting might exhaust the midfield by the 60th minute against Lagoon FC's possession style.
                  </p>
                </div>

              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}