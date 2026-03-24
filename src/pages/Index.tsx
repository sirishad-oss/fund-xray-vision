import { useState, useCallback } from "react";
import UploadScreen from "@/components/UploadScreen";
import LoadingScreen from "@/components/LoadingScreen";
import Dashboard from "@/components/Dashboard";
import ErrorScreen from "@/components/ErrorScreen";
import { uploadStatement, analyzeDemoPortfolio } from "@/lib/api";
import type { PortfolioData } from "@/lib/demoData";

type Screen = "upload" | "loading" | "dashboard" | "error";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("upload");
  const [data, setData] = useState<PortfolioData | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);

  const startAnalysis = useCallback(async (file: File | null) => {
    setScreen("loading");
    try {
      const result = file ? await uploadStatement(file) : await analyzeDemoPortfolio();
      setData(result);
    } catch {
      setScreen("error");
    }
  }, []);

  const handleUpload = useCallback((file: File) => {
    setPendingFile(file);
    startAnalysis(file);
  }, [startAnalysis]);

  const handleDemo = useCallback(() => {
    setPendingFile(null);
    startAnalysis(null);
  }, [startAnalysis]);

  const handleLoadingComplete = useCallback(() => {
    if (data) setScreen("dashboard");
    else setScreen("error");
  }, [data]);

  const handleRetry = useCallback(() => {
    setScreen("upload");
    setData(null);
  }, []);

  return (
    <>
      {screen === "upload" && <UploadScreen onUpload={handleUpload} onDemo={handleDemo} />}
      {screen === "loading" && <LoadingScreen onComplete={handleLoadingComplete} />}
      {screen === "dashboard" && data && <Dashboard data={data} />}
      {screen === "error" && <ErrorScreen onRetry={handleRetry} />}
    </>
  );
};

export default Index;
