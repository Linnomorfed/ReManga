import classNames from 'classnames';
import React from 'react';
import ModalBlock from '../ModalBlock';
import LoginForm from './forms/LoginForm';
import RecoveryForm from './forms/RecoveryForm';
import RegistrationForm from './forms/RegistrationForm';
import styles from './Auth.module.scss';
import { useAppSelector } from '../../hooks/redux';
import { selectAuthModalData } from '../../redux/slices/authModalSlice';
import { formTypeEnum } from '../../models/IAuth';

const Auth: React.FC = () => {
  const authModalVisibility = useAppSelector(selectAuthModalData);

  const [formType, setFormType] = React.useState<formTypeEnum>(
    formTypeEnum.login
  );
  const [visibleAuthModal, setVisibleAuthModal] = React.useState(false);

  const toggleAuthVisibility = () => {
    setVisibleAuthModal(!visibleAuthModal);
  };

  const initialRender = React.useRef(true);

  React.useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      setVisibleAuthModal(true);
    }
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

export default Auth;
