export interface Fund {
  name: string;
  category: string;
  amountInvested: number;
  currentValue: number;
  xirr: number;
  status: "Outperforming" | "Underperforming" | "Watch";
}

export interface PortfolioMetrics {
  xirr: number;
  totalValue: number;
  portfolioOverlap: number;
  annualExpenseDrag: number;
  healthScore: number;
}

export interface ScoreBreakdown {
  performance: number;
  diversification: number;
  costEfficiency: number;
  riskAlignment: number;
}

export interface AIInsight {
  icon: string;
  title: string;
  description: string;
}

export interface RedFlag {
  message: string;
}

export interface PortfolioData {
  funds: Fund[];
  metrics: PortfolioMetrics;
  scoreBreakdown: ScoreBreakdown;
  insights: AIInsight[];
  redFlags: RedFlag[];
}

export const DEMO_DATA: PortfolioData = {
  funds: [
    { name: "Axis Bluechip Fund", category: "Large Cap", amountInvested: 250000, currentValue: 312000, xirr: 14.2, status: "Outperforming" },
    { name: "Parag Parikh Flexi Cap Fund", category: "Flexi Cap", amountInvested: 300000, currentValue: 395000, xirr: 18.6, status: "Outperforming" },
    { name: "SBI Small Cap Fund", category: "Small Cap", amountInvested: 150000, currentValue: 210000, xirr: 22.1, status: "Outperforming" },
    { name: "HDFC Mid-Cap Opportunities", category: "Mid Cap", amountInvested: 200000, currentValue: 248000, xirr: 12.8, status: "Watch" },
    { name: "ICICI Pru Value Discovery", category: "Value", amountInvested: 180000, currentValue: 195000, xirr: 5.2, status: "Underperforming" },
    { name: "Kotak Emerging Equity Fund", category: "Mid Cap", amountInvested: 120000, currentValue: 158000, xirr: 16.4, status: "Outperforming" },
  ],
  metrics: {
    xirr: 15.3,
    totalValue: 1518000,
    portfolioOverlap: 34,
    annualExpenseDrag: 18200,
    healthScore: 72,
  },
  scoreBreakdown: {
    performance: 78,
    diversification: 62,
    costEfficiency: 70,
    riskAlignment: 80,
  },
  insights: [
    { icon: "📊", title: "Reduce Mid-Cap Overlap", description: "HDFC Mid-Cap and Kotak Emerging have 42% stock overlap. Consider consolidating into one fund to improve diversification." },
    { icon: "💰", title: "Switch to Direct Plans", description: "You could save ₹8,400/year by switching 3 regular plans to direct plans. Your returns would improve by 0.7% annually." },
    { icon: "⚖️", title: "Rebalance Small Cap Allocation", description: "Your small cap allocation is 14% — slightly aggressive for a moderate risk profile. Consider capping at 10-12%." },
  ],
  redFlags: [
    { message: "ICICI Pru Value Discovery has underperformed its benchmark by 4.8% over 3 years." },
    { message: "34% portfolio overlap detected — this reduces effective diversification." },
    { message: "Total expense ratio across portfolio is 1.52% — above the 1.2% recommended threshold." },
  ],
};
