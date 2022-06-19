import React, { FC } from 'react';
import { NewestChapteResult } from '../../../models/IChapter';
import { BlueBtn, Checkbox } from '../../UI';
import MangaCartVertical from '../../UI/Cards/MangaCardVertical';
import styles from './FreshChaptersList.module.scss';

interface FreshChaptersListProps {
  items: NewestChapteResult[];
}

const FreshChaptersList: FC<FreshChaptersListProps> = ({ items }) => {
  const returnCheckboxValue = (checked: boolean) => {};

  const onShowMore = () => {};
  return (
    <>
      <div className={styles.header}>
        <h5 className={styles.title}>Fresh chapters</h5>
        <div className='d-flex align-center '>
          <Checkbox returnValue={returnCheckboxValue} />
          <p className={styles.description}>Only my bookmarks</p>
        </div>
      </div>

      <div className='d-block'>
        {items.map((obj) => (
          <MangaCartVertical
            key={obj.id}
            isFreshChapter={true}
            data={obj.manga}
            chapterNumber={obj.chapter_number}
            chapterVolume={obj.volume}
            chapterDate={obj.createdAt}
            chapterName={obj.chapter_name}
          />
        ))}
      </div>

      <BlueBtn onClick={onShowMore}>Show more</BlueBtn>
    </>
  );
};

export default FreshChaptersList;
