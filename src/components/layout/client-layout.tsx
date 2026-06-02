"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WaitlistFooter } from "@/components/layout/waitlist-footer";
import { cn } from "@/lib/utils";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isWaitlistRoute = pathname.startsWith("/waitlist");
  const isAuthRoute =
    pathname.startsWith("/signup") || pathname.startsWith("/signin");
  const hideHeaderFooter = isAuthRoute || isWaitlistRoute;

  return (
    <div
      className={cn("flex flex-col min-h-screen", {
        "bg-[#192B4D]":
          pathname.startsWith("/signup") &&
          (pathname.endsWith("/signup") || pathname.endsWith("/signin")),
        "bg-white":
          hideHeaderFooter &&
          !(
            pathname.startsWith("/signup") &&
            (pathname.endsWith("/signup") || pathname.endsWith("/signin"))
          ),
      })}
    >
      {!hideHeaderFooter && <Header />}
      <main className="flex-grow">{children}</main>
      {isWaitlistRoute ? (
        <WaitlistFooter />
      ) : (
        !hideHeaderFooter && <Footer />
      )}
    </div>
  );
}
