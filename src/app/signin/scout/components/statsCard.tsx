import { CupStarIcon, StarsIcon, StarsIconOutline } from "../ScoutIcons";

export default function StatsCard() {
  return (
    <div className="bg-white max-w-[350px] max-h-[145px]  p-2 rounded-[12px] shadow-md  ">
      {/* Header with title and icon */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Total Players Scouted</h3>
        
          <CupStarIcon/>
        
      </div>
      
      {/* Main content area */}
      <div className="flex items-center justify-between ">
        {/* Player avatars */}
        <div className="flex">
          <img src="/images/scoutlayerone.png" alt="Player 1" className="rounded-full -mr-2 border-2 border-white" width={32} height={32} />
          <img src="/images/scoutplayertwo.png" alt="Player 2" className="rounded-full -mr-2 border-2 border-white" width={32} height={32}/>
          <img src="/images/scoutplayertwo.png" alt="Player 3" className="rounded-full -mr-2 border-2 border-white" width={32} height={32} />
          <img src="/images/scoutlayerone.png" alt="Player 4" className="rounded-full border-2 border-white" width={32} height={32}/>
        </div>
        
        {/* Large number */}
        <div className="text-5xl font-bold text-gray-900">150</div>
      </div>
      
      {/* Bottom section with stars and text */}
      <div className="flex items-center   justify-between">
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