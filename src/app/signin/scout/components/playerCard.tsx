import Image from "next/image";
import { FC } from "react";

interface PlayerCardProps {
  name: string;
  surname: string;
  age: number;
  nationality: string;
  flag: string;
  position: string;
  number: number;
  image: string;
}

const PlayerCard: FC<PlayerCardProps> = ({
  name,
  surname,
  age,
  nationality,
  flag,
  position,
  number,
  image,
}) => {
  return (
    <div className="max-w-[337px] bg-white rounded-2xl shadow-md flex overflow-hidden">
      {/* Player Image */}
      <div className="relative p-2 w-[122px] h-[133px] ">
        <Image
          src={image}
          alt={`${surname} ${name}`}
          fill
          className="object-cover"
        />
      </div>

      {/* Right Side - Player Info */}
      <div className="flex-1   p-4 flex flex-col justify-between">
        {/* Name and Number */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-sm text-gray-700">{name}</h2>
            <h1 className="text-lg font-bold uppercase">{surname}</h1>
          </div>
          <p className="text-2xl font-semibold text-gray-800">{number}</p>
        </div>

        {/* Info Section */}
        <div className="mt-2 text-xs text-gray-700 space-y-1">
          <p>
            <span className="font-medium">Age</span> {age}
          </p>
          <p className="flex items-center gap-1">
            <span className="font-medium">Nationality</span> {nationality}{" "}
            <span>{flag}</span>
          </p>
          <p>
            <span className="font-medium">Position</span> {position}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-3">
          <button className="px-5 py-1 border border-orange-400 text-orange-400 rounded-full text-sm hover:bg-orange-400 hover:text-white transition">
            Reports
          </button>
          <button className="px-5 py-1 border border-orange-400 text-orange-400 rounded-full text-sm hover:bg-orange-400 hover:text-white transition">
            Statistics
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
