import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { WaveformVisualizer } from "./WaveformVisualizer";
import { RadioControls } from "./RadioControls";

export function LiveRadioPlayer() {
  const [isMinimized, setIsMinimized] = useState(false);
  
  const {
    audioRef,
    isPlaying,
    isMuted,
    volume,
    togglePlay,
    toggleMute,
    handleVolumeChange
  } = useAudioPlayer({ 
    url: "https://stream.soundmaster.com/live"
  });

  const handleVolumeSliderChange = (value: number[]) => {
    handleVolumeChange(value[0]);
  };

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
        <RadioControls
          isPlaying={isPlaying}
          isMuted={isMuted}
          volume={volume}
          isMinimized={isMinimized}
          onPlayPause={togglePlay}
          onMuteToggle={toggleMute}
          onVolumeChange={handleVolumeSliderChange}
          onMinimizeToggle={() => setIsMinimized(!isMinimized)}
        />

        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4"
            >
              <WaveformVisualizer isPlaying={isPlaying} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <audio ref={audioRef} />
    </Card>
  );
}