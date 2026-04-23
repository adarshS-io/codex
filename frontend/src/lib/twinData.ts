export type SourceKey = "transport" | "industry" | "power" | "residential";

export interface Hotspot {
  id: string;
  name: string;
  /** Percent coordinates inside the SVG viewBox 0..100 */
  x: number;
  y: number;
  /** Tonnes CO2 / day baseline */
  baseCO2: number;
  source: SourceKey;
  population: number;
}

/** Approximate Bangalore hotspot zones (stylized, not geo-accurate). */
export const HOTSPOTS: Hotspot[] = [
  { id: "slv", name: "Silk Board Junction", x: 58, y: 78, baseCO2: 92, source: "transport", population: 180000 },
  { id: "elc", name: "Electronic City", x: 64, y: 88, baseCO2: 78, source: "industry", population: 240000 },
  { id: "wht", name: "Whitefield ITPL", x: 86, y: 52, baseCO2: 84, source: "industry", population: 320000 },
  { id: "krp", name: "KR Puram Bridge", x: 78, y: 44, baseCO2: 70, source: "transport", population: 150000 },
  { id: "mgr", name: "MG Road / CBD", x: 52, y: 48, baseCO2: 88, source: "transport", population: 210000 },
  { id: "hbr", name: "Hebbal Flyover", x: 48, y: 22, baseCO2: 74, source: "transport", population: 140000 },
  { id: "ysh", name: "Yeshwanthpur Industrial", x: 34, y: 32, baseCO2: 66, source: "industry", population: 175000 },
  { id: "pny", name: "Peenya Power Hub", x: 24, y: 26, baseCO2: 95, source: "power", population: 90000 },
  { id: "jyn", name: "Jayanagar Residential", x: 44, y: 68, baseCO2: 38, source: "residential", population: 410000 },
  { id: "knk", name: "Koramangala", x: 58, y: 62, baseCO2: 55, source: "transport", population: 260000 },
  { id: "rrn", name: "Rajajinagar", x: 32, y: 46, baseCO2: 42, source: "residential", population: 290000 },
  { id: "btm", name: "BTM Layout", x: 52, y: 70, baseCO2: 48, source: "transport", population: 230000 },
];

export const SOURCE_META: Record<SourceKey, { label: string; color: string }> = {
  transport: { label: "Transport", color: "hsl(var(--aqi-poor))" },
  industry: { label: "Industry", color: "hsl(var(--aqi-bad))" },
  power: { label: "Power", color: "hsl(var(--aqi-severe))" },
  residential: { label: "Residential", color: "hsl(var(--aqi-moderate))" },
};

export interface Interventions {
  /** 0..100 — % of major roads with capture units */
  roadsideCapture: number;
  /** 0..100 — % rooftop / vertical garden coverage */
  verticalGardens: number;
  /** 0..100 — % industrial stacks fitted with biofilters */
  biofilters: number;
  /** 0..100 — share of EVs in transport */
  evAdoption: number;
}

export const DEFAULT_INTERVENTIONS: Interventions = {
  roadsideCapture: 0,
  verticalGardens: 0,
  biofilters: 0,
  evAdoption: 0,
};

/** Fraction of CO2 reduced for a given source by current interventions. */
export function reductionFactor(source: SourceKey, i: Interventions): number {
  const r = i.roadsideCapture / 100;
  const g = i.verticalGardens / 100;
  const b = i.biofilters / 100;
  const e = i.evAdoption / 100;
  // Calibrated weights (capped at ~0.85 per source)
  let f = 0;
  switch (source) {
    case "transport":
      f = r * 0.35 + g * 0.1 + e * 0.55;
      break;
    case "industry":
      f = b * 0.6 + g * 0.1 + r * 0.05;
      break;
    case "power":
      f = b * 0.5 + g * 0.08;
      break;
    case "residential":
      f = g * 0.35 + r * 0.05;
      break;
  }
  return Math.min(0.85, f);
}

export function effectiveCO2(h: Hotspot, i: Interventions): number {
  return h.baseCO2 * (1 - reductionFactor(h.source, i));
}

/** Crude AQI proxy from total CO2 load (illustrative, not regulatory). */
export function estimateAQI(totalCO2: number): number {
  // Map 0..1200 t/day -> 30..320
  const aqi = 30 + (totalCO2 / 1200) * 290;
  return Math.round(Math.max(15, Math.min(400, aqi)));
}

export function aqiCategory(aqi: number): { label: string; tone: string; bg: string } {
  if (aqi <= 50) return { label: "Good", tone: "text-aqi-good", bg: "bg-aqi-good/15 border-aqi-good/40" };
  if (aqi <= 100) return { label: "Moderate", tone: "text-aqi-moderate", bg: "bg-aqi-moderate/15 border-aqi-moderate/40" };
  if (aqi <= 150) return { label: "Unhealthy (Sensitive)", tone: "text-aqi-poor", bg: "bg-aqi-poor/15 border-aqi-poor/40" };
  if (aqi <= 200) return { label: "Unhealthy", tone: "text-aqi-bad", bg: "bg-aqi-bad/15 border-aqi-bad/40" };
  return { label: "Severe", tone: "text-aqi-severe", bg: "bg-aqi-severe/15 border-aqi-severe/40" };
}

/** Build a 24-hour synthetic emissions trend. */
export function buildTrend(totalBaseline: number, totalNow: number) {
  const hours = Array.from({ length: 24 }, (_, h) => h);
  // Traffic peaks at 9 and 19, low at night
  return hours.map((h) => {
    const peak =
      0.55 +
      0.35 * Math.exp(-Math.pow((h - 9) / 2.2, 2)) +
      0.4 * Math.exp(-Math.pow((h - 19) / 2.4, 2)) +
      0.1 * Math.sin((h / 24) * Math.PI * 2);
    return {
      hour: `${String(h).padStart(2, "0")}:00`,
      baseline: Math.round(totalBaseline * peak * 0.06),
      withCapture: Math.round(totalNow * peak * 0.06),
    };
  });
}