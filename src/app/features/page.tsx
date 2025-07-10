
import { CtaSection } from "@/components/cta-section";
import { FeaturesHero } from "@/components/features-hero";
import { HowItWorks } from "@/components/how-it-works";
import { CoreFeatures } from "@/components/core-features";
import { TestimonialsSection } from "@/components/testimonials-section";

export default function FeaturesPage() {
  return (
    <div className="bg-[#F8F8FF]">
      <FeaturesHero />
      <HowItWorks />
      <div className="bg-white">
        <CoreFeatures />
      </div>
      <TestimonialsSection />
      <CtaSection />
    </div>
  );
}
