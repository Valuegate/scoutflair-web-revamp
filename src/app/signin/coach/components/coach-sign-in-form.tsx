// src/app/signin/coach/components/coach-sign-in-form.tsx
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

const GoogleIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25C22.56 11.45 22.49 10.68 22.36 9.92H12V14.45H18.42C18.13 15.99 17.22 17.31 15.82 18.22V20.77H19.5C21.56 18.91 22.56 15.89 22.56 12.25Z" fill="#4285F4"/>
        <path d="M12 23C15.24 23 17.95 21.92 19.5 20.24L15.82 17.69C14.71 18.44 13.46 18.88 12 18.88C9.38 18.88 7.15 17.15 6.34 14.88H2.5V17.52C4.34 20.86 7.89 23 12 23Z" fill="#34A853"/>
        <path d="M6.34 14.88C6.12 14.25 6 13.57 6 12.88C6 12.19 6.12 11.51 6.34 10.88V8.33H2.5C1.62 10.03 1 11.9 1 14.88C1 17.86 1.62 19.73 2.5 21.43L6.34 18.88V14.88Z" fill="#FBBC05"/>
        <path d="M12 6.88C13.56 6.88 14.88 7.42 15.85 8.33L19.58 4.59C17.95 2.92 15.24 1.75 12 1.75C7.89 1.75 4.34 4.14 2.5 7.48L6.34 10.03C7.15 7.76 9.38 6.88 12 6.88Z" fill="#EA4335"/>
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


export function CoachSignInForm() {
    const [showPassword, setShowPassword] = useState(false);
  
    return (
        <div className="flex flex-col gap-8 w-full py-8">
            <header className="flex justify-between items-center">
                <Logo />
                <p className="text-sm">
                    <span className="text-gray-600">Are you new here? </span>
                    <Link href="/signup" className="font-semibold text-[#083162] hover:underline">
                        Sign Up
                    </Link>
                </p>
            </header>

            <div className="space-y-6 mt-16">
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-[#1B1B1B]">Sign in</h1>
                    <p className="text-[#1B1B1B]/70">Welcome back, Coach! Let's find some talent.</p>
                </div>
                <Button variant="outline" className="w-full h-11 shadow-sm bg-white flex items-center gap-2">
                    <GoogleIcon />
                    <span className="font-medium text-base text-[#1B1B1B]">Sign in with Google</span>
                </Button>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex-grow h-px bg-gray-300"></div>
                <span className="text-sm text-gray-500">Or</span>
                <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            <form className="space-y-6">
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

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="remember" className="rounded-[4px] border-gray-400 data-[state=checked]:bg-[#192B4D] data-[state=checked]:border-[#192B4D]"/>
                        <label
                            htmlFor="remember"
                            className="text-sm font-medium leading-none text-gray-600"
                        >
                            Remember me
                        </label>
                    </div>
                    <Link href="#" className="text-sm font-semibold text-[#083162] hover:underline">
                        Forgot Password?
                    </Link>
                </div>

                <Button type="submit" className="w-full bg-[#192B4D] hover:bg-[#192B4D]/90 h-11 text-base font-semibold">
                    Sign In
                </Button>
            </form>
        </div>
    );
}
