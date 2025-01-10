import { useState, useEffect } from "react";
import { Video } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import AudioPlayer from "@/components/live-lesson/AudioPlayer";
import ControlPanel from "@/components/live-lesson/ControlPanel";
import InfoSection from "@/components/live-lesson/InfoSection";

const LiveLesson = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [streamUrl, setStreamUrl] = useState<string>("http://160.226.161.31:8000/Soundmasterlive");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkStreamAvailability = async () => {
      try {
        const response = await fetch(streamUrl, { method: 'HEAD' });
        if (!response.ok) {
          console.error('Stream not available:', response.status);
          toast({
            title: "Stream Unavailable",
            description: "The live stream is currently offline. Please try again later.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error checking stream:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkStreamAvailability();
    // Check stream availability every 30 seconds
    const interval = setInterval(checkStreamAvailability, 30000);
    return () => clearInterval(interval);
  }, [streamUrl]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Video className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Live Stream</h1>
          </div>
          <ControlPanel
            isMuted={isMuted}
            isFullscreen={isFullscreen}
            onMuteToggle={() => setIsMuted(!isMuted)}
            onFullscreenToggle={toggleFullscreen}
          />
        </div>

        <AudioPlayer
          streamUrl={streamUrl}
          isPlaying={isPlaying}
          isMuted={isMuted}
          onPlayStateChange={setIsPlaying}
        />

        <InfoSection isPlaying={isPlaying} />
      </div>
    </div>
  );
};

export default LiveLesson;