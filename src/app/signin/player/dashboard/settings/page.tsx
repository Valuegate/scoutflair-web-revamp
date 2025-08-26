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

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="bg-white border-r border-gray-200" style={{ width: '326px' }}>
        <div className="p-4">
          <div className="flex items-center justify-between text-gray-700 mb-6">
            <span className="text-lg font-medium">Settings</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <div className="bg-blue-900   text-white px-4 py-3 ">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="font-medium">Basic Settings</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div style={{ width: '756px' }}>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Basic Settings</h1>
          <p className="text-gray-600 mb-8">Manage your essential settings</p>

          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Basic Information</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-12 gap-6 items-center">
                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                </div>
                <div className="col-span-4 ">
                  <input 
                    type="text" 
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
               
                <div className="col-span-4">
                  <input 
                    type="text" 
                    value={formData.abbias}
                    onChange={(e) => handleInputChange('abbias', e.target.value)}
                    className="  rounded-[14px] w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-12 gap-6 items-center">
                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-700">Contact</label>
                </div>
                <div className="col-span-4">
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="rounded-[14px]  w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
               
                <div className="col-span-4">
                  <input 
                    type="text" 
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="rounded-[14px]  w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-12 gap-6 items-center">
                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-700">Avatar</label>
                </div>
                <div className="col-span-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                        alt="Avatar" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                      Upload
                    </button>
                    <button className="px-4 py-2 bg-white border border-red-300 text-red-600 rounded-md text-sm font-medium hover:bg-red-50">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notifications Settings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Notifications Settings</h2>
            <p className="text-sm text-gray-600 mb-6">We may send you important notifications about your account outside of your notifications settings</p>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-1">Messages</h3>
                  <p className="text-sm text-gray-600 mb-3">These are notifications about in app messages</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" checked={notifications.messages.push} onChange={(e) =>
      setNotifications((prev) => ({
        ...prev,
        messages: { ...prev.messages, push: e.target.checked },
      }))
    } className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-700">Push</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" checked={notifications.messages.email} onChange={(e) =>
      setNotifications((prev) => ({
        ...prev,
        messages: { ...prev.messages, push: e.target.checked },
      }))
    }className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-700">Email</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" checked={notifications.messages.sms} onChange={(e) =>
      setNotifications((prev) => ({
        ...prev,
        messages: { ...prev.messages, push: e.target.checked },
      }))
    } className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-700">SMS</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Messages</h3>
                  <p className="text-sm text-gray-600 mb-3">These are notifications about in app messages</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" checked={notifications.messages2.push} onChange={(e) =>
      setNotifications((prev) => ({
        ...prev,
        messages: { ...prev.messages, push: e.target.checked },
      }))
    } className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-700">Push</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" checked={notifications.messages2.email} onChange={(e) =>
      setNotifications((prev) => ({
        ...prev,
        messages: { ...prev.messages, push: e.target.checked },
      }))
    } className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-700">Email</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" checked={notifications.messages2.sms} onChange={(e) =>
      setNotifications((prev) => ({
        ...prev,
        messages: { ...prev.messages, push: e.target.checked },
      }))
    } className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-700">SMS</span>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-1">Messages</h3>
                  <p className="text-sm text-gray-600 mb-3">These are notifications about in app messages</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" checked={notifications.messages3.push} onChange={(e) =>
      setNotifications((prev) => ({
        ...prev,
        messages: { ...prev.messages, push: e.target.checked },
      }))
    } className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-700">Push</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" checked={notifications.messages3.email}onChange={(e) =>
      setNotifications((prev) => ({
        ...prev,
        messages: { ...prev.messages, push: e.target.checked },
      }))
    } className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-700">Email</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" checked={notifications.messages3.sms}onChange={(e) =>
      setNotifications((prev) => ({
        ...prev,
        messages: { ...prev.messages, push: e.target.checked },
      }))
    } className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-700">SMS</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Messages</h3>
                  <p className="text-sm text-gray-600 mb-3">These are notifications about in app messages</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" checked={true} onChange={(e) =>
      setNotifications((prev) => ({
        ...prev,
        messages: { ...prev.messages, push: e.target.checked },
      }))
    } className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-700">Push</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" checked={true} onChange={(e) =>
      setNotifications((prev) => ({
        ...prev,
        messages: { ...prev.messages, push: e.target.checked },
      }))
    } className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-700">Email</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" checked={false} onChange={(e) =>
      setNotifications((prev) => ({
        ...prev,
        messages: { ...prev.messages, push: e.target.checked },
      }))
    } className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-700">SMS</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Language Settings and Linked Accounts */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Language Settings</h2>
              <p className="text-sm text-gray-600 mb-4">Select your language preference</p>
              
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" checked={language.english_uk} onChange={(e) =>
      setNotifications((prev) => ({
        ...prev,
        messages: { ...prev.messages, push: e.target.checked },
      }))
    } className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="ml-2 text-sm text-gray-700">English (UK)</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" checked={language.english_usa} onChange={(e) =>
      setNotifications((prev) => ({
        ...prev,
        messages: { ...prev.messages, push: e.target.checked },
      }))
    } className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="ml-2 text-sm text-gray-700">English (USA)</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" checked={language.others} onChange={(e) =>
      setNotifications((prev) => ({
        ...prev,
        messages: { ...prev.messages, push: e.target.checked },
      }))
    } className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="ml-2 text-sm text-gray-700">Others</span>
                </label>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Linked Accounts</h2>
              <p className="text-sm text-gray-600 mb-4">Manage your connected accounts</p>
              
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" checked={linkedAccounts.google} onChange={(e) =>
      setNotifications((prev) => ({
        ...prev,
        messages: { ...prev.messages, push: e.target.checked },
      }))
    } className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="ml-2 text-sm text-gray-700">Google</span>
                </label>
              </div>
            </div>
          </div>

          {/* Delete Account */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-1">Delete Account</h2>
                <p className="text-sm text-gray-600">By deleting your account you will lose all your data</p>
              </div>
              <button className="px-4 py-2 text-red-600 text-sm font-medium hover:bg-red-50">
                Delete account...
              </button>
            </div>
          </div>

          {/* Save Changes Button */}
          <div className="flex justify-center">
            <button className="px-8 py-3 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-800 transition-colors">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;