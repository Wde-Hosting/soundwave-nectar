import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Plus, Trash } from "lucide-react";

interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  genre?: string;
  year?: number;
  is_karaoke: boolean;
}

const AdminSongManager = () => {
  const [newSong, setNewSong] = useState({
    title: "",
    artist: "",
    album: "",
    genre: "",
    year: "",
    is_karaoke: true,
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: songs, isLoading } = useQuery({
    queryKey: ["songs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("songs")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Song[];
    },
  });

  const addSongMutation = useMutation({
    mutationFn: async (song: Omit<Song, "id">) => {
      const { data, error } = await supabase.from("songs").insert([song]);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["songs"] });
      toast({
        title: "Success",
        description: "Song added successfully",
      });
      setNewSong({
        title: "",
        artist: "",
        album: "",
        genre: "",
        year: "",
        is_karaoke: true,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add song: " + error.message,
        variant: "destructive",
      });
    },
  });

  const deleteSongMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("songs").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["songs"] });
      toast({
        title: "Success",
        description: "Song deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete song: " + error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addSongMutation.mutate({
      ...newSong,
      year: newSong.year ? parseInt(newSong.year) : undefined,
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Add New Song</CardTitle>
          <CardDescription>Add a new song to the catalog</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newSong.title}
                  onChange={(e) =>
                    setNewSong({ ...newSong, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="artist">Artist</Label>
                <Input
                  id="artist"
                  value={newSong.artist}
                  onChange={(e) =>
                    setNewSong({ ...newSong, artist: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="album">Album</Label>
                <Input
                  id="album"
                  value={newSong.album}
                  onChange={(e) =>
                    setNewSong({ ...newSong, album: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="genre">Genre</Label>
                <Input
                  id="genre"
                  value={newSong.genre}
                  onChange={(e) =>
                    setNewSong({ ...newSong, genre: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  type="number"
                  value={newSong.year}
                  onChange={(e) =>
                    setNewSong({ ...newSong, year: e.target.value })
                  }
                />
              </div>
            </div>
            <Button type="submit" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Song
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Song Catalog</CardTitle>
          <CardDescription>Manage existing songs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {songs?.map((song) => (
              <div
                key={song.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <h3 className="font-semibold">{song.title}</h3>
                  <p className="text-sm text-gray-500">
                    {song.artist} • {song.album} • {song.year}
                  </p>
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => deleteSongMutation.mutate(song.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSongManager;