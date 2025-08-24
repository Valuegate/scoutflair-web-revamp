"use client"

import React, { useState } from 'react';
import { IoSend } from "react-icons/io5";
import { PostsData, Post } from './postData';
import { CommentIcon, HeartIcon, ShareIcon, EmojiPhoto,CameraIcons, OutlinePhoto, } from './spotIcons';


const SocialFeed: React.FC = () => {
  const [posts, setPosts] =useState<Post[]>(PostsData);

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
    <div className=" mt-6 bg-white shadow-md rounded-[12] p-3 space-x-3 w-[724px]">
      {/* Header */}
      <div className="flex items-start space-x-4 mb-4 ">
        <img 
          src={post.user.avatar} 
          alt={post.user.name}
          className="w-[36px] h-[36px] rounded-[4px] object-cover"
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
      <div className="mb-4 overflow-hidden rounded-[4px]">
        <img 
          src={post.image}
          alt="Stadium view"
          className="w-[692px] h-[180px] object-cover "
        />
      </div>

      {/* Liked by section */}
      <div className="flex items-center  justify-between mb-4">
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
        <div className="flex items-center space-x-6 text-sm text-gray-600   ">
          <span>{post.comments} Comments</span>
          <span>{post.shares} Shares</span>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex items-center pt-6 my-2 border-t border-gray-200 justify-between py-3 mb-4">
        <button 
          onClick={() => handleLike(post.id)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <HeartIcon/>
          <span>Like</span>
        </button>
        
        <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors">
          <CommentIcon />
         
        </button>
        
        <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors">
          <ShareIcon />
          <span>Share</span>
        </button>
      </div>
          {/* line divider* */}
  
      {/* Comment Input */}
      <div className="flex items-center space-x-3 pt-4  my-2 border-t  border-gray-200 ">
        <img 
          src="/images/profile.jpeg"
          alt="Your avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1 relative h-[40px] w-[586px] rounded-[4px]">
          <input 
            type="text"
            placeholder="What's happening?"
            className=" bg-gray-100 w-full h-[40px] px-4 py-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            <button className="text-gray-400 hover:text-gray-600 p-1">
              <CameraIcons />
            </button>
            <button className="text-gray-400 hover:text-gray-600 p-1">
              <OutlinePhoto />
            </button>
            <button className="text-gray-400 hover:text-gray-600 p-1">
              < EmojiPhoto/>
            </button>
          </div>
        </div>
         <div className="bg-[rgba(10,40,80,1)] w-[40px] h-[36px] flex items-center justify-center rounded-sm cursor-pointer">
              <IoSend className="text-white w-[20px] h-[20px]" />
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