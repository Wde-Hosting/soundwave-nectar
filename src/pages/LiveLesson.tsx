import { useState } from "react";
import { Video } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import InfoSection from "@/components/live-lesson/InfoSection";
import { Card } from "@/components/ui/card";

const LiveLesson = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Video className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Live Stream</h1>
          </div>
        </div>

        <Card className="w-full overflow-hidden rounded-lg shadow-lg">
          <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
            <iframe
              src="https://player.kick.com/soundmasterlive"
              className="absolute top-0 left-0 w-full h-full"
              frameBorder="0"
              scrolling="no"
              allowFullScreen={true}
              title="Soundmaster Live Stream"
            />
          </div>
        </Card>

        <InfoSection />
      </div>
    </div>
  );
};

export default LiveLesson;