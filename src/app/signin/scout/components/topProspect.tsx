import { ProspectsIcon } from "../ScoutIcons";


const prospects = [
    { name: "Tobi Irefin", details: "10 G/A", image: "/images/prosimgone.png" },
    { name: "Tobi Irefin", details: "10 G/A", image: "/images/prosimgtwo.png" },
    { name: "Tobi Irefin", details: "10 G/A", image: "/images/prosimgthree.png" },
  ];
  export default function TopProspects() {
  return (
    <div className="bg-white rounded-[12px] shadow-md p-3 w-full sm:max-w-[350px] h-[145px]">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm sm:text-base font-semibold text-gray-800">
          Top Prospects
        </h3>
        <ProspectsIcon  />
      </div>

      {/* Prospects */}
      <div className="flex justify-between items-center gap-2">
        {prospects.map((prospect, i) => (
          <div
            key={i}
            className="flex-1 text-center bg-[rgba(255,250,250,1)] rounded-md py-2"
          >
            <img
              src={prospect.image}
              alt={prospect.name}
              className="rounded-full mx-auto mb-1 w-9 h-9 object-cover"
            />
            <p className="text-xs font-medium text-gray-800 leading-tight truncate">
              {prospect.name}
            </p>
            <p className="text-[10px] text-gray-500">{prospect.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
