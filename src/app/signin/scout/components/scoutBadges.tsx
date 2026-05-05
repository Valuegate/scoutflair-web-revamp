"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

const BASE_URL = "https://scoutflair.top";

function getToken() {
  return localStorage.getItem("authToken") || "";
}

type Badge = {
  label: string;
  value: string;
  status: string;
  color: string;
  bg: string;
  desc: string;
};

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

function SkeletonBadge() {
  return (
    <div className="bg-white rounded-md flex-1 shadow-md flex flex-col justify-center items-center py-2 gap-1 animate-pulse">
      <div className="h-2.5 w-12 bg-gray-200 rounded" />
      <div className="h-5 w-8 bg-gray-300 rounded" />
      <div className="h-2.5 w-14 bg-gray-200 rounded" />
    </div>
  );
}

export default function ScoutsBadges() {
  const [selected, setSelected] = useState<Badge | null>(null);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBadges() {
      setLoading(true);
      setError(null);

      try {
        const token = getToken();
        const headers = { Authorization: `Bearer ${token}` };

        const [profileRes, prospectsRes, metricsRes] = await Promise.allSettled(
          [
            fetch(`${BASE_URL}/api/v1/profile/scout/getScoutProfile`, {
              headers,
            }).then((r) => r.json()),
            fetch(`${BASE_URL}/api/v1/profile/scout/getScoutPlayerProspects`, {
              headers,
            }).then((r) => r.json()),
            fetch(`${BASE_URL}/api/v1/profile/scout/getScoutPlayerMetrics`, {
              headers,
            }).then((r) => r.json()),
          ]
        );

        // ── Experience ──────────────────────────────────────────
        let experienceValue = "—";
        let experienceDesc = "No experience data available.";
        if (profileRes.status === "fulfilled") {
          const profile = profileRes.value;
          experienceValue = profile?.experience ?? profile?.career ?? "—";
          experienceDesc = profile?.career
            ? `Career: ${profile.career}`
            : profile?.experience
            ? `${profile.experience} of scouting experience.`
            : "Experience data from scout profile.";
        }

        // ── Prospects ───────────────────────────────────────────
        let prospectsValue = "—";
        let prospectsDesc = "No prospect data available.";
        if (prospectsRes.status === "fulfilled") {
          const prospects = prospectsRes.value;
          const count =
            prospects?.data?.totalCount ??
            (Array.isArray(prospects?.data?.obj)
              ? prospects.data.obj.length
              : null);
          prospectsValue = count !== null ? String(count) : "—";
          prospectsDesc =
            count !== null
              ? `${count} player prospect(s) added to your watchlist.`
              : "Prospect count unavailable.";
        }

        // ── Accuracy ────────────────────────────────────────────
        let accuracyValue = "—";
        let accuracyDesc = "No metrics data available.";
        if (metricsRes.status === "fulfilled") {
          const obj = metricsRes.value?.data?.obj;
          if (obj) {
            if (typeof obj.accuracy === "number") {
              accuracyValue = `${obj.accuracy}%`;
              accuracyDesc = "Scouting accuracy from player skill metrics.";
            } else {
              const fields = [
                "accuracy",
                "fitness",
                "shotPower",
                "header",
                "longShots",
                "oneToOne",
              ] as const;
              const vals = fields
                .map((f) => obj[f])
                .filter((v): v is number => typeof v === "number");
              if (vals.length) {
                const avg = Math.round(
                  vals.reduce((a, b) => a + b, 0) / vals.length
                );
                accuracyValue = `${avg}%`;
                accuracyDesc = `Avg of ${vals.length} tracked skill metrics.`;
              }
            }
          }
        }

        setBadges([
          {
            label: "Experience",
            value: experienceValue,
            status: "Professional",
            color: "text-red-500",
            bg: "bg-red-50",
            desc: experienceDesc,
          },
          {
            label: "Prospects",
            value: prospectsValue,
            status: "Identified",
            color: "text-green-500",
            bg: "bg-green-50",
            desc: prospectsDesc,
          },
          {
            label: "Accuracy",
            value: accuracyValue,
            status: "Scouting",
            color: "text-blue-500",
            bg: "bg-blue-50",
            desc: accuracyDesc,
          },
        ]);
      } catch (err) {
        setError("Failed to load badge data.");
      } finally {
        setLoading(false);
      }
    }

    fetchBadges();
  }, []);

  return (
    <div className="bg-white rounded-[12px] shadow-md p-3 w-full sm:max-w-[350px]">
      {selected && (
        <BadgeModal badge={selected} onClose={() => setSelected(null)} />
      )}

      <h3 className="text-sm sm:text-base font-semibold mb-2 text-gray-800">
        Scout&apos;s Badges
      </h3>

      <div className="flex justify-between gap-2 h-[100px]">
        {loading ? (
          <>
            <SkeletonBadge />
            <SkeletonBadge />
            <SkeletonBadge />
          </>
        ) : error ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-xs text-red-400 text-center">{error}</p>
          </div>
        ) : (
          badges.map((badge, i) => (
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
          ))
        )}
      </div>
    </div>
  );
}
