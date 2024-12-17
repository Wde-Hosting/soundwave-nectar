import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Music, Headphones, User } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[90vh] bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white">
        <div 
          className="absolute inset-0 bg-black/40"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1488590528505-98d2b5aba04b')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "overlay"
          }}
        />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Professional Sound Services
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Bringing Quality Sound to Tzaneen & Limpopo Since 2022
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
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="mb-4 text-primary">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <Link to={service.link}>
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-20 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">A Unique Journey</h2>
              <p className="text-gray-600 mb-6">
                Soundmaster began with a simple idea: playing free music for the Tzaneen community. 
                Despite being a private, non-profit hobby, our mission has expanded to spotlight 
                the region's attractions while delivering exceptional sound services.
              </p>
              <div className="space-y-4">
                {values.map((value) => (
                  <div key={value.title} className="flex items-start gap-3">
                    <div className="text-primary mt-1">
                      {value.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold">{value.title}</h4>
                      <p className="text-gray-600">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
                alt="Team working on sound equipment"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-primary py-16">
        <div className="container text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Ready to Create Your Perfect Sound?</h2>
          <p className="mb-8 text-lg">Contact us today to discuss your event needs</p>
          <Button variant="secondary" size="lg">
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
};

const services = [
  {
    title: "Party Sound Services",
    description: "Tailored playlists for any occasion with broad selection of music genres.",
    icon: <Music className="h-8 w-8" />,
    link: "/services#party"
  },
  {
    title: "Karaoke Sound Services",
    description: "Extensive karaoke track collection with high-quality wireless microphones.",
    icon: <Headphones className="h-8 w-8" />,
    link: "/services#karaoke"
  },
  {
    title: "Wedding Sound Services",
    description: "Complete music solution for ceremonies and receptions.",
    icon: <Music className="h-8 w-8" />,
    link: "/services#wedding"
  },
];

const values = [
  {
    title: "Professional & Reliable",
    description: "Ensuring seamless events with dependable service.",
    icon: <User className="h-6 w-6" />
  },
  {
    title: "Quality Equipment",
    description: "Using top-tier sound systems for unmatched audio clarity.",
    icon: <Headphones className="h-6 w-6" />
  },
  {
    title: "Customer Satisfaction",
    description: "Tailoring every service to meet client needs.",
    icon: <Music className="h-6 w-6" />
  }
];

export default Index;