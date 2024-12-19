import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Track {
  id: string;
  title: string;
  artist: string;
  url?: string;
}

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();

  const { data: tracks = [], isLoading } = useQuery({
    queryKey: ['songs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('songs')
        .select('*')
        .limit(10);
      
      if (error) throw error;
      return data as Track[];
    },
  });

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          toast({
            title: "Playback Error",
            description: "Unable to play the selected track. Please try again.",
            variant: "destructive",
          });
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const playNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
  };

  const playPrevious = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  if (isLoading) return null;

  const currentTrack = tracks[currentTrackIndex];

  return (
    <Card className="fixed bottom-4 right-4 w-80 shadow-lg">
      <CardContent className="p-4">
        <audio
          ref={audioRef}
          src={currentTrack?.url}
          onEnded={playNext}
          className="hidden"
        />
        <div className="flex flex-col gap-4">
          <div className="text-center">
            <h3 className="font-semibold">{currentTrack?.title}</h3>
            <p className="text-sm text-gray-500">{currentTrack?.artist}</p>
          </div>
          <div className="flex justify-center items-center gap-2">
            <Button variant="ghost" size="icon" onClick={playPrevious}>
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={togglePlay}>
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
            <Button variant="ghost" size="icon" onClick={playNext}>
              <SkipForward className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleMute}>
              {isMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MusicPlayer;