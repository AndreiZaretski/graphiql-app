import { useState, useEffect } from 'react';
import { FieldErrors } from 'react-hook-form';

const usePasswordError = (
  errors: FieldErrors,
  required: string,
  minLength: string,
  oneNumberError?: string,
  oneUpperLetterError?: string,
  oneLowerLetterError?: string,
  oneSpecialCharacterError?: string
) => {
  const [passwordError, setPasswordError] = useState<string | undefined>('');

  useEffect(() => {
    const errorPassword = () => {
      switch (errors.password?.message) {
        case 'password is a required field':
          return required;
        case 'password must be at least 8 characters':
          return minLength;
        case 'password must contain one uppercase letter':
          return oneUpperLetterError;
        case 'password must contain one number':
          return oneNumberError;
        case 'password must contain one lower letter':
          return oneLowerLetterError;
        case 'password must contain one special character ~!@#$%^&*()_+"№;:?*':
          return oneSpecialCharacterError;
        default:
          '';
      }
    };

    setPasswordError(errorPassword());
  }, [
    errors.password?.message,
    minLength,
    oneLowerLetterError,
    oneNumberError,
    oneSpecialCharacterError,
    oneUpperLetterError,
    required,
  ]);

  return passwordError;
};

const usePasswordRepeatError = (
  errors: FieldErrors,
  required: string,
  notMatch: string
) => {
  const [passwordError, setPasswordError] = useState<string | undefined>('');

  useEffect(() => {
    const errorPassword = () => {
      switch (errors.passwordRepeat?.message) {
        case 'passwordRepeat is a required field':
          return required;
        case 'not match':
          return notMatch;
        default:
          '';
      }
    };

    setPasswordError(errorPassword());
  }, [errors.passwordRepeat?.message, notMatch, required]);

  return passwordError;
};

export { usePasswordError, usePasswordRepeatError };
