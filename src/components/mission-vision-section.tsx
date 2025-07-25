import Image from 'next/image';

// Data configuration that defines the content for each section.
// Note the `className` on the shorter image in each pair.
const contentData = [
    {
        pill: 'Our Mission',
        title: 'Empowering Players, Transforming Scouting',
        description: 'We are redefining football scouting by empowering players with a platform to showcase their skills, track progress, and connect with the right opportunities. At the same time, we equip scouts with advanced data-driven insights to make informed recruitment decisions. By bridging the gap between raw talent and professional opportunities, we are creating a more transparent, efficient, and impactful scouting ecosystem that benefits both players and the football industry at large.',
        images: [
            { src: '/images/Frame_2121457548_1617_1608.png', alt: 'Scout on phone', width: 312, height: 400 },
            { src: '/images/Frame_2121457554_1617_1624.png', alt: 'Player in action', width: 312, height: 340, className: 'self-end' },
        ],
        imagePosition: 'right', // 'right' means images are on the right on desktop
    },
    {
        pill: 'Our Vision',
        title: 'Breaking Barriers, Creating Football Legends',
        description: 'We are revolutionizing football scouting by eliminating the geographical and financial barriers that prevent talented players from being discovered. Our platform ensures that every aspiring footballer, regardless of background, location, or resources, has an equal opportunity to showcase their skills and get noticed. By leveraging advanced data-driven insights and innovative scouting solutions, we connect players with scouts and clubs that can propel their careers forward. Our ultimate vision is to create a more inclusive and meritocratic football ecosystem where raw talent is the only metric that matters, nurturing a global community where the legends of tomorrow are born today.',
        images: [
            { src: '/images/Frame_2121457555_1617_1625.png', alt: 'Young players training', width: 312, height: 369 },
            { src: '/images/Frame_2121457553_1617_1623.png', alt: 'Player celebrating', width: 312, height: 304, className: 'self-end' },
        ],
        imagePosition: 'left', // 'left' means images are on the left on desktop
    },
];

// A single, reusable component to render a section
function ContentBlock({ data }: { data: typeof contentData[0] }) {
    const { pill, title, description, images, imagePosition } = data;

    // The block of two images
    const imageBlock = (
        <div className="grid grid-cols-2 gap-3 md:gap-5">
            {images.map((image) => (
                <Image
                    key={image.src}
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    // The className from our data object is applied here.
                    // This is how `self-end` gets added to the correct image.
                    // Removed hover animations and h-full to maintain exact dimensions
                    className={`rounded-xl md:rounded-2xl object-cover w-full ${image.className || ''}`}
                    style={{ 
                        height: `${image.height}px`
                    }}
                />
            ))}
        </div>
    );

    // The block of text content
    const textBlock = (
        <div className="px-4 md:px-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 py-1.5 px-4 mb-4 md:mb-6">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" aria-hidden="true"></div>
                <span className="font-merriweather text-xs md:text-sm text-primary-dark">{pill}</span>
            </div>
            <h2 className="font-manrope text-2xl md:text-3xl font-bold text-foreground leading-tight mb-3 md:mb-4">
                {title}
            </h2>
            <p className="text-base md:text-lg text-foreground/90 font-lato leading-relaxed">
                {description}
            </p>
        </div>
    );

    return (
        // The main grid that holds text and images.
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-16 items-center">
            {imagePosition === 'right' ? (
                // Mission: Text first, then images
                <>
                    <div className="order-2 md:order-1">{textBlock}</div>
                    <div className="order-1 md:order-2 px-4 md:px-0">{imageBlock}</div>
                </>
            ) : (
                // Vision: Images first, then text
                <>
                    <div className="order-1 px-4 md:px-0">{imageBlock}</div>
                    <div className="order-2">{textBlock}</div>
                </>
            )}
        </div>
    );
}

// The final component that you export
export function MissionVisionSection() {
    return (
        <section className="py-8 md:py-12 lg:py-24">
            <div className="container px-4 md:px-6 lg:px-8">
                <div className="space-y-12 md:space-y-16 lg:space-y-24">
                    {contentData.map((item, index) => (
                        <ContentBlock key={index} data={item} />
                    ))}
                </div>
            </div>
        </section>
    );
}