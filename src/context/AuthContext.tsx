import { createContext, useEffect, useState, useCallback } from 'react';
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  IdTokenResult,
} from 'firebase/auth';
import { auth } from '@services/firebaseSettings';

import { UserContextType } from '@type/interfaces/auth.interface';
import { Props } from '@type/interfaces/props.interface';

const UserContext = createContext<UserContextType | null>(null);

const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User>({
    uid: '',
    displayName: '',
    email: '',
    photoURL: '',
    emailVerified: false,
    isAnonymous: false,
    metadata: {},
    providerData: [],
    refreshToken: '',
    tenantId: '',
    delete: async () => {},
    getIdToken: async () => '',
    getIdTokenResult: async (): Promise<IdTokenResult> => {
      return {
        token: '',
        expirationTime: '',
        issuedAtTime: '',
        authTime: '',
        signInProvider: '',
        claims: {},
        signInSecondFactor: '',
      };
    },
    reload: async () => {},
    toJSON: () => ({}),
    phoneNumber: '',
    providerId: '',
  });

  const createUser = useCallback((email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  }, []);

  const signIn = useCallback((email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  }, []);

  const logout = useCallback(() => {
    return signOut(auth);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser as User);
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
