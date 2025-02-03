import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Volume2, VolumeX, Minimize2, Maximize2, Music, Play, Pause } from "lucide-react";
import { motion } from "framer-motion";

interface RadioControlsProps {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  isMinimized: boolean;
  onPlayPause: () => void;
  onMuteToggle: () => void;
  onVolumeChange: (value: number[]) => void;
  onMinimizeToggle: () => void;
}

export const RadioControls = ({
  isPlaying,
  isMuted,
  volume,
  isMinimized,
  onPlayPause,
  onMuteToggle,
  onVolumeChange,
  onMinimizeToggle,
}: RadioControlsProps) => {
  return (
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={onPlayPause}
        className={`h-10 w-10 rounded-full transition-colors ${
          isPlaying ? "bg-primary text-primary-foreground" : "hover:bg-primary/20"
        }`}
      >
        {isPlaying ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4" />
        )}
      </Button>

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
                onClick={onMuteToggle}
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
                onValueChange={onVolumeChange}
                className="w-24"
              />
            </div>
          </div>
        </motion.div>
      )}

      <Button
        variant="ghost"
        size="icon"
        onClick={onMinimizeToggle}
        className="h-8 w-8"
      >
        {isMinimized ? (
          <Maximize2 className="h-4 w-4" />
        ) : (
          <Minimize2 className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};