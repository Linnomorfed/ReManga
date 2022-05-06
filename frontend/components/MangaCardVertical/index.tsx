import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
import { ForPaidSvg } from '../../assets/svgs';
import { ResponceManga } from '../../models/IManga';
import styles from './MangaCardVertical.module.scss';

interface MangaCartVerticalProps {
  isFreshChapter?: boolean;
  data: ResponceManga;
}

const MangaCartVertical: FC<MangaCartVerticalProps> = ({
  isFreshChapter = false,
  data,
}) => {
  return (
    <Link href={`/manga/${data.id}`}>
      {isFreshChapter ? (
        <div className={classNames(styles.cart, styles.cartFresh)}>
          <Image
            className={classNames(styles.img, styles.imgFresh)}
            src={data.image.url}
            alt={data.title}
            width={63}
            height={96}
          />
          <div>
            <div className='d-flex align-center'>
              <p className={classNames(styles.title, styles.titleFresh)}>
                Absolute god game
              </p>

              <ForPaidSvg fill={'#f50057'} w={20} h={20} />
            </div>
            <div className='d-flex align-center'>
              <p className={classNames(styles.chapter, styles.chapterFresh)}>
                Volume 1. Chapter 72. Parting
              </p>
              <small className={styles.small}> + 1 more chapter</small>
            </div>

            <small className={styles.small}>1 hour ago</small>
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

export default MangaCartVertical;
