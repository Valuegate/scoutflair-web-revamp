import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, ClipboardList, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-12">
      {/* Hero Section */}
      <section className="container grid md:grid-cols-2 gap-10 items-center pt-16">
        <div className="flex flex-col gap-6 items-start text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
            Unlock Potential with AI-Powered Scouting
          </h1>
          <p className="text-lg text-muted-foreground">
            ScoutVerse leverages cutting-edge AI to provide comprehensive and unbiased player analysis, helping you discover the stars of tomorrow.
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <Button size="lg" asChild>
              <Link href="/scouting-report">Generate a Report</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/features">Learn More</Link>
            </Button>
          </div>
        </div>
        <div>
          <Image
            src="https://placehold.co/600x400.png"
            alt="Scouting dashboard"
            width={600}
            height={400}
            className="rounded-xl shadow-2xl mx-auto"
            data-ai-hint="sports analytics"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Why ScoutVerse?</h2>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            Our platform provides unparalleled insights into player performance.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardHeader className="items-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <ClipboardList className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>In-Depth Reports</CardTitle>
              <CardDescription className="pt-2">
                Get detailed scouting reports covering everything from physical attributes to psychological profiles.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center">
            <CardHeader className="items-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <BarChart className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Data-Driven Insights</CardTitle>
              <CardDescription className="pt-2">
                Leverage advanced analytics and predictive modeling to make informed decisions.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center">
            <CardHeader className="items-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Collaborative Platform</CardTitle>
              <CardDescription className="pt-2">
                Share reports and collaborate with your team seamlessly within the platform.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container grid md:grid-cols-2 gap-12 items-center">
        <div>
          <Image
            src="https://placehold.co/600x500.png"
            alt="AI process illustration"
            width={600}
            height={500}
            className="rounded-xl shadow-xl mx-auto"
            data-ai-hint="data process"
          />
        </div>
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl md:text-4xl font-bold">Simple Steps to Uncover Talent</h2>
          <p className="text-lg text-muted-foreground">
            Our intuitive process makes advanced scouting accessible to everyone.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start gap-4">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center font-bold mt-1">1</div>
              <div>
                <h3 className="font-semibold text-lg">Define Your Criteria</h3>
                <p className="text-muted-foreground">Specify the skills, attributes, and potential you're looking for in a player.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center font-bold mt-1">2</div>
              <div>
                <h3 className="font-semibold text-lg">AI Generates Report</h3>
                <p className="text-muted-foreground">Our AI analyzes vast datasets to produce a comprehensive scouting report.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center font-bold mt-1">3</div>
              <div>
                <h3 className="font-semibold text-lg">Review and Decide</h3>
                <p className="text-muted-foreground">Use the detailed insights to make smarter, faster scouting decisions.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-card">
        <div className="container py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Revolutionize Your Scouting?</h2>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            Join the growing number of teams who trust ScoutVerse to find their next superstar. Get started today.
          </p>
          <div className="mt-6">
            <Button size="lg" asChild>
              <Link href="/scouting-report">Start Scouting Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
