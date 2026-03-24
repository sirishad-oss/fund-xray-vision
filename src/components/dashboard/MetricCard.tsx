import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

const MetricCard = ({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="metric-card">
    <div className="flex items-center gap-3 mb-2">
      <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
    <p className="text-2xl font-bold font-display text-foreground">{value}</p>
  </motion.div>
);

export default MetricCard;
