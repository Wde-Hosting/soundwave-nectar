import React, { useState } from 'react';
import { AlertCircle, Loader2, ExternalLink } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import StreamControls from "@/components/live-stream/StreamControls";
import StreamStats from "@/components/live-stream/StreamStats";
import InfoSection from "@/components/live-lesson/InfoSection";
import { toast } from "@/hooks/use-toast";

const LiveLesson = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quality, setQuality] = useState('auto');
  const [isChatOpen, setIsChatOpen] = useState(true);
  const streamUrl = "https://kick.com/soundmasterlive";

  const handleQualityChange = (newQuality: string) => {
    setQuality(newQuality);
    toast({
      title: "Quality Changed",
      description: `Stream quality set to ${newQuality}`,
    });
  };

  const handleIframeLoad = () => {
    console.log("Stream iframe loaded successfully");
    setIsLoading(false);
    setError(null);
    toast({
      title: "Stream Connected",
      description: "Successfully connected to the live stream",
    });
  };

  const handleIframeError = () => {
    console.error("Failed to load stream iframe");
    setIsLoading(false);
    setError("Unable to embed the live stream due to platform restrictions.");
  };

  const openStreamInNewTab = () => {
    window.open(streamUrl, '_blank', 'noopener,noreferrer');
    toast({
      title: "Opening Stream",
      description: "The live stream will open in a new tab",
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
          buffering: false,
          viewCount: 0
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
              <AlertTitle>Stream Embedding Restricted</AlertTitle>
              <AlertDescription className="space-y-4">
                <p>{error}</p>
                <Button 
                  onClick={openStreamInNewTab}
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open Stream in New Tab
                </Button>
              </AlertDescription>
            </Alert>
          )}

          <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
            <iframe
              src={`${streamUrl}/embed`}
              className={`absolute top-0 left-0 w-full h-full rounded-lg ${
                isLoading ? 'hidden' : 'block'
              }`}
              title="Live Stream"
              frameBorder="0"
              scrolling="no"
              allowFullScreen={true}
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              allow="autoplay; fullscreen; picture-in-picture"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
          </div>

          <StreamStats
            healthStatus={{
              bitrate: 0,
              fps: 0,
              latency: 0
            }}
            streamStats={{
              duration: 0,
              peakViewers: 0,
              qualityChanges: 0,
              bufferingEvents: 0
            }}
          />
        </div>

        {isChatOpen && (
          <div className="w-96">
            <div className="relative w-full h-[600px] bg-background rounded-lg border">
              <iframe
                src={`${streamUrl}/chat-embed`}
                title="Live Chat"
                className="w-full h-full rounded-lg"
                frameBorder="0"
                scrolling="yes"
                allow="autoplay; fullscreen"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              />
            </div>
          </div>
        )}
      </div>

      <InfoSection />
    </div>
  );
};

export default LiveLesson;