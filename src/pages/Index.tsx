import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Music, Headphones, User, Calendar, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import MusicPlayer from "@/components/MusicPlayer";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
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
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
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

      {/* Services Section with Images */}
      <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="text-white">{service.icon}</div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <Link to={service.link}>
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section with Image */}
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
                  <div key={value.title} className="flex items-start gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors">
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
                src="https://images.unsplash.com/photo-1516280440614-37939bbacd81"
                alt="Professional sound equipment"
                className="rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary rounded-full opacity-10"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact CTA with Background */}
      <div className="relative py-16">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1511379938547-c1f69419868d')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "overlay"
          }}
        />
        <div className="absolute inset-0 bg-primary/80"></div>
        <div className="container relative z-10 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Ready to Create Your Perfect Sound?</h2>
          <p className="mb-8 text-lg">Contact us today to discuss your event needs</p>
          <Button 
            variant="secondary" 
            size="lg"
            className="hover:scale-105 transition-transform"
          >
            Contact Us
          </Button>
        </div>
      </div>
      <MusicPlayer />
    </div>
  );
};

const services = [
  {
    title: "Party Sound Services",
    description: "Tailored playlists for any occasion with broad selection of music genres.",
    icon: <Music className="h-12 w-12" />,
    link: "/services#party",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
  },
  {
    title: "Karaoke Sound Services",
    description: "Extensive karaoke track collection with high-quality wireless microphones.",
    icon: <Headphones className="h-12 w-12" />,
    link: "/services#karaoke",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81"
  },
  {
    title: "Wedding Sound Services",
    description: "Complete music solution for ceremonies and receptions.",
    icon: <Music className="h-12 w-12" />,
    link: "/services#wedding",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552"
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
    icon: <Heart className="h-6 w-6" />
  }
];

export default Index;
