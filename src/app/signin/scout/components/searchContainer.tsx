"use client";

import { Search } from "lucide-react";

interface SearchProps {
  placeholder?: string;
}

export default function SearchContainer({
  placeholder = "Search...",
}: SearchProps) {
  return (
    <div className="relative w-full">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <Search className="w-4 h-4 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none transition-all focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-50/50"
      />
    </div>
  );
}
