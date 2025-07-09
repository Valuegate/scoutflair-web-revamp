import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

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

const FacebookIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
        <path d="M14.6667 1.33333C14.6667 1.33333 11.918 1.33333 8.00004 1.33333C4.08204 1.33333 1.33337 4.08267 1.33337 8V14.6667H5.33337V8C5.33337 6.04267 6.04204 5.33333 8.00004 5.33333C9.95804 5.33333 10.6667 6.04267 10.6667 8V14.6667H14.6667V8C14.6667 4.08267 11.918 1.33333 8.00004 1.33333C4.08204 1.33333 1.33337 4.08267 1.33337 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const LinkedinIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
        <path d="M8 15.68C12.24 15.68 15.68 12.24 15.68 8C15.68 3.76 12.24 0.32 8 0.32C3.76 0.32 0.32 3.76 0.32 8C0.32 12.24 3.76 15.68 8 15.68Z" fill="white"/>
        <path d="M6 6.8H4V12H6V6.8Z" fill="#041931"/>
        <path d="M5 5.6C5.55228 5.6 6 5.15228 6 4.6C6 4.04772 5.55228 3.6 5 3.6C4.44772 3.6 4 4.04772 4 4.6C4 5.15228 4.44772 5.6 5 5.6Z" fill="#041931"/>
        <path d="M8.2002 6.8H9.8002V7.6H9.8402C10.0935 7.14216 10.4901 6.75771 10.9635 6.49528C11.4369 6.23285 11.9662 6.09961 12.5002 6.09961V7.79961C11.8002 7.79961 11.2002 8.19961 10.8002 8.59961C10.4002 8.99961 10.2002 9.49961 10.2002 10.1996V11.9996H8.2002V6.8Z" fill="#041931"/>
    </svg>
);

const InstagramIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
        <path d="M12 1.33333H4C2.52733 1.33333 1.33333 2.52733 1.33333 4V12C1.33333 13.4727 2.52733 14.6667 4 14.6667H12C13.4727 14.6667 14.6667 13.4727 14.6667 12V4C14.6667 2.52733 13.4727 1.33333 12 1.33333Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10.9333 8.36C10.9333 9.984 9.64399 11.2733 7.99999 11.2733C6.35599 11.2733 5.06666 9.984 5.06666 8.36C5.06666 6.736 6.35599 5.44667 7.99999 5.44667C9.64399 5.44667 10.9333 6.736 10.9333 8.36Z" stroke="white" strokeWidth="1.5"/>
        <path d="M11.6667 4.33333H11.6727" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const TwitterIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
        <path d="M13.9999 1.66667L7.33325 8.33334L1.33325 1.66667" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M1.33325 14.3333L7.99992 7.66666L11.3333 11L14.6666 14.3333L7.99992 7.66666L1.33325 14.3333Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const SendIcon = () => (
    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
        <path d="M8.24375 1.18542L17.7937 10.7354L10.7437 17.7854L1.19375 8.23542L8.24375 1.18542Z" stroke="#192B4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17.7937 1.18542L10.7437 8.23542" stroke="#192B4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const CopyrightIcon = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
        <path d="M7 13.2708C10.4635 13.2708 13.2708 10.4635 13.2708 7C13.2708 3.53646 10.4635 0.729167 7 0.729167C3.53646 0.729167 0.729167 3.53646 0.729167 7C0.729167 10.4635 3.53646 13.2708 7 13.2708Z" stroke="white" strokeWidth="1.5"/>
        <path d="M6.02083 8.75C6.46354 9.19271 7.04375 9.45833 7.65625 9.45833C8.88125 9.45833 9.875 8.46458 9.875 7.23958C9.875 6.01458 8.88125 5.02083 7.65625 5.02083C7.04375 5.02083 6.46354 5.28646 6.02083 5.72917" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
)

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
                            <a href="#" aria-label="Facebook" className="text-white/80 hover:text-white transition-colors"><FacebookIcon/></a>
                            <a href="#" aria-label="LinkedIn" className="text-white/80 hover:text-white transition-colors"><LinkedinIcon/></a>
                            <a href="#" aria-label="Instagram" className="text-white/80 hover:text-white transition-colors"><InstagramIcon/></a>
                            <a href="#" aria-label="Twitter" className="text-white/80 hover:text-white transition-colors"><TwitterIcon/></a>
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
                <CopyrightIcon />
                <p className="text-sm font-lato text-white/80">&copy; Copyright {new Date().getFullYear()}, All Right Reserved. Scoutflair</p>
            </div>
        </div>
    </footer>
  );
}
