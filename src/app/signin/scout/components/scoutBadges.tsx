"use client";
import { useState } from "react";
import { X } from "lucide-react";

const badges = [
  {
    label: "Experience",
    value: "5",
    status: "Professional",
    color: "text-red-500",
    bg: "bg-red-50",
    desc: "5 years of active scouting experience across 3 leagues.",
  },
  {
    label: "Transfers",
    value: "12",
    status: "Successful",
    color: "text-green-500",
    bg: "bg-green-50",
    desc: "12 successful player transfers facilitated this season.",
  },
  {
    label: "Accuracy",
    value: "87%",
    status: "Scouting",
    color: "text-blue-500",
    bg: "bg-blue-50",
    desc: "87% scouting report accuracy based on player outcomes.",
  },
];

type Badge = (typeof badges)[0];

function BadgeModal({ badge, onClose }: { badge: Badge; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xs p-5 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-bold text-gray-900">{badge.label}</h2>
            <p className={`text-sm font-medium ${badge.color}`}>
              {badge.status}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-full"
          >
            <X size={15} />
          </button>
        </div>
        <div className={`${badge.bg} rounded-xl p-4 text-center`}>
          <p className="text-4xl font-bold text-gray-900">{badge.value}</p>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">{badge.desc}</p>
        <button
          onClick={onClose}
          className="w-full py-2.5 bg-[#0A2342] text-white text-sm font-semibold rounded-xl hover:bg-blue-800 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default function ScoutsBadges() {
  const [selected, setSelected] = useState<Badge | null>(null);

  return (
    <div className="bg-white rounded-[12px] shadow-md p-3 w-full sm:max-w-[350px] h-[145px]">
      {selected && (
        <BadgeModal badge={selected} onClose={() => setSelected(null)} />
      )}

      <h3 className="text-sm sm:text-base font-semibold mb-2 text-gray-800">
        Scout&apos;s Badges
      </h3>

      <div className="flex justify-between gap-2 h-[calc(100%-32px)]">
        {badges.map((badge, i) => (
          <button
            key={i}
            onClick={() => setSelected(badge)}
            className="bg-white rounded-md flex-1 shadow-md flex flex-col justify-center items-center py-2 hover:shadow-lg hover:scale-105 transition-all cursor-pointer"
          >
            <p className="text-[11px] text-gray-600">{badge.label}</p>
            <p className="text-lg sm:text-xl font-bold text-gray-900">
              {badge.value}
            </p>
            <p className={`text-[11px] font-medium ${badge.color}`}>
              {badge.status}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
