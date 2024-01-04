import { useState, useEffect } from 'react';
import { FieldErrors } from 'react-hook-form';

const useEmailError = (
  errors: FieldErrors,
  required: string,
  emailInvalid: string
) => {
  const [emailError, setEmailError] = useState<string | undefined>('');

  useEffect(() => {
    const errorEmail = () => {
      switch (errors.email?.message) {
        case 'email is a required field':
          return required;
        case 'email must be a valid email':
          return emailInvalid;
        default:
          '';
      }
    };

    setEmailError(errorEmail());
  }, [errors.email, required, emailInvalid]);

  return emailError;
};

export { useEmailError };
