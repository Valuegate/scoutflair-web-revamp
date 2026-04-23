"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

// Mock Data for Local Pitches
const PITCHES_DATA = [
  {
    id: 1,
    name: "National Stadium",
    location: "Lagos",
    quality: "Premium",
    level: "Elite",
    rating: 5,
    year: "1972",
    capacity: "55,000",
    facilities: "Excellent",
  },
  {
    id: 2,
    name: "Ahmadu Bello Stadium",
    location: "Kaduna",
    quality: "Standard",
    level: "Intermediate",
    rating: 4,
    year: "1962",
    capacity: "16,000",
    facilities: "Good",
  },
  {
    id: 3,
    name: "Godswill Akpabio International",
    location: "Uyo",
    quality: "Premium",
    level: "Elite",
    rating: 5,
    year: "2014",
    capacity: "30,000",
    facilities: "Excellent",
  },
  {
    id: 4,
    name: "Legacy Pitch",
    location: "Lagos",
    quality: "Basic",
    level: "Beginner",
    rating: 3,
    year: "2010",
    capacity: "2,000",
    facilities: "Fair",
  },
  {
    id: 5,
    name: "Enyimba International Stadium",
    location: "Aba",
    quality: "Standard",
    level: "Intermediate",
    rating: 4,
    year: "1992",
    capacity: "16,000",
    facilities: "Good",
  },
  {
    id: 6,
    name: "Valuegate Stadium",
    location: "Kaduna",
    quality: "Standard",
    level: "Beginner",
    rating: 4.5,
    year: "2023",
    capacity: "500",
    facilities: "Good",
  },
];

export default function LocalPitchesPage() {
  const router = useRouter();

  // Filter States
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("All");
  const [quality, setQuality] = useState("All");
  const [level, setLevel] = useState("All");
  const [minRating, setMinRating] = useState(0);

  // Logic: Combined Filtering
  const filteredPitches = PITCHES_DATA.filter((pitch) => {
    const matchSearch = pitch.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchLoc = location === "All" || pitch.location === location;
    const matchQual = quality === "All" || pitch.quality === quality;
    const matchLev = level === "All" || pitch.level === level;
    const matchRate = pitch.rating >= minRating;
    return matchSearch && matchLoc && matchQual && matchLev && matchRate;
  });

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-gray-50">
      {/* Left Side: List */}
      <div className="w-full lg:w-1/2 bg-white rounded-xl shadow-md overflow-y-auto max-h-screen">
        {/* Functional Header Dropdowns */}
        <div className="flex flex-col border-b border-gray-200 p-3 sticky top-0 bg-white z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
              {/* Location Dropdown */}
              <div className="flex flex-col text-black text-xs">
                <span className="opacity-80 text-[9px]">Pitch Location</span>
                <select
                  onChange={(e) => setLocation(e.target.value)}
                  className="border border-gray-600 rounded px-2 py-1 w-40 text-[10px] font-semibold outline-none bg-white"
                >
                  <option value="All">Choose Location</option>
                  <option value="Lagos">Lagos</option>
                  <option value="Kaduna">Kaduna</option>
                  <option value="Uyo">Uyo</option>
                  <option value="Aba">Aba</option>
                </select>
              </div>

              {/* Quality Dropdown */}
              <div className="flex flex-col text-black text-xs">
                <span className="opacity-80 text-[9px]">
                  Facilities Quality
                </span>
                <select
                  onChange={(e) => setQuality(e.target.value)}
                  className="border border-gray-600 rounded px-2 py-1 w-40 text-[10px] font-semibold outline-none bg-white"
                >
                  <option value="All">Select Type</option>
                  <option value="Premium">Premium</option>
                  <option value="Standard">Standard</option>
                  <option value="Basic">Basic</option>
                </select>
              </div>

              {/* Level Dropdown */}
              <div className="flex flex-col text-black text-xs">
                <span className="opacity-80 text-[9px]">Academy Level</span>
                <select
                  onChange={(e) => setLevel(e.target.value)}
                  className="border border-gray-600 rounded px-2 py-1 w-40 text-[10px] font-semibold outline-none bg-white"
                >
                  <option value="All">Select Year</option>
                  <option value="Elite">Elite</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Beginner">Beginner</option>
                </select>
              </div>
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className={`p-2 mt-4 rounded self-start lg:self-auto transition-colors ${
                showAdvanced ? "bg-blue-600" : "bg-[#041931]"
              }`}
            >
              <SettingsIcon />
            </button>
          </div>

          {/* Advanced Filters: Search & Ratings */}
          {showAdvanced && (
            <div className="flex flex-col sm:flex-row gap-4 mt-4 p-3 bg-gray-50 rounded-lg border border-dashed border-gray-300 animate-in fade-in slide-in-from-top-2">
              <div className="flex-1 flex flex-col">
                <span className="text-[9px] font-bold text-gray-500 mb-1 tracking-widest">
                  SEARCH PITCH NAME
                </span>
                <input
                  type="text"
                  placeholder="Search e.g. National Stadium..."
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

        {/* Available Pitches Section */}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredPitches.length > 0 ? (
              filteredPitches.map((pitch) => (
                <PitchCard key={pitch.id} pitch={pitch} />
              ))
            ) : (
              <p className="text-gray-400 text-xs italic p-4">
                No pitches found matching those filters.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Right Side: Fixed Map Image */}
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

function PitchCard({ pitch }: { pitch: any }) {
  const router = useRouter();
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex gap-4 border border-gray-50 hover:border-blue-100 transition-all">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-[10px] font-bold text-[#041931]">
          {pitch.name.substring(0, 2).toUpperCase()}
        </div>
        <div className="flex items-center text-xs mt-3 text-[#222]">
          ⭐ {pitch.rating}
        </div>
      </div>

      <div className="flex flex-col flex-1 justify-between">
        <div className="flex items-center justify-between">
          <h3
            className="font-semibold text-xs text-black cursor-pointer hover:underline truncate max-w-[120px]"
            onClick={() =>
              router.push("/signin/scout/dashboard/localpitches/pitchdetails")
            }
          >
            {pitch.name}
          </h3>
          <HeartIcon />
        </div>

        <div className="flex items-center gap-1 mt-1">
          <LocationIcon />
          <span className="text-[8px] text-black">
            {pitch.location}, Nigeria
          </span>
        </div>

        <div className="mt-2 grid grid-cols-3 gap-2">
          <div>
            <p className="text-[7px] text-gray-500 uppercase tracking-tighter">
              Built
            </p>
            <p className="text-[8px] font-bold text-black">{pitch.year}</p>
          </div>
          <div>
            <p className="text-[7px] text-gray-500 uppercase tracking-tighter">
              Capacity
            </p>
            <p className="text-[8px] font-bold text-black">{pitch.capacity}</p>
          </div>
          <div>
            <p className="text-[7px] text-gray-500 uppercase tracking-tighter">
              Facilities
            </p>
            <p className="text-[8px] font-bold text-black">
              {pitch.facilities}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Icons
const SettingsIcon = () => (
  <svg
    width="14"
    height="15"
    viewBox="0 0 14 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.3962 7.49977H5.18908M2.64516 7.49977H1.60449M2.64516 7.49977C2.64516 7.16251 2.77914 6.83905 3.01762 6.60057C3.25611 6.36209 3.57956 6.22811 3.91683 6.22811C4.25409 6.22811 4.57755 6.36209 4.81603 6.60057C5.05451 6.83905 5.18849 7.16251 5.18849 7.49977C5.18849 7.83704 5.05451 8.16049 4.81603 8.39898C4.57755 8.63746 4.25409 8.77144 3.91683 8.77144C3.57956 8.77144 3.25611 8.63746 3.01762 8.39898C2.77914 8.16049 2.64516 7.83704 2.64516 7.49977ZM12.3962 11.3539H9.04316M9.04316 11.3539C9.04316 11.6912 8.90886 12.015 8.67032 12.2536C8.43178 12.4921 8.10825 12.6261 7.77091 12.6261C7.43364 12.6261 7.11019 12.4915 6.8717 12.2531C6.63322 12.0146 6.49924 11.6911 6.49924 11.3539H1.60449M12.3962 3.64569H10.5849M8.04099 3.64569H1.60449M8.04099 3.64569C8.04099 3.30842 8.17497 2.98497 8.41345 2.74649C8.65194 2.508 8.97539 2.37402 9.31266 2.37402C10.5843 3.64569"
      stroke="white"
      strokeWidth="0.875"
      strokeLinecap="round"
    />
  </svg>
);

const HeartIcon = () => (
  <svg
    width="10"
    height="8"
    viewBox="0 0 10 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.08366 0.375C6.20866 0.375 5.43783 0.8125 5.00033 1.5C4.56283 0.8125 3.79199 0.375 2.91699 0.375C1.54199 0.375 0.416992 1.5 0.416992 2.875C0.416992 5.35417 5.00033 7.875 5.00033 7.875C5.00033 7.875 9.58366 5.375 9.58366 2.875C9.58366 1.5 8.45866 0.375 7.08366 0.375Z"
      fill="#FF0000"
    />
  </svg>
);

const LocationIcon = () => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 10 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.41634 4.25065C5.41634 4.36116 5.37244 4.46714 5.2943 4.54528C4.99967 4.66732 4.58301 4.25065 4.58301 4.25065"
      stroke="black"
      strokeWidth="0.8"
      strokeLinejoin="round"
    />
    <path
      d="M7.29134 4.45866C7.29134 5.72449 6.45801 7.16699 4.99967 8.83366C3.54134 7.16699 2.70801 4.45866 2.70801 4.45866"
      stroke="black"
      strokeWidth="0.8"
      strokeLinejoin="round"
    />
  </svg>
);
