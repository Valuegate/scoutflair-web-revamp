"use client";

import React, { useState, useEffect } from "react";
import { X, Upload, Loader2, AlertCircle, ChevronDown } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Player {
  playerId: number;
  fullName: string;
  position: string;
  height: string;
  weight: string;
  nationality: string;
  currentTeam: string;
}

interface FormData {
  playerUserId: number | "";
  playerName: string;
  academyClubName: string;
  position: string;
  height: string;
  weight: string;
  rating: number;
  nationality: string;
  games: number;
  goals: number;
  assists: number;
}

interface AddTaskFormProps {
  onCancel?: () => void;
  onSave?: (
    formData: FormData & { imageFile: File | null }
  ) => Promise<void> | void;
}

interface ApiResult {
  success: boolean;
  message?: string;
  data?: unknown;
}

// ── API helpers ───────────────────────────────────────────────────────────────
function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("authToken");
}

async function fetchPlayers(): Promise<Player[]> {
  const token = getToken();
  const res = await fetch(
    "https://scoutflair.top/api/v1/profile/scout/getPlayers?limit=50&offset=0",
    {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!res.ok) throw new Error(`Failed to fetch players (${res.status})`);
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

async function createScoutTask(playerUserId: number): Promise<ApiResult> {
  const token = getToken();
  const res = await fetch(
    "https://scoutflair.top/api/v1/profile/scout/createNewScoutTask",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ playerUserId }),
    }
  );

  const text = await res.text();
  try {
    const data = JSON.parse(text);
    if (res.ok) return { success: true, data };
    return {
      success: false,
      message: data.message || "Failed to create task.",
    };
  } catch {
    if (res.ok) return { success: true };
    return { success: false, message: text || `Server error (${res.status}).` };
  }
}

// ── Initial form state ────────────────────────────────────────────────────────
const INITIAL_FORM: FormData = {
  playerUserId: "",
  playerName: "",
  academyClubName: "",
  position: "",
  height: "",
  weight: "",
  rating: 0,
  nationality: "Nigeria",
  games: 0,
  goals: 0,
  assists: 0,
};

// ── Main component ────────────────────────────────────────────────────────────
const AddTaskForm: React.FC<AddTaskFormProps> = ({ onCancel, onSave }) => {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [players, setPlayers] = useState<Player[]>([]);
  const [playersLoading, setPlayersLoading] = useState(true);
  const [playersError, setPlayersError] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [dragActive, setDragActive] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchPlayers()
      .then((data) => setPlayers(data))
      .catch((err: Error) => setPlayersError(err.message))
      .finally(() => setPlayersLoading(false));
  }, []);

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePlayerSelect = (player: Player) => {
    setFormData((prev) => ({
      ...prev,
      playerUserId: player.playerId,
      playerName: player.fullName,
      position: player.position || prev.position,
      height: player.height || prev.height,
      weight: player.weight || prev.weight,
      nationality: player.nationality || prev.nationality,
      academyClubName: player.currentTeam || prev.academyClubName,
    }));
    setDropdownOpen(false);
  };

  const handleStarClick = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file?.type.startsWith("image/")) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file?.type.startsWith("image/")) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    else window.history.back();
  };

  const handleAddTask = async () => {
    setError("");

    if (!formData.playerUserId) {
      setError("Please select a player to create a task.");
      return;
    }

    setIsLoading(true);
    try {
      const result = await createScoutTask(formData.playerUserId as number);

      if (result.success) {
        setSuccess(true);
        if (onSave) await onSave({ ...formData, imageFile });
        setTimeout(() => {
          setSuccess(false);
          handleCancel();
        }, 1500);
      } else {
        setError(result.message || "Failed to create task. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const statFields: Array<keyof FormData> = ["games", "goals", "assists"];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Add New Task</h2>
          <button
            onClick={handleCancel}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            disabled={isLoading}
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Error banner */}
        {error && (
          <div className="mx-6 mt-4 flex items-start gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Success banner */}
        {success && (
          <div className="mx-6 mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-700 font-medium">
              ✅ Task created successfully!
            </p>
          </div>
        )}

        <div className="p-6 space-y-6">
          {/* Player selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Player: <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                disabled={isLoading || playersLoading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-left flex items-center justify-between bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <span
                  className={
                    formData.playerName ? "text-gray-800" : "text-gray-400"
                  }
                >
                  {playersLoading
                    ? "Loading players…"
                    : formData.playerName || "Choose a player…"}
                </span>
                {playersLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </button>

              {dropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-52 overflow-y-auto">
                  {playersError ? (
                    <p className="px-4 py-3 text-sm text-red-500">
                      {playersError}
                    </p>
                  ) : players.length === 0 ? (
                    <p className="px-4 py-3 text-sm text-gray-500">
                      No players found.
                    </p>
                  ) : (
                    players.map((player) => (
                      <button
                        key={player.playerId}
                        type="button"
                        onClick={() => handlePlayerSelect(player)}
                        className="w-full px-4 py-3 text-left text-sm hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-0"
                      >
                        <span className="font-medium text-gray-800">
                          {player.fullName}
                        </span>
                        {player.position && (
                          <span className="ml-2 text-xs text-gray-500">
                            ({player.position})
                          </span>
                        )}
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Academy / Club Name:
              </label>
              <input
                type="text"
                placeholder="Type here....."
                value={formData.academyClubName}
                onChange={(e) =>
                  handleInputChange("academyClubName", e.target.value)
                }
                disabled={isLoading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-colors disabled:bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Player Name:
              </label>
              <input
                type="text"
                placeholder="Auto-filled when player selected"
                value={formData.playerName}
                onChange={(e) =>
                  handleInputChange("playerName", e.target.value)
                }
                disabled={isLoading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-colors disabled:bg-gray-100 bg-gray-50"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Position:
              </label>
              <input
                type="text"
                placeholder="Type here....."
                value={formData.position}
                onChange={(e) => handleInputChange("position", e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-colors disabled:bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Height:
              </label>
              <input
                type="text"
                placeholder="Type here....."
                value={formData.height}
                onChange={(e) => handleInputChange("height", e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-colors disabled:bg-gray-100"
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight:
              </label>
              <input
                type="text"
                placeholder="Type here....."
                value={formData.weight}
                onChange={(e) => handleInputChange("weight", e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-colors disabled:bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ratings:
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleStarClick(star)}
                    disabled={isLoading}
                    className={`w-8 h-8 rounded transition-colors text-lg ${
                      star <= formData.rating
                        ? "bg-yellow-400 text-white"
                        : "bg-gray-200 text-gray-400 hover:bg-yellow-100"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Statistics
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {statFields.map((stat) => (
                <input
                  key={stat}
                  type="number"
                  min="0"
                  placeholder={stat.charAt(0).toUpperCase() + stat.slice(1)}
                  value={(formData[stat] as number) || ""}
                  onChange={(e) =>
                    handleInputChange(
                      stat,
                      Math.max(0, parseInt(e.target.value) || 0)
                    )
                  }
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-colors disabled:bg-gray-100"
                />
              ))}
            </div>
          </div>

          {/* Nationality and Image Upload */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nationality
              </label>
              <select
                value={formData.nationality}
                onChange={(e) =>
                  handleInputChange("nationality", e.target.value)
                }
                disabled={isLoading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-white disabled:bg-gray-100"
              >
                <option value="Nigeria">Nigeria</option>
                <option value="Ghana">Ghana</option>
                <option value="Kenya">Kenya</option>
                <option value="South Africa">South Africa</option>
                <option value="Senegal">Senegal</option>
                <option value="Ivory Coast">Ivory Coast</option>
                <option value="Cameroon">Cameroon</option>
                <option value="Egypt">Egypt</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Image
              </label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  dragActive
                    ? "border-blue-400 bg-blue-50"
                    : "border-gray-300 hover:border-gray-400"
                } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {imagePreview ? (
                  <div>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg mb-2"
                    />
                    <p className="text-xs text-green-600">{imageFile?.name}</p>
                  </div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 mb-2">
                      Drag & drop or{" "}
                      <label className="text-blue-500 hover:text-blue-600 cursor-pointer underline">
                        choose file
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileSelect}
                          disabled={isLoading}
                          className="hidden"
                        />
                      </label>
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <button
            onClick={handleCancel}
            disabled={isLoading}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleAddTask}
            disabled={isLoading || !formData.playerUserId}
            className="px-6 py-3 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Adding...
              </>
            ) : (
              "Add Task"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskForm;
