import Image from 'next/image';
import { BinocularsIcon } from './icons/binoculars-icon';
import { DeveloperIcon } from './icons/developer-icon';
import { AnalyticsIcon } from './icons/analytics-icon';
import { MindMappingIcon } from './icons/mind-mapping-icon';

const features = [
    {
        icon: <BinocularsIcon />,
        title: "Advance Scouting",
        description: "Discover talent with precision using our advanced scouting tools, providing in-depth analysis and insights to identify and evaluate top players.",
        titleColor: "text-[#0DA8A8]",
        alt: "Binoculars icon representing advanced scouting",
    },
    {
        icon: <DeveloperIcon />,
        title: "Talent Development",
        description: "Enhance player skills with our comprehensive talent development programs, focusing on personalized training to maximize potential.",
        titleColor: "text-[#680E58]",
        alt: "Developer icon representing talent development",
    },
    {
        icon: <AnalyticsIcon />,
        title: "Data Analytics",
        description: "Unlock valuable insights with our data analytics tools, providing detailed performance metrics and actionable intelligence for decision-making.",
        titleColor: "text-[#53680E]",
        alt: "Analytics icon representing data analytics",
    },
    {
        icon: <MindMappingIcon />,
        title: "Information Mapping",
        description: "Visualize and organize complex data with our information mapping tools, making it easier to understand and interpret key insights.",
        titleColor: "text-[#037E11]",
        alt: "Mind mapping icon representing information mapping",
    }
];

export function CoreFeatures() {
    return (
        <section>
            <div className="bg-[#192B4D] bg-[url('/images/background-texture.png')] bg-cover bg-center">
                <div className="container py-5">
                    <p className="text-white/90 text-center text-lg font-lato">
                        Scoutflair equips you with powerful tools to showcase talent, analyze performance, and elevate football scouting
                    </p>
                </div>
            </div>

            <div className="container py-16 md:py-24">
                <div className="flex flex-col gap-4 mb-12">
                    <div className="flex items-center gap-2 self-start border border-[#041931]/40 rounded-full py-1.5 px-4">
                        <div className="w-1.5 h-1.5 bg-[#041931] rounded-full"></div>
                        <span className="font-merriweather text-sm text-[#192B4D]">Core Features</span>
                    </div>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <h2 className="font-manrope text-4xl font-bold text-[#1B1B1B] max-w-lg leading-tight">
                            Game-Changing Tools for Next-Level Scouting
                        </h2>
                        <p className="font-lato text-lg text-[#1B1B1B]/90 max-w-2xl">
                            Empowering scouts with cutting-edge tools to discover, analyze, and connect with top football talent seamlessly—bringing the future of scouting to your fingertips.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {features.map((feature, index) => (
                        <div key={index} className="border border-[#192B4D]/20 rounded-2xl p-5 flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-shadow duration-300">
                           <div className="w-40 h-40">
                             {feature.icon}
                           </div>
                           <div className="w-full pt-6">
                               <div className="border-t border-[#1B1B1B]/20 w-full mb-6"></div>
                               <h3 className={`font-manrope text-xl font-semibold ${feature.titleColor} mb-3`}>{feature.title}</h3>
                               <p className="font-lato text-sm text-[#1B1B1B]/80 leading-relaxed">{feature.description}</p>
                           </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
