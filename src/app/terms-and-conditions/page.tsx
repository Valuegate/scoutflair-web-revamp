import type { Metadata } from "next";
import { LegalContentPage } from "@/components/legal-content-page";

const sections = [
  {
    id: "overview",
    title: "Overview",
    body: [
      "These Terms & Conditions govern your access to and use of Scoutflair, including our website, platform, profiles, scouting tools, communications, subscriptions, and related services. By using Scoutflair, you agree to these terms.",
      "Scoutflair helps football players, scouts, coaches, clubs, academies, and related organizations discover talent, evaluate profiles, share football information, and communicate about opportunities.",
    ],
  },
  {
    id: "accounts",
    title: "Accounts and eligibility",
    bullets: [
      "You must provide accurate account information and keep it up to date.",
      "You are responsible for keeping your login details secure and for activity under your account.",
      "If you create or manage an account for a player, club, academy, or organization, you confirm that you are authorized to do so.",
      "Young users may need permission from a parent, guardian, club, academy, or authorized representative where required by law or Scoutflair policy.",
    ],
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    bullets: [
      "Use Scoutflair only for lawful football scouting, profile, recruitment, networking, and platform-related purposes.",
      "Do not upload false, misleading, offensive, discriminatory, abusive, exploitative, or unlawful content.",
      "Do not impersonate another person, misrepresent affiliation with a club or organization, or create fake opportunities.",
      "Do not scrape, copy, sell, or misuse player data, scouting data, media, or platform content outside the permitted use of Scoutflair.",
      "Do not interfere with platform security, attempt unauthorized access, introduce malware, or overload Scoutflair systems.",
    ],
  },
  {
    id: "user-content",
    title: "User content",
    body: [
      "Users may upload or submit profile details, images, videos, statistics, scouting notes, messages, and other content. You remain responsible for the content you submit and must have the rights and permissions needed to share it on Scoutflair.",
      "By submitting content, you grant Scoutflair a limited right to host, process, display, transmit, and use that content as needed to operate, promote, protect, and improve the platform. This includes making profile content available to relevant users according to your role, settings, and Scoutflair features.",
    ],
  },
  {
    id: "opportunities",
    title: "Scouting opportunities and communications",
    body: [
      "Scoutflair provides tools that can help users discover, assess, and communicate about football talent and opportunities. We do not guarantee trials, contracts, scholarships, club selection, employment, representation, or any specific sporting outcome.",
      "Users are responsible for independently verifying scouts, coaches, clubs, opportunities, travel arrangements, contracts, and any third-party promises before acting on them.",
    ],
  },
  {
    id: "subscriptions",
    title: "Subscriptions and payments",
    body: [
      "Some Scoutflair features may require payment or a subscription. Pricing, billing periods, renewal terms, cancellation options, and included features will be shown during signup or checkout where paid services are offered.",
      "Unless otherwise stated, fees are payable in advance and may be handled by third-party payment providers. Taxes, bank charges, exchange rates, and payment provider terms may apply.",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    body: [
      "Scoutflair, including its brand, design, platform features, software, databases, logos, and original content, is owned by Scoutflair or its licensors and is protected by applicable intellectual property laws.",
      "You may not copy, modify, reverse engineer, distribute, sell, or create derivative works from Scoutflair without written permission, except where allowed by law or expressly permitted by the platform.",
    ],
  },
  {
    id: "suspension",
    title: "Suspension and termination",
    body: [
      "We may suspend, restrict, or terminate access to Scoutflair if we believe a user has violated these terms, created risk for other users, misused the platform, failed to pay applicable fees, or acted in a way that may harm Scoutflair, users, partners, or the public.",
      "You may stop using Scoutflair at any time. Some information may be retained where needed for legal, security, accounting, dispute, or platform integrity reasons.",
    ],
  },
  {
    id: "liability",
    title: "Disclaimers and liability",
    body: [
      "Scoutflair is provided on an as-is and as-available basis. We work to keep the platform reliable, but we do not promise uninterrupted access, error-free operation, or that every profile, statistic, video, message, or opportunity is complete or accurate.",
      "To the extent permitted by law, Scoutflair will not be liable for indirect, incidental, special, consequential, or punitive damages, or for lost profits, lost opportunities, data loss, reputational harm, or decisions made based on platform content.",
    ],
  },
  {
    id: "changes",
    title: "Changes to these terms",
    body: [
      "We may update these Terms & Conditions as Scoutflair evolves or legal requirements change. The updated terms will be posted on this page with a revised last updated date. Continued use of Scoutflair after updates means you accept the revised terms.",
    ],
  },
  {
    id: "contact",
    title: "Contact",
    body: [
      "Questions about these Terms & Conditions can be sent to support@scoutflair.com or submitted through the Scoutflair contact page.",
    ],
  },
];

export const metadata: Metadata = {
  title: "Terms & Conditions | ScoutFlair",
  description:
    "Terms governing the use of Scoutflair accounts, profiles, scouting tools, subscriptions, and communications.",
};

export default function TermsAndConditionsPage() {
  return (
    <LegalContentPage
      label="Terms & Conditions"
      title="Terms & Conditions"
      intro="The rules for using Scoutflair responsibly, including accounts, content, scouting communications, subscriptions, and platform protections."
      updatedAt="May 25, 2026"
      sections={sections}
    />
  );
}
