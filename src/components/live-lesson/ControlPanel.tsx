import { Button } from "@/components/ui/button";
import { ExternalLink, Volume2, VolumeX } from "lucide-react";

interface ControlPanelProps {
  isMuted: boolean;
  isFullscreen: boolean;
  onMuteToggle: () => void;
  onFullscreenToggle: () => void;
}

const ControlPanel = ({
  isMuted,
  isFullscreen,
  onMuteToggle,
  onFullscreenToggle,
}: ControlPanelProps) => {
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        onClick={onMuteToggle}
        className="flex items-center gap-2"
      >
        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        {isMuted ? "Unmute" : "Mute"}
      </Button>
      <Button
        variant="outline"
        onClick={onFullscreenToggle}
        className="flex items-center gap-2"
      >
        <ExternalLink className="h-4 w-4" />
        {isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
      </Button>
    </div>
  );
};

export default ControlPanel;