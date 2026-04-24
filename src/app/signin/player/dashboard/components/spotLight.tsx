"use client";

import { useState } from "react";
import Image from "next/image";
import {
  FolderOpen,
  Heart,
  ImageIcon,
  MessageCircle,
  SendHorizontal,
  Share2,
  Smile,
} from "lucide-react";
import PostBox from "./postBox";
import { usePlayerAvatar, usePlayerDisplayName } from "../profile/usePlayerAvatar";

type SpotlightPost = {
  id: number | string;
  author: string;
  avatar: string;
  date: string;
  content: string;
  image: string | string[];
  likedBy: string[];
  comments: number;
  shares: number;
};

const spotlightPosts: SpotlightPost[] = [
  {
    id: 1,
    author: "Peters Samuel",
    avatar: "/images/dpone.png",
    date: "August 21, 2024 | 9:30PM",
    content:
      "Sharp work on ball retention and quick circulation today. We focused on finding the right passing angles, playing through pressure, and keeping the tempo high from midfield from the first whistle to the last drill.",
    image: "/images/spotlight1.png",
    likedBy: ["/images/dptwo.png", "/images/dpthree.png"],
    comments: 2,
    shares: 5,
  },
  {
    id: 2,
    author: "Sodiq Fashanu",
    avatar: "/images/scdp.png",
    date: "August 21, 2024 | 9:30PM",
    content:
      "Solid work on defensive positioning and late midfield runs today. Small improvements are adding up, and I am staying locked in on consistency every time I step on the pitch.",
    image: "/images/spotlight2.png",
    likedBy: ["/images/dpfour.png", "/images/angel.png"],
    comments: 2,
    shares: 5,
  },
];

function SpotlightCard({
  post,
  playerAvatar,
  playerName,
}: {
  post: SpotlightPost;
  playerAvatar: string;
  playerName: string;
}) {
  const media = Array.isArray(post.image) ? post.image : [post.image];

  return (
    <article className="rounded-[24px] bg-white p-4 shadow-[0_14px_32px_rgba(15,23,42,0.08)] sm:p-5">
      <div className="mb-4 flex items-start gap-4">
        <Image
          src={post.avatar}
          alt={post.author}
          width={40}
          height={40}
          className="h-10 w-10 rounded-md object-cover"
        />
        <div>
          <h2 className="text-[15px] font-semibold leading-none text-[#222222] sm:text-[18px]">
            {post.author}
          </h2>
          <p className="mt-1 text-[10px] text-[#6B7280]">{post.date}</p>
        </div>
      </div>

      <p className="mb-4 text-[14px] leading-7 text-[#555555]">{post.content}</p>

      <div className="overflow-hidden rounded-[8px]">
        <Image
          src={media[0]}
          alt={`${post.author} spotlight post`}
          width={1200}
          height={700}
          className="h-auto w-full object-cover"
        />
      </div>

      <div className="mt-4 flex items-center justify-between text-[13px] text-[#6B7280]">
        <div className="flex -space-x-2">
          {post.likedBy.map((avatar) => (
            <Image
              key={`${post.id}-${avatar}`}
              src={avatar}
              alt="Liked by"
              width={24}
              height={24}
              className="h-6 w-6 rounded-full border-2 border-white object-cover"
            />
          ))}
        </div>

        <div className="flex items-center gap-6">
          <span>{post.comments} Comments</span>
          <span>{post.shares} Shares</span>
        </div>
      </div>

      <div className="mt-4 border-t border-[#E5E7EB] pt-4">
        <div className="flex items-center justify-between text-[15px] text-[#3F3F46]">
          <button type="button" className="flex items-center gap-2 hover:text-[#0A2342]">
            <Heart className="h-4 w-4" strokeWidth={1.8} />
            <span>Like</span>
          </button>
          <button type="button" className="flex items-center gap-2 hover:text-[#0A2342]">
            <MessageCircle className="h-4 w-4" strokeWidth={1.8} />
            <span>Comments</span>
          </button>
          <button type="button" className="flex items-center gap-2 hover:text-[#0A2342]">
            <Share2 className="h-4 w-4" strokeWidth={1.8} />
            <span>Share</span>
          </button>
        </div>
      </div>

      <div className="mt-4 border-t border-[#E5E7EB] pt-4">
        <div className="flex items-center gap-3">
          <Image
            src={playerAvatar}
            alt={playerName}
            width={40}
            height={40}
            className="h-10 w-10 rounded-md object-cover"
          />

          <div className="flex h-11 flex-1 items-center rounded-xl bg-[#F5F5F5] px-4 text-[15px] text-[#9CA3AF]">
            <span>What&apos;s happening?</span>
            <div className="ml-auto flex items-center gap-3 text-[#4B5563]">
              <FolderOpen className="h-4 w-4" strokeWidth={1.75} />
              <ImageIcon className="h-4 w-4" strokeWidth={1.75} />
              <Smile className="h-4 w-4" strokeWidth={1.75} />
            </div>
          </div>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#0A2342] text-white transition hover:opacity-95"
          >
            <SendHorizontal className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Spotlight() {
  const playerAvatar = usePlayerAvatar();
  const playerName = usePlayerDisplayName();
  const [posts, setPosts] = useState<SpotlightPost[]>(spotlightPosts);

  const handleCreatePost = async (newPost: {
    id: string;
    user: { name: string; avatar: string; timeAgo: string };
    content: string;
    image: string | string[];
    likes: number;
    isLiked: boolean;
    comments: number;
    shares: number;
    likedBy: string[];
  }) => {
    setPosts((prev) => [
      {
        id: newPost.id,
        author: newPost.user.name,
        avatar: newPost.user.avatar,
        date: newPost.user.timeAgo,
        content: newPost.content,
        image: newPost.image,
        likedBy: newPost.likedBy,
        comments: newPost.comments,
        shares: newPost.shares,
      },
      ...prev,
    ]);
  };

  return (
    <section className="mx-auto flex w-full max-w-[860px] flex-col gap-7 px-1 pb-6">
      <PostBox onCreatePost={handleCreatePost} />

      {posts.map((post) => (
        <SpotlightCard
          key={post.id}
          post={post}
          playerAvatar={playerAvatar}
          playerName={playerName}
        />
      ))}
    </section>
  );
}
