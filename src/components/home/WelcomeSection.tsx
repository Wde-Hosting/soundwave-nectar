import { Button } from "@/components/ui/button";
import { ArrowRight, Music, Star, UserRound, Handshake, Volume2, VolumeX } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const WelcomeSection = () => {
  const [isAITalking, setIsAITalking] = useState(false);
  const [aiMessage, setAiMessage] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const { toast } = useToast();

  const generateAIResponse = async (topic: string) => {
    try {
      setIsAITalking(true);
      
      const { data: settings } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'OPENROUTER_API_KEY')
        .single();

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
      
      // Text-to-speech could be added here in future iterations
      
    } catch (error) {
      console.error('AI Response error:', error);
      toast({
        title: "Error",
        description: "Couldn't connect to our AI DJ right now. Please try again later!",
        variant: "destructive",
      });
    } finally {
      setIsAITalking(false);
    }
  };

  useEffect(() => {
    // Generate a welcome message when component mounts
    generateAIResponse("welcoming our listeners to Soundmaster");
  }, []);

  const handleCardClick = (topic: string) => {
    generateAIResponse(topic);
  };

  return (
    <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <UserRound className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-4xl font-bold leading-tight">
                Meet <span className="text-primary">John Morden</span>
              </h2>
            </div>
            
            {/* AI DJ Message Display */}
            {aiMessage && (
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4 rounded-lg relative animate-pulse">
                <div className="flex items-center gap-2 mb-2">
                  {isAITalking ? (
                    <Volume2 className="h-5 w-5 text-primary animate-bounce" />
                  ) : (
                    <button 
                      onClick={() => setIsMuted(!isMuted)} 
                      className="hover:text-primary transition-colors"
                    >
                      {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                    </button>
                  )}
                  <span className="font-semibold text-primary">Live: DJ John</span>
                </div>
                <p className="text-gray-700 italic">{aiMessage}</p>
              </div>
            )}

            <p className="text-xl text-gray-600">
              With over a decade of experience in sound engineering, John brings professional audio excellence to every event in Tzaneen & Limpopo
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div 
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer transform hover:scale-105"
                onClick={() => handleCardClick("our professional sound engineering services and equipment")}
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Music className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Sound Expert</h3>
                    <p className="text-gray-600">Professional audio engineering</p>
                  </div>
                </div>
              </div>
              
              <div 
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer transform hover:scale-105"
                onClick={() => handleCardClick("our five-star service and customer satisfaction")}
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">5-Star Service</h3>
                    <p className="text-gray-600">Consistently rated excellent</p>
                  </div>
                </div>
              </div>
              
              <div 
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer transform hover:scale-105"
                onClick={() => handleCardClick("our personalized event solutions and client focus")}
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Handshake className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Client Focus</h3>
                    <p className="text-gray-600">Personalized event solutions</p>
                  </div>
                </div>
              </div>
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
          
          <div className="relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300">
              <div className="aspect-w-4 aspect-h-5">
                <img
                  src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745"
                  alt="Professional sound equipment"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div 
                    className="flex items-center gap-4 mb-4 cursor-pointer transform hover:scale-105 transition-transform"
                    onClick={() => handleCardClick("our professional sound equipment and top-tier systems")}
                  >
                    <img
                      src="/lovable-uploads/fb8dd939-8a3d-444e-ac29-8f9d0e54268d.png"
                      alt="Professional Sound Equipment"
                      className="w-16 h-16 rounded-full object-cover border-2 border-white"
                    />
                    <div>
                      <h3 className="text-2xl font-bold">Professional Equipment</h3>
                      <p className="text-gray-200">Top-tier sound systems</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 fill-current text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-primary/10 rounded-full -z-10 blur-2xl"></div>
            <div className="absolute -top-4 -left-4 w-72 h-72 bg-accent/10 rounded-full -z-10 blur-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;