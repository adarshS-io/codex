import { Slider } from "@/components/ui/slider";
import { Interventions } from "@/lib/twinData";
import { Car, Trees, Factory, Zap } from "lucide-react";

interface Props {
  value: Interventions;
  onChange: (next: Interventions) => void;
}

const fields: {
  key: keyof Interventions;
  label: string;
  hint: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { key: "roadsideCapture", label: "Roadside CO₂ Capture Units", hint: "% of arterial roads equipped", icon: Car },
  { key: "verticalGardens", label: "Vertical Gardens & Green Roofs", hint: "% rooftop coverage", icon: Trees },
  { key: "biofilters", label: "Industrial Biofilter Stacks", hint: "% factories retrofitted", icon: Factory },
  { key: "evAdoption", label: "EV Adoption", hint: "% of fleet electrified", icon: Zap },
];

export const InterventionPanel = ({ value, onChange }: Props) => {
  return (
    <div className="space-y-5">
      {fields.map(({ key, label, hint, icon: Icon }) => (
        <div key={key} className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-md bg-primary/10 text-primary">
                <Icon className="h-3.5 w-3.5" />
              </span>
              <div>
                <p className="text-sm font-medium">{label}</p>
                <p className="text-[11px] text-muted-foreground">{hint}</p>
              </div>
            </div>
            <span className="rounded-md border border-border bg-secondary px-2 py-0.5 font-mono text-xs text-foreground">
              {value[key]}%
            </span>
          </div>
          <Slider
            value={[value[key]]}
            min={0}
            max={100}
            step={1}
            onValueChange={(v) => onChange({ ...value, [key]: v[0] })}
          />
        </div>
      ))}
    </div>
  );
};