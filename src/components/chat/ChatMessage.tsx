import { cn } from "@/lib/utils";

interface ChatMessageProps {
  content: string;
  type: 'user' | 'bot';
}

const ChatMessage = ({ content, type }: ChatMessageProps) => {
  return (
    <div className={cn("flex", type === 'user' ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          "max-w-[80%] p-3 rounded-lg",
          type === 'user'
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-muted-foreground dark:bg-gray-700'
        )}
      >
        {content}
      </div>
    </div>
  );
};

export default ChatMessage;