"use client";

import { useEffect, useState } from "react";
import { getPlayerProfile } from "@/lib/api";
const SETTINGS_STORAGE_KEY = "settingsData";
const LEGACY_PLAYER_PROFILE_STORAGE_KEY = "playerProfileCache";
const PLAYER_PROFILE_STORAGE_KEY_PREFIX = "playerProfileCache:";
const PLAYER_PROFILE_EVENT = "player-profile-updated";
const LEGACY_SEEDED_PROFILE_EMAIL = "peter.abbas@scoutflair.com";
const LEGACY_SEEDED_PROFILE_AVATAR = "/images/profile.jpeg";
const R2_PUBLIC_BASE_URL = "https://pub-cc6bfa4db4fa4eb8b3d35333dcfdca5e.r2.dev";

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
  fullName: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  avatarUrl: "",
  imageFileKey: "",
  biography: "",
  currentTeam: "",
  dob: "",
  height: "",
  weight: "",
  nationality: "",
  location: "",
  position: "",
  preferredFoot: "",
  jerseyNumber: "",
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

export function normalizePlayerName(record: unknown) {
  const source: UnknownRecord = isRecord(record) ? record : {};
  const fallbackFullName = pickString(source.fullName, source.name, source.playerName);
  const fallbackNameParts = splitFullName(fallbackFullName);
  const hasExplicitFirstName = source.first_name !== undefined || source.firstName !== undefined;
  const hasExplicitLastName = source.last_name !== undefined || source.lastName !== undefined;
  const firstName = hasExplicitFirstName
    ? pickString(source.first_name, source.firstName)
    : fallbackNameParts.firstName;
  const lastName = hasExplicitLastName
    ? pickString(source.last_name, source.lastName)
    : hasExplicitFirstName
      ? ""
      : fallbackNameParts.lastName;
  const fullName = [firstName, lastName].filter(Boolean).join(" ");

  return {
    firstName,
    lastName,
    fullName: fullName || fallbackFullName,
  };
}

function isUsableAvatarUrl(value: string) {
  return /^(https?:\/\/|data:|blob:|\/)/i.test(value);
}

function normalizeAvatarUrl(value: string) {
  const avatarValue = value.trim();
  if (!avatarValue) {
    return "";
  }

  return isUsableAvatarUrl(avatarValue)
    ? avatarValue
    : `${R2_PUBLIC_BASE_URL}/${avatarValue.replace(/^\/+/, "")}`;
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

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

function getPlayerProfileStorageKey(email = getPlayerSessionEmail()) {
  const normalizedEmail = normalizeEmail(email);
  return `${PLAYER_PROFILE_STORAGE_KEY_PREFIX}${normalizedEmail || "anonymous"}`;
}

function profileMatchesCurrentSession(profile: Partial<StoredPlayerProfile>) {
  const sessionEmail = normalizeEmail(getPlayerSessionEmail());
  const profileEmail = normalizeEmail(pickString(profile.email));

  return !sessionEmail || !profileEmail || sessionEmail === profileEmail;
}

function isLegacySeededProfile(profile: Partial<StoredPlayerProfile>) {
  return (
    pickString(profile.email).toLowerCase() === LEGACY_SEEDED_PROFILE_EMAIL ||
    pickString(profile.avatarUrl) === LEGACY_SEEDED_PROFILE_AVATAR
  );
}

export function readStoredPlayerProfile(): StoredPlayerProfile {
  if (typeof window === "undefined") {
    return defaultStoredPlayerProfile;
  }

  try {
    const rawProfile = window.localStorage.getItem(getPlayerProfileStorageKey());
    if (!rawProfile) {
      return defaultStoredPlayerProfile;
    }

    const parsedProfile = JSON.parse(rawProfile) as Partial<StoredPlayerProfile>;
    if (isLegacySeededProfile(parsedProfile) || !profileMatchesCurrentSession(parsedProfile)) {
      window.localStorage.removeItem(getPlayerProfileStorageKey());
      return defaultStoredPlayerProfile;
    }

    const nameParts = normalizePlayerName(parsedProfile);

    return {
      ...defaultStoredPlayerProfile,
      ...parsedProfile,
      fullName: nameParts.fullName,
      firstName: nameParts.firstName,
      lastName: nameParts.lastName,
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
  const nameSource: UnknownRecord = {
    fullName: profile.fullName ?? currentProfile.fullName,
  };
  const nextFirstName = profile.firstName ?? currentProfile.firstName;
  const nextLastName = profile.lastName ?? currentProfile.lastName;
  if (profile.firstName !== undefined || nextFirstName) {
    nameSource.firstName = nextFirstName;
  }
  if (profile.lastName !== undefined || nextLastName) {
    nameSource.lastName = nextLastName;
  }
  const nameParts = normalizePlayerName(nameSource);
  const nextEmail = pickString(profile.email) || currentProfile.email || getPlayerSessionEmail();

  const nextProfile: StoredPlayerProfile = {
    ...currentProfile,
    ...profile,
    fullName: nameParts.fullName,
    firstName: nameParts.firstName,
    lastName: nameParts.lastName,
    email: nextEmail,
    avatarUrl:
      profile.avatarUrl !== undefined
        ? pickString(profile.avatarUrl)
        : currentProfile.avatarUrl || defaultStoredPlayerProfile.avatarUrl,
    imageFileKey:
      profile.imageFileKey !== undefined
        ? pickString(profile.imageFileKey)
        : currentProfile.imageFileKey || "",
  };

  window.localStorage.setItem(getPlayerProfileStorageKey(nextEmail), JSON.stringify(nextProfile));
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

  const sessionEmail = getPlayerSessionEmail();
  const responseEmail = pickString(record.email, record.playerEmail);
  if (sessionEmail && responseEmail && normalizeEmail(sessionEmail) !== normalizeEmail(responseEmail)) {
    return null;
  }

  const currentProfile = profileMatchesCurrentSession({ email: responseEmail })
    ? readStoredPlayerProfile()
    : defaultStoredPlayerProfile;
  const nameParts = normalizePlayerName(record);

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
    fullName: nameParts.fullName || currentProfile.fullName,
    firstName: nameParts.firstName,
    lastName: nameParts.lastName,
    email:
      pickString(responseEmail, sessionEmail) ||
      currentProfile.email,
    phone: pickString(record.phone, record.phoneNumber) || currentProfile.phone,
    address: pickString(record.address) || currentProfile.address,
    avatarUrl: normalizeAvatarUrl(avatarCandidate),
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

  if (inflightPlayerProfileRequest) {
    return inflightPlayerProfileRequest;
  }

  inflightPlayerProfileRequest = (async () => {
    try {
      window.localStorage.removeItem(LEGACY_PLAYER_PROFILE_STORAGE_KEY);

      const playerEmail = getPlayerSessionEmail() || readStoredPlayerProfile().email;

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
  return profile.fullName || `${profile.firstName} ${profile.lastName}`.trim();
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
    void fetchPlayerProfileFromBackend(true).then((profile) => {
      setAvatar(profile?.avatarUrl || "");
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
    void fetchPlayerProfileFromBackend(true).then((profile) => {
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

export function usePlayerProfile() {
  const [profile, setProfile] = useState<StoredPlayerProfile>(readStoredPlayerProfile());

  useEffect(() => {
    const syncProfile = () => setProfile(readStoredPlayerProfile());

    syncProfile();
    void fetchPlayerProfileFromBackend(true).then((nextProfile) => {
      setProfile(nextProfile);
    });

    window.addEventListener("storage", syncProfile);
    window.addEventListener(PLAYER_PROFILE_EVENT, syncProfile);

    return () => {
      window.removeEventListener("storage", syncProfile);
      window.removeEventListener(PLAYER_PROFILE_EVENT, syncProfile);
    };
  }, []);

  return profile;
}

export function usePlayerDisplayName() {
  const basicInfo = usePlayerBasicInfo();
  return `${basicInfo.firstName} ${basicInfo.lastName}`.trim();
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

export function clearPlayerProfileStorage() {
  if (typeof window === "undefined") {
    return;
  }

  const scopedKey = getPlayerProfileStorageKey();
  window.localStorage.removeItem(scopedKey);
  window.localStorage.removeItem(LEGACY_PLAYER_PROFILE_STORAGE_KEY);
  window.localStorage.removeItem("playerAvatar");
  window.localStorage.removeItem("playerProfile");
  window.localStorage.removeItem("profileImage");
  window.localStorage.removeItem("avatarUrl");
}
