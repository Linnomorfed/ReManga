import Image from 'next/image';
import React from 'react';
import { HeartSvg, ShowPassSvg, StarSvg } from '../../../../assets/svgs';
import styles from './MangaCardBlock.module.scss';

const MangaCardBlock = () => {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.card}>
        <Image
          src='https://api.remanga.org/media/titles/solo-leveling/60da630a4154ad4ab38883d37d38a7b7.jpg'
          alt=''
          width={140}
          height={210}
        />
        <div className={styles.body}>
          <span className={styles.type}>Manhwa</span>
          <h4 className={styles.title}>Solo leveling</h4>
          <p className={styles.genres}>Action, Drama, Elements of humor</p>
          <div className={styles.info}>
            <span className={styles.item}>
              <StarSvg fill='white' w={13} /> 9.7
            </span>
            <span className={styles.item}>
              <HeartSvg fill='white' w={13} /> 3.3M
            </span>
            <span className={styles.item}>
              <ShowPassSvg fill='white' w={13} /> 18.4M
            </span>
          </div>
        </div>
        <div className={styles.index}>2</div>
      </div>
    </div>
  );
};

export default MangaCardBlock;
