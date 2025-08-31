import React, { useState } from 'react';
import { Send, Heart, MessageCircle, Share2, Camera, Image, Smile } from 'lucide-react';
import { SendIcon } from './spotIcons';
import PostBox from './postBox';

// Type definitions
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

// Mock icons components
const HeartIcon = () => <Heart size={20} />;
const CommentIcon = () => <MessageCircle size={20} />;
const ShareIcon = () => <Share2 size={20} />;
const CameraIcons = () => <Camera size={16} />;
const OutlinePhoto = () => <Image size={16} />;
const EmojiPhoto = () => <Smile size={16} />;

// Mock data with different image configurations
const mockPosts: Post[] = [
  {
    id: "1",
    user: {
      name: "Anthony Martial",
      avatar: "https://picsum.photos/36/36?random=1",
      timeAgo: "2 hours ago"
    },
    content: "Just visited this amazing place! The weather was perfect and the views were incredible. Can't wait to go back again soon! 🌅",
    image: "https://picsum.photos/800/430?random=10", // Single image
    likes: 24,
    isLiked: false,
    comments: 8,
    shares: 3,
    likedBy: [
      "https://picsum.photos/24/24?random=100",
      "https://picsum.photos/24/24?random=101",
      "https://picsum.photos/24/24?random=102"
    ]
  },
  {
    id: "2",
    user: {
      name: "Sarah Wilson",
      avatar: "https://picsum.photos/36/36?random=2",
      timeAgo: "4 hours ago"
    },
    content: "Beautiful sunset and morning views from my weekend getaway! Nature never fails to amaze me. 🌄✨",
    image: [
      "https://picsum.photos/400/430?random=20",
      "https://picsum.photos/400/430?random=21"
    ], // Two images
    likes: 56,
    isLiked: true,
    comments: 12,
    shares: 7,
    likedBy: [
      "https://picsum.photos/24/24?random=103",
      "https://picsum.photos/24/24?random=104",
      "https://picsum.photos/24/24?random=105"
    ]
  },
  {
    id: "3",
    user: {
      name: "David Beckam",
      avatar: "https://picsum.photos/36/36?random=3",
      timeAgo: "6 hours ago"
    },
    content: "City life vs nature - can't decide which one I love more! Each has its own beauty and charm. What's your preference? 🏙️🌲",
    image: [
      "https://picsum.photos/533/430?random=30",
      "https://picsum.photos/267/215?random=31",
      "https://picsum.photos/267/215?random=32"
    ], // Three images
    likes: 89,
    isLiked: false,
    comments: 23,
    shares: 15,
    likedBy: [
      "https://picsum.photos/24/24?random=106",
      "https://picsum.photos/24/24?random=107",
      "https://picsum.photos/24/24?random=108"
    ]
  },
  {
    id: "4",
    user: {
      name: "Emma Taylor",
      avatar: "https://picsum.photos/36/36?random=4",
      timeAgo: "8 hours ago"
    },
    content: "Perfect day for photography! Captured some amazing moments today. The lighting was just perfect for every shot! 📸",
    image: [
      "https://picsum.photos/400/215?random=40",
      "https://picsum.photos/400/215?random=41",
      "https://picsum.photos/400/215?random=42",
      "https://picsum.photos/400/215?random=43"
    ], // Four images
    likes: 134,
    isLiked: true,
    comments: 31,
    shares: 22,
    likedBy: [
      "https://picsum.photos/24/24?random=109",
      "https://picsum.photos/24/24?random=110",
      "https://picsum.photos/24/24?random=111"
    ]
  }
];

const SocialFeed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(mockPosts);

  // Handle new post creation from PostBox
  const handleCreatePost = async (newPost: Post) => {
    setPosts(prev => [newPost, ...prev]); // Add new post to top of feed
  };

  const handleLike = (postId: string): void => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const PostCard: React.FC<{ post: Post }> = ({ post }) => (
    <div className="mt-6 bg-white shadow-md rounded-xl p-3 w-full max-w-[1350px] mx-auto">
      {/* Header */}
      <div className="flex items-start space-x-4 mb-4">
        <img 
          src={post.user.avatar} 
          alt={post.user.name}
          className="w-9 h-9 rounded object-cover"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-lg">{post.user.name}</h3>
          <p className="text-sm text-gray-500">{post.user.timeAgo}</p>
        </div>
      </div>

      {/* Content */}
      <div className="mb-6">
        <p className="text-gray-700 leading-relaxed">
          {post.content}
        </p>
      </div>

      {/* Images */}
      {post.image && (
        <div className="mb-4 w-full max-w-full overflow-hidden rounded">
          {Array.isArray(post.image) ? (
            <div className={`grid gap-1 w-full ${
              post.image.length === 2 ? 'grid-cols-2 h-80' :
              post.image.length === 3 ? 'grid-cols-2 grid-rows-2 h-80' :
              post.image.length === 4 ? 'grid-cols-2 grid-rows-2 h-80' :
              'grid-cols-1 h-96'
            }`}>
              {post.image.map((img: string, index: number) => (
                <img
                  key={index}
                  src={img}
                  alt={`Post image ${index + 1}`}
                  className={`w-full h-full object-cover ${
                    post.image.length === 3 && index === 0 ? 'row-span-2' : ''
                  }`}
                />
              ))}
            </div>
          ) : (
            <div className="w-full h-96 rounded overflow-hidden">
              <img 
                src={post.image}
                alt="Post image"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      )}

      {/* Liked by section */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex -space-x-2">
          {post.likedBy.map((avatar: string, index: number) => (
            <img 
              key={index}
              src={avatar}
              alt="User"
              className="w-6 h-6 rounded-full border-2 border-white object-cover"
            />
          ))}
        </div>
        <div className="flex items-center space-x-6 text-sm text-gray-600">
          <span>{post.comments} Comments</span>
          <span>{post.shares} Shares</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center pt-6 my-2 border-t border-gray-200 justify-between py-3 mb-4">
        <button 
          onClick={() => handleLike(post.id)}
          className={`flex items-center space-x-2 transition-colors ${
            post.isLiked ? 'text-red-500' : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <HeartIcon />
          <span>Like</span>
        </button>
        
        <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors">
          <CommentIcon />
          <span>Comment</span>
        </button>
        
        <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors">
          <ShareIcon />
          <span>Share</span>
        </button>
      </div>

      {/* Comment Input */}
      <div className="flex items-center space-x-3 pt-4 my-2 border-t border-gray-200">
        <img 
          src="https://picsum.photos/40/40?random=999"
          alt="Your avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1 relative h-10 rounded">
          <input 
            type="text"
            placeholder="What's happening?"
            className="bg-gray-100 w-full h-10 px-4 py-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            <button className="text-gray-400 hover:text-gray-600 p-1">
              <CameraIcons />
            </button>
            <button className="text-gray-400 hover:text-gray-600 p-1">
              <OutlinePhoto />
            </button>
            <button className="text-gray-400 hover:text-gray-600 p-1">
              <EmojiPhoto />
            </button>
          </div>
        </div>
        <div className="bg-[rgba(10,40,80,1)] w-10 h-9 flex items-center justify-center rounded cursor-pointer hover:bg-blue-700 transition-colors">
          <button className="text-white w-5 h-5">
            <SendIcon/>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="">
      {/* PostBox at the top */}
      <PostBox onCreatePost={handleCreatePost} />
      
      {/* Posts feed */}
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default SocialFeed;