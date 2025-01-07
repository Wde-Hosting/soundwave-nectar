import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import AdminSongManager from "@/components/AdminSongManager";
import UserManagement from "@/components/admin/UserManagement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Music, Users, Calendar, Image, Settings } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import LiveLessonSettings from "@/components/admin/LiveLessonSettings";

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
          return;
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <AdminHeader />

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

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <UserManagement />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <LiveLessonSettings initialUrl={iframeUrl} />
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