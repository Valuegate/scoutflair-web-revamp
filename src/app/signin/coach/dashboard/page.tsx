"use client";

import { useState } from 'react';
import { 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Calendar, 
  Target, 
  Zap, 
  AlertTriangle, 
  Trophy, 
  Clock, 
  MapPin, 
  X,
  MessageSquare
} from 'lucide-react';

type PlayerStatus = 'excellent' | 'good' | 'caution';
type TrendDirection = 'up' | 'down';
type EventType = 'Training' | 'Match';
type InsightType = 'warning' | 'success' | 'info';
type MatchResult = 'W' | 'D' | 'L';

interface Player {
  id: number;
  name: string;
  position: string;
  readiness: number;
  status: PlayerStatus;
  avatar: string;
  trend: TrendDirection;
}

interface ScheduleEvent {
  id: number;
  type: EventType;
  title: string;
  date: string;
  time: string;
  location: string;
}

interface AIInsight {
  id: number;
  type: InsightType;
  message: string;
  priority: 'high' | 'medium' | 'low';
}

interface Match {
  opponent: string;
  result: MatchResult;
  score: string;
  date: string;
  performance: number;
}

const CoachDashboardOverview = () => {
  const [aiChatOpen, setAiChatOpen] = useState<boolean>(false);
  const [chatMessage, setChatMessage] = useState<string>('');

  // Mock data
  const teamRoster: Player[] = [
    { id: 1, name: 'John Martinez', position: 'Forward', readiness: 92, status: 'excellent', avatar: 'JM', trend: 'up' },
    { id: 2, name: 'David Chen', position: 'Midfielder', readiness: 78, status: 'good', avatar: 'DC', trend: 'up' },
    { id: 3, name: 'Alex Johnson', position: 'Defender', readiness: 65, status: 'caution', avatar: 'AJ', trend: 'down' },
    { id: 4, name: 'Mike Williams', position: 'Goalkeeper', readiness: 88, status: 'excellent', avatar: 'MW', trend: 'up' },
  ];

  const upcomingSchedule: ScheduleEvent[] = [
    { id: 1, type: 'Training', title: 'Tactical Session', date: 'Today', time: '3:00 PM', location: 'Main Pitch' },
    { id: 2, type: 'Match', title: 'vs Arsenal Academy', date: 'Dec 7', time: '2:00 PM', location: 'Emirates Stadium' },
    { id: 3, type: 'Training', title: 'Fitness & Recovery', date: 'Dec 8', time: '10:00 AM', location: 'Indoor Facility' },
  ];

  const aiInsights: AIInsight[] = [
    { id: 1, type: 'warning', message: 'Alex Johnson showing 23% decrease in sprint speed - consider rest', priority: 'high' },
    { id: 2, type: 'success', message: '3 new scout recommendations match your striker requirements', priority: 'medium' },
    { id: 3, type: 'info', message: 'Optimal formation for next match: 4-3-3 based on opponent analysis', priority: 'high' },
  ];

  const recentMatches: Match[] = [
    { opponent: 'Chelsea U19', result: 'W', score: '3-1', date: 'Nov 30', performance: 85 },
    { opponent: 'Liverpool Youth', result: 'D', score: '2-2', date: 'Nov 23', performance: 72 },
    { opponent: 'Man City Academy', result: 'L', score: '1-2', date: 'Nov 16', performance: 68 },
  ];

  const getReadinessColor = (readiness: number): string => {
    if (readiness >= 85) return 'bg-green-500';
    if (readiness >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getReadinessStatus = (status: PlayerStatus): string => {
    const colors: Record<PlayerStatus, string> = {
      excellent: 'text-green-600 bg-green-50',
      good: 'text-yellow-600 bg-yellow-50',
      caution: 'text-red-600 bg-red-50'
    };
    return colors[status];
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Welcome Back, Coach</h1>
            <p className="text-sm md:text-base text-gray-600 mt-1">Here's what's happening with your team today</p>
          </div>
          <button
            onClick={() => setAiChatOpen(!aiChatOpen)}
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#0A2342] text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors shadow-sm"
          >
            <Zap className="w-5 h-5" />
            AI Assistant
          </button>
        </div>
      </div>

      {/* AI Chat Popup - Responsive Position */}
      {aiChatOpen && (
        <div className="fixed inset-0 z-50 md:inset-auto md:bottom-6 md:right-6 md:w-96 bg-white md:rounded-xl shadow-2xl border border-gray-200 flex flex-col">
          <div className="bg-[#0A2342] text-white p-4 md:rounded-t-xl flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              <span className="font-semibold">AI Coach Assistant</span>
            </div>
            <button onClick={() => setAiChatOpen(false)} className="text-white/80 hover:text-white p-1">
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            <div className="space-y-3">
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                <p className="text-sm text-gray-800 font-medium">👋 Hi Coach! I'm ready to help. Try asking:</p>
                <ul className="text-xs text-gray-600 mt-2 space-y-1.5 pl-1">
                  <li className="flex items-center gap-2 p-1.5 bg-white rounded cursor-pointer hover:bg-blue-50 border border-transparent hover:border-blue-200 transition-colors">
                    <Activity size={12} className="text-blue-500" /> "Which players need rest?"
                  </li>
                  <li className="flex items-center gap-2 p-1.5 bg-white rounded cursor-pointer hover:bg-blue-50 border border-transparent hover:border-blue-200 transition-colors">
                    <Target size={12} className="text-blue-500" /> "Best formation for next match?"
                  </li>
                  <li className="flex items-center gap-2 p-1.5 bg-white rounded cursor-pointer hover:bg-blue-50 border border-transparent hover:border-blue-200 transition-colors">
                    <TrendingUp size={12} className="text-blue-500" /> "Analyze team performance"
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="p-4 border-t bg-white shrink-0 md:rounded-b-xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <MessageSquare size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Key Stats Row - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Team Readiness</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">81%</p>
              <p className="text-xs text-green-600 flex items-center gap-1 mt-1 font-medium">
                <TrendingUp className="w-3 h-3" /> +5% from last week
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-xl">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Players</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">24</p>
              <p className="text-xs text-gray-500 mt-1 font-medium">2 injuries reported</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-xl">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Next Match</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">2 days</p>
              <p className="text-xs text-gray-500 mt-1 font-medium truncate max-w-[120px]" title="vs Arsenal Academy">vs Arsenal Acad.</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-xl">
              <Trophy className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Win Rate</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">68%</p>
              <p className="text-xs text-green-600 flex items-center gap-1 mt-1 font-medium">
                <TrendingUp className="w-3 h-3" /> +12% this month
              </p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-xl">
              <Target className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid - Stack on mobile, side-by-side on larger screens */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Team Roster with AI Readiness (Spans 2 columns on large screens) */}
        <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col">
          <div className="p-5 border-b border-gray-200 flex flex-row items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Team Roster</h2>
              <p className="text-xs md:text-sm text-gray-500">AI Health & Readiness Scores</p>
            </div>
            <button className="text-blue-600 text-sm font-semibold hover:text-blue-700 hover:bg-blue-50 px-3 py-1 rounded-lg transition-colors">
              View All
            </button>
          </div>
          <div className="p-5">
            <div className="space-y-4">
              {teamRoster.map((player) => (
                <div key={player.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors gap-4">
                  {/* Player Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-[#0A2342] rounded-full flex items-center justify-center text-white font-bold text-sm md:text-base shrink-0">
                      {player.avatar}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{player.name}</h3>
                      <p className="text-xs md:text-sm text-gray-600">{player.position}</p>
                    </div>
                  </div>

                  {/* Stats & Status */}
                  <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                    <div className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-xs md:text-sm font-medium text-gray-900">{player.readiness}% Ready</span>
                        {player.trend === 'up' ? (
                          <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-green-600" />
                        ) : (
                          <TrendingDown className="w-3 h-3 md:w-4 md:h-4 text-red-600" />
                        )}
                      </div>
                      <div className="mt-1">
                        <span className={`text-[10px] md:text-xs px-2 py-0.5 rounded-full font-medium uppercase ${getReadinessStatus(player.status)}`}>
                          {player.status}
                        </span>
                      </div>
                    </div>
                    
                    {/* Progress Bar (Hidden on very small screens) */}
                    <div className="hidden sm:block w-20 md:w-24 bg-gray-200 rounded-full h-1.5 md:h-2">
                      <div
                        className={`${getReadinessColor(player.readiness)} h-1.5 md:h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${player.readiness}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: AI Insights & Schedule */}
        <div className="space-y-6">
          
          {/* AI Insights & Alerts */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-5 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">AI Insights</h2>
              </div>
            </div>
            <div className="p-5">
              <div className="space-y-3">
                {aiInsights.map((insight) => (
                  <div
                    key={insight.id}
                    className={`p-3 rounded-lg border-l-4 ${
                      insight.type === 'warning'
                        ? 'bg-red-50 border-red-500'
                        : insight.type === 'success'
                        ? 'bg-green-50 border-green-500'
                        : 'bg-blue-50 border-blue-500'
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="shrink-0 mt-0.5">
                        {insight.type === 'warning' && <AlertTriangle className="w-4 h-4 text-red-600" />}
                        {insight.type === 'success' && <Target className="w-4 h-4 text-green-600" />}
                        {insight.type === 'info' && <Zap className="w-4 h-4 text-blue-600" />}
                      </div>
                      <div>
                        <p className="text-xs md:text-sm text-gray-800 leading-snug">{insight.message}</p>
                        <span className={`text-[10px] mt-1.5 inline-block px-1.5 py-0.5 rounded font-medium uppercase tracking-wide ${
                          insight.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {insight.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Smart Schedule */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-5 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-900">Schedule</h2>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
            <div className="p-5">
              <div className="space-y-3">
                {upcomingSchedule.map((event) => (
                  <div key={event.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg border border-transparent hover:border-gray-200 transition-colors">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                      event.type === 'Match' ? 'bg-purple-100' : 'bg-blue-100'
                    }`}>
                      {event.type === 'Match' ? (
                        <Trophy className={`w-5 h-5 ${event.type === 'Match' ? 'text-purple-600' : 'text-blue-600'}`} />
                      ) : (
                        <Activity className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${
                          event.type === 'Match' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {event.type}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900 text-xs md:text-sm truncate">{event.title}</h3>
                      <div className="flex items-center gap-3 mt-1 text-[10px] md:text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {event.date}, {event.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Match Results */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-5 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">Recent Results</h2>
            </div>
            <div className="p-5">
              <div className="space-y-3">
                {recentMatches.map((match, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white shrink-0 ${
                        match.result === 'W' ? 'bg-green-500' : match.result === 'D' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}>
                        {match.result}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-gray-900 text-xs md:text-sm truncate">{match.opponent}</h3>
                        <p className="text-[10px] text-gray-500">{match.date}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-gray-900">{match.score}</p>
                      <span className={`text-[10px] font-medium ${
                        match.performance >= 80 ? 'text-green-600' : match.performance >= 70 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {match.performance}% Perf.
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CoachDashboardOverview;