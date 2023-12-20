import { createContext, useEffect, useState } from 'react';
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../services/firebaseSettings';
import { UserContextType } from '@type/interfaces/auth.interface';
import { Props } from '@type/interfaces/props.interface';
// import { User } from '@firebase/auth';

// interface UserContextType {
//   createUser: (email: string, password: string) => Promise<UserCredential>;
//   signIn: (email: string, password: string) => Promise<UserCredential>;
//   logout: () => Promise<void>;
//   user: User | null;
// }

// type Props = {
//   children: React.ReactNode;
// };

const UserContext = createContext<UserContextType | null>(null);

const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  const createUser = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    console.log('Use Effect with current user');
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ createUser, user, signIn, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, AuthContextProvider };
