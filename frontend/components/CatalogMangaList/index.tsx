import React, { FC } from 'react';
import MangaCard from '../MangaCard';
import styles from './CatalogMangaList.module.scss';

const CatalogMangaList: FC = () => {
  const ex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  return (
    <div className={styles.mangaList}>
      {ex.map((id) => (
        <MangaCard key={id} variant='catalog' />
      ))}
    </div>
  );
};

export default CatalogMangaList;
