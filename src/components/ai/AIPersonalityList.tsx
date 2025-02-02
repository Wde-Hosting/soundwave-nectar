import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus, Mic, Settings } from "lucide-react";
import AIPersonalityForm from "./AIPersonalityForm";
import { useAdmin } from "@/contexts/AdminContext";
import { toast } from "@/components/ui/use-toast";

interface AIPersonality {
  id: string;
  name: string;
  voice_id: string;
  personality_prompt: string;
  language: string;
  is_active: boolean;
}

const AIPersonalityList = () => {
  const [showForm, setShowForm] = useState(false);
  const { isAdmin } = useAdmin();

  const { data: personalities, isLoading } = useQuery({
    queryKey: ['ai-personalities'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ai_personalities')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        toast({
          title: "Error fetching personalities",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      return data as AIPersonality[];
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {isAdmin && (
        <div className="flex justify-end">
          <Button onClick={() => setShowForm(true)}>
            <Plus className="mr-2" />
            Add AI Personality
          </Button>
        </div>
      )}

      {showForm && (
        <AIPersonalityForm onClose={() => setShowForm(false)} />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {personalities?.map((personality) => (
          <Card key={personality.id} className={!personality.is_active ? "opacity-60" : ""}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">
                {personality.name}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Mic className={personality.is_active ? "text-green-500" : "text-gray-400"} />
                {isAdmin && (
                  <Button variant="ghost" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">
                Language: {personality.language.toUpperCase()}
              </p>
              <p className="text-sm line-clamp-3">
                {personality.personality_prompt}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AIPersonalityList;