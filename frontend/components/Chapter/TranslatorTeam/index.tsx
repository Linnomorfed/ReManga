import Image from 'next/image';
import React from 'react';
import styles from './TranslatorTeam.module.scss';

export const TranslatorTeam = () => {
  return (
    <div className={styles.completionTeam}>
      <h5 className={styles.teamTitle}> Tried for you:</h5>
      <div className='relative'>
        <div className={styles.teamLeft}>
          <Image
            src='https://api.remanga.org/media/publishers/assault_team/low_cover.jpg'
            alt=''
            width='60'
            height='60'
          />
          <span className={styles.teamName}>Assley Team</span>
        </div>

        <div className={styles.teamRight}>
          <div className={styles.teamRightWrapper}>
            <span className={styles.teamDonateNumber}>1</span>
            <span className={styles.teamDonateCurrency}>USD</span>
          </div>
        </div>
      </div>
    </div>
  );
};
