import { useState } from "react";
import { useAIMessageQueue } from "./welcome/AIMessageQueue";
import MainContent from "./welcome/MainContent";
import ProfileImage from "./welcome/ProfileImage";
import { generateAIResponse, processAIResponse } from "@/utils/ai/aiUtils";
import { djFeatures } from "@/utils/features/djFeatures";
import { toast } from "@/components/ui/use-toast";

const WelcomeSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const { addToQueue, isProcessing, currentMessage } = useAIMessageQueue();

  const handleFeatureClick = async (topic: string) => {
    try {
      setIsLoading(true);
      const aiResponse = await generateAIResponse(topic);
      const processedResponse = await processAIResponse(aiResponse);
      addToQueue(processedResponse);

      // Show relevant toasts based on response type
      if (aiResponse.type === 'song') {
        toast({
          title: "Songs Found! 🎵",
          description: "Check out these matching songs from our collection.",
        });
      } else if (aiResponse.type === 'booking') {
        toast({
          title: "Ready to Book? 📅",
          description: "Click to schedule your appointment now!",
        });
      }
    } catch (error) {
      console.error('Error handling feature click:', error);
      toast({
        title: "Error",
        description: "Failed to process your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <MainContent 
            currentMessage={currentMessage}
            isLoading={isLoading}
            isProcessing={isProcessing}
            features={djFeatures}
            activeFeature={activeFeature}
            onFeatureClick={(topic) => {
              setActiveFeature(topic);
              handleFeatureClick(topic);
            }}
          />
          
          <ProfileImage 
            imageUrl="https://images.unsplash.com/photo-1470225620780-dba8ba36b745"
            onClick={() => handleFeatureClick("our professional sound equipment and top-tier systems")}
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;