"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const activities = [
  {
    user: "John Boyega",
    action: "Submitted a report on Henry Ishaya.",
    time: "Yesterday",
    image: "/images/actone.png",
  },
  {
    user: "James Austin",
    action: "Added Tobi Irefin to Top Prospect list.",
    time: "Yesterday",
    image: "/images/acttwo.png",
  },
  {
    user: "Cynthia Peacok",
    action: "Attended a Local match in Kaduna.",
    time: "Yesterday",
    image: "/images/actthree.png",
  },
  {
    user: "Adewale Usman",
    action: "Added a note on Tobi Irefin.",
    time: "2 days ago",
    image: "/images/Adewale.png",
  },
  {
    user: "Olumide Balogun",
    action: "Scouted Kasim Peter in California.",
    time: "2 days ago",
    image: "/images/scdp.png",
  },
  {
    user: "Larry Smith",
    action: "Scouted Chinedu Okonkwo in Jos.",
    time: "3 days ago",
    image: "/images/Larry.png",
  },
  {
    user: "Angel Robinson",
    action: "Scouted Babajide Akinyemi in Lagos.",
    time: "3 days ago",
    image: "/images/Robinson.png",
  },
  {
    user: "Dare Emmanuel",
    action: "Scouted Adesola Bankole in Abuja.",
    time: "4 days ago",
    image: "/images/Dare.png",
  },
  {
    user: "Eniola Adekoya",
    action: "Scouted Kasim Segun in Abuja.",
    time: "4 days ago",
    image: "/images/Eniola.png",
  },
];

const PREVIEW_COUNT = 4;

export default function ActivityFeed() {
  const [expanded, setExpanded] = useState(false);

  const visible = expanded ? activities : activities.slice(0, PREVIEW_COUNT);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Activity Feed</h3>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-gray-800 text-sm font-medium hover:underline flex items-center gap-1 transition-colors hover:text-blue-600"
        >
          {expanded ? (
            <>
              <ChevronUp size={14} /> Show Less
            </>
          ) : (
            <>
              View All <ChevronDown size={14} />
            </>
          )}
        </button>
      </div>

      <div className="space-y-4">
        {visible.map((activity, i) => (
          <div
            key={i}
            className="flex items-start p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
          >
            <img
              src={activity.image}
              width={32}
              height={32}
              alt={activity.user}
              className="rounded-full h-8 w-8 mr-3 object-cover shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 group-hover:text-[#0A2342] transition-colors">
                {activity.user}
              </p>
              <div className="flex justify-between items-start gap-2">
                <p className="text-sm text-gray-600 leading-snug">
                  {activity.action}
                </p>
                <p className="text-xs text-gray-400 shrink-0 mt-0.5">
                  {activity.time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Collapsed hint */}
      {!expanded && activities.length > PREVIEW_COUNT && (
        <button
          onClick={() => setExpanded(true)}
          className="w-full mt-4 py-2 text-xs text-gray-500 hover:text-blue-600 border border-dashed border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
        >
          +{activities.length - PREVIEW_COUNT} more activities
        </button>
      )}
    </div>
  );
}
