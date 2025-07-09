
'use client';

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

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
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="bg-[#192B4D] py-16 md:py-24 text-white">
      <div className="container flex flex-col items-center gap-8">
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

        <div className="w-full max-w-6xl mx-auto">
            <Carousel 
                setApi={setApi} 
                opts={{ align: "center", loop: true }}
            >
                <CarouselContent className="h-[140px] flex items-center">
                    {testimonials.map((testimonial, index) => (
                    <CarouselItem key={index} className="flex-none basis-auto px-2 md:px-4 flex items-center justify-center">
                        <div
                            onClick={() => api?.scrollTo(index)}
                            className="flex items-center justify-center cursor-pointer"
                        >
                            <Image
                                src={testimonial.avatar}
                                alt={testimonial.alt}
                                width={140}
                                height={140}
                                className={cn(
                                    "rounded-full object-cover transition-all duration-300 border-4",
                                    current === index
                                    ? "w-24 h-24 md:w-[140px] md:h-[140px] opacity-100 border-white/20"
                                    : "w-16 h-16 md:w-[80px] md:h-[80px] opacity-60 border-transparent hover:opacity-80"
                                )}
                                data-ai-hint={testimonial.dataAiHint}
                            />
                        </div>
                    </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 bg-transparent hover:bg-white/10 text-white border-0" />
                <CarouselNext className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 bg-transparent hover:bg-white/10 text-white border-0" />
            </Carousel>
        </div>
        
        {api && testimonials[current] && (
          <div className="text-center max-w-3xl mx-auto min-h-[160px] pt-8">
            <h3 className="font-manrope text-xl font-semibold">{testimonials[current].name}</h3>
            <p className="font-lato text-sm text-white/70">{testimonials[current].role}</p>
            <p className="text-lg italic text-white/90 mt-6 px-4">{testimonials[current].quote}</p>
          </div>
        )}
      </div>
    </section>
  );
}
