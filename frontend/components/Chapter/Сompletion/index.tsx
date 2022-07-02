import classNames from 'classnames';
import React from 'react';
import { EmptyHeartSvg, HeartSvg } from '../../../assets/svgs';
import { Api } from '../../../services/api';
import styles from './Сompletion.module.scss';

interface СompletionProps {
  chapterId: number;
  rated: boolean;
  likesCount: number;
}

export const Сompletion: React.FC<СompletionProps> = ({
  chapterId,
  rated,
  likesCount,
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
    <div className={styles.completion}>
      <div className={styles.completionHeader}>
        <div className={styles.completionHeaderContainer}>
          <h3 className={styles.title}> – End of the chapter –</h3>
          <h6 className={styles.subtitle}>
            Did you like the chapter? Say thanks to the translator!
          </h6>
          <div className='d-flex jc-center'>
            <button
              onClick={likeTheChapter}
              disabled={likedChapter}
              className={classNames(
                styles.thxBtn,
                `${likedChapter ? styles.thxBtnDisabled : ''}`
              )}>
              Thanks
              {likedChapter ? (
                <HeartSvg fill='white' w={16} />
              ) : (
                <EmptyHeartSvg fill='white' w={16} />
              )}
            </button>
          </div>
          <p className={styles.likesCount}>Said thanks: {likesCount}</p>
        </div>
      </div>
    </div>
  );
};
