import { CupStarIcon, ProspectsIcon } from "../ScoutIcons";

export default function TopProspects() {
  const prospects = [
    { name: "Tobi Irefin", details: "10 G/A", image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=150&h=150&fit=crop&crop=face" },
    { name: "Tobi Irefin", details: "10 G/A", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
    { name: "Tobi Irefin", details: "10 G/A", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" },
  ];

  return (
    <div className="bg-white rounded-xl w-[350px] h-[145px] shadow-md p-4">
      {/* Header with title and icon */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-800">Top Prospects</h3>
        
          <ProspectsIcon/>
      
      </div>
      
      {/* Prospects grid */}
      <div className="flex justify-between px-4">
        {prospects.map((prospect, i) => (
          <div key={i} className="text-center flex-1">
            <img
              src={prospect.image}
              alt={prospect.name}
              className="rounded-full mx-auto mb-1 w-12 h-12 object-cover"
            />
            <p className="text-xs font-medium text-gray-800 leading-tight whitespace-nowrap">{prospect.name}</p>
            <p className="text-xs text-gray-500">{prospect.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
}