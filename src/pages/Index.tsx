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
import AIPersonalityList from "@/components/ai/AIPersonalityList";
import { useAdmin } from "@/contexts/AdminContext";

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { isAdmin } = useAdmin();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authUser.id)
          .single();

        if (profile) {
          const userData: User = {
            id: authUser.id,
            email: authUser.email ?? undefined,
            username: profile.username,
            is_admin: profile.is_admin || false,
            created_at: profile.created_at,
            avatar_url: profile.avatar_url
          };
          setUser(userData);
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
          const userData: User = {
            id: session.user.id,
            email: session.user.email ?? undefined,
            username: profile.username,
            is_admin: profile.is_admin || false,
            created_at: profile.created_at,
            avatar_url: profile.avatar_url
          };
          setUser(userData);
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
      {isAdmin && (
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6">AI Personalities</h2>
          <AIPersonalityList />
        </div>
      )}
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