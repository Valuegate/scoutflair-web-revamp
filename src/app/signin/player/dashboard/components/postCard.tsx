import React, { useState } from 'react';
import { Heart, MessageCircle, Share, Camera, Image, Smile, Send } from 'lucide-react';
import { IoSend } from "react-icons/io5";
import { PostType } from '../../types/postTypes';

interface Post {
  id: string;
  user: {
    name: string;
    avatar: string;
    timeAgo: string;
  };
  content: string;
  image: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  likedBy: string[];
}

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
}


const SocialFeed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      user: {
        name: 'Peters Samuel',
        avatar: '/api/placeholder/50/50',
        timeAgo: 'August 12, 2024 | 8:31PM'
      },
      content: 'Lorem ipsum dolor sit amet consectetur. Nunc malesuada ultrices amet metus viverra posuere a elit id. Ut vitae in diam risus urna. Mattis tempor convallis in eget suspendisse est eu. Odio fermentum at laoreet feugiat. Odio fermentum at',
      image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&h=400&fit=crop',
      likes: 0,
      comments: 2,
      shares: 5,
      isLiked: false,
      likedBy: ['/api/placeholder/24/24', '/api/placeholder/24/24']
    },
    {
      id: '2',
      user: {
        name: 'Sodiq Fashanu',
        avatar: '/api/placeholder/50/50',
        timeAgo: 'August 21, 2024 | 9:30PM'
      },
      content: 'Lorem ipsum dolor sit amet consectetur. Nunc malesuada ultrices amet metus viverra posuere a elit id. Ut vitae in diam risus urna. Mattis tempor convallis in eget suspendisse est eu. Odio fermentum at laoreet feugiat. Odio fermentum at',
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=400&fit=crop',
      likes: 0,
      comments: 2,
      shares: 5,
      isLiked: false,
      likedBy: ['/api/placeholder/24/24', '/api/placeholder/24/24']
    },
    {
      id: '3',
      user: {
        name: 'Maria Rodriguez',
        avatar: '/api/placeholder/50/50',
        timeAgo: 'August 20, 2024 | 7:45PM'
      },
      content: 'Amazing atmosphere at the stadium tonight! The energy from the crowd was absolutely electric. Nothing beats the feeling of being here live with thousands of other fans cheering for our team.',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=400&fit=crop',
      likes: 0,
      comments: 8,
      shares: 12,
      isLiked: false,
      likedBy: ['/api/placeholder/24/24', '/api/placeholder/24/24', '/api/placeholder/24/24']
    }
  ]);

  const handleLike = (postId: string) => {
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
    <div className=" mt-4 bg-white shadow-md rounded-lg p-3 space-x-3 w-[730px]">
      {/* Header */}
      <div className="flex items-start space-x-4 mb-4 ">
        <img 
          src={post.user.avatar} 
          alt={post.user.name}
          className="w-12 h-12 rounded-full object-cover"
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

      {/* Image */}
      <div className="mb-4">
        <img 
          src={post.image}
          alt="Stadium view"
          className="w-full h-80 object-cover rounded-2xl"
        />
      </div>

      {/* Liked by section */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex -space-x-2">
          {post.likedBy.map((avatar, index) => (
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
      <div className="flex items-center justify-between py-3 mb-4">
        <button 
          onClick={() => handleLike(post.id)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <Heart size={20} />
          <span>Like</span>
        </button>
        
        <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors">
          <MessageCircle size={20} />
          <span>Comments</span>
        </button>
        
        <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors">
          <Share size={20} />
          <span>Share</span>
        </button>
      </div>

      {/* Comment Input */}
      <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
        <img 
          src="/images/profile.jpeg"
          alt="Your avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1 relative">
          <input 
            type="text"
            placeholder="What's happening?"
            className="w-full px-4 py-3 bg-gray-50 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            <button className="text-gray-400 hover:text-gray-600 p-1">
              <Camera size={18} />
            </button>
            <button className="text-gray-400 hover:text-gray-600 p-1">
              <Image size={18} />
            </button>
            <button className="text-gray-400 hover:text-gray-600 p-1">
              <Smile size={18} />
            </button>
          </div>
        </div>
         <div className="bg-[rgba(10,40,80,1)] w-[40px] h-[36px] flex items-center justify-center rounded-sm cursor-pointer">
              <IoSend className="text-white w-[10px] h-[10px]" />
             </div>
      </div>
       
    </div>
  );

  return (
    <div className="">
      <div className="">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      
    </div>
  );
};

export default SocialFeed;