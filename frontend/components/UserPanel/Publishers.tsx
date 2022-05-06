import React from 'react';
import { BlueBtn } from '../UI';
import styles from './UserPanel.module.scss';

const Publishers = () => {
  return (
    <div className={styles.publishersWrapper}>
      <h5 className={styles.subtitle}>Within the teams:</h5>
      <div className={styles.publishersBtn}>
        <BlueBtn type='manga'>Create a new</BlueBtn>
      </div>
    </div>
  );
};

export default Publishers;
