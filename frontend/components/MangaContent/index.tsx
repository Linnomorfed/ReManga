import React from 'react';
import styles from './MangaContent.module.scss';
import { TabBtn } from '../UI';
import { Comments } from '../Comments';
import { Description } from './Description';
import { LeftPanel } from './LeftPanel';
import { MangaInfo } from './MangaInfo';
import { Chapters } from './Chapters';
import { selectMangaData } from '../../redux/MangaData/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useRouter } from 'next/router';
import { setCurrentChapter } from '../../redux/Chapter/slice';

export const MangaContent: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { manga, chaptersCount } = useAppSelector(selectMangaData);

  const [activeTab, setActiveTab] = React.useState<number>(1);

  const onTabClick = (id: number) => {
    setActiveTab(id);
  };

  React.useEffect(() => {
    dispatch(setCurrentChapter(null));
  }, []);

  if (!manga) {
    router.push('/404');
    return null;
  }
  return (
    <>
      <div className='container d-flex'>
        <LeftPanel
          url={manga.image.url}
          title={manga.title}
          mangaId={manga.id}
        />

        <MangaInfo
          mangaId={manga.id}
          otherTitles={manga.otherTitles}
          title={manga.title}
          status={manga.status.name}
          type={manga.type.name}
          views={manga.views}
          issueYear={manga.issueYear}
          rating={manga.rating}
          votesCount={manga.votes_count}
          likesCount={manga.likes_count}
        />
      </div>
      <div className={styles.body}>
        <div className='container d-flex'>
          <div className={styles.querterBody}></div>
          <div className={styles.half}>
            <div className={styles.tabs}>
              <TabBtn active={activeTab} onClick={onTabClick} id={1}>
                Description
              </TabBtn>
              <TabBtn active={activeTab} onClick={onTabClick} id={2}>
                Chapters ({chaptersCount})
              </TabBtn>
            </div>

            {activeTab === 1 && (
              <>
                <Description
                  genres={manga.genres}
                  categories={manga.categories}
                  blocks={manga.blocks}
                />
                <Comments mangaId={manga.id} />
              </>
            )}

            {activeTab === 2 && <Chapters mangaId={manga.id} />}
          </div>
          <div className={styles.querter}>
            <div className={styles.rightMangaContainer}>
              <h5 className={styles.subTitle}>Translators</h5>
              {/* <MangaCartVertical /> */}
            </div>
            {/* <VerticalMangaList title={'Similar'} minCount={5} maxCount={20} /> */}
          </div>
        </div>
      </div>
    </>
  );
};
