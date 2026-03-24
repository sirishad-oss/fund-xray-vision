import { DEMO_DATA, type PortfolioData } from "./demoData";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export async function uploadStatement(file: File): Promise<PortfolioData> {
  try {
    const formData = new FormData();
    formData.append("statement", file);
    const res = await fetch(`${API_URL}/api/analyze/upload`, { method: "POST", body: formData });
    if (!res.ok) throw new Error("Upload failed");
    return res.json();
  } catch {
    // Fallback to demo data for now
    return DEMO_DATA;
  }
}

export async function analyzeDemoPortfolio(): Promise<PortfolioData> {
  try {
    const res = await fetch(`${API_URL}/api/analyze/portfolio`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ funds: DEMO_DATA.funds }),
    });
    if (!res.ok) throw new Error("Demo analysis failed");
    return res.json();
  } catch {
    return DEMO_DATA;
  }
}

export async function getAIInsights(funds: any[], metrics: any) {
  try {
    const res = await fetch(`${API_URL}/api/analyze/insights`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ funds, metrics, riskProfile: "moderate" }),
    });
    if (!res.ok) throw new Error("Insights fetch failed");
    return res.json();
  } catch {
    return { insights: DEMO_DATA.insights, redFlags: DEMO_DATA.redFlags };
  }
}
