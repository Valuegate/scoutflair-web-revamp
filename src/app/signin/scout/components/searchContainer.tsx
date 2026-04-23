"use client";

import { Search } from "lucide-react";

// This interface fixes the "Property 'placeholder' does not exist" error
interface SearchProps {
  placeholder?: string;
}

export default function SearchContainer({
  placeholder = "Search...",
}: SearchProps) {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
}
