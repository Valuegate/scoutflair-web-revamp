import Image from 'next/image';

const partners = [
    { name: 'Houth Fc', hint: 'football logo' },
    { name: 'Scoutflair Fc', hint: 'football logo' },
    { name: 'FayGroup', hint: 'corporate logo' },
    { name: 'Sleek Fc', hint: 'football logo' },
    { name: 'Valuegate', hint: 'corporate logo' },
    { name: 'FayGroup', hint: 'corporate logo' },
    { name: 'Scoutflair Fc', hint: 'football logo' },
    { name: 'Academy', hint: 'academy logo' },
    { name: 'Mason', hint: 'corporate logo' },
];

export function PartnersSection() {
    const allPartners = [...partners, ...partners]; // Duplicate for seamless loop

    return (
        <div className="bg-[#192B4D] py-7 shadow-inner overflow-hidden">
            <div className="relative w-full">
                <div className="flex animate-marquee whitespace-nowrap">
                    {allPartners.map((partner, index) => (
                        <div key={index} className="flex items-center gap-3 mx-10 shrink-0">
                            <Image
                                src="https://placehold.co/24x24.png"
                                alt={`${partner.name} logo`}
                                width={24}
                                height={24}
                                className="rounded-full"
                                data-ai-hint={partner.hint}
                            />
                            <span className="text-base font-montserrat font-medium text-white">{partner.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
