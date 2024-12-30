import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import SongList from "@/components/SongList";
import MusicPlayer from "@/components/MusicPlayer";
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
      <MusicPlayer />
    </div>
  );
};

export default Index;