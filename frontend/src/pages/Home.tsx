import { Link } from "react-router-dom";
import { Activity, ArrowRight, Cpu, Gauge, Leaf, MapPin, Sparkles, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { v: "12", l: "City zones modeled" },
  { v: "830+", l: "Tonnes CO₂/day simulated" },
  { v: "4", l: "Capture strategies" },
  { v: "Real-time", l: "Decision support" },
];

const features = [
  { icon: MapPin, title: "Hotspot Mapping", desc: "Visualize CO₂ load across Bangalore neighborhoods with live heat halos." },
  { icon: Gauge, title: "AQI Forecasting", desc: "Translate emission scenarios into pollutant mix and AQI category shifts." },
  { icon: Sparkles, title: "Intervention Sandbox", desc: "Test roadside capture, biofilters, vertical gardens and EV adoption instantly." },
  { icon: Cpu, title: "Sensor-Ready", desc: "Pluggable data layer for IoT sensors, traffic feeds and weather APIs." },
  { icon: Activity, title: "Source Attribution", desc: "Break down emissions by transport, industry, power and residential sources." },
  { icon: Wind, title: "Planner Dashboards", desc: "Decision-support KPIs for city planners and sustainability officers." },
];

const Home = () => {
  return (
    <div className="space-y-24 pb-16">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute right-10 top-40 h-[280px] w-[280px] rounded-full bg-accent/15 blur-3xl" />
        </div>
        <div className="container pt-16 pb-10 md:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs">
              <Leaf className="h-3.5 w-3.5 text-primary" />
              Smart India Hackathon · Climate Action Track
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              A <span className="text-gradient">Digital Twin</span> for CO₂ Capture in Urban Bangalore
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
              Simulate emissions, test capture interventions, and predict air-quality outcomes — before
              a single sensor or biofilter is deployed in the city.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <Link to="/demo">
                  Launch Live Twin <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/architecture">See the architecture</Link>
              </Button>
            </div>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-3 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.l} className="glass-card rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-gradient">{s.v}</p>
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="container">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs uppercase tracking-wider text-primary">The Problem</p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">Cities can't manage what they can't see.</h2>
            <p className="mt-4 text-muted-foreground">
              Bangalore's traffic, industries and households release thousands of tonnes of CO₂ daily.
              Carbon-capture interventions are expensive, and planners have no way to test where they will
              actually help most. Today's choices are made on guesswork.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { v: "8.4M", l: "Population" },
              { v: "+5%/yr", l: "CO₂ growth" },
              { v: "AQI 160+", l: "Peak smog" },
              { v: "0", l: "Public twins" },
            ].map((s) => (
              <div key={s.l} className="glass-card rounded-xl p-5">
                <p className="text-3xl font-bold text-aqi-bad">{s.v}</p>
                <p className="text-xs text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-wider text-primary">What it does</p>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">Plan capture strategies, not surprises.</h2>
          <p className="mt-3 text-muted-foreground">
            CarbonTwin fuses emissions modeling, weather, and capture physics into one decision-support tool.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="glass-card group rounded-xl p-5 transition-all hover:border-primary/40">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container">
        <div className="glass-card relative overflow-hidden rounded-2xl p-8 md:p-12">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative grid gap-6 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-2xl font-bold md:text-3xl">Try the live twin.</h2>
              <p className="mt-2 text-muted-foreground">
                Drag sliders, watch hotspots cool, and see AQI improve in real time.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Button asChild size="lg">
                <Link to="/demo">Open Dashboard</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/team">Meet the team</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;