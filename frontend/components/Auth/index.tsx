import classNames from 'classnames';
import React from 'react';
import { ModalBlock } from '../ModalBlock';
import { LoginForm } from './forms/LoginForm';
import { RecoveryForm } from './forms/RecoveryForm';
import { RegistrationForm } from './forms/RegistrationForm';
import styles from './Auth.module.scss';
import { useAppSelector } from '../../hooks/redux';
import { formTypeEnum } from '../../models/IAuth';
import useDidMountEffect from '../../hooks/useDidMountEffect';
import { selectAuthModalData } from '../../redux/Auth/selectors';

export const Auth: React.FC = () => {
  const authModalVisibility = useAppSelector(selectAuthModalData);

  const [formType, setFormType] = React.useState<formTypeEnum>(
    formTypeEnum.login
  );
  const [visibleAuthModal, setVisibleAuthModal] = React.useState(false);

  const toggleAuthVisibility = () => {
    setVisibleAuthModal(!visibleAuthModal);
  };

  useDidMountEffect(() => {
    setVisibleAuthModal(true);
  }, [authModalVisibility]);

  return (
    <>
      <button
        className={classNames(styles.btn, styles.btnText)}
        onClick={toggleAuthVisibility}>
        Sign in
      </button>

      {visibleAuthModal && (
        <ModalBlock
          toggleModalVisibility={toggleAuthVisibility}
          visible={visibleAuthModal}
          setVisible={setVisibleAuthModal}>
          {formType === formTypeEnum.login && (
            <LoginForm
              setFormType={setFormType}
              toggleLoginVisibility={toggleAuthVisibility}
            />
          )}
          {formType === formTypeEnum.recovery && (
            <RecoveryForm
              setFormType={setFormType}
              toggleLoginVisibility={toggleAuthVisibility}
            />
          )}
          {formType === formTypeEnum.registration && (
            <RegistrationForm
              setFormType={setFormType}
              toggleLoginVisibility={toggleAuthVisibility}
            />
          )}
        </ModalBlock>
      )}
    </>
  );
};
