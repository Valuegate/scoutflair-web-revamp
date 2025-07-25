const StepNumber = ({ number }: { number: string }) => (
    <div className="flex items-center justify-center w-[18px] h-[18px] rounded-full bg-[#192B4D] border border-[#946108] text-white text-[10px] font-manrope font-medium">
        {number}
    </div>
)

const StepConnector = () => (
    <div className="flex-1 h-[0.56px] bg-[#946108]" />
)

export function HowItWorks() {
    const steps = [
        { 
            number: '1', 
            title: 'Create Your Profile', 
            description: "Whether you're a player, coach, or scout, set up a profile to showcase your skills, experience, and goals." 
        },
        { 
            number: '2', 
            title: 'Engage & Showcase', 
            description: 'Players upload match footage and stats, while scouts and coaches browse, track, and evaluate talent' 
        },
        { 
            number: '3', 
            title: 'Connect & Communicate', 
            description: 'Players get discovered, scouts find top talent, and coaches build winning teams through direct messaging.' 
        },
        { 
            number: '4', 
            title: 'Secure Opportunities', 
            description: 'From trials to signings, coaching roles, and scouting missions—take your football career to the next level.' 
        }
    ];

    return (
        <section className="relative z-10 pb-12 md:pb-20 -mt-28">
            <div className="container px-4 md:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-[0_2px_6px_rgba(0,0,0,0.12)] p-6 md:p-8">
                    <div className="flex flex-col gap-5">
                        <h2 className="font-manrope text-2xl md:text-[24px] font-semibold text-center text-[#1B1B1B]/[0.96] md:text-left">
                            How does it work?
                        </h2>
                        
                        {/* Desktop Stepper */}
                        <div className="hidden md:flex items-center w-full my-4">
                           <StepNumber number="1" />
                           <StepConnector />
                           <StepNumber number="2" />
                           <StepConnector />
                           <StepNumber number="3" />
                           <StepConnector />
                           <StepNumber number="4" />
                        </div>
                        
                        {/* Desktop Content */}
                        <div className="hidden md:grid md:grid-cols-4 gap-x-[85px]">
                            {steps.map((step, index) => (
                                <div key={index} className="flex flex-col gap-3 max-w-[246px]">
                                   <h3 className="font-lato text-[16px] font-medium text-[#1B1B1B]/[0.94] leading-[19px]">{step.title}</h3>
                                   <p className="font-lato text-[14px] text-[#1B1B1B]/[0.80] leading-[21px]">{step.description}</p>
                                </div>
                            ))}
                        </div>

                        {/* Mobile Content */}
                        <div className="md:hidden flex flex-col gap-y-6 mt-4">
                             {steps.map((step, index) => (
                                <div key={index} className="flex gap-4">
                                     <div className="pt-0.5">
                                        <StepNumber number={step.number} />
                                     </div>
                                     <div className="flex flex-col gap-2 flex-1">
                                        <h3 className="font-lato text-[16px] font-medium text-[#1B1B1B]/[0.94]">{step.title}</h3>
                                        <p className="font-lato text-[14px] text-[#1B1B1B]/[0.80] leading-relaxed">{step.description}</p>
                                     </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}