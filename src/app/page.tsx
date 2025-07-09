
import { Button } from '@/components/ui/button';
import { Rocket } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// The underline for the "Scouting" text in the hero section.
const Underline = () => (
    <svg className="w-full h-auto" viewBox="0 0 212 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 12.3958C36.1647 3.20501 128.617 -4.2333 209.667 8.2391" stroke="#F2A725" strokeWidth="4" strokeLinecap="round"/>
    </svg>
)

export default function Home() {
  return (
    <main>
      {/* Hero Text Section */}
      <section className="bg-[#F8F8FF] pt-20 pb-24 relative">
        {/* Decorative background images */}
        <Image
          src="/images/Still_life_of_colombia_national_soccer_team_1593_3705.png"
          alt="background pattern"
          width={463}
          height={332}
          className="absolute -top-10 -left-48 opacity-[0.08]"
          aria-hidden="true"
          data-ai-hint="abstract pattern"
        />
        <Image
          src="/images/Still_life_of_colombia_national_soccer_team_426_1383.png"
          alt="background pattern"
          width={463}
          height={332}
          className="absolute -top-20 -right-48 opacity-[0.08]"
          aria-hidden="true"
          data-ai-hint="abstract pattern"
        />
         <Image
          src="/images/Still_life_of_colombia_national_soccer_team_1593_3708.png"
          alt="background pattern"
          width={260}
          height={187}
          className="absolute top-1/2 -right-24 opacity-[0.08]"
          aria-hidden="true"
          data-ai-hint="abstract pattern"
        />
        <Image
          src="/images/Still_life_of_colombia_national_soccer_team_1593_3706.png"
          alt="background pattern"
          width={260}
          height={187}
          className="absolute bottom-1/4 -left-32 opacity-[0.08]"
          aria-hidden="true"
          data-ai-hint="abstract pattern"
        />

        <div className="container relative flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E5AA42]/50 bg-white/70 py-2 px-4 mb-8 shadow-sm">
                <Rocket className="w-5 h-5 text-[#D28E08]" />
                <span className="font-lato text-lg font-[600] text-[#D28E08]">
                    Unleash Your Potential, Get Discovered!
                </span>
            </div>

            <h1 className="font-poppins text-[56px] font-bold max-w-4xl leading-tight text-[#1B1B1B]">
                Revolutionizing Football <br />
                <span className="relative inline-block text-[#F2A725]">
                    Scouting
                    <span className="absolute -bottom-2 left-0 w-full">
                        <Underline />
                    </span>
                </span>
                {' '}with Data & Insights
            </h1>

            <p className="font-lato text-[22px] text-[#1B1B1B]/90 max-w-4xl mt-12 leading-relaxed">
                Our solution provides elite scouting, talent data, and mapping tools to all clubs, helping coaches and scouts identify and develop talent, bridging grassroots and professional football.
            </p>

            <Button asChild size="lg" className="mt-10 rounded-full h-14 px-12 text-lg font-poppins font-semibold bg-[#192B4D] hover:bg-[#192B4D]/90 shadow-lg">
                <Link href="/scouting-report">UNLOCK OPPORTUNITIES</Link>
            </Button>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="container py-24">
          <div className="flex flex-wrap items-center justify-center gap-5">
              <Image 
                  src="/images/Frame_1171276266_1593_1998.png"
                  width={860}
                  height={460}
                  alt="Main soccer action"
                  className="rounded-[20px] border-2 border-[#192B4D] object-cover"
                  data-ai-hint="soccer match"
              />
              <Image 
                  src="/images/Frame_1171276267_1593_1999.png"
                  width={200}
                  height={460}
                  alt="Soccer player portrait"
                  className="rounded-[20px] object-cover"
                  data-ai-hint="soccer player"
              />
              <div className="flex flex-col gap-5">
                  <Image 
                      src="/images/Frame_1171276268_1593_2000.png"
                      width={200}
                      height={220}
                      alt="Soccer stadium"
                      className="rounded-[20px] object-cover"
                      data-ai-hint="stadium lights"
                  />
                    <Image 
                      src="/images/Frame_1171276269_1593_2001.png"
                      width={200}
                      height={220}
                      alt="Soccer team celebration"
                      className="rounded-[20px] object-cover"
                      data-ai-hint="team celebration"
                  />
              </div>
          </div>
      </section>
    </main>
  );
}
