import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface InfoSectionProps {
  isPlaying: boolean;
}

const InfoSection = ({ isPlaying }: InfoSectionProps) => {
  const { data: streamStatus } = useQuery({
    queryKey: ['stream-status'],
    queryFn: async () => {
      try {
        const response = await fetch("http://160.226.161.31:8000/Soundmasterlive");
        return response.ok;
      } catch (error) {
        console.error('Stream check error:', error);
        return false;
      }
    },
    refetchInterval: 30000, // Check every 30 seconds
  });

  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Live Lesson Status</h2>
        <Badge variant={streamStatus ? "secondary" : "destructive"}>
          {streamStatus ? "Stream Available" : "Stream Offline"}
        </Badge>
      </div>

      {!streamStatus && (
        <Alert variant="destructive">
          <AlertDescription>
            No stream is currently live. Please check back later or contact support if you believe this is an error.
          </AlertDescription>
        </Alert>
      )}

      {isPlaying && streamStatus && (
        <Alert>
          <AlertDescription>
            You are currently listening to a live lesson. Enjoy your session!
          </AlertDescription>
        </Alert>
      )}

      <div className="prose dark:prose-invert max-w-none">
        <h3>About Live Lessons</h3>
        <p>
          Join our interactive live lessons where you can learn from professional DJs
          and sound engineers. Get real-time feedback and improve your skills.
        </p>
      </div>
    </div>
  );
};

export default InfoSection;