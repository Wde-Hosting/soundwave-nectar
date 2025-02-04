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
          "max-w-[80%] p-3 rounded-lg flex items-start gap-2",
          type === 'user'
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-muted-foreground dark:bg-gray-700'
        )}
      >
        {type === 'bot' && (
          <span className="text-xl" role="img" aria-label="lion">
            🦁
          </span>
        )}
        <div className="space-y-1">
          {content.split('\n').map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;