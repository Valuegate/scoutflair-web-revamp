"use client"

import { useState } from "react";
import { FiFileText, FiImage } from "react-icons/fi";

export default function PostBox() {
  const [text, setText] = useState("");

  return (
    <div className="flex items-center bg-white shadow-md rounded-lg p-3 space-x-3 w-[730px] ">
      {/* Avatar */}
      <img
         src="/images/profile.jpeg"
        alt="User avatar"
        className="w-10 h-10 rounded-full"
      />

      {/* Input Area */}
      <div className="flex-1 flex items-center bg-gray-100 rounded-lg px-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's happening?"
          className="flex-1 bg-transparent outline-none py-2 text-gray-700 placeholder-gray-500"
        />

        {/* Action Icons */}
        <button className="text-gray-500 hover:text-gray-700 p-2">
          <FiFileText size={18} />
        </button>
        <button className="text-gray-500 hover:text-gray-700 p-2">
          <FiImage size={18} />
        </button>
      </div>

      {/* Post Button */}
      <button className="bg-[rgba(10,40,80,1)]  w-[94] text-white px-4 py-2 rounded-md hover:bg-blue-800 transition">
        Post
      </button>
    </div>
  );
}