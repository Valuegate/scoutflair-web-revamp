"use client";

import StatsCard from "../components/statsCard";
import TopProspects from "../components/topProspect";
import ScoutsBadges from "../components/scoutBadges";
import ScoutingPlan from "../components/scoutingPlan";
import Updates from "../components/updates";
import ActivityFeed from "../components/activityFeed"

export default function DashboardContent() {
  return (
    <div className="p-0   min-h-screen">
      {/* Top Row: Stats, Prospects, Badges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard />
        <TopProspects />
        <ScoutsBadges />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="md:col-span-2 space-y-6">
          <ScoutingPlan />
          <Updates />
        </div>

        {/* Right Column */}
        <div className="md:col-span-1">
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}
