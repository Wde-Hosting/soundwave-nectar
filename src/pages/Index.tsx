import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Music, Headphones, User, Calendar, Heart, Phone, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen">
      {/* Hero Section with Video Background */}
      <div className="relative h-[90vh] flex items-center justify-center text-white overflow-hidden">
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.6)" }}
        >
          <source src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Professional Sound Services
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Bringing Quality Sound to Tzaneen & Limpopo Since 2022
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Request a Quote <ArrowRight className="ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20">
              Explore Services
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Search Bar */}
      <div className="bg-white shadow-lg py-6 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex gap-4">
            <Input
              placeholder="Search for services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow"
            />
            <Button variant="default">
              <Search className="mr-2" /> Search
            </Button>
          </div>
        </div>
      </div>

      {/* Services Section with Enhanced Cards */}
      <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="text-white text-4xl">{service.icon}</div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <Link to={service.link}>
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Contact Section */}
      <div className="bg-primary text-white py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Create Your Perfect Sound?</h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              variant="secondary" 
              size="lg"
              className="flex items-center gap-2"
            >
              <Phone className="h-5 w-5" /> Call Us Now
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary flex items-center gap-2"
            >
              <Mail className="h-5 w-5" /> Send Message
            </Button>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 bg-gray-50">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-12">What Our Clients Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.location}</p>
                  </div>
                </div>
                <p className="text-gray-600">{testimonial.text}</p>
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
    description: "Professional sound setup with tailored playlists for any occasion. Perfect for birthdays, corporate events, and celebrations.",
    icon: <Music className="h-12 w-12" />,
    link: "/services#party",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
  },
  {
    title: "Karaoke Sound Services",
    description: "High-quality karaoke system with extensive song collection and professional microphones for an unforgettable experience.",
    icon: <Headphones className="h-12 w-12" />,
    link: "/services#karaoke",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81"
  },
  {
    title: "Wedding Sound Services",
    description: "Complete wedding sound solution from ceremony to reception. Creating the perfect atmosphere for your special day.",
    icon: <Music className="h-12 w-12" />,
    link: "/services#wedding",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552"
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "Tzaneen",
    text: "Soundmaster made our wedding day perfect! The sound quality was exceptional and the music selection was exactly what we wanted.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
  },
  {
    name: "Michael Smith",
    location: "Limpopo",
    text: "Best karaoke night ever! Professional equipment and great service. Will definitely use their services again.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
  },
  {
    name: "Emily Davis",
    location: "Polokwane",
    text: "Outstanding service for our corporate event. The team was professional and the sound quality was perfect.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
  }
];

export default Index;