import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
import { CheckMarkSvg, HeartSvg } from '../../../assets/svgs';
import { ResponseFilter } from '../../../models/IFilters';
import styles from './MangaCard.module.scss';

interface MangaCardProps {
  size?: 'default' | 'small' | 'preview' | 'medium' | 'large';
  title: string;
  url: string;
  mangaId: number;
  updateSelectedList?: (id: number) => void;
  editing?: boolean;
  bookmarkType?: string | null;
  rating?: number | null;
  likesCount?: number | null;
  bookmarkItemId?: number;
  genres?: ResponseFilter[];
  type?: string;
}

export const MangaCard: FC<MangaCardProps> = ({
  title,
  url,
  mangaId,
  size = 'default',
  bookmarkType,
  editing = false,
  rating,
  bookmarkItemId,
  likesCount,
  updateSelectedList,
  genres,
  type,
}) => {
  const sortedGenres = genres
    ? [...genres].sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      )
    : null;
  const firstGenre = sortedGenres ? sortedGenres[0].name : null;

  const [selected, setSelected] = React.useState(false);
  const toggleSelected = () => {
    setSelected(!selected);
    updateSelectedList && bookmarkItemId && updateSelectedList(bookmarkItemId);
  };

  return (
    <div onClick={toggleSelected} className={styles.card}>
      <div className={`${editing ? styles.disabledLink : ''}`}>
        <Link href={`/manga/${mangaId}`} passHref>
          <a>
            <div className={styles.top}>
              <div
                className={classNames(
                  styles.imgContainer,
                  `${size === 'large' ? styles.imgSizeLg : ''}`,
                  `${size === 'medium' ? styles.imgSizeMd : ''}`,
                  `${size === 'small' ? styles.imgSizeSm : ''}`,
                  `${size === 'preview' ? styles.imgSizePreview : ''}`
                )}>
                <Image
                  className={styles.img}
                  src={url}
                  alt={title}
                  placeholder='blur'
                  blurDataURL={`/_next/image?url=${url}&w= 16&q=75`}
                  layout='fill'
                  objectFit='cover'
                />
              </div>

              {editing && selected && (
                <div className={styles.selected}>
                  <CheckMarkSvg fill='white' h={24} />
                </div>
              )}
              {rating! >= 0 && <div className={styles.rating}>{rating}</div>}
              {rating !== 0 && !rating && likesCount && (
                <div className={styles.likes}>
                  <HeartSvg fill='white' w={15} h={15} />
                  <div className={styles.likesCount}>{likesCount}</div>
                </div>
              )}
              {bookmarkType && (
                <div className={styles.status}>{bookmarkType}</div>
              )}
            </div>

            <div>
              <h4
                className={classNames(
                  styles.title,
                  `${size === 'large' ? styles.titleLg : ''}`
                )}>
                {title}
              </h4>
              {type && genres && (
                <p
                  className={classNames(
                    styles.genre,
                    `${size === 'large' ? styles.genreLg : ''}`
                  )}>
                  {type} {firstGenre}
                </p>
              )}
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
};
