import { motion } from "framer-motion";
import { Download, TrendingUp, Wallet, Layers, DollarSign, AlertTriangle, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PortfolioData, Fund } from "@/lib/demoData";

interface DashboardProps {
  data: PortfolioData;
}

const formatCurrency = (n: number) =>
  "₹" + n.toLocaleString("en-IN");

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

const MetricCard = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
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

const StatusBadge = ({ status }: { status: Fund["status"] }) => {
  const styles = {
    Outperforming: "bg-success/10 text-success",
    Underperforming: "bg-destructive/10 text-destructive",
    Watch: "bg-warning/10 text-warning",
  };
  return <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${styles[status]}`}>{status}</span>;
};

const ScoreBar = ({ label, value }: { label: string; value: number }) => (
  <div>
    <div className="flex justify-between text-sm mb-1.5">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold text-foreground">{value}/100</span>
    </div>
    <div className="h-2.5 rounded-full bg-muted overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="h-full rounded-full bg-primary"
      />
    </div>
  </div>
);

const Dashboard = ({ data }: DashboardProps) => {
  const { funds, metrics, scoreBreakdown, insights, redFlags } = data;

  return (
    <div className="min-h-screen pb-24">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-10">
          <h1 className="text-3xl font-bold font-display text-foreground mb-1">Your Portfolio X-Ray</h1>
          <p className="text-muted-foreground">Here's what we found in your mutual fund portfolio</p>
        </motion.div>

        {/* Health Score */}
        <div className="flex justify-center mb-10 relative h-[180px]">
          <ScoreRing score={metrics.healthScore} />
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <MetricCard icon={TrendingUp} label="XIRR" value={`${metrics.xirr}%`} />
          <MetricCard icon={Wallet} label="Total Value" value={formatCurrency(metrics.totalValue)} />
          <MetricCard icon={Layers} label="Overlap" value={`${metrics.portfolioOverlap}%`} />
          <MetricCard icon={DollarSign} label="Expense Drag" value={formatCurrency(metrics.annualExpenseDrag)} />
        </div>

        {/* Funds Table */}
        <section className="mb-10">
          <h2 className="text-xl font-bold font-display text-foreground mb-4">Your Funds</h2>
          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-semibold text-muted-foreground">Fund Name</th>
                    <th className="text-left p-4 font-semibold text-muted-foreground hidden md:table-cell">Category</th>
                    <th className="text-right p-4 font-semibold text-muted-foreground">Invested</th>
                    <th className="text-right p-4 font-semibold text-muted-foreground">Current</th>
                    <th className="text-right p-4 font-semibold text-muted-foreground hidden sm:table-cell">XIRR</th>
                    <th className="text-center p-4 font-semibold text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {funds.map((fund, i) => (
                    <motion.tr
                      key={fund.name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-border/50 last:border-0"
                    >
                      <td className="p-4 font-medium text-foreground">{fund.name}</td>
                      <td className="p-4 text-muted-foreground hidden md:table-cell">{fund.category}</td>
                      <td className="p-4 text-right text-foreground">{formatCurrency(fund.amountInvested)}</td>
                      <td className="p-4 text-right text-foreground">{formatCurrency(fund.currentValue)}</td>
                      <td className="p-4 text-right font-semibold text-foreground hidden sm:table-cell">{fund.xirr}%</td>
                      <td className="p-4 text-center"><StatusBadge status={fund.status} /></td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* AI Insights */}
        <section className="mb-10">
          <h2 className="text-xl font-bold font-display text-foreground mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" /> AI Insights
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {insights.map((insight, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="metric-card"
              >
                <span className="text-2xl mb-3 block">{insight.icon}</span>
                <h3 className="font-semibold text-foreground mb-1">{insight.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{insight.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Red Flags */}
        <section className="mb-10">
          <h2 className="text-xl font-bold font-display text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" /> Red Flags
          </h2>
          <div className="space-y-3">
            {redFlags.map((flag, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-destructive/5 border border-destructive/10"
              >
                <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                <p className="text-sm text-foreground">{flag.message}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Score Breakdown */}
        <section className="mb-10">
          <h2 className="text-xl font-bold font-display text-foreground mb-4">Score Breakdown</h2>
          <div className="glass-card p-6 space-y-5">
            <ScoreBar label="Performance" value={scoreBreakdown.performance} />
            <ScoreBar label="Diversification" value={scoreBreakdown.diversification} />
            <ScoreBar label="Cost Efficiency" value={scoreBreakdown.costEfficiency} />
            <ScoreBar label="Risk Alignment" value={scoreBreakdown.riskAlignment} />
          </div>
        </section>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border p-4">
        <div className="max-w-5xl mx-auto flex justify-center">
          <Button size="lg" className="gap-2 px-8">
            <Download className="h-4 w-4" />
            Download Full Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
