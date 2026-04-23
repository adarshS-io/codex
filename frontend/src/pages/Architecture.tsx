import { Cloud, Cpu, Database, GitBranch, LayoutDashboard, Radio } from "lucide-react";

const stack = [
  { group: "Frontend", items: ["React 18", "TypeScript", "Tailwind CSS", "Recharts", "shadcn/ui"] },
  { group: "Simulation", items: ["Source-weighted model", "Reduction-factor solver", "AQI estimator"] },
  { group: "Data Layer", items: ["IoT-ready ingestion", "Weather API", "Traffic feeds", "OpenAQ"] },
  { group: "Backend (planned)", items: ["Edge functions", "Time-series DB", "Auth & roles"] },
];

const layers = [
  { icon: Radio, title: "Sensor / Data Sources", desc: "IoT CO₂ sensors, traffic counts, weather APIs, satellite." , color: "hsl(var(--aqi-poor))"},
  { icon: Database, title: "Ingestion & Storage", desc: "Streaming ingest into time-series storage with zone tagging.", color: "hsl(var(--aqi-moderate))" },
  { icon: Cpu, title: "Simulation Engine", desc: "Source attribution + capture physics + AQI projection.", color: "hsl(var(--primary))" },
  { icon: Cloud, title: "API Gateway", desc: "Serves zones, scenarios, and KPIs to clients.", color: "hsl(var(--accent))" },
  { icon: LayoutDashboard, title: "Planner Dashboard", desc: "Map, charts, sliders and decision-support KPIs.", color: "hsl(var(--primary))" },
];

const Architecture = () => (
  <div className="container space-y-14 py-12">
    <header className="mx-auto max-w-3xl text-center">
      <p className="text-xs uppercase tracking-wider text-primary">System design</p>
      <h1 className="mt-2 text-4xl font-bold md:text-5xl">
        From <span className="text-gradient">sensors</span> to <span className="text-gradient">decisions</span>
      </h1>
      <p className="mt-4 text-muted-foreground">
        A modular pipeline that turns raw urban telemetry into actionable carbon-capture plans.
      </p>
    </header>

    {/* Pipeline */}
    <section className="glass-card rounded-2xl p-6 md:p-8">
      <div className="grid gap-4 md:grid-cols-5">
        {layers.map((l, i) => (
          <div key={l.title} className="relative">
            <div className="rounded-xl border border-border bg-secondary/40 p-4">
              <span
                className="grid h-10 w-10 place-items-center rounded-lg"
                style={{ background: `${l.color} / 0.15`, backgroundColor: `color-mix(in srgb, ${l.color} 15%, transparent)`, color: l.color }}
              >
                <l.icon className="h-5 w-5" />
              </span>
              <p className="mt-3 text-[11px] uppercase tracking-wider text-muted-foreground">Stage {i + 1}</p>
              <h3 className="text-sm font-semibold">{l.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{l.desc}</p>
            </div>
            {i < layers.length - 1 && (
              <div className="absolute right-[-8px] top-1/2 hidden -translate-y-1/2 md:block">
                <span className="block h-px w-4 bg-primary/50" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>

    {/* Stack */}
    <section>
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold">Tech stack</h2>
          <p className="text-sm text-muted-foreground">Modern, open and deploy-anywhere.</p>
        </div>
        <GitBranch className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stack.map((g) => (
          <div key={g.group} className="glass-card rounded-xl p-5">
            <p className="text-xs uppercase tracking-wider text-primary">{g.group}</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {g.items.map((i) => (
                <li key={i} className="rounded-full border border-border bg-secondary px-2.5 py-1 text-xs">
                  {i}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>

    {/* Model */}
    <section className="glass-card rounded-2xl p-6 md:p-8">
      <h2 className="text-2xl font-bold">Capture model (excerpt)</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Each source has a calibrated reduction factor capped at 85%.
      </p>
      <pre className="mt-5 overflow-x-auto rounded-lg border border-border bg-secondary/60 p-4 text-xs leading-relaxed text-foreground/90">
{`reduction(transport)   = 0.35·roadside + 0.10·gardens + 0.55·EV
reduction(industry)    = 0.60·biofilter + 0.10·gardens + 0.05·roadside
reduction(power)       = 0.50·biofilter + 0.08·gardens
reduction(residential) = 0.35·gardens + 0.05·roadside

effectiveCO2(zone) = baseCO2(zone) × (1 − reduction(source))`}
      </pre>
    </section>
  </div>
);

export default Architecture;