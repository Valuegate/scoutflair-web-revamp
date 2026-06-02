// This page is temporary and will be deleted after launch.
"use client";

import { FormEvent, useState } from "react";
import {
  ChartNoAxesCombined,
  CheckCircle2,
  Database,
  Loader2,
  TrendingUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const MAILCHIMP_ACTION_URL =
  "https://app.us18.list-manage.com/subscribe/post?u=c48a89cf321f270ef403139c1&id=e2af7c923a&f_id=00eca4e6f0";

const features = [
  {
    title: "Advanced Scouting",
    description:
      "Discover talent with precision using our advanced tools, providing in-depth evaluation of top players.",
    icon: ChartNoAxesCombined,
    iconClassName: "bg-[#021637] text-white",
    highlighted: false,
  },
  {
    title: "Talent Development",
    description:
      "Enhance player skills with comprehensive development programs, focusing on personalized training.",
    icon: TrendingUp,
    iconClassName: "bg-[#fdaa2f] text-[#021637]",
    highlighted: true,
  },
  {
    title: "Data Analytics",
    description:
      "Unlock valuable insights with our data tools, providing detailed metrics for professional decision-making.",
    icon: Database,
    iconClassName: "bg-[#b5c6f1] text-[#021637]",
    highlighted: false,
  },
];

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const trimmedEmail = email.trim();
    setErrorMessage("");
    setSuccessMessage("");

    if (!isValidEmail(trimmedEmail)) {
      event.preventDefault();
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    // Let the form submit natively to Mailchimp via the hidden iframe.
    // Show a brief submitting state, then display success message.
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setEmail("");
      setSuccessMessage(
        "You're on the list! Check your email to confirm your spot."
      );
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white text-[#021637]">
      <section className="relative flex min-h-[660px] flex-col overflow-hidden bg-[#021637] sm:min-h-[690px] lg:min-h-[720px]">
        <div
          aria-hidden="true"
          className="absolute inset-0 scale-105 bg-center bg-no-repeat blur-[2px]"
          style={{
            backgroundImage: "url('/images/Image_1598_2263.png')",
            backgroundSize: "100% 100%",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[#021637]/55"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#021637]/95 via-[#021637]/80 to-[#021637]/35"
        />

        <header className="relative z-10">
          <div className="mx-auto flex h-20 w-full max-w-[900px] items-center justify-between px-5 sm:px-8 lg:h-[86px]">
            <a
              className="text-lg font-medium leading-none tracking-normal text-white sm:text-xl"
              href="/waitlist"
            >
              ScoutFlair
            </a>
            <a
              className="inline-flex h-10 items-center justify-center rounded-[4px] bg-[#fdaa2f] px-5 text-sm font-bold leading-none tracking-normal text-[#021637] transition hover:bg-[#ffbc58] sm:h-11 sm:px-6"
              href="#waitlist-form"
            >
              Join Waitlist
            </a>
          </div>
        </header>

        <div className="relative z-10 mx-auto flex w-full max-w-[900px] flex-1 items-center px-5 pb-14 pt-8 sm:px-8 sm:pb-20 lg:pb-24">
          <div className="w-full max-w-[650px] lg:pl-8">
            <span className="inline-flex rounded-full bg-[#fdaa2f] px-4 py-1.5 text-[11px] font-bold uppercase leading-none tracking-normal text-[#021637]">
              Future of football discovery
            </span>

            <h1 className="mt-6 max-w-[650px] text-[35px] font-extrabold leading-[1.12] tracking-normal text-white sm:text-[46px] lg:text-[52px]">
              Revolutionizing Football Scouting with{" "}
              <span className="text-[#ffddb7]">Data &amp; Insights</span>
            </h1>

            <p className="mt-5 max-w-[560px] text-base leading-7 text-white/80 sm:text-lg">
              Be the first to access elite scouting tools, talent data, and
              mapping solutions. Bridging the gap between grassroots and
              professional football.
            </p>

            {/* Mailchimp form — posts directly via hidden iframe, user stays on page */}
            <form
              className="mt-8 w-full max-w-[465px]"
              id="waitlist-form"
              action={MAILCHIMP_ACTION_URL}
              method="POST"
              target="mailchimp-hidden-frame"
              onSubmit={handleSubmit}
            >
              <div className="rounded-[6px] bg-white p-1.5 shadow-[0_20px_60px_rgba(2,22,55,0.2)] sm:flex sm:items-center sm:gap-2">
                <label className="sr-only" htmlFor="waitlist-email">
                  Email address
                </label>
                <input
                  aria-describedby={
                    errorMessage
                      ? "waitlist-error"
                      : successMessage
                        ? "waitlist-success"
                        : "waitlist-note"
                  }
                  aria-invalid={Boolean(errorMessage)}
                  autoComplete="off"
                  className="h-12 w-full rounded-[4px] border border-transparent bg-white px-4 text-sm text-[#1b1b1b] outline-none transition placeholder:text-[#44474e] focus:border-[#192b4d] focus:ring-2 focus:ring-[#192b4d]/10 sm:flex-1"
                  id="waitlist-email"
                  inputMode="email"
                  name="EMAIL"
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your work email"
                  required
                  type="email"
                  value={email}
                />

                <Button
                  className="mt-2 h-12 w-full rounded-[4px] bg-[#021637] px-5 text-sm font-bold leading-tight text-white hover:bg-[#192b4d] sm:mt-0 sm:w-[145px]"
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2
                        aria-hidden="true"
                        className="h-4 w-4 animate-spin"
                      />
                      Submitting...
                    </>
                  ) : (
                    <span>
                      Join the
                      <br />
                      Waitlist
                    </span>
                  )}
                </Button>
              </div>

              {/* Mailchimp honeypot — prevents bot signups, must stay hidden */}
              <div
                aria-hidden="true"
                style={{ position: "absolute", left: "-5000px" }}
              >
                <input
                  type="text"
                  name="b_c48a89cf321f270ef403139c1_e2af7c923a"
                  tabIndex={-1}
                  defaultValue=""
                />
              </div>

              {errorMessage ? (
                <p
                  className="mt-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-[#ba1a1a]"
                  id="waitlist-error"
                  role="alert"
                >
                  {errorMessage}
                </p>
              ) : null}

              {successMessage ? (
                <p
                  className="mt-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-[#0f7a48]"
                  id="waitlist-success"
                  role="status"
                >
                  {successMessage}
                </p>
              ) : null}

              <p
                className="mt-4 flex items-center gap-2 text-[12px] font-bold leading-5 text-white/65"
                id="waitlist-note"
              >
                <CheckCircle2 aria-hidden="true" className="h-4 w-4" />
                Early access for scouts, clubs, and elite players.
              </p>
            </form>

            {/* Hidden iframe to catch Mailchimp's response without leaving the page */}
            <iframe
              name="mailchimp-hidden-frame"
              className="hidden"
              aria-hidden="true"
              tabIndex={-1}
              title="Mailchimp form submission target"
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-[900px]">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h2 className="max-w-[560px] text-[30px] font-bold leading-[1.12] tracking-normal text-[#021637] sm:text-[36px]">
                Game-Changing Tools for Next-Level Scouting
              </h2>
              <p className="mt-4 max-w-[600px] text-base leading-7 text-[#747880]">
                Empowering scouts with cutting-edge tools to discover, analyze,
                and connect with top football talent seamlessly.
              </p>
            </div>

            <div className="flex items-center gap-2 lg:pb-4">
              <span className="h-1 w-12 rounded-full bg-[#021637]" />
              <span className="h-1 w-4 rounded-full bg-[#e5e2e1]" />
              <span className="h-1 w-4 rounded-full bg-[#e5e2e1]" />
            </div>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  className={`min-h-[245px] rounded-[6px] border p-7 ${
                    feature.highlighted
                      ? "border-[#021637] bg-[#021637] text-white"
                      : "border-[#1b1b1b]/10 bg-[#f8f8ff] text-[#021637]"
                  }`}
                  key={feature.title}
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-md ${feature.iconClassName}`}
                  >
                    <Icon aria-hidden="true" className="h-6 w-6" />
                  </div>

                  <h3 className="mt-8 text-[22px] font-bold leading-tight tracking-normal">
                    {feature.title}
                  </h3>
                  <p
                    className={`mt-4 text-base leading-7 ${
                      feature.highlighted ? "text-white/70" : "text-[#44474e]"
                    }`}
                  >
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative flex min-h-[300px] items-center overflow-hidden bg-[#021637] px-5 py-20 text-center text-white sm:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-45"
          style={{ backgroundImage: "url('/images/screen.png')" }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[#021637]/70"
        />
        <div className="relative z-10 mx-auto max-w-[760px]">
          <h2 className="text-[30px] font-extrabold leading-tight tracking-normal sm:text-[36px]">
            Connecting Players, Coaches &amp; Scouts
          </h2>
          <p className="mx-auto mt-5 max-w-[650px] text-base leading-7 text-white/78 sm:text-lg">
            ScoutFlair is where passionate players, dedicated scouts, and
            visionary coaches connect. Showcase your skills, discover top
            talent, and take your football journey to the next level.
          </p>
        </div>
      </section>
    </div>
  );
}
