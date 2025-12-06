"use client";

import React, { useState } from "react";
import { 
  User, 
  Shield, 
  Bell, 
  CreditCard, 
  Flag, 
  Upload, 
  Save, 
  Mail, 
  Lock,
  LogOut
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "team" | "notifications" | "security">("profile");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 text-sm">Manage your account preferences and team configuration.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row min-h-[600px]">
        
        {/* --- LEFT SIDEBAR (Tabs) --- */}
        <div className="w-full md:w-64 border-r border-gray-200 p-4">
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                activeTab === "profile" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <User size={18} /> Profile
            </button>
            <button
              onClick={() => setActiveTab("team")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                activeTab === "team" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Flag size={18} /> Team Settings
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                activeTab === "notifications" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Bell size={18} /> Notifications
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                activeTab === "security" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Shield size={18} /> Security
            </button>
          </nav>
          
          <div className="mt-8 pt-8 border-t border-gray-100">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors">
              <LogOut size={18} /> Log Out
            </button>
          </div>
        </div>

        {/* --- RIGHT CONTENT AREA --- */}
        <div className="flex-1 p-6 md:p-10">
          
          {/* PROFILE SETTINGS */}
          {activeTab === "profile" && (
            <div className="max-w-xl space-y-8">
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">Personal Information</h2>
                <div className="flex items-center gap-6 mb-6">
                  <img src="/images/scdp.png" alt="Profile" className="w-20 h-20 rounded-full object-cover border-2 border-gray-200" />
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                    <Upload size={16} /> Change Photo
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">First Name</label>
                    <input type="text" defaultValue="Dave" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Last Name</label>
                    <input type="text" defaultValue="Ishmael" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                    <div className="flex items-center px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500">
                      <Mail size={16} className="mr-2" />
                      <span>dave.ishmael@scoutflair.com</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Phone Number</label>
                    <input type="tel" defaultValue="+234 801 234 5678" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">Coaching Credentials</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Highest License</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>UEFA Pro License</option>
                      <option>UEFA A License</option>
                      <option>UEFA B License</option>
                      <option>CAF A License</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Years Experience</label>
                    <input type="number" defaultValue="12" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-900 text-white rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors">
                  <Save size={16} /> Save Changes
                </button>
              </div>
            </div>
          )}

          {/* TEAM SETTINGS */}
          {activeTab === "team" && (
            <div className="max-w-xl space-y-8">
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">Club Identity</h2>
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-20 h-20 bg-blue-50 rounded-xl border-2 border-dashed border-blue-200 flex items-center justify-center text-blue-400">
                    <Flag size={32} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Club Crest</h3>
                    <p className="text-xs text-gray-500 mb-2">Upload a transparent PNG (500x500px)</p>
                    <button className="text-xs font-semibold text-blue-600 hover:text-blue-800">Upload New</button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Club Name</label>
                    <input type="text" defaultValue="Scoutflair FC" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Stadium / Training Ground</label>
                    <input type="text" defaultValue="Lagos City Stadium" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Primary Color</label>
                      <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg">
                        <div className="w-6 h-6 rounded-full bg-blue-900 border border-gray-200"></div>
                        <span className="text-sm text-gray-600">#1E3A8A</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Secondary Color</label>
                      <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg">
                        <div className="w-6 h-6 rounded-full bg-yellow-400 border border-gray-200"></div>
                        <span className="text-sm text-gray-600">#FACC15</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-900 text-white rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors">
                  <Save size={16} /> Update Team Info
                </button>
              </div>
            </div>
          )}

          {/* NOTIFICATION SETTINGS */}
          {activeTab === "notifications" && (
            <div className="max-w-xl space-y-8">
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">Email Notifications</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <input type="checkbox" defaultChecked className="mt-1 w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">New Scout Reports</h4>
                      <p className="text-xs text-gray-500">Get notified when a scout submits a new player evaluation.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <input type="checkbox" defaultChecked className="mt-1 w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Injury Updates</h4>
                      <p className="text-xs text-gray-500">Receive alerts about player fitness and medical reports.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1 w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Marketing & Tips</h4>
                      <p className="text-xs text-gray-500">Receive platform updates and coaching tips.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-900 text-white rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors">
                  <Save size={16} /> Save Preferences
                </button>
              </div>
            </div>
          )}

          {/* SECURITY SETTINGS */}
          {activeTab === "security" && (
            <div className="max-w-xl space-y-8">
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">Password & Auth</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Current Password</label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="password" placeholder="••••••••" className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">New Password</label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="password" placeholder="New password" className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="password" placeholder="Confirm new password" className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-900 text-white rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors">
                  Update Password
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}