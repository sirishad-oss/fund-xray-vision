import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2 } from "lucide-react";

const steps = [
  "Reading your statement…",
  "Calculating returns…",
  "Generating AI insights…",
];

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setCurrentStep(1), 3000),
      setTimeout(() => setCurrentStep(2), 6000),
      setTimeout(() => onComplete(), 9000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-md w-full text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="h-16 w-16 mx-auto mb-8 rounded-full border-4 border-muted border-t-primary"
        />

        <h2 className="text-2xl font-bold font-display text-foreground mb-2">
          Analyzing Your Portfolio
        </h2>
        <p className="text-muted-foreground mb-10">This usually takes 8–12 seconds</p>

        <div className="space-y-4 text-left">
          {steps.map((step, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className="flex items-center gap-3"
            >
              <div className="h-8 w-8 rounded-full flex items-center justify-center shrink-0">
                <AnimatePresence mode="wait">
                  {i < currentStep ? (
                    <motion.div
                      key="done"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="h-8 w-8 rounded-full bg-success flex items-center justify-center"
                    >
                      <Check className="h-4 w-4 text-success-foreground" />
                    </motion.div>
                  ) : i === currentStep ? (
                    <motion.div key="loading" className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Loader2 className="h-4 w-4 text-primary animate-spin" />
                    </motion.div>
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-muted" />
                  )}
                </AnimatePresence>
              </div>
              <span className={`font-medium ${i <= currentStep ? "text-foreground" : "text-muted-foreground"}`}>
                {step}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
