"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const BASE_URL = "https://scoutflair.top";

function getToken() {
  return localStorage.getItem("authToken") || "";
}

export default function AddNewAcademyPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    address: "",
    state: "",
    lga: "",
    country: "Nigeria",
    phone: "",
    email: "",
    website: "",
    description: "",
    playersCount: "",
    founded: "",
    principal: "",
    rating: "0",
    winCount: "0",
    lostCount: "0",
    totalMatches: "0",
    graduatedCount: "0",
    latitude: "0",
    longitude: "0",
    imageUrl: "",
    logoUrl: "",
  });

  function handleChange(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    if (!form.name.trim()) {
      setError("Academy name is required.");
      return;
    }
    if (!form.founded) {
      setError("Founded date is required.");
      return;
    }
    if (!form.address.trim()) {
      setError("Address is required.");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(`${BASE_URL}/api/v1/est/academy/addAcademy`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          name: form.name,
          address: form.address,
          state: form.state,
          lga: form.lga,
          country: form.country,
          phone: form.phone,
          email: form.email,
          website: form.website,
          description: form.description,
          playersCount: form.playersCount,
          founded: form.founded,
          principal: form.principal,
          rating: form.rating,
          winCount: form.winCount,
          lostCount: form.lostCount,
          totalMatches: form.totalMatches,
          graduatedCount: form.graduatedCount,
          latitude: form.latitude,
          longitude: form.longitude,
          imageUrl: form.imageUrl,
          logoUrl: form.logoUrl,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || `Failed (${res.status})`);
      router.push("/signin/scout/dashboard/academies");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  const fields: { label: string; key: string; type?: string }[] = [
    { label: "Academy Name", key: "name" },
    { label: "Principal / Head Coach", key: "principal" },
    { label: "Address", key: "address" },
    { label: "LGA", key: "lga" },
    { label: "State", key: "state" },
    { label: "Country", key: "country" },
    { label: "Phone", key: "phone", type: "tel" },
    { label: "Email", key: "email", type: "email" },
    { label: "Website", key: "website" },
    { label: "Description", key: "description" },
    { label: "Players Count", key: "playersCount", type: "number" },
    { label: "Graduated Count", key: "graduatedCount", type: "number" },
    { label: "Win Count", key: "winCount", type: "number" },
    { label: "Loss Count", key: "lostCount", type: "number" },
    { label: "Total Matches", key: "totalMatches", type: "number" },
    { label: "Rating (0-5)", key: "rating", type: "number" },
    { label: "Latitude", key: "latitude" },
    { label: "Longitude", key: "longitude" },
    { label: "Image URL", key: "imageUrl" },
    { label: "Logo URL", key: "logoUrl" },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      <div className="flex-1 flex flex-col gap-6">
        <div className="flex justify-between items-center bg-white rounded-xl border border-gray-300 shadow p-3">
          <span className="font-bold text-sm">Add New Academy</span>
          <span
            className="font-bold text-sm text-red-500 cursor-pointer hover:underline"
            onClick={() => router.push("/signin/scout/dashboard/academies")}
          >
            Cancel
          </span>
        </div>

        <div className="bg-white rounded-lg shadow p-5 flex flex-col gap-4">
          <h2 className="font-semibold text-lg text-black">Information</h2>

          {fields.map(({ label, key, type }) => (
            <div key={key} className="flex flex-col gap-1">
              <span className="text-sm font-normal text-black opacity-80">
                {label}:
              </span>
              <input
                type={type || "text"}
                value={form[key as keyof typeof form]}
                onChange={(e) => handleChange(key, e.target.value)}
                className="w-full h-10 border border-gray-400 rounded px-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder={label}
              />
            </div>
          ))}

          {/* Founded date */}
          <div className="flex flex-col gap-1">
            <span className="text-sm font-normal text-black opacity-80">
              Founded Date:
            </span>
            <input
              type="date"
              value={form.founded}
              onChange={(e) => handleChange("founded", e.target.value)}
              className="w-full h-10 border border-gray-400 rounded px-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {error && <p className="text-red-500 text-xs">⚠️ {error}</p>}

          <div className="flex gap-4 mt-4">
            <button
              onClick={() => router.push("/signin/scout/dashboard/academies")}
              className="flex-1 border border-red-500 rounded-lg py-2 font-semibold text-red-500 hover:bg-red-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={submitting}
              className="flex-1 bg-[#0A2A56] rounded-lg py-2 font-semibold text-white hover:bg-blue-900 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {submitting && <Loader2 size={14} className="animate-spin" />}
              {submitting ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 hidden lg:block">
        <img
          src="/images/map-copy.png"
          className="w-full h-full object-cover rounded-xl shadow-lg"
          alt="Map Preview"
        />
      </div>
    </div>
  );
}
