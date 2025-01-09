import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface InfoSectionProps {
  isPlaying: boolean;
}

const InfoSection = ({ isPlaying }: InfoSectionProps) => {
  const { data: streamStatus, error } = useQuery({
    queryKey: ['stream-status'],
    queryFn: async () => {
      try {
        const { data: settings } = await supabase
          .from('settings')
          .select('value')
          .eq('key', 'stream_status')
          .maybeSingle();
        
        return settings?.value === 'online';
      } catch (error) {
        console.error('Stream status check failed:', error);
        return false;
      }
    },
    refetchInterval: 30000, // Check every 30 seconds
    retry: 2, // Retry failed requests twice
  });

  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Live Lesson Status</h2>
        <Badge variant={streamStatus ? "secondary" : "destructive"}>
          {streamStatus ? "Stream Available" : "Stream Offline"}
        </Badge>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>
            Unable to check stream status. Please refresh the page or contact support if the issue persists.
          </AlertDescription>
        </Alert>
      )}

      {!streamStatus && !error && (
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