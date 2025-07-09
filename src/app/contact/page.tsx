import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CtaSection } from "@/components/cta-section";

export default function ContactPage() {
  return (
    <>
      <div className="container py-12 md:py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Contact Us</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Have a question or want to give us feedback? We'd love to hear from you.
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          <Card>
              <CardHeader>
                  <CardTitle>Send us a message</CardTitle>
                  <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
              </CardHeader>
              <CardContent>
                  <form className="grid gap-4">
                      <div className="grid md:grid-cols-2 gap-4">
                          <div className="grid gap-1.5">
                              <Label htmlFor="first-name">First Name</Label>
                              <Input id="first-name" placeholder="John" />
                          </div>
                          <div className="grid gap-1.5">
                              <Label htmlFor="last-name">Last Name</Label>
                              <Input id="last-name" placeholder="Doe" />
                          </div>
                      </div>
                      <div className="grid gap-1.5">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="john.doe@example.com" />
                      </div>
                      <div className="grid gap-1.5">
                          <Label htmlFor="message">Message</Label>
                          <Textarea id="message" placeholder="Your message..." />
                      </div>
                      <Button type="submit">Send Message</Button>
                  </form>
              </CardContent>
          </Card>
        </div>
      </div>
      <CtaSection />
    </>
  );
}
