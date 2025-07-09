
const Step = ({ number, title, description }: { number: string; title: string; description: string; }) => (
    <div className="flex flex-col gap-3">
        <h3 className="font-lato text-base font-medium text-foreground">{title}</h3>
        <p className="font-lato text-sm text-foreground/80">{description}</p>
    </div>
);

const StepNumber = ({ number }: { number: string }) => (
    <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#192B4D] border border-[#946108] text-white text-xs font-manrope font-medium">
        {number}
    </div>
)

const StepConnector = () => (
    <div className="flex-1 h-px bg-[#946108]" />
)


export function HowItWorks() {
    const steps = [
        { number: '1', title: 'Create Your Profile', description: "Whether you're a player, coach, or scout, set up a profile to showcase your skills, experience, and goals." },
        { number: '2', title: 'Engage & Showcase', description: 'Players upload match footage and stats, while scouts and coaches browse, track, and evaluate talent' },
        { number: '3', title: 'Connect & Communicate', description: 'Players get discovered, scouts find top talent, and coaches build winning teams through direct messaging.' },
        { number: '4', title: 'Secure Opportunities', description: 'From trials to signings, coaching roles, and scouting missions—take your football career to the next level.' }
    ];

    return (
        <section className="relative z-10 pb-12 md:pb-20 -mt-28">
            <div className="container">
                <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
                    <div className="flex flex-col gap-5">
                        <h2 className="font-manrope text-2xl font-semibold text-center md:text-left">
                            How does it work?
                        </h2>
                        
                        {/* Stepper */}
                        <div className="hidden md:flex items-center w-full my-4">
                           <StepNumber number="1" />
                           <StepConnector />
                           <StepNumber number="2" />
                           <StepConnector />
                           <StepNumber number="3" />
                           <StepConnector />
                           <StepNumber number="4" />
                        </div>
                        
                        {/* Content */}
                        <div className="grid md:grid-cols-4 gap-x-8 gap-y-8">
                            {steps.map((step, index) => (
                                <div key={index} className="flex md:flex-col gap-4">
                                     <div className="md:hidden">
                                        <StepNumber number={step.number} />
                                     </div>
                                     <div className="flex flex-col gap-2">
                                        <h3 className="font-lato text-base font-medium text-foreground">{step.title}</h3>
                                        <p className="font-lato text-sm text-foreground/80">{step.description}</p>
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
