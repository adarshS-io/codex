import { Github, Linkedin, Mail } from "lucide-react";

const members = [
  { name: "Adarsh ", role: "Team Lead · Simulation", initials: "AS", color: "from-emerald-500 to-cyan-500" },
  { name: "Rangegowda", role: "Frontend & UX", initials: "P", color: "from-cyan-500 to-blue-500" },
  { name: "Anil kumar", role: "Data & Sensors", initials: "P", color: "from-amber-500 to-orange-500" },
  { name: "Ningappa", role: "ML & Forecasting", initials: "S K", color: "from-fuchsia-500 to-pink-500" },
  { name: "Pavan", role: "Backend & APIs", initials: "B", color: "from-violet-500 to-purple-500" }
];

const Team = () => (
  <div className="container space-y-12 py-12">
    <header className="mx-auto max-w-3xl text-center">
      <p className="text-xs uppercase tracking-wider text-primary">Team CarbonTwin</p>
      <h1 className="mt-2 text-4xl font-bold md:text-5xl">
        Six builders. <span className="text-gradient">One climate mission.</span>
      </h1>
      <p className="mt-4 text-muted-foreground">
        A multidisciplinary squad blending simulation, design, data and storytelling.
      </p>
    </header>

    <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((m) => (
        <div key={m.name} className="glass-card group rounded-xl p-5 text-center transition-all hover:border-primary/40">
          <div
            className={`mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br text-xl font-bold text-white shadow-elegant ${m.color}`}
          >
            {m.initials}
          </div>
          <h3 className="mt-4 text-base font-semibold">{m.name}</h3>
          <p className="text-xs text-muted-foreground">{m.role}</p>
          <div className="mt-3 flex justify-center gap-2 text-muted-foreground">
            <a className="rounded-md p-1.5 hover:bg-secondary hover:text-foreground" href="#"><Github className="h-4 w-4" /></a>
            <a className="rounded-md p-1.5 hover:bg-secondary hover:text-foreground" href="#"><Linkedin className="h-4 w-4" /></a>
            <a className="rounded-md p-1.5 hover:bg-secondary hover:text-foreground" href="#"><Mail className="h-4 w-4" /></a>
          </div>
        </div>
      ))}
    </section>

    <section className="glass-card rounded-2xl p-6 md:p-8">
      <h2 className="text-2xl font-bold">Build timeline</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        {[
          ["Day 1", "Research & data sourcing"],
          ["Day 2", "Simulation engine & model"],
          ["Day 3", "Dashboard & visualisations"],
          ["Day 4", "Polish, demo & pitch"],
        ].map(([d, t]) => (
          <div key={d} className="rounded-xl border border-border bg-secondary/40 p-4">
            <p className="text-xs uppercase tracking-wider text-primary">{d}</p>
            <p className="mt-1 text-sm font-medium">{t}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default Team;
