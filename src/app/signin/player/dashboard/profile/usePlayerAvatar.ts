"use client";

import { useEffect, useState } from "react";
import { getPlayerProfile } from "@/lib/api";
import { playerProfile } from "./profileData";

const SETTINGS_STORAGE_KEY = "settingsData";
const PLAYER_PROFILE_STORAGE_KEY = "playerProfileCache";
const PLAYER_PROFILE_EVENT = "player-profile-updated";

type UnknownRecord = Record<string, unknown>;

export type StoredPlayerProfile = {
  playerId?: number;
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  avatarUrl: string;
  imageFileKey: string;
  biography: string;
  currentTeam: string;
  dob: string;
  height: string;
  weight: string;
  nationality: string;
  location: string;
  position: string;
  preferredFoot: string;
  jerseyNumber: string;
  nin: string;
  licenceNumber: string;
  facebookUrl: string;
  igUrl: string;
  ticTokUrl: string;
  xurl: string;
};

const defaultStoredPlayerProfile: StoredPlayerProfile = {
  fullName: playerProfile.name,
  firstName: playerProfile.firstName,
  lastName: playerProfile.lastName,
  email: playerProfile.email,
  phone: playerProfile.phone,
  address: playerProfile.address,
  avatarUrl: playerProfile.avatar,
  imageFileKey: "",
  biography: playerProfile.bio,
  currentTeam: "",
  dob: playerProfile.dateOfBirth,
  height: playerProfile.height,
  weight: playerProfile.weight,
  nationality: playerProfile.nationality,
  location: playerProfile.address,
  position: playerProfile.position,
  preferredFoot: playerProfile.preferredFoot,
  jerseyNumber: String(playerProfile.shirtNumber),
  nin: "",
  licenceNumber: "",
  facebookUrl: "",
  igUrl: "",
  ticTokUrl: "",
  xurl: "",
};

export const defaultPlayerAvatar = defaultStoredPlayerProfile.avatarUrl;
export const defaultPlayerBasicInfo = {
  firstName: defaultStoredPlayerProfile.firstName,
  lastName: defaultStoredPlayerProfile.lastName,
  email: defaultStoredPlayerProfile.email,
  phone: defaultStoredPlayerProfile.phone,
  address: defaultStoredPlayerProfile.address,
};

type PlayerBasicInfo = typeof defaultPlayerBasicInfo;
type StoredSettings = {
  notifications?: unknown;
  language?: unknown;
  linkedAccounts?: unknown;
};

let inflightPlayerProfileRequest: Promise<StoredPlayerProfile> | null = null;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function pickString(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return "";
}

function pickNumber(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }

    if (typeof value === "string" && value.trim()) {
      const parsed = Number(value);
      if (!Number.isNaN(parsed)) {
        return parsed;
      }
    }
  }

  return undefined;
}

function splitFullName(fullName: string) {
  const normalizedName = fullName.trim();
  if (!normalizedName) {
    return {
      firstName: defaultStoredPlayerProfile.firstName,
      lastName: defaultStoredPlayerProfile.lastName,
    };
  }

  const [firstName, ...rest] = normalizedName.split(/\s+/);
  return {
    firstName,
    lastName: rest.join(" "),
  };
}

function isUsableAvatarUrl(value: string) {
  return /^(https?:\/\/|data:|blob:|\/)/i.test(value);
}

function readStoredSettings(): StoredSettings {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const rawSettings = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
    return rawSettings ? (JSON.parse(rawSettings) as StoredSettings) : {};
  } catch {
    return {};
  }
}

function readUserSession() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawSession = window.localStorage.getItem("userSession");
    return rawSession ? JSON.parse(rawSession) : null;
  } catch {
    return null;
  }
}

function getPlayerSessionEmail() {
  const session = readUserSession();
  return isRecord(session) ? pickString(session.email) : "";
}

export function readStoredPlayerProfile(): StoredPlayerProfile {
  if (typeof window === "undefined") {
    return defaultStoredPlayerProfile;
  }

  try {
    const rawProfile = window.localStorage.getItem(PLAYER_PROFILE_STORAGE_KEY);
    if (!rawProfile) {
      return defaultStoredPlayerProfile;
    }

    const parsedProfile = JSON.parse(rawProfile) as Partial<StoredPlayerProfile>;
    const fullName = pickString(parsedProfile.fullName) || defaultStoredPlayerProfile.fullName;
    const nameParts = splitFullName(fullName);

    return {
      ...defaultStoredPlayerProfile,
      ...parsedProfile,
      fullName,
      firstName: pickString(parsedProfile.firstName) || nameParts.firstName,
      lastName: pickString(parsedProfile.lastName) || nameParts.lastName,
      avatarUrl:
        pickString(parsedProfile.avatarUrl) || defaultStoredPlayerProfile.avatarUrl,
      imageFileKey: pickString(parsedProfile.imageFileKey),
    };
  } catch {
    return defaultStoredPlayerProfile;
  }
}

export function writeStoredPlayerProfile(profile: Partial<StoredPlayerProfile>) {
  if (typeof window === "undefined") {
    return defaultStoredPlayerProfile;
  }

  const currentProfile = readStoredPlayerProfile();
  const nextFullName = pickString(profile.fullName) || currentProfile.fullName;
  const nameParts = splitFullName(nextFullName);

  const nextProfile: StoredPlayerProfile = {
    ...currentProfile,
    ...profile,
    fullName: nextFullName,
    firstName: pickString(profile.firstName) || nameParts.firstName,
    lastName:
      profile.lastName !== undefined
        ? pickString(profile.lastName)
        : nameParts.lastName,
    avatarUrl:
      pickString(profile.avatarUrl) ||
      currentProfile.avatarUrl ||
      defaultStoredPlayerProfile.avatarUrl,
    imageFileKey:
      pickString(profile.imageFileKey) || currentProfile.imageFileKey || "",
  };

  window.localStorage.setItem(PLAYER_PROFILE_STORAGE_KEY, JSON.stringify(nextProfile));
  return nextProfile;
}

function extractFirstRecord(payload: unknown): UnknownRecord | null {
  if (isRecord(payload)) {
    const preferredKeys = ["data", "obj", "item", "result", "profile", "player"];
    for (const key of preferredKeys) {
      if (key in payload) {
        const nested = extractFirstRecord(payload[key]);
        if (nested) {
          return nested;
        }
      }
    }

    return payload;
  }

  if (Array.isArray(payload)) {
    for (const item of payload) {
      const nested = extractFirstRecord(item);
      if (nested) {
        return nested;
      }
    }
  }

  return null;
}

function normalizePlayerProfile(rawProfile: unknown) {
  const record = extractFirstRecord(rawProfile);
  if (!record) {
    return null;
  }

  const currentProfile = readStoredPlayerProfile();
  const fullName =
    pickString(record.fullName, record.name, record.playerName) ||
    currentProfile.fullName ||
    defaultStoredPlayerProfile.fullName;
  const nameParts = splitFullName(fullName);

  const imageFileKey = pickString(record.imageFileKey, record.fileKey);
  const avatarCandidate = pickString(
    record.avatarUrl,
    record.avatar,
    record.profileImage,
    record.imageUrl,
    record.image,
    record.publicUrl,
    imageFileKey,
  );

  return {
    ...currentProfile,
    playerId: pickNumber(record.playerId, record.id, record.profileId) ?? currentProfile.playerId,
    fullName,
    firstName: nameParts.firstName,
    lastName: nameParts.lastName,
    email:
      pickString(record.email, record.playerEmail, getPlayerSessionEmail()) ||
      currentProfile.email ||
      defaultStoredPlayerProfile.email,
    phone: pickString(record.phone, record.phoneNumber) || currentProfile.phone,
    address: pickString(record.address) || currentProfile.address,
    avatarUrl:
      (isUsableAvatarUrl(avatarCandidate) ? avatarCandidate : "") ||
      currentProfile.avatarUrl ||
      defaultStoredPlayerProfile.avatarUrl,
    imageFileKey: imageFileKey || currentProfile.imageFileKey,
    biography: pickString(record.biography, record.bio) || currentProfile.biography,
    currentTeam: pickString(record.currentTeam) || currentProfile.currentTeam,
    dob: pickString(record.dob, record.dateOfBirth) || currentProfile.dob,
    height: pickString(record.height) || currentProfile.height,
    weight: pickString(record.weight) || currentProfile.weight,
    nationality: pickString(record.nationality) || currentProfile.nationality,
    location: pickString(record.location) || currentProfile.location,
    position: pickString(record.position) || currentProfile.position,
    preferredFoot: pickString(record.preferredFoot) || currentProfile.preferredFoot,
    jerseyNumber: pickString(record.jerseyNumber) || currentProfile.jerseyNumber,
    nin: pickString(record.nin) || currentProfile.nin,
    licenceNumber: pickString(record.licenceNumber) || currentProfile.licenceNumber,
    facebookUrl: pickString(record.facebookUrl) || currentProfile.facebookUrl,
    igUrl: pickString(record.igUrl) || currentProfile.igUrl,
    ticTokUrl: pickString(record.ticTokUrl) || currentProfile.ticTokUrl,
    xurl: pickString(record.xurl) || currentProfile.xurl,
  } satisfies StoredPlayerProfile;
}

export async function fetchPlayerProfileFromBackend(force = false) {
  if (typeof window === "undefined") {
    return defaultStoredPlayerProfile;
  }

  if (!force && inflightPlayerProfileRequest) {
    return inflightPlayerProfileRequest;
  }

  inflightPlayerProfileRequest = (async () => {
    try {
      const playerEmail =
        getPlayerSessionEmail() ||
        readStoredPlayerProfile().email ||
        defaultStoredPlayerProfile.email;

      const response = await getPlayerProfile(playerEmail || undefined);
      const normalizedProfile = normalizePlayerProfile(response);

      if (!normalizedProfile) {
        return readStoredPlayerProfile();
      }

      writeStoredPlayerProfile(normalizedProfile);
      return normalizedProfile;
    } catch {
      return readStoredPlayerProfile();
    } finally {
      inflightPlayerProfileRequest = null;
    }
  })();

  return inflightPlayerProfileRequest;
}

export function resolvePlayerBasicInfo(): PlayerBasicInfo {
  const profile = readStoredPlayerProfile();

  return {
    firstName: profile.firstName || defaultPlayerBasicInfo.firstName,
    lastName: profile.lastName || defaultPlayerBasicInfo.lastName,
    email: profile.email || defaultPlayerBasicInfo.email,
    phone: profile.phone || defaultPlayerBasicInfo.phone,
    address: profile.address || defaultPlayerBasicInfo.address,
  };
}

export function resolvePlayerDisplayName() {
  const profile = readStoredPlayerProfile();
  return profile.fullName || `${profile.firstName} ${profile.lastName}`.trim() || playerProfile.name;
}

export function resolvePlayerAvatar() {
  const profile = readStoredPlayerProfile();
  return profile.avatarUrl || defaultPlayerAvatar;
}

export function notifyPlayerProfileUpdated() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(PLAYER_PROFILE_EVENT));
  }
}

export const notifyPlayerAvatarUpdated = notifyPlayerProfileUpdated;

export function usePlayerAvatar() {
  const [avatar, setAvatar] = useState<string>(resolvePlayerAvatar());

  useEffect(() => {
    const syncAvatar = () => setAvatar(resolvePlayerAvatar());

    syncAvatar();
    void fetchPlayerProfileFromBackend().then((profile) => {
      if (profile?.avatarUrl) {
        setAvatar(profile.avatarUrl);
      }
    });

    window.addEventListener("storage", syncAvatar);
    window.addEventListener(PLAYER_PROFILE_EVENT, syncAvatar);

    return () => {
      window.removeEventListener("storage", syncAvatar);
      window.removeEventListener(PLAYER_PROFILE_EVENT, syncAvatar);
    };
  }, []);

  return avatar;
}

export function usePlayerBasicInfo() {
  const [basicInfo, setBasicInfo] = useState<PlayerBasicInfo>(resolvePlayerBasicInfo());

  useEffect(() => {
    const syncBasicInfo = () => setBasicInfo(resolvePlayerBasicInfo());

    syncBasicInfo();
    void fetchPlayerProfileFromBackend().then((profile) => {
      if (profile) {
        setBasicInfo({
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
          phone: profile.phone,
          address: profile.address,
        });
      }
    });

    window.addEventListener("storage", syncBasicInfo);
    window.addEventListener(PLAYER_PROFILE_EVENT, syncBasicInfo);

    return () => {
      window.removeEventListener("storage", syncBasicInfo);
      window.removeEventListener(PLAYER_PROFILE_EVENT, syncBasicInfo);
    };
  }, []);

  return basicInfo;
}

export function usePlayerDisplayName() {
  const basicInfo = usePlayerBasicInfo();
  return `${basicInfo.firstName} ${basicInfo.lastName}`.trim() || playerProfile.name;
}

export function clearPlayerSettingsStorage() {
  if (typeof window !== "undefined") {
    const currentSettings = readStoredSettings();
    window.localStorage.setItem(
      SETTINGS_STORAGE_KEY,
      JSON.stringify({
        notifications: currentSettings.notifications,
        language: currentSettings.language,
        linkedAccounts: currentSettings.linkedAccounts,
      }),
    );
  }
}
