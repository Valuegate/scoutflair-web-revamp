"use client"
import React from 'react';
import Image from 'next/image';

interface PlayerProfileCardProps {
  playerName?: string;
  position?: string;
  jerseyNumber?: number;
  age?: number;
  playerImage?: string;
  stadiumImage?: string;
}

const PlayerProfileCard: React.FC<PlayerProfileCardProps> = ({
  playerName = "Peter Abbas",
  position = "Midfielder",
  jerseyNumber = 8,
  age = 22,
  playerImage = "/images/profile.jpeg", 
  stadiumImage = "/images/sta.png"
}) => {
  return (
   <div className=' relative bg-white shadow-lg w-[1098px] h-[370px] rounded-[12px] '>
    
    <p>Hello</p>
    <p>Hello</p>
    <p>Hello</p>
    <p>Hello</p>
   </div>
  );
};

export default PlayerProfileCard;