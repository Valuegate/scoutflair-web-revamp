"use client";

import React, { useState } from "react";
import { uploadFileToR2 } from "@/lib/utils";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CreateGalleryPage() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("player");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) return alert("Please select a file first.");
    if (!title.trim() || !description.trim()) return alert("All fields are required.");

    setLoading(true);

    try {
      // ✅ 1. Upload file to R2
      console.log("Uploading file to Cloudflare R2...");
      const uploaded = await uploadFileToR2(file);

      // Support both string or object responses
      const publicUrl = uploaded.url;

      if (!publicUrl) throw new Error("Upload succeeded but URL not found in response.");

      console.log("✅ File uploaded successfully:", publicUrl);

      // ✅ 2. Prepare data for backend
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No authentication token found. Please log in again.");

      // ✅ 3. Send data to backend
      const response = await axios.post(
  "https://scoutflair.top/api/v1/gallery/createMedia",
  {
    category,
    description,
    file: publicUrl,
    title,
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }
);


      console.log("✅ Gallery created successfully:", response.data);

      alert("Gallery item created successfully!");
      router.push("/signin/player/dashboard/gallery");
    } catch (err: any) {
      console.error("❌ Error creating gallery:", err);
      alert(
        err?.response?.data?.error ||
          err.message ||
          "Failed to create gallery. Check console for details."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] px-6 py-10">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-[#36123f]">
          Create Gallery Item
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8f37b1]"
              placeholder="Enter title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8f37b1]"
              placeholder="Enter description"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8f37b1]"
            >
              <option value="player">Player</option>
              <option value="team">Team</option>
              <option value="coach">Coach</option>
            </select>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium mb-1">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#8f37b1] text-white py-2 rounded-md font-semibold hover:bg-[#722c8c] transition disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Create Gallery"}
          </button>
        </form>
      </div>
    </div>
  );
}