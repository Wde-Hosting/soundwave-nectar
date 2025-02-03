import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

const ListenerCount = () => {
  const [listenerCount, setListenerCount] = useState(0);

  useEffect(() => {
    const channel = supabase
      .channel('realtime-listeners')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'stream_analytics'
        },
        (payload) => {
          if (payload.new && 'listener_count' in payload.new) {
            setListenerCount(payload.new.listener_count as number);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Current Listeners</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{listenerCount}</div>
      </CardContent>
    </Card>
  );
};

export default ListenerCount;