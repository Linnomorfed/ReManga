import React from 'react';
import { ArrowTopSvg } from '../../../assets/svgs';
import styles from './ScrollTopBtn.module.scss';

export const ScrollTopBtn = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <button onClick={scrollToTop} className={styles.btn}>
      <ArrowTopSvg fill='white' w={24} />
    </button>
  );
};
