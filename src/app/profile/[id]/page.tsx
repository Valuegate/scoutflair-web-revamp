// Filename: app/profile/[id]/page.tsx

import { playersData } from "@/lib/data";

// 1. Define a type for the component's props
type ProfilePageProps = {
  params: {
    id: string;
  };
};

// 2. Apply the type to your component's props
export default function ProfilePage({ params }: ProfilePageProps) {
  // The rest of your code is perfect!
  const { id } = params;

  const player = playersData.find((p) => p.id === id);

  if (!player) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold">Player not found.</h1>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* Main Profile Card */}
      <div className="relative w-full bg-white rounded-xl shadow-sm mb-6">
        <div className="relative w-full h-40 sm:h-48 md:h-56">
          <img
            src="/images/grass.jpg"
            alt="Profile Cover"
            className="w-full h-32 sm-h-40 md-h-48 object-cover rounded-t-xl"
          />
          <div className="absolute bottom-0 left-4 transform translate-y-1/2">
            <img
              src={player.image}
              alt={player.name}
              className="w-16 h-16 mt-[-30px] sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover border-3 border-[#0A2A56] rounded-full bg-white"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 pt-10 pb-4 gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-lg sm:text-xl font-bold text-black">
              {player.name}
            </h1>
            <div className="flex flex-col gap-1 text-sm text-gray-600">
              <span>
                {player.position}, No. {player.number}
              </span>
              <span>{player.AGE}</span>
            </div>
          </div>
          <button className="w-full sm:w-auto px-6 py-2 bg-[#0A2A56] text-white rounded-lg font-semibold text-sm hover:opacity-90">
            Contact Player
          </button>
        </div>
      </div>

      {/* Other details */}
      <div className="flex items-center gap-3">
        <span className="text-[12px] font-medium text-black leading-[18px]">
          {player.cm}cm
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-[12px] font-medium text-black leading-[18px]">
          {player.lb}lb
        </span>
      </div>
    </div>
  );
}