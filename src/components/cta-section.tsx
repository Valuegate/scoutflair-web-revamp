import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export function CtaSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="relative rounded-2xl bg-[#192B4D] bg-[url('https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/07/LAst_CTA_1617_1696.png')] bg-cover bg-center p-8 md:p-16 text-center text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 flex flex-col items-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <p className="font-manrope font-bold text-lg opacity-90">
                The Bridge Between Talent and Triumph!
              </p>
              <h2 className="text-4xl md:text-5xl font-manrope font-bold max-w-4xl leading-tight">
                Where Talent Meets Opportunity—Play Hard, Get Noticed!
              </h2>
              <p className="text-lg md:text-xl font-lato max-w-4xl opacity-90 leading-relaxed mt-2">
                Scoutflair is where passionate players, dedicated scouts, and visionary coaches connect. Showcase your skills, discover top talent, and take your football journey to the next level
              </p>
            </div>
            <Button
              asChild
              className="rounded-full bg-transparent hover:bg-white/10 border-white/80 border h-14 px-12 text-lg font-poppins font-semibold shadow-[0_4px_12px_2px_rgba(0,0,0,0.15)] transition-all hover:border-white"
            >
              <Link href="#">GET STARTED</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
