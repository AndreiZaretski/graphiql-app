import Layout from '@layout/Layout';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { UserContext } from '@context/AuthContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { SchemaLogin } from '@utils/validation';
import { RoutesPath } from '@type/enums/routes.enum';
import { LanguageContext } from '@context/LanguageContext';
import { FirebaseError } from '@firebase/util';
import { Inputs } from '@type/interfaces/auth.interface';
import styles from './Login.module.scss';

const SignIn = () => {
  const { user, signIn } = useContext(UserContext) || {};
  const {
    data: {
      auth: {
        login,
        signUp,
        email,
        password,
        loginPage: { header, subheader },
      },
      formErrorMessage: {
        loginError,
        otherError,
        emailInvalid,
        minLength,
        required,
      },
    },
  } = useContext(LanguageContext);

  const navigate = useNavigate();
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(SchemaLogin),
    context: {
      languageError: {
        emailInvalid,
        minLength,
        required,
      },
    },
  });

  const onSubmitHandler = async ({ email, password }: Inputs) => {
    try {
      await signIn?.(email, password);
      navigate('/main');
    } catch (err) {
      if (err instanceof FirebaseError) {
        if (String(err.code) === 'auth/invalid-credential') {
          setError(loginError);
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
          <p className={styles.subheader}>
            {subheader}
            <Link to={RoutesPath.SignUp} className="link link_s">
              {signUp}
            </Link>
          </p>
          <form className="form" onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="form__field">
              <label htmlFor="email">{email}</label>
              <input
                id="email"
                type="email"
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
            <div className="button_wrapper">
              <button disabled={!isValid} className="button">
                {login}
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

export default SignIn;
