import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckmarkIcon } from '@/components/icons/checkmark-icon';

const features = [
  "Unlocking Football Potential",
  "Talent Discovery Made Easy",
  "Your Gateway to Football Success",
  "Connecting Players, Coaches & Scouts",
];

export function AboutSection() {
  return (
    <section className="bg-white bg-[url('https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/07/About_frame_1598_2381.png')] bg-cover bg-center py-16 md:py-24">
      <div className="container">
        {/* Top Section */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center mb-16 md:mb-24">
          {/* Left Column: Image */}
          <div className="relative md:order-first h-[470px] flex items-center justify-center">
            <div className="absolute inset-0 border-4 border-[#E5AA42] rounded-xl z-0"></div>
            <div className="relative w-[440px] h-[460px] z-10">
                <Image
                src="/images/Image_1598_2263.png"
                alt="Scouts watching a football match"
                fill
                className="rounded-2xl object-cover"
                data-ai-hint="scouts watching match"
                sizes="(max-width: 768px) 100vw, 440px"
                />
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="flex flex-col gap-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#041931]/40 py-1.5 px-4 mb-4">
                 <div className="w-1.5 h-1.5 bg-[#041931] rounded-full"></div>
                <span className="font-merriweather text-sm text-[#192B4D]">About Us</span>
              </div>
              <h2 className="font-manrope text-4xl font-bold text-[#1B1B1B] max-w-lg leading-tight">
                Connecting Talent with Opportunity – Bridging the Gap in Football.
              </h2>
              <p className="mt-4 text-lg text-[#1B1B1B]/90">
                Scoutflair is a dynamic football scouting platform designed to bridge the gap between talent and opportunity. Whether you're a player striving for exposure, a coach seeking the right prospects, or a scout looking for top talent, Scoutflair streamlines the connection process. We make talent discovery seamless, helping footballers advance their careers while enabling scouts and coaches to find the right fit with ease.
              </p>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <CheckmarkIcon />
                  <span className="font-lato text-base font-medium text-[#1B1B1B]/90">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4">
               <Button asChild variant="outline" className="rounded-full border-[#E5AA42] text-[#1B1B1B] hover:bg-[#E5AA42]/10 h-11 px-8 font-poppins font-medium">
                  <Link href="/about">Explore Now</Link>
               </Button>
            </div>
          </div>
        </div>
        
        {/* Bottom Gallery */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-4 md:grid md:grid-cols-12 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="flex-shrink-0 snap-center w-4/5 md:w-auto md:col-span-3 rounded-2xl overflow-hidden">
                <Image 
                    src="/images/Frame_2121457504_1598_2371.png"
                    alt="Young player in action"
                    width={310}
                    height={252}
                    className="w-full h-full object-cover"
                    data-ai-hint="young player action"
                />
            </div>
             <div className="flex-shrink-0 snap-center w-4/5 md:w-auto md:col-span-6 rounded-2xl overflow-hidden">
                <Image 
                    src="/images/Frame_2121457500_1598_2366.png"
                    alt="Football team huddle"
                    width={640}
                    height={252}
                    className="w-full h-full object-cover"
                    data-ai-hint="team huddle"
                />
            </div>
             <div className="flex-shrink-0 snap-center w-4/5 md:w-auto md:col-span-3 rounded-2xl overflow-hidden">
                <Image 
                    src="/images/Frame_2121457503_1598_2369.png"
                    alt="Scout taking notes"
                    width={310}
                    height={252}
                    className="w-full h-full object-cover"
                    data-ai-hint="scout notes"
                />
            </div>
        </div>

      </div>
    </section>
  );
}
