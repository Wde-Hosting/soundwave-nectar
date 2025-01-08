import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

export const useAIMessageQueue = () => {
  const [messageQueue, setMessageQueue] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (messageQueue.length > 0 && !isProcessing) {
      processNextMessage();
    }
  }, [messageQueue, isProcessing]);

  const processNextMessage = async () => {
    setIsProcessing(true);
    const currentMessage = messageQueue[0];
    
    try {
      // Process message (future audio implementation)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessageQueue(prev => prev.slice(1));
    } catch (error) {
      console.error('Error processing message:', error);
      toast({
        title: "Error",
        description: "Failed to process DJ message",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const addToQueue = (message: string) => {
    setMessageQueue(prev => [...prev, message]);
  };

  return {
    addToQueue,
    isProcessing,
    currentMessage: messageQueue[0],
  };
};