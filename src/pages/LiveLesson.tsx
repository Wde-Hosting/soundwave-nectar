import { useState, useEffect } from "react";
import { Video } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import AudioPlayer from "@/components/live-lesson/AudioPlayer";
import ControlPanel from "@/components/live-lesson/ControlPanel";
import InfoSection from "@/components/live-lesson/InfoSection";

const LiveLesson = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [streamUrl, setStreamUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStreamUrl = async () => {
      try {
        const { data, error } = await supabase
          .from('settings')
          .select('value')
          .eq('key', 'live_lesson_url')
          .maybeSingle();

        if (error) throw error;
        
        setStreamUrl(data?.value || "http://160.226.161.31:8000/Soundmasterlive");
      } catch (error) {
        console.error('Error fetching stream URL:', error);
        toast({
          title: "Error",
          description: "Could not load stream settings, using default URL",
          variant: "destructive",
        });
        setStreamUrl("http://160.226.161.31:8000/Soundmasterlive");
      } finally {
        setIsLoading(false);
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
            <h1 className="text-2xl font-bold">Live Lesson</h1>
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