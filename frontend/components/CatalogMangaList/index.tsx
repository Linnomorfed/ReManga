import React, { FC } from 'react';
import { ResponceManga } from '../../models/IManga';
import MangaCard from '../MangaCard';
import styles from './CatalogMangaList.module.scss';

interface CatalogMangaListProps {
  items: ResponceManga[];
}

const CatalogMangaList: FC<CatalogMangaListProps> = ({ items }) => {
  return (
    <div className={styles.mangaList}>
      {items.map((obj) => (
        <MangaCard
          key={obj.id}
          variant='catalog'
          title={obj.title}
          url={obj.image.url}
          mangaId={obj.id}
          rating={obj.rating}
        />
      ))}
    </div>
  );
};

export default CatalogMangaList;
