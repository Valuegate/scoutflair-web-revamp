import { Radar } from 'lucide-react';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="ScoutVerse Home">
      <Radar className="h-8 w-8 text-primary" />
      <span className="text-xl font-bold tracking-tight">ScoutVerse</span>
    </Link>
  );
}
