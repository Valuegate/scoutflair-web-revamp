"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  CalendarIcon,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Types ────────────────────────────────────────────────────────────────────
type FormErrors = Partial<Record<string, string>>;

// ── Helpers ──────────────────────────────────────────────────────────────────
async function signupScout(
  payload: object
): Promise<{ success: boolean; message: string }> {
  const res = await fetch("https://scoutflair.top/scoutflair/v1/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  // Read body as text first — backend sometimes returns plain text errors
  const text = await res.text();

  let data: { success?: boolean; message?: string } = {};
  try {
    data = JSON.parse(text);
  } catch {
    // Plain text response (e.g. "User Already Verified")
    data = { success: false, message: text };
  }

  if (!res.ok) {
    return {
      success: false,
      message:
        data.message || `Server error (${res.status}). Please try again.`,
    };
  }

  return {
    success: data.success ?? false,
    message: data.message ?? "Something went wrong.",
  };
}

function validate(formData: typeof INITIAL_FORM, agree: boolean): FormErrors {
  const errors: FormErrors = {};

  if (!formData.fullName.trim()) errors.fullName = "Full name is required.";
  if (!formData.licenceNumber.trim())
    errors.licenceNumber = "Licence number is required.";
  if (!formData.experience)
    errors.experience = "Please select your years of experience.";
  if (!formData.dob) errors.dob = "Date of birth is required.";
  if (!formData.email.trim()) errors.email = "Email address is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
    errors.email = "Enter a valid email address.";
  if (!formData.password) errors.password = "Password is required.";
  else if (formData.password.length < 8)
    errors.password = "Password must be at least 8 characters.";
  if (!formData.confirmPassword)
    errors.confirmPassword = "Please confirm your password.";
  else if (formData.password !== formData.confirmPassword)
    errors.confirmPassword = "Passwords do not match.";
  if (!agree) errors.agree = "You must agree to the terms and conditions.";

  return errors;
}

// ── Constants ────────────────────────────────────────────────────────────────
const INITIAL_FORM = {
  fullName: "",
  licenceNumber: "",
  experience: "",
  dob: "",
  email: "",
  password: "",
  confirmPassword: "",
};

// ── Sub-components ───────────────────────────────────────────────────────────
function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="flex items-center gap-1 text-xs text-red-600 mt-1">
      <AlertCircle className="w-3 h-3 flex-shrink-0" />
      {message}
    </p>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export function ScoutSignUpForm() {
  const router = useRouter();

  const [formData, setFormData] = useState(INITIAL_FORM);
  const [date, setDate] = useState<Date>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    const validationErrors = validate(formData, agree);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const result = await signupScout({
        fullName: formData.fullName,
        licenceNumber: formData.licenceNumber,
        experience: formData.experience,
        dob: formData.dob,
        email: formData.email,
        password: formData.password,
        usertype: "SCOUT", // must be uppercase to match backend authority enum
      });

      if (result.success) {
        setSuccess(true);
        setTimeout(() => router.push("/signin"), 2500);
      } else {
        setServerError(result.message);
      }
    } catch (err: any) {
      setServerError(
        "Network error. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ── Success state ──────────────────────────────────────────────────────────
  if (success) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
        <CheckCircle2 className="w-16 h-16 text-green-500" />
        <h2 className="text-2xl font-bold text-[#192B4D]">Account Created!</h2>
        <p className="text-gray-600 text-sm">
          Your scout account has been created successfully. Redirecting you to
          sign in…
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 w-full py-8">
      <header className="flex justify-between items-center">
        <p className="text-sm">
          <span className="text-gray-600">Member already? </span>
          <Link
            href="/signin"
            className="font-semibold text-[#083162] hover:underline"
          >
            Sign In
          </Link>
        </p>
      </header>

      {/* Server-level error banner */}
      {serverError && (
        <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="text-base font-semibold text-[#1B1B1B]">
            Full Name
          </label>
          <Input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter full name"
            className={cn(
              "h-11",
              errors.fullName && "border-red-400 focus-visible:ring-red-400"
            )}
          />
          <FieldError message={errors.fullName} />
        </div>

        {/* Licence Number */}
        <div className="space-y-1.5">
          <label className="text-base font-semibold text-[#1B1B1B]">
            Licence Number
          </label>
          <Input
            name="licenceNumber"
            value={formData.licenceNumber}
            onChange={handleChange}
            placeholder="Enter your licence number"
            className={cn(
              "h-11",
              errors.licenceNumber &&
                "border-red-400 focus-visible:ring-red-400"
            )}
          />
          <FieldError message={errors.licenceNumber} />
        </div>

        {/* Experience */}
        <div className="space-y-1.5">
          <label className="text-base font-semibold text-[#1B1B1B]">
            Years of Experience
          </label>
          <Select
            value={formData.experience}
            onValueChange={(value) => {
              setFormData((prev) => ({ ...prev, experience: value }));
              if (errors.experience)
                setErrors((prev) => ({ ...prev, experience: undefined }));
            }}
          >
            <SelectTrigger
              className={cn(
                "w-full h-11",
                errors.experience && "border-red-400"
              )}
            >
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
          <label className="text-base font-semibold text-[#1B1B1B]">
            Date of Birth
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal h-11",
                  !date && "text-muted-foreground",
                  errors.dob && "border-red-400"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "dd/MM/yyyy") : <span>DD/MM/YYYY</span>}
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
                    dob: d ? format(d, "yyyy-MM-dd") : "",
                  }));
                  if (errors.dob)
                    setErrors((prev) => ({ ...prev, dob: undefined }));
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
          <label className="text-base font-semibold text-[#1B1B1B]">
            Email Address
          </label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            className={cn(
              "h-11",
              errors.email && "border-red-400 focus-visible:ring-red-400"
            )}
          />
          <FieldError message={errors.email} />
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="text-base font-semibold text-[#1B1B1B]">
            Password
          </label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Min. 8 characters"
              className={cn(
                "h-11 pr-10",
                errors.password && "border-red-400 focus-visible:ring-red-400"
              )}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          <FieldError message={errors.password} />
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label className="text-base font-semibold text-[#1B1B1B]">
            Confirm Password
          </label>
          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter password"
              className={cn(
                "h-11 pr-10",
                errors.confirmPassword &&
                  "border-red-400 focus-visible:ring-red-400"
              )}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
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
                if (errors.agree)
                  setErrors((prev) => ({ ...prev, agree: undefined }));
              }}
              className={cn(errors.agree && "border-red-400")}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none text-gray-600"
            >
              I agree to Scoutflair{" "}
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
          className="w-full bg-[#192B4D] hover:bg-[#192B4D]/90 h-11 text-base font-semibold"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Creating account…
            </span>
          ) : (
            "Create an Account"
          )}
        </Button>
      </form>
    </div>
  );
}
