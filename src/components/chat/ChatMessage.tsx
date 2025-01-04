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
            ? 'bg-primary text-white'
            : 'bg-gray-100 text-gray-900'
        )}
      >
        {content}
      </div>
    </div>
  );
};

export default ChatMessage;