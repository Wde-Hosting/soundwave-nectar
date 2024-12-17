import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Search,
  Music,
  Headphones,
  Calendar,
  Phone,
  Mail,
  ArrowRight,
  MapPin,
  Star,
  Play,
  Instagram,
  Facebook,
  Twitter
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    eventType: "",
    message: "",
  });
  const { toast } = useToast();

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Booking Request Received",
      description: "We'll get back to you within 24 hours!",
    });
    setBookingForm({
      name: "",
      email: "",
      phone: "",
      eventDate: "",
      eventType: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#1A1F2C] text-white">
      {/* Hero Section with Video Background */}
      <div className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        >
          <source src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Professional Sound Services
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Bringing Quality Sound to Tzaneen & Limpopo Since 2022
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Request a Quote <ArrowRight className="ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10">
              Explore Services
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Search Bar */}
      <div className="bg-[#221F26] shadow-lg py-6 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-4xl">
          <div className="flex gap-4">
            <Input
              placeholder="Search for services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow bg-[#2A2533] border-white/10"
            />
            <Button variant="default">
              <Search className="mr-2" /> Search
            </Button>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-20 bg-gradient-to-b from-[#1A1F2C] to-[#221F26]">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="group bg-[#2A2533] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-white/10"
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
                  <p className="text-gray-300 mb-6">{service.description}</p>
                  <Link to={service.link}>
                    <Button 
                      variant="outline" 
                      className="w-full border-white/10 hover:bg-primary hover:text-white transition-colors"
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

      {/* Quick Booking Form */}
      <div className="bg-[#2A2533] py-16 border-y border-white/10">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8">Book Your Event</h2>
          <form onSubmit={handleBookingSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                placeholder="Your Name"
                value={bookingForm.name}
                onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                className="bg-[#1A1F2C] border-white/10"
              />
              <Input
                type="email"
                placeholder="Email Address"
                value={bookingForm.email}
                onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                className="bg-[#1A1F2C] border-white/10"
              />
              <Input
                type="tel"
                placeholder="Phone Number"
                value={bookingForm.phone}
                onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                className="bg-[#1A1F2C] border-white/10"
              />
              <Input
                type="date"
                value={bookingForm.eventDate}
                onChange={(e) => setBookingForm({...bookingForm, eventDate: e.target.value})}
                className="bg-[#1A1F2C] border-white/10"
              />
            </div>
            <Textarea
              placeholder="Tell us about your event..."
              value={bookingForm.message}
              onChange={(e) => setBookingForm({...bookingForm, message: e.target.value})}
              className="bg-[#1A1F2C] border-white/10"
            />
            <Button type="submit" className="w-full md:w-auto">
              Submit Booking Request
            </Button>
          </form>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 bg-[#1A1F2C]">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-12">What Our Clients Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-[#2A2533] p-6 rounded-xl shadow-lg border border-white/10">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-300">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-[#2A2533] py-16 border-t border-white/10">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Phone className="text-primary" />
                  <p>081 543 6748</p>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="text-primary" />
                  <p>soundmaster@gmail.com</p>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="text-primary" />
                  <p>Tzaneen & Limpopo Area</p>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Instagram className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Twitter className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29335.329654779!2d30.1445!3d-23.8333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ec5e75800000000%3A0x3c3c6e200000000!2sTzaneen%2C%20South%20Africa!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
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
    icon: <Calendar className="h-12 w-12" />,
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