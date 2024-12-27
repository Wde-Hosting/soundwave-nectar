import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Music } from "lucide-react";
import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import SongCard from "./songs/SongCard";
import SongSearch from "./songs/SongSearch";
import EmptySongList from "./songs/EmptySongList";

interface SongListProps {
  searchQuery: string;
}

const SongList = ({ searchQuery }: SongListProps) => {
  const [localSearch, setLocalSearch] = useState("");
  const finalSearchQuery = searchQuery || localSearch;

  const { data: songs, isLoading, error } = useQuery({
    queryKey: ['songs', finalSearchQuery],
    queryFn: async () => {
      let query = supabase
        .from('songs')
        .select('*')
        .eq('is_karaoke', true);
      
      if (finalSearchQuery) {
        query = query.or(`title.ilike.%${finalSearchQuery}%,artist.ilike.%${finalSearchQuery}%,genre.ilike.%${finalSearchQuery}%`);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  if (error) {
    return (
      <div className="py-12 bg-gray-50">
        <div className="container text-center">
          <Music className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Error loading songs</h3>
          <p className="text-gray-600">{(error as Error).message}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="py-12 bg-gray-50">
        <div className="container">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gray-50">
      <div className="container">
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Available Karaoke Songs</h2>
          <SongSearch value={localSearch} onChange={setLocalSearch} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {songs?.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>

        {songs?.length === 0 && <EmptySongList />}
      </div>
    </div>
  );
};

export default SongList;