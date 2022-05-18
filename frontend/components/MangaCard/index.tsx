import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
import { CheckMarkSvg, HeartSvg } from '../../assets/svgs';
import styles from './MangaCard.module.scss';

interface MangaCardProps {
  variant?: 'default' | 'small' | 'catalog';
  title: string;
  url: string;
  mangaId: number;
  updateSelectedList?: (id: number) => void;
  editing?: boolean;
  bookmarkType?: string | null;
  rating?: number | null;
  likesCount?: number | null;
  bookmarkItemId?: number;
}

const MangaCard: FC<MangaCardProps> = ({
  variant = 'default',
  title,
  url,
  mangaId,
  bookmarkType,
  editing = false,
  rating,
  bookmarkItemId,
  likesCount,
  updateSelectedList,
}) => {
  const [selected, setSelected] = React.useState(false);
  const toggleSelected = () => {
    setSelected(!selected);
    updateSelectedList && bookmarkItemId && updateSelectedList(bookmarkItemId);
  };

  return (
    <div onClick={toggleSelected} className='pointer'>
      <div className={`${editing && styles.disabledLink}`}>
        <Link href={`/manga/${mangaId}`} passHref>
          <div
            className={classNames(
              styles.card,
              variant === 'small' && styles.cardSmall,
              variant === 'catalog' && styles.cardCatalog
            )}>
            <div className={styles.top}>
              <div
                className={classNames(
                  styles.imgContainer,
                  `${editing && styles.imgEditing}`
                )}>
                <Image
                  className={styles.img}
                  src={url}
                  alt={title}
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
              {rating !== 0 && !rating && (
                <div className={styles.likes}>
                  <HeartSvg fill='white' w={15} h={15} />
                  <div className={styles.likesCount}>{likesCount}</div>
                </div>
              )}
              {bookmarkType && (
                <div className={styles.status}>{bookmarkType}</div>
              )}
            </div>
            <h4 className={styles.title}>{title}</h4>
            <p className={styles.genre}>Manhwa Action</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MangaCard;
