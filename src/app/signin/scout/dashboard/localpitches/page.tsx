"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Loader2, RefreshCw } from "lucide-react";

const BASE_URL = "https://scoutflair.top";

interface LocalPitch {
  id: number;
  name: string;
  address: string;
  lga: string;
  state: string;
  estYear: string;
  facilities: string;
  rating: string;
  surface: string;
  length: string;
  width: string;
  latitude: string;
  longitude: string;
  imageFileKey: string;
}

function getToken() {
  return typeof window !== "undefined"
    ? localStorage.getItem("authToken") ?? ""
    : "";
}

function PitchCard({ pitch }: { pitch: LocalPitch }) {
  const router = useRouter();
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex gap-4 border border-gray-50 hover:border-blue-100 transition-all">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-[10px] font-bold text-[#041931]">
          {pitch.name.substring(0, 2).toUpperCase()}
        </div>
        <div className="flex items-center text-xs mt-3 text-[#222]">
          ⭐ {pitch.rating || "—"}
        </div>
      </div>
      <div className="flex flex-col flex-1 justify-between">
        <div className="flex items-center justify-between">
          <h3
            className="font-semibold text-xs text-black cursor-pointer hover:underline truncate max-w-[120px]"
            onClick={() =>
              router.push(
                `/signin/scout/dashboard/localpitches/pitchdetails?id=${
                  pitch.id
                }&name=${encodeURIComponent(
                  pitch.name
                )}&state=${encodeURIComponent(
                  pitch.state
                )}&lga=${encodeURIComponent(
                  pitch.lga
                )}&address=${encodeURIComponent(
                  pitch.address
                )}&estYear=${encodeURIComponent(
                  pitch.estYear
                )}&facilities=${encodeURIComponent(
                  pitch.facilities
                )}&surface=${encodeURIComponent(
                  pitch.surface
                )}&length=${encodeURIComponent(
                  pitch.length
                )}&width=${encodeURIComponent(
                  pitch.width
                )}&latitude=${encodeURIComponent(
                  pitch.latitude
                )}&longitude=${encodeURIComponent(pitch.longitude)}`
              )
            }
          >
            {pitch.name}
          </h3>
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path
              d="M7.08366 0.375C6.20866 0.375 5.43783 0.8125 5.00033 1.5C4.56283 0.8125 3.79199 0.375 2.91699 0.375C1.54199 0.375 0.416992 1.5 0.416992 2.875C0.416992 5.35417 5.00033 7.875 5.00033 7.875C5.00033 7.875 9.58366 5.375 9.58366 2.875C9.58366 1.5 8.45866 0.375 7.08366 0.375Z"
              fill="#FF0000"
            />
          </svg>
        </div>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-[8px] text-black">
            📍 {pitch.state}, Nigeria
          </span>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-2">
          <div>
            <p className="text-[7px] text-gray-500 uppercase">Built</p>
            <p className="text-[8px] font-bold text-black">
              {pitch.estYear || "—"}
            </p>
          </div>
          <div>
            <p className="text-[7px] text-gray-500 uppercase">Surface</p>
            <p className="text-[8px] font-bold text-black">
              {pitch.surface || "—"}
            </p>
          </div>
          <div>
            <p className="text-[7px] text-gray-500 uppercase">Facilities</p>
            <p className="text-[8px] font-bold text-black">
              {pitch.facilities || "—"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LocalPitchesPage() {
  const router = useRouter();
  const [pitches, setPitches] = useState<LocalPitch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [stateFilter, setStateFilter] = useState("All");
  const [facilitiesFilter, setFacilitiesFilter] = useState("All");
  const [minRating, setMinRating] = useState(0);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const q = new URLSearchParams({ limit: "50", offset: "0" });
      if (stateFilter !== "All") q.set("state", stateFilter);
      const res = await fetch(
        `${BASE_URL}/api/v1/pitches/getLocalPitches?${q}`,
        { headers: { Authorization: `Bearer ${getToken()}`, accept: "*/*" } }
      );
      if (!res.ok) throw new Error(`Failed to load pitches (${res.status})`);
      const data = await res.json();
      setPitches(data.content ?? data ?? []);
    } catch (err: any) {
      setError(err.message || "Failed to load pitches.");
      setPitches([]);
    } finally {
      setLoading(false);
    }
  }, [stateFilter]);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = pitches.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFacilities =
      facilitiesFilter === "All" || p.facilities === facilitiesFilter;
    const matchRating = parseFloat(p.rating || "0") >= minRating;
    return matchSearch && matchFacilities && matchRating;
  });

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-gray-50">
      <div className="w-full lg:w-1/2 bg-white rounded-xl shadow-md overflow-y-auto max-h-screen">
        <div className="flex flex-col border-b border-gray-200 p-3 sticky top-0 bg-white z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
              <div className="flex flex-col text-black text-xs">
                <span className="opacity-80 text-[9px]">Pitch Location</span>
                <select
                  value={stateFilter}
                  onChange={(e) => setStateFilter(e.target.value)}
                  className="border border-gray-600 rounded px-2 py-1 w-40 text-[10px] font-semibold outline-none bg-white"
                >
                  <option value="All">Choose Location</option>
                  <option value="Lagos">Lagos</option>
                  <option value="Kaduna">Kaduna</option>
                  <option value="Akwa Ibom">Akwa Ibom</option>
                  <option value="Abia">Abia</option>
                  <option value="Abuja">Abuja</option>
                </select>
              </div>
              <div className="flex flex-col text-black text-xs">
                <span className="opacity-80 text-[9px]">
                  Facilities Quality
                </span>
                <select
                  value={facilitiesFilter}
                  onChange={(e) => setFacilitiesFilter(e.target.value)}
                  className="border border-gray-600 rounded px-2 py-1 w-40 text-[10px] font-semibold outline-none bg-white"
                >
                  <option value="All">Select Type</option>
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4 lg:mt-0">
              <button
                onClick={load}
                disabled={loading}
                className="p-2 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-40"
              >
                <RefreshCw
                  size={12}
                  className={loading ? "animate-spin" : ""}
                />
              </button>
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className={`p-2 rounded transition-colors ${
                  showAdvanced ? "bg-blue-600" : "bg-[#041931]"
                }`}
              >
                <svg width="14" height="15" viewBox="0 0 14 15" fill="none">
                  <path
                    d="M12.3962 7.49977H5.18908M2.64516 7.49977H1.60449M2.64516 7.49977C2.64516 7.16251 2.77914 6.83905 3.01762 6.60057C3.25611 6.36209 3.57956 6.22811 3.91683 6.22811C4.25409 6.22811 4.57755 6.36209 4.81603 6.60057C5.05451 6.83905 5.18849 7.16251 5.18849 7.49977C5.18849 7.83704 5.05451 8.16049 4.81603 8.39898C4.57755 8.63746 4.25409 8.77144 3.91683 8.77144C3.57956 8.77144 3.25611 8.63746 3.01762 8.39898C2.77914 8.16049 2.64516 7.83704 2.64516 7.49977ZM12.3962 11.3539H9.04316M9.04316 11.3539C9.04316 11.6912 8.90886 12.015 8.67032 12.2536C8.43178 12.4921 8.10825 12.6261 7.77091 12.6261C7.43364 12.6261 7.11019 12.4915 6.8717 12.2531C6.63322 12.0146 6.49924 11.6911 6.49924 11.3539H1.60449M12.3962 3.64569H10.5849M8.04099 3.64569H1.60449"
                    stroke="white"
                    strokeWidth="0.875"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          {showAdvanced && (
            <div className="flex flex-col sm:flex-row gap-4 mt-4 p-3 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <div className="flex-1 flex flex-col">
                <span className="text-[9px] font-bold text-gray-500 mb-1 tracking-widest">
                  SEARCH PITCH NAME
                </span>
                <input
                  type="text"
                  placeholder="Search e.g. National Stadium..."
                  value={searchTerm}
                  className="border border-gray-300 p-2 rounded text-xs outline-none focus:border-blue-500"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-gray-500 mb-1 tracking-widest">
                  MINIMUM RATING
                </span>
                <select
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  className="border border-gray-300 p-2 rounded text-xs outline-none bg-white"
                >
                  <option value="0">Any Rating</option>
                  <option value="5">5 Stars only</option>
                  <option value="4">4+ Stars</option>
                  <option value="3">3+ Stars</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="mt-10 w-full max-w-[537px] mx-auto px-4 pb-10">
          <div className="flex items-center justify-between border-b border-gray-300 pb-2 mb-4">
            <h2 className="text-black font-bold text-lg">Available Pitches</h2>
            <button
              onClick={() =>
                router.push("/signin/scout/dashboard/localpitches/pitch-addnew")
              }
              className="px-3 py-1 text-[11px] font-medium bg-[#041931] text-white rounded hover:bg-[#06264d] transition"
            >
              Add new
            </button>
          </div>

          {error && (
            <div className="mb-4 text-xs text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              ⚠️ {error}
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-16 text-gray-400">
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              <span className="text-sm">Loading pitches…</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400 text-sm">
              <p className="text-3xl mb-2">🏟️</p>
              <p>No pitches found</p>
              <button
                onClick={() =>
                  router.push(
                    "/signin/scout/dashboard/localpitches/pitch-addnew"
                  )
                }
                className="mt-3 text-xs text-blue-500 hover:underline"
              >
                Add the first pitch
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filtered.map((p) => (
                <PitchCard key={p.id} pitch={p} />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="hidden lg:flex w-full lg:w-1/2 items-center justify-center p-6 sticky top-0 h-screen">
        <img
          src="/images/map-copy.png"
          alt="Map View"
          className="w-full h-full object-cover rounded-lg shadow-lg border border-gray-200"
        />
      </div>
    </div>
  );
}
