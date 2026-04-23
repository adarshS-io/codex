import { CheckCircle2, Target, Lightbulb, TrendingUp } from "lucide-react";

const About = () => (
  <div className="container space-y-16 py-12">
    <header className="mx-auto max-w-3xl text-center">
      <p className="text-xs uppercase tracking-wider text-primary">About the project</p>
      <h1 className="mt-2 text-4xl font-bold md:text-5xl">
        Building the city's <span className="text-gradient">carbon nervous system</span>
      </h1>
      <p className="mt-4 text-muted-foreground">
        CarbonTwin models how CO₂ is generated, dispersed and captured across Bangalore so
        planners can deploy capture infrastructure where it actually matters.
      </p>
    </header>

    <section className="grid gap-4 md:grid-cols-2">
      {[
        { icon: Target, title: "Problem Statement", body: "Design a digital twin that simulates CO₂ generation, dispersion and capture in an urban setting." },
        { icon: Lightbulb, title: "Our Approach", body: "Source-attributed emissions × weather dispersion × intervention physics, served as a planner-friendly dashboard." },
        { icon: TrendingUp, title: "Expected Impact", body: "Up to 35% modeled CO₂ reduction with combined biofilter, EV and rooftop garden strategies in dense corridors." },
        { icon: CheckCircle2, title: "Why a Twin?", body: "Test 100s of scenarios virtually, avoid stranded capital, and validate ROI before any field deployment." },
      ].map((b) => (
        <div key={b.title} className="glass-card rounded-xl p-6">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
            <b.icon className="h-5 w-5" />
          </span>
          <h2 className="mt-4 text-lg font-semibold">{b.title}</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">{b.body}</p>
        </div>
      ))}
    </section>

    <section className="grid gap-6 lg:grid-cols-3">
      <div className="glass-card rounded-xl p-6 lg:col-span-2">
        <h2 className="text-lg font-semibold">How the simulation works</h2>
        <ol className="mt-4 space-y-4 text-sm">
          {[
            ["Source modeling", "Emissions are computed per zone from transport, industry, power and residential activity."],
            ["Dispersion", "Weather (wind, humidity, temperature) modulates how CO₂ accumulates and disperses."],
            ["Capture physics", "Each intervention applies a calibrated reduction factor weighted to its target source."],
            ["AQI projection", "Aggregate load is converted to an AQI estimate with category coloring for planners."],
            ["Decision support", "KPIs and charts update live as planners adjust sliders for what-if analysis."],
          ].map(([t, d], i) => (
            <li key={t} className="flex gap-3">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                {i + 1}
              </span>
              <div>
                <p className="font-medium">{t}</p>
                <p className="text-muted-foreground">{d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="glass-card rounded-xl p-6">
        <h2 className="text-lg font-semibold">Aligned with</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {[
            "UN SDG 11 — Sustainable Cities",
            "UN SDG 13 — Climate Action",
            "India NDC 2030 targets",
            "Bangalore Climate Action Plan",
          ].map((s) => (
            <li key={s} className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" /> {s}
            </li>
          ))}
        </ul>
      </div>
    </section>
  </div>
);

export default About;