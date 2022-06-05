import React from 'react';
import { ChapterResult } from '../../../models/IChapter';
import { Api } from '../../../services/api';
import { BlueBtn, CircularLoader } from '../../UI';
import AddChapters from '../AddChapter';
import ChapterItem from './ChapterItem';
import styles from './Chapters.module.scss';

interface ChaptersProps {
  mangaId: number
}

const Chapters: React.FC<ChaptersProps> = ({ mangaId }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [chapterPanelVisibility, setChapterPanelVisibility] = React.useState<boolean>
    (false);
  const [viewingOrder, setViewingOrder] = React.useState<boolean>(false)
  const [chapters, setChapters] = React.useState<ChapterResult[]>([])
  const [orderBy, setOrderBy] = React.useState<'DESC' | 'ASC'>('DESC')

  const togglePagelVisibility = () => {
    setChapterPanelVisibility(!chapterPanelVisibility)
  }
  const toggleViewingOrder = () => {
    setOrderBy(!viewingOrder ? 'ASC' : 'DESC');
    setViewingOrder(!viewingOrder);
  }

  React.useEffect(() => {
    (async () => {
      try {
        const chapters = await Api().chapter.getMangaChapters({ mangaId, orderBy });
        setChapters(chapters)
        setIsLoading(!isLoading)
      } catch (err) {
        console.log('Chapters loading ', err);
      }
    })()
  }, [orderBy])
  return (
    <div>


      <BlueBtn type='manga' onClick={togglePagelVisibility}> Add new chapter</BlueBtn>

      {chapterPanelVisibility &&
        <AddChapters mangaId={mangaId}
          toggleVisibility={togglePagelVisibility}
          state={chapterPanelVisibility}
          setState={setChapterPanelVisibility} />}
      <div className={styles.chapterContainer}>
        {isLoading ? <div className={styles.loaderContainer}>
          <CircularLoader />
        </div> :
          <>
            <button className={styles.btn} onClick={toggleViewingOrder}>{viewingOrder ? 'Show from start' : 'Show from end'}
            </button>

            {chapters && chapters.map((obj) => (
              <ChapterItem key={obj.id} chapter={obj.chapter_number} volume={obj.volume} createdAt={obj.createdAt} likes={obj.likes} />

            ))}
          </>}


      </div>
    </div >
  );
};

export default Chapters;
