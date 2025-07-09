// src/components/sections/TestimonialsSection.tsx

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'; // Adjust path if needed

// Data for testimonials, kept separate for clarity and easy management.
const testimonialsData = [
  {
    avatar: '/images/Ellipse_2391_1601_1624.png',
    name: 'Samuel Baracunda',
    role: 'Professional Scout',
    quote:
      '“Scoutflair has completely changed how I discover talent. The platform connects me with skilled, underrated players I wouldn’t have found otherwise. The detailed player insights and video highlights make scouting efficient and precise.”',
  },
  {
    avatar: '/images/Ellipse_2394_1601_1648.png',
    name: 'Chinedu Okoro',
    role: 'Rising Star Player',
    quote:
      '“The highlight reel feature was amazing. I could easily share my best moments with clubs and scouts, which directly led to me getting a professional tryout. It\'s an incredible tool for any aspiring player.”',
  },
  {
    avatar: '/images/Ellipse_2395_1601_1649.png',
    name: 'Sofia Gunnarsson',
    role: 'Head of Recruitment',
    quote:
      '“Scoutflair has streamlined our entire recruitment process. The data is reliable, the platform is intuitive, and we\'re finding talent faster than ever before. It has become indispensable for our club.”',
  },
  {
    avatar: '/images/Ellipse_2397_1601_1659.png',
    name: 'Isabella Rossi',
    role: 'Player Agent',
    quote:
      '“The ability to connect directly with scouts has been invaluable for my clients. Scoutflair has opened doors that were previously closed. It\'s an essential tool for any agent.”',
  },
  {
    avatar: '/images/Ellipse_2398_1601_1661.png',
    name: 'Kenji Tanaka',
    role: 'Academy Director',
    quote:
      '“We\'ve discovered exceptional young talent from regions we never thought to look. The platform\'s mapping tools are incredibly powerful for grassroots scouting.”',
  },
  {
    avatar: '/images/Ellipse_2396_1601_1651.png',
    name: 'Javier Morales',
    role: 'Youth Team Coach',
    quote:
      '“Finding the right players for my youth squad used to be a challenge. Scoutflair\'s detailed analytics and player profiles have made the process incredibly efficient. It\'s a game-changer for grassroots development.”',
  },
   {
    avatar: '/images/Ellipse_2396_1601_1663.png',
    name: 'Ana Silva',
    role: 'Aspiring Player',
    quote:
      '“Thanks to Scoutflair, my profile was seen by a top-tier club. The direct line of communication is something I never had before. It truly levels the playing field for undiscovered talent.”',
  },
];

export function TestimonialsSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap());
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="bg-[#192B4D] text-white py-16 md:py-24">
      <div className="container mx-auto px-4 flex flex-col items-center gap-12 md:gap-16">
        {/* Header Content */}
        <div className="text-center max-w-3xl">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/30 py-1.5 px-4 mb-4">
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
            <span className="font-merriweather text-sm">Testimonials</span>
          </div>
          <h2 className="font-manrope text-3xl md:text-4xl font-bold">
            Game-Changing Experiences
          </h2>
          <p className="mt-4 text-base text-white/90 max-w-lg mx-auto font-lato">
            Hear firsthand from players, coaches and scouts who turned
            opportunities into success with Scoutflair.
          </p>
        </div>

        {/* Carousel for Avatars */}
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
          <Carousel setApi={setApi} opts={{ loop: true }}>
            <CarouselContent>
              {testimonialsData.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <div className="flex justify-center p-4">
                    <Image
                      src={testimonial.avatar}
                      alt={`Avatar of ${testimonial.name}`}
                      width={140}
                      height={140}
                      className="rounded-full border-4 border-white/30"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 text-white" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 text-white" />
          </Carousel>
        </div>

        {/* Testimonial Quote Display */}
        <div className="text-center max-w-3xl min-h-[190px] md:min-h-[160px]">
          {testimonialsData[current] && (
            <div key={current} className="animate-in fade-in-50 duration-500">
              <h3 className="font-manrope text-xl font-medium">
                {testimonialsData[current].name}
              </h3>
              <p className="font-lato text-sm text-white/70 mt-1.5">
                {testimonialsData[current].role}
              </p>
              <blockquote className="mt-6">
                <p className="font-lato text-base md:text-lg text-white/90 leading-relaxed">
                  {testimonialsData[current].quote}
                </p>
              </blockquote>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
