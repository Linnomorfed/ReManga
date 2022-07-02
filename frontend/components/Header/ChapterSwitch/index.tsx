import { useWhyDidYouUpdate } from 'ahooks';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { SelectSvg } from '../../../assets/svgs';
import { useAppSelector } from '../../../hooks/redux';
import useOutsideClick from '../../../hooks/useOutsideClick';
import { selectChaptersData } from '../../../redux/Chapter/selectors';
import { CircularLoader } from '../../UI';
import { ChapterList } from '../ChapterList';
import styles from './ChapterSwitch.module.scss';

export const ChapterSwitch = () => {
  const router = useRouter();

  const { currentChapter, nextPageId, prevPageId, isLoading } =
    useAppSelector(selectChaptersData);

  const [chapterListVisible, setChapterListVisible] =
    React.useState<boolean>(false);

  const { toggleVisibility, componentRef } = useOutsideClick(
    chapterListVisible,
    setChapterListVisible
  );

  if (isLoading) {
    return (
      <div className='d-flex align-center'>
        <CircularLoader isSmall={true} />
      </div>
    );
  }

  const toNextChapter = () => {
    nextPageId &&
      router.push(`/manga/${currentChapter?.mangaId}/${nextPageId}`);
    setChapterListVisible(false);
  };
  const toPrevChapter = () => {
    prevPageId &&
      router.push(`/manga/${currentChapter?.mangaId}/${prevPageId}`);
    setChapterListVisible(false);
  };

  return (
    <div ref={componentRef}>
      <div className={styles.switch}>
        <button
          onClick={toPrevChapter}
          className={classNames(
            styles.switchBtn,
            `${!prevPageId ? styles.switchBtnDisabled : ''}`
          )}>
          <SelectSvg w={24} fill='white' />
        </button>
        <button className={styles.switchBtn} onClick={toggleVisibility}>
          Chapter {currentChapter?.chapter_number}
        </button>
        <button
          onClick={toNextChapter}
          className={classNames(
            styles.switchBtn,
            `${!nextPageId ? styles.switchBtnDisabled : ''}`
          )}>
          <SelectSvg w={24} fill='white' />
        </button>
      </div>
      {chapterListVisible && <ChapterList />}
    </div>
  );
};
