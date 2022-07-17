import React from 'react';
import { BlueBtn, ChaptersList } from '../../../ui-components';
import { AddChapters } from '../AddChapter';
import styles from './Chapters.module.scss';

interface ChaptersProps {
  mangaId: number;
}

export const Chapters: React.FC<ChaptersProps> = ({ mangaId }) => {
  const [chapterPanelVisibility, setChapterPanelVisibility] =
    React.useState<boolean>(false);

  const togglePagelVisibility = () => {
    setChapterPanelVisibility(!chapterPanelVisibility);
  };

  return (
    <div>
      <BlueBtn type='manga' onClick={togglePagelVisibility}>
        Add new chapter
      </BlueBtn>

      {chapterPanelVisibility && (
        <AddChapters
          mangaId={mangaId}
          toggleVisibility={togglePagelVisibility}
          state={chapterPanelVisibility}
          setState={setChapterPanelVisibility}
        />
      )}
      <div className={styles.chapterContainer}>
        <ChaptersList mangaId={mangaId} />
      </div>
    </div>
  );
};
