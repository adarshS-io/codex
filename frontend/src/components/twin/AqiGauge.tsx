import { aqiCategory } from "@/lib/twinData";

export const AqiGauge = ({ aqi }: { aqi: number }) => {
  const cat = aqiCategory(aqi);
  const pct = Math.min(100, (aqi / 300) * 100);
  return (
    <div className={`glass-card rounded-xl p-4 border ${cat.bg}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Air Quality Index</p>
          <p className={`text-3xl font-bold ${cat.tone}`}>{aqi}</p>
          <p className={`text-sm font-medium ${cat.tone}`}>{cat.label}</p>
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
            PM·NOx
          </div>
        </div>
      </div>
    </div>
  );
};