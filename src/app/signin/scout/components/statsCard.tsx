import { CupStarIcon, StarsIcon, StarsIconOutline } from "../ScoutIcons";

export default function StatsCard() {
  return (
    <div className="bg-white w-full sm:max-w-[350px] p-3 rounded-[12px] shadow-md h-[145px]">
      {/* Header with title and icon */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm sm:text-base font-semibold text-gray-800">
          Total Players Scouted
        </h3>
        <CupStarIcon  />
      </div>

      {/* Main content area */}
      <div className="flex items-center justify-between">
        {/* Player avatars */}
        <div className="flex mt-8">
          <img
            src="/images/scoutlayerone.png"
            alt="Player 1"
            className="rounded-full -mr-2 border-2 border-white w-7 h-7 sm:w-8 sm:h-8"
          />
          <img
            src="/images/scoutplayertwo.png"
            alt="Player 2"
            className="rounded-full -mr-2 border-2 border-white w-7 h-7 sm:w-8 sm:h-8"
          />
          <img
            src="/images/scoutplayertwo.png"
            alt="Player 3"
            className="rounded-full -mr-2 border-2 border-white w-7 h-7 sm:w-8 sm:h-8"
          />
          <img
            src="/images/scoutlayerone.png"
            alt="Player 4"
            className="rounded-full border-2 border-white w-7 h-7 sm:w-8 sm:h-8"
          />
        </div>

        {/* Large number */}
        <div className="text-2xl sm:text-4xl font-bold text-gray-900 mt-5">150</div>
      </div>

      {/* Bottom section with stars and text */}
      <div className="flex items-center justify-between mt-2">
        <div className="flex">
          {[...Array(4)].map((_, i) => (
            <StarsIcon  />
          ))}
          <StarsIconOutline />
        </div>
        <p className="text-xs text-gray-500">Players Scouted</p>
      </div>
    </div>
  );
}
