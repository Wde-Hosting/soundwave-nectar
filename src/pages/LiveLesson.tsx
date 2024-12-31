import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Video, ExternalLink } from "lucide-react";

const LiveLesson = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // This is a placeholder URL - replace with your actual iframe URL
  const iframeUrl = "https://your-streaming-url.com";

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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
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

        <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-xl">
          <iframe
            src={iframeUrl}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="mt-6 bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">About This Lesson</h2>
          <p className="text-gray-300">
            Welcome to the live lesson! Here you can watch and participate in real-time
            music sessions, learn new techniques, and interact with the instructor.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LiveLesson;