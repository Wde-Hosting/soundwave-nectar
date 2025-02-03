import { useState } from "react";
import { Play, Pause, Volume2, VolumeX, Minimize2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { cn } from "@/lib/utils";

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
  } = useAudioPlayer({ url: "https://stream.soundmaster.com/live" });

  return (
    <Card className={cn(
      "fixed bottom-4 right-4 p-4 shadow-lg transition-all duration-300",
      isMinimized ? "w-16 h-16" : "w-80"
    )}>
      <audio ref={audioRef} />
      
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={togglePlay}
          className="h-10 w-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>

        {!isMinimized && (
          <>
            <div className="flex-1">
              <h3 className="text-sm font-medium">Live Radio</h3>
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
                onValueChange={(value) => handleVolumeChange(value)}
                className="w-24"
              />
            </div>
          </>
        )}

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
    </Card>
  );
}