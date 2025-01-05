import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, X } from "lucide-react";
import ChatMessage from "./chat/ChatMessage";
import ChatInput from "./chat/ChatInput";
import { useChatBot } from "@/hooks/useChatBot";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { message, messages, isLoading, setMessage, handleSendMessage } = useChatBot();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      {isOpen && (
        <Card className="fixed bottom-20 right-4 w-80 md:w-96 h-[500px] shadow-xl flex flex-col">
          <div className="p-4 border-b flex justify-between items-center bg-primary text-white rounded-t-lg">
            <h3 className="font-semibold">Soundmaster Assistant</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="hover:bg-primary-dark"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <ScrollArea ref={scrollRef} className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <ChatMessage
                  key={index}
                  content={msg.content}
                  type={msg.type}
                />
              ))}
            </div>
          </ScrollArea>

          <ChatInput
            message={message}
            isLoading={isLoading}
            onMessageChange={setMessage}
            onSendMessage={handleSendMessage}
          />
        </Card>
      )}

      <Button
        onClick={() => setIsOpen(true)}
        className="rounded-full w-12 h-12 p-0 bg-primary hover:bg-primary/90 shadow-lg"
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </>
  );
};

export default ChatBot;