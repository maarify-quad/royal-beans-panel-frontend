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
  roles: Role[];
  createdAt: string;
  updatedAt: string;
}

export interface Role {
  id: number;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}
