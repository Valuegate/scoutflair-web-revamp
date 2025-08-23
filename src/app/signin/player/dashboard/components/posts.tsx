"use client"
import PostCard from "./postCard";

const posts = [
  {
    id: 1,
    name: "Peters Samuel",
    avatar: "https://via.placeholder.com/40",
    time: "August 21, 2024 | 9:00PM",
    text: "Lorem ipsum dolor sit amet consectetur. Nunc malesuada ultricies amet metus viverra posuere a elit id...",
    image: "https://picsum.photos/700/300",
  },
  {
    id: 2,
    name: "Sodiq Fashanu",
    avatar: "https://via.placeholder.com/40",
    time: "August 21, 2024 | 9:00PM",
    text: "Lorem ipsum dolor sit amet consectetur. Nunc malesuada ultricies amet metus viverra posuere a elit id...",
    image: "https://picsum.photos/701/300",
  },
];

export default function PostFeed() {
  return (
    <div className="flex flex-col items-start">
      {posts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
}