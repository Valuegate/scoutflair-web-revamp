import Image from 'next/image';

export function OurDreamSection() {
  return (
    <section className="py-12 md:py-20">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Column */}
          <div className="bg-[#192B4D] text-white p-6 md:p-12 rounded-2xl h-full flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/80 py-1.5 px-4 mb-6 self-start">
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              <span className="font-merriweather text-sm">Our Dream</span>
            </div>
            <h2 className="font-manrope text-3xl md:text-4xl lg:text-[40px] font-bold leading-tight mb-6">
              From the Streets to the Stadium – Making Dreams Reality
            </h2>
            <p className="font-lato text-lg opacity-95">
              Our dream is to create a world where every talented footballer, no matter where they come from, has the opportunity to be seen and succeed. We bridge the gap between grassroots passion and professional opportunities, using data-driven scouting and innovation to connect players with the right clubs and scouts. By leveling the playing field, we help turn raw potential into thriving football careers, ensuring that no talent goes unnoticed.
            </p>
          </div>

          {/* Right Column */}
          <div className="grid gap-5">
            <Image
              src="/images/Frame_2121457557_1617_1634.png"
              alt="Football players in a huddle."
              width={640}
              height={289}
              className="w-full h-auto rounded-2xl object-cover"
              data-ai-hint="football huddle professional"
            />
            <Image
              src="/images/Frame_2121457558_1617_1635.png"
              alt="A young football player kicking a ball on a dirt field."
              width={640}
              height={289}
              className="w-full h-auto rounded-2xl object-cover"
              data-ai-hint="young footballer street"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
