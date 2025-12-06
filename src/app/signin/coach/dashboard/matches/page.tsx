"use client";

import React, { useState } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  MapPin, 
  Clock, 
  Calendar as CalendarIcon,
  Filter
} from "lucide-react";

// Event Types for categorization
type EventType = "match" | "training" | "scouting" | "medical";

interface CalendarEvent {
  id: number;
  title: string;
  date: string; // YYYY-MM-DD
  time: string;
  type: EventType;
  location?: string;
  description?: string;
}

// Mock Data
const events: CalendarEvent[] = [
  { id: 1, title: "vs Lagoon FC", date: "2025-10-14", time: "16:00", type: "match", location: "Home Stadium", description: "League Match - Week 12" },
  { id: 2, title: "Recovery Session", date: "2025-10-15", time: "10:00", type: "training", location: "Training Ground B" },
  { id: 3, title: "Open Trials (U19)", date: "2025-10-18", time: "09:00", type: "scouting", location: "Academy Pitch 1", description: "Reviewing shortlisted wingers" },
  { id: 4, title: "Tola Aina Return", date: "2025-10-20", time: "08:00", type: "medical", description: "Expected return to full training" },
  { id: 5, title: "Tactical Drill", date: "2025-10-12", time: "15:30", type: "training", location: "Main Pitch" },
  { id: 6, title: "vs Remo Stars", date: "2025-10-21", time: "18:00", type: "match", location: "Away", description: "Cup Semi-Final" },
];

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 9, 1)); // Oct 2025
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Helper to get days in month
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // Helper to get day of week for the 1st of the month (0 = Sun, 1 = Mon...)
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  
  // Generate calendar grid array
  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null); // Empty slots for previous month
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const getEventsForDay = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(e => e.date === dateStr);
  };

  const getEventStyle = (type: EventType) => {
    switch (type) {
      case "match": return "bg-blue-100 text-blue-700 border-blue-200";
      case "training": return "bg-green-100 text-green-700 border-green-200";
      case "scouting": return "bg-purple-100 text-purple-700 border-purple-200";
      case "medical": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  // Dot color for mobile view
  const getEventDotColor = (type: EventType) => {
    switch (type) {
        case "match": return "bg-blue-500";
        case "training": return "bg-green-500";
        case "scouting": return "bg-purple-500";
        case "medical": return "bg-yellow-500";
        default: return "bg-gray-400";
      }
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDayClick = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    // Toggle selection: if clicking the same day, clear selection to show full list again
    if (selectedDate === dateStr) {
        setSelectedDate(null);
    } else {
        setSelectedDate(dateStr);
    }
  };

  // Determine what to show in the sidebar: Selected Date events OR All Upcoming events
  const displayedEvents = selectedDate 
    ? events.filter(e => e.date === selectedDate) 
    : events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="flex flex-col h-full md:h-[calc(100vh-8rem)] gap-4 md:gap-6 p-4 md:p-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Matches</h1>
          <p className="text-sm text-gray-500 mt-1">View fixtures, schedule trainings, and manage team events.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 bg-white text-gray-700">
            <Filter size={16} /> Filter
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-[#0A2342] text-white rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors">
            <Plus size={16} /> Add Event
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
        
        {/* --- MAIN CALENDAR GRID (3/4 Width) --- */}
        <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-[500px] md:h-full">
          {/* Calendar Header */}
          <div className="p-4 flex items-center justify-between border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <CalendarIcon className="text-blue-600" size={20} />
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <div className="flex gap-1">
              <button onClick={handlePrevMonth} className="p-1.5 hover:bg-gray-100 rounded-md transition-colors">
                <ChevronLeft size={20} />
              </button>
              <button onClick={handleNextMonth} className="p-1.5 hover:bg-gray-100 rounded-md transition-colors">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Days Header */}
          <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="py-2 text-center text-[10px] md:text-xs font-semibold text-gray-500 uppercase">
                {day}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 flex-1 auto-rows-fr">
            {calendarDays.map((day, i) => {
              if (day === null) return <div key={`empty-${i}`} className="bg-gray-50/30 border-b border-r border-gray-100"></div>;
              
              const daysEvents = getEventsForDay(day);
              const isToday = day === 14; // Mocking "Today" as the 14th for visual purposes
              const isSelected = selectedDate === `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

              return (
                <div 
                  key={day} 
                  onClick={() => handleDayClick(day)}
                  className={`min-h-[60px] md:min-h-[100px] border-b border-r border-gray-100 p-1 md:p-2 cursor-pointer transition-colors relative hover:bg-blue-50/30 ${isSelected ? 'bg-blue-50' : 'bg-white'}`}
                >
                  <span className={`text-[10px] md:text-xs font-medium w-5 h-5 md:w-6 md:h-6 flex items-center justify-center rounded-full mb-1 ${isToday ? 'bg-[#0A2342] text-white' : 'text-gray-700'}`}>
                    {day}
                  </span>
                  
                  {/* Desktop View: Text Events */}
                  <div className="hidden md:block space-y-1">
                    {daysEvents.map(event => (
                      <div 
                        key={event.id} 
                        className={`text-[10px] px-1.5 py-0.5 rounded border truncate font-medium ${getEventStyle(event.type)}`}
                        title={event.title}
                      >
                        {event.time} {event.title}
                      </div>
                    ))}
                  </div>

                  {/* Mobile View: Dots */}
                  <div className="md:hidden flex flex-wrap gap-1 justify-center mt-1">
                    {daysEvents.map(event => (
                        <div key={event.id} className={`w-1.5 h-1.5 rounded-full ${getEventDotColor(event.type)}`}></div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* --- SIDEBAR: DETAILS (1/4 Width) --- */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-auto lg:h-full">
          <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h3 className="font-semibold text-gray-800 text-sm">
              {selectedDate 
                ? new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) 
                : "Upcoming Schedule"}
            </h3>
            {/* Clear selection button only if a date is selected */}
            {selectedDate && (
                <button onClick={() => setSelectedDate(null)} className="text-xs text-blue-600 hover:underline">
                    View All
                </button>
            )}
          </div>
          
          <div className="flex-1 p-4 space-y-4 lg:overflow-y-auto max-h-[400px] lg:max-h-none">
            {displayedEvents.length > 0 ? (
              displayedEvents.map(event => (
                <div key={event.id} className="p-3 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${getEventStyle(event.type).replace('border', '')}`}>
                      {event.type}
                    </span>
                    <div className="text-right">
                        <span className="text-xs text-gray-500 font-medium block">{event.time}</span>
                        {/* Show date in sidebar if viewing all events */}
                        {!selectedDate && (
                            <span className="text-[10px] text-gray-400 block">{new Date(event.date).toLocaleDateString(undefined, {month:'short', day:'numeric'})}</span>
                        )}
                    </div>
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">{event.title}</h4>
                  {event.location && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                      <MapPin size={12} /> {event.location}
                    </div>
                  )}
                  {event.description && (
                    <p className="text-xs text-gray-600 italic mt-2 border-l-2 border-gray-200 pl-2">
                      "{event.description}"
                    </p>
                  )}
                  
                  {/* Contextual Action Button based on Event Type */}
                  {event.type === 'match' && (
                    <button className="w-full mt-3 py-1.5 text-xs font-medium text-blue-600 border border-blue-200 rounded hover:bg-blue-50 transition-colors">
                      Match Prep
                    </button>
                  )}
                  {event.type === 'scouting' && (
                    <button className="w-full mt-3 py-1.5 text-xs font-medium text-purple-600 border border-purple-200 rounded hover:bg-purple-50 transition-colors">
                      View Prospect List
                    </button>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock size={20} className="text-gray-400" />
                </div>
                <p className="text-sm text-gray-500">No events scheduled.</p>
                <button className="mt-4 text-xs text-blue-600 font-medium hover:underline">
                  + Add Event
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}