"use client"

import React, { useState } from 'react';
import { X, Upload, Loader2 } from 'lucide-react';

interface FormData {
  academyClubName: string;
  playerName: string;
  position: string;
  height: string;
  weight: string;
  rating: number;
  nationality: string;
  games: number;
  goals: number;
  assists: number;
  image: File | null;
}

interface AddTaskFormProps {
  onCancel?: () => void;
  onSave?: (formData: any) => void;
  isLoading?: boolean;
  error?: string | null;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ 
  onCancel, 
  onSave,
  isLoading = false,
  error = null 
}) => {
  const [formData, setFormData] = useState<FormData>({
    academyClubName: '',
    playerName: '',
    position: '',
    height: '',
    weight: '',
    rating: 0,
    nationality: 'Nigeria',
    games: 0,
    goals: 0,
    assists: 0,
    image: null
  });

  const [dragActive, setDragActive] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleInputChange = (field: keyof FormData, value: string | number | File) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleStarClick = (rating: number) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        handleInputChange('image', file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith('image/')) {
        handleInputChange('image', file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      if (typeof window !== 'undefined') {
        window.history.back();
      }
    }
  };

  const handleAddTask = async () => {
    if (!formData.academyClubName || !formData.playerName || !formData.position) {
      alert('Please fill in all required fields (Academy/Club Name, Player Name, Position)');
      return;
    }

    if (formData.games < 0 || formData.goals < 0 || formData.assists < 0) {
      alert('Games, Goals, and Assists cannot be negative numbers');
      return;
    }

    // --- THIS IS THE FIX ---
    // We create the object to send to the parent, but we
    // DO NOT include the image or imagePreview.
    const apiData = {
      academyClubName: formData.academyClubName,
      playerName: formData.playerName,
      position: formData.position,
      height: formData.height,
      weight: formData.weight,
      rating: formData.rating,
      nationality: formData.nationality,
      games: Math.max(0, formData.games),
      goals: Math.max(0, formData.goals),
      assists: Math.max(0, formData.assists),
      // The 'image' property is now completely removed.
    };
    // ----------------------

    console.log('Submitting data to parent:', apiData);

    if (onSave) {
      await onSave(apiData);
    } else {
      console.log('Form Data:', apiData);
      alert('Saved!');
      if (typeof window !== 'undefined') {
        window.history.back();
      }
    }
  };

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

        {/* Error Message */}
        {error && (
          <div className="mx-6 mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Form Content */}
        <div className="p-6 space-y-6">
          {/* Row 1: Academy/Club Name and Player Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Academy / Club Name: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Type here....."
                value={formData.academyClubName}
                onChange={(e) => handleInputChange('academyClubName', e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Player Name: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Type here....."
                value={formData.playerName}
                onChange={(e) => handleInputChange('playerName', e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Row 2: Position and Height */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Position: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Type here....."
                value={formData.position}
                onChange={(e) => handleInputChange('position', e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                onChange={(e) => handleInputChange('height', e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Row 3: Weight and Ratings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight:
              </label>
              <input
                type="text"
                placeholder="Type here....."
                value={formData.weight}
                onChange={(e) => handleInputChange('weight', e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                    className={`w-8 h-8 rounded transition-colors ${
                      star <= formData.rating 
                        ? 'bg-yellow-400 text-white' 
                        : 'bg-gray-200 text-gray-400 hover:bg-yellow-100'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Statistics Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Statistics
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  placeholder="Games"
                  value={formData.games || ''}
                  onChange={(e) => handleInputChange('games', Math.max(0, parseInt(e.target.value) || 0))}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
              
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  placeholder="Goals"
                  value={formData.goals || ''}
                  onChange={(e) => handleInputChange('goals', Math.max(0, parseInt(e.target.value) || 0))}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
              
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  placeholder="Assists"
                  value={formData.assists || ''}
                  onChange={(e) => handleInputChange('assists', Math.max(0, parseInt(e.target.value) || 0))}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Nationality and Upload Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nationality
              </label>
              <div className="relative">
                <select
                  value={formData.nationality}
                  onChange={(e) => handleInputChange('nationality', e.target.value)}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors appearance-none bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="Nigeria">Nigeria</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Kenya">Kenya</option>
                  <option value="South Africa">South Africa</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-6 h-4 bg-green-500 rounded-sm mr-1 inline-block"></div>
                  <div className="w-6 h-4 bg-white border rounded-sm mr-1 inline-block"></div>
                  <div className="w-6 h-4 bg-green-500 rounded-sm inline-block"></div>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Image
              </label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  dragActive 
                    ? 'border-blue-400 bg-blue-50' 
                    : 'border-gray-300 hover:border-gray-400'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {imagePreview ? (
                  <div className="relative">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-32 object-cover rounded-lg mb-2"
                    />
                    <p className="text-xs text-green-600">
                      {formData.image?.name}
                    </p>
                  </div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 mb-2">
                      Drag & drop your files here or{' '}
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
            disabled={isLoading}
            className="px-6 py-3 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Adding...
              </>
            ) : (
              'Add Task'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskForm;

