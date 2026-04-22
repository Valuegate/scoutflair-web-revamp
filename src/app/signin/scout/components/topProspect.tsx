"use client";
import { useState } from "react";
import { ProspectsIcon } from "../ScoutIcons";
import { X } from "lucide-react";

const prospects = [
  {
    name: "Tobi Irefin",
    details: "10 G/A",
    position: "Striker",
    age: 19,
    image: "/images/prosimgone.png",
  },
  {
    name: "Kasim Peter",
    details: "8 G/A",
    position: "Winger",
    age: 20,
    image: "/images/prosimgtwo.png",
  },
  {
    name: "Henry Ishaya",
    details: "6 G/A",
    position: "Midfielder",
    age: 21,
    image: "/images/prosimgthree.png",
  },
];

type Prospect = (typeof prospects)[0];

function ProspectModal({
  prospect,
  onClose,
}: {
  prospect: Prospect;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xs overflow-hidden">
        <div className="relative bg-gradient-to-br from-[#0A2342] to-blue-700 p-5 text-white text-center">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 bg-white/20 hover:bg-white/30 rounded-full"
          >
            <X size={15} />
          </button>
          <img
            src={prospect.image}
            alt={prospect.name}
            className="w-16 h-16 rounded-full mx-auto mb-2 border-4 border-white/30 object-cover"
          />
          <h2 className="text-lg font-bold">{prospect.name}</h2>
          <p className="text-blue-200 text-xs">{prospect.position}</p>
        </div>
        <div className="p-4 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-base font-bold text-gray-900">
                {prospect.details}
              </p>
              <p className="text-xs text-gray-500">Goals / Assists</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-base font-bold text-gray-900">
                {prospect.age}
              </p>
              <p className="text-xs text-gray-500">Age</p>
            </div>
          </div>
          <button className="w-full py-2.5 bg-[#0A2342] text-white text-sm font-semibold rounded-xl hover:bg-blue-800 transition-colors">
            View Full Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TopProspects() {
  const [selected, setSelected] = useState<Prospect | null>(null);

  return (
    <div className="bg-white rounded-[12px] shadow-md p-3 w-full sm:max-w-[350px] h-[145px]">
      {selected && (
        <ProspectModal prospect={selected} onClose={() => setSelected(null)} />
      )}

      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm sm:text-base font-semibold text-gray-800">
          Top Prospects
        </h3>
        <ProspectsIcon />
      </div>

      <div className="flex justify-between items-center gap-2">
        {prospects.map((prospect, i) => (
          <button
            key={i}
            onClick={() => setSelected(prospect)}
            className="flex-1 text-center bg-[rgba(255,250,250,1)] rounded-md py-2 hover:bg-blue-50 hover:ring-1 hover:ring-blue-200 transition-all cursor-pointer"
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
          </button>
        ))}
      </div>
    </div>
  );
}
