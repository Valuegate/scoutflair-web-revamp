// src/components/sections/TestimonialsSection.tsx

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from 'react-icons/fa';

// Updated data structure to match the new component's needs
const testimonials = [
  {
    image: '/images/Ellipse_2391_1601_1624.png',
    name: 'Samuel Baracunda',
    title: 'Professional Scout',
    description:
      '“Scoutflair has completely changed how I discover talent. The platform connects me with skilled, underrated players I wouldn’t have found otherwise. The detailed player insights and video highlights make scouting efficient and precise.”',
  },
  {
    image: '/images/Ellipse_2394_1601_1648.png',
    name: 'Chinedu Okoro',
    title: 'Rising Star Player',
    description:
      '“The highlight reel feature was amazing. I could easily share my best moments with clubs and scouts, which directly led to me getting a professional tryout. It\'s an incredible tool for any aspiring player.”',
  },
  {
    image: '/images/Ellipse_2395_1601_1649.png',
    name: 'Sofia Gunnarsson',
    title: 'Head of Recruitment',
    description:
      '“Scoutflair has streamlined our entire recruitment process. The data is reliable, the platform is intuitive, and we\'re finding talent faster than ever before. It has become indispensable for our club.”',
  },
  {
    image: '/images/Ellipse_2397_1601_1659.png',
    name: 'Isabella Rossi',
    title: 'Player Agent',
    description:
      '“The ability to connect directly with scouts has been invaluable for my clients. Scoutflair has opened doors that were previously closed. It\'s an essential tool for any agent.”',
  },
  {
    image: '/images/Ellipse_2398_1601_1661.png',
    name: 'Kenji Tanaka',
    title: 'Academy Director',
    description:
      '“We\'ve discovered exceptional young talent from regions we never thought to look. The platform\'s mapping tools are incredibly powerful for grassroots scouting.”',
  },
  {
    image: '/images/Ellipse_2396_1601_1651.png',
    name: 'Javier Morales',
    title: 'Youth Team Coach',
    description:
      '“Finding the right players for my youth squad used to be a challenge. Scoutflair\'s detailed analytics and player profiles have made the process incredibly efficient. It\'s a game-changer for grassroots development.”',
  },
  {
    image: '/images/Ellipse_2396_1601_1663.png',
    name: 'Ana Silva',
    title: 'Aspiring Player',
    description:
      '“Thanks to Scoutflair, my profile was seen by a top-tier club. The direct line of communication is something I never had before. It truly levels the playing field for undiscovered talent.”',
  },
];

export function TestimonialsSection() {
  // Start with a middle index to have avatars on both sides initially
  const [currentIndex, setCurrentIndex] = useState(Math.floor(testimonials.length / 2));

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="bg-[#192B4D] text-white py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col items-center gap-12">
        {/* Header Content - Simplified to match target */}
        <div className="text-center max-w-3xl">
          <h2 className="font-manrope text-3xl md:text-4xl font-bold">
            Game-Changing Experiences
          </h2>
          <p className="mt-4 text-base text-white/90 max-w-lg mx-auto font-lato">
            Hear firsthand from players, coaches and scouts who turned
            opportunities into success with Scoutflair.
          </p>
        </div>

        {/* Dynamic Carousel Container */}
        <div className="w-full flex items-center justify-center gap-4">
          <FaRegArrowAltCircleLeft
            className="text-white/80 text-3xl cursor-pointer hover:text-white transition-colors flex-shrink-0"
            onClick={prevSlide}
          />

          <div className="relative w-full max-w-2xl h-[120px] flex items-center justify-center">
            {testimonials.map((testimonial, index) => {
              const position = (index - currentIndex + testimonials.length) % testimonials.length;
              const isCenter = position === 0;
              const isVisible = Math.abs(index - currentIndex) <= 2 || Math.abs(index - currentIndex) >= testimonials.length - 2;

              // Calculate dynamic styles for the 3D effect
              let scale = 0.6;
              let opacity = 0.4;
              let zIndex = 1;
              // The `translateX` value is the distance from the center. Adjust the multiplier to change spacing.
              let translateX = (position - (testimonials.length / 2)) * 80;

              if (isCenter) {
                scale = 1;
                opacity = 1;
                zIndex = 10;
                translateX = 0;
              } else if(position === 1 || position === testimonials.length - 1) {
                scale = 0.8;
                opacity = 0.7;
                zIndex = 5;
                translateX = position === 1 ? 90 : -90;
              } else if(position === 2 || position === testimonials.length - 2) {
                scale = 0.6;
                opacity = 0.5;
                zIndex = 1;
                translateX = position === 2 ? 160 : -160;
              } else {
                 opacity = 0; // Hide avatars that are too far away
              }
              
              if(!isVisible) opacity = 0;


              return (
                <motion.div
                  key={index}
                  className="absolute"
                  initial={false}
                  animate={{ x: translateX, scale, opacity, zIndex }}
                  transition={{ type: 'spring', stiffness: 260, damping: 30 }}
                >
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={isCenter ? 100 : 80}
                    height={isCenter ? 100 : 80}
                    className="rounded-full border-4 transition-colors"
                    style={{
                      borderColor: isCenter ? 'white' : 'rgba(255, 255, 255, 0.3)',
                    }}
                  />
                </motion.div>
              );
            })}
          </div>

          <FaRegArrowAltCircleRight
            className="text-white/80 text-3xl cursor-pointer hover:text-white transition-colors flex-shrink-0"
            onClick={nextSlide}
          />
        </div>

        {/* Testimonial Quote Display with Animation */}
        <div className="text-center max-w-3xl min-h-[190px] md:min-h-[160px]">
          <motion.div
            key={currentIndex} // This key is crucial for re-triggering the animation
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="font-manrope text-xl font-medium">
              {testimonials[currentIndex].name}
            </h3>
            <p className="font-lato text-sm text-white/70 mt-1.5">
              {testimonials[currentIndex].title}
            </p>
            <blockquote className="mt-6">
              <p className="font-lato text-base md:text-lg text-white/90 leading-relaxed">
                {testimonials[currentIndex].description}
              </p>
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
