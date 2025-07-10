'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/features', label: 'Features' },
  { href: '/contact', label: 'Contact Us' },
];

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white">
      <div className="h-8 bg-[#192B4D]"></div>
      <div className="shadow-[0_2px_6px_rgba(0,0,0,0.08)]">
        <div className="container flex h-[76px] items-center justify-between">
          <Logo />

          <div>
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-[80px]">
              <nav className="flex items-center gap-6">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        'flex items-center gap-2 font-roboto text-lg font-medium italic',
                        isActive ? 'text-[#1B1B1B]' : 'text-[#333333] opacity-[0.66]'
                      )}
                    >
                      {isActive && <div className="h-2 w-2 rounded-full bg-[#041931]"></div>}
                      <span>{link.label}</span>
                    </Link>
                  )
                })}
              </nav>
              <div className="flex items-center gap-6">
                <Link href="#" className="font-poppins text-base font-semibold text-[#041931] hover:opacity-80 transition-opacity">
                  Sign In
                </Link>
                <Button asChild className="rounded-[20px] bg-[#041931] px-6 h-auto text-base font-poppins font-semibold text-white hover:bg-[#041931]/90">
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            </div>
            
            {/* Mobile Navigation */}
            <div className="md:hidden">
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <div className="p-4">
                    <Logo />
                    <nav className="mt-8 flex flex-col gap-4">
                      {navLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={cn(
                            'font-roboto text-lg font-medium italic',
                            pathname === link.href ? 'text-primary' : 'text-muted-foreground'
                          )}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </nav>
                    <Separator className="my-4" />
                    <div className="flex flex-col gap-4">
                          <Link href="#" onClick={() => setIsMenuOpen(false)} className="font-poppins text-base font-semibold text-center text-[#041931]">
                              Sign In
                          </Link>
                          <Button asChild className="rounded-[20px] bg-[#041931] text-base font-poppins font-semibold text-white hover:bg-[#041931]/90">
                              <Link href="/signup" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                          </Button>
                      </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
