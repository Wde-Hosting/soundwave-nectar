import { Button } from "@/components/ui/button";
import { ArrowRight, Music, Star, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const WelcomeSection = () => {
  return (
    <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold leading-tight">
              Welcome to <span className="text-primary">Soundmaster</span>
            </h2>
            <p className="text-xl text-gray-600">
              Join John Morden in creating unforgettable musical experiences in Tzaneen & Limpopo
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Music className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Professional Equipment</h3>
                  <p className="text-gray-600">State-of-the-art sound systems for crystal clear audio</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Expert Service</h3>
                  <p className="text-gray-600">Dedicated team ensuring your event's success</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Flexible Booking</h3>
                  <p className="text-gray-600">Easy scheduling for any type of event</p>
                </div>
              </div>
            </div>
            <div className="pt-4">
              <Link to="/contact">
                <Button className="group">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-10 rounded-lg overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300">
              <img
                src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745"
                alt="Professional sound equipment"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Experience Excellence</h3>
                  <p className="text-gray-200">Bringing your events to life with premium sound</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-primary/10 rounded-full -z-10 blur-2xl"></div>
            <div className="absolute -top-4 -left-4 w-72 h-72 bg-accent/10 rounded-full -z-10 blur-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;