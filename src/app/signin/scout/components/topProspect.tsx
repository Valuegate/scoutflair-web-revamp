import { ProspectsIcon } from "../ScoutIcons";

export default function TopProspects() {
  const prospects = [
    { name: "Tobi Irefin", details: "10 G/A", image: "/images/prosimgone.png" },
    { name: "Tobi Irefin", details: "10 G/A", image: "/images/prosimgtwo.png" },
    { name: "Tobi Irefin", details: "10 G/A", image: "/images/prosimgthree.png" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-2 max-w-[350px] max-w-sm sm:max-w-md lg:max-w-lg max-h-[145px]">
      {/* Header with title and icon */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-800">Top Prospects</h3>
        <ProspectsIcon />
      </div>

      {/* Prospects container */}
      <div className="flex flex-row sm:flex-row justify-between items-center  gap-3 sm:gap-0">
        {prospects.map((prospect, i) => (
          <div
            key={i}
            className="text-center bg-[rgba(255,250,250,1)] flex-1  rounded-md"
          >
            <img
              src={prospect.image}
              alt={prospect.name}
              className="rounded-full mx-auto mb-1 w-12 h-12 object-cover"
            />
            <p className="text-xs font-medium text-gray-800 leading-tight whitespace-nowrap">
              {prospect.name}
            </p>
            <p className="text-xs text-gray-500">{prospect.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
}




