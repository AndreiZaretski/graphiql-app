import { mockUserAuth, mockUserUnauth } from './mockUser';
import { UserCredential } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

export const mockCreateUserSuccess = vi.fn(
  (): Promise<UserCredential> =>
    Promise.resolve({
      user: mockUserAuth,
      providerId: 'password',
      operationType: 'signIn',
    })
);

export const mockSignInSuccess = vi.fn(
  (): Promise<UserCredential> =>
    Promise.resolve({
      user: mockUserAuth,
      providerId: 'password',
      operationType: 'signIn',
    })
);
export const mockLogoutAuth = vi.fn(() => Promise.resolve());

export const mockCreateUserFailed = vi.fn(() =>
  Promise.reject(
    new FirebaseError(
      'auth/email-already-in-use',
      'The username is occupied by another user!'
    )
  )
);

export const mockSignInFailed = vi.fn(() =>
  Promise.reject(
    new FirebaseError(
      'auth/invalid-credential',
      'The email or password is incorrect'
    )
  )
);

export const AuthUserValue = {
  createUser: mockCreateUserSuccess,
  user: mockUserAuth,
  signIn: mockSignInSuccess,
  logout: mockLogoutAuth,
};

export const UnauthUserValue = {
  createUser: mockCreateUserFailed,
  user: mockUserUnauth,
  signIn: mockSignInFailed,
  logout: mockLogoutAuth,
};

export const UserValueFailedMock = {
  createUser: mockCreateUserSuccess,
  user: mockUserUnauth,
  signIn: mockSignInSuccess,
  logout: mockLogoutAuth,
};
