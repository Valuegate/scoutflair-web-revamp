import Image from 'next/image';

const teamMembers = [
    {
        name: 'Team Member 1',
        image: '/images/Frame_2121457560_1617_1688.png',
        hint: 'team member portrait'
    },
    {
        name: 'Team Member 2',
        image: '/images/Frame_2121457561_1617_1689.png',
        hint: 'team member portrait'
    },
    {
        name: 'Team Member 3',
        image: '/images/Frame_2121457562_1617_1692.png',
        hint: 'team member portrait'
    },
    {
        name: 'Team Member 4',
        image: '/images/Frame_2121457563_1617_1693.png',
        hint: 'team member portrait'
    }
];

export function MeetTheTeamSection() {
    return (
        <section className="py-12 md:py-24">
            <div className="container">
                <div className="flex flex-col gap-4 mb-12 md:mb-14">
                    <div className="inline-flex items-center gap-2 rounded-full border border-foreground/20 py-1.5 px-4 self-start">
                        <div className="w-1.5 h-1.5 bg-foreground rounded-full"></div>
                        <span className="font-merriweather text-sm text-foreground/90">Meet the Team</span>
                    </div>
                    <h2 className="font-manrope text-4xl font-bold text-foreground max-w-lg leading-tight">
                        The Minds Behind the Mission
                    </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="relative aspect-[3/4] w-full h-auto">
                           <Image
                             src={member.image}
                             alt={member.name}
                             fill
                             className="rounded-2xl object-cover"
                             data-ai-hint={member.hint}
                             sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                           />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
