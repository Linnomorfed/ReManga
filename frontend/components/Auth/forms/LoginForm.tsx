import React from 'react';
import classNames from 'classnames';
import {
  ErrorSvg,
  FacebookSvg,
  GooglePlusSvg,
  HidePassSvg,
  ShowPassSvg,
} from '../../../assets/svgs';
import styles from '../Auth.module.scss';
import { ModalBtn } from '../../../ui-components//ModalBtn';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginFormSchema } from '../../../utils/schemas/loginValidation';
import { setCookie } from 'nookies';
import { formTypeEnum, LoginDto } from '../../../models/IAuth';
import { useAppDispatch } from '../../../hooks/redux';
import { Api } from '../../../services/api';
import { setUserData } from '../../../redux/User/slice';

interface LoginFormProps {
  setFormType: (arg: formTypeEnum) => void;
  toggleLoginVisibility: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  setFormType,
  toggleLoginVisibility,
}) => {
  const dispatch = useAppDispatch();

  const form = useForm<LoginDto>({
    mode: 'onChange',
    resolver: yupResolver(LoginFormSchema),
  });
  const [isShowPass, setIsShowPass] = React.useState(false);
  const [errorMassage, setErrorMassage] = React.useState('');

  const onSubmit = async (dto: LoginDto) => {
    try {
      const data = await Api().user.login({
        email: dto.email,
        password: dto.password,
      });
      console.log(data);

      setCookie(null, 'remangaToken', data.access_token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
      setErrorMassage('');
      dispatch(setUserData(data));

      toggleLoginVisibility();
    } catch (error: any) {
      console.warn('Login error', error);

      if (error.response) {
        setErrorMassage(error.response.data.message);
      }
    }
  };

  const showPass = () => {
    setIsShowPass(!isShowPass);
  };

  return (
    <>
      <div className={styles.top}>
        <h5 className={styles.title}>Sign in</h5>
        <div className={styles.socialContainer}>
          <div className={styles.social}>
            <FacebookSvg w={20} fill={'white'} />
            <p>Facebook</p>
          </div>
          <div className={styles.social}>
            <GooglePlusSvg w={24} fill={'white'} />
            <p>Google Plus</p>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={styles.form}
          autoComplete='off'>
          <div className='relative d-flex'>
            {form.formState.errors?.email?.message && (
              <p className={styles.errorMsg}>
                {form.formState.errors.email.message}
              </p>
            )}
            <input
              {...form.register('email')}
              name='email'
              className={classNames(
                styles.input,
                `${form.formState.errors?.email?.message && styles.inputError}`
              )}
              type='text'
              placeholder='Email...'
            />
          </div>
          <div className='relative'>
            {form.formState.errors?.password?.message && (
              <p className={styles.errorMsg}>
                {form.formState.errors.password.message}
              </p>
            )}
            <div className={styles.withSvg}>
              <input
                {...form.register('password')}
                name='password'
                className={classNames(
                  styles.input,
                  styles.inputPass,
                  `${
                    form.formState.errors?.password?.message &&
                    styles.inputError
                  }`
                )}
                type={isShowPass ? 'text' : 'password'}
                placeholder='Password...'
              />
              <div className={styles.withSvgPass} onClick={showPass}>
                {isShowPass ? (
                  <HidePassSvg h={24} fill={'white'} />
                ) : (
                  <ShowPassSvg h={24} fill={'white'} />
                )}
              </div>
            </div>
          </div>
          {errorMassage && (
            <div className={styles.errorAlert}>
              <ErrorSvg w={22} />
              <p>{errorMassage}</p>
            </div>
          )}

          <p className={styles.links}>
            <span onClick={() => setFormType(formTypeEnum.recovery)}>
              Forgot your password?
            </span>{' '}
            /{' '}
            <span onClick={() => setFormType(formTypeEnum.registration)}>
              Registration
            </span>
          </p>
          <ModalBtn
            disabled={!form.formState.isValid || form.formState.isSubmitting}>
            sign in
          </ModalBtn>
        </form>
      </div>
    </>
  );
};
