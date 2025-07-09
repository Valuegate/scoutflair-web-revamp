import Image from 'next/image';

const partners = [
    { name: 'Houth Fc', src: '/images/bemis_toilet_seats_icon_jpeg_1616_1656.png', hint: 'football logo' },
    { name: 'Scoutflair Fc', src: '/images/nebraska_furniture_mart_icon_png_1616_1686.png', hint: 'football logo' },
    { name: 'FayGroup', src: '/images/bemis_toilet_seats_icon_jpeg_1616_1662.png', hint: 'corporate logo' },
    { name: 'Sleek Fc', src: '/images/rocky_sand_studio_icon_png_1616_1665.png', hint: 'football logo' },
    { name: 'Valuegate', src: '/images/nebraska_furniture_mart_icon_png_1616_1684.png', hint: 'corporate logo' },
    { name: 'FayGroup', src: '/images/plaza_homes_icon_jpeg_1616_1671.png', hint: 'corporate logo' },
    { name: 'Scoutflair Fc', src: '/images/nebraska_furniture_mart_icon_png_1616_1674.png', hint: 'football logo' },
    { name: 'Academy', src: '/images/roofingsource_icon_png_1616_1677.png', hint: 'academy logo' },
    { name: 'Mason', src: '/images/nebraska_furniture_mart_icon_png_1616_1688.png', hint: 'corporate logo' },
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
                                src={partner.src}
                                alt={`${partner.name} logo`}
                                width={24}
                                height={24}
                                className="rounded-full object-cover"
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
