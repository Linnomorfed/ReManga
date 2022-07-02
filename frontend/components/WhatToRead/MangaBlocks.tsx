import React from 'react';
import { MangaCardBlock } from '../UI';
import styles from './WhatToRead.module.scss';

export const MangaBlocks = () => {
  return (
    <div className='container'>
      <div className={styles.blocksWrapper}>
        <MangaCardBlock />
        <MangaCardBlock />
        <MangaCardBlock />
        <MangaCardBlock />
      </div>
    </div>
  );
};
