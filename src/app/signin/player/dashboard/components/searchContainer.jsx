import { Search } from "lucide-react";

export default function SearchContainer() {
  return (
    <div className="relative w-full max-w-[388px] h-[38px]">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
      <input
        type="text"
        placeholder="Search"
        className="bg-gray-50 border rounded-2xl pl-8 sm:pl-10 pr-4 py-2 w-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
