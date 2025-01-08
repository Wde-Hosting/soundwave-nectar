import { useState, useEffect } from "react";
import { Volume2, VolumeX, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DJMessageEnhancedProps {
  message: string;
  isLoading: boolean;
  isProcessing: boolean;
}

const DJMessageEnhanced = ({ message, isLoading, isProcessing }: DJMessageEnhancedProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (message) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className={cn(
      "bg-gradient-to-r from-primary/10 to-accent/10 p-4 rounded-lg relative transition-all duration-300",
      isAnimating && "scale-105",
      isProcessing && "animate-pulse"
    )}>
      <div className="flex items-center gap-2 mb-2">
        <Button 
          variant="ghost"
          size="icon"
          onClick={() => setIsMuted(!isMuted)} 
          className="hover:text-primary transition-colors"
        >
          {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </Button>
        <span className="font-semibold text-primary flex items-center gap-2">
          Live: DJ John
          {(isLoading || isProcessing) && (
            <Loader2 className="h-4 w-4 animate-spin" />
          )}
        </span>
      </div>
      <p className="text-gray-700 italic">
        {isLoading ? "Loading..." : message}
      </p>
    </div>
  );
};

export default DJMessageEnhanced;