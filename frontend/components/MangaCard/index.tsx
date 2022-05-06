import classNames from 'classnames';
import Image from 'next/image';
import React, { FC } from 'react';
import { HeartSvg } from '../../assets/svgs';
import styles from './MangaCard.module.scss';

interface MangaCardProps {
  variant?: 'default' | 'small' | 'catalog';
  title: string;
  url: string;
}

const MangaCard: FC<MangaCardProps> = ({ variant = 'default', title, url }) => {
  return (
    <div
      className={classNames(
        styles.card,
        variant === 'small' && styles.cardSmall,
        variant === 'catalog' && styles.cardCatalog
      )}>
      <div className={styles.top}>
        <div className={styles.imgContainer}>
          <Image
            className={styles.img}
            src={url}
            alt={title}
            layout='fill'
            objectFit='cover'
          />
        </div>
        {variant === 'catalog' ? (
          <div className={styles.rating}>9.5</div>
        ) : (
          <div className={styles.likes}>
            <HeartSvg fill='white' w={15} h={15} />
            <div className={styles.likesCount}>30.8K</div>
          </div>
        )}
        <div className={styles.status}>I will read</div>
      </div>
      <h4 className={styles.title}>{title}</h4>
      <p className={styles.genre}>Manhwa Action</p>
    </div>
  );
};

export default MangaCard;
