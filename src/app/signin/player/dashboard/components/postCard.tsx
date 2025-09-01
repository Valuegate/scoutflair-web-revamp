import React, { useState, useRef } from 'react';
import { Heart, MessageCircle, Share2, Camera, Image, Smile } from 'lucide-react';
import { SendIcon } from './spotIcons';
import PostBox from './postBox';

// LazyImage Component with placeholder
const LazyImage: React.FC<{
  src: string;
  alt: string;
  className: string;
}> = ({ src, alt, className }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Skeleton/Placeholder */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-400">
            <Image size={32} />
          </div>
        </div>
      )}
      
      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-gray-400 text-center">
            <Image size={32} className="mx-auto mb-2" />
            <span className="text-xs">Failed to load</span>
          </div>
        </div>
      )}
      
      {/* Actual Image */}
      <img
        src={src}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
      />
    </div>
  );
};

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
    image: "https://picsum.photos/800/430?random=10",
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
    ],
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
    ],
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
    ],
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
  const currentUserAvatar = "https://picsum.photos/24/24?random=999";

  // Handle new post creation from PostBox
  const handleCreatePost = async (newPost: Post) => {
    setPosts(prev => [newPost, ...prev]); // Add new post to top of feed
  };

  const handleLike = (postId: string): void => {
    setPosts(posts => posts.map(post => {
      if (post.id === postId) {
        const newIsLiked = !post.isLiked;
        let newLikedBy = post.likedBy;
        if (newIsLiked) {
          if (!newLikedBy.includes(currentUserAvatar)) {
            newLikedBy = [...newLikedBy, currentUserAvatar];
          }
        } else {
          newLikedBy = newLikedBy.filter(av => av !== currentUserAvatar);
        }
        return {
          ...post,
          isLiked: newIsLiked,
          likes: newIsLiked ? post.likes + 1 : post.likes - 1,
          likedBy: newLikedBy
        };
      }
      return post;
    }));
  };

  const handleAddComment = (postId: string): void => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, comments: post.comments + 1 } : post
    ));
  };

  const handleShare = (postId: string): void => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, shares: post.shares + 1 } : post
    ));
  };

  const PostCard: React.FC<{ post: Post }> = ({ post }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [commentText, setCommentText] = useState('');
    const [showComments, setShowComments] = useState(false);
    const [postComments, setPostComments] = useState<Array<{id: string, user: string, avatar: string, text: string, timeAgo: string}>>([
      {
        id: '1',
        user: 'John Doe',
        avatar: 'https://picsum.photos/32/32?random=50',
        text: 'Amazing post! Love the content.',
        timeAgo: '1h'
      },
      {
        id: '2',
        user: 'Jane Smith',
        avatar: 'https://picsum.photos/32/32?random=51',
        text: 'This is exactly what I needed to see today!',
        timeAgo: '30m'
      }
    ]);

    const handleSendComment = () => {
      if (commentText.trim()) {
        const newComment = {
          id: Date.now().toString(),
          user: 'You',
          avatar: 'https://picsum.photos/32/32?random=999',
          text: commentText.trim(),
          timeAgo: 'now'
        };
        setPostComments(prev => [...prev, newComment]);
        handleAddComment(post.id);
        setCommentText('');
        setShowComments(true);
        alert('Comment sent successfully!');
      }
    };

    const toggleComments = () => {
      setShowComments(!showComments);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSendComment();
      }
    };

    return (
      <div className="mt-6 bg-white shadow-md rounded-xl p-3 w-full max-w-[1250px] mx-auto">
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

        {/* Images with Lazy Loading */}
        {post.image && (
          <div className="mb-4 w-full max-w-full overflow-hidden rounded">
            {Array.isArray(post.image) ? (
              <div className={`grid gap-1 w-full ${
                post.image.length === 2 ? 'grid-cols-2 h-80' :
                post.image.length === 3 ? 'grid-cols-2 grid-rows-2 h-80' :
                post.image.length === 4 ? 'grid-cols-2 grid-rows-2 h-100' :
                'grid-cols-1 h-96'
              }`}>
                {post.image.map((img: string, index: number) => (
                  <LazyImage
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
                <LazyImage 
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
              <LazyImage 
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
          
          <button 
            onClick={toggleComments}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <CommentIcon />
            <span>Comment</span>
          </button>
          
          <button 
            onClick={() => handleShare(post.id)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ShareIcon />
            <span>Share</span>
          </button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="border-t border-gray-200 pt-4 mb-4">
            <div className="max-h-64 overflow-y-auto">
              {postComments.map((comment) => (
                <div key={comment.id} className="flex items-start space-x-3 mb-3">
                  <LazyImage 
                    src={comment.avatar}
                    alt={comment.user}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-lg px-3 py-2">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-sm text-gray-900">{comment.user}</span>
                        <span className="text-xs text-gray-500">{comment.timeAgo}</span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Comment Input */}
        <div className="flex items-center space-x-3 pt-4 my-2 border-t border-gray-200">
          <LazyImage 
            src="https://picsum.photos/40/40?random=999"
            alt="Your avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1 relative h-10 rounded">
            <input 
              type="text"
              placeholder="Write a comment..."
              className="bg-gray-100 w-full h-10 px-4 py-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyPress={handleKeyPress}
              ref={inputRef}
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
          <button 
            className="bg-[rgba(10,40,80,1)] w-10 h-9 flex items-center justify-center rounded cursor-pointer hover:bg-blue-700 transition-colors text-white"
            onClick={handleSendComment}
            type="button"
          >
            <SendIcon/>
          </button>
        </div>
      </div>
    );
  };

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