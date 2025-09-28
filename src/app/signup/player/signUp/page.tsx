// src/app/signup/player/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlayerSignupData {
  fullName: string;
  email: string;
  password: string;
  dob: string;
  position: string;
  preferredFoot: string;
  currentTeam: string;
  experience: string;
  usertype: 'player';
}

const positions = [
  'Goalkeeper',
  'Defender',
  'Midfielder', 
  'Forward',
  'Winger',
  'Striker'
];

const experienceLevels = [
  'Beginner (0-2 years)',
  'Intermediate (2-5 years)',
  'Advanced (5-10 years)',
  'Professional (10+ years)'
];

export default function PlayerSignupPage() {
  const [formData, setFormData] = useState<PlayerSignupData>({
    fullName: '',
    email: '',
    password: '',
    dob: '',
    position: '',
    preferredFoot: '',
    currentTeam: '',
    experience: '',
    usertype: 'player'
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<PlayerSignupData>>({});
  
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof PlayerSignupData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<PlayerSignupData> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.position) newErrors.position = 'Position is required';
    if (!formData.preferredFoot) newErrors.preferredFoot = 'Preferred foot is required';
    if (!formData.currentTeam.trim()) newErrors.currentTeam = 'Current team is required';
    if (!formData.experience) newErrors.experience = 'Experience level is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateForm()) return;

  setIsLoading(true);

  try {
    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      username: formData.email, // ✅ using email as username
      password: formData.password,
      dob: formData.dob,
      position: formData.position,
      preferredFoot: formData.preferredFoot,
      currentTeam: formData.currentTeam,
      experience: formData.experience,
      usertype: "player",
      licenceNumber: ""
    };

    const response = await fetch("https://scoutflair.top/scoutflair/v1/signup", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(formData),
});
    if (response.ok) {
      const data = await response.json();
      console.log("Signup response:", data);

      // ✅ Check if backend sends a token
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        console.log("Token saved to localStorage:", data.token);
      }

      alert(`✅ Account created: ${data.message || "Success!"}`);
      router.push("/signin"); 
    } else {
      const errorData = await response.json().catch(() => ({}));
      let errorMessage = errorData.error || errorData.message || "Signup failed.";
      alert(`❌ ${errorMessage}`);
    }
  } catch (error) {
    console.error("Network/API error:", error);
    alert("Network error. Please try again.");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 bg-cover bg-center bg-[url('/images/Onboarding_Select_1736_1803.png')]">
      <div className="absolute inset-0 bg-[#192B4D]/60"></div>
      
      <div className="relative z-10 w-full max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-2xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link 
            href="/signup"
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-[#192B4D] font-manrope">Player Registration</h1>
            <p className="text-gray-600 font-lato">Join the community of talented players</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className={cn(
                "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#192B4D] focus:border-transparent",
                errors.fullName ? "border-red-500" : "border-gray-300"
              )}
              placeholder="Enter your full name"
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={cn(
                "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#192B4D] focus:border-transparent",
                errors.email ? "border-red-500" : "border-gray-300"
              )}
              placeholder="Enter your email address"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={cn(
                  "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#192B4D] focus:border-transparent pr-12",
                  errors.password ? "border-red-500" : "border-gray-300"
                )}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Date of Birth *
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              className={cn(
                "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#192B4D] focus:border-transparent",
                errors.dob ? "border-red-500" : "border-gray-300"
              )}
            />
            {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
          </div>

          {/* Position and Preferred Foot - Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Position *
              </label>
              <select
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                className={cn(
                  "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#192B4D] focus:border-transparent",
                  errors.position ? "border-red-500" : "border-gray-300"
                )}
              >
                <option value="">Select position</option>
                {positions.map(position => (
                  <option key={position} value={position}>{position}</option>
                ))}
              </select>
              {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Preferred Foot *
              </label>
              <select
                name="preferredFoot"
                value={formData.preferredFoot}
                onChange={handleInputChange}
                className={cn(
                  "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#192B4D] focus:border-transparent",
                  errors.preferredFoot ? "border-red-500" : "border-gray-300"
                )}
              >
                <option value="">Select preferred foot</option>
                <option value="Left">Left</option>
                <option value="Right">Right</option>
                <option value="Both">Both</option>
              </select>
              {errors.preferredFoot && <p className="text-red-500 text-sm mt-1">{errors.preferredFoot}</p>}
            </div>
          </div>

          {/* Current Team */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Current Team *
            </label>
            <input
              type="text"
              name="currentTeam"
              value={formData.currentTeam}
              onChange={handleInputChange}
              className={cn(
                "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#192B4D] focus:border-transparent",
                errors.currentTeam ? "border-red-500" : "border-gray-300"
              )}
              placeholder="Enter your current team name"
            />
            {errors.currentTeam && <p className="text-red-500 text-sm mt-1">{errors.currentTeam}</p>}
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Experience Level *
            </label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              className={cn(
                "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#192B4D] focus:border-transparent",
                errors.experience ? "border-red-500" : "border-gray-300"
              )}
            >
              <option value="">Select experience level</option>
              {experienceLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
            {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#041931] hover:bg-[#041931]/90 text-white py-3 rounded-lg font-semibold text-lg"
          >
            {isLoading ? 'Creating Account...' : 'Create Player Account'}
          </Button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link href="/signin" className="text-[#192B4D] font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}