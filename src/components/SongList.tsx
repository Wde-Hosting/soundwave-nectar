import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Music, Search } from "lucide-react";
import { useState } from "react";

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  year: number;
  is_karaoke: boolean;
}

interface SongListProps {
  searchQuery: string;
}

const SongList = ({ searchQuery }: SongListProps) => {
  const [localSearch, setLocalSearch] = useState("");
  const finalSearchQuery = searchQuery || localSearch;

  const { data: songs, isLoading } = useQuery({
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
      return data as Song[];
    },
  });

  if (isLoading) {
    return (
      <div className="py-12 bg-gray-50">
        <div className="container">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gray-50">
      <div className="container">
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Available Karaoke Songs</h2>
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search by title, artist, or genre..."
              className="pl-10"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {songs?.map((song) => (
            <Card key={song.id} className="hover:shadow-lg transition-shadow group">
              <CardHeader className="relative">
                <div className="absolute -left-2 top-4 bg-primary text-white px-4 py-1 text-sm rounded-r shadow">
                  {song.genre || 'Various'}
                </div>
                <div className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full group-hover:bg-primary/20 transition-colors">
                    <Music className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg line-clamp-1">{song.title}</CardTitle>
                    <p className="text-sm text-gray-500 line-clamp-1">{song.artist}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600 space-y-1">
                  {song.album && <p>Album: {song.album}</p>}
                  {song.year && <p>Year: {song.year}</p>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {songs?.length === 0 && (
          <div className="text-center py-12">
            <Music className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No songs found</h3>
            <p className="text-gray-500">
              Try adjusting your search or check back later for new additions
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SongList;