import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';
import { SelectSvg } from '../../../assets/svgs';
import { useAppSelector } from '../../../hooks/redux';
import { selectChaptersData } from '../../../redux/slices/chapterSlice';
import styles from './ToggleChapter.module.scss';

const ToggleChapter: React.FC = () => {
  const { currentChapter, nextPageId, prevPageId } =
    useAppSelector(selectChaptersData);

  return (
    <div className={styles.toggleChapter}>
      <Link href={`/manga/${currentChapter?.mangaId}/${prevPageId}`}>
        <a
          className={classNames(
            styles.toggleChapterBtn,
            `${!prevPageId ? styles.toggleChapterBtnDisabled : ''}`
          )}>
          <SelectSvg fill={'white'} w={24} h={24} />
          Previous
        </a>
      </Link>
      <Link href={`/manga/${currentChapter?.mangaId}`}>
        <a className={styles.toggleChapterBtn}>To the manga</a>
      </Link>
      <Link href={`/manga/${currentChapter?.mangaId}/${nextPageId}`}>
        <a
          className={classNames(
            styles.toggleChapterBtn,
            `${!nextPageId ? styles.toggleChapterBtnDisabled : ''}`
          )}>
          Next <SelectSvg fill={'white'} w={24} h={24} />
        </a>
      </Link>
    </div>
  );
};

export default ToggleChapter;
