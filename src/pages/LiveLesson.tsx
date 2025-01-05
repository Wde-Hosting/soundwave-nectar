import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Video, ExternalLink } from "lucide-react";

const LiveLesson = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // This is the stream URL - in production, this should be fetched from an environment variable
  const streamUrl = "http://160.226.161.31:8000/Soundmasterlive";

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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Video className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Live Lesson</h1>
          </div>
          <Button
            variant="outline"
            onClick={toggleFullscreen}
            className="flex items-center gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            {isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          </Button>
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-xl bg-black">
          <audio
            src={streamUrl}
            controls
            autoPlay={isPlaying}
            className="w-full h-full"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            Your browser does not support the audio element.
          </audio>
        </div>

        <div className="mt-6 bg-card rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">About This Lesson</h2>
          <p className="text-muted-foreground">
            Welcome to the live lesson! Here you can listen to real-time
            music sessions, learn new techniques, and interact with the instructor.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LiveLesson;