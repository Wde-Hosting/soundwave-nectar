import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { User } from "@/types/user";

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

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center text-white">
      <div 
        className="absolute inset-0 bg-black/40"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1470225620780-dba8ba36b745')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "multiply"
        }}
      />
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
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
        <div className="max-w-md mx-auto">
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
      </div>
    </div>
  );
};

export default HeroSection;