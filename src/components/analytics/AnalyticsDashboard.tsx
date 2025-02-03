import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import ListenerCount from "./ListenerCount";
import { Loader2 } from "lucide-react";

interface AnalyticsData {
  timestamp: string;
  listeners: number;
}

const AnalyticsDashboard = () => {
  const { data: analyticsData, isLoading } = useQuery({
    queryKey: ["stream-analytics"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("stream_analytics")
        .select("created_at, listener_count")
        .order("created_at", { ascending: true })
        .limit(100);

      if (error) throw error;

      return data.map(record => ({
        timestamp: new Date(record.created_at).toLocaleTimeString(),
        listeners: record.listener_count || 0
      }));
    },
    refetchInterval: 30000 // Refetch every 30 seconds
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <ListenerCount />
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Peak Listeners</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.max(...(analyticsData?.map(d => d.listeners) || [0]))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Listener Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analyticsData}>
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="listeners"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;