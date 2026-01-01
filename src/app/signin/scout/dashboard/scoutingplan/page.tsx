"use client";

import React, { useState } from "react";
import { 
  Plus, 
  MapPin, 
  Calendar, 
  Search, 
  Filter, 
  MessageSquare, 
  CheckCircle, 
  X, 
  Sparkles,
  MoreHorizontal,
  Navigation,
  Clock,
  ArrowRight
} from "lucide-react";

import AddTaskForm from "@/app/signin/scout/components/addNewTask";

// --- Types ---
interface Task {
  id: number;
  player: string;
  club: string;
  location: string;
  date: string;
  time: string;
  status: 'Pending' | 'Completed' | 'In Progress';
  priority: 'High' | 'Normal';
  image: string;
}

interface Mandate {
  id: number;
  coach: string;
  club: string;
  request: string;
  deadline: string;
  priority: 'High' | 'Normal';
  status: 'New' | 'Accepted';
}

// --- Mock Data ---
const initialMandates: Mandate[] = [
  { 
    id: 101, 
    coach: "Coach Dave", 
    club: "Scoutflair FC", 
    request: "Left Winger (Pace 85+, Age < 21)", 
    deadline: "3 Days", 
    priority: "High",
    status: 'New'
  }
];

const initialTasks: Task[] = [
  { id: 1, player: "Denis Chuks", club: "Diamond Academy", location: "Onikan Stadium", date: "2025-10-14", time: "10:00 AM", status: "Pending", priority: "Normal", image: "/images/scoutplanone.png" },
  { id: 2, player: "Abubakar Kabir", club: "Kano Pillars U19", location: "Legacy Pitch", date: "2025-10-14", time: "02:00 PM", status: "Pending", priority: "High", image: "/images/scoutplantwo.png" },
  { id: 3, player: "Musa Yusuf", club: "Gbagada FC", location: "Onikan Stadium", date: "2025-10-14", time: "04:00 PM", status: "Pending", priority: "Normal", image: "/images/scoutplanthree.png" },
];

export default function ScoutingPlanPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [mandates, setMandates] = useState<Mandate[]>(initialMandates);
  const [searchTerm, setSearchTerm] = useState("");

  // Handle accepting a mandate
  const handleAcceptMandate = (id: number) => {
    // In a real app, this would trigger an API call to update the mandate status
    alert("Mandate Accepted! Added to your priority list.");
    setMandates(prev => prev.filter(m => m.id !== id));
    
    // Optionally create a placeholder task
    const newMandateTask: Task = {
        id: Date.now(),
        player: "Target Scouting: LW Candidate",
        club: "Various Academies",
        location: "TBD",
        date: new Date().toISOString().split('T')[0],
        time: "09:00 AM",
        status: 'Pending',
        priority: 'High',
        image: "/images/avapthree.png"
    };
    setTasks([newMandateTask, ...tasks]);
  };

  // Handle saving a new task from the modal
  const handleSaveTask = (formData: any) => {
    const newTask: Task = {
      id: Date.now(),
      player: formData.playerName,
      club: formData.academyClubName,
      location: "TBD", 
      date: new Date().toISOString().split('T')[0],
      time: "TBD",
      status: "Pending",
      priority: "Normal",
      image: "/images/scoutplanfour.png" 
    };
    setTasks([...tasks, newTask]);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 space-y-6">
      
      {/* --- ADD TASK MODAL --- */}
      {isModalOpen && (
        <AddTaskForm 
          onCancel={() => setIsModalOpen(false)}
          onSave={handleSaveTask}
        />
      )}

      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Scouting Plan</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your schedule, routes, and scouting assignments.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 text-gray-700 transition-colors">
            <Calendar size={16} /> Calendar View
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-[#0A2342] text-white rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors shadow-sm"
          >
            <Plus size={16} /> Add Task
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* --- LEFT COLUMN: TASKS LIST (2/3) --- */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Search Bar */}
          <div className="bg-white p-3 rounded-xl border border-gray-200 flex items-center gap-3 shadow-sm">
            <Search className="text-gray-400 ml-2" size={20} />
            <input 
              type="text" 
              placeholder="Search tasks by player, club, or location..." 
              className="flex-1 outline-none text-sm text-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">
              <Filter size={18} />
            </button>
          </div>

          {/* Mandate Inbox (Coach Requests) */}
          {mandates.length > 0 && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-4 md:p-5 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <MessageSquare size={120} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold uppercase rounded-md tracking-wider flex items-center gap-1">
                    <Sparkles size={10} /> New Request
                  </span>
                  <span className="text-xs text-gray-500 font-medium">From {mandates[0].coach}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{mandates[0].request}</h3>
                <p className="text-sm text-gray-600 mb-4 max-w-lg leading-relaxed">
                  High priority requirement for <span className="font-medium text-gray-900">{mandates[0].club}</span>. 
                  Deadline: <span className="font-semibold text-red-600">{mandates[0].deadline}</span>.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button 
                    onClick={() => handleAcceptMandate(mandates[0].id)}
                    className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm"
                  >
                    <CheckCircle size={14} /> Accept Assignment
                  </button>
                  <button 
                    onClick={() => setMandates(prev => prev.filter(m => m.id !== mandates[0].id))}
                    className="px-4 py-2 bg-white border border-gray-200 text-gray-600 text-xs font-semibold rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <X size={14} /> Dismiss
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Task Cards */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                Upcoming Tasks <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{tasks.length}</span>
                </h2>
                <div className="text-xs text-gray-500 font-medium cursor-pointer hover:text-blue-600">Sort by Date</div>
            </div>
            
            {tasks.filter(t => t.player.toLowerCase().includes(searchTerm.toLowerCase())).map((task) => (
              <div key={task.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-4 items-start sm:items-center group">
                
                {/* Image */}
                <div className="shrink-0 relative">
                  <img src={task.image} alt={task.player} className="w-16 h-16 rounded-lg object-cover bg-gray-100 border border-gray-100" />
                  {task.priority === 'High' && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 border-2 border-white rounded-full shadow-sm" title="High Priority"></span>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-900 truncate text-base">{task.player}</h3>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-1 font-medium">
                        <MapPin size={12} /> {task.location} <span className="text-gray-300">|</span> {task.club}
                      </p>
                    </div>
                    {/* Mobile Status Badge */}
                    <span className={`sm:hidden text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      task.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-xs text-gray-600 bg-gray-50 border border-gray-100 px-2 py-1 rounded flex items-center gap-1.5">
                      <Calendar size={12} className="text-gray-400" /> {task.date}
                    </span>
                    <span className="text-xs text-gray-600 bg-gray-50 border border-gray-100 px-2 py-1 rounded flex items-center gap-1.5">
                      <Clock size={12} className="text-gray-400" /> {task.time}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex sm:flex-col gap-2 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100 mt-1 sm:mt-0">
                  <button className="flex-1 sm:flex-none px-4 py-2 bg-[#0A2342] text-white text-xs font-semibold rounded-lg hover:bg-blue-800 transition-colors whitespace-nowrap shadow-sm">
                    Start Report
                  </button>
                  <button className="sm:hidden flex-1 px-4 py-2 border border-gray-200 text-gray-600 text-xs font-semibold rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap">
                    Details
                  </button>
                  <button className="hidden sm:block p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg self-end">
                    <MoreHorizontal size={18} />
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>

        {/* --- RIGHT COLUMN: MAP & INSIGHTS (1/3) --- */}
        <div className="space-y-6">
          
          {/* Route Optimization Widget */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-gray-800 text-sm">Today's Route</h3>
              <div className="flex items-center gap-1 text-xs font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
                <Sparkles size={12} /> AI Optimized
              </div>
            </div>
            
            {/* Mock Map Placeholder */}
            <div className="h-48 bg-gray-200 relative group cursor-pointer overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-medium bg-gray-200 group-hover:bg-gray-300 transition-colors z-10">
                <MapPin className="mr-2" /> Interactive Map View
              </div>
              {/* Decorative Map Elements */}
              <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                 <svg width="100%" height="100%">
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="gray" strokeWidth="0.5"/>
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                 </svg>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 bg-purple-100 rounded-lg text-purple-600 shrink-0">
                  <Navigation size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">Efficiency Insight</p>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    3 tasks are located within 5km of Onikan. Grouping them saves <strong>45 mins</strong> of travel time today.
                  </p>
                </div>
              </div>
              <button className="w-full py-2 text-xs font-semibold text-purple-600 border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors flex items-center justify-center gap-2">
                Apply Optimized Route <ArrowRight size={12} />
              </button>
            </div>
          </div>

          {/* Quick Stats / Progress */}
          <div className="bg-[#0A2342] text-white rounded-xl shadow-sm p-5 relative overflow-hidden">
            {/* Decorative BG */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
            
            <h3 className="font-bold text-sm opacity-90 mb-4 relative z-10">Monthly Targets</h3>
            <div className="flex justify-between items-end mb-2 relative z-10">
              <span className="text-3xl font-bold">12</span>
              <span className="text-xs opacity-70 mb-1">/ 20 Reports Filed</span>
            </div>
            <div className="w-full bg-blue-900/50 rounded-full h-2 mb-4 relative z-10">
              <div className="bg-blue-400 h-2 rounded-full transition-all duration-1000" style={{ width: '60%' }}></div>
            </div>
            <p className="text-xs opacity-70 relative z-10">
              You are on track! 8 days remaining in the month.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}