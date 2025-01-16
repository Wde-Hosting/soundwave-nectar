import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Trash } from "lucide-react";

interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  genre?: string;
  year?: number;
  is_karaoke: boolean;
}

const SongList = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: songs, isLoading, error } = useQuery({
    queryKey: ["songs"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("songs")
          .select("*")
          .eq('is_karaoke', true)
          .order("created_at", { ascending: false });

        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }

        if (!data) {
          throw new Error('No data returned from Supabase');
        }

        return data as Song[];
      } catch (err) {
        console.error('Query error:', err);
        throw err;
      }
    },
    retry: 3,
    retryDelay: 1000,
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
      console.error('Delete error:', error);
      toast({
        title: "Error",
        description: "Failed to delete song: " + error.message,
        variant: "destructive",
      });
    },
  });

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <p className="text-red-500 mb-2">Error loading songs</p>
          <p className="text-sm text-gray-600">{(error as Error).message}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
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
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => deleteSongMutation.mutate(song.id)}
            disabled={deleteSongMutation.isPending}
          >
            <Trash className="h-4 w-4" />
          </button>
        </div>
      ))}
      {songs?.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No songs found
        </div>
      )}
    </div>
  );
};

export default SongList;