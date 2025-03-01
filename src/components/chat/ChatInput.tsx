
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Loader2, Music } from "lucide-react";

interface ChatInputProps {
  message: string;
  isLoading: boolean;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
}

const ChatInput = ({ message, isLoading, onMessageChange, onSendMessage }: ChatInputProps) => {
  return (
    <div className="p-4 border-t dark:border-gray-700 backdrop-blur-sm bg-background/80">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !isLoading && onSendMessage()}
            placeholder="Ask about music, shows, or bookings..."
            disabled={isLoading}
            className="pr-10 dark:bg-gray-700/50 border border-white/10"
          />
          <Music className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
        </div>
        <Button
          onClick={onSendMessage}
          disabled={isLoading}
          className="px-3 bg-gradient-radio hover:opacity-90 transition-opacity"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
