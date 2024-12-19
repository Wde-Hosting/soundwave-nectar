import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music } from "lucide-react";

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
  const { data: songs, isLoading } = useQuery({
    queryKey: ['songs', searchQuery],
    queryFn: async () => {
      let query = supabase
        .from('songs')
        .select('*')
        .eq('is_karaoke', true);
      
      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,artist.ilike.%${searchQuery}%`);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as Song[];
    },
  });

  if (isLoading) return <div>Loading songs...</div>;

  return (
    <div className="py-12 bg-gray-50">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8">Available Karaoke Songs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {songs?.map((song) => (
            <Card key={song.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4">
                <Music className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle className="text-lg">{song.title}</CardTitle>
                  <p className="text-sm text-gray-500">{song.artist}</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600">
                  <p>Album: {song.album || 'N/A'}</p>
                  <p>Genre: {song.genre || 'N/A'}</p>
                  <p>Year: {song.year || 'N/A'}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SongList;