import Post from "./post";

const mockPosts = [
  {
    author: "Peters Samuel",
    time: "August 21, 2024 | 1:32PM",
    content: "Lorem ipsum dolor sit amet consectetur...",
    image: "/stadium1.jpg",
    comments: 2,
    shares: 5,
  },
  {
    author: "Sodiq Fashanu",
    time: "August 21, 2024 | 3:29PM",
    content: "Lorem ipsum dolor sit amet consectetur...",
    image: "/stadium2.jpg",
    comments: 2,
    shares: 5,
  },
];

export default function Feed() {
  return (
    <div className="flex-1 max-w-2xl mx-auto px-4 mt-4">
      {/* Composer */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <input
          type="text"
          placeholder="What's happening?"
          className="w-full p-2 border border-gray-200 rounded-md focus:outline-none"
        />
        <button className="mt-2 bg-blue-600 text-white px-4 py-1 rounded-md">
          Post
        </button>
      </div>

      {/* Posts */}
      {mockPosts.map((post, index) => (
        <Post key={index} {...post} />
      ))}
    </div>
  );
}