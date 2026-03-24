import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface ErrorScreenProps {
  onRetry: () => void;
}

const ErrorScreen = ({ onRetry }: ErrorScreenProps) => (
  <div className="min-h-screen flex items-center justify-center px-4">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md w-full text-center"
    >
      <div className="h-16 w-16 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-6">
        <AlertCircle className="h-8 w-8 text-destructive" />
      </div>
      <h2 className="text-2xl font-bold font-display text-foreground mb-2">Something went wrong</h2>
      <p className="text-muted-foreground mb-8">
        We couldn't process your statement. This could be due to an unsupported format or a temporary issue.
      </p>
      <Button onClick={onRetry} size="lg" className="gap-2">
        <RotateCcw className="h-4 w-4" />
        Try Again
      </Button>
    </motion.div>
  </div>
);

export default ErrorScreen;
