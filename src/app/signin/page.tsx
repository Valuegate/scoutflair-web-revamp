// src/app/signin/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const roles = [
    {
        name: 'For Players',
        description: 'Access your profile, track your progress, and connect with scouts.',
        image: '/images/Frame_2121457625_I1737_2116;1737_2020.png',
        hint: 'football player portrait',
        href: '/signin/player',
    },
    {
        name: 'For Coaches',
        description: 'Manage your prospects, review talent, and build your winning team.',
        image: '/images/Frame_2121457625_I1741_2667;1737_2039.png',
        hint: 'football coach portrait',
        href: '/signin/coach',
    },
    {
        name: 'For Scouts',
        description: 'Continue your search for the next soccer star and manage your watchlist.',
        image: '/images/Frame_2121457625_I1741_2700;1737_2058.png',
        hint: 'football scout portrait',
        href: '/signin/scout',
    },
];

const RoleCard = ({ role, className, isSelected, onClick }: {
    role: typeof roles[0],
    className?: string,
    isSelected: boolean,
    onClick: () => void
}) => (
    <Link
        href={role.href}
        onClick={onClick}
        className={cn(
            "group bg-white rounded-2xl p-6 md:p-8 flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl w-full max-w-sm mx-auto h-full",
            className
        )}>
        <div className="relative w-32 h-32 md:w-40 md:h-40 mb-6">
            <Image
                src={role.image}
                alt={role.name}
                width={160}
                height={160}
                className="rounded-full object-cover w-full h-full"
                data-ai-hint={role.hint}
            />
            <div className={cn(
                "absolute top-1 right-1 rounded-full p-1.5 border-2 border-white flex items-center justify-center transition-colors duration-300",
                isSelected ? "bg-[#192B4D]" : "bg-gray-300"
            )}>
                <Check className={cn(
                    "w-4 h-4 transition-colors duration-300",
                    isSelected ? "text-white" : "text-gray-500"
                )} strokeWidth={3} />
            </div>
        </div>
        <div className="flex flex-col items-center gap-4 flex-grow">
            <h2 className="font-manrope text-xl md:text-2xl font-bold text-[#192B4D]">
                {role.name}
            </h2>
            <p className="font-lato text-base text-black/80 leading-relaxed">
                {role.description}
            </p>
        </div>
        <div className="mt-6 flex flex-col items-center gap-2">
            <Button className="rounded-full bg-[#041931] hover:bg-[#041931]/90 h-11 px-8 font-poppins text-base font-semibold flex items-center justify-center gap-2">
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
            </Button>
            <p className="font-lato text-xs text-black/70">Continue Your Journey</p>
        </div>
    </Link>
);

export default function SignInPage() {
    const [selectedRole, setSelectedRole] = useState<string | null>(null);

    useEffect(() => {
        const storedRole = localStorage.getItem('selectedSignInRole');
        if (storedRole && roles.some(r => r.name === storedRole)) {
            setSelectedRole(storedRole);
        }
    }, []);

    const handleRoleClick = (roleName: string) => {
        setSelectedRole(roleName);
        localStorage.setItem('selectedSignInRole', roleName);
    };
    
    return (
        <div className="relative min-h-screen w-full flex items-center justify-center p-4 bg-cover bg-center bg-[url('/images/Onboarding_Select_1736_1803.png')]">
            <div className="relative z-10 w-full max-w-6xl mx-auto rounded-2xl bg-cover bg-center bg-[#192B4D]/90 bg-[url('/images/Color_frame_1736_1900.png')] p-6 md:p-12 lg:p-16">
                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
                    {roles.map((role) => (
                        <RoleCard
                            key={role.name}
                            role={role}
                            isSelected={selectedRole === role.name}
                            onClick={() => handleRoleClick(role.name)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
