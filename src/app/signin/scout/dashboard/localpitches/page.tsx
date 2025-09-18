"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-gray-50">
      {/* Left: Academies List */}
      <div className="w-full lg:w-1/2 bg-white rounded-xl shadow-md">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between border-b border-gray-200 p-3 rounded-t-xl gap-3">
          {/* Dropdown Section */}
<div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
  {[
    { label: "Academy Location", placeholder: "Choose Location" },
    { label: "Facilities Quality", placeholder: "Select Type" },
    { label: "Academy Level", placeholder: "Select Year" },
  ].map((item, idx) => (
    <div key={idx} className="flex flex-col text-black text-xs">
      <span className="opacity-80">{item.label}</span>
      <div className="flex items-center justify-between border border-gray-600 rounded px-2 py-1 w-40">
        <span className="font-semibold text-[10px]">{item.placeholder}</span>
        {/* Down arrow */}
        <svg
          width="6"
          height="3"
          viewBox="0 0 6 3"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="rotate-180"
        >
          <path
            d="M0.916 0.667L3 2.75L5.083 0.667"
            stroke="#222"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  ))}
</div>


          {/* Settings Button */}
          <button className="bg-[#041931] p-2 mt-4 rounded self-start lg:self-auto">
            {/* settings icon */}
            <svg
              width="14"
              height="15"
              viewBox="0 0 14 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.3962 7.49977H5.18908M2.64516 7.49977H1.60449M2.64516 7.49977C2.64516 7.16251 2.77914 6.83905 3.01762 6.60057C3.25611 6.36209 3.57956 6.22811 3.91683 6.22811C4.25409 6.22811 4.57755 6.36209 4.81603 6.60057C5.05451 6.83905 5.18849 7.16251 5.18849 7.49977C5.18849 7.83704 5.05451 8.16049 4.81603 8.39898C4.57755 8.63746 4.25409 8.77144 3.91683 8.77144C3.57956 8.77144 3.25611 8.63746 3.01762 8.39898C2.77914 8.16049 2.64516 7.83704 2.64516 7.49977ZM12.3962 11.3539H9.04316M9.04316 11.3539C9.04316 11.6912 8.90886 12.015 8.67032 12.2536C8.43178 12.4921 8.10825 12.6261 7.77091 12.6261C7.43364 12.6261 7.11019 12.4915 6.8717 12.2531C6.63322 12.0146 6.49924 11.6911 6.49924 11.3539M9.04316 11.3539C9.04316 11.0165 8.90886 10.6933 8.67032 10.4547C8.43178 10.2162 8.10825 10.0822 7.77091 10.0822C7.43364 10.0822 7.11019 10.2162 6.8717 10.4547C6.63322 10.6931 6.49924 11.0166 6.49924 11.3539M6.49924 11.3539H1.60449M12.3962 3.64569H10.5849M8.04099 3.64569H1.60449M8.04099 3.64569C8.04099 3.30842 8.17497 2.98497 8.41345 2.74649C8.65194 2.508 8.97539 2.37402 9.31266 2.37402C9.47966 2.37402 9.64502 2.40692 9.7993 2.47082C9.95359 2.53473 10.0938 2.6284 10.2119 2.74649C10.3299 2.86457 10.4236 3.00476 10.4875 3.15904C10.5514 3.31333 10.5843 3.47869 10.5843 3.64569C10.5843 3.81269 10.5514 3.97805 10.4875 4.13234C10.4236 4.28662 10.3299 4.42681 10.2119 4.54489C10.0938 4.66298 9.95359 4.75665 9.7993 4.82056C9.64502 4.88446 9.47966 4.91736 9.31266 4.91736C8.97539 4.91736 8.65194 4.78338 8.41345 4.54489C8.17497 4.30641 8.04099 3.98296 8.04099 3.64569Z"
                stroke="white"
                strokeWidth="0.875"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="mt-10 w-full max-w-[537px] mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-300 pb-2 ml-2 mb-4">
            <h2 className="text-black font-bold text-lg">Available Pitches</h2>
            <button
              onClick={() =>
                router.push("/signin/scout/dashboard/localpitches/pitch-addnew")
              }
              className="px-3 py-1 mr-4 text-[11px] font-medium bg-[#041931] text-white rounded hover:bg-[#06264d] transition"
            >
              Add new
            </button>
          </div>

          {/* Academy Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.from({ length: 14 }).map((_, i) => (
              <AcademyCard key={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Right: Image */}
<div className="flex w-full h-auto lg:w-1/2 mt-6 lg:mt-[-20px] items-center justify-center p-6">
        <img
          src="/images/map-copy.png" // replace with your image
          alt="Academies Banner"
          className="w-full h-[1000px] object-cover rounded-lg"
        />
      </div>
    </div>
  );
}

function AcademyCard() {
  const router = useRouter();
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex gap-4">
      {/* Left: Logo + Rating */}
      <div className="flex flex-col items-center">
        <img
          src="/images/round.png"
          alt="Academy"
          className="w-10 h-10 object-cover"
        />
        <div className="flex items-center text-xs mt-3 text-[#222]">⭐ 4.5</div>
      </div>

      {/* Right: Info */}
      <div className="flex flex-col flex-1 justify-between">
        {/* Academy name row with right icon */}
        <div className="flex items-center justify-between">
          <h3
            className="font-semibold text-sm text-black cursor-pointer hover:underline"
            onClick={() =>
              router.push("/signin/scout/dashboard/localpitches/pitchdetails")
            }
          >
            Valuegate Stadium
          </h3>
                      {/* Right-side Icon */}
          <div className="w-4 h-4 flex items-center justify-center">
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
          </div>
        </div>

        {/* Location Row */}
        <div className="flex items-center gap-1 mt-1">
          {/* Location Icon */}
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
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

          {/* Location Text */}
          <span className="text-[8px] text-black">Kaduna, Nigeria</span>
        </div>

        {/* Players age section (3x horizontally) */}
        <div className="mt-2 grid grid-cols-3 gap-4">
          <div>
            <p className="text-[9px] text-gray-600">Year built</p>
            <p className="text-[9px] font-semibold">2023</p>
          </div>
          <div>
            <p className="text-[9px] text-gray-600">Capacity</p>
            <p className="text-[9px] font-semibold">500</p>
          </div>
          <div>
            <p className="text-[9px] text-gray-600">Facilities</p>
            <p className="text-[9px] font-semibold">good</p>
          </div>
        </div>
      </div>
    </div>
  );
}
