"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { uploadMediaFileToR2 } from "@/lib/utils";

export default function CreateGalleryPage() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("player");
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      alert("Please select a media file first.");
      return;
    }

    if (!title.trim() || !description.trim()) {
      alert("Title and description are required.");
      return;
    }

    setLoading(true);
    setUploadProgress(0);

    try {
      const { fileKey } = await uploadMediaFileToR2(file, setUploadProgress);
      const token = localStorage.getItem("authToken");

      if (!token) {
        throw new Error("No authentication token found. Please log in again.");
      }

      const params = new URLSearchParams({
        title: title.trim(),
        description: description.trim(),
        file: fileKey,
      });

      if (category.trim()) {
        params.set("category", category.trim());
      }

      const response = await fetch(`/api/gallery?${params.toString()}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "*/*",
        },
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        const message =
          payload && typeof payload === "object" && "message" in payload
            ? String(payload.message)
            : payload && typeof payload === "object" && "error" in payload
              ? String(payload.error)
              : "Failed to create gallery item.";
        throw new Error(message);
      }

      router.push("/signin/player/dashboard/gallery");
      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to create gallery item.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] px-6 py-10">
      <div className="mx-auto max-w-xl rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-center text-2xl font-bold text-[#36123f]">
          Create Gallery Item
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8f37b1]"
              placeholder="Enter title"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Description</label>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8f37b1]"
              placeholder="Enter description"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Category</label>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8f37b1]"
            >
              <option value="player">Player</option>
              <option value="team">Team</option>
              <option value="coach">Coach</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Upload Media</label>
            <input
              type="file"
              accept="image/*,video/*"
              onChange={(event) => setFile(event.target.files?.[0] || null)}
              className="w-full"
              required
            />
          </div>

          {loading && (
            <div className="h-2 overflow-hidden rounded-full bg-[#E5E7EB]">
              <div
                className="h-full bg-[#8f37b1] transition-all"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-[#8f37b1] py-2 font-semibold text-white transition hover:bg-[#722c8c] disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Create Gallery"}
          </button>
        </form>
      </div>
    </div>
  );
}
