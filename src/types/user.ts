export interface User {
  id: string;
  email: string | undefined;
  user_metadata?: {
    avatar_url?: string;
    is_admin?: boolean;
  };
}