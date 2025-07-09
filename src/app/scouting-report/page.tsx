import { ScoutingReportForm } from "./components/scouting-report-form";

export default function ScoutingReportPage() {
    return (
        <div className="container py-12 md:py-20">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight">AI Scouting Report Generator</h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                    Describe the ideal player you're looking for. Include details like position, key skills, physical attributes, and potential. Our AI will generate a comprehensive scouting report based on your criteria.
                </p>
            </div>
            <div className="max-w-3xl mx-auto">
                <ScoutingReportForm />
            </div>
        </div>
    );
}
