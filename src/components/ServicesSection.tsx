import { Button } from "@/components/ui/button";
import { Music, Headphones } from "lucide-react";
import { Link } from "react-router-dom";

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

const ServicesSection = () => {
  return (
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
  );
};

export default ServicesSection;