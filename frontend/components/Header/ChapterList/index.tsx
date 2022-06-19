import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';
import { LockSvg } from '../../../assets/svgs';
import { useAppSelector } from '../../../hooks/redux';
import { selectChaptersData } from '../../../redux/slices/chapterSlice';
import styles from './ChapterList.module.scss';

const ChapterList: React.FC = () => {
  const { mangaChapters, currentChapter } = useAppSelector(selectChaptersData);

  return (
    <div className={styles.wrapper}>
      <div className={styles.chapterList}>
        {mangaChapters &&
          mangaChapters.map((obj) => (
            <Link key={obj.id} href={`/manga/${obj.mangaId}/${obj.id}`}>
              <a
                className={classNames(
                  styles.chapterListElement,
                  `${
                    currentChapter?.id === obj.id
                      ? styles.chapterListElementActive
                      : ''
                  }`
                )}>
                Chapter {obj.volume} - {obj.chapter_number}
                {obj.isPaid && <LockSvg w={14} />}
              </a>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default ChapterList;
