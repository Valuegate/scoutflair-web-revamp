import React from "react";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import ClientLayout from "@/components/layout/client-layout";
import {
  Inter,
  Lato,
  Manrope,
  Merriweather,
  Montserrat,
  Poppins,
  Roboto,
} from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});
const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-lato",
});
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-manrope",
});
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-merriweather",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-montserrat",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-poppins",
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-roboto",
});

export const metadata = {
  title: "ScoutFlair",
  description: "The future of sports scouting",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${lato.variable} ${manrope.variable} ${merriweather.variable} ${montserrat.variable} ${poppins.variable} ${roboto.variable} font-lato antialiased`}
      >
        <ClientLayout>{children}</ClientLayout>
        <Toaster />
      </body>
    </html>
  );
}
