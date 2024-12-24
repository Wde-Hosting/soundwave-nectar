import { Progress } from "@/components/ui/progress";

interface UploadProgressProps {
  progress: number;
}

const UploadProgress = ({ progress }: UploadProgressProps) => {
  return (
    <Progress value={progress} className="w-full" />
  );
};

export default UploadProgress;