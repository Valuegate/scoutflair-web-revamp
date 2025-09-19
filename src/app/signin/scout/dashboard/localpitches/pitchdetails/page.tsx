"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AcademyDetails() {
  const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();

  const [academyInfo, setAcademyInfo] = useState([
    { blueLabel: "Pitch Name", blueValue: "National Stadium", whiteLabel: "State", whiteValue: "Kaduna" },
    { blueLabel: "L.G.A", blueValue: "Kaduna South", whiteLabel: "Address:", whiteValue: "Enter address" },
    { blueLabel: "Country", blueValue: "Nigeria", whiteLabel: "Geolocation:", whiteValue: "Lat: 34.78965, Lon: 12.88754" },
    { blueLabel: "Dimension", blueValue: "105m X 67m", whiteLabel: "Surface Type", whiteValue: "Turf Grass" },
  ]);

  const handleChange = (i: number, field: "blueValue" | "whiteValue", value: string) => {
    const updated = [...academyInfo];
    updated[i][field] = value;
    setAcademyInfo(updated);
  };

  return (
    <div className="flex flex-col items-center mt-10 min-h-screen p-6 bg-gray-30 ">
     {/* X Button */}
<div className="absolute top-[90px] right-[50px] md:top-[100px] md:right-[50px] xl:top-[110px] xl:right-[160px]">
  <button
    onClick={() => router.push("/signin/scout/dashboard/localpitches")}
    className="hover:opacity-80"
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.5029 12L24 21.4971V24H21.4971L12 14.5029L2.50286 24H0V21.4971L9.49714 12L0 2.50286V0H2.50286L12 9.49714L21.4971 0H24V2.50286L14.5029 12Z"
        fill="black"
        fillOpacity="0.75"
      />
    </svg>
  </button>
</div>

      {/* Header */}
      <div className="w-full max-w-2xl flex justify-between  items-center mb-12">
        <h1 className="text-lg font-bold text-[#0C1017BF]">Pitch Details</h1>
        <span
          className={`text-lg font-bold cursor-pointer hover:underline ${
            isEditing ? "text-green-600" : "text-red-500"
          }`}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Save" : "Edit"}
        </span>
      </div>

      {/* Info Section */}
      <div className="w-full max-w-2xl flex flex-col gap-4">
        {academyInfo.map((item, i) => (
          <div key={i} className="flex flex-col gap-2">
            {/* Blue Box */}
            <div className="flex justify-between items-center bg-[#0A2A56] text-white rounded px-6 py-2">
              <span className="text-sm">{item.blueLabel}:</span>
              {isEditing ? (
                <input
                  type="text"
                  value={item.blueValue}
                  onChange={(e) => handleChange(i, "blueValue", e.target.value)}
                  className="text-sm px-2 py-1 rounded text-black"
                />
              ) : (
                <span className="text-sm">{item.blueValue}</span>
              )}
            </div>

            {/* White Box */}
            <div className="flex justify-between items-center bg-white border border-[#041931] rounded px-6 py-2">
              <span className="text-sm text-black">{item.whiteLabel}</span>
              {isEditing ? (
                <input
                  type="text"
                  value={item.whiteValue}
                  onChange={(e) => handleChange(i, "whiteValue", e.target.value)}
                  className="text-sm px-2 py-1 rounded border border-gray-300"
                />
              ) : (
                <span className="text-sm text-[#000000CC]">{item.whiteValue}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-6 mt-8">
        <button className="px-6 py-2 rounded-md bg-[#0A2A56] text-white font-bold text-sm">
          Pitch Gallery
        </button>
        <button className="px-6 py-2 rounded-md bg-[#0A2A56] text-white font-bold text-sm">
          Locate Pitch
        </button>
      </div>
    </div>
  );
}
