import * as yup from 'yup';

// const regExpEmail =
//   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// const regExpEmailSimple = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

// const {
//   data: {
//     auth: {
//       login,
//       signUp,
//       email,
//       password,
//       signUpPage: { header, subheader },
//     },
//     formErrorMessage: { emailError, otherError },
//   },
// } = useContext(LanguageContext);

export const SchemaRegistration = yup.object().shape({
  email: yup
    .string()
    .required()
    .when('$languageError', (languageError, SchemaRegistration) => {
      return SchemaRegistration.email(languageError[0].emailInvalid);
    }),
  password: yup
    .string()
    .required()
    // .required()
    // .min(8)
    // .matches(/^(?=.*[0-9])/, 'password must contain one number')
    // .matches(/^(?=.*[A-ZА-Я])/, 'password must contain one uppercase letter')
    // .matches(/^(?=.*[a-zа-я])/, 'password must contain one lower letter')
    // .matches(
    // /^(?=.*[~!@#$%^&*()_+"№;:?*])/,
    // 'password must contain one special character ~!@#$%^&*()_+"№;:?*'
    // )
    .when('$languageError', (languageError, SchemaRegistration) => {
      return SchemaRegistration.required(languageError[0].required)
        .min(8, languageError[0].minLength)
        .matches(/^(?=.*[0-9])/, languageError[0].oneNumberError)
        .matches(/^(?=.*[A-ZА-Я])/, languageError[0].oneUpperLetterError)
        .matches(/^(?=.*[a-zа-я])/, languageError[0].oneLowerLetterError)
        .matches(
          /^(?=.*[~!@#$%^&*()_+"№;:?*])/,
          languageError[0].oneSpecialCharacterError
        );
    }),

  passwordRepeat: yup
    .string()
    .required()
    .when('$languageError', (languageError, SchemaRegistration) => {
      return SchemaRegistration.oneOf(
        [yup.ref('password')],
        languageError[0].notMatch
      );
    }),
  // .oneOf([yup.ref('password')], 'not match'),
});

export const SchemaLogin = yup.object().shape({
  email: yup
    .string()
    .required()
    .when('$languageError', (languageError, SchemaLogin) => {
      return SchemaLogin.email(languageError[0].emailInvalid);
    }),
  password: yup
    .string()
    .required()
    .when('$languageError', (languageError, SchemaLogin) => {
      return SchemaLogin.required(languageError[0].required).min(
        8,
        languageError[0].minLength
      );
    }),
});
