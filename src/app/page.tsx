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

export default function Home() {
  return (
    <main>
      {/* Hero Text Section */}
      <section className="bg-[#F8F8FF] pt-16 md:pt-20 pb-16 md:pb-8 relative overflow-hidden">
        {/* Decorative background images */}
        <div>
            <Image
              src="https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/07/Still_life_of_colombia_national_soccer_team_1593_3705.png"
              alt="background pattern"
              width={463}
              height={332}
              className="absolute -top-10 -left-20 animate-float-up hidden sm:block md:block"
              aria-hidden="true"
              style={{ animationDelay: '0s' }}
            />
            <Image
              src="https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/07/Still_life_of_colombia_national_soccer_team_426_1383.png"
              alt="background pattern"
              width={463}
              height={332}
              className="absolute -top-20 -right-20 animate-float-up hidden sm:block md:block"
              aria-hidden="true"
              style={{ animationDelay: '-2s' }}
            />
            <Image
              src="https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/07/Still_life_of_colombia_national_soccer_team_1593_3708.png"
              alt="background pattern"
              width={260}
              height={187}
              className="absolute top-1/2 -right-12 animate-float-down hidden sm:block md:block"
              aria-hidden="true"
              style={{ animationDelay: '-4s' }}
            />
            <Image
              src="https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/07/Still_life_of_colombia_national_soccer_team_1593_3706.png"
              alt="background pattern"
              width={260}
              height={187}
              className="absolute bottom-1/4 -left-16 animate-float-down hidden sm:block md:block"
              aria-hidden="true"
              style={{ animationDelay: '-1s' }}
            />
            
            {/* Mobile-optimized background elements */}
            <Image
              src="https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/07/Still_life_of_colombia_national_soccer_team_1593_3705.png"
              alt="background pattern"
              width={200}
              height={150}
              className="absolute -top-5 -left-10 animate-float-up opacity-30 sm:hidden"
              aria-hidden="true"
              style={{ animationDelay: '0s' }}
            />
            <Image
              src="https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/07/Still_life_of_colombia_national_soccer_team_426_1383.png"
              alt="background pattern"
              width={200}
              height={150}
              className="absolute -top-8 -right-10 animate-float-up opacity-30 sm:hidden"
              aria-hidden="true"
              style={{ animationDelay: '-2s' }}
            />
        </div>

        <div className="container relative flex flex-col items-center text-center px-4 sm:px-6">
            <div className="inline-flex items-center gap-1 rounded-full border border-[#E5AA42]/50 bg-white/70 py-2 px-3 sm:px-4 mb-6 md:mb-8 shadow-sm opacity-90">
                <Rocket className="w-3 h-3 sm:w-4 sm:h-4 text-[#DB8E08]" />
                <span className="font-lato text-sm sm:text-lg font-semibold text-[#DB8E08]">
                    Unleash Your Potential, Get Discovered!
                </span>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <h1 className="font-merriweather text-[28px] sm:text-[40px] md:text-[56px] font-bold max-w-4xl leading-tight text-[#1B1B1B] px-2 sm:px-0">
                Revolutionizing Football{' '}
                <span className="relative inline-block text-[#DB8E08] font-black italic">
                  Scouting
                  <div className="absolute -bottom-1 sm:-bottom-2 -left-2 sm:-left-4 md:-left-6 w-[calc(100%+1rem)] sm:w-[calc(100%+2rem)] md:w-[calc(100%+1.5rem)] flex justify-start">
                    <Image
                      src="/images/Vector@2x.png"
                      alt="underline accent"
                      width={212}
                      height={23}
                      className="w-[120px] sm:w-[190px] md:w-[220px] opacity-80"
                    />
                  </div>
                </span>
                {' '}with Data & Insights
              </h1>
              <p className="font-lato text-[16px] sm:text-[20px] md:text-[22px] text-[#1B1B1B] opacity-90 max-w-3xl leading-relaxed px-2 sm:px-0">
                  Our solution provides elite scouting, talent data, and mapping tools to all clubs, helping coaches and scouts identify and develop talent, bridging grassroots and professional football.
              </p>
            </div>
            
            <Button asChild size="lg" className="mt-6 sm:mt-8 md:mt-10 rounded-full h-[45px] sm:h-[55px] px-8 sm:px-12 text-base sm:text-lg font-poppins font-semibold bg-[#192B4D] hover:bg-[#192B4D]/90 shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
                <Link href="/signin">UNLOCK OPPORTUNITIES</Link>
            </Button>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="py-8 sm:py-12 md:py-24">
        <div className="container px-4 sm:px-6">
          {/* Desktop Gallery */}
          <div className="hidden md:flex items-start justify-center gap-5">
              <Image 
                  src="/images/Frame_1171276266_1593_1998.png"
                  width={860}
                  height={460}
                  alt="View of a packed soccer stadium during a match"
                  className="rounded-[20px] border-2 border-[#192B4D] object-cover"
              />
              <Image 
                  src="/images/Frame_1171276267_1593_1999.png"
                  width={200}
                  height={460}
                  alt="Soccer player celebrating on a barrier"
                  className="rounded-[20px] object-cover"
              />
              <div className="flex flex-col gap-5">
                  <Image 
                      src="/images/Frame_1171276268_1593_2000.png"
                      width={200}
                      height={220}
                      alt="Scout watching a soccer match from the stands"
                      className="rounded-[20px] object-cover"
                  />
                    <Image 
                      src="/images/Frame_1171276269_1593_2001.png"
                      width={200}
                      height={220}
                      alt="Soccer manager watching from the sideline"
                      className="rounded-[20px] object-cover"
                  />
              </div>
          </div>
          
          {/* Tablet Gallery */}
          <div className="hidden sm:flex md:hidden justify-center gap-3 overflow-x-auto pb-4">
              <div className="flex-shrink-0">
                  <Image 
                      src="/images/Frame_1171276266_1593_1998.png"
                      width={400}
                      height={240}
                      alt="View of a packed soccer stadium during a match"
                      className="rounded-[15px] border-2 border-[#192B4D] object-cover"
                  />
              </div>
              <div className="flex-shrink-0">
                  <Image 
                      src="/images/Frame_1171276267_1593_1999.png"
                      width={160}
                      height={240}
                      alt="Soccer player celebrating on a barrier"
                      className="rounded-[15px] object-cover"
                  />
              </div>
              <div className="flex-shrink-0 flex flex-col gap-3">
                  <Image 
                      src="/images/Frame_1171276268_1593_2000.png"
                      width={160}
                      height={115}
                      alt="Scout watching a soccer match from the stands"
                      className="rounded-[15px] object-cover"
                  />
                  <Image 
                      src="/images/Frame_1171276269_1593_2001.png"
                      width={160}
                      height={115}
                      alt="Soccer manager watching from the sideline"
                      className="rounded-[15px] object-cover"
                  />
              </div>
          </div>
          
          {/* Mobile Carousel */}
          <div className="sm:hidden">
              <MobileImageCarousel />
          </div>
        </div>
      </section>
      
       <section className="bg-[#192B4D] bg-[url('https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/07/Frame_1171276255_1574_2109.png')] bg-cover bg-center">
        <div className="container py-4 sm:py-5 px-4 sm:px-6">
          <p className="text-white/90 text-center text-base sm:text-lg font-lato font-medium leading-relaxed">
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