import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import AdminSongManager from "@/components/AdminSongManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Music, Users, Calendar, Image, Settings } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [iframeUrl, setIframeUrl] = useState("");

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        setIsLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          toast({
            title: "Access Denied",
            description: "Please log in to access the admin panel",
            variant: "destructive",
          });
          navigate("/auth");
          return;
        }

        const { data: profile } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', user.id)
          .single();

        if (!profile?.is_admin) {
          toast({
            title: "Access Denied",
            description: "You must be an admin to view this page",
            variant: "destructive",
          });
          navigate("/");
        }

        // Fetch current iframe URL
        const { data: settings } = await supabase
          .from('settings')
          .select('value')
          .eq('key', 'live_lesson_url')
          .single();
        
        if (settings?.value) {
          setIframeUrl(settings.value);
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    checkAdmin();
  }, [navigate, toast]);

  const handleIframeUpdate = async () => {
    try {
      const settingsData: Tables<'settings'> = {
        key: 'live_lesson_url',
        value: iframeUrl,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('settings')
        .upsert(settingsData);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Live lesson URL updated successfully",
      });
    } catch (error) {
      console.error('Error updating iframe URL:', error);
      toast({
        title: "Error",
        description: "Failed to update live lesson URL",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl">Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Welcome to your admin dashboard. Here you can manage your website's content,
            users, and settings.
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="content" className="space-y-4">
        <TabsList className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <TabsTrigger value="content" className="flex items-center gap-2">
            <Music className="h-4 w-4" />
            Content
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Events
          </TabsTrigger>
          <TabsTrigger value="media" className="flex items-center gap-2">
            <Image className="h-4 w-4" />
            Media
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Content Management</CardTitle>
            </CardHeader>
            <CardContent>
              <AdminSongManager />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Website Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="iframe-url">Live Lesson iFrame URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="iframe-url"
                    value={iframeUrl}
                    onChange={(e) => setIframeUrl(e.target.value)}
                    placeholder="Enter your streaming URL"
                  />
                  <Button onClick={handleIframeUpdate}>Save</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">User management features coming soon.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle>Event Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Event management features coming soon.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media">
          <Card>
            <CardHeader>
              <CardTitle>Media Library</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Media management features coming soon.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;