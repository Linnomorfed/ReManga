import classNames from 'classnames';
import React from 'react';
import styles from './Loader.module.scss';

interface CircularLoaderProps {
  isSmall?: boolean;
}

export const CircularLoader: React.FC<CircularLoaderProps> = ({
  isSmall = false,
}) => {
  return (
    <svg
      className={classNames(
        styles.loaderWrapper,
        `${isSmall ? styles.loaderWrapperSm : ''}`
      )}
      viewBox='22 22 44 44'>
      <circle
        className={styles.loader}
        cx='44'
        cy='44'
        r='20.2'
        fill='none'
        strokeWidth='3.6'></circle>
    </svg>
  );
};
