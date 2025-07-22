import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Facebook, Instagram, Linkedin, Twitter, Copyright } from 'lucide-react';

const FooterLogo = () => (
  <Link href="/" className="flex items-center gap-2" aria-label="ScoutFlair Home">
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.2934 38.3812L2.3668 20.4818C-2.24548 15.8869 -2.24548 8.42738 2.3668 3.83246C6.97908 -0.770729 14.4451 -0.770729 19.0573 3.83246L36.9839 21.7236C41.5961 26.3268 41.5961 33.778 36.9839 38.3812C32.3716 42.9762 24.9056 42.9762 20.2934 38.3812Z" fill="#083162"/>
        <path d="M1.86146 21.591L19.1908 38.8861C14.3711 43.1747 6.97148 43.0174 2.3509 38.3976C-2.27798 33.7861 -2.44389 26.4012 1.86146 21.591Z" fill="#F2A725"/>
        <path d="M37.6402 20.4732L20.3109 3.16982C25.1306 -1.11877 32.5302 -0.961468 37.1507 3.65828C41.7796 8.27804 41.9456 15.663 37.6402 20.4732Z" fill="#F2A725"/>
    </svg>
    <span className="text-2xl font-bold text-white">ScoutFlair</span>
  </Link>
);

const MailIcon = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
        <path d="M1.16669 2.33333H12.8334V11.6667H1.16669V2.33333Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M1.16669 2.33333L7.00002 8.16667L12.8334 2.33333" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const SendIcon = () => (
  <svg width="24" height="24" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <path d="M36.1484 15.4444C37.0992 15.1122 38.0126 16.0256 37.6804 16.9764L32.1355 32.8203C31.7752 33.8479 30.3433 33.9059 29.9016 32.9111L27.226 26.8917L30.9919 23.1249C31.1158 22.9919 31.1833 22.8159 31.1801 22.634C31.1769 22.4522 31.1032 22.2787 30.9747 22.1501C30.8461 22.0215 30.6726 21.9478 30.4907 21.9446C30.3089 21.9414 30.1329 22.0089 29.9999 22.1329L26.2331 25.8988L20.2137 23.2232C19.2189 22.7805 19.2778 21.3496 20.3045 20.9893L36.1484 15.4444Z" fill="#192B4D"/>
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-[#041931] text-white">
        <div className="container py-8 md:py-12">
            <Separator className="bg-white/20" />
            <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-12">
                <div className="flex flex-col gap-6 xl:col-span-2">
                    <FooterLogo />
                    <p className="text-sm font-lato text-white/80 max-w-sm">
                        Scoutflair is a dynamic football scouting platform designed to bridge the gap between talent and opportunity. Talent meets opportunity.
                    </p>
                    <div className="flex flex-col gap-2 text-sm font-lato">
                        <p className="text-white/80">+2348123926919</p>
                        <a href="mailto:support@scoutflair.com" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                            <MailIcon />
                            <span>support@scoutflair.com</span>
                        </a>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-lato text-white/90">Follow us</span>
                        <div className="flex items-center gap-3">
                            <a href="#" aria-label="Facebook" className="text-white/80 hover:text-white transition-colors"><Facebook className="w-4 h-4"/></a>
                            <a href="#" aria-label="LinkedIn" className="text-white/80 hover:text-white transition-colors"><Linkedin className="w-4 h-4"/></a>
                            <a href="#" aria-label="Instagram" className="text-white/80 hover:text-white transition-colors"><Instagram className="w-4 h-4"/></a>
                            <a href="#" aria-label="Twitter" className="text-white/80 hover:text-white transition-colors"><Twitter className="w-4 h-4"/></a>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <h3 className="font-merriweather font-bold text-lg text-white/90">Quick Links</h3>
                    <nav className="flex flex-col gap-3 font-lato text-white/80">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <Link href="/about" className="hover:text-white transition-colors">About</Link>
                        <Link href="/features" className="hover:text-white transition-colors">Features</Link>
                        <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
                    </nav>
                </div>

                <div className="flex flex-col gap-4">
                    <h3 className="font-merriweather font-bold text-lg text-white/90">Resources</h3>
                    <nav className="flex flex-col gap-3 font-lato text-white/80">
                        <Link href="/faq" className="hover:text-white transition-colors">F. A. Q</Link>
                        <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms & Conditions</Link>
                    </nav>
                </div>

                <div className="flex flex-col gap-6">
                    <h3 className="font-merriweather font-bold text-lg text-white/90">Get Exclusive Updates</h3>
                    <p className="font-lato text-base text-white/80">
                        Join our newsletter for the latest scouting opportunities, highlights, and expert insights
                    </p>
                    <form className="flex items-center">
                        <Input 
                            type="email" 
                            placeholder="Enter your email addresss" 
                            className="bg-transparent border-white/50 rounded-r-none h-11 placeholder:text-gray-400 focus-visible:ring-offset-0 focus-visible:ring-white/80"
                        />
                        <Button type="submit" size="icon" className="bg-white hover:bg-gray-200 rounded-l-none h-11 w-11 shrink-0">
                            <SendIcon />
                        </Button>
                    </form>
                </div>

            </div>
            <Separator className="bg-white/20" />
            <div className="pt-6 flex justify-center items-center gap-2">
                <Copyright className="w-4 h-4" />
                <p className="text-sm font-lato text-white/80">&copy; Copyright {new Date().getFullYear()}, All Right Reserved. Scoutflair</p>
            </div>
        </div>
    </footer>
  );
}
