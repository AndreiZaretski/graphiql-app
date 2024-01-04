import { IdTokenResult } from 'firebase/auth';

export const mockUserAuth = {
  uid: '123',
  displayName: 'Test User',
  email: 'test@example.com',
  photoURL: 'https://example.com/test.jpg',
  emailVerified: true,
  isAnonymous: false,
  metadata: {},
  providerData: [],
  refreshToken: 'abc',
  tenantId: 'xyz',
  delete: async () => {},
  getIdToken: async () => 'token',
  getIdTokenResult: async (): Promise<IdTokenResult> => ({
    token: 'token',
    expirationTime: '2023-12-31',
    issuedAtTime: '2023-12-01',
    authTime: '2023-12-01',
    signInProvider: 'password',
    claims: {},
    signInSecondFactor: '',
  }),
  reload: async () => {},
  toJSON: () => ({}),
  phoneNumber: '+1234567890',
  providerId: 'password',
};

export const mockUserUnauth = null;
