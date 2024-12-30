export interface User {
  id: string;
  email?: string | undefined;  // Made optional with ?
  user_metadata?: {
    avatar_url?: string;
    is_admin?: boolean;
  };
}