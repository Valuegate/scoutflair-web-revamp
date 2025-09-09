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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export function ScoutSignUpForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    licenceNumber: "",
    experience: "",
    dob: "",
    email: "",
    password: "",
    confirmPassword: "",
    usertype: "scout", // fixed for scout signup
  });

  const [date, setDate] = useState<Date>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agree) {
      alert("You must agree to the terms and conditions.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("https://scoutflair.top/scoutflair/v1/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          licenceNumber: formData.licenceNumber,
          experience: formData.experience,
          dob: formData.dob,
          email: formData.email,
          password: formData.password,
          usertype: "scout",
        }),
      });

      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }

      const data = await res.json();
      if (data.success) {
        alert("Account created successfully! Redirecting to Sign In...");
        router.push("/signin");
      } else {
        alert(data.message || "Something went wrong.");
      }
    } catch (err: any) {
      alert(err.message || "Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full py-8">
      <header className="flex justify-between items-center">
        <p className="text-sm">
          <span className="text-gray-600">Member already? </span>
          <Link href="/signin" className="font-semibold text-[#083162] hover:underline">
            Sign In
          </Link>
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div className="space-y-2">
          <label className="text-base font-semibold text-[#1B1B1B]">Full Name:</label>
          <Input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter full name"
            className="h-11"
            required
          />
        </div>

        {/* Licence Number */}
        <div className="space-y-2">
          <label className="text-base font-semibold text-[#1B1B1B]">Licence Number:</label>
          <Input
            name="licenceNumber"
            value={formData.licenceNumber}
            onChange={handleChange}
            placeholder="Enter your licence number"
            className="h-11"
            required
          />
        </div>

        {/* Experience */}
        <div className="space-y-2">
          <label className="text-base font-semibold text-[#1B1B1B]">Years of Experience:</label>
          <Select
            value={formData.experience}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, experience: value }))}
          >
            <SelectTrigger className="w-full h-11">
              <SelectValue placeholder="Choose" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-1">0-1 Years</SelectItem>
              <SelectItem value="1-3">1-3 Years</SelectItem>
              <SelectItem value="3-5">3-5 Years</SelectItem>
              <SelectItem value="5-10">5-10 Years</SelectItem>
              <SelectItem value="10+">10+ Years</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date of Birth */}
        <div className="space-y-2">
          <label className="text-base font-semibold text-[#1B1B1B]">Date of Birth:</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
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
                onSelect={(d) => {
                  setDate(d);
                  setFormData((prev) => ({
                    ...prev,
                    dob: d ? d.toISOString().split("T")[0] : "",
                  }));
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-base font-semibold text-[#1B1B1B]">Email Address:</label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            className="h-11"
            required
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label className="text-base font-semibold text-[#1B1B1B]">Password:</label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="h-11 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <label className="text-base font-semibold text-[#1B1B1B]">Confirm Password:</label>
          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              className="h-11 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Terms */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={agree}
            onCheckedChange={(checked) => setAgree(!!checked)}
          />
          <label htmlFor="terms" className="text-sm font-medium leading-none text-gray-600">
            I agree to Scoutflair{" "}
            <Link href="#" className="text-[#083162] hover:underline">
              Terms and conditions.
            </Link>
          </label>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full bg-[#192B4D] hover:bg-[#192B4D]/90 h-11 text-base font-semibold"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create an Account"}
        </Button>
      </form>
    </div>
  );
}

