"use client"

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  Bell, 
  Search, 
  Menu, 
  X, 
  User, 
  Home,
  Image as ImageIcon,
  Settings,
  LogOut,
  ChevronDown,
  Heart,
  MessageCircle,
  Share,
  MoreHorizontal,
  Filter,
  Calendar,
  Play,
  Eye,
  Upload,
  Edit3,
  Camera
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Mock data for posts
const mockPosts = [
  {
    id: 1,
    author: 'Peters Samuel',
    timeAgo: '2 hours ago',
    content: 'Great training session today! Working on my passing accuracy and ball control. The team chemistry is getting better every day. Ready for the upcoming match this weekend! 💪⚽',
    image: '/api/placeholder/600/400',
    likes: 45,
    comments: 12,
    shares: 8,
    isVideo: false,
    isLiked: false
  },
  {
    id: 2,
    author: 'Swift Exchange',
    timeAgo: '5 hours ago',
    content: 'Check out these amazing highlights from yesterday\'s match! Our midfielder Peter Abbas showing some incredible skills on the field. What a performance! 🔥',
    image: '/api/placeholder/600/400',
    likes: 128,
    comments: 23,
    shares: 15,
    isVideo: true,
    isLiked: true
  },
  {
    id: 3,
    author: 'Coach Martinez',
    timeAgo: '1 day ago',
    content: 'Proud of the team\'s dedication during today\'s tactical training. Special mention to our midfield for maintaining excellent possession stats. Keep up the great work!',
    image: '/api/placeholder/600/400',
    likes: 67,
    comments: 8,
    shares: 4,
    isVideo: false,
    isLiked: false
  }
];

// Mock gallery images with more realistic data
const galleryImages = [
  { 
    id: 1, 
    date: 'THURSDAY, AUGUST 29 2024', 
    images: Array(6).fill(null).map((_, i) => `/api/placeholder/200/200?random=${i + 1}`),
    type: 'Training Session'
  },
  { 
    id: 2, 
    date: 'TUESDAY, AUGUST 27 2024', 
    images: Array(9).fill(null).map((_, i) => `/api/placeholder/200/200?random=${i + 10}`),
    type: 'Match Day'
  },
  { 
    id: 3, 
    date: 'WEDNESDAY, AUGUST 28 2024', 
    images: Array(4).fill(null).map((_, i) => `/api/placeholder/200/200?random=${i + 20}`),
    type: 'Team Building'
  }
];

// Enhanced news feed
const newsFeed = [
  { 
    id: 1, 
    title: 'Local News', 
    content: 'Valuegate Football Academy Unveils New 300-Seater Local Stadium, Located In Abuja, Nigeria',
    timeAgo: '2 hours ago',
    category: 'Academy News'
  },
  { 
    id: 2, 
    title: 'Sport News', 
    content: 'Young Nigerian Talents Shine in Regional Championships - Peter Abbas Among Top Performers',
    timeAgo: '4 hours ago',
    category: 'Sports'
  },
  { 
    id: 3, 
    title: 'Goal News', 
    content: 'Transfer Window Update: Several Academies Show Interest in Rising Midfield Stars',
    timeAgo: '1 day ago',
    category: 'Transfer News'
  }
];

// Enhanced PostCard with better interactions
const PostCard = ({ post, onLike, onComment, onShare }) => {
  const [showFullContent, setShowFullContent] = useState(false);
  const [localLikes, setLocalLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(post.isLiked);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLocalLikes(prev => isLiked ? prev - 1 : prev + 1);
    onLike?.(post.id);
  };

  const contentPreview = post.content.length > 150 
    ? `${post.content.substring(0, 150)}...` 
    : post.content;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-4 lg:mb-6 hover:shadow-md transition-shadow duration-200">
      {/* Post Header */}
      <div className="p-3 sm:p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center overflow-hidden">
            <Image
              src="/api/placeholder/48/48"
              alt={post.author}
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{post.author}</h4>
            <p className="text-xs sm:text-sm text-gray-500">{post.timeAgo}</p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <MoreHorizontal className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Post Content */}
      <div className="px-3 sm:px-4 pb-3">
        <p className="text-gray-800 text-sm sm:text-base leading-relaxed">
          {showFullContent ? post.content : contentPreview}
          {post.content.length > 150 && (
            <button 
              onClick={() => setShowFullContent(!showFullContent)}
              className="text-blue-600 hover:text-blue-700 ml-2 font-medium"
            >
              {showFullContent ? 'Show less' : 'Read more'}
            </button>
          )}
        </p>
      </div>

      {/* Post Image/Video */}
      <div className="relative group">
        <Image
          src={post.image}
          alt="Post content"
          width={600}
          height={400}
          className="w-full h-48 sm:h-64 md:h-80 object-cover"
        />
        {post.isVideo && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
            <button className="w-12 h-12 sm:w-16 sm:h-16 bg-white/90 rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-200">
              <Play className="w-6 h-6 sm:w-8 sm:h-8 text-gray-800 ml-1" fill="currentColor" />
            </button>
          </div>
        )}
      </div>

      {/* Post Stats */}
      <div className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-500">
        <div className="flex items-center justify-between">
          <span>{localLikes} likes • {post.comments} comments</span>
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span>{localLikes + 20} views</span>
          </div>
        </div>
      </div>

      {/* Post Actions */}
      <div className="p-3 sm:p-4 border-t border-gray-100">
        <div className="flex items-center justify-around sm:justify-start sm:gap-8">
          <button 
            onClick={handleLike}
            className={cn(
              "flex items-center gap-2 px-2 py-1 rounded-lg transition-colors",
              isLiked 
                ? "text-red-500 bg-red-50 hover:bg-red-100" 
                : "text-gray-600 hover:text-red-500 hover:bg-gray-50"
            )}
          >
            <Heart className={cn("w-5 h-5", isLiked && "fill-current")} />
            <span className="text-sm font-medium">Like</span>
          </button>
          <button 
            onClick={() => onComment?.(post.id)}
            className="flex items-center gap-2 px-2 py-1 rounded-lg text-gray-600 hover:text-blue-500 hover:bg-gray-50 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Comment</span>
          </button>
          <button 
            onClick={() => onShare?.(post.id)}
            className="flex items-center gap-2 px-2 py-1 rounded-lg text-gray-600 hover:text-green-500 hover:bg-gray-50 transition-colors"
          >
            <Share className="w-5 h-5" />
            <span className="text-sm font-medium">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Enhanced ProfileSection with edit capabilities
const ProfileSection = ({ isEditing = false, onEdit }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
    {/* Cover Photo */}
    <div className="relative h-32 sm:h-40 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 overflow-hidden">
      <Image
        src="/api/placeholder/600/200"
        alt="Stadium cover"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/20"></div>
      <button className="absolute top-3 right-3 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
        <Camera className="w-4 h-4 text-white" />
      </button>
    </div>

    {/* Profile Info */}
    <div className="p-4 sm:p-6">
      <div className="flex flex-col items-center text-center relative">
        {/* Profile Picture */}
        <div className="relative -mt-12 sm:-mt-16 mb-4">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full p-1 shadow-lg overflow-hidden">
            <Image
              src="/api/placeholder/96/96"
              alt="Peter Abbas"
              width={96}
              height={96}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <button className="absolute bottom-0 right-0 p-1.5 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors">
            <Camera className="w-3 h-3" />
          </button>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900">Denis Ojua</h3>
          <button 
            onClick={onEdit}
            className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
          >
            <Edit3 className="w-4 h-4" />
          </button>
        </div>
        
        <p className="text-sm text-gray-600 mb-1">Midfielder • No: 9</p>
        <p className="text-xs text-gray-500 mb-4">23 Years • Nigeria 🇳🇬</p>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 w-full mb-6 p-3 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">47</div>
            <div className="text-xs text-gray-600">Matches</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">12</div>
            <div className="text-xs text-gray-600">Goals</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">8</div>
            <div className="text-xs text-gray-600">Assists</div>
          </div>
        </div>

        {/* Player Details - Collapsible on mobile */}
        <details className="w-full group">
          <summary className="cursor-pointer font-medium text-gray-900 mb-3 list-none flex items-center justify-between">
            <span>Player Details</span>
            <ChevronDown className="w-4 h-4 transform group-open:rotate-180 transition-transform" />
          </summary>
          <div className="space-y-3 text-sm">
            {[
              { label: 'Position', value: 'Central Midfielder' },
              { label: 'Height', value: '6ft 3 inches' },
              { label: 'Weight', value: '70kg' },
              { label: 'Foot', value: 'Left' },
              { label: 'Born', value: 'Dec 17, 2001' },
              { label: 'From', value: 'Abokuta, Nigeria' },
              { label: 'Status', value: 'Independent' },
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center py-1">
                <span className="text-gray-600">{item.label}</span>
                <span className="text-gray-900 font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </details>

        {/* Social Media Links */}
        <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100 w-full justify-center">
          {['facebook', 'instagram', 'twitter', 'youtube'].map((platform, index) => (
            <button 
              key={platform}
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold hover:scale-110 transition-transform",
                index === 0 && "bg-blue-600",
                index === 1 && "bg-pink-500", 
                index === 2 && "bg-blue-400",
                index === 3 && "bg-red-500"
              )}
            >
              {platform.charAt(0).toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Enhanced GallerySection with better organization
const GallerySection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const categories = ['all', 'training', 'match', 'team'];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">Gallery</h3>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Search className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Upload className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
        
        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                selectedCategory === category
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Content */}
      <div className="p-4 max-h-96 md:max-h-[500px] overflow-y-auto">
        {galleryImages.map((dateGroup) => (
          <div key={dateGroup.id} className="mb-6 last:mb-0">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                {dateGroup.date}
              </h4>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                {dateGroup.type}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {dateGroup.images.map((image, index) => (
                <div 
                  key={index} 
                  className="aspect-square bg-gray-200 rounded-lg overflow-hidden group cursor-pointer"
                >
                  <Image
                    src={image}
                    alt={`${dateGroup.type} ${index + 1}`}
                    width={120}
                    height={120}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Enhanced NewsFeedSection
const NewsFeedSection = () => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
    {/* Header */}
    <div className="p-4 border-b border-gray-100 flex items-center justify-between">
      <h3 className="text-lg font-semibold text-gray-900">News Feed</h3>
      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
        View All
      </Button>
    </div>

    {/* News Items */}
    <div className="divide-y divide-gray-100">
      {newsFeed.map((news) => (
        <div key={news.id} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
          <div className="flex gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex-shrink-0 overflow-hidden">
              <Image
                src="/api/placeholder/48/48"
                alt="News thumbnail"
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                  {news.category}
                </span>
                <span className="text-xs text-gray-500">{news.timeAgo}</span>
              </div>
              <h4 className="font-medium text-gray-900 text-sm mb-1 line-clamp-1">{news.title}</h4>
              <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">{news.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Premium Ad */}
    <div className="p-4 border-t border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mx-auto mb-3 flex items-center justify-center">
          <span className="text-white font-bold text-lg">SF</span>
        </div>
        <h4 className="font-semibold text-gray-900 mb-1">Go Premium</h4>
        <p className="text-xs text-gray-600 mb-3">Unlock advanced features and analytics</p>
        <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          Upgrade Now
        </Button>
      </div>
    </div>
  </div>
);

// Main Dashboard Component
export default function PlayerDashboard() {
  const router = useRouter();
  const [userSession, setUserSession] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [isProfileEditing, setIsProfileEditing] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [loading, setLoading] = useState(true);

  // Memoized handlers
  const handlePostLike = useCallback((postId) => {
    console.log('Liked post:', postId);
  }, []);

  const handlePostComment = useCallback((postId) => {
    console.log('Comment on post:', postId);
  }, []);

  const handlePostShare = useCallback((postId) => {
    console.log('Shared post:', postId);
  }, []);

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    setSidebarOpen(false); // Close sidebar on mobile when tab changes
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuOpen && !event.target.closest('[data-profile-menu]')) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [profileMenuOpen]);

  // Session management
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined') {
        const session = JSON.parse(localStorage.getItem('userSession') || 'null');
        if (!session || !session.isLoggedIn || session.role !== 'For Players') {
          router.push('/signin');
          return;
        }
        setUserSession(session);
      }
      setLoading(false);
    }, 1000); // Simulate loading time

    return () => clearTimeout(timer);
  }, [router]);

  const handleLogout = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userSession');
      localStorage.removeItem('selectedSignInRole');
    }
    router.push('/signin');
  }, [router]);

  // Show loading spinner
  if (loading || !userSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#192B4D] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading ScoutFlair...</p>
        </div>
      </div>
    );
  }

  const sidebarItems = [
    { id: 'home', icon: Home, label: 'Spotlight', badge: null },
    { id: 'profile', icon: User, label: 'Profile', badge: null },
    { id: 'gallery', icon: ImageIcon, label: 'Gallery', badge: '24' },
    { id: 'settings', icon: Settings, label: 'Settings', badge: null }
  ];
return (
  <div className="flex min-h-screen bg-gray-50 relative">
    {/* Mobile Sidebar Overlay */}
    {sidebarOpen && (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={() => setSidebarOpen(false)}
      />
    )}

    {/* Sidebar */}
    <div className={cn(
      "fixed inset-y-0 left-0 z-50 w-64 bg-[#192B4D] transform transition-transform duration-300 ease-in-out",
      sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
    )}>
      <div className="flex flex-col h-full">
        {/* Logo Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <h1 className="text-xl font-bold text-white">ScoutFlair</h1>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:bg-white/10 p-1 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {sidebarItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={cn(
                "flex items-center justify-between w-full px-4 py-3 rounded-lg transition-all duration-200",
                activeTab === item.id 
                  ? "bg-white/20 text-white shadow-lg transform scale-[1.02]" 
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </div>
              {item.badge && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-white/20">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-white/80 hover:bg-red-500/20 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Log Out</span>
          </button>
        </div>
      </div>
    </div>

    {/* Main Content Wrapper */}
    <div className="flex-1 flex flex-col lg:pl-64">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-30">
        <div className="flex items-center justify-between h-16 px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div>
              <h2 className="text-lg font-bold text-gray-900 capitalize">
                {activeTab === 'home' ? 'Player Dashboard' : activeTab}
              </h2>
              <p className="text-xs text-gray-500 hidden sm:block">
                Welcome back, Denis Ojua
              </p>
            </div>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search players, news, posts..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Mobile Search */}
            <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Search className="w-5 h-5" />
            </button>

            <button className="p-2 hover:bg-gray-100 rounded-lg relative transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-white-500 rounded-full animate-pulse"></span>
            </button>
            
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <MessageCircle className="w-5 h-5" />
            </button>

            {/* Profile Dropdown */}
            <div className="relative" data-profile-menu>
              <button 
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center gap-2 sm:gap-3 p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center overflow-hidden">
                  <Image
                    src="/api/placeholder/32/32"
                    alt="Peter Abbas"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-semibold text-gray-900">Denis Ojua</p>
                  <p className="text-xs text-gray-500">Player</p>
                </div>
                <ChevronDown className={cn(
                  "w-4 h-4 transition-transform",
                  profileMenuOpen && "rotate-180"
                )} />
              </button>
              
              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="font-semibold text-gray-900">Denis Ojua</p>
                    <p className="text-sm text-gray-500">denis@scoutflair.com</p>
                  </div>
                  <div className="py-1">
                    <button 
                      onClick={() => handleTabChange('profile')}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 w-full text-left transition-colors"
                    >
                      <User className="w-4 h-4" />
                      View Profile
                    </button>
                    <button 
                      onClick={() => handleTabChange('settings')}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 w-full text-left transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </button>
                    <hr className="my-1" />
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-red-50 w-full text-left text-red-600 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6">
        {/* Home/Spotlight Tab */}
        {activeTab === 'home' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 max-w-7xl mx-auto">
            {/* Left Column - Profile (Hidden on mobile, shown as sidebar item) */}
            <div className="hidden lg:block lg:col-span-1">
              <ProfileSection 
                isEditing={isProfileEditing}
                onEdit={() => setIsProfileEditing(!isProfileEditing)}
              />
            </div>

            {/* Center Column - Posts */}
            <div className="lg:col-span-2 xl:col-span-2">
              {/* Post Creation */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 mb-4 lg:mb-6">
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center overflow-hidden">
                    <Image
                      src="/api/placeholder/40/40"
                      alt="Your avatar"
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      placeholder="What's happening? Share your training updates, match highlights..."
                      className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      rows={3}
                    />
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2 sm:gap-4">
                        <button className="flex items-center gap-1 sm:gap-2 px-3 py-1.5 text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                          <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                          <span className="text-xs sm:text-sm font-medium">Photo</span>
                        </button>
                        <button className="flex items-center gap-1 sm:gap-2 px-3 py-1.5 text-gray-600 hover:text-green-500 hover:bg-green-50 rounded-lg transition-colors">
                          <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                          <span className="text-xs sm:text-sm font-medium">Video</span>
                        </button>
                      </div>
                      <Button 
                        size="sm" 
                        disabled={!postContent.trim()}
                        className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Post
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Posts Feed */}
                <div className="space-y-4 lg:space-y-6">
                  {mockPosts.map((post) => (
                    <PostCard 
                      key={post.id} 
                      post={post}
                      onLike={handlePostLike}
                      onComment={handlePostComment}
                      onShare={handlePostShare}
                    />
                  ))}
                </div>

                {/* Load More Button */}
                <div className="text-center mt-6">
                  <Button variant="outline" className="hover:bg-gray-50">
                    Load More Posts
                  </Button>
                </div>
              </div>

              {/* Right Column - Gallery & News Feed */}
              <div className="space-y-4 lg:space-y-6 lg:col-span-1">
                <GallerySection />
                <NewsFeedSection />
              </div>
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <ProfileSection 
                  isEditing={isProfileEditing}
                  onEdit={() => setIsProfileEditing(!isProfileEditing)}
                />
              </div>
              <div className="lg:col-span-2">
                {/* Profile Stats */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Statistics</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { label: 'Matches Played', value: '47', color: 'blue' },
                      { label: 'Goals Scored', value: '12', color: 'green' },
                      { label: 'Assists', value: '8', color: 'purple' },
                      { label: 'Pass Accuracy', value: '87%', color: 'orange' }
                    ].map((stat, index) => (
                      <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className={cn(
                          "text-2xl font-bold mb-1",
                          stat.color === 'blue' && "text-blue-600",
                          stat.color === 'green' && "text-green-600",
                          stat.color === 'purple' && "text-purple-600",
                          stat.color === 'orange' && "text-orange-600"
                        )}>
                          {stat.value}
                        </div>
                        <div className="text-xs text-gray-600">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {[
                      { action: 'Scored a goal', match: 'vs Arsenal Academy', time: '2 hours ago' },
                      { action: 'Training session completed', match: 'Tactical Training', time: '1 day ago' },
                      { action: 'Man of the Match', match: 'vs Chelsea Youth', time: '3 days ago' }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                          <p className="text-xs text-gray-500">{activity.match} • {activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gallery Tab */}
        {activeTab === 'gallery' && (
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">My Gallery</h2>
              <p className="text-gray-600">View and manage your photos and videos</p>
            </div>
            <GallerySection />
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Settings</h2>
              <p className="text-gray-600">Manage your account and preferences</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Settings Navigation */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 h-fit">
                <nav className="space-y-1">
                  {[
                    { id: 'basic', label: 'Basic Information', active: true },
                    { id: 'privacy', label: 'Privacy & Security' },
                    { id: 'notifications', label: 'Notifications' },
                    { id: 'appearance', label: 'Appearance' },
                    { id: 'account', label: 'Account Management' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-lg transition-colors",
                        item.active 
                          ? "bg-blue-50 text-blue-700 font-medium" 
                          : "text-gray-600 hover:bg-gray-50"
                      )}
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Settings Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Information */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                        <input
                          type="text"
                          defaultValue="Peter"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                        <input
                          type="text"
                          defaultValue="Abbas"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        defaultValue="peter@scoutflair.com"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        defaultValue="+234 803 456 7890"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                      <textarea
                        rows={3}
                        defaultValue="Passionate midfielder with a love for the beautiful game. Always striving to improve and help my team succeed."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Notifications */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
                  <div className="space-y-4">
                    {[
                      { id: 'posts', label: 'New posts and comments', enabled: true },
                      { id: 'matches', label: 'Match reminders and updates', enabled: true },
                      { id: 'messages', label: 'Direct messages', enabled: true },
                      { id: 'newsletter', label: 'Weekly newsletter', enabled: false }
                    ].map((notification) => (
                      <div key={notification.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{notification.label}</p>
                        </div>
                        <button
                          className={cn(
                            "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                            notification.enabled ? "bg-blue-600" : "bg-gray-200"
                          )}
                        >
                          <span
                            className={cn(
                              "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                              notification.enabled ? "translate-x-6" : "translate-x-1"
                            )}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex gap-3">
                  <Button className="bg-blue-600 hover:bg-blue-700 flex-1 sm:flex-none">
                    Save Changes
                  </Button>
                  <Button variant="outline" className="flex-1 sm:flex-none">
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  </div>
);
}