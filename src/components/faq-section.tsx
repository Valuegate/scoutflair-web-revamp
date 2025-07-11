
'use client';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus, Minus } from "lucide-react";

const generalFaqs = [
    {
        question: "What is Scoutflair, and how does it work?",
        answer: "Scoutflair is a football scouting platform designed to connect talented players with scouts and coaches looking for the next big star.\nPlayers can create detailed profiles showcasing their skills, stats, and highlight videos, making it easier for scouts to discover them. Scouts and coaches can browse through profiles, assess player performance, and connect with potential recruits. Whether you're a player looking for opportunities or a scout searching for talent, Scoutflair streamlines the process to help careers take off.",
        value: "general-1"
    },
    {
        question: "Who can use Scoutflair—players, scouts, or coaches?",
        answer: "Scoutflair is for everyone in the football ecosystem. Players can build their profiles, scouts can discover new talent, and coaches can find the right players for their teams. Our platform is designed to bridge the gap between all parties.",
        value: "general-2"
    },
    {
        question: "Is Scoutflair free to use, or are there subscription plans?",
        answer: "Scoutflair offers both free and premium subscription plans. The free plan allows players to create a basic profile, while premium plans offer advanced features like detailed analytics, increased visibility, and direct messaging with scouts and coaches. Visit our pricing page for more details.",
        value: "general-3"
    },
];

const playerFaqs = [
    {
        question: "How do I create a profile as a player?",
        answer: "Creating a profile on Scoutflair is simple and essential for getting noticed by scouts and coaches. To get started, sign up on the platform and choose the \"Player\" account type. Once registered, you’ll need to fill out your profile with key details, including your position, playing style, height, weight, preferred foot, and team history.\nTo stand out, upload high-quality highlight videos, showcase your match stats and achievements, and add a short bio describing your football journey.",
        value: "player-1"
    },
    {
        question: "How do scouts find my profile?",
        answer: "Scouts can find your profile through our advanced search and filtering tools. To increase your visibility, make sure your profile is complete, up-to-date, and includes high-quality video highlights. Engaging with the community and regularly updating your stats can also boost your profile's ranking.",
        value: "player-2"
    },
    {
        question: "What happens when a scout shows interest in me?",
        answer: "When a scout shows interest, you will receive a notification on the platform. Depending on their subscription level and your settings, they may be able to message you directly to discuss potential opportunities, trial invitations, or contract offers. It's the first step to getting discovered!",
        value: "player-3"
    }
];

const scoutFaqs = [
    {
        question: "How do I search for players on Scoutflair?",
        answer: "Scouts and coaches can easily find players on Scoutflair using the advanced search and filtering system. Simply log into your account and navigate to the Player Search section, where you can filter players based on position, age, nationality, playing style, skill level, and other key attributes.\nFor a more precise search, you can use keywords, performance stats, and highlight videos to assess a player's capabilities. Once you find promising talent, you can save profiles, compare players, and reach out to them directly through the platform.",
        value: "scout-1"
    },
    {
        question: "What kind of player data and stats are available?",
        answer: "We provide comprehensive player data including physical attributes, performance metrics (goals, assists, pass accuracy, etc.), positional information, and career history. Our premium features also include advanced analytics and predictive performance indicators to help you make informed decisions.",
        value: "scout-2"
    },
    {
        question: "Can I contact players directly through the platform?",
        answer: "Yes, our platform facilitates direct communication between scouts, coaches, and players. With a premium account, you can send messages, request more information, and initiate conversations with promising talents, streamlining your recruitment process.",
        value: "scout-3"
    }
]

const coachFaqs = [
     {
        question: "How can coaches use Scoutflair to find and recruit players?",
        answer: "Coaches can leverage Scoutflair to identify, evaluate, and connect with top football talent. The platform provides access to a vast pool of players, each with a detailed profile showcasing stats, skills, and highlight videos, making it easier to assess potential recruits. Coaches can search for players based on specific criteria, compare prospects, track their progress over time, and build a shortlist of those who match their team’s requirements. With advanced scouting tools, streamlined communication features, and real-time player updates,",
        value: "coach-1"
    },
    {
        question: "Can I track multiple players and compare them?",
        answer: "Absolutely. Our platform includes tools to create shortlists, add notes on players, and compare their stats and attributes side-by-side. This helps you track your top prospects and make data-driven decisions for your team.",
        value: "coach-2"
    },
    {
        question: "Is there a team management feature for coaches?",
        answer: "While Scoutflair's primary focus is on scouting and recruitment, we offer features that help coaches manage their prospect lists and collaborate with their scouting team. You can share profiles, notes, and evaluations with your colleagues to ensure everyone is on the same page.",
        value: "coach-3"
    }
]

const supportFaqs = [
    {
        question: "Who do I contact for support?",
        answer: "If you have any questions or need assistance, our support team is here to help. You can reach us through the contact form on our website or by emailing support@scoutflair.com. We aim to respond to all inquiries within 24 hours.",
        value: "support-1"
    },
    {
        question: "How do I reset my password if I forget it?",
        answer: "If you forget your password, you can easily reset it by clicking the \"Forgot Password?\" link on the login page. Follow the instructions sent to your email to create a new password and regain access to your account.",
        value: "support-2"
    },
    {
        question: "How do I delete my account if I no longer need it?",
        answer: "If you wish to delete your account, you can do so from your account settings page. Please be aware that this action is permanent and will remove all your data from our platform. If you have any trouble, please contact our support team for assistance.",
        value: "support-3"
    },
    {
        question: "What should I do if I experience issues with my profile?",
        answer: "If you encounter any technical issues with your profile or the platform, please clear your browser cache and try again. If the problem persists, contact our support team with a description of the issue and any relevant screenshots, and we will investigate promptly.",
        value: "support-4"
    },
];

const FaqCategory = ({ title, faqs }: { title: string, faqs: { question: string, answer: string, value: string }[] }) => (
    <div className="flex flex-col gap-5">
        <h3 className="font-manrope text-2xl font-bold text-[#192B4D]">{title}</h3>
        <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq) => (
                <AccordionItem key={faq.value} value={faq.value} className="bg-white rounded-md shadow-sm border-none">
                    <AccordionTrigger className="group text-left font-lato text-lg font-bold text-[#1B1B1B] p-4 hover:no-underline">
                        <span className="flex-1">{faq.question}</span>
                        <Plus className="h-6 w-6 text-[#041931] shrink-0 transition-transform duration-200 group-data-[state=open]:hidden" />
                        <Minus className="h-6 w-6 text-[#041931] shrink-0 transition-transform duration-200 hidden group-data-[state=open]:block" />
                    </AccordionTrigger>
                    <AccordionContent className="p-4 pt-0">
                        <div className="space-y-3 text-[#1B1B1B]/80 font-lato text-base leading-relaxed">
                            {faq.answer.split('\n').map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    </div>
);

export function FaqSection() {
    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="container">
                {/* Header */}
                <div className="mb-12 md:mb-16">
                    <div className="flex items-center gap-2 self-start border border-[#041931]/40 rounded-full py-1.5 px-4 w-fit">
                        <div className="w-1.5 h-1.5 bg-[#041931] rounded-full"></div>
                        <span className="font-merriweather text-sm text-[#192B4D]">F.A.Q</span>
                    </div>
                    <div className="mt-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <h2 className="font-manrope text-4xl font-bold text-[#1B1B1B] max-w-lg leading-tight">
                            Everything You Wanted to Ask (But Didn't)
                        </h2>
                        <p className="font-lato text-lg text-[#1B1B1B]/90 max-w-2xl">
                            Find clear, straightforward answers to the most common questions about how Scoutflair works, helping you navigate the platform with ease.
                        </p>
                    </div>
                </div>

                {/* Accordions */}
                <div className="space-y-12">
                    <div className="grid md:grid-cols-2 gap-x-8 gap-y-12">
                       <FaqCategory title="General Questions" faqs={generalFaqs} />
                       <FaqCategory title="For Players" faqs={playerFaqs} />
                       <FaqCategory title="For Scouts" faqs={scoutFaqs} />
                       <FaqCategory title="For Coaches" faqs={coachFaqs} />
                    </div>
                     <div className="pt-8 border-t border-gray-200">
                        <FaqCategory title="Technical and Support" faqs={supportFaqs} />
                    </div>
                </div>
            </div>
        </section>
    )
}
