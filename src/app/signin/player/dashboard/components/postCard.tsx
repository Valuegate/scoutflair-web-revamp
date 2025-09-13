"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Camera, Image, Smile } from 'lucide-react';
import { SendIcon } from './spotIcons';
import { useRouter } from "next/navigation";
import PostBox from './postBox';

// LazyImage Component
const LazyImage: React.FC<{ src: string; alt: string; className: string }> = ({ src, alt, className }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-400"><Image size={32} /></div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onLoad={() => setIsLoading(false)}
        onError={() => { setIsLoading(false); setHasError(true); }}
        loading="lazy"
      />
    </div>
  );
};

// Types
interface User { name: string; avatar: string; timeAgo: string }
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

// Icons
const HeartIcon = () => <Heart size={20} />;
const CommentIcon = () => <MessageCircle size={20} />;
const ShareIcon = () => <Share2 size={20} />;
const CameraIcons = () => <Camera size={16} />;
const OutlinePhoto = () => <Image size={16} />;
const EmojiPhoto = () => <Smile size={16} />;

const SocialFeed: React.FC = () => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const currentUserAvatar = "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=24&h=24&fit=crop&crop=face";

  // Load token & fetch posts
  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    if (!savedToken) {
      router.push("/signin/player");
    } else {
      setToken(savedToken);
      fetchPosts(savedToken);
    }
  }, [router]);

  const fetchPosts = async (authToken: string) => {
    try {
      const res = await fetch(`https://scoutflair.top/api/v1/spotLights/getPosts?limit=10&offset=0`, {
        headers: { "Authorization": `Bearer ${authToken}`, "Content-Type": "application/json" }
      });
      if (!res.ok) throw new Error(`Error fetching posts: ${res.status}`);
      const json = await res.json();
      setPosts(json.data.obj.posts || []); // Assuming posts array is here
    } catch (err) {
      console.error(err);
      alert("Failed to load posts.");
    }
  };

  // Post actions
  const handleCreatePost = async (newPost: Post): Promise<void> => {
  setPosts(prev => [newPost, ...prev]);
};

  const handleLike = (postId: string) => setPosts(posts => posts.map(post => {
    if (post.id === postId) {
      const newIsLiked = !post.isLiked;
      let newLikedBy = post.likedBy;
      if (newIsLiked && !newLikedBy.includes(currentUserAvatar)) newLikedBy = [...newLikedBy, currentUserAvatar];
      if (!newIsLiked) newLikedBy = newLikedBy.filter(av => av !== currentUserAvatar);
      return { ...post, isLiked: newIsLiked, likes: newIsLiked ? post.likes + 1 : post.likes - 1, likedBy: newLikedBy };
    }
    return post;
  }));
  const handleAddComment = (postId: string) => setPosts(posts.map(post => post.id === postId ? { ...post, comments: post.comments + 1 } : post));
  const handleShare = (postId: string) => setPosts(posts.map(post => post.id === postId ? { ...post, shares: post.shares + 1 } : post));

  // PostCard Component
  const PostCard: React.FC<{ post: Post }> = ({ post }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [commentText, setCommentText] = useState('');
    const [showComments, setShowComments] = useState(false);
    const [postComments, setPostComments] = useState<Array<{id:string,user:string,avatar:string,text:string,timeAgo:string}>>([]);

    const handleSendComment = () => {
      if (!commentText.trim()) return;
      const newComment = { id: Date.now().toString(), user: 'You', avatar: currentUserAvatar, text: commentText.trim(), timeAgo: 'now' };
      setPostComments(prev => [...prev, newComment]);
      handleAddComment(post.id);
      setCommentText('');
      setShowComments(true);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => { if (e.key === 'Enter') { e.preventDefault(); handleSendComment(); } };

    return (
      <div className="mt-6 bg-white shadow-md rounded-xl p-3 w-full max-w-[1250px] mx-auto">
        {/* Header */}
        <div className="flex items-start space-x-4 mb-4">
          <img src={post.user.avatar} alt={post.user.name} className="w-9 h-9 rounded object-cover" />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-lg">{post.user.name}</h3>
            <p className="text-sm text-gray-500">{post.user.timeAgo}</p>
          </div>
        </div>

        {/* Content */}
        <div className="mb-6"><p className="text-gray-700 leading-relaxed">{post.content}</p></div>

        {/* Images */}
        {post.image && (
          Array.isArray(post.image) ? (
            <div className={`grid gap-1 w-full ${post.image.length===2?'grid-cols-2 h-80':post.image.length===3?'grid-cols-2 grid-rows-2 h-80':post.image.length===4?'grid-cols-2 grid-rows-2 h-100':'grid-cols-1 h-96'}`}>
              {post.image.map((img:string,i:number)=>(
                <LazyImage key={i} src={img} alt={`Post image ${i+1}`} className={`w-full h-full object-cover ${post.image.length===3&&i===0?'row-span-2':''}`} />
              ))}
            </div>
          ) : <div className="w-full h-96 rounded overflow-hidden"><LazyImage src={post.image} alt="Post image" className="w-full h-full object-cover" /></div>
        )}

        {/* Liked by */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex -space-x-2">{post.likedBy.map((avatar,i)=> <LazyImage key={i} src={avatar} alt="fan" className="w-6 h-6 rounded-full border-2 border-white object-cover" />)}</div>
          <div className="flex items-center space-x-6 text-sm text-gray-600"><span>{post.comments} Comments</span><span>{post.shares} Shares</span></div>
        </div>

        {/* Actions */}
        <div className="flex items-center pt-6 my-2 border-t border-gray-200 justify-between py-3 mb-4">
          <button onClick={()=>handleLike(post.id)} className={`flex items-center space-x-2 transition-colors ${post.isLiked?'text-red-500':'text-gray-600 hover:text-gray-800'}`}><HeartIcon /><span>Like</span></button>
          <button onClick={()=>setShowComments(!showComments)} className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"><CommentIcon /><span>Comment</span></button>
          <button onClick={()=>handleShare(post.id)} className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"><ShareIcon /><span>Share</span></button>
        </div>

        {/* Comments */}
        {showComments && (
          <div className="border-t border-gray-200 pt-4 mb-4 max-h-64 overflow-y-auto">
            {postComments.map(comment => (
              <div key={comment.id} className="flex items-start space-x-3 mb-3">
                <LazyImage src={comment.avatar} alt={comment.user} className="w-8 h-8 rounded-full object-cover" />
                <div className="flex-1 bg-gray-100 rounded-lg px-3 py-2">
                  <div className="flex items-center space-x-2 mb-1"><span className="font-medium text-sm text-gray-900">{comment.user}</span><span className="text-xs text-gray-500">{comment.timeAgo}</span></div>
                  <p className="text-sm text-gray-700">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Comment Input */}
        <div className="flex items-center space-x-3 pt-4 my-2 border-t border-gray-200">
          <LazyImage src={currentUserAvatar} alt="Your avatar" className="w-10 h-10 rounded-full object-cover" />
          <div className="flex-1 relative h-10 rounded">
            <input type="text" placeholder="Write a comment..." value={commentText} onChange={e=>setCommentText(e.target.value)} onKeyPress={handleKeyPress}
              className="bg-gray-100 w-full h-10 px-4 py-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" ref={inputRef} />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
              <button className="text-gray-400 hover:text-gray-600 p-1"><CameraIcons /></button>
              <button className="text-gray-400 hover:text-gray-600 p-1"><OutlinePhoto /></button>
              <button className="text-gray-400 hover:text-gray-600 p-1"><EmojiPhoto /></button>
            </div>
          </div>
          <button onClick={handleSendComment} type="button" className="bg-[rgba(10,40,80,1)] w-10 h-9 flex items-center justify-center rounded cursor-pointer hover:bg-blue-700 transition-colors text-white"><SendIcon /></button>
        </div>
      </div>
    );
  };

  return (
    <div>
      {token && <PostBox onCreatePost={handleCreatePost} cloudName='dehpr1lss' uploadPreset='denis_upload' />}
      {posts.map(post => <PostCard key={post.id} post={post} />)}
    </div>
  );
};

export default SocialFeed;

