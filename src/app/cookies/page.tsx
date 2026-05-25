import type { Metadata } from "next";
import { LegalContentPage } from "@/components/legal-content-page";

const sections = [
  {
    id: "overview",
    title: "Overview",
    body: [
      "This Cookies Policy explains how Scoutflair uses cookies and similar technologies on our website and platform. Cookies help us keep the service secure, remember useful preferences, understand how people use Scoutflair, and improve scouting workflows for players, scouts, coaches, and clubs.",
      "By using Scoutflair, you can choose how non-essential cookies are used where cookie controls are available. Some cookies are necessary for the platform to work and cannot be switched off through our cookie tools.",
    ],
  },
  {
    id: "what-cookies-are",
    title: "What cookies are",
    body: [
      "Cookies are small text files stored on your device when you visit a website. Similar technologies, such as local storage, pixels, and device identifiers, may also be used to remember settings, measure activity, protect accounts, or support embedded services.",
    ],
  },
  {
    id: "how-we-use-cookies",
    title: "How we use cookies",
    bullets: [
      "Essential cookies keep you signed in, protect forms, remember security choices, balance traffic, and support core account features.",
      "Preference cookies remember settings such as language, region, and interface choices so Scoutflair feels consistent when you return.",
      "Analytics cookies help us understand page visits, feature usage, error patterns, and performance so we can improve the platform.",
      "Marketing or communication cookies may help us measure campaign performance and show relevant Scoutflair updates, only where permitted.",
    ],
  },
  {
    id: "third-parties",
    title: "Third-party services",
    body: [
      "We may use trusted service providers for hosting, analytics, payments, communication, media storage, security, and product improvement. These providers may set or read cookies when their services are used on Scoutflair.",
      "Where third-party cookies are used, their handling of data is also governed by their own policies and contractual obligations to Scoutflair.",
    ],
  },
  {
    id: "your-choices",
    title: "Your choices",
    body: [
      "You can manage cookies through your browser settings. Most browsers allow you to block, delete, or receive alerts about cookies. If you block essential cookies, parts of Scoutflair may not function properly.",
      "Where Scoutflair displays a cookie banner or preference center, you can use it to accept, reject, or adjust optional cookies. Your choices may need to be reset if you clear your browser data or use a different device.",
    ],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: [
      "We may update this Cookies Policy as our platform, technologies, or legal requirements change. The updated version will be posted on this page with a revised last updated date.",
    ],
  },
  {
    id: "contact",
    title: "Contact",
    body: [
      "Questions about this Cookies Policy can be sent to support@scoutflair.com. You can also contact Scoutflair through the contact page on our website.",
    ],
  },
];

export const metadata: Metadata = {
  title: "Cookies | ScoutFlair",
  description:
    "Learn how Scoutflair uses cookies and similar technologies across the platform.",
};

export default function CookiesPage() {
  return (
    <LegalContentPage
      label="Cookies"
      title="Cookies Policy"
      intro="How Scoutflair uses cookies and similar technologies to keep the platform secure, useful, and easier to improve."
      updatedAt="May 25, 2026"
      sections={sections}
    />
  );
}
