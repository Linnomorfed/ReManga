import classNames from 'classnames';
import React from 'react';
import styles from './TabBtn.module.scss';

interface TabBtnProps {
  children: React.ReactChild | React.ReactNode;
  active: number;
  onClick: (id: number) => void;
  id: number;
}

const TabBtn: React.FC<TabBtnProps> = ({
  children,
  active = false,
  onClick,
  id,
}) => {
  const toogleActiveTab = () => {
    onClick(id);
  };
  return (
    <>
      <button
        onClick={toogleActiveTab}
        className={classNames(
          styles.tabBtn,
          `${active === id && styles.active}`
        )}>
        {children}
        <div className={styles.underline}></div>
      </button>
    </>
  );
};

export default TabBtn;
