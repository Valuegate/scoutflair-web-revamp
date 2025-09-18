import { ArrowBack } from "../ScoutIcons";

export default function PlayersFooter() {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-3 p-2">
      {/* Left button */}
      <button className="flex items-center justify-center text-base sm:text-lg text-gray-600 gap-2 sm:gap-4 px-4 sm:px-6 py-2 border border-gray-600 rounded-[8px] shadow-sm hover:bg-gray-200 w-full sm:w-auto">
        <ArrowBack />
        Return to Menu
      </button>

      {/* Right button */}
      <button className="flex items-center justify-center bg-blue-900 text-sm sm:text-md text-white gap-2 sm:gap-4 px-4 sm:px-6 py-2 border border-gray-600 rounded-[8px] shadow-sm hover:bg-blue-700 w-full sm:w-auto">
        View All Players
      </button>
    </div>
  );
}
