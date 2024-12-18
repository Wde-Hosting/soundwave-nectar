import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music, Mic, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Services = () => {
  const { toast } = useToast();

  const handleBooking = (service: string) => {
    toast({
      title: "Booking Request Sent",
      description: `Thank you for your interest in our ${service} service. We'll contact you soon!`,
    });
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Our Services</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        <Card className="bg-card hover:shadow-lg transition-shadow">
          <CardHeader>
            <Music className="w-12 h-12 text-primary mb-4" />
            <CardTitle>Party Sound</CardTitle>
            <CardDescription>Professional sound services for any party or event</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 mb-6">
              <li>✓ High-quality sound systems</li>
              <li>✓ Custom playlists</li>
              <li>✓ Professional DJ services</li>
              <li>✓ Lighting equipment</li>
            </ul>
            <Button onClick={() => handleBooking("Party Sound")} className="w-full">
              Book Now
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card hover:shadow-lg transition-shadow">
          <CardHeader>
            <Mic className="w-12 h-12 text-primary mb-4" />
            <CardTitle>Karaoke Sound</CardTitle>
            <CardDescription>Complete karaoke setup for entertaining events</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 mb-6">
              <li>✓ Extensive song library</li>
              <li>✓ Professional microphones</li>
              <li>✓ HD displays</li>
              <li>✓ Sound mixing</li>
            </ul>
            <Button onClick={() => handleBooking("Karaoke Sound")} className="w-full">
              Book Now
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card hover:shadow-lg transition-shadow">
          <CardHeader>
            <Heart className="w-12 h-12 text-primary mb-4" />
            <CardTitle>Wedding Sound</CardTitle>
            <CardDescription>Make your special day perfect with our sound services</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 mb-6">
              <li>✓ Ceremony & reception setup</li>
              <li>✓ Wireless microphones</li>
              <li>✓ Custom wedding playlists</li>
              <li>✓ Backup equipment</li>
            </ul>
            <Button onClick={() => handleBooking("Wedding Sound")} className="w-full">
              Book Now
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Services;