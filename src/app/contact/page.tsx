import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CtaSection } from "@/components/cta-section";
import { ContactInfo } from "@/components/contact-info";
import { TestimonialsSection } from "@/components/testimonials-section";
import { FaqSection } from "@/components/faq-section";

export default function ContactPage() {
  return (
    <>
      <main className="py-12 md:py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-10 xl:gap-20">
            {/* Left Column: Form */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border">
              <div className="flex flex-col gap-8 h-full">
                {/* Header */}
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 py-1.5 px-4">
                    <div className="w-1.5 h-1.5 bg-[#041931] rounded-full"></div>
                    <span className="font-merriweather text-sm text-[#192B4D]">Get in touch</span>
                  </div>
                  <h1 className="font-manrope text-3xl md:text-4xl font-bold text-foreground leading-tight">
                    Scouting Talent? Chasing Dreams? Let’s Talk
                  </h1>
                  <p className="text-lg text-foreground/80">
                    Whether you're scouting the next big star or chasing your football dreams, we're here to help. Reach out and let's make it happen!
                  </p>
                </div>

                <div className="border-t border-gray-200"></div>

                {/* Form */}
                <form className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="first-name" className="font-lato text-base text-foreground/90">First Name:</label>
                      <Input id="first-name" name="first-name" className="h-11 border-primary/20 focus-visible:border-primary" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="last-name" className="font-lato text-base text-foreground/90">Last Name:</label>
                      <Input id="last-name" name="last-name" className="h-11 border-primary/20 focus-visible:border-primary" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="font-lato text-base text-foreground/90">Email Address:</label>
                    <Input id="email" name="email" type="email" className="h-11 border-primary/20 focus-visible:border-primary" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="font-lato text-base text-foreground/90">Message:</label>
                    <Textarea id="message" name="message" className="min-h-[150px] border-primary/20 focus-visible:border-primary" />
                  </div>
                  <Button type="submit" size="lg" variant="outline" className="w-full border-[#E5AA42] text-foreground hover:bg-[#E5AA42]/10 h-12 font-poppins font-medium text-base">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>

            {/* Right Column: Info */}
            <ContactInfo />

          </div>
        </div>
      </main>
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
