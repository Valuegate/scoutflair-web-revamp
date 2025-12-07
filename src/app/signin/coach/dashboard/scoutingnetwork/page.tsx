"use client";

import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  UserPlus, 
  FileText, 
  Bookmark, 
  ChevronRight,
  Sparkles,
  CheckCircle,
  XCircle,
  Clock,
  User,
  X,
  Send,
  DollarSign,
  Calendar,
  Target
} from "lucide-react";

// --- Mock Data ---
const marketPlayers = [
  { id: 1, name: "Emmanuel Chidiebere", age: 19, pos: "LW", club: "Diamond Academy", value: "$50k", fit: 94, status: "Available", image: "/images/avaplone.png" },
  { id: 2, name: "Musa Yusuf", age: 23, pos: "CDM", club: "Kano Pillars", value: "$120k", fit: 88, status: "Listed", image: "/images/avaptwo.png" },
  { id: 3, name: "John Doe", age: 21, pos: "RB", club: "Free Agent", value: "$0", fit: 76, status: "Free", image: "/images/avapthree.png" },
  { id: 4, name: "Samuel Kalu", age: 20, pos: "ST", club: "Enyimba", value: "$200k", fit: 82, status: "Negotiating", image: "/images/avapfour.png" },
  { id: 5, name: "David Alaba (Jr)", age: 18, pos: "CB", club: "Lagos City", value: "$30k", fit: 65, status: "Available", image: "/images/avapfive.png" },
  { id: 6, name: "Peter Olayinka", age: 24, pos: "CAM", club: "Remo Stars", value: "$150k", fit: 91, status: "Listed", image: "/images/avapsix.png" },
];

const scoutReports = [
  { id: 101, scout: "Dave Ishmael", player: "Emmanuel Chidiebere", rating: "A+", summary: "Exceptional pace and dribbling. Premier League potential.", date: "2h ago" },
  { id: 102, scout: "Sarah K.", player: "Musa Yusuf", rating: "B", summary: "Solid defensive awareness but lacks passing range.", date: "5h ago" },
  { id: 103, scout: "Dave Ishmael", player: "David Alaba (Jr)", rating: "C", summary: "Still very raw. Needs 1-2 years in academy.", date: "1d ago" },
];

// --- MODAL COMPONENT ---
interface RequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateRequestModal = ({ isOpen, onClose }: RequestModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div>
            <h2 className="text-lg font-bold text-gray-900">New Scouting Mandate</h2>
            <p className="text-xs text-gray-500">Task your scouts to find a specific player profile.</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 transition-colors text-gray-500">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          
          {/* Section 1: Player Profile */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <User size={16} className="text-blue-600" /> Target Profile
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Position</label>
                <select className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                  <option>Striker (CF)</option>
                  <option>Winger (LW/RW)</option>
                  <option>Midfielder (CM/CAM)</option>
                  <option>Defensive Mid (CDM)</option>
                  <option>Center Back (CB)</option>
                  <option>Full Back (LB/RB)</option>
                  <option>Goalkeeper (GK)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Role</label>
                <select className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                  <option>Target Man</option>
                  <option>Poacher</option>
                  <option>False 9</option>
                  <option>Pressing Forward</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Age Range</label>
                <div className="flex gap-2 items-center">
                  <input type="number" placeholder="Min" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" />
                  <span className="text-gray-400">-</span>
                  <input type="number" placeholder="Max" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Preferred Foot</label>
                <div className="flex gap-2">
                  <label className="flex items-center gap-1 text-xs text-gray-600 cursor-pointer">
                    <input type="radio" name="foot" /> Left
                  </label>
                  <label className="flex items-center gap-1 text-xs text-gray-600 cursor-pointer">
                    <input type="radio" name="foot" /> Right
                  </label>
                  <label className="flex items-center gap-1 text-xs text-gray-600 cursor-pointer">
                    <input type="radio" name="foot" defaultChecked /> Any
                  </label>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Section 2: Logistics */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <Target size={16} className="text-red-500" /> Requirements
            </h3>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Key Attributes (Select up to 3)</label>
              <div className="flex flex-wrap gap-2">
                {['Pace', 'Finishing', 'Heading', 'Tackling', 'Passing', 'Vision', 'Strength'].map(attr => (
                  <span key={attr} className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full border border-gray-200 cursor-pointer hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-colors">
                    {attr}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Max Budget</label>
                <div className="relative">
                  <DollarSign size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" placeholder="e.g. 50,000" className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-lg" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Deadline</label>
                <div className="relative">
                  <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="date" className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <label className="block text-xs font-medium text-gray-600 mb-1">Additional Notes for Scouts</label>
            <textarea 
              rows={3} 
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Looking for a leader who communicates well..."
            ></textarea>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors">
            Cancel
          </button>
          <button onClick={onClose} className="flex items-center gap-2 px-6 py-2 bg-[#0A2342] text-white text-sm font-medium rounded-lg hover:bg-blue-800 transition-colors shadow-sm">
            <Send size={16} /> Submit Request
          </button>
        </div>

      </div>
    </div>
  );
};

// --- MAIN PAGE ---
export default function ScoutingNetworkPage() {
  const [activeTab, setActiveTab] = useState<"database" | "reports" | "shortlist">("database");
  const [searchTerm, setSearchTerm] = useState("");
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8 min-h-screen bg-gray-50 relative">
      
      {/* Modal Overlay */}
      <CreateRequestModal isOpen={isRequestModalOpen} onClose={() => setIsRequestModalOpen(false)} />

      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Scouting Network</h1>
          <p className="text-sm md:text-base text-gray-500 mt-1">Find new talent and review scout recommendations.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button 
            onClick={() => setIsRequestModalOpen(true)}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-[#0A2342] text-white rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors shadow-sm"
          >
            <UserPlus size={16} /> Create Request
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 overflow-x-auto no-scrollbar">
        <nav className="-mb-px flex space-x-6 md:space-x-8 min-w-max px-1">
          <button
            onClick={() => setActiveTab("database")}
            className={`whitespace-nowrap py-3 md:py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
              activeTab === "database"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <Search size={16} /> Player Database
          </button>
          <button
            onClick={() => setActiveTab("reports")}
            className={`whitespace-nowrap py-3 md:py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
              activeTab === "reports"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <FileText size={16} /> Scout Reports
            <span className="bg-red-100 text-red-600 text-xs py-0.5 px-2 rounded-full">3</span>
          </button>
          <button
            onClick={() => setActiveTab("shortlist")}
            className={`whitespace-nowrap py-3 md:py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
              activeTab === "shortlist"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <Bookmark size={16} /> Shortlists
          </button>
        </nav>
      </div>

      {/* --- TAB CONTENT: DATABASE --- */}
      {activeTab === "database" && (
        <div className="space-y-6">
          {/* AI Recommendation Banner */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-4 flex flex-col sm:flex-row items-start gap-4">
            <div className="p-2 bg-white rounded-lg shadow-sm shrink-0">
              <Sparkles className="text-blue-600" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-blue-900 mb-1">AI Recommendation</h3>
              <p className="text-xs md:text-sm text-blue-700 leading-relaxed">
                Based on your team's lack of goals from set-pieces, AI recommends prioritizing 
                <span className="font-semibold"> Tall Centre Backs (190cm+)</span> or 
                <span className="font-semibold"> Set-Piece Specialists</span>. 
                3 players match this profile in the database.
              </p>
            </div>
            <button className="w-full sm:w-auto text-xs bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg border border-blue-200 shadow-sm hover:bg-blue-50 whitespace-nowrap transition-colors">
              View Matches
            </button>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search by name, position, or club..." 
                className="pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 text-gray-700 whitespace-nowrap bg-white">
              <Filter size={16} /> Advanced Filters
            </button>
          </div>

          {/* Players Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {marketPlayers.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map((player) => (
              <div key={player.id} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex gap-3">
                    <img src={player.image} alt={player.name} className="w-12 h-12 rounded-lg object-cover bg-gray-100" />
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm line-clamp-1">{player.name}</h3>
                      <p className="text-xs text-gray-500">{player.age} yrs • {player.pos}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="block text-sm font-bold text-gray-900">{player.value}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                      player.status === 'Available' ? 'bg-green-100 text-green-700' : 
                      player.status === 'Free' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {player.status}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-4 bg-gray-50 p-2 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-gray-500 uppercase font-semibold">Club</p>
                    <p className="text-xs font-medium text-gray-800 truncate">{player.club}</p>
                  </div>
                  <div className="h-6 w-[1px] bg-gray-200 shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-[10px] text-gray-500 uppercase font-semibold">AI Fit</p>
                    <p className={`text-xs font-bold ${player.fit >= 90 ? 'text-green-600' : player.fit >= 80 ? 'text-blue-600' : 'text-yellow-600'}`}>
                      {player.fit}% Match
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 py-2 text-xs font-semibold text-white bg-[#0A2342] rounded-lg hover:bg-blue-800 transition-colors">
                    View Profile
                  </button>
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600">
                    <Bookmark size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- TAB CONTENT: SCOUT REPORTS --- */}
      {activeTab === "reports" && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h3 className="font-semibold text-gray-800 text-sm md:text-base">Pending Review</h3>
            <span className="text-xs text-gray-500">3 new reports</span>
          </div>
          <div className="divide-y divide-gray-100">
            {scoutReports.map((report) => (
              <div key={report.id} className="p-4 hover:bg-blue-50/50 transition-colors">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="flex-1 w-full">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h4 className="font-bold text-gray-900 text-sm">{report.player}</h4>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        report.rating.includes('A') ? 'bg-green-100 text-green-700' : 
                        report.rating.includes('B') ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        Grade: {report.rating}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2 leading-relaxed">{report.summary}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-400 flex-wrap">
                      <div className="flex items-center gap-1">
                        <UserPlus size={12} /> Scouted by {report.scout} 
                      </div>
                      <span className="hidden sm:inline">•</span>
                      <div className="flex items-center gap-1">
                        <Clock size={12} /> {report.date}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto self-end sm:self-start">
                    <button className="flex-1 sm:flex-none flex items-center justify-center p-2 bg-green-100 text-green-600 rounded hover:bg-green-200 transition-colors" title="Approve / Shortlist">
                      <CheckCircle size={18} />
                      <span className="sm:hidden ml-2 text-xs font-semibold">Approve</span>
                    </button>
                    <button className="flex-1 sm:flex-none flex items-center justify-center p-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors" title="Discard">
                      <XCircle size={18} />
                      <span className="sm:hidden ml-2 text-xs font-semibold">Discard</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-gray-200 text-center">
            <button className="text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center justify-center gap-1">
              View Archived Reports <ChevronRight size={12} />
            </button>
          </div>
        </div>
      )}

      {/* --- TAB CONTENT: SHORTLIST (Placeholder) --- */}
      {activeTab === "shortlist" && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200 border-dashed">
          <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
            <Bookmark size={24} className="text-gray-400" />
          </div>
          <h3 className="text-gray-900 font-medium">No Shortlists Created</h3>
          <p className="text-gray-500 text-sm mt-1 mb-4">Start by creating a list for your summer transfer targets.</p>
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
            Create New Shortlist
          </button>
        </div>
      )}
    </div>
  );
}