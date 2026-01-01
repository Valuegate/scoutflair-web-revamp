"use client";

import { Sparkles, ArrowRight, MapPin } from "lucide-react";
import StatsCard from "../components/statsCard";
import TopProspects from "../components/topProspect";
import ScoutsBadges from "../components/scoutBadges";
import ScoutingPlan from "../components/scoutingPlan";
import Updates from "../components/updates";
import ActivityFeed from "../components/activityFeed";
import Link from "next/link";


// This implements the "Daily Briefing" strategy
const SmartBriefing = () => {
  return (
    <div className="bg-gradient-to-r from-[#0A2342] to-[#1B3A5B] rounded-xl p-4 sm:p-6 mb-6 text-white shadow-md relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-3xl"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-blue-500/20 rounded-lg backdrop-blur-sm border border-blue-400/30">
              <Sparkles className="w-4 h-4 text-blue-300" />
            </div>
            <span className="text-[10px] sm:text-xs font-bold tracking-wider text-blue-200 uppercase">AI Daily Briefing</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold mb-2">Priority: Winger Mandate Expiring</h2>
          <p className="text-blue-100 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Coach Dave's request for a "Left Winger" expires in 3 days. AI has identified <span className="font-bold text-white">3 potential matches</span> playing at Onikan Stadium this Saturday.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <Link href={"/signin/scout/dashboard/localpitches"}>
          
           <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-colors text-xs sm:text-sm backdrop-blur-sm whitespace-nowrap">
            <MapPin size={14} /> View Venue
          </button>
          
          </Link>
          
          <Link href={"/signin/scout/dashboard/players"}>
           <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-xs sm:text-sm font-semibold shadow-lg whitespace-nowrap">
            Review Players <ArrowRight size={14} />
          </button>
          
          </Link>
        
        </div>
      </div>
    </div>
  );
};

export default function DashboardContent() {
  return (
    <div className="p-4 md:p-6 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      
      {/* 1. AI Smart Briefing (New Feature) */}
      <SmartBriefing />

      {/* 2. Top Row: Stats, Prospects, Badges */}
      {/* Responsive: 1 col on mobile, 2 on tablet, 3 on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <StatsCard />
        <TopProspects />
        {/* On tablet (2 cols), Badges might span full width or sit in 3rd slot */}
        <div className="md:col-span-2 lg:col-span-1">
          <ScoutsBadges />
        </div>
      </div>

      {/* 3. Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column (Scouting Plan & Updates) */}
        {/* Spans 2 columns on large screens */}
        <div className="xl:col-span-2 space-y-6">
          <ScoutingPlan />
          <Updates />
        </div>

        {/* Right Column (Activity Feed) */}
        <div className="xl:col-span-1">
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}