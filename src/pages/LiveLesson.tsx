import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Video, ExternalLink, Volume2, VolumeX } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const LiveLesson = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [streamUrl, setStreamUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchStreamUrl = async () => {
      try {
        const { data, error } = await supabase
          .from('settings')
          .select('value')
          .eq('key', 'live_lesson_url')
          .single();

        if (error) throw error;
        
        setStreamUrl(data?.value || "http://160.226.161.31:8000/Soundmasterlive");
      } catch (error) {
        console.error('Error fetching stream URL:', error);
        toast({
          title: "Error",
          description: "Could not load stream settings",
          variant: "destructive",
        });
      }
    };

    fetchStreamUrl();
  }, []);

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

  const handlePlayError = () => {
    toast({
      title: "Stream Error",
      description: "There was an error playing the stream. Please try again later.",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Video className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Live Lesson</h1>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setIsMuted(!isMuted)}
              className="flex items-center gap-2"
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              {isMuted ? "Unmute" : "Mute"}
            </Button>
            <Button
              variant="outline"
              onClick={toggleFullscreen}
              className="flex items-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              {isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            </Button>
          </div>
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-xl bg-black">
          {streamUrl && (
            <audio
              src={streamUrl}
              controls
              autoPlay={isPlaying}
              className="w-full h-full"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onError={handlePlayError}
              muted={isMuted}
            >
              Your browser does not support the audio element.
            </audio>
          )}
        </div>

        <div className="mt-6 bg-card rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">About This Lesson</h2>
          <p className="text-muted-foreground">
            Welcome to the live lesson! Here you can listen to real-time
            music sessions, learn new techniques, and interact with the instructor.
            {!isPlaying && (
              <span className="block mt-2 text-primary">
                Press play to start listening to the live stream.
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LiveLesson;