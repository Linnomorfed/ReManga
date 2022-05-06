import * as yup from 'yup';

export const RecoveryFormSchema = yup
  .object({
    email: yup.string().email().required(),
  })
  .required();

export const LoginFormSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(6).max(32).required(),
  })
  .required();

export const RegistrationFormSchema = yup
  .object({
    nickname: yup.string().min(3).max(16).required(),
    email: yup.string().email().required(),
    password: yup
      .string()
      .min(6)
      .max(32)
      .required()
      .notOneOf(
        [yup.ref('nickname'), yup.ref('email')],
        'Password cannot match other fields'
      ),

    passwordConfirm: yup
      .string()
      .required('Confirm Password is required')
      .oneOf([yup.ref('password')], 'Passwords should match'),
  })
  .required();
