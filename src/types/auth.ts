export interface User {
  email: string;
  name: string;
  role: 'admin';
}

export interface Session {
  user: User | null;
  isAuthenticated: boolean;
} 