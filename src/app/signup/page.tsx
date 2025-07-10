// src/app/signup/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const roles = [
    {
        name: 'For Players',
        description: 'Showcase your exceptional skills, connect with top scouts, and kickstart your professional career.',
        image: '/images/Frame_2121457625_1737_2020.png',
        hint: 'football player portrait',
        href: '/signup/player',
    },
    {
        name: 'For Coaches',
        description: 'Discover promising talent, build your winning team, and lead with unwavering confidence.',
        image: '/images/Frame_2121457625_1737_2039.png',
        hint: 'football coach portrait',
        href: '/signup/coach',
    },
    {
        name: 'For Scouts',
        description: 'Find outstanding players, track rising potential, and uncover the next big soccer star.',
        image: '/images/Frame_2121457625_1737_2058.png',
        hint: 'football scout portrait',
        href: '/signup/scout',
    },
];

const RoleCard = ({ role, className }: { role: typeof roles[0], className?: string }) => (
    <Link href={role.href} className={cn(
        "group relative bg-white rounded-xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl w-full max-w-sm mx-auto",
        className
    )}>
        <CheckCircle2 className="absolute top-4 right-4 w-6 h-6 text-gray-300 group-hover:text-primary transition-colors" />
        <div className="relative w-40 h-40 mb-6">
            <Image
                src={role.image}
                alt={role.name}
                width={160}
                height={160}
                className="rounded-full object-cover border-4 border-gray-100 group-hover:border-primary/20 transition-colors"
                data-ai-hint={role.hint}
            />
        </div>
        <div className="flex flex-col items-center gap-4 flex-grow">
            <h2 className="font-manrope text-2xl font-bold text-[#192B4D]">
                {role.name}
            </h2>
            <p className="font-lato text-base text-black/80 leading-relaxed">
                {role.description}
            </p>
        </div>
        <div className="mt-6 flex flex-col items-center gap-2">
            <Button className="rounded-full bg-[#041931] hover:bg-[#041931]/90 h-11 px-8 font-poppins text-base font-semibold">
                <span>Dive In</span>
                <ArrowRight className="w-4 h-4" />
            </Button>
            <p className="font-lato text-xs text-black/70">Step Into Your Story</p>
        </div>
    </Link>
);

export default function SignUpPage() {
    return (
        <div className="relative min-h-screen w-full flex items-center justify-center p-4 bg-cover bg-center bg-[url('/images/background-texture.png')] bg-[#192B4D]">
            <div className="absolute inset-0 bg-[#192B4D]/60 backdrop-blur-sm" />
            
            <div className="relative z-10 w-full rounded-2xl bg-cover bg-center bg-[#192B4D] bg-[url('/images/background-texture.png')]">
                <div className="bg-[#192B4D]/90 rounded-2xl p-6 md:p-12">
                     <div className="flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-12 w-full">
                        {roles.map((role) => (
                            <RoleCard key={role.name} role={role} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
