
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

const teamMembers = [
    {
        name: 'Team Member 1',
        image: '/images/Frame_2121457560_1617_1688.png',
        hint: 'team member portrait'
    },
    {
        name: 'Team Member 2',
        image: '/images/Frame_2121457561_1617_1689.png',
        hint: 'team member portrait'
    },
    {
        name: 'Team Member 3',
        image: '/images/Frame_2121457562_1617_1692.png',
        hint: 'team member portrait'
    },
    {
        name: 'Team Member 4',
        image: '/images/Frame_2121457563_1617_1693.png',
        hint: 'team member portrait'
    }
];

export function MeetTheTeamSection() {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!api) {
            return;
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap());

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    return (
        <section className="py-12 md:py-24">
            <div className="container">
                <div className="flex flex-col gap-4 mb-12 md:mb-14">
                    <div className="inline-flex items-center gap-2 rounded-full border border-foreground/20 py-1.5 px-4 self-start">
                        <div className="w-1.5 h-1.5 bg-foreground rounded-full"></div>
                        <span className="font-merriweather text-sm text-foreground/90">Meet the Team</span>
                    </div>
                    <h2 className="font-manrope text-4xl font-bold text-foreground max-w-lg leading-tight">
                        The Minds Behind the Mission
                    </h2>
                </div>
                
                {/* Desktop Grid */}
                <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="relative aspect-[3/4] w-full h-auto overflow-hidden rounded-2xl">
                           <Image
                             src={member.image}
                             alt={member.name}
                             fill
                             className="rounded-2xl object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                             data-ai-hint={member.hint}
                             sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                           />
                        </div>
                    ))}
                </div>

                {/* Mobile Carousel */}
                <div className="sm:hidden">
                   <Carousel setApi={setApi} className="w-full max-w-xs mx-auto">
                        <CarouselContent>
                            {teamMembers.map((member, index) => (
                                <CarouselItem key={index}>
                                     <div className="relative aspect-[3/4] w-full h-auto overflow-hidden rounded-2xl">
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            fill
                                            className="rounded-2xl object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                                            data-ai-hint={member.hint}
                                            sizes="90vw"
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                    <div className="flex justify-center items-center gap-2 mt-4">
                        {Array.from({ length: count }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => api?.scrollTo(index)}
                                className={cn(
                                    "h-2 w-2 rounded-full transition-colors",
                                    current === index ? "bg-primary" : "bg-primary/30"
                                )}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
