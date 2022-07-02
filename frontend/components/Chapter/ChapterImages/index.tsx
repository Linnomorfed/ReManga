import Image from 'next/image';
import React from 'react';
import { ChapterPage } from '../../../models/IChapter';
import styles from './ChapterImages.module.scss';

interface ChapterImagesProps {
  images: ChapterPage[];
}

export const ChapterImages: React.FC<ChapterImagesProps> = ({ images }) => {
  return (
    <div className={styles.imagesContainer}>
      <div className={styles.imagesElement}>
        {images.map((obj) => (
          <div key={obj.url} className={styles.imageWrapper}>
            <Image
              className={styles.image}
              src={obj.url}
              layout='responsive'
              width={900}
              height='100%'
              alt=''
            />
          </div>
        ))}
      </div>
    </div>
  );
};
