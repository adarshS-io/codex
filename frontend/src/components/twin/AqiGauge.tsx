import { aqiCategory } from "@/lib/twinData";

interface Props {
  aqi: number;
  label?: string;
  observedAt?: string;
}

function formatObservedAt(observedAt?: string) {
  if (!observedAt) return null;
  const date = new Date(observedAt);
  return new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    day: "numeric",
    month: "short",
  }).format(date);
}

export const AqiGauge = ({ aqi, label = "Air Quality Index", observedAt }: Props) => {
  const cat = aqiCategory(aqi);
  const pct = Math.min(100, (aqi / 300) * 100);
  const updatedLabel = formatObservedAt(observedAt);

  return (
    <div className={`glass-card rounded-xl border p-4 ${cat.bg}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
          <p className={`text-3xl font-bold ${cat.tone}`}>{aqi}</p>
          <p className={`text-sm font-medium ${cat.tone}`}>{cat.label}</p>
          {updatedLabel && <p className="text-[11px] text-muted-foreground">Observed {updatedLabel}</p>}
        </div>
        <div className="relative h-20 w-20">
          <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="hsl(var(--border))" strokeWidth="3" />
            <circle
              cx="18"
              cy="18"
              r="15.9"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray={`${pct}, 100`}
              strokeLinecap="round"
              className={cat.tone}
            />
          </svg>
          <div className="absolute inset-0 grid place-items-center text-[10px] uppercase text-muted-foreground">
            US AQI
          </div>
        </div>
      </div>
      <p className="mt-3 text-[11px] text-muted-foreground">Source: Open-Meteo air quality API</p>
    </div>
  );
};
