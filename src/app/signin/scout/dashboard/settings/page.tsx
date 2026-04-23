"use client";

import React, { useState } from "react";
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
} from "lucide-react";

export default function ScoutSettingsPage() {
  const [activeTab, setActiveTab] = useState<
    "profile" | "notifications" | "security"
  >("profile");

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8 min-h-screen bg-gray-50">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Settings
        </h1>
        <p className="text-sm md:text-base text-gray-500 mt-1">
          Manage your professional profile and account preferences.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row min-h-[600px] overflow-hidden">
        {/* --- LEFT SIDEBAR (Tabs) --- */}
        <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-200 p-4 bg-gray-50/50">
          <nav className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible no-scrollbar">
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex-shrink-0 md:w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeTab === "profile"
                  ? "bg-blue-100 text-blue-800"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <User size={18} /> Profile & Credentials
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`flex-shrink-0 md:w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeTab === "notifications"
                  ? "bg-blue-100 text-blue-800"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Bell size={18} /> Notifications
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`flex-shrink-0 md:w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeTab === "security"
                  ? "bg-blue-100 text-blue-800"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Shield size={18} /> Security
            </button>
          </nav>

          <div className="hidden md:block mt-8 pt-8 border-t border-gray-200">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors">
              <LogOut size={18} /> Log Out
            </button>
          </div>
        </div>

        {/* --- RIGHT CONTENT AREA --- */}
        <div className="flex-1 p-6 md:p-10 overflow-y-auto">
          {/* PROFILE SETTINGS */}
          {activeTab === "profile" && (
            <div className="max-w-xl space-y-8 animate-in fade-in duration-300">
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Personal Information
                </h2>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
                  <img
                    src="/images/Dennis.png"
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-gray-100"
                  />
                  <div className="text-center sm:text-left">
                    <h3 className="text-base font-semibold text-gray-900">
                      Dennis Ojua
                    </h3>
                    <p className="text-xs text-gray-500 mb-3">
                      Senior Scout • ID: #SC-8821
                    </p>
                    <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 bg-white transition-colors">
                      <Upload size={14} /> Change Photo
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-gray-700">
                        First Name
                      </label>
                      <input
                        type="text"
                        defaultValue="Dennis"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A2342]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-gray-700">
                        Last Name
                      </label>
                      <input
                        type="text"
                        defaultValue="Ojua"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A2342]"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-700">
                      Email Address
                    </label>
                    <div className="flex items-center px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 text-sm">
                      <Mail size={16} className="mr-2" />
                      <span>dennis.ojua@scoutflair.com</span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      defaultValue="+234 801 234 5678"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A2342]"
                    />
                  </div>
                </div>
              </div>

              <hr className="border-gray-100" />

              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Scouting Credentials
                </h2>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-700">
                      Primary Region
                    </label>
                    <div className="relative">
                      <MapPin
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <select className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A2342] bg-white">
                        <option>Lagos (Island & Mainland)</option>
                        <option>Abuja (FCT)</option>
                        <option>Port Harcourt</option>
                        <option>Kano</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-700">
                      Certification Level
                    </label>
                    <div className="relative">
                      <Award
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <select className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A2342] bg-white">
                        <option>PFSA Level 2</option>
                        <option>PFSA Level 3 (Advanced)</option>
                        <option>FA Talent ID Level 1</option>
                        <option>FA Talent ID Level 2</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button className="flex items-center gap-2 px-6 py-2.5 bg-[#0A2342] text-white rounded-lg text-sm font-medium hover:bg-blue-900 transition-colors shadow-sm">
                  <Save size={16} /> Save Changes
                </button>
              </div>
            </div>
          )}

          {/* NOTIFICATION SETTINGS */}
          {activeTab === "notifications" && (
            <div className="max-w-xl space-y-8 animate-in fade-in duration-300">
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Email Alerts
                </h2>
                <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="mt-1 w-4 h-4 text-[#0A2342] rounded border-gray-300 focus:ring-[#0A2342]"
                    />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">
                        New Coach Mandates
                      </h4>
                      <p className="text-xs text-gray-500">
                        Get notified immediately when a coach creates a new
                        scouting request.
                      </p>
                    </div>
                  </div>
                  <hr className="border-gray-200" />
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="mt-1 w-4 h-4 text-[#0A2342] rounded border-gray-300 focus:ring-[#0A2342]"
                    />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">
                        Report Approvals
                      </h4>
                      <p className="text-xs text-gray-500">
                        Receive an email when a coach shortlists one of your
                        reported players.
                      </p>
                    </div>
                  </div>
                  <hr className="border-gray-200" />
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      className="mt-1 w-4 h-4 text-[#0A2342] rounded border-gray-300 focus:ring-[#0A2342]"
                    />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">
                        Weekly Summary
                      </h4>
                      <p className="text-xs text-gray-500">
                        A digest of your activity and top prospects.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <button className="flex items-center gap-2 px-6 py-2.5 bg-[#0A2342] text-white rounded-lg text-sm font-medium hover:bg-blue-900 transition-colors shadow-sm">
                  <Save size={16} /> Save Preferences
                </button>
              </div>
            </div>
          )}

          {/* SECURITY SETTINGS */}
          {activeTab === "security" && (
            <div className="max-w-xl space-y-8 animate-in fade-in duration-300">
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Password & Auth
                </h2>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-700">
                      Current Password
                    </label>
                    <div className="relative">
                      <Lock
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A2342]"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-700">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="password"
                        placeholder="New password"
                        className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A2342]"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-700">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <Lock
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="password"
                        placeholder="Confirm new password"
                        className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A2342]"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <button className="flex items-center gap-2 px-6 py-2.5 bg-[#0A2342] text-white rounded-lg text-sm font-medium hover:bg-blue-900 transition-colors shadow-sm">
                  Update Password
                </button>
              </div>

              <div className="md:hidden pt-8 border-t border-gray-100">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-red-200 text-red-600 bg-red-50 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors">
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
