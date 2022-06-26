import React, { FC } from 'react';
import useDidMountEffect from '../../../hooks/useDidMountEffect';
import { NewestChapteResult } from '../../../models/IChapter';
import { Api } from '../../../services/api';
import { BlueBtn, Checkbox } from '../../UI';
import MangaCartVertical from '../../UI/Cards/MangaCardVertical';
import styles from './FreshChaptersList.module.scss';

interface FreshChaptersListProps {
  items: NewestChapteResult[];
}

const FreshChaptersList: FC<FreshChaptersListProps> = ({ items }) => {
  const [chapterItems, setChapterItems] =
    React.useState<NewestChapteResult[]>(items);
  const [isOnlyMyBookmarks, setIsOnlyMyBookmarks] =
    React.useState<boolean>(false);

  const returnCheckboxValue = (checked: boolean) => {
    setIsOnlyMyBookmarks(checked);
  };

  useDidMountEffect(() => {
    (async () => {
      try {
        const manga = await Api().chapter.getNewestChapters({
          isOnlyMyBookmarks: isOnlyMyBookmarks ? 1 : 0,
        });
        console.log(manga);

        setChapterItems(manga);
      } catch (err) {
        console.warn('Loading newest chapters ', err);
      }
    })();
  }, [isOnlyMyBookmarks]);

  const onShowMore = () => {};
  return (
    <>
      <div className={styles.header}>
        <h5 className={styles.title}>Fresh chapters</h5>
        <div className='d-flex align-center'>
          <Checkbox returnValue={returnCheckboxValue} />
          <p className={styles.description}>Only my bookmarks</p>
        </div>
      </div>

      <div className='d-block'>
        {chapterItems &&
          chapterItems.map((obj) => (
            <MangaCartVertical
              key={obj.id}
              isFreshChapter={true}
              data={obj.manga}
              chapterNumber={obj.chapter_number}
              chapterVolume={obj.volume}
              chapterDate={obj.createdAt}
              chapterName={obj.chapter_name}
              isPaid={obj.isPaid}
              repeatsCount={obj.repeatsCount}
            />
          ))}
      </div>

      <BlueBtn onClick={onShowMore}>Show more</BlueBtn>
    </>
  );
};

export default FreshChaptersList;
