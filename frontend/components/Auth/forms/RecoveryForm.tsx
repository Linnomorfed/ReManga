import React from 'react';
import styles from '../Auth.module.scss';
import { ArrowSvg, EmailSvg } from '../../../assets/svgs';
import classNames from 'classnames';
import ModalBtn from '../../UI/ModalBtn';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RecoveryFormSchema } from '../../../utils/schemas/loginValidation';
import { formTypeEnum, RecoveryDto } from '../../../models/IAuth';

interface RecoveryFormProps {
  setFormType: (arg: formTypeEnum) => void;
  toggleLoginVisibility: () => void;
}

const RecoveryForm: React.FC<RecoveryFormProps> = ({
  setFormType,
  toggleLoginVisibility,
}) => {
  const form = useForm<RecoveryDto>({
    mode: 'onChange',
    resolver: yupResolver(RecoveryFormSchema),
  });

  const onSubmit = (dto: RecoveryDto) => console.log({ email: dto.email });

  const onRecoveryClick = () => {
    toggleLoginVisibility();
  };

  return (
    <div>
      <div className={styles.titleContainter}>
        <div
          className={styles.svgContainer}
          onClick={() => setFormType(formTypeEnum.login)}>
          <ArrowSvg fill={'white'} w={24} />
        </div>
        <h5 className={styles.title}>Password recovery</h5>
      </div>
      <p className={styles.info}>
        To recover your password, enter the email address you registered your
        account with.
      </p>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        autoComplete='off'
        className={styles.form}>
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
              name='email'
              className={classNames(
                styles.input,
                styles.inputSvg,
                `${form.formState.errors?.email?.message && styles.inputError}`
              )}
              type='email'
              placeholder='Email...'
            />
          </div>
        </div>

        <ModalBtn
          type='submit'
          disabled={!form.formState.isValid || form.formState.isSubmitting}>
          send
        </ModalBtn>
      </form>
    </div>
  );
};

export default RecoveryForm;
