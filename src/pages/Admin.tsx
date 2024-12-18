import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, implement proper authentication
    setIsLoggedIn(true);
    toast({
      title: "Login Successful",
      description: "Welcome to the admin dashboard",
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block mb-2">Email</label>
                  <Input id="email" type="email" required />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2">Password</label>
                  <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full">Login</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">No recent bookings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">No new messages</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">No data available</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Button onClick={() => setIsLoggedIn(false)} variant="outline">
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Admin;