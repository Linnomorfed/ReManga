import React, { FC } from 'react';
import { NewestChapteResult } from '../../../models/IChapter';
import { Api } from '../../../services/api';
import { BlueBtn, Checkbox } from '../../../ui-components';
import { MangaCartVertical } from '../../../ui-components/Cards/MangaCardVertical';
import { NewestChapterLoader } from '../../../ui-components/Loaders/NewestChapterLoader';
import styles from './FreshChaptersList.module.scss';

export const FreshChaptersList: FC = () => {
  const [chapterItems, setChapterItems] = React.useState<NewestChapteResult[]>(
    []
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isOnlyMyBookmarks, setIsOnlyMyBookmarks] =
    React.useState<boolean>(false);

  const returnCheckboxValue = (checked: boolean) => {
    setIsOnlyMyBookmarks(checked);
  };

  React.useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const manga = await Api().chapter.getNewestChapters({
          isOnlyMyBookmarks: isOnlyMyBookmarks ? 1 : 0,
        });
        setChapterItems(manga);
      } catch (err) {
        console.warn('Loading newest chapters ', err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [isOnlyMyBookmarks]);

  const onShowMore = () => {};

  return (
    <>
      <div className={styles.header}>
        <h5 className={styles.title}>Fresh chapters</h5>
        <div className='d-flex align-center'>
          <Checkbox returnValue={returnCheckboxValue} loggedInOnly />
          <p className={styles.description}>Only my bookmarks</p>
        </div>
      </div>

      <div className='d-block'>
        {isLoading ? (
          Array.from(Array(3), (_, i) => <NewestChapterLoader key={i} />)
        ) : (
          <>
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
          </>
        )}
      </div>

      {/* <BlueBtn onClick={onShowMore}>Show more</BlueBtn> */}
    </>
  );
};
