import React from 'react';
import { EmptyHeartSvg, HeartSvg, LockSvg } from '../../../assets/svgs';
import classNames from 'classnames';
import { Api } from '../../../services/api';
import Link from 'next/link';
import styles from './ChapterItem.module.scss';

interface ChapterItemProps {
  chapter: number;
  volume: number;
  likesCount: number;
  chapterId: number;
  currentChapterId: number | undefined;
  mangaId: number;
  createdAt: string;
  rated: boolean;
  variant?: 'manga' | 'chapter';
  isPaid: boolean;
}

export const ChapterItem: React.FC<ChapterItemProps> = ({
  chapter,
  volume,
  createdAt,
  likesCount,
  chapterId,
  currentChapterId,
  mangaId,
  rated,
  isPaid,
  variant = 'manga',
}) => {
  const [likedChapter, setLikedChapter] = React.useState<boolean>(rated);
  const [chapterLikesCount, setChapterLikesCount] =
    React.useState<number>(likesCount);

  const likeTheChapter = async () => {
    try {
      if (!likedChapter) {
        await Api().chapter.likeTheChapter({ chapterId });
        setLikedChapter(true);
        setChapterLikesCount(chapterLikesCount + 1);
      }
    } catch (err) {
      console.warn('Like the chapter ', err);
    }
  };

  return (
    <Link href={`/manga/${mangaId}/${chapterId}`} passHref>
      <div
        className={classNames(
          styles.chapterItem,
          `${chapterId === currentChapterId ? styles.chapterItemActive : ''}`
        )}>
        <span
          className={classNames(
            styles.volume,
            `${chapterId === currentChapterId ? styles.volumeActive : ''}`
          )}>
          {volume}
        </span>
        <a className={styles.link}>
          <h6 className={styles.chapter}>Chapter {chapter}</h6>
          {variant === 'manga' && (
            <div className={styles.team}>Assley Team {createdAt}</div>
          )}
        </a>
        {variant === 'manga' ? (
          <div className={styles.rightPart}>
            <span className={styles.lock}>{isPaid && <LockSvg />}</span>
            <button
              onClick={likeTheChapter}
              disabled={likedChapter}
              className={classNames(
                styles.likeBtn,
                `${likedChapter ? styles.likeBtnLiked : ''}`
              )}>
              {likedChapter ? (
                <HeartSvg fill='#ffb400' w={16} />
              ) : (
                <EmptyHeartSvg fill='#ffb400' w={16} />
              )}
              {chapterLikesCount}
            </button>
          </div>
        ) : (
          <span className={styles.lockChapter}>{isPaid && <LockSvg />}</span>
        )}
      </div>
    </Link>
  );
};
