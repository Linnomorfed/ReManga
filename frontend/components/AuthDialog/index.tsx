import React from 'react';
import ModalBlock from '../ModalBlock';
import LoginForm from './forms/LoginForm';
import RecoveryForm from './forms/RecoveryForm';
import RegistrationForm from './forms/RegistrationForm';

export enum formTypeEnum {
  'login',
  'registration',
  'recovery',
}

interface AuthDialogProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  toggleModalVisibility: () => void;
}

const AuthDialog: React.FC<AuthDialogProps> = ({
  setVisible,
  visible,
  toggleModalVisibility,
}) => {
  const [formType, setFormType] = React.useState<formTypeEnum>(
    formTypeEnum.login
  );

  return (
    <>
      <ModalBlock
        toggleModalVisibility={toggleModalVisibility}
        visible={visible}
        setVisible={setVisible}>
        {formType === formTypeEnum.login && (
          <LoginForm
            setFormType={setFormType}
            toggleLoginVisibility={toggleModalVisibility}
          />
        )}
        {formType === formTypeEnum.recovery && (
          <RecoveryForm
            setFormType={setFormType}
            toggleLoginVisibility={toggleModalVisibility}
          />
        )}
        {formType === formTypeEnum.registration && (
          <RegistrationForm
            setFormType={setFormType}
            toggleLoginVisibility={toggleModalVisibility}
          />
        )}
      </ModalBlock>
    </>
  );
};

export default AuthDialog;
