import { useEffect, useRef } from "react";
import { toast } from "@/components/ui/use-toast";

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
    if (!audio) return;

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Playback error:", error);
          onPlayStateChange(false);
          toast({
            title: "Playback Error",
            description: "Unable to play the stream. Please try again.",
            variant: "destructive",
          });
        });
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, onPlayStateChange]);

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
      description: "There was an error connecting to the stream. Please try again.",
      variant: "destructive",
    });
  };

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-xl bg-black">
      {streamUrl && (
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
      )}
    </div>
  );
};

export default AudioPlayer;