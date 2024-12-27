import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { toast } from "@/components/ui/use-toast";

const CalendarSection = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const { data: bookings, isLoading } = useQuery({
    queryKey: ['bookings', date],
    queryFn: async () => {
      if (!date) return [];
      
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('event_date', format(date, 'yyyy-MM-dd'));
      
      if (error) throw error;
      return data;
    },
  });

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    if (newDate) {
      toast({
        title: "Date Selected",
        description: `Selected date: ${format(newDate, 'MMMM do, yyyy')}`,
      });
    }
  };

  return (
    <div className="py-20 bg-white">
      <div className="container">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Book Your Event</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                className="rounded-md border"
              />
            </div>
            <div className="flex-1 space-y-4">
              <h3 className="text-lg font-semibold">Available Time Slots</h3>
              {isLoading ? (
                <p>Loading available slots...</p>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {["10:00 AM", "2:00 PM", "4:00 PM", "6:00 PM"].map((time) => (
                    <Button
                      key={time}
                      variant="outline"
                      className="w-full"
                      disabled={bookings?.some(b => b.time === time)}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalendarSection;