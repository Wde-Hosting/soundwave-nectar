import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";

interface InfoSectionProps {
  isPlaying: boolean;
}

const InfoSection = ({ isPlaying }: InfoSectionProps) => {
  const { data: streamStatus, error } = useQuery({
    queryKey: ['stream-status'],
    queryFn: async ({ signal }) => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
      }, 10000);

      try {
        const response = await fetch("https://cors-proxy.lovableprojects.workers.dev/?url=http://160.226.161.31:8000/Soundmasterlive", {
          method: 'GET',
          headers: {
            'Accept': '*/*',
            'Range': 'bytes=0-0',
          },
          signal: controller.signal,
          cache: 'no-store',
        });

        return response.status === 200 || response.status === 206;
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          console.log("Request timed out, stream might be offline");
          return false;
        }
        console.error("Error checking stream status:", error);
        return false;
      } finally {
        clearTimeout(timeoutId);
      }
    },
    refetchInterval: 5000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * (2 ** attemptIndex), 10000),
  });

  const getStreamStatusBadge = () => {
    if (error) return <Badge variant="destructive">Error</Badge>;
    if (streamStatus) return <Badge className="bg-green-500 hover:bg-green-600">Live</Badge>;
    return <Badge variant="secondary">Offline</Badge>;
  };

  return (
    <div className="space-y-6 mt-6">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-bold">Live Stream Status</h2>
        {getStreamStatusBadge()}
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>
            Unable to check stream status. Please refresh the page or try again later.
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