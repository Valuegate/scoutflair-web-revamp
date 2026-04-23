"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function EditAcademyPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      <div className="flex-1 flex flex-col gap-6">
        <div className="flex justify-between items-center bg-white rounded-xl border border-gray-300 shadow p-3">
          <span className="font-bold text-sm text-gray-400">Edit Mode</span>
          <span
            className="font-bold text-sm text-red-500 cursor-pointer hover:underline"
            onClick={() => router.push("/signin/scout/dashboard/edit-profile")}
          >
            Delete
          </span>
        </div>

        <div className="bg-white rounded-lg shadow p-5 flex flex-col gap-4">
          <h2 className="font-semibold text-lg text-black">
            Update Information
          </h2>
          {["Academy Name", "Primary Address", "Coordinates", "Facilities"].map(
            (label, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span className="text-sm font-normal text-black opacity-80">
                  {label}:
                </span>
                <input
                  type="text"
                  className="w-full h-10 border border-gray-400 rounded px-2 text-sm"
                  placeholder="Update value..."
                />
              </div>
            )
          )}

          <div className="flex gap-4 mt-10">
            <button
              onClick={() => router.back()}
              className="flex-1 border border-gray-400 rounded-lg py-2 font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={() => router.push("/signin/scout/dashboard/academies")}
              className="flex-1 bg-[#0A2A56] rounded-lg py-2 font-semibold text-white"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <img
          src="/images/map-copy.png"
          className="w-full h-[600px] object-cover rounded-xl"
          alt="Preview"
        />
      </div>
    </div>
  );
}
