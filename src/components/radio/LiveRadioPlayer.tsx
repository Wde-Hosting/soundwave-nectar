import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Minimize2, Maximize2, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function LiveRadioPlayer() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [waveformData, setWaveformData] = useState<number[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const {
    audioRef,
    isPlaying,
    isMuted,
    volume,
    togglePlay,
    toggleMute,
    handleVolumeChange
  } = useAudioPlayer({ 
    url: "https://stream.soundmaster.com/live",
    onPlay: () => startWaveformAnimation()
  });

  // Waveform animation
  useEffect(() => {
    if (!canvasRef.current || !isPlaying) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const generateRandomWaveform = () => {
      const data = [];
      for (let i = 0; i < 50; i++) {
        data.push(Math.random() * 0.5 + 0.2);
      }
      return data;
    };

    const animate = () => {
      if (!isPlaying) return;
      
      const newData = generateRandomWaveform();
      setWaveformData(newData);
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw waveform
      ctx.beginPath();
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 2;
      
      newData.forEach((value, index) => {
        const x = (canvas.width / newData.length) * index;
        const y = (canvas.height / 2) * value;
        
        if (index === 0) {
          ctx.moveTo(x, canvas.height / 2 - y);
        } else {
          ctx.lineTo(x, canvas.height / 2 - y);
        }
      });
      
      ctx.stroke();
      
      requestAnimationFrame(animate);
    };

    animate();
  }, [isPlaying]);

  return (
    <Card className={cn(
      "fixed bottom-4 right-4 transition-all duration-300 backdrop-blur-lg bg-background/80 border border-border/50",
      isMinimized ? "w-16 h-16" : "w-96"
    )}>
      <motion.div 
        layout
        className="p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={togglePlay}
            className={cn(
              "h-10 w-10 rounded-full transition-colors",
              isPlaying ? "bg-primary text-primary-foreground" : "hover:bg-primary/20"
            )}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>

          <AnimatePresence>
            {!isMinimized && (
              <motion.div 
                className="flex-1 space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium flex items-center gap-2">
                      <Music className="h-4 w-4 text-primary" />
                      Live Radio
                    </h3>
                    <p className="text-xs text-muted-foreground">Soundmaster FM</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleMute}
                      className="h-8 w-8"
                    >
                      {isMuted ? (
                        <VolumeX className="h-4 w-4" />
                      ) : (
                        <Volume2 className="h-4 w-4" />
                      )}
                    </Button>

                    <Slider
                      value={[isMuted ? 0 : volume]}
                      max={1}
                      step={0.1}
                      onValueChange={(value) => handleVolumeChange(value[0])}
                      className="w-24"
                    />
                  </div>
                </div>

                <canvas 
                  ref={canvasRef}
                  className="w-full h-12 rounded-md bg-background/50"
                  width={320}
                  height={48}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMinimized(!isMinimized)}
            className="h-8 w-8"
          >
            {isMinimized ? (
              <Maximize2 className="h-4 w-4" />
            ) : (
              <Minimize2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </motion.div>
      <audio ref={audioRef} />
    </Card>
  );
}