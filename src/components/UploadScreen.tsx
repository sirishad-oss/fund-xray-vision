import { useState, useCallback } from "react";
import { Upload, FileText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface UploadScreenProps {
  onUpload: (file: File) => void;
  onDemo: () => void;
}

const UploadScreen = ({ onUpload, onDemo }: UploadScreenProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file && (file.type === "application/pdf" || file.name.endsWith(".csv"))) {
        onUpload(file);
      }
    },
    [onUpload]
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onUpload(file);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl w-full text-center"
      >
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-6">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-primary">AI-Powered Analysis</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold font-display text-foreground leading-tight mb-4">
          Know What Your Mutual Funds Are <span className="text-primary">Really Doing</span>
        </h1>
        <p className="text-muted-foreground text-lg mb-10">
          Upload your CAMS or KFintech statement. Get your portfolio X-Ray in 10 seconds.
        </p>

        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-2xl p-12 transition-all duration-200 cursor-pointer group ${
            isDragging ? "border-primary bg-primary/5 scale-[1.02]" : "border-border hover:border-primary/50 hover:bg-muted/50"
          }`}
          onClick={() => document.getElementById("file-input")?.click()}
        >
          <input
            id="file-input"
            type="file"
            accept=".pdf,.csv"
            className="hidden"
            onChange={handleFileSelect}
          />
          <div className="flex flex-col items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Drop your statement here</p>
              <p className="text-sm text-muted-foreground mt-1">PDF or CSV from CAMS / KFintech</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <FileText className="h-3.5 w-3.5" />
              <span>Supports consolidated account statements</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center gap-4">
          <Button onClick={onDemo} variant="outline" size="lg" className="gap-2">
            <Sparkles className="h-4 w-4" />
            Try Demo
          </Button>
          <p className="text-xs text-muted-foreground max-w-xs">
            🔒 Your data never leaves our servers. Analysis runs in real time.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default UploadScreen;
