"use client";

import Image from "next/image";

export default function Spotlight() {
  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl shadow p-4 mb-6">
        <textarea
          placeholder="What's happening?"
          className="w-full border rounded p-2 resize-none"
        />
        <button className="bg-blue-600 text-white px-4 py-2 mt-2 rounded">
          Post
        </button>
      </div>

      {/* Example post */}
      <div className="bg-white rounded-2xl shadow p-4">
        <div className="flex items-center gap-2 mb-2">
          <Image
            src="https://via.placeholder.com/40"
            alt="User"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <p className="font-semibold">Peters Samuel</p>
            <span className="text-sm text-gray-500">August 21, 2024 - 9:30PM</span>
          </div>
        </div>
        <p className="mb-3">
          Lorem ipsum dolor sit amet consectetur. Nunc malesuada ultricies amet metus...
        </p>
        <Image
          src="https://via.placeholder.com/600x300"
          alt="Post Image"
          width={600}
          height={300}
          className="rounded-lg"
        />
        <div className="flex justify-between text-sm text-gray-600 mt-3">
          <span>2 Comments</span>
          <span>5 Shares</span>
        </div>
      </div>
    </div>
  );
}
