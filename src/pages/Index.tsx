import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
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

  useEffect(() => {
    const getUser = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        // Fetch the user's profile data
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authUser.id)
          .single();

        if (profile) {
          setUser({
            id: authUser.id,
            email: authUser.email,
            username: profile.username,
            is_admin: profile.is_admin || false,
            created_at: profile.created_at,
            avatar_url: profile.avatar_url
          });
        }
      }
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profile) {
          setUser({
            id: session.user.id,
            email: session.user.email,
            username: profile.username,
            is_admin: profile.is_admin || false,
            created_at: profile.created_at,
            avatar_url: profile.avatar_url
          });
        }
      } else {
        setUser(null);
      }
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
    </div>
  );
};

export default Index;