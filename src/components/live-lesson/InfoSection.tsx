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
      const { data: settings } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'stream_status')
        .maybeSingle();
      
      return settings?.value === 'online';
    },
    refetchInterval: 10000,
  });

  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Live Lesson Status</h2>
        <Badge variant={streamStatus ? "success" : "destructive"}>
          {streamStatus ? "Live Now" : "Offline"}
        </Badge>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>
            Unable to check stream status. Please refresh.
          </AlertDescription>
        </Alert>
      )}

      {!streamStatus && !error && (
        <Alert>
          <AlertDescription>
            No live lesson is currently streaming. Check back soon!
          </AlertDescription>
        </Alert>
      )}

      {isPlaying && streamStatus && (
        <Alert>
          <AlertDescription>
            Connected to live stream! Enjoy your lesson.
          </AlertDescription>
        </Alert>
      )}

      <div className="prose dark:prose-invert max-w-none">
        <h3>About Live Lessons</h3>
        <p>
          Join our interactive DJ lessons and learn from professional instructors in real-time.
          When a lesson is live, you'll be able to watch and participate here.
        </p>
      </div>
    </div>
  );
};

export default InfoSection;