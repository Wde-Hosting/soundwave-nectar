import { useEffect, useRef } from "react";

interface WaveformVisualizerProps {
  isPlaying: boolean;
  width?: number;
  height?: number;
}

export const WaveformVisualizer = ({ 
  isPlaying,
  width = 320,
  height = 48 
}: WaveformVisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !isPlaying) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      if (!isPlaying) return;
      
      const newData = Array.from({ length: 50 }, () => Math.random() * 0.5 + 0.2);
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 2;
      
      newData.forEach((value, index) => {
        const x = (canvas.width / newData.length) * index;
        const y = (canvas.height / 2) * value;
        
        if (index === 0) {
          ctx.moveTo(x, canvas.height / 2 - y);
        } else {
          ctx.lineTo(x, canvas.height / 2 - y);
        }
      });
      
      ctx.stroke();
      requestAnimationFrame(animate);
    };

    animate();
  }, [isPlaying]);

  return (
    <canvas 
      ref={canvasRef}
      className="w-full h-12 rounded-md bg-background/50"
      width={width}
      height={height}
    />
  );
};