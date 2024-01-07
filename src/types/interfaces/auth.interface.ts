import { User, UserCredential } from 'firebase/auth';

export interface UserContextType {
  createUser: (email: string, password: string) => Promise<UserCredential>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  user: User | null;
}

export interface Inputs {
  email: string;
  password: string;
}
