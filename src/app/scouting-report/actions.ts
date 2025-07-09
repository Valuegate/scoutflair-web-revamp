'use server';

import { z } from 'zod';
import { generateScoutingReport } from '@/ai/flows/generate-scouting-report';

const FormSchema = z.object({
  criteria: z.string().min(20),
});

interface FormState {
    report?: string;
    error?: string;
}

export async function createScoutingReport(data: { criteria: string }): Promise<FormState> {
  const validatedFields = FormSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: 'Invalid input. Please provide more detailed criteria.',
    };
  }

  try {
    const { report } = await generateScoutingReport({
      criteria: validatedFields.data.criteria,
    });
    return { report };
  } catch (error) {
    console.error('Error generating scouting report:', error);
    return {
      error: 'Failed to generate scouting report. The AI service may be temporarily unavailable. Please try again later.',
    };
  }
}
