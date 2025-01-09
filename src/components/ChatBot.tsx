import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, X, Loader2, Send } from "lucide-react";
import ChatMessage from "./chat/ChatMessage";
import ChatInput from "./chat/ChatInput";
import { useChatBot } from "@/hooks/useChatBot";
import { cn } from "@/lib/utils";
import { useAdmin } from "@/contexts/AdminContext";

const QUICK_ACTIONS = [
  { label: "Book an Event", query: "I'd like to book an event" },
  { label: "Request a Song", query: "Can I request a song?" },
  { label: "Services & Pricing", query: "What are your services and pricing?" },
  { label: "Live Lessons", query: "Tell me about live lessons" },
];

const ADMIN_ACTIONS = [
  { label: "View Stats", query: "/admin stats" },
  { label: "User List", query: "/admin users" },
  { label: "Settings", query: "/admin settings" },
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAdmin } = useAdmin();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { message, messages, isLoading, setMessage, handleSendMessage } = useChatBot();
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleQuickAction = (query: string) => {
    setMessage(query);
    handleSendMessage();
  };

  return (
    <>
      {isOpen && (
        <Card 
          className={cn(
            "fixed bottom-20 right-4 w-80 md:w-96 shadow-xl flex flex-col dark:bg-gray-800 transition-all duration-300",
            isMinimized ? "h-[60px]" : "h-[500px]"
          )}
        >
          <div className="p-4 border-b flex justify-between items-center bg-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <h3 className="font-semibold">Soundmaster Assistant</h3>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMinimized(!isMinimized)}
                className="hover:bg-primary-dark"
              >
                {isMinimized ? "+" : "-"}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="hover:bg-primary-dark"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <ScrollArea ref={scrollRef} className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.length === 0 && (
                    <div className="text-center text-muted-foreground p-4">
                      <p>👋 Hi! I'm your Soundmaster assistant.</p>
                      <p className="mt-2">How can I help you today?</p>
                    </div>
                  )}
                  {messages.map((msg, index) => (
                    <ChatMessage
                      key={index}
                      content={msg.content}
                      type={msg.type}
                    />
                  ))}
                  {isLoading && (
                    <div className="flex justify-center">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  )}
                </div>
              </ScrollArea>

              <div className="p-4 border-t dark:border-gray-700">
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {QUICK_ACTIONS.map((action) => (
                    <Button
                      key={action.label}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction(action.query)}
                      className="text-sm"
                    >
                      {action.label}
                    </Button>
                  ))}
                  {isAdmin && ADMIN_ACTIONS.map((action) => (
                    <Button
                      key={action.label}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction(action.query)}
                      className="text-sm bg-primary/10"
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
                <ChatInput
                  message={message}
                  isLoading={isLoading}
                  onMessageChange={setMessage}
                  onSendMessage={handleSendMessage}
                />
              </div>
            </>
          )}
        </Card>
      )}

      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 rounded-full w-12 h-12 p-0 bg-primary hover:bg-primary/90 shadow-lg animate-bounce"
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </>
  );
};

export default ChatBot;