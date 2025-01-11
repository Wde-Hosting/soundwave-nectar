import React, { useState, useEffect, useCallback } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import StreamControls from "@/components/live-stream/StreamControls";
import StreamStats from "@/components/live-stream/StreamStats";
import { toast } from "@/hooks/use-toast";

const LiveLesson = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quality, setQuality] = useState('auto');
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [healthStatus, setHealthStatus] = useState({
    bitrate: 0,
    fps: 0,
    buffering: false,
    latency: 0,
    dropped_frames: 0,
    viewCount: 0
  });
  const [streamStats, setStreamStats] = useState({
    duration: 0,
    peakViewers: 0,
    qualityChanges: 0,
    bufferingEvents: 0,
    startTime: new Date()
  });

  const baseStreamUrl = "https://player.kick.com/soundmasterlive";
  const streamUrl = `${baseStreamUrl}${quality !== 'auto' ? `?quality=${quality}` : ''}`;
  const chatUrl = "https://kick.com/soundmasterlive/chatroom";

  // Stream Health Monitoring
  const monitorStreamHealth = useCallback(() => {
    const interval = setInterval(() => {
      // Simulate stream health metrics (replace with actual metrics in production)
      const newHealth = {
        bitrate: Math.floor(Math.random() * 5000) + 3000,
        fps: Math.floor(Math.random() * 10) + 50,
        buffering: Math.random() > 0.95,
        latency: Math.floor(Math.random() * 1000),
        dropped_frames: Math.floor(Math.random() * 10),
        viewCount: Math.floor(Math.random() * 1000)
      };

      setHealthStatus(newHealth);
      
      setStreamStats(prev => ({
        ...prev,
        duration: (new Date().getTime() - prev.startTime.getTime()) / 1000,
        bufferingEvents: prev.bufferingEvents + (newHealth.buffering ? 1 : 0),
        peakViewers: Math.max(prev.peakViewers, newHealth.viewCount)
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cleanup = monitorStreamHealth();
    return () => cleanup();
  }, [monitorStreamHealth]);

  const handleQualityChange = (newQuality: string) => {
    setIsLoading(true);
    setQuality(newQuality);
    setStreamStats(prev => ({
      ...prev,
      qualityChanges: prev.qualityChanges + 1
    }));
    toast({
      title: "Quality Changed",
      description: `Stream quality set to ${newQuality}`,
    });
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
    setError(null);
    toast({
      title: "Stream Connected",
      description: "Successfully connected to the live stream",
    });
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setError("Failed to load the live stream. Please try refreshing the page.");
    toast({
      variant: "destructive",
      title: "Stream Error",
      description: "Failed to connect to the live stream",
    });
  };

  const handleRetry = () => {
    setIsLoading(true);
    setError(null);
    setStreamStats(prev => ({
      ...prev,
      startTime: new Date()
    }));
    toast({
      title: "Retrying Connection",
      description: "Attempting to reconnect to the stream...",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <StreamControls
        quality={quality}
        onQualityChange={handleQualityChange}
        isChatOpen={isChatOpen}
        onToggleChat={() => setIsChatOpen(!isChatOpen)}
        healthStatus={{
          buffering: healthStatus.buffering,
          viewCount: healthStatus.viewCount
        }}
      />

      <div className="flex gap-4">
        <div className="flex-1">
          {isLoading && (
            <div className="flex items-center justify-center h-96 bg-muted rounded-lg">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-8 w-8 animate-spin" />
                <p className="text-muted-foreground">Loading live stream...</p>
              </div>
            </div>
          )}

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Stream Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
              <Button 
                onClick={handleRetry}
                className="mt-4"
                variant="destructive"
              >
                Retry Connection
              </Button>
            </Alert>
          )}

          <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
            <iframe
              src={streamUrl}
              className={`absolute top-0 left-0 w-full h-full rounded-lg ${
                isLoading ? 'hidden' : 'block'
              }`}
              frameBorder="0"
              scrolling="no"
              allowFullScreen={true}
              onLoad={handleIframeLoad}
              onError={handleIframeError}
            />
          </div>

          <StreamStats
            healthStatus={healthStatus}
            streamStats={streamStats}
          />
        </div>

        {isChatOpen && (
          <div className="w-96">
            <div className="relative w-full h-[600px] bg-background rounded-lg border">
              <iframe
                src={chatUrl}
                className="w-full h-full rounded-lg"
                frameBorder="0"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveLesson;