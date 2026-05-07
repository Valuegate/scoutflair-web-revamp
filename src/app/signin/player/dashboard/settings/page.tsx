"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Cropper } from 'react-cropper';
import type { ReactCropperElement } from 'react-cropper';
import { editPlayerProfile } from '@/lib/api';
import { uploadFileToR2 } from '@/lib/utils';
import {
  fetchPlayerProfileFromBackend,
  notifyPlayerProfileUpdated,
  usePlayerAvatar,
  usePlayerBasicInfo,
  writeStoredPlayerProfile,
} from '../profile/usePlayerAvatar';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  biography: string;
}

interface NotificationSection {
  push: boolean;
  email: boolean;
  sms: boolean;
}

interface Notifications {
  messages: NotificationSection;
  messages2: NotificationSection;
  messages3: NotificationSection;
  marketing: NotificationSection;
}

interface Language {
  english_uk: boolean;
  english_usa: boolean;
  others: boolean;
}

interface LinkedAccounts {
  google: boolean;
}

const DEFAULT_FORM_DATA: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  biography: "",
};
const MAX_IMAGE_FILE_SIZE = 5 * 1024 * 1024;
const AVATAR_CROP_SIZE = 512;

function canvasToFile(canvas: HTMLCanvasElement, originalFile: File) {
  return new Promise<File>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Unable to crop image."));
          return;
        }

        const extension = originalFile.type === "image/png" ? "png" : "jpg";
        const fileName = originalFile.name.replace(/\.[^.]+$/, "") || "avatar";
        resolve(new File([blob], `${fileName}-avatar.${extension}`, { type: blob.type || originalFile.type }));
      },
      originalFile.type === "image/png" ? "image/png" : "image/jpeg",
      0.92,
    );
  });
}

const SettingsPage = () => {
  const playerBasicInfo = usePlayerBasicInfo();
  const playerAvatar = usePlayerAvatar();
  const [formData, setFormData] = useState<FormData>({
    ...DEFAULT_FORM_DATA
  });

  const [notifications, setNotifications] = useState<Notifications>({
    messages: {
      push: true,
      email: true,
      sms: false
    },
    messages2: {
      push: true,
      email: false,
      sms: false
    },
    messages3: {
      push: true,
      email: true,
      sms: false
    },
    marketing: {
      push: true,
      email: true,
      sms: false
    }
  });

  const [language, setLanguage] = useState<Language>({
    english_uk: true,
    english_usa: false,
    others: false
  });

  const [linkedAccounts, setLinkedAccounts] = useState<LinkedAccounts>({
    google: true
  });

  const [avatarUrl, setAvatarUrl] = useState<string>(playerAvatar);
  const [pendingAvatarFile, setPendingAvatarFile] = useState<File | null>(null);
  const [avatarUploadProgress, setAvatarUploadProgress] = useState(0);
  const [cropSourceUrl, setCropSourceUrl] = useState("");
  const [cropOriginalFile, setCropOriginalFile] = useState<File | null>(null);
  const [cropZoom, setCropZoom] = useState(0);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const cropperRef = useRef<ReactCropperElement>(null);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stylesheetId = "cropperjs-stylesheet";
    if (!document.getElementById(stylesheetId)) {
      const link = document.createElement("link");
      link.id = stylesheetId;
      link.rel = "stylesheet";
      link.href = "https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.css";
      document.head.appendChild(link);
    }

    const savedData = localStorage.getItem('settingsData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setNotifications(parsed.notifications || {
        messages: { push: true, email: true, sms: false },
        messages2: { push: true, email: false, sms: false },
        messages3: { push: true, email: true, sms: false },
        marketing: { push: true, email: true, sms: false }
      });
      setLanguage(parsed.language || {
        english_uk: true,
        english_usa: false,
        others: false
      });
      setLinkedAccounts(parsed.linkedAccounts || {
        google: true
      });
    }

    void fetchPlayerProfileFromBackend(true).then((profile) => {
      setFormData({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        phone: profile.phone,
        address: profile.address,
        biography: profile.biography,
      });
    });
  }, []);

  useEffect(() => {
    setFormData((prev) => ({
      firstName: playerBasicInfo.firstName,
      lastName: playerBasicInfo.lastName,
      email: playerBasicInfo.email,
      phone: playerBasicInfo.phone,
      address: playerBasicInfo.address,
      biography: prev.biography,
    }));
  }, [playerBasicInfo]);

  useEffect(() => {
    setAvatarUrl(playerAvatar);
  }, [playerAvatar]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (section: keyof Notifications, type: keyof NotificationSection, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [type]: value
      }
    }));
  };

  const handleLanguageChange = (lang: keyof Language, value: boolean) => {
    setLanguage(prev => ({
      ...prev,
      [lang]: value
    }));
  };

  const handleLinkedAccountChange = (account: keyof LinkedAccounts, value: boolean) => {
    setLinkedAccounts(prev => ({
      ...prev,
      [account]: value
    }));
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('Please choose an image file.');
      e.currentTarget.value = "";
      return;
    }

    if (file.size > MAX_IMAGE_FILE_SIZE) {
      alert('Profile picture must be 5MB or smaller.');
      e.currentTarget.value = "";
      return;
    }

    setPendingAvatarFile(file);
    setAvatarUploadProgress(0);
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result && typeof event.target.result === 'string') {
        setCropOriginalFile(file);
        setCropSourceUrl(event.target.result);
        setCropZoom(0);
        setIsCropModalOpen(true);
      }
    };
    reader.readAsDataURL(file);
    e.currentTarget.value = "";
  };

  const handleAvatarRemove = () => {
    setPendingAvatarFile(null);
    setAvatarUploadProgress(0);
    setAvatarUrl("");
    setCropSourceUrl("");
    setCropOriginalFile(null);
    setIsCropModalOpen(false);
  };

  const handleCropCancel = () => {
    setCropSourceUrl("");
    setCropOriginalFile(null);
    setCropZoom(0);
    setIsCropModalOpen(false);
  };

  const handleApplyCrop = async () => {
    const cropper = cropperRef.current?.cropper;
    if (!cropper || !cropOriginalFile) {
      return;
    }

    const croppedCanvas = cropper.getCroppedCanvas({
      width: AVATAR_CROP_SIZE,
      height: AVATAR_CROP_SIZE,
      imageSmoothingEnabled: true,
      imageSmoothingQuality: "high",
    });

    if (!croppedCanvas) {
      alert("Unable to crop image. Please choose another image.");
      return;
    }

    try {
      const croppedFile = await canvasToFile(croppedCanvas, cropOriginalFile);
      setPendingAvatarFile(croppedFile);
      setAvatarUrl(croppedCanvas.toDataURL(croppedFile.type));
      setAvatarUploadProgress(0);
      handleCropCancel();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to crop image.";
      alert(message);
    }
  };

  const handleCropZoomChange = (value: number) => {
    setCropZoom(value);
    cropperRef.current?.cropper.zoomTo(1 + value);
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      const currentProfile = await fetchPlayerProfileFromBackend(true);

      let imageFileKey = currentProfile.imageFileKey;
      let nextAvatarUrl = currentProfile.avatarUrl;

      if (pendingAvatarFile) {
        const uploadResponse = await uploadFileToR2(pendingAvatarFile, setAvatarUploadProgress);
        imageFileKey = uploadResponse.fileKey;
        nextAvatarUrl = uploadResponse.url;
      } else if (!avatarUrl) {
        imageFileKey = "";
        nextAvatarUrl = "";
      }

      const fullName = `${formData.firstName} ${formData.lastName}`.trim();

      const payload = {
        address: formData.address,
        biography: formData.biography,
        currentTeam: currentProfile.currentTeam,
        dob: currentProfile.dob,
        email: formData.email,
        facebookUrl: currentProfile.facebookUrl,
        fullName,
        height: currentProfile.height,
        igUrl: currentProfile.igUrl,
        imageFileKey,
        jerseyNumber: currentProfile.jerseyNumber,
        licenceNumber: currentProfile.licenceNumber,
        location: currentProfile.location,
        nationality: currentProfile.nationality,
        nin: currentProfile.nin,
        phone: formData.phone,
        playerId: currentProfile.playerId ?? 0,
        position: currentProfile.position,
        preferredFoot: currentProfile.preferredFoot,
        ticTokUrl: currentProfile.ticTokUrl,
        weight: currentProfile.weight,
        xurl: currentProfile.xurl,
      };

      await editPlayerProfile(payload);

      writeStoredPlayerProfile({
        ...currentProfile,
        fullName,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        biography: formData.biography,
        imageFileKey,
        avatarUrl: nextAvatarUrl,
      });

      const data = {
        notifications,
        language,
        linkedAccounts,
      };
      localStorage.setItem('settingsData', JSON.stringify(data));
      setPendingAvatarFile(null);
      setAvatarUploadProgress(0);
      notifyPlayerProfileUpdated();
      alert('Changes saved successfully!');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to save profile changes.';
      alert(message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed lg:relative inset-y-0 left-0 z-50 lg:z-auto w-80 lg:w-80 bg-white border-r border-gray-200 transform -translate-x-full lg:translate-x-0 transition-transform duration-300 ease-in-out">
        <div className="p-4 flex items-center justify-between text-gray-700 mb-6">
          <span className="text-lg font-medium">Settings</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <div className="bg-[#0A2342] text-white px-4 py-3">
          <div className="flex space-around gap-6">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="font-medium">Basic Settings</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Mobile header */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
          <h1 className="text-lg font-semibold text-center">Basic Settings</h1>
        </div>

        <div className="p-4 lg:p-8">
          <div className="max-w-4xl">
            <div className="hidden lg:block mb-8">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">Basic Settings</h1>
              <p className="text-gray-600">Manage your essential settings</p>
            </div>

            {/* Basic Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6 mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Basic Information</h2>
              
              <div className="space-y-6">
                {/* Name fields */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input 
                      type="text" 
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input 
                      type="text" 
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter last name"
                    />
                  </div>
                </div>

                {/* Contact fields */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input 
                      type="text" 
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                {/* Address field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <input 
                    type="text" 
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Biography</label>
                  <textarea
                    value={formData.biography}
                    onChange={(e) => handleInputChange('biography', e.target.value)}
                    rows={5}
                    maxLength={1000}
                    className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2 text-sm leading-6 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tell scouts about your playing style, strengths, experience, and goals"
                  />
                  <div className="mt-1 text-right text-xs text-gray-500">
                    {formData.biography.length}/1000
                  </div>
                </div>

                {/* Avatar */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
                 
                  <div className="lg:col-span-9">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                        {avatarUrl ? (
                          <img
                            src={avatarUrl}
                            alt="Avatar"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full bg-gray-100" />
                        )}
                      </div>
                      {isSaving && pendingAvatarFile && avatarUploadProgress > 0 && (
                        <div className="w-full max-w-xs overflow-hidden rounded bg-gray-200 sm:w-40">
                          <div
                            className="h-2 bg-[#0A2A56] transition-all"
                            style={{ width: `${avatarUploadProgress}%` }}
                          />
                        </div>
                      )}
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button 
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                          {avatarUrl ? "Change" : "Upload"}
                        </button>
                        {pendingAvatarFile ? (
                          <button
                            type="button"
                            onClick={() => {
                              setCropSourceUrl(avatarUrl);
                              setCropOriginalFile(pendingAvatarFile);
                              setCropZoom(0);
                              setIsCropModalOpen(true);
                            }}
                            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                          >
                            Crop
                          </button>
                        ) : null}
                        <button 
                          type="button"
                          onClick={handleAvatarRemove}
                          className="px-4 py-2 bg-white border border-red-300 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Notifications Settings */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6 mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Notifications Settings</h2>
              <p className="text-sm text-gray-600 mb-6">We may send you important notifications about your account outside of your notifications settings</p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">App Messages</h3>
                    <p className="text-sm text-gray-600 mb-3">These are notifications about in app messages</p>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          checked={notifications.messages.push} 
                          onChange={(e) => handleNotificationChange('messages', 'push', e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                        />
                        <span className="ml-2 text-sm text-gray-700">Push</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          checked={notifications.messages.email} 
                          onChange={(e) => handleNotificationChange('messages', 'email', e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                        />
                        <span className="ml-2 text-sm text-gray-700">Email</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          checked={notifications.messages.sms} 
                          onChange={(e) => handleNotificationChange('messages', 'sms', e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                        />
                        <span className="ml-2 text-sm text-gray-700">SMS</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">System Updates</h3>
                    <p className="text-sm text-gray-600 mb-3">These are notifications about system updates</p>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          checked={notifications.messages2.push} 
                          onChange={(e) => handleNotificationChange('messages2', 'push', e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                        />
                        <span className="ml-2 text-sm text-gray-700">Push</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          checked={notifications.messages2.email} 
                          onChange={(e) => handleNotificationChange('messages2', 'email', e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                        />
                        <span className="ml-2 text-sm text-gray-700">Email</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          checked={notifications.messages2.sms} 
                          onChange={(e) => handleNotificationChange('messages2', 'sms', e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                        />
                        <span className="ml-2 text-sm text-gray-700">SMS</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Security Alerts</h3>
                    <p className="text-sm text-gray-600 mb-3">These are notifications about security events</p>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          checked={notifications.messages3.push} 
                          onChange={(e) => handleNotificationChange('messages3', 'push', e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                        />
                        <span className="ml-2 text-sm text-gray-700">Push</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          checked={notifications.messages3.email} 
                          onChange={(e) => handleNotificationChange('messages3', 'email', e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                        />
                        <span className="ml-2 text-sm text-gray-700">Email</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          checked={notifications.messages3.sms} 
                          onChange={(e) => handleNotificationChange('messages3', 'sms', e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                        />
                        <span className="ml-2 text-sm text-gray-700">SMS</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Marketing</h3>
                    <p className="text-sm text-gray-600 mb-3">These are notifications about promotions</p>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          checked={notifications.marketing.push} 
                          onChange={(e) => handleNotificationChange('marketing', 'push', e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                        />
                        <span className="ml-2 text-sm text-gray-700">Push</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          checked={notifications.marketing.email} 
                          onChange={(e) => handleNotificationChange('marketing', 'email', e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                        />
                        <span className="ml-2 text-sm text-gray-700">Email</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          checked={notifications.marketing.sms} 
                          onChange={(e) => handleNotificationChange('marketing', 'sms', e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                        />
                        <span className="ml-2 text-sm text-gray-700">SMS</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Language Settings and Linked Accounts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-2">Language Settings</h2>
                <p className="text-sm text-gray-600 mb-4">Select your language preference</p>
                
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={language.english_uk} 
                      onChange={(e) => handleLanguageChange('english_uk', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                    />
                    <span className="ml-2 text-sm text-gray-700">English (UK)</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={language.english_usa} 
                      onChange={(e) => handleLanguageChange('english_usa', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                    />
                    <span className="ml-2 text-sm text-gray-700">English (USA)</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={language.others} 
                      onChange={(e) => handleLanguageChange('others', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                    />
                    <span className="ml-2 text-sm text-gray-700">Others</span>
                  </label>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-2">Linked Accounts</h2>
                <p className="text-sm text-gray-600 mb-4">Manage your connected accounts</p>
                
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={linkedAccounts.google} 
                      onChange={(e) => handleLinkedAccountChange('google', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                    />
                    <span className="ml-2 text-sm text-gray-700">Google</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Delete Account */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-1">Delete Account</h2>
                  <p className="text-sm text-gray-600">By deleting your account you will lose all your data</p>
                </div>
                <button className="self-start sm:self-auto px-4 py-2 text-red-600 text-sm font-medium hover:bg-red-50 rounded-lg border border-red-200">
                  Delete account...
                </button>
              </div>
            </div>

            {/* Save Changes Button */}
            <div className="flex justify-center">
              <button onClick={() => void handleSave()} disabled={isSaving} className="w-full sm:w-auto px-8 py-3 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-800 transition-colors disabled:cursor-not-allowed disabled:opacity-60">
                {isSaving ? "Saving..." : "Save changes"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden file input for avatar upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleAvatarUpload}
        accept="image/*"
        className="hidden"
      />

      {isCropModalOpen && cropSourceUrl ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 py-6">
          <div className="w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Crop profile picture</h2>
                <p className="text-sm text-gray-500">Move and zoom the image until the circular preview looks right.</p>
              </div>
              <button
                type="button"
                onClick={handleCropCancel}
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100"
              >
                Close
              </button>
            </div>

            <div className="grid gap-6 p-5 lg:grid-cols-[1fr_220px]">
              <div className="min-h-[360px] overflow-hidden rounded-lg bg-gray-950">
                <Cropper
                  ref={cropperRef}
                  src={cropSourceUrl}
                  style={{ height: 360, width: "100%" }}
                  aspectRatio={1}
                  viewMode={1}
                  dragMode="move"
                  autoCropArea={1}
                  background={false}
                  guides={false}
                  center={false}
                  cropBoxMovable={false}
                  cropBoxResizable={false}
                  responsive
                  checkOrientation={false}
                  preview=".avatar-crop-preview"
                />
              </div>

              <div className="flex flex-col gap-5">
                <div>
                  <div className="mb-3 text-sm font-medium text-gray-800">Preview</div>
                  <div className="mx-auto h-40 w-40 overflow-hidden rounded-full border-4 border-[#0A2A56] bg-gray-100">
                    <div className="avatar-crop-preview h-full w-full" />
                  </div>
                </div>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-gray-800">Zoom</span>
                  <input
                    type="range"
                    min={0}
                    max={2}
                    step={0.01}
                    value={cropZoom}
                    onChange={(event) => handleCropZoomChange(Number(event.target.value))}
                    className="w-full accent-[#0A2A56]"
                  />
                </label>

                <div className="rounded-lg bg-gray-50 p-3 text-xs leading-5 text-gray-600">
                  The saved avatar will be cropped to a square image, so it stays sharp in circular dashboard avatars.
                </div>
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-gray-200 px-5 py-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleCropCancel}
                className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => void handleApplyCrop()}
                className="rounded-lg bg-[#0A2A56] px-5 py-2 text-sm font-semibold text-white hover:opacity-95"
              >
                Apply crop
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SettingsPage;
