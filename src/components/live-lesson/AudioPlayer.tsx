import { toast } from "@/components/ui/use-toast";

interface AudioPlayerProps {
  streamUrl: string | null;
  isPlaying: boolean;
  isMuted: boolean;
  onPlayStateChange: (isPlaying: boolean) => void;
}

const AudioPlayer = ({ streamUrl, isPlaying, isMuted, onPlayStateChange }: AudioPlayerProps) => {
  const handlePlayError = () => {
    toast({
      title: "Stream Error",
      description: "There was an error playing the stream. Please try again later.",
      variant: "destructive",
    });
  };

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-xl bg-black">
      {streamUrl && (
        <audio
          src={streamUrl}
          controls
          autoPlay={isPlaying}
          className="w-full h-full"
          onPlay={() => onPlayStateChange(true)}
          onPause={() => onPlayStateChange(false)}
          onError={handlePlayError}
          muted={isMuted}
        >
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

export default AudioPlayer;