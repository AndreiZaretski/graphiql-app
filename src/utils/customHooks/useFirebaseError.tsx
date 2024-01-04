import { useState, useEffect } from 'react';

const useFirebaseError = (
  errorCode: string,
  emailError: string,
  loginError: string,
  tooManyRequests: string,
  otherError: string
) => {
  const [firebaseError, setFirebaseError] = useState<string | undefined>('');

  useEffect(() => {
    const errorFirebase = () => {
      switch (errorCode) {
        case 'auth/email-already-in-use':
          return emailError;
        case 'auth/invalid-credential':
          return loginError;
        case 'auth/too-many-requests':
          return tooManyRequests;
        default:
          return otherError;
      }
    };

    setFirebaseError(errorFirebase());
  }, [emailError, errorCode, loginError, otherError, tooManyRequests]);

  return firebaseError;
};

export { useFirebaseError };
