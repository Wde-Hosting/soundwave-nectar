import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Loader2, Search, UserX, Shield, ShieldOff } from "lucide-react";

interface DatabaseProfile {
  id: string;
  username: string | null;
  is_admin: boolean | null;
  created_at: string;
  avatar_url: string | null;
  email?: string | null;
}

interface AuthUser {
  id: string;
  email?: string | null;
}

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();

  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        // First, get all auth users
        const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
        
        if (authError) {
          toast({
            title: "Error fetching users",
            description: authError.message,
            variant: "destructive",
          });
          throw authError;
        }

        // Then get all profiles
        const { data: profiles, error: profilesError } = await supabase
          .from("profiles")
          .select("*")
          .order("created_at", { ascending: false });

        if (profilesError) {
          toast({
            title: "Error fetching profiles",
            description: profilesError.message,
            variant: "destructive",
          });
          throw profilesError;
        }

        // Create missing profiles for users that don't have one
        const existingProfileIds = new Set(profiles?.map(p => p.id) || []);
        const missingProfiles = authUsers?.users?.filter(user => !existingProfileIds.has(user.id)) || [];

        for (const user of missingProfiles) {
          const { error: createError } = await supabase
            .from("profiles")
            .insert({
              id: user.id,
              username: user.email?.split('@')[0] || null,
              is_admin: false
            });

          if (createError) {
            console.error("Error creating profile for user:", user.id, createError);
          }
        }

        // Combine all profiles with auth user data
        const { data: updatedProfiles } = await supabase
          .from("profiles")
          .select("*")
          .order("created_at", { ascending: false });

        const transformedData = (updatedProfiles || []).map((profile) => {
          const authUser = authUsers?.users?.find((user) => user.id === profile.id);
          return {
            ...profile,
            email: authUser?.email || null,
          };
        });

        return transformedData as DatabaseProfile[];
      } catch (error: any) {
        console.error("Error in users query:", error);
        throw error;
      }
    },
  });

  const toggleAdminMutation = useMutation<void, Error, { userId: string; isAdmin: boolean }>({
    mutationFn: async ({ userId, isAdmin }) => {
      try {
        const { error } = await supabase
          .from('profiles')
          .update({ is_admin: isAdmin })
          .eq('id', userId);

        if (error) throw error;
      } catch (error: any) {
        console.error("Error in toggle admin mutation:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        title: "Success",
        description: "User admin status updated successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error updating user",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteUserMutation = useMutation<void, Error, string>({
    mutationFn: async (userId: string) => {
      try {
        const { error } = await supabase
          .from("profiles")
          .delete()
          .eq("id", userId);

        if (error) throw error;
      } catch (error: any) {
        console.error("Error in delete user mutation:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        title: "Success",
        description: "User deleted successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error deleting user",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const filteredUsers = users?.filter(
    (user) =>
      user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>Manage user accounts and permissions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-4">
          <Search className="w-4 h-4 text-gray-500" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers?.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.username || "N/A"}</TableCell>
                    <TableCell>{user.email || "N/A"}</TableCell>
                    <TableCell>{user.is_admin ? "Admin" : "User"}</TableCell>
                    <TableCell>
                      {new Date(user.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            toggleAdminMutation.mutate({
                              userId: user.id,
                              isAdmin: !user.is_admin,
                            })
                          }
                          disabled={toggleAdminMutation.isPending}
                        >
                          {user.is_admin ? (
                            <ShieldOff className="h-4 w-4" />
                          ) : (
                            <Shield className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => deleteUserMutation.mutate(user.id)}
                          disabled={deleteUserMutation.isPending}
                        >
                          <UserX className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserManagement;
