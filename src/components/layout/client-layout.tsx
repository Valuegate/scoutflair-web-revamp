"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { cn } from "@/lib/utils";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideHeaderFooter =
    pathname.startsWith("/signup") || pathname.startsWith("/signin");

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
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}
