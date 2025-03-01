
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  image_url?: string | null;
  created_at: string;
  user_id?: string | null;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string | null;
  genre?: string | null;
  year?: number | null;
  is_karaoke: boolean;
  created_at: string;
  user_id?: string | null;
}

export interface Event {
  id: string;
  title: string;
  description?: string | null;
  date: string;
  location?: string | null;
  image_url?: string | null;
  created_at: string;
  user_id?: string | null;
}

export interface Profile {
  id: string;
  username?: string | null;
  avatar_url?: string | null;
  is_admin?: boolean | null;
  created_at: string;
}

export interface Setting {
  key: string;
  value?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  event_type: string;
  event_date: string;
  time?: string | null;
  details?: string | null;
  status?: string | null;
  user_id?: string | null;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      blog_posts: {
        Row: BlogPost;
        Insert: Omit<BlogPost, 'id' | 'created_at'>;
        Update: Partial<Omit<BlogPost, 'id'>>;
      };
      songs: {
        Row: Song;
        Insert: Omit<Song, 'id' | 'created_at'>;
        Update: Partial<Omit<Song, 'id'>>;
      };
      events: {
        Row: Event;
        Insert: Omit<Event, 'id' | 'created_at'>;
        Update: Partial<Omit<Event, 'id'>>;
      };
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'created_at'>;
        Update: Partial<Profile>;
      };
      settings: {
        Row: Setting;
        Insert: Omit<Setting, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Setting, 'created_at' | 'updated_at'>>;
      };
      bookings: {
        Row: Booking;
        Insert: Omit<Booking, 'id' | 'created_at'>;
        Update: Partial<Omit<Booking, 'id'>>;
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
