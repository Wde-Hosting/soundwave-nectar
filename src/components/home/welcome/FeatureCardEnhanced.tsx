import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface FeatureCardEnhancedProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
  isActive: boolean;
}

const FeatureCardEnhanced = ({ 
  icon: Icon, 
  title, 
  description, 
  onClick,
  isActive 
}: FeatureCardEnhancedProps) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer",
        isActive && "ring-2 ring-primary"
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default FeatureCardEnhanced;