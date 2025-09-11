"use client"
import { useState, useRef } from "react";
import { VideoIcon } from "./spotIcons";

// Mock icon components - replace with your actual icons
const OutlinePhoto = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const CameraIcons = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

interface User {
  name: string;
  avatar: string;
  timeAgo: string;
}

interface Post {
  id: string;
  user: User;
  content: string;
  image: string | string[];
  likes: number;
  isLiked: boolean;
  comments: number;
  shares: number;
  likedBy: string[];
}

interface ImageItem {
  id: number;
  file: File;
  url: string;
  source: 'camera' | 'gallery';
}

interface VideoItem {
  id: number;
  file: File;
  url: string;
  name: string;
}

interface PostBoxProps {
  onCreatePost?: (post: Post) => Promise<void>;
  apiBaseUrl?: string; // Make API URL configurable
}

// Backend API service
const createSpotLightPost = async (postData: any, apiBaseUrl: string = 'https://scoutflair.top') => {
  try {
    const response = await fetch(`${apiBaseUrl}/api/spot-lights`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add authorization header if you have authentication
        // 'Authorization': `Bearer ${yourAuthToken}`,
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

// Helper function to upload files (if your backend supports file upload)
const uploadFile = async (file: File, apiBaseUrl: string = 'https://scoutflair.top') => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`${apiBaseUrl}/api/upload`, {
      method: 'POST',
      body: formData,
      // Add authorization header if needed
      // headers: {
      //   'Authorization': `Bearer ${yourAuthToken}`,
      // },
    });

    if (!response.ok) {
      throw new Error(`Upload failed! status: ${response.status}`);
    }

    const result = await response.json();
    return result.data?.url || result.url; // Adjust based on your API response structure
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export default function PostBox({ onCreatePost, apiBaseUrl = 'https://scoutflair.top' }: PostBoxProps) {
  const [text, setText] = useState<string>("");
  const [selectedImages, setSelectedImages] = useState<ImageItem[]>([]);
  const [selectedVideos, setSelectedVideos] = useState<VideoItem[]>([]);
  const [isPosting, setIsPosting] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // Handle image selection
  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>, source: 'camera' | 'gallery') => {
    const files = Array.from(event.target.files || []);
    
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          const url = e.target?.result;
          if (typeof url === 'string') {
            const newImage: ImageItem = {
              id: Date.now() + Math.random(),
              file: file,
              url,
              source
            };
            setSelectedImages(prev => [...prev, newImage]);
          }
        };
        reader.readAsDataURL(file);
      }
    });
    
    event.target.value = '';
  };

  // Handle video selection
  const handleVideoSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    files.forEach(file => {
      if (file.type.startsWith('video/')) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          const url = e.target?.result;
          if (typeof url === 'string') {
            const newVideo: VideoItem = {
              id: Date.now() + Math.random(),
              file: file,
              url,
              name: file.name
            };
            setSelectedVideos(prev => [...prev, newVideo]);
          }
        };
        reader.readAsDataURL(file);
      }
    });
    
    event.target.value = '';
  };

  // Handle post creation using proxy to avoid CSP issues
  const handlePost = async () => {
    if (!text.trim() && selectedImages.length === 0 && selectedVideos.length === 0) {
      return;
    }

    setIsPosting(true);
    console.log('📝 Starting post creation...');

    try {
      // Prepare post data for backend
      const postData = {
        content: text.trim(),
      };

      console.log('📦 Sending post data:', postData);

      // Send to backend via proxy
      const backendResponse = await createSpotLightPost(postData);
      
      console.log('🎉 Backend response:', backendResponse);

      // Create local post object for UI update (if onCreatePost is provided)
      if (onCreatePost) {
        const newPost: Post = {
          id: backendResponse.data?.obj?.id || backendResponse.data?.id || Date.now().toString(),
          user: {
            name: "You",
            avatar: "/images/profile.jpeg",
            timeAgo: "Just now"
          },
          content: text.trim(),
          image: [],
          likes: 0,
          isLiked: false,
          comments: 0,
          shares: 0,
          likedBy: []
        };

        await onCreatePost(newPost);
      }

      // Reset form on success
      setText("");
      setSelectedImages([]);
      setSelectedVideos([]);
      
      console.log('✅ Post created successfully!');
      alert('Post created successfully!');
      
    } catch (error) {
      console.error('❌ Error creating post:', error);
      alert(`Failed to create post. Error: ${error.message}`);
    } finally {
      setIsPosting(false);
    }
  };

  const canPost = (text.trim() || selectedImages.length > 0 || selectedVideos.length > 0) && !isPosting;

  return (
    <div className="bg-white shadow-md rounded-xl p-3 w-full max-w-[1250px] mx-auto">
      {/* Original single-line layout */}
      <div className="flex h-auto items-center space-x-2 sm:space-x-3">
        {/* Avatar */}
        <img 
          src="/images/profile.jpeg"
          alt="User avatar"
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0"
        />
        
        {/* Input Area */}
        <div className="flex-1 flex items-center bg-gray-100 rounded-lg px-2 sm:px-3 min-w-0">
          <input
            type="text"
            value={text}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
            placeholder="What's happening?"
            className="flex-1 bg-transparent outline-none py-2 text-sm sm:text-base text-gray-700 placeholder-gray-500 min-w-0"
          />
          
          {/* Action Icons */}
          <div className="flex items-center flex-shrink-0">
            <button 
              onClick={() => cameraInputRef.current?.click()}
              className="text-gray-500 hover:text-gray-700 p-1 sm:p-2"
              title="Take photo"
              disabled={isPosting}
            >
              <CameraIcons/>
            </button>
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="text-gray-500 hover:text-gray-700 p-1 sm:p-2"
              title="Upload photo"
              disabled={isPosting}
            >
              <OutlinePhoto/>
            </button>
            <button 
              onClick={() => videoInputRef.current?.click()}
              className="text-gray-500 hover:text-gray-700 p-1 sm:p-2"
              title="Upload video"
              disabled={isPosting}
            >
              <VideoIcon/>
            </button>
          </div>
        </div>
        
        {/* Post Button */}
        <button 
          onClick={handlePost}
          disabled={!canPost}
          className={`px-3 sm:px-4 py-2 rounded-md transition flex-shrink-0 text-sm sm:text-base font-medium ${
            canPost 
              ? 'bg-[rgba(10,40,80,1)] text-white hover:bg-blue-800' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isPosting ? 'Posting...' : 'Post'}
        </button>
      </div>

      {/* Media previews (only shown when images/videos are selected) */}
      {(selectedImages.length > 0 || selectedVideos.length > 0) && (
        <div className="mt-3 ml-10 sm:ml-12">
          <div className="flex flex-wrap gap-2">
            {/* Image previews */}
            {selectedImages.map((image) => (
              <div key={image.id} className="relative">
                <img
                  src={image.url}
                  alt="Selected"
                  className="w-16 h-16 object-cover rounded-lg border"
                />
                <button
                  onClick={() => setSelectedImages(prev => prev.filter(img => img.id !== image.id))}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                  disabled={isPosting}
                >
                  ×
                </button>
              </div>
            ))}
            
            {/* Video previews */}
            {selectedVideos.map((video) => (
              <div key={video.id} className="relative">
                <video
                  src={video.url}
                  className="w-16 h-16 object-cover rounded-lg border"
                  muted
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-lg">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <button
                  onClick={() => setSelectedVideos(prev => prev.filter(vid => vid.id !== video.id))}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                  disabled={isPosting}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => handleImageSelect(e, 'gallery')}
        className="hidden"
        disabled={isPosting}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={(e) => handleImageSelect(e, 'camera')}
        className="hidden"
        disabled={isPosting}
      />
      <input
        ref={videoInputRef}
        type="file"
        accept="video/*"
        multiple
        onChange={handleVideoSelect}
        className="hidden"
        disabled={isPosting}
      />
    </div>
  );
}