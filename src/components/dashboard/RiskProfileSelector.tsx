import { motion } from "framer-motion";
import { Shield, TrendingUp, Flame } from "lucide-react";

export type RiskProfile = "conservative" | "moderate" | "aggressive";

interface Props {
  selected: RiskProfile;
  onChange: (profile: RiskProfile) => void;
}

const profiles = [
  {
    id: "conservative" as const,
    label: "Conservative",
    icon: Shield,
    description: "Capital preservation, lower returns",
    idealAllocation: "70% Large Cap, 20% Mid Cap, 10% Debt",
  },
  {
    id: "moderate" as const,
    label: "Moderate",
    icon: TrendingUp,
    description: "Balanced growth and stability",
    idealAllocation: "40% Large Cap, 30% Mid Cap, 20% Small Cap, 10% International",
  },
  {
    id: "aggressive" as const,
    label: "Aggressive",
    icon: Flame,
    description: "Maximum growth, higher volatility",
    idealAllocation: "20% Large Cap, 30% Mid Cap, 35% Small Cap, 15% International",
  },
];

const RiskProfileSelector = ({ selected, onChange }: Props) => {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold font-display text-foreground mb-4">Your Risk Profile</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {profiles.map((p) => {
          const Icon = p.icon;
          const isActive = selected === p.id;
          return (
            <motion.button
              key={p.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => onChange(p.id)}
              className={`text-left p-4 rounded-xl border-2 transition-all ${
                isActive
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-border bg-card hover:border-primary/30"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className={`h-5 w-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                <span className={`font-semibold text-sm ${isActive ? "text-primary" : "text-foreground"}`}>
                  {p.label}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{p.description}</p>
              <p className="text-xs text-muted-foreground/70">Ideal: {p.idealAllocation}</p>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
};

export default RiskProfileSelector;
