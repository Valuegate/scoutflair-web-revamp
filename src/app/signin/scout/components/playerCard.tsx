"use client";

import Image from "next/image";
import { FC, useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";

const BASE_URL = "https://scoutflair.top";

function getToken() {
  return localStorage.getItem("authToken") || "";
}

interface PlayerCardProps {
  id: number;
  name: string;
  surname: string;
  age: number;
  nationality: string;
  flag: string;
  position: string;
  number: number;
  image: string;
  email: string;
}

// ── Report Modal ─────────────────────────────────────────────────────────────
function ReportModal({
  player,
  onClose,
}: {
  player: PlayerCardProps;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    strength: "",
    weakness: "",
    scoutComments: "",
    injuryHistory: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    if (!form.scoutComments.trim()) {
      setError("Scout comments are required.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(
        `${BASE_URL}/api/v1/profile/scout/createNewScoutReport`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify({
            playerId: player.id,
            strength: form.strength,
            weakness: form.weakness,
            scoutComments: form.scoutComments,
            injuryHistory: form.injuryHistory,
          }),
        }
      );
      if (!res.ok) throw new Error(`Failed to submit report (${res.status})`);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="relative bg-gradient-to-br from-[#0A2342] to-blue-700 p-5 text-white">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
          >
            <X size={16} />
          </button>
          <h2 className="text-lg font-bold">Scout Report</h2>
          <p className="text-blue-200 text-sm">
            {player.name} {player.surname} · {player.position}
          </p>
        </div>

        <div className="p-5 space-y-3">
          {success ? (
            <div className="text-center py-8">
              <p className="text-green-600 font-semibold text-lg">
                ✅ Report submitted!
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Your scout report for {player.name} {player.surname} has been
                saved.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2 bg-[#0A2342] text-white rounded-xl text-sm hover:bg-blue-800 transition"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              {[
                {
                  label: "Strengths",
                  key: "strength",
                  placeholder: "e.g. Pace, dribbling, vision...",
                },
                {
                  label: "Weaknesses",
                  key: "weakness",
                  placeholder: "e.g. Aerial duels, left foot...",
                },
                {
                  label: "Injury History",
                  key: "injuryHistory",
                  placeholder: "e.g. Knee injury 2023...",
                },
                {
                  label: "Scout Comments *",
                  key: "scoutComments",
                  placeholder: "Overall assessment...",
                },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    {label}
                  </label>
                  <textarea
                    rows={2}
                    placeholder={placeholder}
                    value={form[key as keyof typeof form]}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, [key]: e.target.value }))
                    }
                    className="mt-1 w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                  />
                </div>
              ))}

              {error && (
                <p className="text-red-500 text-xs">
                  {error.includes("500")
                    ? "⚠️ Server error — please contact the backend team."
                    : error}
                </p>
              )}

              <div className="flex gap-2 pt-1">
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex-1 py-2.5 bg-[#0A2342] text-white text-sm font-semibold rounded-xl hover:bg-blue-800 transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {submitting && <Loader2 size={14} className="animate-spin" />}
                  {submitting ? "Submitting..." : "Submit Report"}
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2.5 border border-gray-200 text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Statistics Modal ──────────────────────────────────────────────────────────
type Metrics = {
  goals?: number;
  assist?: number;
  minutes?: number;
  appearances?: number;
  yellowCards?: number;
  redCards?: number;
  dribbles?: number;
  crosses?: number;
  interceptions?: number;
  aerialDuels?: number;
  speed?: number;
  stamina?: number;
  agility?: number;
  composure?: number;
  workRate?: number;
  fitness?: number;
  shotPower?: number;
  accuracy?: number;
};

function StatItem({ label, value }: { label: string; value?: number }) {
  return (
    <div className="bg-gray-50 rounded-xl p-3 text-center">
      <p className="text-lg font-bold text-gray-900">{value ?? "—"}</p>
      <p className="text-xs text-gray-500 mt-0.5">{label}</p>
    </div>
  );
}

function StatisticsModal({
  player,
  onClose,
}: {
  player: PlayerCardProps;
  onClose: () => void;
}) {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const res = await fetch(
          `${BASE_URL}/api/v1/profile/scout/getScoutPlayers/fullDetails?playerId=${player.id}`,
          { headers: { Authorization: `Bearer ${getToken()}` } }
        );
        if (!res.ok) throw new Error(`${res.status}`);
        const data = await res.json();
        const obj = data?.data?.obj || {};
        setMetrics({
          goals: obj.keyMetrics?.goals,
          assist: obj.keyMetrics?.assist,
          minutes: obj.keyMetrics?.minutes,
          appearances: obj.keyMetrics?.appearances,
          yellowCards: obj.keyMetrics?.yellowCards,
          redCards: obj.keyMetrics?.redCards,
          dribbles: obj.keyMetrics?.dribbles,
          crosses: obj.keyMetrics?.crosses,
          interceptions: obj.keyMetrics?.interceptions,
          aerialDuels: obj.keyMetrics?.aerialDuels,
          speed: obj.traitMetrics?.speed,
          stamina: obj.traitMetrics?.stamina,
          agility: obj.traitMetrics?.agility,
          composure: obj.traitMetrics?.composure,
          workRate: obj.traitMetrics?.workRate,
          fitness: obj.skillMetrics?.fitness,
          shotPower: obj.skillMetrics?.shotPower,
          accuracy: obj.skillMetrics?.accuracy,
        });
      } catch (err: any) {
        setError(err.message || "Could not load statistics");
      } finally {
        setLoading(false);
      }
    }
    fetchMetrics();
  }, [player.id]);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="relative bg-gradient-to-br from-[#0A2342] to-blue-700 p-5 text-white">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
          >
            <X size={16} />
          </button>
          <h2 className="text-lg font-bold">Player Statistics</h2>
          <p className="text-blue-200 text-sm">
            {player.name} {player.surname} · {player.position}
          </p>
        </div>

        <div className="p-5">
          {loading && (
            <div className="flex flex-col items-center justify-center py-10 gap-2 text-gray-400">
              <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
              <p className="text-sm">Loading statistics...</p>
            </div>
          )}

          {error && !loading && (
            <div className="text-center py-8 text-gray-500">
              <p className="text-4xl mb-3">📊</p>
              <p className="font-medium text-gray-700">No statistics yet</p>
              <p className="text-sm mt-1">
                This player hasn't had any metrics recorded yet.
              </p>
            </div>
          )}

          {metrics && !loading && (
            <div className="space-y-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Key Metrics
              </p>
              <div className="grid grid-cols-3 gap-2">
                <StatItem label="Goals" value={metrics.goals} />
                <StatItem label="Assists" value={metrics.assist} />
                <StatItem label="Minutes" value={metrics.minutes} />
                <StatItem label="Appearances" value={metrics.appearances} />
                <StatItem label="Yellow Cards" value={metrics.yellowCards} />
                <StatItem label="Red Cards" value={metrics.redCards} />
                <StatItem label="Dribbles" value={metrics.dribbles} />
                <StatItem label="Crosses" value={metrics.crosses} />
                <StatItem label="Interceptions" value={metrics.interceptions} />
              </div>

              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider pt-2">
                Physical & Skills
              </p>
              <div className="grid grid-cols-3 gap-2">
                <StatItem label="Speed" value={metrics.speed} />
                <StatItem label="Stamina" value={metrics.stamina} />
                <StatItem label="Agility" value={metrics.agility} />
                <StatItem label="Composure" value={metrics.composure} />
                <StatItem label="Work Rate" value={metrics.workRate} />
                <StatItem label="Fitness" value={metrics.fitness} />
                <StatItem label="Shot Power" value={metrics.shotPower} />
                <StatItem label="Accuracy" value={metrics.accuracy} />
              </div>
            </div>
          )}

          <button
            onClick={onClose}
            className="mt-5 w-full py-2.5 border border-gray-200 text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-50 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Player Card ───────────────────────────────────────────────────────────────
const PlayerCard: FC<PlayerCardProps> = (player) => {
  const { name, surname, age, nationality, flag, position, number, image } =
    player;

  const fallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name + " " + surname
  )}&size=150&background=fed7aa&color=7c2d12&bold=true`;

  const [src, setSrc] = useState(image || fallback);
  const [showReport, setShowReport] = useState(false);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    if (image) setSrc(image);
  }, [image]);

  return (
    <>
      {showReport && (
        <ReportModal player={player} onClose={() => setShowReport(false)} />
      )}
      {showStats && (
        <StatisticsModal player={player} onClose={() => setShowStats(false)} />
      )}

      <div className="max-w-[350px] bg-white rounded-2xl border shadow-md flex overflow-hidden">
        {/* Player Image */}
        <div className="relative mt-4 w-[122px] h-[145px] rounded-[8px] mx-2 flex-shrink-0">
          <Image
            fill
            src={src}
            alt={`${surname} ${name}`}
            className="object-cover rounded-[8px]"
            sizes="122px"
            onError={() => setSrc(fallback)}
          />
        </div>

        {/* Right Side */}
        <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
          {/* Name and Number */}
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h2 className="text-sm text-gray-700 truncate">{name}</h2>
              <h1 className="text-lg font-bold uppercase truncate">
                {surname}
              </h1>
            </div>
            {number > 0 && (
              <p className="text-2xl font-semibold text-gray-800 flex-shrink-0">
                {number}
              </p>
            )}
          </div>

          {/* Info */}
          <div className="mt-2 text-xs text-gray-700 space-y-0.5">
            <p>
              <span className="font-medium">Age</span> {age || "—"}
            </p>
            <p className="flex items-center gap-1 flex-wrap">
              <span className="font-medium">Nationality</span>
              <span>{nationality}</span>
              <span>{flag}</span>
            </p>
            <p>
              <span className="font-medium">Position</span> {position}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => setShowReport(true)}
              className="px-2 py-1 border border-orange-400 rounded-full text-xs hover:bg-orange-400 hover:text-white transition"
            >
              Reports
            </button>
            <button
              onClick={() => setShowStats(true)}
              className="px-2 py-1 border border-orange-400 rounded-full text-xs hover:bg-orange-400 hover:text-white transition"
            >
              Statistics
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayerCard;
