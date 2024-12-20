interface Track {
  id: string;
  title: string;
  artist: string;
}

interface TrackInfoProps {
  track: Track | undefined;
}

const TrackInfo = ({ track }: TrackInfoProps) => {
  if (!track) return null;

  return (
    <div className="text-center">
      <h3 className="font-semibold">{track.title}</h3>
      <p className="text-sm text-gray-500">{track.artist}</p>
    </div>
  );
};

export default TrackInfo;