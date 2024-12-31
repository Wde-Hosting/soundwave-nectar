import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import SongList from "@/components/SongList";
import ValueProposition from "@/components/home/ValueProposition";
import ContactCTA from "@/components/home/ContactCTA";
import CalendarSection from "@/components/calendar/CalendarSection";
import { User } from "@/types/user";
import TestimonialSection from "@/components/home/TestimonialSection";
import StatsSection from "@/components/home/StatsSection";
import FeaturedEvents from "@/components/home/FeaturedEvents";
import WelcomeSection from "@/components/home/WelcomeSection";

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen">
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => navigate('/live-lesson')}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
        >
          <Video className="h-5 w-5" />
          Lesson Live
        </Button>
      </div>
      <HeroSection user={user} onSearch={setSearchQuery} />
      <WelcomeSection />
      <StatsSection />
      <ServicesSection />
      <FeaturedEvents />
      <CalendarSection />
      <SongList searchQuery={searchQuery} />
      <TestimonialSection />
      <ValueProposition />
      <ContactCTA />
    </div>
  );
};

export default Index;