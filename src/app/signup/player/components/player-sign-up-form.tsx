// src/app/signup/player/components/player-sign-up-form.tsx
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const GoogleIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.8182 10.1818H22V12H12V2H13.8182V10.1818H21.8182Z" fill="#FFC107"/>
        <path d="M2.18182 11.8182H2V10H12V22H10.1818V11.8182H2.18182Z" fill="#FF3D00"/>
        <path d="M12 22V21.8182H3.89636C3.10273 21.3155 2.5 20.4545 2.5 19.4545V14.2273H12V22Z" fill="#4CAF50"/>
        <path d="M2 12V11.8182H10.1036C10.8973 11.3155 11.5 10.4545 11.5 9.45455V4.22727H2V12Z" fill="#1976D2"/>
    </svg>
)

const Logo = () => (
    <Link href="/" className="flex items-center gap-1.5" aria-label="ScoutFlair Home">
        <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.6148 28.5524L0.260849 14.228C-3.08053 10.8961 -3.08053 5.43254 0.260849 2.10061C3.60223 -1.23132 10.1691 -1.23132 13.5105 2.10061L27.8644 16.4251C31.2058 19.757 31.2058 25.211 27.8644 28.5524C24.523 31.8843 17.9562 31.8843 14.6148 28.5524Z" fill="#083162"/>
            <path d="M0.000672483 16.2918L13.6083 29.8784C10.2283 32.934 4.5458 32.8124 0.247192 28.5138C-4.04945 24.2227 -4.18432 18.5544 0.000672483 16.2918Z" fill="#F2A725"/>
            <path d="M28.8418 15.3094L14.4878 0.984955C17.8679 -2.08389 24.3347 -1.95612 28.6333 2.34249C32.9299 6.63363 33.0648 12.3019 28.8418 15.3094Z" fill="#F2A725"/>
        </svg>
        <span className="text-xl font-bold tracking-tight text-[#1B1B1B]/80">ScoutFlair</span>
    </Link>
);


export function PlayerSignUpForm() {
    const [date, setDate] = useState<Date>();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
    return (
        <div className="flex flex-col gap-8 w-full py-8">
            <header className="flex justify-between items-center">
                <Logo />
                <p className="text-sm">
                    <span className="text-gray-600">Member already? </span>
                    <Link href="/signin" className="font-semibold text-[#083162] hover:underline">
                        Sign In
                    </Link>
                </p>
            </header>

            <div className="space-y-6">
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-[#1B1B1B]">Create an account</h1>
                    <p className="text-[#1B1B1B]/70">Register Your Skills: Show the world what you’ve got</p>
                </div>
                <Button variant="outline" className="w-full h-11 shadow-sm bg-white">
                    <GoogleIcon />
                    <span className="font-medium text-base">Sign up with Google</span>
                </Button>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex-grow h-px bg-gray-300"></div>
                <span className="text-sm text-gray-500">Or</span>
                <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            <form className="space-y-6">
                <div className="space-y-2">
                    <label className="text-base font-semibold text-[#1B1B1B]">Full Name:</label>
                    <Input placeholder="Enter full name" className="h-11"/>
                </div>
                <div className="space-y-2">
                    <label className="text-base font-semibold text-[#1B1B1B]">Position:</label>
                    <Select>
                        <SelectTrigger className="w-full h-11">
                            <SelectValue placeholder="Choose" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="striker">Striker</SelectItem>
                            <SelectItem value="midfielder">Midfielder</SelectItem>
                            <SelectItem value="defender">Defender</SelectItem>
                            <SelectItem value="goalkeeper">Goalkeeper</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <label className="text-base font-semibold text-[#1B1B1B]">Preferred Foot:</label>
                     <Select>
                        <SelectTrigger className="w-full h-11">
                            <SelectValue placeholder="Choose" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="left">Left</SelectItem>
                            <SelectItem value="right">Right</SelectItem>
                            <SelectItem value="both">Both</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="space-y-2">
                    <label className="text-base font-semibold text-[#1B1B1B]">Date of Birth:</label>
                    <Popover>
                        <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                            "w-full justify-start text-left font-normal h-11",
                            !date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>DD/MM/YYYY</span>}
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                        />
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="space-y-2">
                    <label className="text-base font-semibold text-[#1B1B1B]">Email Address:</label>
                    <Input type="email" placeholder="Enter email address" className="h-11" />
                </div>
                 <div className="space-y-2">
                    <label className="text-base font-semibold text-[#1B1B1B]">Password:</label>
                    <div className="relative">
                        <Input type={showPassword ? "text" : "password"} placeholder="Enter password" className="h-11 pr-10" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3">
                            {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                        </button>
                    </div>
                </div>
                 <div className="space-y-2">
                    <label className="text-base font-semibold text-[#1B1B1B]">Confirm Password:</label>
                     <div className="relative">
                        <Input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm password" className="h-11 pr-10" />
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3">
                            {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                        </button>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Checkbox id="terms" className="rounded-[4px] border-gray-400 data-[state=checked]:bg-[#192B4D] data-[state=checked]:border-[#192B4D]"/>
                    <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none text-gray-600"
                    >
                        I agree to Scoutflair <Link href="#" className="text-[#083162] hover:underline">Terms and conditions.</Link>
                    </label>
                </div>

                <Button type="submit" className="w-full bg-[#192B4D] hover:bg-[#192B4D]/90 h-11 text-base font-semibold">
                    Create an Account
                </Button>
            </form>
        </div>
    );
}
