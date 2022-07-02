import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchChapters } from '../../redux/Chapter/actions';
import { selectChaptersData } from '../../redux/Chapter/selectors';
import { BlueBtn } from '../UI/BlueBtn';
import { CircularLoader } from '../UI/Loaders/CircularLoader';
import { ChapterItem } from './ChapterItem';
import styles from './ChaptersList.module.scss';

interface ChapterListProps {
  variant?: 'manga' | 'chapter';
  mangaId?: number;
}

export const ChaptersList: React.FC<ChapterListProps> = ({
  variant = 'manga',
  mangaId,
}) => {
  const dispatch = useAppDispatch();
  const { isLoading, error, mangaChapters, currentChapter } =
    useAppSelector(selectChaptersData);

  const [orderBy, setOrderBy] = React.useState<'DESC' | 'ASC'>('DESC');
  const [viewingOrder, setViewingOrder] = React.useState<boolean>(false);

  const toggleViewingOrder = () => {
    setOrderBy(!viewingOrder ? 'ASC' : 'DESC');
    setViewingOrder(!viewingOrder);
  };

  const fetchMangaChapters = () => {
    if (currentChapter) {
      dispatch(fetchChapters({ mangaId: currentChapter.mangaId, orderBy }));
    } else if (mangaId) {
      dispatch(fetchChapters({ mangaId, orderBy }));
    }
  };

  const reloadChapters = () => {
    fetchMangaChapters();
  };

  React.useEffect(() => {
    fetchMangaChapters();
  }, [orderBy]);

  if (isLoading) {
    return (
      <div className={styles.loaderWrapper}>
        <CircularLoader />
      </div>
    );
  }
  return (
    <>
      {!error && !isLoading && mangaChapters.length > 0 && (
        <button className={styles.btn} onClick={toggleViewingOrder}>
          {viewingOrder ? 'Show from start' : 'Show from end'}
        </button>
      )}

      {error && (
        <div className={styles.errorWrapper}>
          <h6 className={styles.errorTitle}>{error}</h6>
          <BlueBtn type='manga' onClick={reloadChapters}>
            Reload
          </BlueBtn>
        </div>
      )}
      {mangaChapters &&
        !error &&
        mangaChapters.map((obj) => (
          <ChapterItem
            key={obj.id}
            chapterId={obj.id}
            currentChapterId={currentChapter?.id}
            chapter={obj.chapter_number}
            volume={obj.volume}
            createdAt={obj.createdAt}
            likesCount={obj.likes_count}
            rated={obj.rated}
            mangaId={obj.mangaId}
            isPaid={obj.isPaid}
            variant={variant}
          />
        ))}
    </>
  );
};
