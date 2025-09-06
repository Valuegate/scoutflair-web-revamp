// src/app/signin/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const roles = [
  {
    name: 'For Players',
    description: 'Access your profile, track your progress, and connect with scouts.',
    image: '/images/Frame_2121457625_I1737_2116;1737_2020.png',
    hint: 'football player portrait',
    href: '/signin/player',
    dashboardRoute: '/signin/player/dashboard',
  },
  {
    name: 'For Coaches',
    description: 'Manage your prospects, review talent, and build your winning team.',
    image: '/images/Frame_2121457625_I1741_2667;1737_2039.png',
    hint: 'football coach portrait',
    href: '/signin/coach',
    dashboardRoute: '/signin/coach/dashboard',
  },
  {
    name: 'For Scouts',
    description: 'Continue your search for the next soccer star and manage your watchlist.',
    image: '/images/Frame_2121457625_I1741_2700;1737_2058.png',
    hint: 'football scout portrait',
    href: '/signin/scout',
    dashboardRoute: '/signin/scout/dashboard',
  },
];

const LoginForm = ({
  selectedRole,
  onBack,
  onLogin,
}: {
  selectedRole: typeof roles[0];
  onBack: () => void;
  onLogin: (email: string, password: string, token: string) => void;
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
        const response = await fetch("https://scoutflair.top/scoutflair/v1/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,             // ✅ keep email
                username: email,   // ✅ also send as username
                password,
            }),
        });

        let data: any = null;
        const text = await response.text();

        try {
            data = JSON.parse(text); // try JSON
        } catch {
            data = { message: text }; // fallback to plain text
        }

        if (response.ok && data.jwtToken) {
            // ✅ Save token
            localStorage.setItem("authToken", data.jwtToken);

            onLogin(email, password, data.jwtToken);
        } else {
            setError(data?.message || "Login failed. Please try again.");
            console.error("Signin response:", response.status, data);
        }
    } catch (err) {
        console.error("Login error:", err);
        setError("Network error. Please check your connection.");
    } finally {
        setIsLoading(false);
    }
};


  const handleQuickLogin = () => {
    setEmail('player@scoutflair.com');
    setPassword('password123');
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl p-8 shadow-2xl">
      {/* Avatar & Title */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative w-24 h-24 mb-4">
          <Image
            src={selectedRole.image}
            alt={selectedRole.name}
            width={96}
            height={96}
            className="rounded-full object-cover w-full h-full"
          />
        </div>
        <h2 className="font-manrope text-2xl font-bold text-[#192B4D] text-center">
          Sign In {selectedRole.name.replace('For ', 'as ')}
        </h2>
        <p className="font-lato text-sm text-black/70 text-center mt-2">
          {selectedRole.description}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#192B4D] focus:border-transparent outline-none font-lato"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#192B4D] focus:border-transparent outline-none font-lato"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && <p className="text-sm text-red-600 text-center">{error}</p>}

        {/* Remember + Forgot */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2 rounded" />
            <span className="font-lato text-black/70">Remember me</span>
          </label>
          <button type="button" className="font-lato text-[#192B4D] hover:underline">
            Forgot password?
          </button>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-[#041931] hover:bg-[#041931]/90 h-12 font-poppins text-base font-semibold flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>

        {/* Quick Login (Demo) */}
        <Button
          type="button"
          onClick={handleQuickLogin}
          variant="outline"
          className="w-full rounded-lg border-[#192B4D] text-[#192B4D] hover:bg-[#192B4D] hover:text-white h-12 font-poppins text-base font-semibold"
        >
          Quick Login (Demo)
        </Button>

        <Link href="/signup">
          <div className="text-center">
            <p className="font-lato text-sm text-black/70">
              Don't have an account?{' '}
              <button type="button" className="text-[#192B4D] hover:underline font-semibold">
                Sign up
              </button>
            </p>
          </div>
        </Link>
      </form>

      <button
        onClick={onBack}
        className="mt-6 w-full text-center font-lato text-sm text-black/70 hover:text-black/90 flex items-center justify-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to role selection
      </button>
    </div>
  );
};

const RoleCard = ({
  role,
  className,
  isSelected,
  onClick,
}: {
  role: typeof roles[0];
  className?: string;
  isSelected: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className={cn(
      'group bg-white rounded-2xl p-6 md:p-8 flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl w-full max-w-sm mx-auto h-full cursor-pointer',
      className,
    )}
  >
    <div className="relative w-32 h-32 md:w-40 md:h-40 mb-6">
      <Image
        src={role.image}
        alt={role.name}
        width={160}
        height={160}
        className="rounded-full object-cover w-full h-full"
        data-ai-hint={role.hint}
      />
      <div
        className={cn(
          'absolute top-1 right-1 rounded-full p-1.5 border-2 border-white flex items-center justify-center transition-colors duration-300',
          isSelected ? 'bg-[#192B4D]' : 'bg-gray-300',
        )}
      >
        <Check
          className={cn(
            'w-4 h-4 transition-colors duration-300',
            isSelected ? 'text-white' : 'text-gray-500',
          )}
          strokeWidth={3}
        />
      </div>
    </div>
    <div className="flex flex-col items-center gap-4 flex-grow">
      <h2 className="font-manrope text-xl md:text-2xl font-bold text-[#192B4D]">{role.name}</h2>
      <p className="font-lato text-base text-black/80 leading-relaxed">{role.description}</p>
    </div>
    <div className="mt-6 flex flex-col items-center gap-2">
      <Button className="rounded-full bg-[#041931] hover:bg-[#041931]/90 h-11 px-8 font-poppins text-base font-semibold flex items-center justify-center gap-2">
        <span>Sign In</span>
        <ArrowRight className="w-4 h-4" />
      </Button>
      <p className="font-lato text-xs text-black/70">Continue Your Journey</p>
    </div>
  </div>
);

export default function SignInPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedRole = localStorage.getItem('selectedSignInRole');
      if (storedRole && roles.some((r) => r.name === storedRole)) {
        setSelectedRole(storedRole);
      }
    }
  }, []);

  const handleRoleClick = (roleName: string) => {
    setSelectedRole(roleName);
    setShowLoginForm(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedSignInRole', roleName);
    }
  };

  const handleLogin = (email: string, password: string, token: string) => {
    console.log('Login successful', { email, selectedRole });

    // Save session
    const loginSession = {
      email,
      role: selectedRole,
      loginTime: new Date().toISOString(),
      isLoggedIn: true,
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem('userSession', JSON.stringify(loginSession));
      if (token) localStorage.setItem('authToken', token);
    }

    // Redirect to the right dashboard
    let dashboardPath = '/signin/player/dashboard';
    if (selectedRole === 'For Coaches') dashboardPath = '/signin/coach/dashboard';
    if (selectedRole === 'For Scouts') dashboardPath = '/signin/scout/dashboard';

    window.location.href = dashboardPath;
  };

  const handleBackToRoles = () => {
    setShowLoginForm(false);
    setSelectedRole(null);
  };

  const handleGoBack = () => {
    router.back(); // Goes back to previous page
  };

  if (showLoginForm && selectedRole) {
    const role = roles.find((r) => r.name === selectedRole);
    if (role) {
      return (
        <div className="relative min-h-screen w-full flex items-center justify-center p-4 bg-cover bg-center bg-[url('/images/Onboarding_Select_1736_1803.png')]">
          <div className="relative z-10 w-full max-w-md mx-auto">
            <LoginForm selectedRole={role} onBack={handleBackToRoles} onLogin={handleLogin} />
          </div>
        </div>
      );
    }
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 bg-cover bg-center bg-[url('/images/Onboarding_Select_1736_1803.png')]">
      <div className="relative z-10 w-full max-w-6xl mx-auto rounded-2xl bg-cover bg-center bg-[#192B4D]/90 bg-[url('/images/Color_frame_1736_1900.png')] p-6 md:p-12 lg:p-16">
        {/* Back Button */}
        <button
          onClick={handleGoBack}
          className="mb-6 flex items-center gap-2 text-white hover:text-white/80 transition-colors font-lato text-sm font-[600]"
        >
          <ArrowLeft className="w-4 h-4 stroke-[4]" />
          <h1 className="text-2xl">Home</h1>
        </button>

        {/* Role Selection Title */}
        <div className="text-center mb-8">
          <h1 className="font-manrope text-3xl md:text-4xl font-bold text-white mb-4">
            Choose Your Role
          </h1>
          <p className="font-lato text-white/80 text-lg">
            Select how you want to sign in to ScoutFlair
          </p>
        </div>

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
