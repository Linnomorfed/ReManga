import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
import TimeAgo from 'timeago-react';
import { ForPaidSvg } from '../../../../assets/svgs';
import { ResponceManga } from '../../../../models/IManga';
import styles from './MangaCardVertical.module.scss';

interface MangaCartVerticalProps {
  isFreshChapter?: boolean;
  data: ResponceManga;
  chapterVolume?: number;
  chapterNumber?: number;
  chapterDate?: string;
  chapterName?: string | null;
  isPaid?: boolean;
  repeatsCount?: number;
}

export const MangaCartVertical: FC<MangaCartVerticalProps> = ({
  isFreshChapter = false,
  data,
  chapterVolume,
  chapterNumber,
  chapterDate,
  chapterName,
  isPaid = false,
  repeatsCount,
}) => {
  return (
    <Link href={`/manga/${data.id}`}>
      {isFreshChapter ? (
        <div className={classNames(styles.cart, styles.cartFresh)}>
          <Image
            className={styles.img}
            src={data.image.url}
            alt={data.title}
            width={63}
            height={96}
          />
          <div className={styles.cartFreshRight}>
            <div className='d-flex align-center'>
              <p className={classNames(styles.title, styles.titleFresh)}>
                {data.title}
              </p>

              {isPaid && <ForPaidSvg fill={'#f50057'} w={20} h={20} />}
            </div>
            <div className='d-flex align-center'>
              <p className={classNames(styles.chapter, styles.chapterFresh)}>
                Volume {chapterVolume}. Chapter {chapterNumber}.{' '}
                {chapterName && chapterName}
              </p>
              {repeatsCount && repeatsCount > 1 && (
                <small className={styles.small}>
                  {' '}
                  +{repeatsCount} more chapters
                </small>
              )}
            </div>

            <small className={styles.small}>
              {chapterDate && <TimeAgo datetime={chapterDate} />}
            </small>
          </div>
        </div>
      ) : (
        <div className={styles.cart}>
          <Image
            className={styles.img}
            src={data.image.url}
            alt={data.title}
            width={63}
            height={96}
          />
          <div className={styles.wrapper}>
            <h4 className={styles.title}>{data.title}</h4>
            <h6 className={styles.chapter}>
              {data.type.name} {data.issueYear}
            </h6>
          </div>
        </div>
      )}
    </Link>
  );
};
