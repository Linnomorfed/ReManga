import classNames from 'classnames';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { CertainChaptersResult } from '../../models/IChapter';
import { fetchChapters } from '../../redux/Chapter/actions';
import { selectChaptersData } from '../../redux/Chapter/selectors';
import {
  setCurrentChapter,
  setNextPageId,
  setPrevPageId,
} from '../../redux/Chapter/slice';

import { Comments } from '../Comments';
import styles from './Chapter.module.scss';
import { ChapterImages } from './ChapterImages';
import { ChapterPanel } from './Panel';
import { ScrollTopBtn } from './ScrollTopBtn';
import { ToggleChapter } from './ToggleChapter';
import { TranslatorTeam } from './TranslatorTeam';
import { Сompletion } from './Сompletion';

interface ChapterProps {
  chapter: CertainChaptersResult;
  nextPageId: number | null;
  prevPageId: number | null;
}

export const Chapter: React.FC<ChapterProps> = ({
  chapter,
  prevPageId,
  nextPageId,
}) => {
  const dispatch = useAppDispatch();
  const { activePanelId } = useAppSelector(selectChaptersData);

  React.useEffect(() => {
    dispatch(fetchChapters({ mangaId: chapter.mangaId }));
    dispatch(setCurrentChapter(chapter));
    dispatch(setNextPageId(nextPageId));
    dispatch(setPrevPageId(prevPageId));
  }, [chapter.mangaId, chapter, nextPageId, prevPageId]);

  return (
    <div
      className={classNames(
        styles.container,
        `${activePanelId !== 0 ? styles.containerPanel : ''}`
      )}>
      <div className={styles.wrapper}>
        <ChapterImages images={chapter.pages} />
        <Сompletion
          chapterId={chapter.id}
          rated={chapter.rated}
          likesCount={chapter.likes_count}
        />
        <TranslatorTeam />
        <ToggleChapter />
        <div className={styles.commentsWrapper}>
          <Comments mangaId={chapter.mangaId} chapterId={chapter.id} />
        </div>
      </div>
      <ChapterPanel />
      <ScrollTopBtn />
    </div>
  );
};
