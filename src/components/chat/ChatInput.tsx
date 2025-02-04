import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Loader2 } from "lucide-react";

interface ChatInputProps {
  message: string;
  isLoading: boolean;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
}

const ChatInput = ({ message, isLoading, onMessageChange, onSendMessage }: ChatInputProps) => {
  return (
    <div className="p-4 border-t dark:border-gray-700">
      <div className="flex gap-2">
        <Input
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && !isLoading && onSendMessage()}
          placeholder="Ask the Lion DJ anything..."
          disabled={isLoading}
          className="dark:bg-gray-700"
        />
        <Button
          onClick={onSendMessage}
          disabled={isLoading}
          className="px-3"
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