// src/ai/flows/generate-scouting-report.ts
'use server';
/**
 * @fileOverview AI-powered scouting report generation.
 *
 * - generateScoutingReport - Generates a scouting report based on the provided criteria.
 * - GenerateScoutingReportInput - The input type for the generateScoutingReport function.
 * - GenerateScoutingReportOutput - The return type for the generateScoutingReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateScoutingReportInputSchema = z.object({
  criteria: z.string().describe('The criteria for generating the scouting report.'),
});
export type GenerateScoutingReportInput = z.infer<typeof GenerateScoutingReportInputSchema>;

const GenerateScoutingReportOutputSchema = z.object({
  report: z.string().describe('The generated scouting report.'),
});
export type GenerateScoutingReportOutput = z.infer<typeof GenerateScoutingReportOutputSchema>;

export async function generateScoutingReport(input: GenerateScoutingReportInput): Promise<GenerateScoutingReportOutput> {
  return generateScoutingReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateScoutingReportPrompt',
  input: {schema: GenerateScoutingReportInputSchema},
  output: {schema: GenerateScoutingReportOutputSchema},
  prompt: `You are an expert sports scout. Generate a scouting report based on the following criteria: {{{criteria}}}`,
});

const generateScoutingReportFlow = ai.defineFlow(
  {
    name: 'generateScoutingReportFlow',
    inputSchema: GenerateScoutingReportInputSchema,
    outputSchema: GenerateScoutingReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
