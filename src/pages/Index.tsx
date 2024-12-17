import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[90vh] bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Professional Sound Services
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Bringing Quality Sound to Tzaneen & Limpopo
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex gap-2">
              <Input
                placeholder="Search for services..."
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <Button variant="secondary" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-20 bg-gray-50">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const services = [
  {
    title: "Party Sound Services",
    description: "Tailored playlists for any occasion with broad selection of music genres.",
  },
  {
    title: "Karaoke Sound Services",
    description: "Extensive karaoke track collection with high-quality wireless microphones.",
  },
  {
    title: "Wedding Sound Services",
    description: "Complete music solution for ceremonies and receptions.",
  },
];

export default Index;