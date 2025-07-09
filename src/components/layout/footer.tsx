import { Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              The future of sports scouting, powered by AI.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Platform</h3>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">About Us</Link>
            <Link href="/features" className="text-sm text-muted-foreground hover:text-primary">Features</Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact Us</Link>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Resources</h3>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Blog</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Help Center</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link>
          </div>
          <div className="flex flex-col gap-2">
             <h3 className="font-semibold">Follow Us</h3>
             <div className="flex gap-2">
                <Button variant="ghost" size="icon" asChild>
                  <a href="#" aria-label="Twitter"><Twitter className="h-4 w-4" /></a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href="#" aria-label="GitHub"><Github className="h-4 w-4" /></a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href="#" aria-label="LinkedIn"><Linkedin className="h-4 w-4" /></a>
                </Button>
             </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ScoutVerse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
