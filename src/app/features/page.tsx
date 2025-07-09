import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, ClipboardList, Users, BrainCircuit, Search, Share2 } from "lucide-react";

const features = [
    {
        icon: <BrainCircuit className="h-8 w-8 text-primary" />,
        title: "AI-Powered Analysis",
        description: "Our core feature. Utilizes advanced machine learning models to analyze player data and generate insightful reports."
    },
    {
        icon: <ClipboardList className="h-8 w-8 text-primary" />,
        title: "Comprehensive Reports",
        description: "Receive detailed reports covering technical skills, physical attributes, performance metrics, and potential indicators."
    },
    {
        icon: <BarChart className="h-8 w-8 text-primary" />,
        title: "Predictive Analytics",
        description: "Go beyond current performance with AI-driven predictions on player development and future success."
    },
    {
        icon: <Search className="h-8 w-8 text-primary" />,
        title: "Customizable Search",
        description: "Filter and search for players based on a wide range of criteria to find the perfect match for your team's needs."
    },
    {
        icon: <Users className="h-8 w-8 text-primary" />,
        title: "Team Collaboration",
        description: "Share scouting lists, reports, and notes with your colleagues to streamline your team's workflow."
    },
    {
        icon: <Share2 className="h-8 w-8 text-primary" />,
        title: "Easy Integration",
        description: "Export data and reports to integrate with your existing team management systems and software."
    }
]

export default function FeaturesPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Platform Features</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore the powerful tools ScoutVerse offers to enhance your scouting process.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
            <Card key={index}>
                <CardHeader>
                    <div className="flex flex-col items-center text-center gap-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                            {feature.icon}
                        </div>
                        <CardTitle>{feature.title}</CardTitle>
                    </div>
                    <CardDescription className="pt-2 text-center">
                        {feature.description}
                    </CardDescription>
                </CardHeader>
            </Card>
        ))}
      </div>
    </div>
  );
}
