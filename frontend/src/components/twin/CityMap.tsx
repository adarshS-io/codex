import { useMemo } from "react";
import { Hotspot, Interventions, SOURCE_META, effectiveCO2 } from "@/lib/twinData";

interface Props {
  hotspots: Hotspot[];
  interventions: Interventions;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export const CityMap = ({ hotspots, interventions, selectedId, onSelect }: Props) => {
  const max = useMemo(
    () => Math.max(...hotspots.map((h) => effectiveCO2(h, interventions))),
    [hotspots, interventions]
  );

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-secondary/40">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <defs>
          <radialGradient id="cityGlow" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.18" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
            <path d="M 5 0 L 0 0 0 5" fill="none" stroke="hsl(var(--border))" strokeWidth="0.15" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />
        <rect width="100" height="100" fill="url(#cityGlow)" />

        {/* Stylized Bangalore outline */}
        <path
          d="M18,28 C22,16 38,10 52,12 C66,14 80,18 86,30 C92,42 90,56 84,68 C78,80 64,90 50,90 C34,90 20,82 14,68 C8,54 12,40 18,28 Z"
          fill="hsl(var(--card))"
          stroke="hsl(var(--primary) / 0.5)"
          strokeWidth="0.4"
        />
        {/* Major arterial roads */}
        <g stroke="hsl(var(--muted-foreground) / 0.5)" strokeWidth="0.35" fill="none">
          <path d="M14,50 L86,50" />
          <path d="M50,12 L50,90" />
          <path d="M22,28 L82,72" />
          <path d="M22,72 L82,28" />
          <ellipse cx="50" cy="50" rx="22" ry="18" />
        </g>
        {/* Lakes */}
        <ellipse cx="60" cy="64" rx="3.5" ry="2" fill="hsl(var(--accent) / 0.35)" />
        <ellipse cx="38" cy="40" rx="2.8" ry="1.6" fill="hsl(var(--accent) / 0.35)" />

        {/* Heat halos */}
        {hotspots.map((h) => {
          const co2 = effectiveCO2(h, interventions);
          const intensity = co2 / max;
          const r = 4 + intensity * 8;
          const color = SOURCE_META[h.source].color;
          return (
            <circle
              key={`halo-${h.id}`}
              cx={h.x}
              cy={h.y}
              r={r}
              fill={color}
              opacity={0.18 + intensity * 0.25}
              className="pulse-dot"
              style={{ transformOrigin: `${h.x}px ${h.y}px` }}
            />
          );
        })}
      </svg>

      {/* Interactive markers in HTML for hover/click */}
      {hotspots.map((h) => {
        const co2 = effectiveCO2(h, interventions);
        const isSelected = selectedId === h.id;
        return (
          <button
            key={h.id}
            onClick={() => onSelect(h.id)}
            className="group absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${h.x}%`, top: `${h.y}%` }}
            aria-label={`${h.name}, ${co2.toFixed(0)} tonnes CO2 per day`}
          >
            <span
              className="block h-3 w-3 rounded-full ring-2 ring-background transition-transform group-hover:scale-150"
              style={{ background: SOURCE_META[h.source].color, boxShadow: `0 0 12px ${SOURCE_META[h.source].color}` }}
            />
            <span
              className={`pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-card/95 px-2 py-1 text-[10px] font-medium text-card-foreground shadow-card transition-opacity ${
                isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            >
              {h.name} · {co2.toFixed(0)} t/d
            </span>
          </button>
        );
      })}

      {/* Legend */}
      <div className="absolute bottom-3 left-3 flex flex-wrap gap-2 rounded-lg border border-border bg-card/80 p-2 backdrop-blur">
        {Object.entries(SOURCE_META).map(([k, v]) => (
          <div key={k} className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <span className="h-2 w-2 rounded-full" style={{ background: v.color }} />
            {v.label}
          </div>
        ))}
      </div>
      <div className="absolute right-3 top-3 rounded-md border border-border bg-card/80 px-2 py-1 text-[10px] uppercase tracking-wider text-muted-foreground backdrop-blur">
        Bangalore · Live Twin
      </div>
    </div>
  );
};