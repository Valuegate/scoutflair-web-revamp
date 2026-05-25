import type { Metadata } from "next";
import { LegalContentPage } from "@/components/legal-content-page";

const sections = [
  {
    id: "overview",
    title: "Overview",
    body: [
      "This Privacy Policy explains how Scoutflair collects, uses, shares, stores, and protects personal information when you visit our website, create an account, upload football profile content, communicate through the platform, or use related services.",
      "Scoutflair is a football scouting platform designed to connect players, scouts, coaches, clubs, and football opportunities. Because discovery depends on accurate profiles and trusted communication, we only ask for information that supports account management, talent visibility, scouting, safety, and platform improvement.",
    ],
  },
  {
    id: "information-we-collect",
    title: "Information we collect",
    bullets: [
      "Account information, such as name, email address, phone number, password credentials, role type, country, and communication preferences.",
      "Player and scouting profile information, such as age range or date of birth where required, position, preferred foot, height, weight, team history, achievements, performance data, statistics, videos, photos, and biography details.",
      "Verification and support information, such as identity checks, eligibility details, support messages, feedback, and records needed to resolve account issues.",
      "Usage and device information, such as IP address, browser type, device identifiers, pages viewed, actions taken, approximate location, log data, and cookie data.",
      "Payment or subscription information, where paid services are available. Payment card details are handled by payment providers and are not stored by Scoutflair unless expressly stated.",
    ],
  },
  {
    id: "how-we-use-information",
    title: "How we use information",
    bullets: [
      "To create, manage, secure, and personalize Scoutflair accounts.",
      "To display player profiles, highlight videos, statistics, scouting notes, shortlists, and opportunity-related information according to account settings and platform features.",
      "To help scouts, coaches, clubs, and players discover, assess, and communicate with relevant football talent.",
      "To provide customer support, troubleshoot bugs, process requests, and send important service notices.",
      "To detect, prevent, and respond to fraud, misuse, security threats, policy violations, or unlawful activity.",
      "To analyze platform performance, improve features, develop new services, and measure the effectiveness of Scoutflair communications.",
      "To comply with legal obligations, enforce our Terms & Conditions, and protect the rights, safety, and interests of Scoutflair, users, and partners.",
    ],
  },
  {
    id: "sharing",
    title: "How information is shared",
    body: [
      "Profile information may be visible to other users based on the role you choose, the features you use, and your account settings. For example, a player profile may be discoverable by scouts or coaches so they can assess football ability and contact the player about relevant opportunities.",
      "We may share information with trusted service providers who help us operate Scoutflair, including hosting, analytics, communications, payments, security, storage, customer support, and verification providers. These providers are expected to process information only for authorized purposes.",
      "We may also share information when required by law, to protect safety and rights, in connection with a business transfer, or with your consent.",
    ],
  },
  {
    id: "children-and-youth",
    title: "Children and youth players",
    body: [
      "Scoutflair may be used by young football talent only where permitted by applicable law and platform rules. If a user is below the age required to manage their own account, consent or involvement from a parent, guardian, club, academy, or authorized representative may be required.",
      "We encourage parents, guardians, clubs, and coaches to supervise how young players share videos, contact details, and personal information online.",
    ],
  },
  {
    id: "retention",
    title: "Retention",
    body: [
      "We keep personal information for as long as needed to provide Scoutflair, maintain accurate records, resolve disputes, comply with legal obligations, prevent misuse, and enforce our terms. When information is no longer needed, we delete, anonymize, or securely retain it only where legally or operationally necessary.",
    ],
  },
  {
    id: "your-rights",
    title: "Your rights and choices",
    body: [
      "Depending on your location, you may have rights to access, correct, delete, restrict, object to, or receive a copy of your personal information. You may also have the right to withdraw consent where processing is based on consent.",
      "You can update many account details from your profile settings. For privacy requests, contact support@scoutflair.com and include enough information for us to verify and respond to your request.",
    ],
  },
  {
    id: "security",
    title: "Security",
    body: [
      "We use technical and organizational measures designed to protect personal information against unauthorized access, loss, misuse, alteration, and disclosure. No online service can guarantee absolute security, so users should choose strong passwords, keep login details private, and report suspicious activity promptly.",
    ],
  },
  {
    id: "contact",
    title: "Contact",
    body: [
      "Questions, requests, or concerns about this Privacy Policy can be sent to support@scoutflair.com or submitted through the Scoutflair contact page.",
    ],
  },
];

export const metadata: Metadata = {
  title: "Privacy Policy | ScoutFlair",
  description:
    "How Scoutflair collects, uses, shares, and protects personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalContentPage
      label="Privacy Policy"
      title="Privacy Policy"
      intro="Clear information about the personal data Scoutflair collects, why we use it, and the choices available to our users."
      updatedAt="May 25, 2026"
      sections={sections}
    />
  );
}
