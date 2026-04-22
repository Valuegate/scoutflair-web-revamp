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
  ArrowRight,
  ChevronDown,
  Trash2,
  Eye,
  LayoutList,
  CalendarDays,
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
  status: "Pending" | "Completed" | "In Progress";
  priority: "High" | "Normal";
  image: string;
}

interface Mandate {
  id: number;
  coach: string;
  club: string;
  request: string;
  deadline: string;
  priority: "High" | "Normal";
  status: "New" | "Accepted";
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
    status: "New",
  },
];

const initialTasks: Task[] = [
  {
    id: 1,
    player: "Denis Chuks",
    club: "Diamond Academy",
    location: "Onikan Stadium",
    date: "2025-10-14",
    time: "10:00 AM",
    status: "Pending",
    priority: "Normal",
    image: "/images/scoutplanone.png",
  },
  {
    id: 2,
    player: "Abubakar Kabir",
    club: "Kano Pillars U19",
    location: "Legacy Pitch",
    date: "2025-10-14",
    time: "02:00 PM",
    status: "Pending",
    priority: "High",
    image: "/images/scoutplantwo.png",
  },
  {
    id: 3,
    player: "Musa Yusuf",
    club: "Gbagada FC",
    location: "Onikan Stadium",
    date: "2025-10-14",
    time: "04:00 PM",
    status: "Pending",
    priority: "Normal",
    image: "/images/scoutplanthree.png",
  },
];

// --- Detail Modal ---
function TaskDetailModal({ task, onClose, onComplete, onDelete }: {
  task: Task;
  onClose: () => void;
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="relative">
          <img
            src={task.image}
            alt={task.player}
            className="w-full h-40 object-cover bg-gray-200"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 bg-white/80 rounded-full hover:bg-white"
          >
            <X size={16} />
          </button>
          {task.priority === "High" && (
            <span className="absolute top-3 left-3 px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full">
              High Priority
            </span>
          )}
        </div>
        <div className="p-5 space-y-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{task.player}</h2>
            <p className="text-sm text-gray-500">{task.club}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-400 mb-1">Location</p>
              <p className="font-medium text-gray-800 flex items-center gap-1">
                <MapPin size={13} className="text-gray-400" /> {task.location}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-400 mb-1">Status</p>
              <p className={`font-medium text-sm ${task.status === "Completed" ? "text-green-600" : task.status === "In Progress" ? "text-blue-600" : "text-yellow-600"}`}>
                {task.status}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-400 mb-1">Date</p>
              <p className="font-medium text-gray-800 flex items-center gap-1">
                <Calendar size={13} className="text-gray-400" /> {task.date}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-400 mb-1">Time</p>
              <p className="font-medium text-gray-800 flex items-center gap-1">
                <Clock size={13} className="text-gray-400" /> {task.time}
              </p>
            </div>
          </div>
          <div className="flex gap-2 pt-1">
            {task.status !== "Completed" && (
              <button
                onClick={() => { onComplete(task.id); onClose(); }}
                className="flex-1 py-2.5 bg-[#0A2342] text-white text-sm font-semibold rounded-lg hover:bg-blue-800 transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle size={15} /> Mark Complete
              </button>
            )}
            <button
              onClick={() => { onDelete(task.id); onClose(); }}
              className="px-4 py-2.5 border border-red-200 text-red-500 text-sm font-semibold rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2"
            >
              <Trash2 size={15} /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Report Modal (stub) ---
function StartReportModal({ task, onClose }: { task: Task; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [notes, setNotes] = useState("");

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-4">
        {submitted ? (
          <div className="text-center py-6 space-y-3">
            <CheckCircle size={48} className="text-green-500 mx-auto" />
            <h2 className="text-xl font-bold text-gray-900">Report Submitted!</h2>
            <p className="text-sm text-gray-500">Your scouting report for {task.player} has been saved.</p>
            <button onClick={onClose} className="px-6 py-2 bg-[#0A2342] text-white rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors">
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Scouting Report</h2>
                <p className="text-sm text-gray-500">{task.player} · {task.club}</p>
              </div>
              <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg">
                <X size={16} />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">Overall Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} className="w-9 h-9 rounded-lg border border-gray-200 text-sm font-bold hover:bg-[#0A2342] hover:text-white hover:border-[#0A2342] transition-colors">
                      {n}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  placeholder="Describe the player's performance, strengths, weaknesses..."
                  className="w-full border border-gray-200 rounded-lg p-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 resize-none"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSubmitted(true)}
                className="flex-1 py-2.5 bg-[#0A2342] text-white text-sm font-semibold rounded-lg hover:bg-blue-800 transition-colors"
              >
                Submit Report
              </button>
              <button onClick={onClose} className="px-4 py-2.5 border border-gray-200 text-gray-600 text-sm font-semibold rounded-lg hover:bg-gray-50">
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// --- Calendar View ---
function CalendarView({ tasks }: { tasks: Task[] }) {
  const grouped = tasks.reduce<Record<string, Task[]>>((acc, t) => {
    acc[t.date] = acc[t.date] ? [...acc[t.date], t] : [t];
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      {Object.entries(grouped).map(([date, dayTasks]) => (
        <div key={date} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
            <CalendarDays size={14} className="text-gray-400" />
            <span className="text-sm font-bold text-gray-700">{date}</span>
            <span className="text-xs text-gray-400">({dayTasks.length} tasks)</span>
          </div>
          <div className="divide-y divide-gray-100">
            {dayTasks.map((t) => (
              <div key={t.id} className="px-4 py-3 flex items-center gap-3">
                <span className="text-xs text-gray-500 w-16 shrink-0">{t.time}</span>
                <span className={`w-2 h-2 rounded-full shrink-0 ${t.priority === "High" ? "bg-red-500" : "bg-blue-400"}`} />
                <span className="text-sm font-medium text-gray-800 flex-1">{t.player}</span>
                <span className="text-xs text-gray-400">{t.location}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      {Object.keys(grouped).length === 0 && (
        <div className="text-center py-12 text-gray-400 text-sm">No tasks scheduled.</div>
      )}
    </div>
  );
}

// --- Filter Dropdown ---
function FilterDropdown({ value, onChange, onClose }: {
  value: string;
  onChange: (v: string) => void;
  onClose: () => void;
}) {
  const options = ["All", "Pending", "In Progress", "Completed", "High Priority"];
  return (
    <div className="absolute right-0 top-10 bg-white border border-gray-200 rounded-xl shadow-lg z-20 w-44 py-1 overflow-hidden">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => { onChange(o); onClose(); }}
          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${value === o ? "font-semibold text-[#0A2342]" : "text-gray-600"}`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

// --- Main Page ---
export default function ScoutingPlanPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [mandates, setMandates] = useState<Mandate[]>(initialMandates);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterValue, setFilterValue] = useState("All");
  const [detailTask, setDetailTask] = useState<Task | null>(null);
  const [reportTask, setReportTask] = useState<Task | null>(null);
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
  const [routeApplied, setRouteApplied] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleAcceptMandate = (id: number) => {
    setMandates((prev) => prev.filter((m) => m.id !== id));
    const newTask: Task = {
      id: Date.now(),
      player: "Target Scouting: LW Candidate",
      club: "Various Academies",
      location: "TBD",
      date: new Date().toISOString().split("T")[0],
      time: "09:00 AM",
      status: "Pending",
      priority: "High",
      image: "/images/avapthree.png",
    };
    setTasks((prev) => [newTask, ...prev]);
    showToast("✅ Mandate accepted & added to your tasks!");
  };

  const handleSaveTask = (formData: any) => {
    const newTask: Task = {
      id: Date.now(),
      player: formData.playerName,
      club: formData.academyClubName,
      location: formData.location || "TBD",
      date: formData.date || new Date().toISOString().split("T")[0],
      time: formData.time || "TBD",
      status: "Pending",
      priority: formData.priority || "Normal",
      image: "/images/scoutplanfour.png",
    };
    setTasks((prev) => [...prev, newTask]);
    setIsModalOpen(false);
    showToast("✅ Task added successfully!");
  };

  const handleComplete = (id: number) => {
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, status: "Completed" } : t));
    showToast("✅ Task marked as complete!");
  };

  const handleDelete = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    showToast("🗑️ Task deleted.");
  };

  const handleSort = () => {
    const next = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(next);
    setTasks((prev) => [...prev].sort((a, b) =>
      next === "asc"
        ? a.date.localeCompare(b.date)
        : b.date.localeCompare(a.date)
    ));
    showToast(`Sorted by date ${next === "asc" ? "↑ ascending" : "↓ descending"}`);
  };

  const handleApplyRoute = () => {
    setRouteApplied(true);
    showToast("🗺️ Optimized route applied to your schedule!");
  };

  const filteredTasks = tasks.filter((t) => {
    const matchesSearch = t.player.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.club.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.location.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    if (filterValue === "All") return true;
    if (filterValue === "High Priority") return t.priority === "High";
    return t.status === filterValue;
  });

  const completedCount = tasks.filter((t) => t.status === "Completed").length;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 space-y-6">

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm px-5 py-3 rounded-xl shadow-xl z-[100] animate-fade-in">
          {toast}
        </div>
      )}

      {/* Add Task Modal */}
      {isModalOpen && (
        <AddTaskForm
          onCancel={() => setIsModalOpen(false)}
          onSave={handleSaveTask}
        />
      )}

      {/* Detail Modal */}
      {detailTask && (
        <TaskDetailModal
          task={detailTask}
          onClose={() => setDetailTask(null)}
          onComplete={handleComplete}
          onDelete={handleDelete}
        />
      )}

      {/* Report Modal */}
      {reportTask && (
        <StartReportModal
          task={reportTask}
          onClose={() => setReportTask(null)}
        />
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Scouting Plan</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your schedule, routes, and scouting assignments.
          </p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button
            onClick={() => setViewMode(viewMode === "list" ? "calendar" : "list")}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 text-gray-700 transition-colors"
          >
            {viewMode === "list" ? (
              <><CalendarDays size={16} /> Calendar View</>
            ) : (
              <><LayoutList size={16} /> List View</>
            )}
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

        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">

          {/* Search + Filter */}
          <div className="bg-white p-3 rounded-xl border border-gray-200 flex items-center gap-3 shadow-sm relative">
            <Search className="text-gray-400 ml-2" size={20} />
            <input
              type="text"
              placeholder="Search by player, club, or location..."
              className="flex-1 outline-none text-sm text-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm("")} className="p-1 hover:bg-gray-100 rounded-lg text-gray-400">
                <X size={14} />
              </button>
            )}
            <div className="relative">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className={`p-2 hover:bg-gray-100 rounded-lg flex items-center gap-1 text-xs font-medium transition-colors ${filterValue !== "All" ? "text-blue-600 bg-blue-50" : "text-gray-500"}`}
              >
                <Filter size={16} />
                {filterValue !== "All" && <span>{filterValue}</span>}
                <ChevronDown size={12} />
              </button>
              {filterOpen && (
                <FilterDropdown
                  value={filterValue}
                  onChange={setFilterValue}
                  onClose={() => setFilterOpen(false)}
                />
              )}
            </div>
          </div>

          {/* Mandate Inbox */}
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
                  High priority requirement for{" "}
                  <span className="font-medium text-gray-900">{mandates[0].club}</span>. Deadline:{" "}
                  <span className="font-semibold text-red-600">{mandates[0].deadline}</span>.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => handleAcceptMandate(mandates[0].id)}
                    className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm"
                  >
                    <CheckCircle size={14} /> Accept Assignment
                  </button>
                  <button
                    onClick={() => setMandates((prev) => prev.filter((m) => m.id !== mandates[0].id))}
                    className="px-4 py-2 bg-white border border-gray-200 text-gray-600 text-xs font-semibold rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <X size={14} /> Dismiss
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Task List or Calendar */}
          {viewMode === "calendar" ? (
            <CalendarView tasks={filteredTasks} />
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  Upcoming Tasks{" "}
                  <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                    {filteredTasks.length}
                  </span>
                </h2>
                <button
                  onClick={handleSort}
                  className="text-xs text-gray-500 font-medium cursor-pointer hover:text-blue-600 flex items-center gap-1"
                >
                  Sort by Date
                  <ChevronDown
                    size={13}
                    className={`transition-transform ${sortOrder === "desc" ? "rotate-180" : ""}`}
                  />
                </button>
              </div>

              {filteredTasks.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-200 text-gray-400 text-sm">
                  No tasks match your search or filter.
                </div>
              )}

              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className={`bg-white p-4 rounded-xl border shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-4 items-start sm:items-center group ${
                    task.status === "Completed" ? "border-green-100 opacity-75" : "border-gray-200"
                  }`}
                >
                  {/* Image */}
                  <div className="shrink-0 relative">
                    <img
                      src={task.image}
                      alt={task.player}
                      className="w-16 h-16 rounded-lg object-cover bg-gray-100 border border-gray-100"
                    />
                    {task.priority === "High" && (
                      <span
                        className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 border-2 border-white rounded-full shadow-sm"
                        title="High Priority"
                      />
                    )}
                    {task.status === "Completed" && (
                      <div className="absolute inset-0 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <CheckCircle size={20} className="text-green-600" />
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-gray-900 truncate text-base">{task.player}</h3>
                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-1 font-medium">
                          <MapPin size={12} /> {task.location}{" "}
                          <span className="text-gray-300">|</span> {task.club}
                        </p>
                      </div>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                          task.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : task.status === "In Progress"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
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
                    {task.status !== "Completed" ? (
                      <button
                        onClick={() => setReportTask(task)}
                        className="flex-1 sm:flex-none px-4 py-2 bg-[#0A2342] text-white text-xs font-semibold rounded-lg hover:bg-blue-800 transition-colors whitespace-nowrap shadow-sm"
                      >
                        Start Report
                      </button>
                    ) : (
                      <span className="flex-1 sm:flex-none px-4 py-2 bg-green-50 text-green-700 text-xs font-semibold rounded-lg text-center border border-green-200">
                        Completed
                      </span>
                    )}

                    {/* Overflow menu */}
                    <div className="relative">
                      <button
                        onClick={() => setMenuOpenId(menuOpenId === task.id ? null : task.id)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                      >
                        <MoreHorizontal size={18} />
                      </button>
                      {menuOpenId === task.id && (
                        <div className="absolute right-0 bottom-10 bg-white border border-gray-200 rounded-xl shadow-lg z-20 w-40 py-1 overflow-hidden">
                          <button
                            onClick={() => { setDetailTask(task); setMenuOpenId(null); }}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                          >
                            <Eye size={14} /> View Details
                          </button>
                          {task.status !== "Completed" && (
                            <button
                              onClick={() => { handleComplete(task.id); setMenuOpenId(null); }}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                            >
                              <CheckCircle size={14} /> Mark Complete
                            </button>
                          )}
                          <button
                            onClick={() => { handleDelete(task.id); setMenuOpenId(null); }}
                            className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 flex items-center gap-2"
                          >
                            <Trash2 size={14} /> Delete Task
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">

          {/* Route Widget */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-gray-800 text-sm">Today's Route</h3>
              <div className="flex items-center gap-1 text-xs font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
                <Sparkles size={12} /> AI Optimized
              </div>
            </div>

            {/* Mock Map */}
            <div className="h-48 bg-gray-200 relative group cursor-pointer overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-medium bg-gray-200 group-hover:bg-gray-300 transition-colors z-10">
                <MapPin className="mr-2" /> Interactive Map View
              </div>
              <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                <svg width="100%" height="100%">
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="gray" strokeWidth="0.5" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-start gap-3 mb-4">
                <div className={`p-2 rounded-lg shrink-0 ${routeApplied ? "bg-green-100 text-green-600" : "bg-purple-100 text-purple-600"}`}>
                  <Navigation size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">
                    {routeApplied ? "Route Applied ✓" : "Efficiency Insight"}
                  </p>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    {routeApplied
                      ? "Your schedule has been reordered for maximum efficiency. Saves 45 mins today."
                      : "3 tasks are within 5km of Onikan. Grouping them saves 45 mins of travel today."}
                  </p>
                </div>
              </div>
              <button
                onClick={handleApplyRoute}
                disabled={routeApplied}
                className={`w-full py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 ${
                  routeApplied
                    ? "bg-green-50 text-green-600 border border-green-200 cursor-default"
                    : "text-purple-600 border border-purple-200 hover:bg-purple-50"
                }`}
              >
                {routeApplied ? (
                  <><CheckCircle size={12} /> Route Applied</>
                ) : (
                  <>Apply Optimized Route <ArrowRight size={12} /></>
                )}
              </button>
            </div>
          </div>

          {/* Monthly Targets */}
          <div className="bg-[#0A2342] text-white rounded-xl shadow-sm p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
            <h3 className="font-bold text-sm opacity-90 mb-4 relative z-10">Monthly Targets</h3>
            <div className="flex justify-between items-end mb-2 relative z-10">
              <span className="text-3xl font-bold">{completedCount + 12}</span>
              <span className="text-xs opacity-70 mb-1">/ 20 Reports Filed</span>
            </div>
            <div className="w-full bg-blue-900/50 rounded-full h-2 mb-4 relative z-10">
              <div
                className="bg-blue-400 h-2 rounded-full transition-all duration-700"
                style={{ width: `${Math.min(((completedCount + 12) / 20) * 100, 100)}%` }}
              />
            </div>
            <p className="text-xs opacity-70 relative z-10">
              {completedCount > 0
                ? `Great progress! ${completedCount} task${completedCount > 1 ? "s" : ""} completed this session.`
                : "You are on track! 8 days remaining in the month."}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}