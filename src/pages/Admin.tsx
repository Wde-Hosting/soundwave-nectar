import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import AdminSongManager from "@/components/AdminSongManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user || !user.user_metadata.is_admin) {
        toast({
          title: "Access Denied",
          description: "You must be an admin to view this page",
          variant: "destructive",
        });
        navigate("/");
      }
    };

    checkAdmin();
  }, [navigate, toast]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <Tabs defaultValue="songs">
        <TabsList>
          <TabsTrigger value="songs">Songs</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        <TabsContent value="songs" className="mt-6">
          <AdminSongManager />
        </TabsContent>
        <TabsContent value="bookings">
          <div className="text-center py-12 text-gray-500">
            Booking management coming soon
          </div>
        </TabsContent>
        <TabsContent value="users">
          <div className="text-center py-12 text-gray-500">
            User management coming soon
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;