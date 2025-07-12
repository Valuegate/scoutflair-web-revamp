import { Button } from '@/components/ui/button';
import { Rocket } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { MobileImageCarousel } from '@/components/mobile-image-carousel';
import { CoreFeatures } from '@/components/core-features';
import { AboutSection } from '@/components/about-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { FaqSection } from '@/components/faq-section';
import { CtaSection } from '@/components/cta-section';
import { TypewriterHeading } from '@/components/typewriter-heading';

export default function Home() {
  const typewriterText = [
    "Revolutionizing Football Scouting with Data & Insights",
  ];

  return (
    <main>
      {/* Hero Text Section */}
      <section className="bg-[#F8F8FF] pt-16 md:pt-20 pb-16 md:pb-24 relative overflow-hidden">
        {/* Decorative background images */}
        <div>
            <Image
              src="https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/07/Still_life_of_colombia_national_soccer_team_1593_3705.png"
              alt="background pattern"
              width={463}
              height={332}
              className="absolute -top-10 -left-20 animate-float-up"
              aria-hidden="true"
              style={{ animationDelay: '0s' }}
            />
            <Image
              src="https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/07/Still_life_of_colombia_national_soccer_team_426_1383.png"
              alt="background pattern"
              width={463}
              height={332}
              className="absolute -top-20 -right-20 animate-float-up"
              aria-hidden="true"
              style={{ animationDelay: '-2s' }}
            />
            <Image
              src="https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/07/Still_life_of_colombia_national_soccer_team_1593_3708.png"
              alt="background pattern"
              width={260}
              height={187}
              className="absolute top-1/2 -right-12 animate-float-down"
              aria-hidden="true"
              style={{ animationDelay: '-4s' }}
            />
            <Image
              src="https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/07/Still_life_of_colombia_national_soccer_team_1593_3706.png"
              alt="background pattern"
              width={260}
              height={187}
              className="absolute bottom-1/4 -left-16 animate-float-down"
              aria-hidden="true"
              style={{ animationDelay: '-1s' }}
            />
        </div>

        <div className="container relative flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E5AA42]/50 bg-white/70 py-2 px-4 mb-6 md:mb-8 shadow-sm">
                <Rocket className="w-5 h-5 text-[#D28E08]" />
                <span className="font-lato text-sm md:text-base font-semibold text-[#D28E08]">
                    Unleash Your Potential, Get Discovered!
                </span>
            </div>

            <TypewriterHeading
              text={typewriterText}
              className="font-merriweather text-4xl sm:text-5xl md:text-[56px] font-bold max-w-4xl leading-tight text-[#1B1B1B]"
            />
            
            <p className="font-lato text-base sm:text-lg md:text-xl text-[#1B1B1B]/90 max-w-3xl mt-8 md:mt-10 leading-relaxed">
                Our solution provides elite scouting, talent data, and mapping tools to all clubs, helping coaches and scouts identify and develop talent, bridging grassroots and professional football.
            </p>

            <Button asChild size="lg" className="mt-8 md:mt-10 rounded-full h-12 md:h-14 px-8 md:px-12 text-base md:text-lg font-poppins font-semibold bg-[#192B4D] hover:bg-[#192B4D]/90 shadow-lg">
                <Link href="/signin">UNLOCK OPPORTUNITIES</Link>
            </Button>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="py-12 md:py-24">
        <div className="container">
          {/* Desktop Gallery */}
          <div className="hidden md:flex items-start justify-center gap-5">
              <Image 
                  src="/images/Frame_1171276266_1593_1998.png"
                  width={860}
                  height={460}
                  alt="View of a packed soccer stadium during a match"
                  className="rounded-[20px] border-2 border-[#192B4D] object-cover transition-transform duration-300 ease-in-out hover:scale-105"
              />
              <Image 
                  src="/images/Frame_1171276267_1593_1999.png"
                  width={200}
                  height={460}
                  alt="Soccer player celebrating on a barrier"
                  className="rounded-[20px] object-cover transition-transform duration-300 ease-in-out hover:scale-105"
              />
              <div className="flex flex-col gap-5">
                  <Image 
                      src="/images/Frame_1171276268_1593_2000.png"
                      width={200}
                      height={220}
                      alt="Scout watching a soccer match from the stands"
                      className="rounded-[20px] object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                  />
                    <Image 
                      src="/images/Frame_1171276269_1593_2001.png"
                      width={200}
                      height={220}
                      alt="Soccer manager watching from the sideline"
                      className="rounded-[20px] object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                  />
              </div>
          </div>
          
          {/* Mobile Carousel */}
          <div className="md:hidden">
              <MobileImageCarousel />
          </div>
        </div>
      </section>
      
       <section className="bg-[#192B4D] bg-[url('https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/07/Frame_1171276255_1574_2109.png')] bg-cover bg-center">
        <div className="container py-5">
          <p className="text-white/90 text-center text-lg font-lato font-medium">
            Scoutflair equips you with powerful tools to showcase talent, analyze performance, and elevate football scouting
          </p>
        </div>
      </section>

      <CoreFeatures />
      <AboutSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
    </main>
  );
}
