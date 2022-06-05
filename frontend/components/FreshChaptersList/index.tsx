import React, { FC } from 'react';
import { Checkbox } from '../UI';
import MangaCartVertical from '../UI/Cards/MangaCardVertical';
import ShowMoreButton from '../UI/ShowMoreButton';
import styles from './FreshChaptersList.module.scss';

const FreshChaptersList: FC = () => {
  return (
    <>
      <div className={styles.header}>
        <h5 className={styles.title}>Fresh chapters</h5>
        <div className='d-flex align-center '>

          <Checkbox />
          <p className={styles.description}>Only my bookmarks</p>
        </div>
      </div>

      <div className='d-block'>
        {/* <MangaCartVertical isFreshChapter={true} />
        <MangaCartVertical isFreshChapter={true} />
        <MangaCartVertical isFreshChapter={true} />
        <MangaCartVertical isFreshChapter={true} />
        <MangaCartVertical isFreshChapter={true} />
        <MangaCartVertical isFreshChapter={true} />
        <MangaCartVertical isFreshChapter={true} />
        <MangaCartVertical isFreshChapter={true} /> */}
      </div>

      {/* <ShowMoreButton /> */}
    </>
  );
};

export default FreshChaptersList;
