import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import SongList from "@/components/SongList";
import MusicPlayer from "@/components/MusicPlayer";
import ValueProposition from "@/components/home/ValueProposition";
import ContactCTA from "@/components/home/ContactCTA";
import CalendarSection from "@/components/calendar/CalendarSection";

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

  return (
    <div className="min-h-screen">
      <HeroSection user={user} onSearch={setSearchQuery} />
      <ServicesSection />
      <CalendarSection />
      <SongList searchQuery={searchQuery} />
      <ValueProposition />
      <ContactCTA />
      <MusicPlayer />
    </div>
  );
};

export default Index;