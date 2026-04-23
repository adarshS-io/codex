import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Activity, Leaf, Sparkles, TrendingDown, Wind } from "lucide-react";
import { CityMap } from "@/components/twin/CityMap";
import { InterventionPanel } from "@/components/twin/InterventionPanel";
import { WeatherCard } from "@/components/twin/WeatherCard";
import { AqiGauge } from "@/components/twin/AqiGauge";
import { Button } from "@/components/ui/button";
import {
  DEFAULT_INTERVENTIONS,
  HOTSPOTS,
  Interventions,
  SOURCE_META,
  SourceKey,
  buildTrend,
  effectiveCO2,
  estimateAQI,
} from "@/lib/twinData";

const Index = () => {
  const [interventions, setInterventions] = useState<Interventions>(DEFAULT_INTERVENTIONS);
  const [selectedId, setSelectedId] = useState<string | null>("mgr");

  const totals = useMemo(() => {
    const baseline = HOTSPOTS.reduce((s, h) => s + h.baseCO2, 0);
    const now = HOTSPOTS.reduce((s, h) => s + effectiveCO2(h, interventions), 0);
    return { baseline, now, saved: baseline - now, pct: ((baseline - now) / baseline) * 100 };
  }, [interventions]);

  const sourceData = useMemo(() => {
    const map: Record<SourceKey, { baseline: number; now: number }> = {
      transport: { baseline: 0, now: 0 },
      industry: { baseline: 0, now: 0 },
      power: { baseline: 0, now: 0 },
      residential: { baseline: 0, now: 0 },
    };
    HOTSPOTS.forEach((h) => {
      map[h.source].baseline += h.baseCO2;
      map[h.source].now += effectiveCO2(h, interventions);
    });
    return (Object.keys(map) as SourceKey[]).map((k) => ({
      source: SOURCE_META[k].label,
      key: k,
      baseline: Math.round(map[k].baseline),
      now: Math.round(map[k].now),
      color: SOURCE_META[k].color,
    }));
  }, [interventions]);

  const trend = useMemo(() => buildTrend(totals.baseline, totals.now), [totals]);

  const aqi = estimateAQI(totals.now);
  const baselineAqi = estimateAQI(totals.baseline);

  const selected = HOTSPOTS.find((h) => h.id === selectedId);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border/60 backdrop-blur">
        <div className="container flex flex-wrap items-center justify-between gap-4 py-5">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-elegant">
              <Leaf className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">
                Urban CO₂ <span className="text-gradient">Digital Twin</span>
              </h1>
              <p className="text-xs text-muted-foreground">Bangalore · Carbon Capture Planning Sandbox</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Live simulation · 12 zones
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInterventions(DEFAULT_INTERVENTIONS)}
            >
              Reset
            </Button>
          </div>
        </div>
      </header>

      <main className="container space-y-6 py-6">
        {/* KPI strip */}
        <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <KPI
            label="Baseline CO₂"
            value={`${totals.baseline.toFixed(0)} t/d`}
            sub="Modeled emissions"
            icon={Activity}
            tone="text-aqi-bad"
          />
          <KPI
            label="With Capture"
            value={`${totals.now.toFixed(0)} t/d`}
            sub={`${totals.pct.toFixed(1)}% reduction`}
            icon={TrendingDown}
            tone="text-primary"
          />
          <KPI
            label="CO₂ Saved"
            value={`${totals.saved.toFixed(0)} t/d`}
            sub={`${(totals.saved * 365).toFixed(0)} t / year`}
            icon={Sparkles}
            tone="text-accent"
          />
          <KPI
            label="AQI Shift"
            value={`${baselineAqi} → ${aqi}`}
            sub={`${(((baselineAqi - aqi) / baselineAqi) * 100).toFixed(1)}% improvement`}
            icon={Wind}
            tone="text-aqi-moderate"
          />
        </section>

        {/* Map + sidebar */}
        <section className="grid gap-6 lg:grid-cols-3">
          <div className="glass-card rounded-2xl p-4 lg:col-span-2">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold">Bangalore Emission Hotspots</h2>
                <p className="text-xs text-muted-foreground">
                  Halo size & opacity reflect live CO₂ load · click a zone for details
                </p>
              </div>
            </div>
            <CityMap
              hotspots={HOTSPOTS}
              interventions={interventions}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
            {selected && (
              <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
                <Detail label="Zone" value={selected.name} />
                <Detail label="Source" value={SOURCE_META[selected.source].label} />
                <Detail label="Population" value={selected.population.toLocaleString()} />
                <Detail
                  label="CO₂ now"
                  value={`${effectiveCO2(selected, interventions).toFixed(1)} t/d`}
                  hint={`base ${selected.baseCO2} t/d`}
                />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <AqiGauge aqi={aqi} />
            <WeatherCard temp={27} humidity={68} wind={11} condition="Partly cloudy · light breeze" />
            <div className="glass-card rounded-xl p-4">
              <h3 className="mb-1 text-sm font-semibold">Pollutant Mix (modeled)</h3>
              <p className="mb-3 text-[11px] text-muted-foreground">Approximate share at current load</p>
              <div className="space-y-2">
                {[
                  { l: "PM2.5", v: 38, c: "hsl(var(--aqi-bad))" },
                  { l: "NO₂", v: 26, c: "hsl(var(--aqi-poor))" },
                  { l: "CO", v: 18, c: "hsl(var(--aqi-moderate))" },
                  { l: "SO₂", v: 12, c: "hsl(var(--aqi-severe))" },
                  { l: "O₃", v: 6, c: "hsl(var(--accent))" },
                ].map((p) => (
                  <div key={p.l}>
                    <div className="mb-1 flex justify-between text-[11px]">
                      <span className="text-muted-foreground">{p.l}</span>
                      <span className="font-mono">{p.v}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                      <div className="h-full rounded-full" style={{ width: `${p.v}%`, background: p.c }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Interventions + charts */}
        <section className="grid gap-6 lg:grid-cols-3">
          <div className="glass-card rounded-2xl p-5">
            <h2 className="mb-1 text-base font-semibold">Capture Interventions</h2>
            <p className="mb-5 text-xs text-muted-foreground">
              Adjust strategies to forecast city-wide impact in real time.
            </p>
            <InterventionPanel value={interventions} onChange={setInterventions} />
          </div>

          <div className="glass-card rounded-2xl p-5 lg:col-span-2">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold">24h Emissions Curve</h2>
                <p className="text-xs text-muted-foreground">Baseline vs. with active capture interventions</p>
              </div>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer>
                <AreaChart data={trend} margin={{ left: -20, right: 8, top: 8, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gBase" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--aqi-bad))" stopOpacity={0.6} />
                      <stop offset="100%" stopColor="hsl(var(--aqi-bad))" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gNow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.7} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" fontSize={11} interval={2} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Area
                    type="monotone"
                    dataKey="baseline"
                    name="Baseline (t/h)"
                    stroke="hsl(var(--aqi-bad))"
                    fill="url(#gBase)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="withCapture"
                    name="With capture (t/h)"
                    stroke="hsl(var(--primary))"
                    fill="url(#gNow)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="glass-card rounded-2xl p-5">
            <h2 className="mb-1 text-base font-semibold">Emissions by Source</h2>
            <p className="mb-3 text-xs text-muted-foreground">Tonnes CO₂ / day before vs. after interventions</p>
            <div className="h-64 w-full">
              <ResponsiveContainer>
                <BarChart data={sourceData} margin={{ left: -20, right: 8, top: 8, bottom: 0 }}>
                  <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="source" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="baseline" name="Baseline" fill="hsl(var(--muted-foreground))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="now" name="With capture" radius={[4, 4, 0, 0]}>
                    {sourceData.map((d) => (
                      <Cell key={d.key} fill={d.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5">
            <h2 className="mb-1 text-base font-semibold">Current Source Composition</h2>
            <p className="mb-3 text-xs text-muted-foreground">Live distribution of post-intervention CO₂ load</p>
            <div className="h-64 w-full">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={sourceData}
                    dataKey="now"
                    nameKey="source"
                    innerRadius={55}
                    outerRadius={90}
                    paddingAngle={3}
                    stroke="hsl(var(--background))"
                  >
                    {sourceData.map((d) => (
                      <Cell key={d.key} fill={d.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        <footer className="pb-8 pt-4 text-center text-[11px] text-muted-foreground">
          Modeled simulation for planning support · Figures are illustrative and not regulatory measurements.
        </footer>
      </main>
    </div>
  );
};

const KPI = ({
  label,
  value,
  sub,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string;
  sub: string;
  icon: React.ComponentType<{ className?: string }>;
  tone: string;
}) => (
  <div className="glass-card rounded-xl p-4">
    <div className="flex items-center justify-between">
      <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <Icon className={`h-4 w-4 ${tone}`} />
    </div>
    <p className="mt-1 text-2xl font-bold">{value}</p>
    <p className="text-[11px] text-muted-foreground">{sub}</p>
  </div>
);

const Detail = ({ label, value, hint }: { label: string; value: string; hint?: string }) => (
  <div className="rounded-lg border border-border bg-secondary/40 p-3">
    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
    <p className="text-sm font-semibold">{value}</p>
    {hint && <p className="text-[10px] text-muted-foreground">{hint}</p>}
  </div>
);

export default Index;
