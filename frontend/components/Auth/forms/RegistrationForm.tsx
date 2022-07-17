import React from 'react';
import { setCookie } from 'nookies';
import styles from '../Auth.module.scss';
import {
  ArrowSvg,
  EmailSvg,
  ErrorSvg,
  FacebookSvg,
  GooglePlusSvg,
  HidePassSvg,
  LockSvg,
  PersonSvg,
  ShowPassSvg,
} from '../../../assets/svgs';
import classNames from 'classnames';
import { ModalBtn } from '../../../ui-components/ModalBtn';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegistrationFormSchema } from '../../../utils/schemas/loginValidation';
import { CreateUserDto, formTypeEnum } from '../../../models/IAuth';
import { Api } from '../../../services/api';

interface RegistrationFormProps {
  setFormType: (arg: formTypeEnum) => void;
  toggleLoginVisibility: () => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  setFormType,
  toggleLoginVisibility,
}) => {
  const form = useForm<CreateUserDto>({
    mode: 'onChange',
    resolver: yupResolver(RegistrationFormSchema),
  });

  const [isShowPass, setIsShowPass] = React.useState(false);
  const [errorMassage, setErrorMassage] = React.useState('');

  const onSubmit = async (dto: CreateUserDto) => {
    try {
      const data = await Api().user.register({
        nickname: dto.nickname,
        email: dto.email,
        password: dto.password,
      });
      setCookie(null, 'authToken', data.access_token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
      toggleLoginVisibility();
    } catch (error: any) {
      console.warn('Register error', error);
      if (error.response) {
        setErrorMassage(error.response.data.message);
      }
    }
  };

  const showPass = () => {
    setIsShowPass(!isShowPass);
  };

  return (
    <div>
      <div className={styles.titleContainter}>
        <div
          className={styles.svgContainer}
          onClick={() => setFormType(formTypeEnum.login)}>
          <ArrowSvg fill={'white'} w={24} />
        </div>
        <h5 className={styles.title}>Registration</h5>
      </div>
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={styles.form}
        autoComplete='off'>
        <div className='relative'>
          {form.formState.errors?.nickname?.message && (
            <p className={styles.errorMsg}>
              {form.formState.errors.nickname.message}
            </p>
          )}
          <div className={styles.withSvg}>
            <div className={styles.withSvgInput}>
              <PersonSvg fill={'white'} w={24} />
            </div>
            <input
              {...form.register('nickname')}
              name='nickname'
              className={classNames(
                styles.input,
                styles.inputSvg,
                `${
                  form.formState.errors?.nickname?.message && styles.inputError
                }`
              )}
              type='text'
              placeholder='Nickname'
            />
          </div>
        </div>

        <div className='relative'>
          {form.formState.errors?.email?.message && (
            <p className={styles.errorMsg}>
              {form.formState.errors.email.message}
            </p>
          )}
          <div className={styles.withSvg}>
            <div className={styles.withSvgInput}>
              <EmailSvg fill={'white'} w={24} />
            </div>
            <input
              {...form.register('email')}
              className={classNames(
                styles.input,
                styles.inputSvg,
                `${form.formState.errors?.email?.message && styles.inputError}`
              )}
              name='email'
              type='email'
              placeholder='Email'
            />
          </div>
        </div>

        <div className='relative'>
          {form.formState.errors?.password?.message && (
            <p className={styles.errorMsg}>
              {form.formState.errors.password.message}
            </p>
          )}
          <div className={styles.withSvg}>
            <div className={styles.withSvgInput}>
              <LockSvg fill={'white'} w={24} />
            </div>
            <input
              {...form.register('password')}
              className={classNames(
                styles.input,
                styles.inputRegister,
                `${
                  form.formState.errors?.password?.message && styles.inputError
                }`
              )}
              type={isShowPass ? 'text' : 'password'}
              name='password'
              placeholder='Password'
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

        <div className='relative'>
          {form.formState.errors?.passwordConfirm?.message && (
            <p className={styles.errorMsg}>
              {form.formState.errors.passwordConfirm.message}
            </p>
          )}
          <div className={styles.withSvg}>
            <div className={styles.withSvgInput}>
              <LockSvg fill={'white'} w={24} />
            </div>
            <input
              {...form.register('passwordConfirm')}
              name='passwordConfirm'
              className={classNames(
                styles.input,
                styles.inputRegister,
                `${
                  form.formState.errors?.passwordConfirm?.message &&
                  styles.inputError
                }`
              )}
              type={isShowPass ? 'text' : 'password'}
              placeholder='Password again'
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

        <p className={classNames(styles.info, styles.infoRegister)}>
          By registering, you agree to our{' '}
          <span className={styles.link}>Terms</span> and{' '}
          <span className={styles.link}>Conditions</span>.
        </p>

        <ModalBtn
          type='submit'
          disabled={!form.formState.isValid || form.formState.isSubmitting}>
          Registration
        </ModalBtn>
      </form>
    </div>
  );
};
