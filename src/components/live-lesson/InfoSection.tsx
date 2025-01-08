interface InfoSectionProps {
  isPlaying: boolean;
}

const InfoSection = ({ isPlaying }: InfoSectionProps) => {
  return (
    <div className="mt-6 bg-card rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">About This Lesson</h2>
      <p className="text-muted-foreground">
        Welcome to the live lesson! Here you can listen to real-time
        music sessions, learn new techniques, and interact with the instructor.
        {!isPlaying && (
          <span className="block mt-2 text-primary">
            Press play to start listening to the live stream.
          </span>
        )}
      </p>
    </div>
  );
};

export default InfoSection;