"use client"
import { useState } from "react";
import { OutlinePhoto, CameraIcons, } from "./spotIcons";

export default function PostBox() {
  const [text, setText] = useState("");

  return (
    <div className="flex h-auto items-center bg-white shadow-md rounded-xl p-3 space-x-2 sm:space-x-3 w-full">
      {/* Avatar */}
      <img
         src="/images/profile.jpeg"
        alt="User avatar"
        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0"
      />

      {/* Input Area */}
      <div className="flex-1 flex items-center bg-gray-100 rounded-lg px-2 sm:px-3 min-w-0">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's happening?"
          className="flex-1 bg-transparent outline-none py-2 text-sm sm:text-base text-gray-700 placeholder-gray-500 min-w-0"
        />

        {/* Action Icons */}
        <div className="flex items-center flex-shrink-0">
          <button className="text-gray-500 hover:text-gray-700 p-1 sm:p-2">
             <CameraIcons/>
          </button>
          <button className="text-gray-500 hover:text-gray-700 p-1 sm:p-2">
            <OutlinePhoto/>
          </button>
        </div>
      </div>

      {/* Post Button - Responsive */}
      <button className="bg-[rgba(10,40,80,1)] text-white px-3 sm:px-4 py-2 rounded-md hover:bg-blue-800 transition flex-shrink-0 text-sm sm:text-base font-medium">
        Post
      </button>
    </div>
  );
}