
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Setting } from "@/types/database.types";

interface LiveLessonSettingsProps {
  initialUrl?: string;
}

const LiveLessonSettings = ({ initialUrl = "" }: LiveLessonSettingsProps) => {
  const { toast } = useToast();
  const [iframeUrl, setIframeUrl] = useState<string>(initialUrl);

  const handleIframeUpdate = async () => {
    try {
      const settingsData: Omit<Setting, 'created_at' | 'updated_at'> = {
        key: 'live_lesson_url',
        value: iframeUrl,
      };

      const { error } = await supabase
        .from('settings')
        .upsert(settingsData, {
          onConflict: 'key',
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Live lesson URL updated successfully",
      });
    } catch (error) {
      console.error('Error updating iframe URL:', error);
      toast({
        title: "Error",
        description: "Failed to update live lesson URL",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Website Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="iframe-url">Live Lesson iFrame URL</Label>
          <div className="flex gap-2">
            <Input
              id="iframe-url"
              value={iframeUrl}
              onChange={(e) => setIframeUrl(e.target.value)}
              placeholder="Enter your streaming URL"
            />
            <Button onClick={handleIframeUpdate}>Save</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveLessonSettings;
