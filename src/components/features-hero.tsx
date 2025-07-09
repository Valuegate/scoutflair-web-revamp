import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function FeaturesHero() {
  return (
    <section className="bg-[#192B4D] text-white pt-20 pb-16">
      <div className="container">
        <div className="flex flex-col items-center text-center gap-8 max-w-3xl mx-auto">
          <div className="flex flex-col gap-4">
            <h1 className="font-merriweather text-4xl md:text-[42px] font-bold leading-tight">
              Everything You Need to Succeed in One Platform.
            </h1>
            <p className="font-lato text-lg text-white/90 max-w-2xl mx-auto">
              From player scouting to performance tracking and seamless connections—unlock every tool you need to advance your football career in one powerful platform
            </p>
          </div>
          <Button asChild className="bg-[#E5AA42] text-[#1B1B1B] font-poppins font-semibold rounded-full px-8 h-11 text-sm hover:bg-[#E5AA42]/90 shadow-lg">
            <Link href="#">UNLOCK OPPORTUNITIES</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
