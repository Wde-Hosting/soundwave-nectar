import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Music, Calendar, Users, Radio, Headphones } from "lucide-react";
import { useState } from "react";
import { User } from "@/types/user";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface HeroSectionProps {
  user: User | null;
  onSearch: (query: string) => void;
}

const HeroSection = ({ user, onSearch }: HeroSectionProps) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    onSearch(searchValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const features = [
    {
      icon: <Radio className="h-6 w-6" />,
      title: "Professional Sound",
      description: "High-quality audio equipment",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745"
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Event Planning",
      description: "Comprehensive event support",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Expert Team",
      description: "Experienced professionals",
      image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81"
    }
  ];

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center text-white">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1470225620780-dba8ba36b745')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "multiply",
          backgroundAttachment: "fixed"
        }}
      />
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {user && (
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-4 text-lg md:text-xl animate-fade-in glass-panel rounded-lg py-2 px-4 inline-block"
          >
            Welcome back, {user.email}!
          </motion.div>
        )}
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in text-gradient"
        >
          Soundwave Nectar Radio
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-lg md:text-xl lg:text-2xl mb-8 opacity-90"
        >
          Experience the Future of Digital Sound
        </motion.p>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="max-w-md mx-auto mb-12"
        >
          <div className="flex gap-2">
            <Input
              placeholder="Search for your favorite tracks..."
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button 
              variant="secondary" 
              size="icon"
              onClick={handleSearch}
              className="hover:scale-105 transition-transform"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + index * 0.2 }}
              className="group relative overflow-hidden rounded-lg aspect-square glass-panel hover:scale-105 transition-transform duration-300"
            >
              <img 
                src={feature.image}
                alt={feature.title}
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                  <div className="p-3 rounded-full bg-primary/20 mb-4 animate-float">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="flex justify-center gap-4"
        >
          <Link to="/live-radio">
            <Button size="lg" className="hover:scale-105 transition-transform">
              <Headphones className="mr-2 h-4 w-4" />
              Listen Now
            </Button>
          </Link>
          <Link to="/schedule">
            <Button size="lg" variant="secondary" className="hover:scale-105 transition-transform">
              <Calendar className="mr-2 h-4 w-4" />
              View Schedule
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;