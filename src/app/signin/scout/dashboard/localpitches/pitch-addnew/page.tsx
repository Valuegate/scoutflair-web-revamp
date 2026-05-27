"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Upload, X } from "lucide-react";

const BASE_URL = "https://scoutflair.top";

function getToken() {
  return localStorage.getItem("authToken") || "";
}

export default function AddNewPitchPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const [form, setForm] = useState({
    name: "",
    address: "",
    latitude: "",
    longitude: "",
    length: "",
    width: "",
    facilities: "",
    lga: "",
    state: "",
    surface: "",
    rating: "",
    estYear: "",
    imageFileKey: "",
  });

  function handleChange(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleImageUpload(files: FileList) {
    setUploading(true);
    for (const file of Array.from(files)) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch(
          `${BASE_URL}/scoutflair/v1/file/picture/upload`,
          {
            method: "POST",
            headers: { Authorization: `Bearer ${getToken()}` },
            body: formData,
          }
        );
        if (!res.ok) throw new Error();
        const data = await res.json();
        const url = data?.imageUrl || data?.presignedUrl || "";
        if (url) {
          setUploadedImages((prev) => [...prev, url]);
          if (!form.imageFileKey) handleChange("imageFileKey", url);
        }
      } catch {
        setError("Failed to upload one or more images.");
      }
    }
    setUploading(false);
  }

  async function handleSave() {
    if (!form.name.trim()) {
      setError("Pitch name is required.");
      return;
    }
    if (!form.address.trim()) {
      setError("Address is required.");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(`${BASE_URL}/api/v1/pitches/addLocalPitches`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          name: form.name,
          address: form.address,
          latitude: form.latitude,
          longitude: form.longitude,
          length: form.length,
          width: form.width,
          facilities: form.facilities,
          lga: form.lga,
          state: form.state,
          surface: form.surface,
          rating: form.rating,
          estYear: form.estYear,
          imageFileKey: form.imageFileKey,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || `Failed (${res.status})`);
      router.push("/signin/scout/dashboard/localpitches");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  const fields = [
    { label: "Name", key: "name" },
    { label: "Address", key: "address" },
    { label: "LGA", key: "lga" },
    { label: "State", key: "state" },
    { label: "Surface Type", key: "surface" },
    { label: "Facilities", key: "facilities" },
    { label: "Rating (0-5)", key: "rating" },
    { label: "Year Established", key: "estYear" },
    { label: "Length (m)", key: "length" },
    { label: "Width (m)", key: "width" },
    { label: "Latitude", key: "latitude" },
    { label: "Longitude", key: "longitude" },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      <div className="flex-1 flex flex-col gap-6">
        <div className="flex justify-between items-center bg-white rounded-xl border border-gray-300 shadow p-3">
          <span className="font-bold text-sm">Add New Pitch</span>
          <span
            className="font-bold text-sm text-red-500 cursor-pointer hover:underline"
            onClick={() => router.push("/signin/scout/dashboard/localpitches")}
          >
            Cancel
          </span>
        </div>

        <div className="bg-white rounded-lg shadow p-5 flex flex-col gap-4">
          <h2 className="font-semibold text-lg text-black">Information</h2>

          {fields.map(({ label, key }) => (
            <div key={key} className="flex flex-col gap-1">
              <span className="text-sm font-normal text-black opacity-80">
                {label}:
              </span>
              <input
                type="text"
                value={form[key as keyof typeof form]}
                onChange={(e) => handleChange(key, e.target.value)}
                className="w-full h-10 border border-gray-400 rounded px-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder={label}
              />
            </div>
          ))}

          {/* Image Upload */}
          <div className="flex flex-col gap-2">
            <h3 className="font-medium text-sm">Gallery</h3>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border border-dashed border-gray-600 rounded p-5 flex flex-col items-center gap-2 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition"
            >
              {uploading ? (
                <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
              ) : (
                <Upload className="w-6 h-6 text-gray-400" />
              )}
              <span className="text-xs">
                Drag & drop your files here or{" "}
                <span className="font-extrabold">choose file</span>
              </span>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) =>
                e.target.files && handleImageUpload(e.target.files)
              }
            />

            {uploadedImages.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-2">
                {uploadedImages.map((url, i) => (
                  <div
                    key={i}
                    className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200"
                  >
                    <img
                      src={url}
                      alt={`upload ${i}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() =>
                        setUploadedImages((prev) =>
                          prev.filter((_, idx) => idx !== i)
                        )
                      }
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition"
                    >
                      <X size={10} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {error && <p className="text-red-500 text-xs">⚠️ {error}</p>}

          <div className="flex gap-4 mt-4">
            <button
              onClick={() =>
                router.push("/signin/scout/dashboard/localpitches")
              }
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
          alt="Map Preview"
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
    </div>
  );
}
