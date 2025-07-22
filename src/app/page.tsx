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

const Underline = () => (
    <svg className="w-full h-auto" width="212" height="23" viewBox="0 0 212 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path id="Vector" opacity="0.8" d="M104.432 18.7571C104.269 17.3108 105.837 17.951 106.608 17.8966C113.128 17.4314 120.154 17.5422 126.725 17.5124C144.042 17.4477 161.455 16.4179 178.623 13.8855C188.616 12.4141 198.464 9.4302 208.45 7.91778L207.89 6.41228L209.643 4.62036L207.124 3.80698L207.724 2.18291C206.155 2.92602 204.083 3.25776 202.595 3.98301C202.122 4.21339 202.221 5.22447 201.218 5.64504C196.911 7.43937 190.946 8.08454 186.473 7.48564L189.005 9.07277L162.698 12.008L170.25 13.5096L152.672 12.9859L154.52 11.3241C149.609 11.5396 144.659 11.3029 139.748 11.5266C133.808 11.8008 119.937 11.0905 115.435 12.1224C113.835 12.4873 113.486 14.5187 110.331 14.6137C92.5694 15.1224 73.4645 14.1308 55.6863 12.1697C44.3667 10.9218 33.1483 7.88538 21.9884 5.33381L23.8228 2.84884C19.5664 3.90949 4.90116 -1.75238 2.13925 1.55535C1.12422 2.76657 -1.15525 11.9122 1.17919 12.9839L25.6108 16.042C30.3196 14.636 34.3911 15.6123 39.1076 15.7624L32.8666 17.4992C40.9045 16.234 48.6821 16.9989 56.7198 17.9323C56.7444 19.3728 53.9931 18.8845 53.2579 18.8394C49.2927 18.5776 45.0345 17.3246 41.0182 17.3766C41.7923 19.3396 44.8558 19.3614 46.4676 19.6468C55.615 21.2364 64.1024 19.0908 73.0708 20.1236L69.3399 21.8175C71.7325 21.8837 74.1505 21.5955 76.5502 21.711C113.092 23.4263 150.561 20.6383 186.92 14.8885C193.273 13.8827 202.772 13.6137 208.647 10.9939C209.83 10.4632 212.626 8.78523 210.632 7.08187C209.179 8.71227 207.243 8.92645 205.462 9.37675C167.192 18.9632 127.883 19.8723 89.1182 20.7062C86.1818 20.7728 83.2432 20.7159 80.3075 20.8236L87.7837 19.0081C98.5116 18.3147 109.112 20.0853 119.832 19.3179C120.604 19.2636 122.171 19.9038 122.008 18.4574L104.438 18.757L104.432 18.7571ZM104.404 17.1026C99.2773 17.2065 94.138 17.2941 89.0043 17.3405C87.5169 17.3494 86.1834 18.2944 84.6833 18.2952C81.0617 18.3076 77.3155 15.4237 73.368 17.673L59.1815 15.4201C66.3948 14.7537 73.3967 16.4128 80.5167 15.0563L79.9107 16.6969C87.3205 16.8752 94.7884 16.048 102.2 16.3168C102.966 16.3449 104.524 15.6596 104.397 17.0945L104.404 17.1026ZM141.684 13.1815C144.835 12.7984 148.233 13.3086 151.411 13.0157L140.489 14.8899L136.998 14.0931C138.675 14.8632 140.551 13.3244 141.691 13.1814L141.684 13.1815ZM135.737 14.1063L116.284 14.4381L116.27 13.6149L135.723 13.2832L135.737 14.1063ZM52.8781 13.8643L45.7294 13.9039L27.7142 10.193C33.0593 9.29491 38.0219 12.8332 43.6882 11.625L52.8781 13.8643Z" fill="#DB8E08"/>
    </svg>
)

export default function Home() {
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

            <h1 className="font-merriweather text-4xl sm:text-5xl md:text-[56px] font-bold max-w-4xl leading-tight text-[#1B1B1B]">
              Revolutionizing Football <span className="relative inline-block text-[#F2A725]">
            Scouting
            <span className="absolute -bottom-2 sm:-bottom-3 md:-bottom-4 left-0 w-full">
              <Underline />
            </span>
          </span> with Data & Insights
            </h1>
            
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
