import { CupStarIcon, ProspectsIcon } from "../ScoutIcons";

export default function TopProspects() {
  const prospects = [
    { name: "Tobi Irefin", details: "10 G/A", image: "/images/prosimgone.png" },
    { name: "Tobi Irefin", details: "10 G/A", image: "/images/prosimgtwo.png" },
    { name: "Tobi Irefin", details: "10 G/A", image: "/images/prosimgthree.png" },
  ];

  return (
    <div className="bg-white rounded-[12px] w-[350px] h-[145px] shadow-md p-4">
      {/* Header with title and icon */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-800">Top Prospects</h3>
        <ProspectsIcon/>
      </div>
      
      {/* Prospects container */}
      <div className="flex justify-between px-4">
        {/* Prospect 1 Container */}
        <div className="text-center  bg-[rgba(255,250,250,1)] flex-1">
          <img  
            width={44}
            height={40}
            src={prospects[0].image}
            alt={prospects[0].name}
            className="rounded-full mx-auto mb-1 w-12 h-12 object-cover"
          />
          <p className="text-xs font-medium text-gray-800 leading-tight whitespace-nowrap">{prospects[0].name}</p>
          <p className="text-xs text-gray-500">{prospects[0].details}</p>
        </div>

        {/* Prospect 2 Container */}
        <div className="text-center  bg-[rgba(255,250,250,1)] flex-1">
          <img  
            width={44}
            height={40}
            src={prospects[1].image}
            alt={prospects[1].name}
            className="rounded-full mx-auto mb-1 w-12 h-12 object-cover"
          />
          <p className="text-xs font-medium text-gray-800 leading-tight whitespace-nowrap">{prospects[1].name}</p>
          <p className="text-xs text-gray-500">{prospects[1].details}</p>
        </div>

        {/* Prospect 3 Container */}
        <div className="text-center bg-[rgba(255,250,250,1)] flex-1">
          <img  
            width={44}
            height={40}
            src={prospects[2].image}
            alt={prospects[2].name}
            className="rounded-full mx-auto mb-1 w-12 h-12 object-cover"
          />
          <p className="text-xs font-medium text-gray-800 leading-tight whitespace-nowrap">{prospects[2].name}</p>
          <p className="text-xs text-gray-500">{prospects[2].details}</p>
        </div>
      </div>
    </div>
  );
}