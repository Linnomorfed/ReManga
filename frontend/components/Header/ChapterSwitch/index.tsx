import { useWhyDidYouUpdate } from 'ahooks';
import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';
import { SelectSvg } from '../../../assets/svgs';
import { useAppSelector } from '../../../hooks/redux';
import useOutsideClick from '../../../hooks/useOutsideClick';
import { selectChaptersData } from '../../../redux/slices/chapterSlice';
import { CircularLoader } from '../../UI';
import ChapterList from '../ChapterList';
import styles from './ChapterSwitch.module.scss';

const ChapterSwitch = () => {
  const { currentChapter, nextPageId, prevPageId, isLoading } =
    useAppSelector(selectChaptersData);

  const [chapterListVisible, setChapterListVisible] =
    React.useState<boolean>(false);

  const toggleChapterListVisibility = () => {
    setChapterListVisible(!chapterListVisible);
  };

  const { componentRef } = useOutsideClick(
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

  return (
    <div ref={componentRef}>
      <div className={styles.switch}>
        <Link href={`/manga/${currentChapter?.mangaId}/${prevPageId}`}>
          <a
            className={classNames(
              styles.switchBtn,
              `${!prevPageId ? styles.switchBtnDisabled : ''}`
            )}>
            <SelectSvg w={24} fill='white' />
          </a>
        </Link>
        <button
          className={styles.switchBtn}
          onClick={toggleChapterListVisibility}>
          Chapter {currentChapter?.chapter_number}
        </button>
        <Link href={`/manga/${currentChapter?.mangaId}/${nextPageId}`}>
          <a
            className={classNames(
              styles.switchBtn,
              `${!nextPageId ? styles.switchBtnDisabled : ''}`
            )}>
            <SelectSvg w={24} fill='white' />
          </a>
        </Link>
      </div>
      {chapterListVisible && <ChapterList />}
    </div>
  );
};

export default ChapterSwitch;
