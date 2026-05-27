"use client";

import { useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Upload, X, MapPin, Image as ImageIcon } from "lucide-react";

const BASE_URL = "https://scoutflair.top";

function getToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken") || "";
  }
  return "";
}

type PitchForm = {
  name: string;
  state: string;
  lga: string;
  address: string;
  estYear: string;
  facilities: string;
  surface: string;
  length: string;
  width: string;
  latitude: string;
  longitude: string;
  rating: string;
};

// ── Gallery Modal ─────────────────────────────────────────────────────────────
function GalleryModal({
  pitchName,
  onClose,
}: {
  pitchName: string;
  onClose: () => void;
}) {
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleUpload(files: FileList) {
    setUploading(true);
    setError("");
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
        if (url) setImages((prev) => [...prev, url]);
      } catch {
        setError(`Failed to upload ${file.name}`);
      }
    }
    setUploading(false);
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-5 border-b bg-[#0A2A56] text-white">
          <div className="flex items-center gap-2">
            <ImageIcon size={18} />
            <h2 className="text-lg font-bold">Pitch Gallery — {pitchName}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-white/20 hover:bg-white/30 rounded-full"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-5 border-b">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition"
          >
            {uploading ? (
              <div className="flex flex-col items-center gap-2 text-gray-500">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                <p className="text-sm">Uploading...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-gray-500">
                <Upload className="w-8 h-8 text-gray-400" />
                <p className="text-sm font-medium">Click to upload images</p>
                <p className="text-xs text-gray-400">
                  PNG, JPG supported. Multiple files allowed.
                </p>
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && handleUpload(e.target.files)}
          />
          {error && <p className="text-red-500 text-xs mt-2">⚠️ {error}</p>}
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {images.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <ImageIcon className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p className="text-sm">No images uploaded yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {images.map((url, i) => (
                <div
                  key={i}
                  className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200"
                >
                  <img
                    src={url}
                    alt={`Gallery ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() =>
                      setImages((prev) => prev.filter((_, idx) => idx !== i))
                    }
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                  >
                    <X size={10} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t text-right">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#0A2A56] text-white text-sm font-semibold rounded-xl hover:bg-blue-900 transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Map Modal ─────────────────────────────────────────────────────────────────
function MapModal({
  name,
  address,
  latitude,
  longitude,
  onClose,
}: {
  name: string;
  address: string;
  latitude: string;
  longitude: string;
  onClose: () => void;
}) {
  const hasCoords =
    latitude && longitude && latitude !== "0" && longitude !== "0";

  // Fixed template string syntax bug here
  const mapsUrl = hasCoords
    ? `https://maps.google.com/?q=${latitude},${longitude}`
    : `https://maps.google.com/?q=${encodeURIComponent(name + " " + address)}`;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-5 border-b bg-[#0A2A56] text-white">
          <div className="flex items-center gap-2">
            <MapPin size={18} />
            <h2 className="text-lg font-bold">Locate Pitch</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-white/20 hover:bg-white/30 rounded-full"
          >
            <X size={16} />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="bg-gray-50 rounded-xl p-4 space-y-2">
            <p className="font-semibold text-gray-800">{name || "Pitch"}</p>
            {address ? (
              <p className="text-sm text-gray-600 flex items-start gap-2">
                <MapPin
                  size={14}
                  className="mt-0.5 flex-shrink-0 text-gray-400"
                />
                {address}
              </p>
            ) : null}
            {hasCoords ? (
              <p className="text-xs text-gray-400">
                Coordinates: {latitude}, {longitude}
              </p>
            ) : null}
          </div>

          {/* Fixed missing opening tag here */}
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 bg-[#0A2A56] text-white font-semibold rounded-xl hover:bg-blue-900 transition"
          >
            <MapPin size={16} />
            Open in Google Maps
          </a>
          <button
            onClick={onClose}
            className="w-full py-2.5 border border-gray-200 text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-50 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function PitchDetailsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isEditing, setIsEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const [form, setForm] = useState<PitchForm>({
    name: searchParams.get("name") || "",
    state: searchParams.get("state") || "",
    lga: searchParams.get("lga") || "",
    address: searchParams.get("address") || "",
    estYear: searchParams.get("estYear") || "",
    facilities: searchParams.get("facilities") || "",
    surface: searchParams.get("surface") || "",
    length: searchParams.get("length") || "",
    width: searchParams.get("width") || "",
    latitude: searchParams.get("latitude") || "",
    longitude: searchParams.get("longitude") || "",
    rating: "",
  });

  function handleChange(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(`${BASE_URL}/api/v1/pitches/editLocalPitches`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || `Failed (${res.status})`);
      setSuccess(true);
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  const fields = [
    { label: "Pitch Name", key: "name", sub: { label: "State", key: "state" } },
    { label: "LGA", key: "lga", sub: { label: "Address", key: "address" } },
    {
      label: "Country",
      key: "name",
      sub: { label: "Geolocation", key: "latitude" },
    },
    {
      label: "Dimension",
      key: "length",
      sub: { label: "Surface Type", key: "surface" },
    },
  ];

  return (
    <>
      {showGallery && (
        <GalleryModal
          pitchName={form.name}
          onClose={() => setShowGallery(false)}
        />
      )}
      {showMap && (
        <MapModal
          name={form.name}
          address={form.address}
          latitude={form.latitude}
          longitude={form.longitude}
          onClose={() => setShowMap(false)}
        />
      )}

      <div className="flex flex-col items-center mt-10 min-h-screen p-6 bg-white relative">
        <button
          onClick={() => router.push("/signin/scout/dashboard/localpitches")}
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
          <h1 className="text-lg font-bold text-gray-700">Pitch Details</h1>
          <button
            onClick={() => {
              if (isEditing) handleSave();
              else setIsEditing(true);
            }}
            disabled={submitting}
            className={`text-lg font-bold cursor-pointer hover:underline flex items-center gap-2 ${
              isEditing ? "text-green-600" : "text-red-500"
            }`}
          >
            {submitting && <Loader2 size={14} className="animate-spin" />}
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>

        {success && (
          <div className="w-full max-w-2xl mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm text-center">
            ✅ Pitch updated successfully!
          </div>
        )}
        {error && (
          <div className="w-full max-w-2xl mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center">
            ⚠️ {error}
          </div>
        )}

        <div className="w-full max-w-2xl flex flex-col gap-4">
          {fields.map((item, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="flex justify-between items-center bg-[#0A2A56] text-white rounded px-6 py-2">
                <span className="text-sm">{item.label}:</span>
                {isEditing ? (
                  <input
                    type="text"
                    className="text-black text-xs px-2 py-1 rounded w-48"
                    value={form[item.key as keyof PitchForm]}
                    onChange={(e) => handleChange(item.key, e.target.value)}
                  />
                ) : (
                  <span className="text-sm">
                    {form[item.key as keyof PitchForm] || "—"}
                  </span>
                )}
              </div>
              <div className="flex justify-between items-center bg-white border border-[#041931] rounded px-6 py-2">
                <span className="text-sm text-black">{item.sub.label}:</span>
                {isEditing ? (
                  <input
                    type="text"
                    className="text-black text-xs px-2 py-1 border rounded w-48"
                    value={form[item.sub.key as keyof PitchForm]}
                    onChange={(e) => handleChange(item.sub.key, e.target.value)}
                  />
                ) : (
                  <span className="text-sm text-gray-600">
                    {form[item.sub.key as keyof PitchForm] || "—"}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-6 mt-8">
          <button
            onClick={() => setShowGallery(true)}
            className="flex items-center gap-2 px-6 py-2 rounded-md bg-[#0A2A56] text-white font-bold text-sm hover:bg-blue-900 transition"
          >
            <ImageIcon size={16} />
            Pitch Gallery
          </button>
          <button
            onClick={() => setShowMap(true)}
            className="flex items-center gap-2 px-6 py-2 rounded-md bg-[#0A2A56] text-white font-bold text-sm hover:bg-blue-900 transition"
          >
            <MapPin size={16} />
            Locate Pitch
          </button>
        </div>
      </div>
    </>
  );
}
