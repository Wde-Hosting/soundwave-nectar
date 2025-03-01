
import { cn } from "@/lib/utils";
import { Music, User, Bot, Radio } from "lucide-react";

interface ChatMessageProps {
  content: string;
  type: 'user' | 'bot';
}

const ChatMessage = ({ content, type }: ChatMessageProps) => {
  // Check if content contains music-related information
  const hasMusicInfo = content.includes("song") || 
                       content.includes("artist") || 
                       content.includes("track") ||
                       content.includes("music");
  
  // Check if content contains a list (for recommendations)
  const hasList = content.includes("\n- ");

  return (
    <div className={cn("flex", type === 'user' ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          "max-w-[80%] p-3 rounded-lg flex items-start gap-2",
          type === 'user'
            ? 'bg-primary text-primary-foreground'
            : 'backdrop-blur-sm bg-black/40 border border-white/10 text-white dark:bg-gray-700'
        )}
      >
        {type === 'bot' && (
          <span className="text-xl p-1.5 bg-primary/20 rounded-full" role="img" aria-label="radio dj">
            {hasMusicInfo ? <Music className="h-4 w-4 text-primary" /> : <Radio className="h-4 w-4 text-primary" />}
          </span>
        )}
        {type === 'user' && (
          <span className="text-xl hidden" role="img" aria-label="user">
            <User className="h-4 w-4" />
          </span>
        )}
        <div className="space-y-1">
          {hasList ? (
            <div className="space-y-2">
              {content.split('\n').map((line, i) => (
                <p key={i} className={line.startsWith('- ') ? 'pl-2 border-l-2 border-primary/50' : ''}>
                  {line}
                </p>
              ))}
            </div>
          ) : (
            content.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
