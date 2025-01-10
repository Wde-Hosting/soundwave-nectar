import { useEffect, useRef } from "react";
import { toast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface AudioPlayerProps {
  streamUrl: string | null;
  isPlaying: boolean;
  isMuted: boolean;
  onPlayStateChange: (isPlaying: boolean) => void;
}

const AudioPlayer = ({ streamUrl, isPlaying, isMuted, onPlayStateChange }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !streamUrl) return;

    const handlePlay = async () => {
      try {
        audio.load(); // Force reload the audio source
        await audio.play();
        console.log("Stream playback started");
        onPlayStateChange(true);
      } catch (error) {
        console.error("Playback failed:", error);
        onPlayStateChange(false);
        toast({
          title: "Playback Error",
          description: "Unable to play the stream. Trying to reconnect...",
          variant: "destructive",
        });
        // Attempt to reconnect after 5 seconds
        setTimeout(() => {
          if (audioRef.current) {
            handlePlay();
          }
        }, 5000);
      }
    };

    if (isPlaying) {
      handlePlay();
    } else {
      audio.pause();
      onPlayStateChange(false);
    }

    // Cleanup function
    return () => {
      audio.pause();
      onPlayStateChange(false);
    };
  }, [isPlaying, streamUrl, onPlayStateChange]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const handleCanPlay = () => {
    console.log("Stream is ready to play");
    toast({
      title: "Stream Ready",
      description: "Connected to live stream",
    });
  };

  const handleError = (e: any) => {
    console.error("Stream error:", e);
    onPlayStateChange(false);
    toast({
      title: "Stream Error",
      description: "There was an error connecting to the stream. Retrying...",
      variant: "destructive",
    });
  };

  if (!streamUrl) {
    return (
      <Alert>
        <AlertDescription>
          No stream URL configured. Please check the settings.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-xl bg-black">
      <audio
        ref={audioRef}
        src={streamUrl}
        controls
        className="w-full h-full"
        onCanPlay={handleCanPlay}
        onError={handleError}
        onPause={() => onPlayStateChange(false)}
        onPlay={() => onPlayStateChange(true)}
      >
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;