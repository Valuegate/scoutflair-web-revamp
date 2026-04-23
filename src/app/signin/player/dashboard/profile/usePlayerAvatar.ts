"use client";

import { useEffect, useState } from "react";
import { playerProfile } from "./profileData";

const SETTINGS_STORAGE_KEY = "settingsData";
const PLAYER_PROFILE_EVENT = "player-profile-updated";

export const defaultPlayerAvatar = playerProfile.avatar;
export const defaultPlayerBasicInfo = {
  firstName: playerProfile.firstName,
  lastName: playerProfile.lastName,
  email: playerProfile.email,
  phone: playerProfile.phone,
  address: playerProfile.address,
};

type PlayerBasicInfo = typeof defaultPlayerBasicInfo;
type StoredSettings = {
  avatarUrl?: string;
  formData?: Partial<PlayerBasicInfo>;
};

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

export function resolvePlayerBasicInfo(): PlayerBasicInfo {
  const storedSettings = readStoredSettings();

  return {
    firstName: storedSettings.formData?.firstName || defaultPlayerBasicInfo.firstName,
    lastName: storedSettings.formData?.lastName || defaultPlayerBasicInfo.lastName,
    email: storedSettings.formData?.email || defaultPlayerBasicInfo.email,
    phone: storedSettings.formData?.phone || defaultPlayerBasicInfo.phone,
    address: storedSettings.formData?.address || defaultPlayerBasicInfo.address,
  };
}

export function resolvePlayerDisplayName() {
  const { firstName, lastName } = resolvePlayerBasicInfo();
  return `${firstName} ${lastName}`.trim() || playerProfile.name;
}

export function resolvePlayerAvatar() {
  return readStoredSettings().avatarUrl || defaultPlayerAvatar;
}

export function notifyPlayerProfileUpdated() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(PLAYER_PROFILE_EVENT));
  }
}

export const notifyPlayerAvatarUpdated = notifyPlayerProfileUpdated;

export function usePlayerAvatar() {
  const [avatar, setAvatar] = useState<string>(defaultPlayerAvatar);

  useEffect(() => {
    const syncAvatar = () => setAvatar(resolvePlayerAvatar());

    syncAvatar();
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
  const [basicInfo, setBasicInfo] = useState<PlayerBasicInfo>(defaultPlayerBasicInfo);

  useEffect(() => {
    const syncBasicInfo = () => setBasicInfo(resolvePlayerBasicInfo());

    syncBasicInfo();
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
  const { firstName, lastName } = usePlayerBasicInfo();
  return `${firstName} ${lastName}`.trim() || playerProfile.name;
}
