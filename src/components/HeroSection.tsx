import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface HeroSectionProps {
  user: any;
  onSearch: (query: string) => void;
}

const HeroSection = ({ user, onSearch }: HeroSectionProps) => {
  return (
    <div className="relative h-[90vh] bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white">
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1470225620780-dba8ba36b745')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay"
        }}
      />
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {user && (
          <div className="mb-4 text-xl">
            Welcome back, {user.email}!
          </div>
        )}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          Professional Sound Services
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Bringing Quality Sound to Tzaneen & Limpopo Since 2022
        </p>
        <div className="max-w-md mx-auto">
          <div className="flex gap-2">
            <Input
              placeholder="Search for services or songs..."
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              onChange={(e) => onSearch(e.target.value)}
            />
            <Button variant="secondary" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;