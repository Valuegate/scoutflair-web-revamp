import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">About ScoutVerse</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            ScoutVerse was founded with a simple mission: to democratize sports scouting through the power of artificial intelligence. We believe that talent is everywhere, but opportunity is not. Our platform is designed to level the playing field, giving every team, regardless of size or budget, access to world-class scouting insights.
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            Our team consists of data scientists, sports analysts, and software engineers who are passionate about the intersection of technology and sports. We are dedicated to building a tool that is not only powerful but also intuitive and easy to use.
          </p>
        </div>
        <div>
          <Image
            src="/images/team-photo.png"
            alt="Team photo"
            width={600}
            height={400}
            className="rounded-xl shadow-lg"
            data-ai-hint="team business"
          />
        </div>
      </div>
    </div>
  );
}
