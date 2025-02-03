import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";

const SessionTracker = () => {
  useEffect(() => {
    const sessionId = uuidv4();
    let startTime = Date.now();
    let lastUpdate = startTime;
    
    const updateAnalytics = async () => {
      const currentTime = Date.now();
      const duration = Math.floor((currentTime - startTime) / 1000); // Duration in seconds
      
      try {
        await supabase
          .from("stream_analytics")
          .insert({
            session_id: sessionId,
            listener_count: 1, // This is per session
            total_duration: duration
          });
        
        lastUpdate = currentTime;
      } catch (error) {
        console.error("Error updating analytics:", error);
      }
    };

    // Update analytics every minute
    const intervalId = setInterval(updateAnalytics, 60000);

    // Update on unmount
    return () => {
      clearInterval(intervalId);
      updateAnalytics();
    };
  }, []);

  return null; // This component doesn't render anything
};

export default SessionTracker;