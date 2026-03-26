import { motion } from "framer-motion";
import { GitMerge } from "lucide-react";
import type { Fund } from "@/lib/demoData";

interface Props {
  funds: Fund[];
}

// Simulated overlap matrix based on fund categories
const getOverlap = (a: Fund, b: Fund): number => {
  if (a.name === b.name) return 100;
  // Higher overlap for same category
  if (a.category === b.category) return 35 + Math.round(Math.random() * 25);
  // Moderate overlap for related categories
  const related: Record<string, string[]> = {
    "Large Cap": ["Flexi Cap", "Value"],
    "Flexi Cap": ["Large Cap", "Mid Cap", "Value"],
    "Mid Cap": ["Flexi Cap", "Small Cap"],
    "Small Cap": ["Mid Cap"],
    "Value": ["Large Cap", "Flexi Cap"],
  };
  if (related[a.category]?.includes(b.category)) return 10 + Math.round(Math.random() * 20);
  return Math.round(Math.random() * 10);
};

// Generate stable overlap data using fund names as seed
const useOverlapMatrix = (funds: Fund[]) => {
  // Use a simple hash for stability
  const matrix: number[][] = funds.map((a, i) =>
    funds.map((b, j) => {
      if (i === j) return 100;
      if (i > j) return 0; // will mirror
      const seed = (a.name.length * 7 + b.name.length * 13 + i * 31 + j * 17) % 100;
      if (a.category === b.category) return 30 + (seed % 30);
      const related: Record<string, string[]> = {
        "Large Cap": ["Flexi Cap", "Value"],
        "Flexi Cap": ["Large Cap", "Mid Cap", "Value"],
        "Mid Cap": ["Flexi Cap", "Small Cap"],
        "Small Cap": ["Mid Cap"],
        "Value": ["Large Cap", "Flexi Cap"],
      };
      if (related[a.category]?.includes(b.category)) return 10 + (seed % 25);
      return seed % 12;
    })
  );
  // Mirror
  for (let i = 0; i < funds.length; i++) {
    for (let j = 0; j < i; j++) {
      matrix[i][j] = matrix[j][i];
    }
  }
  return matrix;
};

const getHeatColor = (value: number): string => {
  if (value >= 100) return "bg-foreground/10";
  if (value >= 40) return "bg-destructive/60";
  if (value >= 25) return "bg-warning/50";
  if (value >= 10) return "bg-warning/20";
  return "bg-success/10";
};

const getTextColor = (value: number): string => {
  if (value >= 40) return "text-destructive-foreground font-bold";
  if (value >= 25) return "text-foreground font-semibold";
  return "text-muted-foreground";
};

const shortName = (name: string) => {
  const parts = name.split(" ");
  if (parts.length <= 2) return name;
  return parts.slice(0, 2).join(" ");
};

const FundOverlapHeatmap = ({ funds }: Props) => {
  const matrix = useOverlapMatrix(funds);

  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold font-display text-foreground mb-4 flex items-center gap-2">
        <GitMerge className="h-5 w-5 text-primary" /> Fund Overlap Heatmap
      </h2>
      <div className="glass-card p-6">
        <p className="text-sm text-muted-foreground mb-4">
          Shows % of shared stock holdings between your funds. High overlap (red) means reduced diversification.
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="overflow-x-auto"
        >
          <table className="w-full text-xs">
            <thead>
              <tr>
                <th className="p-2 text-left text-muted-foreground font-medium min-w-[100px]" />
                {funds.map((f, i) => (
                  <th key={i} className="p-2 text-center text-muted-foreground font-medium min-w-[60px] max-w-[80px]">
                    <span className="block truncate">{shortName(f.name)}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {funds.map((rowFund, i) => (
                <tr key={i}>
                  <td className="p-2 text-muted-foreground font-medium truncate max-w-[120px]">
                    {shortName(rowFund.name)}
                  </td>
                  {funds.map((_, j) => {
                    const val = matrix[i][j];
                    const isDiag = i === j;
                    return (
                      <td key={j} className="p-1">
                        <div
                          className={`rounded-md h-10 flex items-center justify-center transition-all ${
                            isDiag ? "bg-muted/30" : getHeatColor(val)
                          }`}
                        >
                          <span className={isDiag ? "text-muted-foreground/50" : getTextColor(val)}>
                            {isDiag ? "—" : `${val}%`}
                          </span>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
        <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-success/10" /> Low (&lt;10%)</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-warning/20" /> Moderate (10-25%)</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-warning/50" /> High (25-40%)</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-destructive/60" /> Very High (&gt;40%)</span>
        </div>
      </div>
    </section>
  );
};

export default FundOverlapHeatmap;
