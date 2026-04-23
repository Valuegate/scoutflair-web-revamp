"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AcademyDetailsPage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex flex-col items-center mt-10 min-h-screen p-6 bg-white relative">
      <button
        onClick={() => router.push("/signin/scout/dashboard/academies")}
        className="absolute top-10 right-10 hover:opacity-50"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M14.5029 12L24 21.4971V24H21.4971L12 14.5029L2.50286 24H0V21.4971L9.49714 12L0 2.50286V0H2.50286L12 9.49714L21.4971 0H24V2.50286L14.5029 12Z"
            fill="black"
            fillOpacity="0.75"
          />
        </svg>
      </button>

      <div className="w-full max-w-2xl flex justify-between items-center mb-12">
        <h1 className="text-lg font-bold text-gray-700">Academy Details</h1>
        <span
          className={`text-lg font-bold cursor-pointer hover:underline ${
            isEditing ? "text-green-600" : "text-red-500"
          }`}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Save" : "Edit"}
        </span>
      </div>

      <div className="w-full max-w-2xl flex flex-col gap-4">
        {[
          {
            label: "Academy Name",
            val: "National Stadium",
            subL: "State",
            subV: "Kaduna",
          },
          {
            label: "Phone",
            val: "+234 812 345 6789",
            subL: "Email",
            subV: "academy@email.com",
          },
          {
            label: "Website",
            val: "www.academy.com",
            subL: "Founded",
            subV: "2010",
          },
        ].map((item, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="flex justify-between items-center bg-[#0A2A56] text-white rounded px-6 py-2">
              <span className="text-sm">{item.label}:</span>
              {isEditing ? (
                <input
                  className="text-black text-xs px-2 py-1 rounded"
                  defaultValue={item.val}
                />
              ) : (
                <span className="text-sm">{item.val}</span>
              )}
            </div>
            <div className="flex justify-between items-center bg-white border border-[#041931] rounded px-6 py-2">
              <span className="text-sm text-black">{item.subL}:</span>
              {isEditing ? (
                <input
                  className="text-black text-xs px-2 py-1 border rounded"
                  defaultValue={item.subV}
                />
              ) : (
                <span className="text-sm text-gray-600">{item.subV}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-6 mt-8">
        <button className="px-6 py-2 rounded-md bg-[#0A2A56] text-white font-bold text-sm">
          Academy Gallery
        </button>
        <button className="px-6 py-2 rounded-md bg-[#0A2A56] text-white font-bold text-sm">
          Locate Academy
        </button>
      </div>
    </div>
  );
}
