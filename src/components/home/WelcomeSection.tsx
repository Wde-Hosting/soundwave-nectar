import { Button } from "@/components/ui/button";
import { ArrowRight, Music, Star, UserRound, Handshake } from "lucide-react";
import { Link } from "react-router-dom";

const WelcomeSection = () => {
  return (
    <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <UserRound className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-4xl font-bold leading-tight">
                Meet <span className="text-primary">John Morden</span>
              </h2>
            </div>
            <p className="text-xl text-gray-600">
              With over a decade of experience in sound engineering, John brings professional audio excellence to every event in Tzaneen & Limpopo
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Music className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Sound Expert</h3>
                    <p className="text-gray-600">Professional audio engineering</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">5-Star Service</h3>
                    <p className="text-gray-600">Consistently rated excellent</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Handshake className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Client Focus</h3>
                    <p className="text-gray-600">Personalized event solutions</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-8">
              <Link to="/contact">
                <Button className="group">
                  Book a Consultation
                  <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300">
              <div className="aspect-w-4 aspect-h-5">
                <img
                  src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745"
                  alt="John Morden at work"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1511379938547-c1f69419868d"
                      alt="Professional Sound Equipment"
                      className="w-16 h-16 rounded-full object-cover border-2 border-white"
                    />
                    <div>
                      <h3 className="text-2xl font-bold">Professional Equipment</h3>
                      <p className="text-gray-200">Top-tier sound systems</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 fill-current text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-primary/10 rounded-full -z-10 blur-2xl"></div>
            <div className="absolute -top-4 -left-4 w-72 h-72 bg-accent/10 rounded-full -z-10 blur-2xl"></div>
            
            {/* Floating achievement cards */}
            <div className="absolute -right-8 top-1/4 bg-white p-4 rounded-xl shadow-lg transform rotate-3 animate-float">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-full">
                  <Star className="h-4 w-4 text-yellow-600" />
                </div>
                <p className="font-semibold text-sm">500+ Events</p>
              </div>
            </div>
            <div className="absolute -left-8 bottom-1/4 bg-white p-4 rounded-xl shadow-lg transform -rotate-3 animate-float delay-150">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Music className="h-4 w-4 text-blue-600" />
                </div>
                <p className="font-semibold text-sm">Pro Equipment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;