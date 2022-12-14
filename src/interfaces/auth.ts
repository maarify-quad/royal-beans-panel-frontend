export interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  user: User | null;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
