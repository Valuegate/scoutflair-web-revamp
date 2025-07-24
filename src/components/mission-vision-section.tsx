import Image from 'next/image';

export function MissionVisionSection() {
    return (
        <section className="py-12 md:py-24">
            <div className="container">
                <div className="space-y-16 md:space-y-24">
                    {/* Mission Section */}
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 py-1.5 px-4 mb-6">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                                <span className="font-merriweather text-sm text-primary-dark">Our Mission</span>
                            </div>
                            <h2 className="font-manrope text-3xl font-bold text-foreground leading-tight mb-4">
                                Empowering Players, Transforming Scouting
                            </h2>
                            <p className="text-lg text-foreground/90 font-lato">
                                We are redefining football scouting by empowering players with a platform to showcase their skills, track progress, and connect with the right opportunities. At the same time, we equip scouts with advanced data-driven insights to make informed recruitment decisions. By bridging the gap between raw talent and professional opportunities, we are creating a more transparent, efficient, and impactful scouting ecosystem that benefits both players and the football industry at large.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                            <Image
                                src="/images/Frame_2121457548_1617_1608.png"
                                alt="Scout on phone"
                                width={312}
                                height={400}
                                className="rounded-2xl object-cover w-full h-full transition-transform duration-300 ease-in-out hover:scale-105"
                                data-ai-hint="scout phone"
                            />
                             <Image
                                src="/images/Frame_2121457554_1617_1624.png"
                                alt="Player in action"
                                width={312}
                                height={340}
                                className="rounded-2xl object-cover w-full h-full self-end transition-transform duration-300 ease-in-out hover:scale-105"
                                data-ai-hint="player action"
                            />
                        </div>
                    </div>

                    {/* Vision Section */}
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
                        <div className="grid grid-cols-2 gap-5">
                           <Image
                                src="/images/Frame_2121457555_1617_1625.png"
                                alt="Young players training"
                                width={312}
                                height={369}
                                className="rounded-2xl object-cover w-full h-full transition-transform duration-300 ease-in-out hover:scale-105"
                                data-ai-hint="young players training"
                            />
                            <Image
                                src="/images/Frame_2121457553_1617_1623.png"
                                alt="Player celebrating"
                                width={312}
                                height={304}
                                className="rounded-2xl object-cover w-full h-full self-end transition-transform duration-300 ease-in-out hover:scale-105"
                                data-ai-hint="player celebrating"
                            />
                        </div>
                         <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 py-1.5 px-4 mb-6">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                                <span className="font-merriweather text-sm text-primary-dark">Our Vision</span>
                            </div>
                            <h2 className="font-manrope text-3xl font-bold text-foreground leading-tight mb-4">
                                Breaking Barriers, Creating Football Legends
                            </h2>
                            <p className="text-lg text-foreground/90 font-lato">
                                We are revolutionizing football scouting by eliminating the geographical and financial barriers that prevent talented players from being discovered. Our platform ensures that every aspiring footballer, regardless of background, location, or resources, has an equal opportunity to showcase their skills and get noticed. By leveraging advanced data-driven insights and innovative scouting solutions, we connect players with scouts and clubs that can propel their careers forward. Our ultimate vision is to create a more inclusive and meritocratic football ecosystem where raw talent is the only metric that matters, nurturing a global community where the legends of tomorrow are born today.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
