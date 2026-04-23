import { Cloud, Droplets, Thermometer, Wind } from "lucide-react";

interface Props {
  temp: number;
  humidity: number;
  wind: number;
  condition: string;
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

export const WeatherCard = ({ temp, humidity, wind, condition, observedAt }: Props) => {
  const updatedLabel = formatObservedAt(observedAt);

  return (
    <div className="glass-card rounded-xl p-4">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Bengaluru Live Weather</p>
          <p className="text-sm text-foreground/80">{condition}</p>
          {updatedLabel && <p className="text-[11px] text-muted-foreground">Observed {updatedLabel}</p>}
        </div>
        <Cloud className="h-7 w-7 text-accent" />
      </div>
      <div className="grid grid-cols-3 gap-2">
        <Stat icon={Thermometer} label="Temp" value={`${temp}°C`} accent="text-aqi-poor" />
        <Stat icon={Droplets} label="Humidity" value={`${humidity}%`} accent="text-accent" />
        <Stat icon={Wind} label="Wind" value={`${wind} km/h`} accent="text-primary" />
      </div>
      <p className="mt-3 text-[11px] text-muted-foreground">Source: Open-Meteo forecast API</p>
    </div>
  );
};

const Stat = ({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  accent: string;
}) => (
  <div className="rounded-lg border border-border bg-secondary/50 p-2.5">
    <Icon className={`mb-1 h-4 w-4 ${accent}`} />
    <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</p>
    <p className="text-base font-semibold">{value}</p>
  </div>
);
