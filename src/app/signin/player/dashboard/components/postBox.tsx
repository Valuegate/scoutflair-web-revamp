"use client";
import React, { useState, useRef, createRef, useEffect, RefObject } from "react";
import { Cropper } from "react-cropper";

import type { ReactCropperElement } from "react-cropper";

// Helper: convert Data URL to File
const dataURLtoFile = (dataurl: string, filename: string): File | null => {
  if (!dataurl) return null;
  const arr = dataurl.split(",");
  const mimeMatch = arr[0].match(/:(.*?);/);
  if (!mimeMatch) return null;
  const mime = mimeMatch[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

// --- SVG Icons ---
const VideoIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);
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

// --- Interfaces ---
interface User { name: string; avatar: string; timeAgo: string; }
interface Post { id: string; user: User; content: string; image: string | string[]; likes: number; isLiked: boolean; comments: number; shares: number; likedBy: string[]; }
interface ImageItem { id: number; file: File; url: string; source: "camera" | "gallery"; }
interface VideoItem { id: number; file: File; url: string; name: string; }
interface PostBoxProps { onCreatePost?: (post: Post) => Promise<void>; }
interface ImageEditorModalProps {
  image: ImageItem;
  onSave: (id: number, newUrl: string, newFile: File) => void;
  onClose: () => void;
}

interface TextOverlay {
  id: number;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  color: string;
  fontFamily: string;
}

interface EmojiOverlay {
  id: number;
  emoji: string;
  x: number;
  y: number;
  size: number;
}

// --- Image Editor Modal ---
const ImageEditorModal: React.FC<ImageEditorModalProps> = ({ image, onSave, onClose }) => {
  const cropperRef: RefObject<ReactCropperElement> = createRef<ReactCropperElement>();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [currentFilter, setCurrentFilter] = useState<string>("");
  const [rotation, setRotation] = useState<number>(0);
  const [brightness, setBrightness] = useState<number>(100);
  const [contrast, setContrast] = useState<number>(100);
  const [saturation, setSaturation] = useState<number>(100);
  const [blur, setBlur] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'crop' | 'filter' | 'adjust' | 'text' | 'emoji'>('crop');
  const [textOverlays, setTextOverlays] = useState<TextOverlay[]>([]);
  const [emojiOverlays, setEmojiOverlays] = useState<EmojiOverlay[]>([]);
  const [newText, setNewText] = useState<string>("");
  const [textColor, setTextColor] = useState<string>("#ffffff");
  const [fontSize, setFontSize] = useState<number>(32);
  const [fontFamily, setFontFamily] = useState<string>("Arial");
  const [selectedTextId, setSelectedTextId] = useState<number | null>(null);
  const [selectedEmojiId, setSelectedEmojiId] = useState<number | null>(null);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.css';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const filters = [
    { name: 'None', value: '' },
    { name: 'Grayscale', value: 'grayscale(100%)' },
    { name: 'Sepia', value: 'sepia(100%)' },
    { name: 'Invert', value: 'invert(100%)' },
    { name: 'Vintage', value: 'sepia(50%) contrast(120%)' },
    { name: 'Cool', value: 'hue-rotate(180deg) saturate(150%)' },
  ];

  const emojis = ['😀', '😂', '❤️', '🔥', '👍', '🎉', '😍', '🤔', '👏', '💯', '✨', '🌟', '💪', '🙌', '🎊', '🌈'];

  const handleRotate = (degrees: number) => {
    const newRotation = (rotation + degrees) % 360;
    setRotation(newRotation);
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      cropper.rotateTo(newRotation);
    }
  };

  const addTextOverlay = () => {
    if (newText.trim()) {
      const newOverlay: TextOverlay = {
        id: Date.now(),
        text: newText,
        x: 50,
        y: 50,
        fontSize,
        color: textColor,
        fontFamily,
      };
      setTextOverlays([...textOverlays, newOverlay]);
      setNewText("");
    }
  };

  const addEmojiOverlay = (emoji: string) => {
    const newEmoji: EmojiOverlay = {
      id: Date.now(),
      emoji,
      x: 50,
      y: 50,
      size: 48,
    };
    setEmojiOverlays([...emojiOverlays, newEmoji]);
  };

  const removeTextOverlay = (id: number) => {
    setTextOverlays(textOverlays.filter(t => t.id !== id));
    if (selectedTextId === id) setSelectedTextId(null);
  };

  const removeEmojiOverlay = (id: number) => {
    setEmojiOverlays(emojiOverlays.filter(e => e.id !== id));
    if (selectedEmojiId === id) setSelectedEmojiId(null);
  };

  const getCombinedFilter = () => {
    const filters = [];
    if (currentFilter) filters.push(currentFilter);
    if (brightness !== 100) filters.push(`brightness(${brightness}%)`);
    if (contrast !== 100) filters.push(`contrast(${contrast}%)`);
    if (saturation !== 100) filters.push(`saturate(${saturation}%)`);
    if (blur > 0) filters.push(`blur(${blur}px)`);
    return filters.join(' ');
  };

  const handleSave = () => {
    const cropper = cropperRef.current?.cropper;
    if (typeof cropper !== 'undefined' && cropper) {
      const croppedCanvas = cropper.getCroppedCanvas();
      if (!croppedCanvas) return;

      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = croppedCanvas.width;
      tempCanvas.height = croppedCanvas.height;
      const tempCtx = tempCanvas.getContext('2d');

      if (tempCtx) {
        const combinedFilter = getCombinedFilter();
        tempCtx.filter = combinedFilter;
        tempCtx.drawImage(croppedCanvas, 0, 0);
        tempCtx.filter = 'none';

        textOverlays.forEach(overlay => {
          tempCtx.font = `${overlay.fontSize}px ${overlay.fontFamily}`;
          tempCtx.fillStyle = overlay.color;
          tempCtx.strokeStyle = '#000000';
          tempCtx.lineWidth = 2;
          tempCtx.strokeText(overlay.text, overlay.x, overlay.y);
          tempCtx.fillText(overlay.text, overlay.x, overlay.y);
        });

        emojiOverlays.forEach(overlay => {
          tempCtx.font = `${overlay.size}px Arial`;
          tempCtx.fillText(overlay.emoji, overlay.x, overlay.y);
        });
      }

      const newUrl = tempCanvas.toDataURL(image.file.type);
      const newFile = dataURLtoFile(newUrl, image.file.name);
      if (newFile) {
        onSave(image.id, newUrl, newFile);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Edit Image</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        </div>

        <div className="p-6">
          <div className="mb-4 flex flex-wrap gap-2 border-b pb-3">
            {(['crop', 'filter', 'adjust', 'text', 'emoji'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-md font-medium transition ${
                  activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="mb-4 relative">
            <Cropper
              ref={cropperRef}
              src={image.url}
              style={{ height: 400, width: '100%', filter: getCombinedFilter() }}
              initialAspectRatio={1}
              viewMode={1}
              guides={true}
              background={false}
              checkOrientation={false}
              rotatable={true}
            />
            {textOverlays.map(overlay => (
              <div
                key={overlay.id}
                style={{
                  position: 'absolute',
                  left: `${overlay.x}px`,
                  top: `${overlay.y}px`,
                  fontSize: `${overlay.fontSize}px`,
                  color: overlay.color,
                  fontFamily: overlay.fontFamily,
                  cursor: 'move',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                  userSelect: 'none',
                }}
                draggable
                onDragEnd={(e) => {
                  const rect = e.currentTarget.parentElement?.getBoundingClientRect();
                  if (rect) {
                    setTextOverlays(textOverlays.map(t =>
                      t.id === overlay.id ? { ...t, x: e.clientX - rect.left, y: e.clientY - rect.top } : t
                    ));
                  }
                }}
              >
                {overlay.text}
                <button
                  onClick={() => removeTextOverlay(overlay.id)}
                  className="ml-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs"
                >
                  ×
                </button>
              </div>
            ))}
            {emojiOverlays.map(overlay => (
              <div
                key={overlay.id}
                style={{
                  position: 'absolute',
                  left: `${overlay.x}px`,
                  top: `${overlay.y}px`,
                  fontSize: `${overlay.size}px`,
                  cursor: 'move',
                  userSelect: 'none',
                }}
                draggable
                onDragEnd={(e) => {
                  const rect = e.currentTarget.parentElement?.getBoundingClientRect();
                  if (rect) {
                    setEmojiOverlays(emojiOverlays.map(em =>
                      em.id === overlay.id ? { ...em, x: e.clientX - rect.left, y: e.clientY - rect.top } : em
                    ));
                  }
                }}
              >
                {overlay.emoji}
                <button
                  onClick={() => removeEmojiOverlay(overlay.id)}
                  className="ml-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {activeTab === 'crop' && (
            <div>
              <h3 className="text-md font-semibold mb-3 text-gray-700">Crop & Rotate</h3>
              <div className="flex gap-2 mb-3">
                <button onClick={() => handleRotate(-90)} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">↶ 90°</button>
                <button onClick={() => handleRotate(90)} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">↷ 90°</button>
                <button onClick={() => handleRotate(180)} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">180°</button>
              </div>
            </div>
          )}

          {activeTab === 'filter' && (
            <div>
              <h3 className="text-md font-semibold mb-3 text-gray-700">Filters</h3>
              <div className="flex flex-wrap gap-2">
                {filters.map(filter => (
                  <button
                    key={filter.name}
                    onClick={() => setCurrentFilter(filter.value)}
                    className={`px-3 py-2 rounded-md transition ${
                      currentFilter === filter.value ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {filter.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'adjust' && (
            <div>
              <h3 className="text-md font-semibold mb-3 text-gray-700">Adjustments</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Brightness: {brightness}%</label>
                  <input type="range" min="0" max="200" value={brightness} onChange={(e) => setBrightness(Number(e.target.value))} className="w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Contrast: {contrast}%</label>
                  <input type="range" min="0" max="200" value={contrast} onChange={(e) => setContrast(Number(e.target.value))} className="w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Saturation: {saturation}%</label>
                  <input type="range" min="0" max="200" value={saturation} onChange={(e) => setSaturation(Number(e.target.value))} className="w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Blur: {blur}px</label>
                  <input type="range" min="0" max="10" value={blur} onChange={(e) => setBlur(Number(e.target.value))} className="w-full" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'text' && (
            <div>
              <h3 className="text-md font-semibold mb-3 text-gray-700">Add Text</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  placeholder="Enter text..."
                  className="w-full px-3 py-2 border rounded-md"
                  onKeyPress={(e) => e.key === 'Enter' && addTextOverlay()}
                />
                <div className="flex gap-3 items-center">
                  <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="w-12 h-10" />
                  <select value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} className="px-3 py-2 border rounded-md">
                    <option value={16}>Small</option>
                    <option value={32}>Medium</option>
                    <option value={48}>Large</option>
                    <option value={64}>X-Large</option>
                  </select>
                  <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)} className="px-3 py-2 border rounded-md">
                    <option value="Arial">Arial</option>
                    <option value="Impact">Impact</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Courier New">Courier</option>
                  </select>
                  <button onClick={addTextOverlay} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Add Text</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'emoji' && (
            <div>
              <h3 className="text-md font-semibold mb-3 text-gray-700">Add Emoji</h3>
              <div className="flex flex-wrap gap-2">
                {emojis.map((emoji, idx) => (
                  <button
                    key={idx}
                    onClick={() => addEmojiOverlay(emoji)}
                    className="text-3xl hover:bg-gray-100 p-2 rounded-md transition"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
            <button onClick={onClose} className="px-6 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 font-semibold">Cancel</button>
            <button onClick={handleSave} className="px-6 py-2 rounded-md bg-[rgba(10,40,80,1)] text-white hover:bg-blue-800 font-semibold">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main PostBox Component ---
export default function PostBox({ onCreatePost }: PostBoxProps) {
  const [text, setText] = useState<string>("");
  const [selectedImages, setSelectedImages] = useState<ImageItem[]>([]);
  const [selectedVideos, setSelectedVideos] = useState<VideoItem[]>([]);
  const [isPosting, setIsPosting] = useState<boolean>(false);
  const [editingImage, setEditingImage] = useState<ImageItem | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const videoInputRef = useRef<HTMLInputElement | null>(null);


  const uploadFileToR2 = async (file: File): Promise<{ url: string; fileKey: string }> => {
    console.log(`Uploading ${file.name}...`);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const url = URL.createObjectURL(file);
    const fileKey = `uploads/${Date.now()}-${file.name}`;
    console.log(`Upload complete: ${url}`);
    return { url, fileKey };
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>, source: "camera" | "gallery") => {
    const files = Array.from(event.target.files || []);
    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          const url = e.target?.result;
          if (typeof url === "string") {
            const newImage: ImageItem = {
              id: Date.now() + Math.random(),
              file,
              url,
              source,
            };
            setSelectedImages((prev) => [...prev, newImage]);
          }
        };
        reader.readAsDataURL(file);
      }
    });
    // Reset input so same file can be re-selected
    event.currentTarget.value = "";
  };

  const handleVideoSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    files.forEach((file) => {
      if (file.type.startsWith("video/")) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          const url = e.target?.result;
          if (typeof url === "string") {
            const newVideo: VideoItem = {
              id: Date.now() + Math.random(),
              file,
              url,
              name: file.name,
            };
            setSelectedVideos((prev) => [...prev, newVideo]);
          }
        };
        reader.readAsDataURL(file);
      }
    });
    event.currentTarget.value = "";
  };

  const handlePost = async () => {
    if (!text.trim() && selectedImages.length === 0 && selectedVideos.length === 0) return;

    setIsPosting(true);
    try {
      const fileKeys: string[] = [];
      const mediaUrls: string[] = [];

      for (const image of selectedImages) {
        const { url, fileKey } = await uploadFileToR2(image.file);
        fileKeys.push(fileKey);
        mediaUrls.push(url);
      }

      for (const video of selectedVideos) {
        const { url, fileKey } = await uploadFileToR2(video.file);
        fileKeys.push(fileKey);
        mediaUrls.push(url);
      }

      const token = localStorage.getItem("authToken");
      const demoToken = token || "fake-jwt-for-demo";

      console.log("Creating post with data:", {
        text: text.trim(),
        mediaFileKeys: fileKeys,
      });

      // Simulate API call
      await new Promise(res => setTimeout(res, 1000));
      const mockResponse = {
        ok: true,
        json: async () => ({ data: { obj: { id: `post_${Date.now()}` } } }),
      };

      if (!mockResponse.ok) throw new Error("Failed to create post");

      const response = await mockResponse.json();
      const savedPost: Post = {
        id: response.data?.obj?.id ?? Date.now().toString(),
        user: { name: "You", avatar: "/images/profile.jpeg", timeAgo: "Just now" },
        content: text.trim(),
        image: mediaUrls.length === 1 ? mediaUrls[0] : mediaUrls,
        likes: 0,
        isLiked: false,
        comments: 0,
        shares: 0,
        likedBy: [],
      };

      if (onCreatePost) await onCreatePost(savedPost);

      setText("");
      setSelectedImages([]);
      setSelectedVideos([]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsPosting(false);
    }
  };

  const handleSaveEdit = (id: number, newUrl: string, newFile: File) => {
    setSelectedImages(prevImages => prevImages.map(img => img.id === id ? { ...img, url: newUrl, file: newFile } : img));
    setEditingImage(null);
  };

  const canPost = (text.trim() || selectedImages.length > 0 || selectedVideos.length > 0) && !isPosting;

  return (
    <>
      {editingImage && (
        <ImageEditorModal image={editingImage} onSave={handleSaveEdit} onClose={() => setEditingImage(null)} />
      )}

      <div className="bg-white shadow-md rounded-xl p-3 w-full max-w-[1250px] mx-auto">
        <div className="flex h-auto items-center space-x-2 sm:space-x-3">
          <img
            src="/images/profile.jpeg"
            alt="User avatar"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0"
          />
          <div className="flex-1 flex items-center bg-gray-100 rounded-lg px-2 sm:px-3 min-w-0">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What's happening?"
              className="flex-1 bg-transparent outline-none py-2 text-sm sm:text-base text-gray-700 placeholder-gray-500 min-w-0"
            />
            <div className="flex items-center flex-shrink-0">
              <button onClick={() => cameraInputRef.current?.click()} className="text-gray-500 hover:text-gray-700 p-1 sm:p-2" title="Take photo" disabled={isPosting}>
                <CameraIcons />
              </button>
              <button onClick={() => fileInputRef.current?.click()} className="text-gray-500 hover:text-gray-700 p-1 sm:p-2" title="Upload photo" disabled={isPosting}>
                <OutlinePhoto />
              </button>
              <button onClick={() => videoInputRef.current?.click()} className="text-gray-500 hover:text-gray-700 p-1 sm:p-2" title="Upload video" disabled={isPosting}>
                <VideoIcon />
              </button>
            </div>
          </div>
          <button
            onClick={handlePost}
            disabled={!canPost}
            className={`px-3 sm:px-4 py-2 rounded-md transition flex-shrink-0 text-sm sm:text-base font-medium ${
              canPost
                ? "bg-[rgba(10,40,80,1)] text-white hover:bg-blue-800"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isPosting ? "Posting..." : "Post"}
          </button>
        </div>

        {(selectedImages.length > 0 || selectedVideos.length > 0) && (
          <div className="mt-3 ml-10 sm:ml-12">
            <div className="flex flex-wrap gap-4">
              {selectedImages.map((image) => (
                <div key={image.id} className="relative group">
                  <img src={image.url} alt="Selected" className="w-20 h-20 object-cover rounded-lg border-2 border-gray-200" />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 rounded-lg flex items-center justify-center">
                    <button
                      onClick={() => setEditingImage(image)}
                      className="text-white opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50 rounded-md px-2 py-1 text-xs"
                      disabled={isPosting}
                    >
                      Edit
                    </button>
                  </div>
                  <button
                    onClick={() => setSelectedImages((prev) => prev.filter((img) => img.id !== image.id))}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold hover:bg-red-600"
                    disabled={isPosting}
                  >
                    ×
                  </button>
                </div>
              ))}

              {selectedVideos.map((video) => (
                <div key={video.id} className="relative">
                  <video src={video.url} className="w-20 h-20 object-cover rounded-lg border-2 border-gray-200" muted />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-lg pointer-events-none">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <button
                    onClick={() => setSelectedVideos((prev) => prev.filter((vid) => vid.id !== video.id))}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                    disabled={isPosting}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={(e) => handleImageSelect(e, "gallery")} className="hidden" disabled={isPosting} />
        <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" onChange={(e) => handleImageSelect(e, "camera")} className="hidden" disabled={isPosting} />
        <input ref={videoInputRef} type="file" accept="video/*" multiple onChange={handleVideoSelect} className="hidden" disabled={isPosting} />
      </div>
    </>
  );
}
