export interface Booking {
  id: string;
  event_type: string;
  event_date: string;
  details: string | null;
  status: string | null;
  user_id: string | null;
  created_at: string;
  time: string | null;
}