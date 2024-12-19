import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import EventGallery from "@/components/EventGallery";
import SongList from "@/components/SongList";
import MusicPlayer from "@/components/MusicPlayer";
import { Button } from "@/components/ui/button";
import { User, Heart, Calendar, Headphones } from "lucide-react";

const Index = () => {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const values = [
    {
      title: "Professional & Reliable",
      description: "Ensuring seamless events with dependable service.",
      icon: <User className="h-6 w-6" />
    },
    {
      title: "Quality Equipment",
      description: "Using top-tier sound systems for unmatched audio clarity.",
      icon: <Headphones className="h-6 w-6" />
    },
    {
      title: "Customer Satisfaction",
      description: "Tailoring every service to meet client needs.",
      icon: <Heart className="h-6 w-6" />
    }
  ];

  return (
    <div className="min-h-screen">
      <HeroSection user={user} onSearch={setSearchQuery} />
      <ServicesSection />
      <SongList searchQuery={searchQuery} />
      <EventGallery />
      
      {/* About Section with Image */}
      <div className="py-20 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">A Unique Journey</h2>
              <p className="text-gray-600 mb-6">
                Soundmaster began with a simple idea: playing free music for the Tzaneen community. 
                Despite being a private, non-profit hobby, our mission has expanded to spotlight 
                the region's attractions while delivering exceptional sound services.
              </p>
              <div className="space-y-4">
                {values.map((value) => (
                  <div key={value.title} className="flex items-start gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="text-primary mt-1">
                      {value.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold">{value.title}</h4>
                      <p className="text-gray-600">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1516280440614-37939bbacd81"
                alt="Professional sound equipment"
                className="rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary rounded-full opacity-10"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact CTA with Background */}
      <div className="relative py-16">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1511379938547-c1f69419868d')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "overlay"
          }}
        />
        <div className="absolute inset-0 bg-primary/80"></div>
        <div className="container relative z-10 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Ready to Create Your Perfect Sound?</h2>
          <p className="mb-8 text-lg">Contact us today to discuss your event needs</p>
          <Button 
            variant="secondary" 
            size="lg"
            className="hover:scale-105 transition-transform"
          >
            Contact Us
          </Button>
        </div>
      </div>

      <MusicPlayer />
    </div>
  );
};

export default Index;