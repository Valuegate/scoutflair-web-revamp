import { AnalyticsIcon } from './icons/analytics-icon';
import { BinocularsIcon } from './icons/binoculars-icon';
import { DeveloperIcon } from './icons/developer-icon';
import { MindMappingIcon } from './icons/mind-mapping-icon';
import { cn } from '@/lib/utils';

const features = [
    {
        icon: <BinocularsIcon />,
        title: "Advance Scouting",
        description: "Discover talent with precision using our advanced scouting tools, providing in-depth analysis and insights to identify and evaluate top players.",
        titleColor: "text-[#0E6868]",
        hoverBgColor: "hover:bg-[#0E6868]",
        alt: "Binoculars icon representing advanced scouting",
    },
    {
        icon: <DeveloperIcon />,
        title: "Talent Development",
        description: "Enhance player skills with our comprehensive talent development programs, focusing on personalized training to maximize potential.",
        titleColor: "text-[#680E58]",
        hoverBgColor: "hover:bg-[#680E58]",
        alt: "Developer icon representing talent development",
    },
    {
        icon: <AnalyticsIcon />,
        title: "Data Analytics",
        description: "Unlock valuable insights with our data analytics tools, providing detailed performance metrics and actionable intelligence for decision-making.",
        titleColor: "text-[#53680E]",
        hoverBgColor: "hover:bg-[#53680E]",
        alt: "Analytics icon representing data analytics",
    },
    {
        icon: <MindMappingIcon />,
        title: "Information Mapping",
        description: "Visualize and organize complex data with our information mapping tools, making it easier to understand and interpret key insights.",
        titleColor: "text-[#037E11]",
        hoverBgColor: "hover:bg-[#037E11]",
        alt: "Mind mapping icon representing information mapping",
    }
];

export function CoreFeatures() {
    return (
        <section className="container py-16 md:py-24">
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
                    <div key={index} className={cn("group border border-[#192B4D]/20 rounded-2xl p-5 flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-all duration-300", feature.hoverBgColor)}>
                       <div className={cn("w-40 h-40 group-hover:text-white transition-colors duration-300", feature.titleColor)}>
                         {feature.icon}
                       </div>
                       <div className="w-full pt-6">
                           <div className="border-t border-[#1B1B1B]/20 group-hover:border-white/30 w-full mb-6 transition-colors duration-300"></div>
                           <h3 className={cn("font-manrope text-xl font-semibold mb-3 transition-colors duration-300", feature.titleColor, "group-hover:text-white")}>{feature.title}</h3>
                           <p className="font-lato text-sm text-[#1B1B1B]/80 group-hover:text-white/90 leading-relaxed transition-colors duration-300">{feature.description}</p>
                       </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
