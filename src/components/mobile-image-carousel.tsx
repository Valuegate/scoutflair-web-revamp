'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const images = [
    {
        src: "/images/Frame_1171276266_1593_1998.png",
        alt: "View of a packed soccer stadium during a match",
        hint: "stadium crowd"
    },
    {
        src: "/images/Frame_1171276267_1593_1999.png",
        alt: "Soccer player celebrating on a barrier",
        hint: "player celebrating"
    },
    {
        src: "/images/Frame_1171276268_1593_2000.png",
        alt: "Scout watching a soccer match from the stands",
        hint: "scout watching"
    },
    {
        src: "/images/Frame_1171276269_1593_2001.png",
        alt: "Soccer manager watching from the sideline",
        hint: "manager sideline"
    }
];

export function MobileImageCarousel() {
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
        <div className="w-full max-w-sm mx-auto">
            <Carousel setApi={setApi} className="w-full">
                <CarouselContent>
                    {images.map((image, index) => (
                        <CarouselItem key={index}>
                            <div className="aspect-video relative">
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    className="rounded-[20px] object-cover"
                                    data-ai-hint={image.hint}
                                    sizes="(max-width: 640px) 90vw, 300px"
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
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
    );
}
