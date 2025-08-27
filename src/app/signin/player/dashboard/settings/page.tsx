"use client"
import React, { useState } from 'react';

const SettingsPage = () => {
  const [formData, setFormData] = useState({
    fullName: 'Pete',
    abbias: 'Abbias',
    email: 'Joshfavomi@gmail.com',
    phone: '08034*****'
  });

  const [notifications, setNotifications] = useState({
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
    }
  });

  const [language, setLanguage] = useState({
    english_uk: true,
    english_usa: false,
    others: false
  });

  const [linkedAccounts, setLinkedAccounts] = useState({
    google: true
  });



  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (section: string, type: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [section]: {
        ...(prev as any)[section],
        [type]: value
      }
    }));
  };

  const handleLanguageChange = (lang: string, value: boolean) => {
    setLanguage(prev => ({
      ...prev,
      [lang]: value
    }));
  };

  const handleLinkedAccountChange = (account: string, value: boolean) => {
    setLinkedAccounts(prev => ({
      ...prev,
      [account]: value
    }));
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
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
                  <div className="lg:col-span-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2 lg:mb-0">Full Name</label>
                  </div>
                  <div className="lg:col-span-4">
                    <input 
                      type="text" 
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter full name"
                    />
                  </div>
                  <div className="lg:col-span-5">
                    <input 
                      type="text" 
                      value={formData.abbias}
                      onChange={(e) => handleInputChange('abbias', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter abbreviation"
                    />
                  </div>
                </div>

                {/* Contact fields */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
                  <div className="lg:col-span-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2 lg:mb-0">Contact</label>
                  </div>
                  <div className="lg:col-span-4">
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter email"
                    />
                  </div>
                  <div className="lg:col-span-5">
                    <input 
                      type="text" 
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                {/* Avatar */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
                  <div className="lg:col-span-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2 lg:mb-0">Avatar</label>
                  </div>
                  <div className="lg:col-span-9">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                        <img 
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                          alt="Avatar" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                          Upload
                        </button>
                        <button className="px-4 py-2 bg-white border border-red-300 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50">
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
                          checked={true} 
                          onChange={() => {}}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                        />
                        <span className="ml-2 text-sm text-gray-700">Push</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          checked={true} 
                          onChange={() => {}}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                        />
                        <span className="ml-2 text-sm text-gray-700">Email</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          checked={false} 
                          onChange={() => {}}
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
              <button className="w-full sm:w-auto px-8 py-3 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-800 transition-colors">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;