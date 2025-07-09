import Image from 'next/image';
import { PartnersSection } from '@/components/partners-section';

export default function AboutPage() {
  return (
    <>
      <main className="py-12 md:py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center mb-12 md:mb-16">
            <h1 className="font-merriweather text-4xl lg:text-[42px] font-bold leading-tight text-foreground">
              Changing How Football Talent is Found & Fostered
            </h1>
            <p className="text-lg text-foreground/90">
              We are transforming the way football talent is discovered and nurtured. Through cutting-edge data and insightful scouting, we connect emerging players with top scouts and clubs, ensuring no talent goes unnoticed.
            </p>
          </div>
          
          <Image
            src="/images/Frame_2121457547_1616_1649.png"
            alt="A football team on the field, viewed from above"
            width={1300}
            height={400}
            className="w-full h-auto rounded-2xl object-cover"
            data-ai-hint="football team aerial"
          />
        </div>
      </main>
      <PartnersSection />
    </>
  );
}
