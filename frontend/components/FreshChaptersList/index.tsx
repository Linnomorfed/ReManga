import React, { FC } from 'react';
import { CheckboxCheckedSvg, CheckboxSvg } from '../../assets/svgs';
import MangaCartVertical from '../MangaCardVertical';
import ShowMoreButton from '../UI/ShowMoreButton';
import styles from './FreshChaptersList.module.scss';

const FreshChaptersList: FC = () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <>
      <div className={styles.header}>
        <h5 className={styles.title}>Fresh chapters</h5>
        <div className='d-flex align-center '>
          <div className={styles.checkboxContainer}>
            <input
              className={styles.checkbox}
              type='checkbox'
              onChange={() => setChecked(!checked)}
            />

            {checked ? (
              <CheckboxCheckedSvg fill={'#4e6baf'} w={24} h={24} />
            ) : (
              <CheckboxSvg fill={'white'} w={24} h={24} />
            )}
          </div>

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
