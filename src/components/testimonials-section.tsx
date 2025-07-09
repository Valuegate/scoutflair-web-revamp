
'use client';

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";

const testimonials = [
  {
    avatar: '/images/Ellipse_2391_1601_1624.png',
    name: 'Samuel Baracunda',
    role: 'Professional Scout',
    quote: '“Scoutflair has completely changed how I discover talent. The platform connects me with skilled, underrated players I wouldn’t have found otherwise. The detailed player insights and video highlights make scouting efficient and precise.”',
    alt: "Avatar of Samuel Baracunda",
    dataAiHint: "man portrait"
  },
  {
    avatar: '/images/Ellipse_2397_1601_1659.png',
    name: 'Isabella Rossi',
    role: 'Player Agent',
    quote: '“The ability to connect directly with scouts has been invaluable for my clients. Scoutflair has opened doors that were previously closed. It’s an essential tool for any agent.”',
    alt: "Avatar of Isabella Rossi",
    dataAiHint: "woman portrait"
  },
  {
    avatar: '/images/Ellipse_2398_1601_1661.png',
    name: 'Kenji Tanaka',
    role: 'Academy Director',
    quote: '“We’ve discovered exceptional young talent from regions we never thought to look. The platform’s mapping tools are incredibly powerful for grassroots scouting.”',
    alt: "Avatar of Kenji Tanaka",
    dataAiHint: "man portrait asian"
  },
  {
    avatar: '/images/Ellipse_2394_1601_1648.png',
    name: 'Chinedu Okoro',
    role: 'Rising Star Player',
    quote: '“The highlight reel feature was amazing. I could easily share my best moments with clubs and scouts, which directly led to me getting a professional tryout. It’s an incredible tool for any aspiring player.”',
    alt: "Avatar of Chinedu Okoro",
    dataAiHint: "man portrait african"
  },
  {
    avatar: '/images/Ellipse_2395_1601_1649.png',
    name: 'Sofia Gunnarsson',
    role: 'Head of Recruitment',
    quote: '“Scoutflair has streamlined our entire recruitment process. The data is reliable, the platform is intuitive, and we’re finding talent faster than ever before. It has become indispensable for our club.”',
    alt: "Avatar of Sofia Gunnarsson",
    dataAiHint: "woman portrait blonde"
  },
  {
    avatar: '/images/Ellipse_2396_1601_1651.png',
    name: 'Javier Morales',
    role: 'Youth Team Coach',
    quote: '“Finding the right players for my youth squad used to be a challenge. Scoutflair\'s detailed analytics and player profiles have made the process incredibly efficient. It\'s a game-changer for grassroots development.”',
    alt: "Avatar of Javier Morales",
    dataAiHint: "man portrait hispanic"
  },
  {
    avatar: '/images/Ellipse_2396_1601_1663.png',
    name: 'Lena Schmidt',
    role: 'Aspiring Professional Player',
    quote: '“As a player from a small town, getting noticed was my biggest hurdle. Scoutflair gave me the platform to showcase my skills to a wider audience. I\'m now getting attention from clubs I could only dream of before.”',
    alt: "Avatar of Lena Schmidt",
    dataAiHint: "woman portrait european"
  }
];

export function TestimonialsSection() {
  return (
    <section className="bg-[#192B4D] py-16 md:py-24 text-white">
      <div className="container flex flex-col items-center gap-12">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/40 py-1.5 px-4 mb-4">
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            <span className="font-merriweather text-sm">Testimonials</span>
          </div>
          <h2 className="font-manrope text-4xl font-bold">Game-Changing Experiences</h2>
          <p className="mt-4 text-white/90">
            Hear firsthand from players, coaches and scouts who turned opportunities into success with Scoutflair.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-4xl relative"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="text-center">
                <div className="flex justify-center mb-6">
                   <Image
                      src={testimonial.avatar}
                      alt={testimonial.alt}
                      width={140}
                      height={140}
                      className="rounded-full border-4 border-white/20 object-cover"
                      data-ai-hint={testimonial.dataAiHint}
                    />
                </div>
                <div className="max-w-2xl mx-auto">
                  <p className="text-lg italic text-white/90 mb-6 px-4">{testimonial.quote}</p>
                  <h3 className="font-manrope text-xl font-semibold">{testimonial.name}</h3>
                  <p className="font-lato text-sm text-white/70">{testimonial.role}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="absolute left-[-60px] top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white border-white/20" />
            <CarouselNext className="absolute right-[-60px] top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white border-white/20" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
