import { UserContext } from '@context/AuthContext';
import { render } from '@testing-library/react';
import { mockUserAuth, mockUserUnauth } from './mockUser';
import { Props } from '@type/interfaces/props.interface';
import { UserCredential } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

export const mockCreateUserAuth = vi.fn(
  (): Promise<UserCredential> =>
    Promise.resolve({
      user: mockUserAuth,
      providerId: 'password',
      operationType: 'signIn',
    })
);

export const mockSignInAuth = vi.fn(
  (): Promise<UserCredential> =>
    Promise.resolve({
      user: mockUserAuth,
      providerId: 'password',
      operationType: 'signIn',
    })
);
export const mockLogoutAuth = vi.fn(() => Promise.resolve());

const mockCreateUserUnauth = vi.fn(() =>
  Promise.reject(
    new FirebaseError(
      'auth/email-already-in-use',
      'The username is occupied by another user!'
    )
  )
);

export const mockSignInUnauth = vi.fn(() =>
  Promise.reject(
    new FirebaseError(
      'auth/invalid-credential',
      'The email or password is incorrect'
    )
  )
);

export const AuthUserValue = {
  createUser: mockCreateUserAuth,
  user: mockUserAuth,
  signIn: mockSignInAuth,
  logout: mockLogoutAuth,
};

export const UnauthUserValue = {
  createUser: mockCreateUserUnauth,
  user: mockUserUnauth,
  signIn: mockSignInUnauth,
  logout: mockLogoutAuth,
};

export const SignInUserValue = {
  createUser: mockCreateUserAuth,
  user: mockUserUnauth,
  signIn: mockSignInAuth,
  logout: mockLogoutAuth,
};

//ToDo Delete this after writen test if you don't need it

export const MockContextAuth = ({ children }: Props) => {
  return render(
    <UserContext.Provider value={AuthUserValue}>
      {children}
    </UserContext.Provider>
  );
};

export const MockContextUnauth = ({ children }: Props) => {
  return render(
    <UserContext.Provider value={UnauthUserValue}>
      {children}
    </UserContext.Provider>
  );
};
