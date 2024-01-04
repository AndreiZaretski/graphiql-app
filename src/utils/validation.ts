import * as yup from 'yup';

export const SchemaRegistration = yup.object().shape({
  email: yup.string().required().email(),
  password: yup
    .string()
    .required()
    .required()
    .min(8)
    .matches(/^(?=.*[0-9])/, 'password must contain one number')
    .matches(/^(?=.*[A-ZА-Я])/, 'password must contain one uppercase letter')
    .matches(/^(?=.*[a-zа-я])/, 'password must contain one lower letter')
    .matches(
      /^(?=.*[~!@#$%^&*()_+"№;:?*])/,
      'password must contain one special character ~!@#$%^&*()_+"№;:?*'
    ),

  passwordRepeat: yup
    .string()
    .required()

    .oneOf([yup.ref('password')], 'not match'),
});

export const SchemaLogin = yup.object().shape({
  email: yup.string().required().email(),

  password: yup.string().required().min(8),
});
