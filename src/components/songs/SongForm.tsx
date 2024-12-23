import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SongFormData {
  title: string;
  artist: string;
  album: string;
  genre: string;
  year: string;
  is_karaoke: boolean;
}

const initialFormState = {
  title: "",
  artist: "",
  album: "",
  genre: "",
  year: "",
  is_karaoke: true,
};

const SongForm = () => {
  const [newSong, setNewSong] = useState<SongFormData>(initialFormState);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const addSongMutation = useMutation({
    mutationFn: async (song: Omit<SongFormData, "id">) => {
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
      setNewSong(initialFormState);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add song: " + error.message,
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={newSong.title}
            onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="artist">Artist</Label>
          <Input
            id="artist"
            value={newSong.artist}
            onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="album">Album</Label>
          <Input
            id="album"
            value={newSong.album}
            onChange={(e) => setNewSong({ ...newSong, album: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="genre">Genre</Label>
          <Input
            id="genre"
            value={newSong.genre}
            onChange={(e) => setNewSong({ ...newSong, genre: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="year">Year</Label>
          <Input
            id="year"
            type="number"
            value={newSong.year}
            onChange={(e) => setNewSong({ ...newSong, year: e.target.value })}
          />
        </div>
      </div>
      <Button type="submit" className="w-full">
        <Plus className="mr-2 h-4 w-4" />
        Add Song
      </Button>
    </form>
  );
};

export default SongForm;