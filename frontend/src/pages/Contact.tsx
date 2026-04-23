import { useState } from "react";
import { Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Contact = () => {
  const [sending, setSending] = useState(false);
  return (
    <div className="container py-12">
      <header className="mx-auto max-w-2xl text-center">
        <p className="text-xs uppercase tracking-wider text-primary">Get in touch</p>
        <h1 className="mt-2 text-4xl font-bold md:text-5xl">
          Let's <span className="text-gradient">decarbonize</span> a city together.
        </h1>
        <p className="mt-4 text-muted-foreground">
          Judges, mentors, planners or partners — we'd love to hear from you.
        </p>
      </header>

      <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-5">
        <div className="space-y-4 md:col-span-2">
          <div className="glass-card rounded-xl p-5">
            <Mail className="h-5 w-5 text-primary" />
            <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">Email</p>
            <p className="text-sm font-medium">team@carbontwin.app</p>
          </div>
          <div className="glass-card rounded-xl p-5">
            <MapPin className="h-5 w-5 text-accent" />
            <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">Based in</p>
            <p className="text-sm font-medium">Bangalore, India</p>
          </div>
        </div>

        <form
          className="glass-card space-y-4 rounded-xl p-5 md:col-span-3"
          onSubmit={(e) => {
            e.preventDefault();
            setSending(true);
            setTimeout(() => {
              setSending(false);
              toast.success("Message sent! We'll reply within 24h.");
              (e.target as HTMLFormElement).reset();
            }, 800);
          }}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <Input required placeholder="Your name" />
            <Input required type="email" placeholder="Email" />
          </div>
          <Input placeholder="Organization (optional)" />
          <Textarea required placeholder="How can we help?" rows={5} />
          <Button type="submit" disabled={sending} className="w-full">
            {sending ? "Sending..." : (<>Send message <Send className="ml-1 h-4 w-4" /></>)}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;