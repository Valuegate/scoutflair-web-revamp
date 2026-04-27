// src/app/signup/coach/components/coach-sign-up-form.tsx
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
import { CalendarIcon, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

// ── Types ─────────────────────────────────────────────────────────────────────
type FormErrors = Partial<Record<string, string>>;

// ── API ───────────────────────────────────────────────────────────────────────
async function signupCoach(
  payload: object
): Promise<{ success: boolean; message: string }> {
  const res = await fetch('https://scoutflair.top/scoutflair/v1/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const text = await res.text();

  try {
    const data = JSON.parse(text);
    if (res.ok && data.success) return { success: true, message: data.message ?? 'Account created!' };
    return { success: false, message: data.message || 'Something went wrong.' };
  } catch {
    // Plain text error e.g. "User Already Verified"
    return { success: false, message: text || `Server error (${res.status}).` };
  }
}

// ── Validation ────────────────────────────────────────────────────────────────
function validate(
  f: typeof INITIAL_FORM,
  agree: boolean
): FormErrors {
  const errs: FormErrors = {};
  if (!f.fullName.trim())     errs.fullName    = 'Full name is required.';
  if (!f.currentTeam.trim())  errs.currentTeam = 'Team or club name is required.';
  if (!f.experience)          errs.experience  = 'Please select your years of experience.';
  if (!f.dob)                 errs.dob         = 'Date of birth is required.';
  if (!f.email.trim())        errs.email       = 'Email address is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))
                              errs.email       = 'Enter a valid email address.';
  if (!f.password)            errs.password    = 'Password is required.';
  else if (f.password.length < 8)
                              errs.password    = 'Password must be at least 8 characters.';
  if (!f.confirmPassword)     errs.confirmPassword = 'Please confirm your password.';
  else if (f.password !== f.confirmPassword)
                              errs.confirmPassword = 'Passwords do not match.';
  if (!agree)                 errs.agree       = 'You must agree to the terms and conditions.';
  return errs;
}

// ── Constants ─────────────────────────────────────────────────────────────────
const INITIAL_FORM = {
  fullName: '',
  currentTeam: '',
  experience: '',
  dob: '',
  email: '',
  password: '',
  confirmPassword: '',
};

// ── Sub-components ────────────────────────────────────────────────────────────
function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="flex items-center gap-1 text-xs text-red-600 mt-1">
      <AlertCircle className="w-3 h-3 flex-shrink-0" />
      {message}
    </p>
  );
}

const GoogleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25C22.56 11.45 22.49 10.68 22.36 9.92H12V14.45H18.42C18.13 15.99 17.22 17.31 15.82 18.22V20.77H19.5C21.56 18.91 22.56 15.89 22.56 12.25Z" fill="#4285F4" />
    <path d="M12 23C15.24 23 17.95 21.92 19.5 20.24L15.82 17.69C14.71 18.44 13.46 18.88 12 18.88C9.38 18.88 7.15 17.15 6.34 14.88H2.5V17.52C4.34 20.86 7.89 23 12 23Z" fill="#34A853" />
    <path d="M6.34 14.88C6.12 14.25 6 13.57 6 12.88C6 12.19 6.12 11.51 6.34 10.88V8.33H2.5C1.62 10.03 1 11.9 1 14.88C1 17.86 1.62 19.73 2.5 21.43L6.34 18.88V14.88Z" fill="#FBBC05" />
    <path d="M12 6.88C13.56 6.88 14.88 7.42 15.85 8.33L19.58 4.59C17.95 2.92 15.24 1.75 12 1.75C7.89 1.75 4.34 4.14 2.5 7.48L6.34 10.03C7.15 7.76 9.38 6.88 12 6.88Z" fill="#EA4335" />
  </svg>
);

const Logo = () => (
  <Link href="/" className="flex items-center gap-1.5" aria-label="ScoutFlair Home">
    <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.6148 28.5524L0.260849 14.228C-3.08053 10.8961 -3.08053 5.43254 0.260849 2.10061C3.60223 -1.23132 10.1691 -1.23132 13.5105 2.10061L27.8644 16.4251C31.2058 19.757 31.2058 25.211 27.8644 28.5524C24.523 31.8843 17.9562 31.8843 14.6148 28.5524Z" fill="#083162" />
      <path d="M0.000672483 16.2918L13.6083 29.8784C10.2283 32.934 4.5458 32.8124 0.247192 28.5138C-4.04945 24.2227 -4.18432 18.5544 0.000672483 16.2918Z" fill="#F2A725" />
      <path d="M28.8418 15.3094L14.4878 0.984955C17.8679 -2.08389 24.3347 -1.95612 28.6333 2.34249C32.9299 6.63363 33.0648 12.3019 28.8418 15.3094Z" fill="#F2A725" />
    </svg>
    <span className="text-xl font-bold tracking-tight text-[#1B1B1B]/80">ScoutFlair</span>
  </Link>
);

// ── Main component ────────────────────────────────────────────────────────────
export function CoachSignUpForm() {
  const router = useRouter();

  const [formData, setFormData] = useState(INITIAL_FORM);
  const [date, setDate] = useState<Date>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');

    const validationErrors = validate(formData, agree);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const result = await signupCoach({
        fullName: formData.fullName,
        currentTeam: formData.currentTeam,
        experience: formData.experience,
        dob: formData.dob,
        email: formData.email,
        password: formData.password,
        usertype: 'COACH', // uppercase to match backend authority enum
      });

      if (result.success) {
        setSuccess(true);
        setTimeout(() => router.push('/signin'), 2500);
      } else {
        setServerError(result.message);
      }
    } catch {
      setServerError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  // ── Success screen ─────────────────────────────────────────────────────────
  if (success) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
        <CheckCircle2 className="w-16 h-16 text-green-500" />
        <h2 className="text-2xl font-bold text-[#192B4D]">Account Created!</h2>
        <p className="text-gray-600 text-sm">
          Your coach account has been created successfully. Redirecting you to sign in…
        </p>
      </div>
    );
  }

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
          <p className="text-[#1B1B1B]/70">Find and nurture the next generation of talent.</p>
        </div>
        <Button variant="outline" className="w-full h-11 shadow-sm bg-white flex items-center gap-2" type="button">
          <GoogleIcon />
          <span className="font-medium text-base text-[#1B1B1B]">Sign up with Google</span>
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-grow h-px bg-gray-300" />
        <span className="text-sm text-gray-500">Or</span>
        <div className="flex-grow h-px bg-gray-300" />
      </div>

      {/* Server error banner */}
      {serverError && (
        <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="text-base font-semibold text-[#1B1B1B]">Full Name:</label>
          <Input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter full name"
            className={cn('h-11', errors.fullName && 'border-red-400 focus-visible:ring-red-400')}
          />
          <FieldError message={errors.fullName} />
        </div>

        {/* Current Team */}
        <div className="space-y-1.5">
          <label className="text-base font-semibold text-[#1B1B1B]">Current Team or Club:</label>
          <Input
            name="currentTeam"
            value={formData.currentTeam}
            onChange={handleChange}
            placeholder="Enter team or club name"
            className={cn('h-11', errors.currentTeam && 'border-red-400 focus-visible:ring-red-400')}
          />
          <FieldError message={errors.currentTeam} />
        </div>

        {/* Experience */}
        <div className="space-y-1.5">
          <label className="text-base font-semibold text-[#1B1B1B]">Years of experience:</label>
          <Select
            value={formData.experience}
            onValueChange={(value) => {
              setFormData((prev) => ({ ...prev, experience: value }));
              if (errors.experience) setErrors((prev) => ({ ...prev, experience: undefined }));
            }}
          >
            <SelectTrigger className={cn('w-full h-11', errors.experience && 'border-red-400')}>
              <SelectValue placeholder="Choose" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-1">0–1 Years</SelectItem>
              <SelectItem value="1-3">1–3 Years</SelectItem>
              <SelectItem value="3-5">3–5 Years</SelectItem>
              <SelectItem value="5-10">5–10 Years</SelectItem>
              <SelectItem value="10+">10+ Years</SelectItem>
            </SelectContent>
          </Select>
          <FieldError message={errors.experience} />
        </div>

        {/* Date of Birth */}
        <div className="space-y-1.5">
          <label className="text-base font-semibold text-[#1B1B1B]">Date of Birth:</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className={cn(
                  'w-full justify-start text-left font-normal h-11',
                  !date && 'text-muted-foreground',
                  errors.dob && 'border-red-400'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'dd/MM/yyyy') : <span>DD/MM/YYYY</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(d) => {
                  setDate(d);
                  setFormData((prev) => ({
                    ...prev,
                    dob: d ? format(d, 'yyyy-MM-dd') : '',
                  }));
                  if (errors.dob) setErrors((prev) => ({ ...prev, dob: undefined }));
                }}
                disabled={(d) => d > new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FieldError message={errors.dob} />
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-base font-semibold text-[#1B1B1B]">Email Address:</label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            className={cn('h-11', errors.email && 'border-red-400 focus-visible:ring-red-400')}
          />
          <FieldError message={errors.email} />
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="text-base font-semibold text-[#1B1B1B]">Password:</label>
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Min. 8 characters"
              className={cn('h-11 pr-10', errors.password && 'border-red-400 focus-visible:ring-red-400')}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
            </button>
          </div>
          <FieldError message={errors.password} />
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label className="text-base font-semibold text-[#1B1B1B]">Confirm Password:</label>
          <div className="relative">
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter password"
              className={cn('h-11 pr-10', errors.confirmPassword && 'border-red-400 focus-visible:ring-red-400')}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
            </button>
          </div>
          <FieldError message={errors.confirmPassword} />
        </div>

        {/* Terms */}
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={agree}
              onCheckedChange={(checked) => {
                setAgree(!!checked);
                if (errors.agree) setErrors((prev) => ({ ...prev, agree: undefined }));
              }}
              className={cn(
                'rounded-[4px] border-gray-400 data-[state=checked]:bg-[#192B4D] data-[state=checked]:border-[#192B4D]',
                errors.agree && 'border-red-400'
              )}
            />
            <label htmlFor="terms" className="text-sm font-medium leading-none text-gray-600">
              I agree to Scoutflair{' '}
              <Link href="#" className="text-[#083162] hover:underline">
                Terms and conditions.
              </Link>
            </label>
          </div>
          <FieldError message={errors.agree} />
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-[#192B4D] hover:bg-[#192B4D]/90 h-11 text-base font-semibold"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Creating account…
            </span>
          ) : (
            'Create an Account'
          )}
        </Button>
      </form>
    </div>
  );
}