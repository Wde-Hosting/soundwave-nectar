import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Music, Calendar, Users } from "lucide-react";
import { useState } from "react";
import { User } from "@/types/user";
import { Link } from "react-router-dom";

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
      icon: <Music className="h-6 w-6" />,
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
      <div 
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
          <div className="mb-4 text-lg md:text-xl animate-fade-in">
            Welcome back, {user.email}!
          </div>
        )}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
          Professional Sound Services
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-8 opacity-90">
          Bringing Quality Sound to Tzaneen & Limpopo Since 2022
        </p>
        
        <div className="max-w-md mx-auto mb-12">
          <div className="flex gap-2">
            <Input
              placeholder="Search for services or songs..."
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-lg aspect-square"
            >
              <img 
                src={feature.image}
                alt={feature.title}
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                  <div className="p-3 rounded-full bg-primary/20 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <Link to="/services">
            <Button size="lg" className="hover:scale-105 transition-transform">
              View Services
            </Button>
          </Link>
          <Link to="/contact">
            <Button size="lg" variant="secondary" className="hover:scale-105 transition-transform">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;