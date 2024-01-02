import Layout from '@layout/Layout';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { UserContext } from '@context/AuthContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { SchemaRegistration } from '@utils/validation';
import { RoutesPath } from '@type/enums/routes.enum';
import { LanguageContext } from '@context/LanguageContext';
import { FirebaseError } from '@firebase/util';
import { Inputs } from '@type/interfaces/auth.interface';
import styles from './SignUp.module.scss';
import { useEmailError } from '@utils/customHooks/useEmailError';
import {
  usePasswordError,
  usePasswordRepeatError,
} from '@utils/customHooks/usePasswordError';

const SignUp = () => {
  const { user, createUser } = useContext(UserContext) || {};
  const {
    data: {
      auth: {
        login,
        signUp,
        email,
        password,
        signUpPage: { header, subheader },
      },
      formErrorMessage: {
        emailError,
        emailInvalid,
        otherError,
        oneNumberError,
        oneUpperLetterError,
        oneLowerLetterError,
        oneSpecialCharacterError,
        passwordNotMatchError,
        minLength,
        required,
        notMatch,
      },
    },
  } = useContext(LanguageContext);

  const [error, setError] = useState('');

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(SchemaRegistration),
    context: {
      languageError: {
        emailInvalid,
        oneNumberError,
        oneUpperLetterError,
        oneLowerLetterError,
        oneSpecialCharacterError,
        passwordNotMatchError,
        minLength,
        required,
        notMatch,
      },
    },
  });

  const onSubmitHandler = async ({ email, password }: Inputs) => {
    if (password)
      try {
        await createUser?.(email, password);
        navigate('/main');
      } catch (err) {
        if (err instanceof FirebaseError) {
          if (String(err.code) === 'auth/email-already-in-use') {
            setError(emailError);
          } else {
            setError(otherError);
          }
        }
      }
    reset();
  };

  const emailErrorMessage = useEmailError(errors, required, emailInvalid);
  const passwordErrorMessage = usePasswordError(
    errors,
    required,
    minLength,
    oneNumberError,
    oneUpperLetterError,
    oneLowerLetterError,
    oneSpecialCharacterError
  );

  const passwordRepeatErrorMessage = usePasswordRepeatError(
    errors,
    required,
    notMatch
  );

  return (
    <Layout>
      {!user ? (
        <>
          <h1>{header}</h1>
          <p className={styles.subheader}>
            {subheader}
            <Link to={RoutesPath.Login} className="link link_s">
              {login}
            </Link>
          </p>
          <form className="form" onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="form__field">
              <label htmlFor="email">{email}</label>
              <input
                type="text"
                style={{ position: 'absolute', left: '-9999px' }}
                {...register('email')}
                autoComplete="username"
              />
              <input
                id="email"
                type="string"
                placeholder={email}
                {...register('email')}
                autoComplete="username"
              />
              <p className="form__error">{emailErrorMessage}</p>
            </div>
            <div className="form__field">
              <label htmlFor="password">{password}</label>
              <input
                id="password"
                type="password"
                placeholder={password}
                {...register('password')}
                autoComplete="new-password"
              />
              <p className="form__error">{passwordErrorMessage}</p>
            </div>
            <div className="form__field">
              <label htmlFor="passwordRepeat">{password}</label>
              <input
                id="passwordRepeat"
                type="password"
                placeholder={password}
                {...register('passwordRepeat')}
                autoComplete="new-password"
              />
              <p className="form__error">{passwordRepeatErrorMessage}</p>
            </div>
            <div className="button_wrapper">
              <button disabled={!isValid} className="button">
                {signUp}
              </button>
            </div>
            <p className="form__error-server">{error ? error : ''}</p>
          </form>
        </>
      ) : (
        ''
      )}
    </Layout>
  );
};

export default SignUp;
