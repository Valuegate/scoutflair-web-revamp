'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { createScoutingReport } from '../actions';
import { Loader2 } from 'lucide-react';

const FormSchema = z.object({
  criteria: z.string().min(20, {
    message: 'Criteria must be at least 20 characters.',
  }),
});

export function ScoutingReportForm() {
  const [report, setReport] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      criteria: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setReport(null);
    try {
      const result = await createScoutingReport(data);
      if (result.error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.error,
        });
      } else if (result.report) {
        setReport(result.report);
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'An unexpected error occurred',
        description: 'Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
            <CardTitle>Scouting Criteria</CardTitle>
        </CardHeader>
        <CardContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                control={form.control}
                name="criteria"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Player Profile</FormLabel>
                    <FormControl>
                        <Textarea
                        placeholder="e.g., A young, fast striker with excellent finishing, good movement off the ball, and potential to be a top goalscorer. Should be under 21 and have experience in a top-tier European league."
                        className="min-h-[150px]"
                        {...field}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isLoading ? 'Generating...' : 'Generate Report'}
                </Button>
            </form>
            </Form>
        </CardContent>
      </Card>

      {report && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Scouting Report</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm text-foreground">
                {report.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
