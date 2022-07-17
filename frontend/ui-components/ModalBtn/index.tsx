import React from 'react';
import styles from './ModalBtn.module.scss';

interface ModalBtnProps {
  children: React.ReactChild | React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
}

export const ModalBtn: React.FC<ModalBtnProps> = ({
  onClick,
  children,
  type,
  disabled,
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={styles.btn}>
      {children}
    </button>
  );
};
