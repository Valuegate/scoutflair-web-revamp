"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const ACADEMIES_DATA = [
  {
    id: 1,
    name: "Pepsi Football Academy",
    location: "Lagos",
    quality: "Premium",
    level: "Elite",
    rating: 5,
    ages: ["10-15", "16-20", "21-25"],
  },
  {
    id: 2,
    name: "Kwara Football Academy",
    location: "Ilorin",
    quality: "Standard",
    level: "Intermediate",
    rating: 4,
    ages: ["10-15", "16-20"],
  },
  {
    id: 3,
    name: "Mikel Obi Chelsea FA",
    location: "Jos",
    quality: "Premium",
    level: "Elite",
    rating: 5,
    ages: ["16-20", "21-25"],
  },
  {
    id: 4,
    name: "Siaone Soccer Academy",
    location: "Abuja",
    quality: "Basic",
    level: "Beginner",
    rating: 3,
    ages: ["10-15"],
  },
  {
    id: 5,
    name: "Remo Stars Junior",
    location: "Ikenne",
    quality: "Premium",
    level: "Elite",
    rating: 5,
    ages: ["10-15", "16-20", "21-25"],
  },
  {
    id: 6,
    name: "Valegate Academy",
    location: "Kaduna",
    quality: "Standard",
    level: "Intermediate",
    rating: 4,
    ages: ["10-15", "16-20", "21-25"],
  },
];

export default function AcademiesListPage() {
  const router = useRouter();

  // States for Filters
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("All");
  const [quality, setQuality] = useState("All");
  const [level, setLevel] = useState("All");
  const [minRating, setMinRating] = useState(0);

  // Unified Filter Logic
  const filteredAcademies = ACADEMIES_DATA.filter((a) => {
    const matchSearch = a.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchLoc = location === "All" || a.location === location;
    const matchQual = quality === "All" || a.quality === quality;
    const matchLev = level === "All" || a.level === level;
    const matchRate = a.rating >= minRating;
    return matchSearch && matchLoc && matchQual && matchLev && matchRate;
  });

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-gray-50">
      <div className="w-full lg:w-1/2 bg-white rounded-xl shadow-md overflow-y-auto max-h-screen">
        {/* Main Filter Header */}
        <div className="flex flex-col border-b border-gray-200 p-3 sticky top-0 bg-white z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
              {/* Location */}
              <div className="flex flex-col text-black text-xs">
                <span className="opacity-80 text-[9px]">Academy Location</span>
                <select
                  onChange={(e) => setLocation(e.target.value)}
                  className="border border-gray-600 rounded px-2 py-1 w-40 text-[10px] font-semibold outline-none bg-white"
                >
                  <option value="All">All Locations</option>
                  <option value="Lagos">Lagos</option>
                  <option value="Abuja">Abuja</option>
                  <option value="Kaduna">Kaduna</option>
                </select>
              </div>

              {/* Quality */}
              <div className="flex flex-col text-black text-xs">
                <span className="opacity-80 text-[9px]">
                  Facilities Quality
                </span>
                <select
                  onChange={(e) => setQuality(e.target.value)}
                  className="border border-gray-600 rounded px-2 py-1 w-40 text-[10px] font-semibold outline-none bg-white"
                >
                  <option value="All">Select Option</option>
                  <option value="Premium">Premium</option>
                  <option value="Standard">Standard</option>
                  <option value="Basic">Basic</option>
                </select>
              </div>

              {/* Level */}
              <div className="flex flex-col text-black text-xs">
                <span className="opacity-80 text-[9px]">Academy Level</span>
                <select
                  onChange={(e) => setLevel(e.target.value)}
                  className="border border-gray-600 rounded px-2 py-1 w-40 text-[10px] font-semibold outline-none bg-white"
                >
                  <option value="All">Select Option</option>
                  <option value="Elite">Elite</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Beginner">Beginner</option>
                </select>
              </div>
            </div>

            {/* Toggle Advanced Filters Button */}
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className={`p-2 mt-4 rounded self-start lg:self-auto transition-colors ${
                showAdvanced ? "bg-blue-500" : "bg-[#041931]"
              }`}
            >
              <SettingsIcon />
            </button>
          </div>

          {/* Advanced Filters: Search & Ratings (Conditional Rendering) */}
          {showAdvanced && (
            <div className="flex flex-col sm:flex-row gap-4 mt-4 p-3 bg-gray-50 rounded-lg border border-dashed border-gray-300 animate-in fade-in slide-in-from-top-2">
              <div className="flex-1 flex flex-col">
                <span className="text-[9px] font-bold text-gray-500 mb-1">
                  SEARCH BY NAME
                </span>
                <input
                  type="text"
                  placeholder="Type academy name..."
                  className="border p-2 rounded text-xs outline-none"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-gray-500 mb-1">
                  MINIMUM RATING
                </span>
                <select
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  className="border p-2 rounded text-xs outline-none"
                >
                  <option value="0">All Ratings</option>
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
            <h2 className="text-black font-bold text-lg">
              Available Academies
            </h2>
            <button
              onClick={() =>
                router.push("/signin/scout/dashboard/academies/add-new")
              }
              className="px-3 py-1 text-[11px] font-medium bg-[#041931] text-white rounded hover:bg-[#06264d]"
            >
              Add new
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredAcademies.map((academy) => (
              <AcademyCard key={academy.id} academy={academy} />
            ))}
          </div>
        </div>
      </div>

      {/* Map Image Section */}
      <div className="hidden lg:flex w-full lg:w-1/2 items-center justify-center p-6 sticky top-0 h-screen">
        <img
          src="/images/map-copy.png"
          alt="Map"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </div>
  );
}

function AcademyCard({ academy }: { academy: any }) {
  const router = useRouter();
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex gap-4 border border-gray-100 hover:border-blue-200 transition-all">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500 text-xs">
          {academy.name.charAt(0)}
        </div>
        <div className="flex items-center text-xs mt-1 text-[#222]">
          ⭐ {academy.rating}.0
        </div>
      </div>
      <div className="flex flex-col flex-1 justify-between">
        <div className="flex items-center justify-between">
          <h3
            className="font-semibold text-sm text-black cursor-pointer hover:underline"
            onClick={() =>
              router.push("/signin/scout/dashboard/academies/link")
            }
          >
            {academy.name}
          </h3>
          <AcademyIcon />
        </div>
        <div className="flex items-center gap-1 mt-1">
          <LocationIcon />
          <span className="text-[8px] text-black">
            {academy.location}, Nigeria
          </span>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {academy.ages.map((age: string, i: number) => (
            <div key={i}>
              <p className="text-[7px] text-gray-500">Age</p>
              <p className="text-[8px] font-bold text-black">{age}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Icons
const SettingsIcon = () => (
  <svg width="14" height="15" viewBox="0 0 14 15" fill="none">
    <path
      d="M12.3962 7.49977H5.18908M2.64516 7.49977H1.60449M2.64516 7.49977C2.64516 7.16251 2.77914 6.83905 3.01762 6.60057C3.25611 6.36209 3.57956 6.22811 3.91683 6.22811C4.25409 6.22811 4.57755 6.36209 4.81603 6.60057C5.05451 6.83905 5.18849 7.16251 5.18849 7.49977C5.18849 7.83704 5.05451 8.16049 4.81603 8.39898C4.57755 8.63746 4.25409 8.77144 3.91683 8.77144C3.57956 8.77144 3.25611 8.63746 3.01762 8.39898C2.77914 8.16049 2.64516 7.83704 2.64516 7.49977ZM12.3962 11.3539H9.04316M9.04316 11.3539C9.04316 11.6912 8.90886 12.015 8.67032 12.2536C8.43178 12.4921 8.10825 12.6261 7.77091 12.6261C7.43364 12.6261 7.11019 12.4915 6.8717 12.2531C6.63322 12.0146 6.49924 11.6911 6.49924 11.3539M9.04316 11.3539C9.04316 11.0165 8.90886 10.6933 8.67032 10.4547C8.43178 10.2162 8.10825 10.0822 7.77091 10.0822C7.43364 10.0822 7.11019 10.2162 6.8717 10.4547C6.63322 10.6931 6.49924 11.0166 6.49924 11.3539H1.60449M12.3962 3.64569H10.5849M8.04099 3.64569H1.60449M8.04099 3.64569C8.04099 3.30842 8.17497 2.98497 8.41345 2.74649C8.65194 2.508 8.97539 2.37402 9.31266 2.37402C10.5843 3.64569 10.5843 3.64569 10.5843 3.64569"
      stroke="white"
      strokeWidth="0.875"
      strokeLinecap="round"
    />
  </svg>
);
const LocationIcon = () => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 10 11"
    fill="none"
    className="text-black"
  >
    <path
      d="M5.41634 4.25065C5.41634 4.36116 5.37244 4.46714 5.2943 4.54528C5.21616 4.62342 5.11018 4.66732 4.99967 4.66732C4.88917 4.66732 4.78319 4.62342 4.70505 4.54528C4.62691 4.46714 4.58301 4.36116 4.58301 4.25065C4.58301 4.14014 4.62691 4.03416 4.70505 3.95602C4.78319 3.87788 4.88917 3.83398 4.99967 3.83398C5.11018 3.83398 5.21616 3.87788 5.2943 3.95602C5.37244 4.03416 5.41634 4.14014 5.41634 4.25065Z"
      stroke="black"
      strokeWidth="0.8"
      strokeLinejoin="round"
    />
    <path
      d="M7.29134 4.45866C7.29134 5.72449 6.45801 7.16699 4.99967 8.83366C3.54134 7.16699 2.70801 5.72449 2.70801 4.45866C2.70801 3.85087 2.94945 3.26798 3.37922 2.83821C3.80899 2.40844 4.39189 2.16699 4.99967 2.16699C5.60746 2.16699 6.19036 2.40844 6.62013 2.83821C7.0499 3.26798 7.29134 3.85087 7.29134 4.45866Z"
      stroke="black"
      strokeWidth="0.8"
      strokeLinejoin="round"
    />
  </svg>
);
const AcademyIcon = () => (
  <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
    <path
      d="M9.07301 5.80048L8.33301 4.32715L6.25967 8.46715C6.15301 8.69382 5.91967 8.83382 5.66634 8.83382C5.41301 8.83382 5.17967 8.69382 5.07301 8.46715L3.91967 6.16715H0.333008V9.50048C0.333008 10.2338 0.933008 10.8338 1.66634 10.8338H12.333C13.0663 10.8338 13.6663 10.2338 13.6663 9.50048V6.16715H9.66634C9.41301 6.16715 9.17967 6.02715 9.07301 5.80048Z"
      fill="#041931"
    />
    <path
      d="M12.333 0.166992H1.66634C0.933008 0.166992 0.333008 0.766992 0.333008 1.50033V4.83366H4.33301C4.58634 4.83366 4.81967 4.97366 4.92634 5.20033L5.66634 6.67366L7.73967 2.53366C7.96634 2.08033 8.70634 2.08033 8.93301 2.53366L10.0797 4.83366H13.6663V1.50033C13.6663 0.766992 13.0663 0.166992 12.333 0.166992Z"
      fill="#041931"
    />
  </svg>
);
