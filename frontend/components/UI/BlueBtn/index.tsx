import classNames from 'classnames';
import React from 'react';
import styles from './BlueBtn.module.scss';

interface BlueBtnProps {
  children: React.ReactChild | React.ReactNode;
  type?: 'default' | 'manga';
  disabled?: boolean;
  color?: 'default' | 'white';
  size?: 'sm' | 'normal';
  fullWidth?: boolean;
  onClick?: () => void;
}

const BlueBtn: React.FC<BlueBtnProps> = ({
  children,
  type = 'default',
  disabled = false,
  size = 'normal',
  fullWidth = true,
  color = 'default',
  onClick,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={classNames(
        styles.btn,
        `${type === 'manga' && styles.btnManga}`,
        `${fullWidth && styles.btnFullWidth}`,
        `${color === 'white' && styles.btnWhite}`,
        `${size === 'sm' && styles.btnSm}`
      )}>
      {children}
    </button>
  );
};

export default BlueBtn;
