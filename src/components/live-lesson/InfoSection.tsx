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
    refetchInterval: 5000, // Check every 5 seconds for more responsive updates
  });

  const getStreamStatusBadge = () => {
    if (error) return <Badge variant="destructive">Error</Badge>;
    if (streamStatus) return <Badge variant="success">Live</Badge>;
    return <Badge variant="secondary">Offline</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-bold">Live Stream Status</h2>
        {getStreamStatusBadge()}
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>
            Unable to check stream status. Please refresh the page.
          </AlertDescription>
        </Alert>
      )}

      {!streamStatus && !error && (
        <Alert>
          <AlertDescription>
            No live stream is currently active. Please check back soon!
          </AlertDescription>
        </Alert>
      )}

      {isPlaying && streamStatus && (
        <Alert>
          <AlertDescription>
            Successfully connected to live stream! Enjoy your session.
          </AlertDescription>
        </Alert>
      )}

      <div className="prose dark:prose-invert max-w-none">
        <h3>About Live Broadcasting</h3>
        <p>
          Experience real-time DJ sessions and interactive music streaming. 
          When a broadcast is live, you'll be able to listen and interact here.
          The stream status is automatically checked every 5 seconds to ensure you're always up to date.
        </p>
      </div>
    </div>
  );
};

export default InfoSection;