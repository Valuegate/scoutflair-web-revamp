import { CupStarIcon, StarsIcon, StarsIconOutline } from "../ScoutIcons";

export default function StatsCard() {
  return (
    <div className="bg-white w-[350px] h-[145px]   rounded-xl shadow-md p-4 relative">
      {/* Header with title and icon */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Total Players Scouted</h3>
        
          <CupStarIcon/>
        
      </div>
      
      {/* Main content area */}
      <div className="flex items-center justify-between mb-3">
        {/* Player avatars */}
        <div className="flex">
          <img src="https://placehold.co/40x40/8B4513/FFF?text=👤" alt="Player 1" className="rounded-full -mr-2 border-2 border-white"  />
          <img src="https://placehold.co/40x40/D2B48C/FFF?text=👤" alt="Player 2" className="rounded-full -mr-2 border-2 border-white" />
          <img src="https://placehold.co/40x40/F5DEB3/FFF?text=👤" alt="Player 3" className="rounded-full -mr-2 border-2 border-white" />
          <img src="https://placehold.co/40x40/654321/FFF?text=👤" alt="Player 4" className="rounded-full border-2 border-white" />
        </div>
        
        {/* Large number */}
        <div className="text-5xl font-bold text-gray-900">150</div>
      </div>
      
      {/* Bottom section with stars and text */}
      <div className="flex items-center  px-4 justify-between">
        <div className="flex">
          {[...Array(4)].map((_, i) => (
            <StarsIcon/>
          ))}
          <StarsIconOutline/>
        </div>
        <p className="text-sm text-gray-500">Players Scouted</p>
      </div>
    </div>
  );
}