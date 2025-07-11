// src/components/sections/TestimonialsSection.tsx

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, PanInfo } from 'framer-motion';
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from 'react-icons/fa';

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

const SWIPE_THRESHOLD = 50;

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };
  
  // FIX: Added handler for swipe gestures
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > SWIPE_THRESHOLD) {
      prevSlide();
    } else if (info.offset.x < -SWIPE_THRESHOLD) {
      nextSlide();
    }
  };

  return (
    <section className="bg-[#192B4D] text-white py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col items-center gap-8 md:gap-12">
        <div className="text-center max-w-3xl">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/30 py-1.5 px-4 mb-4">
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
            <span className="font-merriweather text-sm">Testimonials</span>
          </div>
          <h2 className="font-manrope text-3xl md:text-4xl font-bold">
            Game-Changing Experiences
          </h2>
          <p className="mt-4 text-base text-white/90 max-w-xl mx-auto font-lato">
            Hear firsthand from players, coaches and scouts who turned
            opportunities into success with Scoutflair.
          </p>
        </div>

        <div className="w-full flex items-center justify-center gap-2 md:gap-4">
          {/* FIX: Arrows are now hidden on mobile and visible on larger screens */}
          <FaRegArrowAltCircleLeft
            className="hidden md:block text-white/80 text-3xl cursor-pointer hover:text-white transition-colors flex-shrink-0"
            onClick={prevSlide}
          />

          {/* FIX: Wrapped avatars in a draggable motion.div for swipe functionality */}
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            className="relative w-full max-w-xs sm:max-w-lg md:max-w-5xl h-[160px] flex items-center justify-center cursor-grab active:cursor-grabbing"
          >
            {testimonials.map((testimonial, index) => {
              const total = testimonials.length;
              const position = (index - currentIndex + total) % total;
              const isCenter = position === 0;

              // These values work well for both mobile and desktop due to responsive container widths
              let scale = 1, opacity = 1, zIndex = 1, translateX = 0;
              switch (position) {
                case 0: scale = 1; opacity = 1; zIndex = 10; translateX = 0; break;
                case 1: scale = 0.8; opacity = 0.8; zIndex = 5; translateX = 160; break;
                case total - 1: scale = 0.8; opacity = 0.8; zIndex = 5; translateX = -160; break;
                case 2: scale = 0.6; opacity = 0.6; zIndex = 3; translateX = 300; break;
                case total - 2: scale = 0.6; opacity = 0.6; zIndex = 3; translateX = -300; break;
                default:
                  scale = 0.4;
                  opacity = 0;
                  translateX = position < total / 2 ? 400 : -400;
                  break;
              }

              return (
                <motion.div
                  key={index}
                  className="absolute"
                  initial={false}
                  animate={{ x: translateX, scale, opacity, zIndex }}
                  transition={{ type: 'spring', stiffness: 260, damping: 25 }}
                >
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={120}
                    height={120}
                    className="rounded-full border-4 pointer-events-none" // pointer-events-none prevents image drag interference
                    style={{
                      borderColor: isCenter ? 'white' : 'transparent',
                    }}
                  />
                </motion.div>
              );
            })}
          </motion.div>

          <FaRegArrowAltCircleRight
            className="hidden md:block text-white/80 text-3xl cursor-pointer hover:text-white transition-colors flex-shrink-0"
            onClick={nextSlide}
          />
        </div>

        <div className="text-center max-w-3xl min-h-[190px] md:min-h-[160px]">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="font-manrope text-xl font-medium">
              {testimonials[currentIndex].name}
            </h3>
            <p className="font-lato text-sm font-light text-white/70 mt-1.5">
              {testimonials[currentIndex].title}
            </p>
            <blockquote className="mt-6 max-w-2xl mx-auto">
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
