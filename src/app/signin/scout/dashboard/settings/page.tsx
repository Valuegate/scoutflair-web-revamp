"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  User,
  Shield,
  Bell,
  MapPin,
  Award,
  Upload,
  Save,
  Mail,
  Lock,
  LogOut,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Camera,
  Eye,
  EyeOff,
} from "lucide-react";
import { useRouter } from "next/navigation";

// ── Types ─────────────────────────────────────────────────────────────────────
interface ScoutProfile {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  nationality: string;
  nin: string;
  licenceNumber: string;
  experience: string;
  dob: string;
  placeOfBirth: string;
  career: string;
  quote: string;
  imageFileKey: string;
  currentTeam: string;
  coachingStyle: string;
  coachingEducation: string;
  emailNotifications: boolean;
  matchNotification: boolean;
  promotion: boolean;
  playerAbsence: boolean;
}

interface LocalExtra {
  licenceNumber: string;
  experience: string;
  dob: string;
}

// ── Local cache for fields the API doesn't return ─────────────────────────────
const LOCAL_FIELDS_KEY = "scoutProfileExtra";

function loadLocalFields(): LocalExtra {
  if (typeof window === "undefined")
    return { licenceNumber: "", experience: "", dob: "" };
  try {
    const raw = localStorage.getItem(LOCAL_FIELDS_KEY);
    return raw
      ? JSON.parse(raw)
      : { licenceNumber: "", experience: "", dob: "" };
  } catch {
    return { licenceNumber: "", experience: "", dob: "" };
  }
}

function saveLocalFields(fields: LocalExtra) {
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_FIELDS_KEY, JSON.stringify(fields));
  }
}

// ── API helpers ───────────────────────────────────────────────────────────────
function getToken() {
  return typeof window !== "undefined"
    ? localStorage.getItem("authToken") ?? ""
    : "";
}

async function apiFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`https://scoutflair.top${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
      ...(options.headers ?? {}),
    },
  });
  const text = await res.text();
  try {
    return { ok: res.ok, status: res.status, data: JSON.parse(text) };
  } catch {
    return { ok: res.ok, status: res.status, data: { message: text } };
  }
}

function parseDob(raw: unknown): string {
  if (!raw) return "";
  const str = String(raw);
  try {
    const d = new Date(str);
    if (isNaN(d.getTime())) return str;
    const year = d.getUTCFullYear();
    const month = String(d.getUTCMonth() + 1).padStart(2, "0");
    const day = String(d.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  } catch {
    return str;
  }
}

function mapProfileData(data: Record<string, unknown>): Partial<ScoutProfile> {
  return {
    fullName: String(data.fullName ?? ""),
    email: String(data.email ?? ""),
    phone: String(data.phone ?? ""),
    address: String(data.address ?? ""),
    nationality: String(data.nationality ?? ""),
    nin: String(data.nin ?? ""),
    career: String(data.career ?? ""),
    quote: String(data.quote ?? ""),
    currentTeam: String(data.currentTeam ?? ""),
    imageFileKey: String(data.imageFileKey ?? ""),
    placeOfBirth: String(data.placeOfBirth ?? ""),
    coachingStyle: String(data.coachingStyle ?? ""),
    coachingEducation: String(data.coachingEducation ?? ""),
    // These three are NOT returned by getScoutProfile — merged from localStorage below
    licenceNumber: String(data.licenceNumber ?? ""),
    experience: String(data.experience ?? ""),
    dob: parseDob(data.dob),
    emailNotifications: Boolean(data.emailNotifications),
    matchNotification: Boolean(data.matchNotification),
    promotion: Boolean(data.promotion),
    playerAbsence: Boolean(data.playerAbsence),
  };
}

async function uploadProfilePhoto(file: File): Promise<{
  publicUrl: string | null;
  fileKey: string | null;
  error?: string;
}> {
  try {
    const presignRes = await fetch(
      "https://scoutflair.top/scoutflair/v1/storage/presign-upload",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ filename: file.name, contentType: file.type }),
      }
    );
    if (!presignRes.ok)
      return {
        publicUrl: null,
        fileKey: null,
        error: `Presign failed (${presignRes.status})`,
      };

    const presignData = (await presignRes.json()) as Record<string, string>;
    const uploadUrl =
      presignData.presignedUrl ?? presignData.uploadUrl ?? presignData.url;
    const publicUrl = presignData.publicUrl ?? null;
    const fileKey = presignData.fileKey ?? presignData.key ?? file.name;

    if (!uploadUrl)
      return {
        publicUrl: null,
        fileKey: null,
        error: "No upload URL in response.",
      };

    const uploadRes = await fetch(uploadUrl, {
      method: "PUT",
      body: file,
      headers: { "Content-Type": file.type },
    });
    if (!uploadRes.ok)
      return {
        publicUrl: null,
        fileKey: null,
        error: `Upload failed (${uploadRes.status})`,
      };

    await apiFetch("/scoutflair/v1/storage/upload-complete", {
      method: "POST",
      body: JSON.stringify({ fileKey }),
    });

    return { publicUrl, fileKey };
  } catch (err) {
    return {
      publicUrl: null,
      fileKey: null,
      error: err instanceof Error ? err.message : "Upload failed.",
    };
  }
}

// ── Toast ─────────────────────────────────────────────────────────────────────
function Toast({
  message,
  type,
}: {
  message: string;
  type: "success" | "error";
}) {
  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-2 px-5 py-3 rounded-xl shadow-xl text-sm font-medium text-white max-w-sm text-center ${
        type === "success" ? "bg-green-600" : "bg-red-600"
      }`}
    >
      {type === "success" ? (
        <CheckCircle2 size={16} className="shrink-0" />
      ) : (
        <AlertCircle size={16} className="shrink-0" />
      )}
      {message}
    </div>
  );
}

// ── Field components ──────────────────────────────────────────────────────────
function FieldLabel({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
      {children}{" "}
      {required && <span className="text-red-400 normal-case">*</span>}
    </label>
  );
}

function InputField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  disabled,
  hint,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  hint?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <FieldLabel required={required}>{label}</FieldLabel>
      <input
        type={type}
        value={value}
        placeholder={placeholder ?? label}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A2342]/30 focus:border-[#0A2342] transition bg-white disabled:bg-gray-50 disabled:text-gray-500"
      />
      {hint && <p className="text-[11px] text-gray-400">{hint}</p>}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function ScoutSettingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "profile" | "notifications" | "security"
  >("profile");

  const [profile, setProfile] = useState<Partial<ScoutProfile>>({});
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileSaving, setProfileSaving] = useState(false);

  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [pendingPhotoFile, setPendingPhotoFile] = useState<File | null>(null);
  const [photoUploading, setPhotoUploading] = useState(false);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);

  const [notifSaving, setNotifSaving] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  function showToast(message: string, type: "success" | "error") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  }

  function set(key: keyof ScoutProfile, value: string | boolean) {
    setProfile((prev) => ({ ...prev, [key]: value }));
  }

  // ── Load profile ───────────────────────────────────────────────────────────
  const loadProfile = useCallback(async () => {
    setProfileLoading(true);
    try {
      const { ok, data } = await apiFetch(
        "/api/v1/profile/scout/getScoutProfile"
      );
      if (!ok) throw new Error("Failed to fetch profile");

      const raw = data as Record<string, unknown>;
      const mapped = mapProfileData(raw);

      // Merge localStorage cache for the 3 fields the API doesn't return
      const local = loadLocalFields();
      mapped.licenceNumber =
        String(raw.licenceNumber ?? "") || local.licenceNumber || "";
      mapped.experience =
        String(raw.experience ?? "") || local.experience || "";
      mapped.dob = parseDob(raw.dob) || local.dob || "";

      setProfile(mapped);

      const imgKey = mapped.imageFileKey ?? "";
      setPhotoUrl(imgKey.startsWith("http") ? imgKey : null);
    } catch {
      showToast("Failed to load profile.", "error");
    } finally {
      setProfileLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  // ── Photo select ───────────────────────────────────────────────────────────
  function handlePhotoSelect(file: File) {
    if (!file.type.startsWith("image/")) {
      showToast("Please select an image file.", "error");
      return;
    }
    setPendingPhotoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPhotoUrl(reader.result as string);
    reader.readAsDataURL(file);
  }

  // ── Save profile ───────────────────────────────────────────────────────────
  async function handleSaveProfile() {
    if (!profile.email) {
      showToast("Email is required.", "error");
      return;
    }
    setProfileSaving(true);
    try {
      let imageFileKey = profile.imageFileKey ?? "";

      if (pendingPhotoFile) {
        setPhotoUploading(true);
        const { publicUrl, fileKey, error } = await uploadProfilePhoto(
          pendingPhotoFile
        );
        setPhotoUploading(false);
        if (!publicUrl && !fileKey) {
          showToast(error ?? "Photo upload failed.", "error");
          setProfileSaving(false);
          return;
        }
        imageFileKey = publicUrl ?? fileKey ?? imageFileKey;
        setPhotoUrl(publicUrl ?? fileKey ?? null);
        setPendingPhotoFile(null);
      }

      // Cache the 3 fields the API won't return on next GET
      saveLocalFields({
        licenceNumber: profile.licenceNumber ?? "",
        experience: profile.experience ?? "",
        dob: profile.dob ?? "",
      });

      const payload: Record<string, unknown> = {
        email: profile.email,
        fullName: profile.fullName ?? "",
        phone: profile.phone ?? "",
        address: profile.address ?? "",
        nationality: profile.nationality ?? "",
        nin: profile.nin ?? "",
        career: profile.career ?? "",
        quote: profile.quote ?? "",
        currentTeam: profile.currentTeam ?? "",
        imageFileKey,
        placeOfBirth: profile.placeOfBirth ?? "",
        licenceNumber: profile.licenceNumber ?? "",
        experience: profile.experience ?? "",
        dob: profile.dob ?? "",
        coachingStyle: profile.coachingStyle ?? "",
        coachingEducation: profile.coachingEducation ?? "",
      };

      const { ok, data } = await apiFetch("/api/v1/profile/scout/editProfile", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (ok) {
        showToast("Profile saved successfully!", "success");
        // Re-fetch — loadProfile merges local cache so all fields show correctly
        await loadProfile();
      } else {
        showToast(
          (data as Record<string, string>)?.message ??
            "Failed to save profile.",
          "error"
        );
      }
    } catch (err) {
      console.error("Save error:", err);
      showToast("Network error.", "error");
    } finally {
      setProfileSaving(false);
    }
  }

  // ── Change password ────────────────────────────────────────────────────────
  async function handleChangePassword() {
    if (!oldPassword || !newPassword || !confirmPassword) {
      showToast("Fill in all password fields.", "error");
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast("Passwords do not match.", "error");
      return;
    }
    if (newPassword.length < 8) {
      showToast("Password must be at least 8 characters.", "error");
      return;
    }
    setPasswordSaving(true);
    try {
      const { ok, data } = await apiFetch("/api/v1/profile/changePassword", {
        method: "POST",
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      if (ok) {
        showToast("Password changed!", "success");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        showToast(
          (data as Record<string, string>)?.message ?? "Failed.",
          "error"
        );
      }
    } catch {
      showToast("Network error.", "error");
    } finally {
      setPasswordSaving(false);
    }
  }

  // ── Notification toggle ────────────────────────────────────────────────────
  async function handleNotifToggle(key: keyof ScoutProfile, current: boolean) {
    setNotifSaving(key);
    const newVal = !current;
    setProfile((prev) => ({ ...prev, [key]: newVal }));
    try {
      const { ok, data } = await apiFetch("/api/v1/profile/editNotifications", {
        method: "POST",
        body: JSON.stringify({ settingName: key, value: newVal }),
      });
      if (ok) {
        showToast("Preference saved.", "success");
      } else {
        setProfile((prev) => ({ ...prev, [key]: current }));
        showToast(
          (data as Record<string, string>)?.message ?? "Failed.",
          "error"
        );
      }
    } catch {
      setProfile((prev) => ({ ...prev, [key]: current }));
      showToast("Network error.", "error");
    } finally {
      setNotifSaving(null);
    }
  }

  function handleLogout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userSession");
    localStorage.removeItem(LOCAL_FIELDS_KEY);
    router.push("/signin");
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8 min-h-screen bg-gray-50">
      {toast && <Toast message={toast.message} type={toast.type} />}

      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Settings
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your professional profile and account preferences.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row min-h-[600px] overflow-hidden">
        {/* ── Sidebar ── */}
        <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-200 p-4 bg-gray-50/50">
          <nav className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
            {(
              [
                [
                  "profile",
                  <User size={18} key="u" />,
                  "Profile & Credentials",
                ],
                ["notifications", <Bell size={18} key="b" />, "Notifications"],
                ["security", <Shield size={18} key="s" />, "Security"],
              ] as const
            ).map(([tab, icon, label]) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-shrink-0 md:w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-[#0A2342] text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {icon} {label}
              </button>
            ))}
          </nav>
          <div className="hidden md:block mt-8 pt-8 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
            >
              <LogOut size={18} /> Log Out
            </button>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="flex-1 p-6 md:p-10 overflow-y-auto">
          {/* ─────────────── PROFILE TAB ─────────────── */}
          {activeTab === "profile" && (
            <div className="max-w-xl">
              <h2 className="text-lg font-bold text-gray-900 mb-6">
                Personal Information
              </h2>

              {/* Avatar row */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div
                  className="relative group cursor-pointer shrink-0"
                  onClick={() => photoInputRef.current?.click()}
                >
                  {photoUrl ? (
                    <img
                      src={photoUrl}
                      alt="Profile"
                      className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                      onError={() => setPhotoUrl(null)}
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-[#0A2342] flex items-center justify-center text-white text-2xl font-bold border-4 border-white shadow-md">
                      {profile.fullName?.[0]?.toUpperCase() ?? "S"}
                    </div>
                  )}
                  <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera size={18} className="text-white" />
                  </div>
                  {photoUploading && (
                    <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center">
                      <Loader2 size={18} className="text-white animate-spin" />
                    </div>
                  )}
                  <input
                    ref={photoInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handlePhotoSelect(f);
                    }}
                  />
                </div>

                <div className="text-center sm:text-left">
                  <p className="font-semibold text-gray-900">
                    {profile.fullName || "—"}
                  </p>
                  <p className="text-xs text-gray-500 mb-3">Scout</p>
                  <button
                    onClick={() => photoInputRef.current?.click()}
                    className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-white bg-white transition shadow-sm"
                  >
                    <Upload size={13} />
                    {pendingPhotoFile
                      ? "Photo selected ✓"
                      : photoUrl
                      ? "Change Photo"
                      : "Upload Photo"}
                  </button>
                  {pendingPhotoFile && (
                    <p className="text-[11px] text-amber-600 mt-1">
                      Will upload when you save.
                    </p>
                  )}
                </div>
              </div>

              {profileLoading ? (
                <div className="space-y-3 animate-pulse">
                  {Array(10)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="h-10 bg-gray-100 rounded-lg" />
                    ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Basic info grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField
                      label="Full Name"
                      value={profile.fullName ?? ""}
                      onChange={(v) => set("fullName", v)}
                      required
                    />

                    {/* Email — read only */}
                    <div className="space-y-1.5">
                      <FieldLabel>Email Address</FieldLabel>
                      <div className="flex items-center px-3 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 text-sm">
                        <Mail
                          size={14}
                          className="mr-2 shrink-0 text-gray-400"
                        />
                        <span className="truncate">{profile.email || "—"}</span>
                      </div>
                      <p className="text-[11px] text-gray-400">
                        Email cannot be changed.
                      </p>
                    </div>

                    <InputField
                      label="Phone Number"
                      value={profile.phone ?? ""}
                      onChange={(v) => set("phone", v)}
                      type="tel"
                    />
                    <InputField
                      label="Nationality"
                      value={profile.nationality ?? ""}
                      onChange={(v) => set("nationality", v)}
                    />
                    <InputField
                      label="Current Team/Club"
                      value={profile.currentTeam ?? ""}
                      onChange={(v) => set("currentTeam", v)}
                    />
                    <InputField
                      label="NIN"
                      value={profile.nin ?? ""}
                      onChange={(v) => set("nin", v)}
                    />
                  </div>

                  <InputField
                    label="Address"
                    value={profile.address ?? ""}
                    onChange={(v) => set("address", v)}
                  />
                  <InputField
                    label="Bio / Career Summary"
                    value={profile.career ?? ""}
                    onChange={(v) => set("career", v)}
                  />
                  <InputField
                    label="Quote"
                    value={profile.quote ?? ""}
                    onChange={(v) => set("quote", v)}
                    placeholder="Your professional motto..."
                  />

                  {/* ── Professional Details (sign-up fields, cached locally) ── */}
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 mb-1">
                      <Award size={15} className="text-[#0A2342]" />
                      <h3 className="text-sm font-bold text-gray-900">
                        Professional Details
                      </h3>
                    </div>
                    <p className="text-[11px] text-gray-400 mb-4">
                      Entered during sign-up. Changes are saved locally and sent
                      to the server.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <InputField
                        label="Licence Number"
                        value={profile.licenceNumber ?? ""}
                        onChange={(v) => set("licenceNumber", v)}
                        placeholder="e.g. PFSA-12345"
                        hint="Your scouting licence ID"
                      />
                      <InputField
                        label="Years of Experience"
                        value={profile.experience ?? ""}
                        onChange={(v) => set("experience", v)}
                        placeholder="e.g. 3"
                        hint="Total years of scouting experience"
                      />
                      <InputField
                        label="Date of Birth"
                        value={profile.dob ?? ""}
                        onChange={(v) => set("dob", v)}
                        type="date"
                      />
                      <InputField
                        label="Place of Birth"
                        value={profile.placeOfBirth ?? ""}
                        onChange={(v) => set("placeOfBirth", v)}
                        placeholder="e.g. Lagos, Nigeria"
                      />
                    </div>
                  </div>

                  {/* ── Scouting Credentials ── */}
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin size={15} className="text-[#0A2342]" />
                      <h3 className="text-sm font-bold text-gray-900">
                        Scouting Credentials
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <FieldLabel>Primary Region</FieldLabel>
                        <div className="relative">
                          <MapPin
                            size={14}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                          />
                          <select className="w-full pl-8 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A2342]/30 bg-white">
                            <option>Lagos (Island & Mainland)</option>
                            <option>Abuja (FCT)</option>
                            <option>Port Harcourt</option>
                            <option>Kano</option>
                          </select>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <FieldLabel>Certification Level</FieldLabel>
                        <div className="relative">
                          <Award
                            size={14}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                          />
                          <select className="w-full pl-8 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A2342]/30 bg-white">
                            <option>PFSA Level 2</option>
                            <option>PFSA Level 3 (Advanced)</option>
                            <option>FA Talent ID Level 1</option>
                            <option>FA Talent ID Level 2</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sticky save bar */}
              <div className="sticky bottom-0 bg-white border-t border-gray-100 -mx-6 px-6 py-4 md:-mx-10 md:px-10 mt-8">
                <button
                  onClick={handleSaveProfile}
                  disabled={profileSaving || profileLoading}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#0A2342] text-white rounded-lg text-sm font-semibold hover:bg-blue-900 transition shadow-sm disabled:opacity-60"
                >
                  {profileSaving ? (
                    <>
                      <Loader2 size={15} className="animate-spin" /> Saving…
                    </>
                  ) : (
                    <>
                      <Save size={15} /> Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* ─────────────── NOTIFICATIONS TAB ─────────────── */}
          {activeTab === "notifications" && (
            <div className="max-w-xl space-y-6">
              <h2 className="text-lg font-bold text-gray-900">
                Email & App Alerts
              </h2>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden divide-y divide-gray-100">
                {(
                  [
                    [
                      "emailNotifications",
                      "New Coach Mandates",
                      "Get notified when a coach creates a scouting request.",
                    ],
                    [
                      "matchNotification",
                      "Match Notifications",
                      "Alerts when a match relevant to your players is scheduled.",
                    ],
                    [
                      "playerAbsence",
                      "Player Absence Alerts",
                      "Get notified when a tracked player is marked absent.",
                    ],
                    [
                      "promotion",
                      "Promotions & Updates",
                      "Platform news, new features, and opportunities.",
                    ],
                  ] as [keyof ScoutProfile, string, string][]
                ).map(([key, title, desc]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="min-w-0">
                      <h4 className="text-sm font-medium text-gray-900">
                        {title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                    </div>
                    <div className="shrink-0">
                      {notifSaving === key ? (
                        <Loader2
                          size={18}
                          className="animate-spin text-[#0A2342]"
                        />
                      ) : (
                        <button
                          role="switch"
                          aria-checked={!!profile[key]}
                          onClick={() => handleNotifToggle(key, !!profile[key])}
                          className={`relative inline-flex w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#0A2342]/30 ${
                            profile[key] ? "bg-[#0A2342]" : "bg-gray-200"
                          }`}
                        >
                          <span
                            className={`inline-block w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 mt-1 ${
                              profile[key] ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─────────────── SECURITY TAB ─────────────── */}
          {activeTab === "security" && (
            <div className="max-w-md space-y-8">
              <h2 className="text-lg font-bold text-gray-900">
                Change Password
              </h2>

              <div className="space-y-4">
                {(
                  [
                    [
                      "Current Password",
                      oldPassword,
                      setOldPassword,
                      showOld,
                      setShowOld,
                    ],
                    [
                      "New Password (min. 8 chars)",
                      newPassword,
                      setNewPassword,
                      showNew,
                      setShowNew,
                    ],
                    [
                      "Confirm New Password",
                      confirmPassword,
                      setConfirmPassword,
                      showConfirm,
                      setShowConfirm,
                    ],
                  ] as const
                ).map(([label, value, setValue, show, setShow]) => (
                  <div key={label} className="space-y-1.5">
                    <FieldLabel>{label}</FieldLabel>
                    <div className="relative">
                      <Lock
                        size={14}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type={show ? "text" : "password"}
                        value={value}
                        onChange={(e) =>
                          (setValue as (v: string) => void)(e.target.value)
                        }
                        placeholder="••••••••"
                        className={`w-full pl-9 pr-9 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 transition ${
                          label.includes("Confirm") &&
                          confirmPassword &&
                          confirmPassword !== newPassword
                            ? "border-red-400 focus:ring-red-200"
                            : "border-gray-200 focus:ring-[#0A2342]/30"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => (setShow as (v: boolean) => void)(!show)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {show ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                    {label.includes("Confirm") &&
                      confirmPassword &&
                      confirmPassword !== newPassword && (
                        <p className="text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle size={11} /> Passwords do not match
                        </p>
                      )}
                  </div>
                ))}
              </div>

              <button
                onClick={handleChangePassword}
                disabled={passwordSaving}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#0A2342] text-white rounded-lg text-sm font-semibold hover:bg-blue-900 transition disabled:opacity-60"
              >
                {passwordSaving ? (
                  <>
                    <Loader2 size={15} className="animate-spin" /> Updating…
                  </>
                ) : (
                  "Update Password"
                )}
              </button>

              <div className="md:hidden pt-6 border-t border-gray-100">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-red-200 text-red-600 bg-red-50 rounded-lg text-sm font-medium hover:bg-red-100 transition"
                >
                  <LogOut size={16} /> Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
