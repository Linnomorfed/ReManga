import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { HeartSvg, ShowPassSvg, StarSvg } from '../../../../assets/svgs';
import { ResponseFilter } from '../../../../models/IFilters';
import styles from './MangaCardBlock.module.scss';
interface MangaCardBlockProps {
  id: number;
  imageUrl: string;
  type: string;
  title: string;
  genres: ResponseFilter[];
  rating: number;
  views: number;
  likes: number;
  index: number;
}

export const MangaCardBlock: React.FC<MangaCardBlockProps> = ({
  id,
  imageUrl,
  type,
  title,
  genres,
  rating,
  likes,
  views,
  index,
}) => {
  console.log(genres);

  const sortedGenres = genres
    ? [...genres].sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      )
    : null;

  return (
    <Link href={`/manga/${id}`}>
      <a className={styles.cardWrapper}>
        <div className={styles.card}>
          <Image src={imageUrl} alt='' width={140} height={210} />
          <div className={styles.body}>
            <span className={styles.type}>{type}</span>
            <h4 className={styles.title}>{title}</h4>
            <p className={styles.genres}>
              {sortedGenres &&
                sortedGenres
                  .slice(0, 3)
                  .map((obj) => obj.name)
                  .join(', ')}
            </p>
            <div className={styles.info}>
              <span className={styles.item}>
                <StarSvg fill='white' w={13} /> {rating}
              </span>
              <span className={styles.item}>
                <HeartSvg fill='white' w={13} /> {likes}
              </span>
              <span className={styles.item}>
                <ShowPassSvg fill='white' w={13} /> {views}
              </span>
            </div>
          </div>
          <div className={styles.index}>{index + 1}</div>
        </div>
      </a>
    </Link>
  );
};
