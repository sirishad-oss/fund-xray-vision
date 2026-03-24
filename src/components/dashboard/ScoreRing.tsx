import { motion } from "framer-motion";

const ScoreRing = ({ score }: { score: number }) => {
  const r = 70;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const colorClass = score < 50 ? "score-ring-red" : score < 75 ? "score-ring-amber" : "score-ring-green";

  return (
    <div className="flex flex-col items-center">
      <svg width="180" height="180" className="-rotate-90">
        <circle cx="90" cy="90" r={r} fill="none" stroke="hsl(var(--muted))" strokeWidth="12" />
        <motion.circle
          cx="90" cy="90" r={r} fill="none" strokeWidth="12" strokeLinecap="round"
          className={colorClass}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeDasharray={circ}
        />
      </svg>
      <div className="absolute mt-12 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-5xl font-bold font-display text-foreground"
        >
          {score}
        </motion.span>
        <p className="text-sm text-muted-foreground mt-1">Health Score</p>
      </div>
    </div>
  );
};

export default ScoreRing;
