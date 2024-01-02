import { UserContext } from '@context/AuthContext';
import { render } from '@testing-library/react';
import { mockUserAuth, mockUserUnauth } from './mockUser';
import { Props } from '@type/interfaces/props.interface';
import { UserCredential } from 'firebase/auth';

const mockCreateUserAuth = vi.fn(
  (): Promise<UserCredential> =>
    Promise.resolve({
      user: mockUserAuth,
      providerId: 'password',
      operationType: 'signIn',
    })
);

const mockSignInAuth = vi.fn(
  (): Promise<UserCredential> =>
    Promise.resolve({
      user: mockUserAuth,
      providerId: 'password',
      operationType: 'signIn',
    })
);
const mockLogoutAuth = vi.fn(() => Promise.resolve());

const mockCreateUserUnauth = vi.fn(() =>
  Promise.reject(new Error('User not found'))
);
const mockSignInUnauth = vi.fn(() =>
  Promise.reject(new Error('Invalid credentials'))
);
const mockLogoutUnauth = vi.fn(() => Promise.resolve());

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
  logout: mockLogoutUnauth,
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
