import type { Metadata } from "next";
import { FaqSection } from "@/components/faq-section";

export const metadata: Metadata = {
  title: "F. A. Q | ScoutFlair",
  description:
    "Answers to common questions about Scoutflair for players, scouts, coaches, and support.",
};

export default function FaqPage() {
  return <FaqSection />;
}
