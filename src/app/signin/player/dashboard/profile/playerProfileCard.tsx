"use client"
import React from 'react';

interface PlayerProfileCardProps {
  playerName?: string;
  position?: string;
  jerseyNumber?: number;
  age?: number;
  playerImage?: string;
  stadiumImage?: string;
}

const PlayerProfileCard: React.FC<PlayerProfileCardProps> = ({
  playerName = "",
  position = "",
  jerseyNumber,
  age,
  playerImage = "",
  stadiumImage = ""
}) => {
  return (
   <div className=' relative bg-white shadow-lg w-[1098px] h-[370px] rounded-[12px] '>
    {playerName ? (
      <div className="p-6">
        <h2 className="text-lg font-semibold text-black">{playerName}</h2>
        <p className="text-sm text-gray-600">
          {[position, jerseyNumber ? `No. ${jerseyNumber}` : "", age ? `${age} yrs` : ""].filter(Boolean).join(" | ")}
        </p>
      </div>
    ) : null}
   </div>
  );
};

export default PlayerProfileCard;
