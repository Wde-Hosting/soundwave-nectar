import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { useAIMessageQueue } from "./welcome/AIMessageQueue";
import DJMessageEnhanced from "./welcome/DJMessageEnhanced";
import FeatureCardEnhanced from "./welcome/FeatureCardEnhanced";
import ProfileImage from "./welcome/ProfileImage";
import HeaderSection from "./welcome/HeaderSection";
import Description from "./welcome/Description";
import ConsultationButton from "./welcome/ConsultationButton";
import { Music, Handshake, Star } from "lucide-react";

const WelcomeSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const { addToQueue, isProcessing, currentMessage } = useAIMessageQueue();

  const generateAIResponse = async (topic: string) => {
    try {
      setIsLoading(true);
      setActiveFeature(topic);
      
      const { data: settings } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'OPENROUTER_API_KEY')
        .maybeSingle();

      if (!settings?.value) {
        throw new Error('API key not configured');
      }

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${settings.value}`,
          'HTTP-Referer': window.location.origin,
        },
        body: JSON.stringify({
          model: 'mistralai/mistral-7b-instruct',
          messages: [
            {
              role: "system",
              content: "You are DJ John, a charismatic radio host and sound expert. Keep responses short, engaging, and fun - like a real radio DJ. Include emojis and sound-related terms."
            },
            {
              role: "user",
              content: `Tell me about ${topic} in an entertaining radio DJ style.`
            }
          ]
        })
      });

      const data = await response.json();
      addToQueue(data.choices[0].message.content);
      
    } catch (error) {
      console.error('AI Response error:', error);
      toast({
        title: "Error",
        description: "Couldn't connect to our AI DJ right now. Please try again later!",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: Music,
      title: "Sound Expert",
      description: "Professional audio engineering",
      onClick: () => generateAIResponse("our professional sound engineering services and equipment")
    },
    {
      icon: Star,
      title: "5-Star Service",
      description: "Consistently rated excellent",
      onClick: () => generateAIResponse("our five-star service and customer satisfaction")
    },
    {
      icon: Handshake,
      title: "Client Focus",
      description: "Personalized event solutions",
      onClick: () => generateAIResponse("our personalized event solutions and client focus")
    }
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <HeaderSection />
            
            <DJMessageEnhanced 
              message={currentMessage || ""} 
              isLoading={isLoading}
              isProcessing={isProcessing}
            />

            <Description />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {features.map((feature) => (
                <FeatureCardEnhanced
                  key={feature.title}
                  {...feature}
                  isActive={activeFeature === feature.title}
                />
              ))}
            </div>
            
            <ConsultationButton />
          </div>
          
          <ProfileImage 
            imageUrl="https://images.unsplash.com/photo-1470225620780-dba8ba36b745"
            onClick={() => generateAIResponse("our professional sound equipment and top-tier systems")}
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;