import { Star } from "lucide-react";

interface ProfileImageProps {
  imageUrl: string;
  onClick: () => void;
}

const ProfileImage = ({ imageUrl, onClick }: ProfileImageProps) => {
  return (
    <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300">
      <div className="aspect-w-4 aspect-h-5">
        <img
          src={imageUrl}
          alt="Professional sound equipment"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div 
            className="flex items-center gap-4 mb-4 cursor-pointer transform hover:scale-105 transition-transform"
            onClick={onClick}
          >
            <img
              src="/lovable-uploads/fb8dd939-8a3d-444e-ac29-8f9d0e54268d.png"
              alt="Professional Sound Equipment"
              className="w-16 h-16 rounded-full object-cover border-2 border-white"
            />
            <div>
              <h3 className="text-2xl font-bold">Professional Equipment</h3>
              <p className="text-gray-200">Top-tier sound systems</p>
            </div>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="h-5 w-5 fill-current text-yellow-400" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileImage;