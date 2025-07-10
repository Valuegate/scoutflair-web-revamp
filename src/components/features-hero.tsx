import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function FeaturesHero() {
  return (
    // We've increased the bottom padding here (pb-32 sm:pb-40)
    // to create more space below the button.
    <section className="bg-[#192B4D] text-white pt-16 sm:pt-20 pb-32 sm:pb-40 relative z-10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center text-center gap-8 sm:gap-10 max-w-4xl mx-auto">
          <div className="flex flex-col gap-4 sm:gap-6">
            <h1 className="font-merriweather text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight px-4">
              Everything You Need to Succeed in One Platform.
            </h1>
            <p className="font-lato text-base sm:text-lg md:text-xl text-white/80 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed px-4">
              From player scouting to performance tracking and seamless connections—unlock every tool you need to advance your football career in one powerful platform
            </p>
          </div>
          
          <div className="flex justify-center pt-4">
            <Button asChild className="bg-[#E5AA42] text-[#1B1B1B] font-poppins font-semibold rounded-full px-8 sm:px-10 py-4 sm:py-6 h-auto text-sm sm:text-base hover:bg-[#E5AA42]/90 hover:scale-105 transition-all duration-300 shadow-2xl border-2 border-[#E5AA42] hover:border-[#E5AA42]/90">
              <Link href="/scouting-report">UNLOCK OPPORTUNITIES</Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#E5AA42]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#E5AA42]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}