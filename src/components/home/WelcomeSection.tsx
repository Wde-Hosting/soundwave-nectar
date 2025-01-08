import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Music, Handshake, Star, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import DJMessage from "./welcome/DJMessage";
import FeatureCard from "./welcome/FeatureCard";
import ProfileImage from "./welcome/ProfileImage";

const WelcomeSection = () => {
  const [aiMessage, setAiMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateAIResponse = async (topic: string) => {
    try {
      setIsLoading(true);
      
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
      setAiMessage(data.choices[0].message.content);
      
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

  useEffect(() => {
    generateAIResponse("welcoming our listeners to Soundmaster");
  }, []);

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
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Music className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-4xl font-bold leading-tight">
                Meet <span className="text-primary">John Morden</span>
              </h2>
            </div>
            
            <DJMessage message={aiMessage} isLoading={isLoading} />

            <p className="text-xl text-gray-600">
              With over a decade of experience in sound engineering, John brings professional audio excellence to every event in Tzaneen & Limpopo
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {features.map((feature) => (
                <FeatureCard
                  key={feature.title}
                  {...feature}
                />
              ))}
            </div>
            
            <div className="pt-8">
              <Link to="/contact">
                <Button className="group">
                  Book a Consultation
                  <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
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