import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SongSearchProps {
  value: string;
  onChange: (value: string) => void;
}

const SongSearch = ({ value, onChange }: SongSearchProps) => {
  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <Input
        placeholder="Search by title, artist, or genre..."
        className="pl-10"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SongSearch;