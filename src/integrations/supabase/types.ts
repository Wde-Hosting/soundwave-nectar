export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ai_content_logs: {
        Row: {
          content: string
          content_type: string
          created_at: string
          id: string
          is_flagged: boolean | null
          sentiment_score: number | null
          station_id: string | null
          user_id: string | null
        }
        Insert: {
          content: string
          content_type: string
          created_at?: string
          id?: string
          is_flagged?: boolean | null
          sentiment_score?: number | null
          station_id?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string
          content_type?: string
          created_at?: string
          id?: string
          is_flagged?: boolean | null
          sentiment_score?: number | null
          station_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_content_logs_station_id_fkey"
            columns: ["station_id"]
            isOneToOne: false
            referencedRelation: "radio_stations"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_personalities: {
        Row: {
          created_at: string
          id: string
          is_active: boolean | null
          language: string | null
          name: string
          personality_prompt: string
          user_id: string | null
          voice_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          language?: string | null
          name: string
          personality_prompt: string
          user_id?: string | null
          voice_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          language?: string | null
          name?: string
          personality_prompt?: string
          user_id?: string | null
          voice_id?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          content: string
          created_at: string
          id: string
          image_url: string | null
          title: string
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          image_url?: string | null
          title: string
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          image_url?: string | null
          title?: string
          user_id?: string | null
        }
        Relationships: []
      }
      bookings: {
        Row: {
          created_at: string
          details: string | null
          event_date: string
          event_type: string
          id: string
          status: string | null
          time: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          details?: string | null
          event_date: string
          event_type: string
          id?: string
          status?: string | null
          time?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          details?: string | null
          event_date?: string
          event_type?: string
          id?: string
          status?: string | null
          time?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      broadcast_settings: {
        Row: {
          created_at: string
          current_dj: string | null
          id: string
          news_enabled: boolean | null
          station_name: string
          updated_at: string
          weather_enabled: boolean | null
        }
        Insert: {
          created_at?: string
          current_dj?: string | null
          id?: string
          news_enabled?: boolean | null
          station_name: string
          updated_at?: string
          weather_enabled?: boolean | null
        }
        Update: {
          created_at?: string
          current_dj?: string | null
          id?: string
          news_enabled?: boolean | null
          station_name?: string
          updated_at?: string
          weather_enabled?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "broadcast_settings_current_dj_fkey"
            columns: ["current_dj"]
            isOneToOne: false
            referencedRelation: "ai_personalities"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string
          date: string
          description: string | null
          id: string
          image_url: string | null
          location: string | null
          title: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          date: string
          description?: string | null
          id?: string
          image_url?: string | null
          location?: string | null
          title: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          date?: string
          description?: string | null
          id?: string
          image_url?: string | null
          location?: string | null
          title?: string
          user_id?: string | null
        }
        Relationships: []
      }
      playlists: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          id: string
          is_admin: boolean | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          id: string
          is_admin?: boolean | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          is_admin?: boolean | null
          username?: string | null
        }
        Relationships: []
      }
      radio_shows: {
        Row: {
          created_at: string
          day: number
          description: string | null
          dj: string
          end_time: string
          genre: string | null
          id: string
          is_recurring: boolean | null
          start_time: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          day: number
          description?: string | null
          dj: string
          end_time: string
          genre?: string | null
          id?: string
          is_recurring?: boolean | null
          start_time: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          day?: number
          description?: string | null
          dj?: string
          end_time?: string
          genre?: string | null
          id?: string
          is_recurring?: boolean | null
          start_time?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      radio_stations: {
        Row: {
          created_at: string
          description: string | null
          genre: string | null
          id: string
          is_active: boolean | null
          listeners_count: number | null
          logo_url: string | null
          name: string
          peak_listeners: number | null
          stream_url: string
          total_listening_time: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          genre?: string | null
          id?: string
          is_active?: boolean | null
          listeners_count?: number | null
          logo_url?: string | null
          name: string
          peak_listeners?: number | null
          stream_url: string
          total_listening_time?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          genre?: string | null
          id?: string
          is_active?: boolean | null
          listeners_count?: number | null
          logo_url?: string | null
          name?: string
          peak_listeners?: number | null
          stream_url?: string
          total_listening_time?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      settings: {
        Row: {
          created_at: string
          key: string
          updated_at: string
          value: string | null
        }
        Insert: {
          created_at?: string
          key: string
          updated_at?: string
          value?: string | null
        }
        Update: {
          created_at?: string
          key?: string
          updated_at?: string
          value?: string | null
        }
        Relationships: []
      }
      songs: {
        Row: {
          album: string | null
          artist: string
          created_at: string
          genre: string | null
          id: string
          is_karaoke: boolean | null
          title: string
          url: string | null
          user_id: string | null
          year: number | null
        }
        Insert: {
          album?: string | null
          artist: string
          created_at?: string
          genre?: string | null
          id?: string
          is_karaoke?: boolean | null
          title: string
          url?: string | null
          user_id?: string | null
          year?: number | null
        }
        Update: {
          album?: string | null
          artist?: string
          created_at?: string
          genre?: string | null
          id?: string
          is_karaoke?: boolean | null
          title?: string
          url?: string | null
          user_id?: string | null
          year?: number | null
        }
        Relationships: []
      }
      station_analytics: {
        Row: {
          avg_listening_time: number | null
          id: string
          listeners_count: number | null
          station_id: string
          timestamp: string
          unique_listeners: number | null
        }
        Insert: {
          avg_listening_time?: number | null
          id?: string
          listeners_count?: number | null
          station_id: string
          timestamp?: string
          unique_listeners?: number | null
        }
        Update: {
          avg_listening_time?: number | null
          id?: string
          listeners_count?: number | null
          station_id?: string
          timestamp?: string
          unique_listeners?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "station_analytics_station_id_fkey"
            columns: ["station_id"]
            isOneToOne: false
            referencedRelation: "radio_stations"
            referencedColumns: ["id"]
          },
        ]
      }
      stations: {
        Row: {
          created_at: string
          current_listeners: number | null
          description: string | null
          id: string
          is_live: boolean | null
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          current_listeners?: number | null
          description?: string | null
          id?: string
          is_live?: boolean | null
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          current_listeners?: number | null
          description?: string | null
          id?: string
          is_live?: boolean | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      stream_analytics: {
        Row: {
          created_at: string
          id: string
          listener_count: number | null
          peak_listeners: number | null
          session_id: string
          total_duration: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          listener_count?: number | null
          peak_listeners?: number | null
          session_id: string
          total_duration?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          listener_count?: number | null
          peak_listeners?: number | null
          session_id?: string
          total_duration?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
