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

  return (
    <Layout>
      {!user ? (
        <>
          <h1>{header}</h1>
          <p>
            {subheader} <Link to={RoutesPath.Login}>{login}</Link>
          </p>
          <form className="form" onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="form__field">
              <label htmlFor="email">{email}</label>
              <input
                id="email"
                type="string"
                placeholder={email}
                {...register('email')}
              />
              <p className="form__error">
                {errors.email?.message ? errors.email.message : ''}
              </p>
            </div>
            <div className="form__field">
              <label htmlFor="password">{password}</label>
              <input
                id="password"
                type="password"
                placeholder={password}
                {...register('password')}
              />
              <p className="form__error">
                {errors.password?.message ? errors.password.message : ''}
              </p>
            </div>
            <div className="form__field">
              <label htmlFor="passwordRepeat">{password}</label>
              <input
                id="passwordRepeat"
                type="password"
                placeholder={password}
                {...register('passwordRepeat')}
              />
              <p className="form__error">
                {errors.passwordRepeat?.message
                  ? errors.passwordRepeat.message
                  : ''}
              </p>
            </div>
            <button disabled={!isValid}>{signUp}</button>
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
