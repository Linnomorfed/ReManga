import React from 'react';
import styles from './MangaContent.module.scss';
import { TabBtn } from '../UI';
import VerticalMangaList from '../VerticalMangaList';
import MangaCartVertical from '../MangaCardVertical';
import Comments from '../Comments';
import { ResponceManga } from '../../models/IManga';
import { ResponseBookmark } from '../../models/IBookmarks';
import Description from './Description';
import LeftPanel from './LeftPanel';
import MangaInfo from './MangaInfo';
import Chapters from './Chapters';
import { RatingResponse } from '../../models/IRating';

interface MangaContentProps {
  manga: ResponceManga;
  bookmark: ResponseBookmark | null;
  ratedByUser: RatingResponse | null;
}

const MangaContent: React.FC<MangaContentProps> = ({
  manga,
  bookmark,
  ratedByUser,
}) => {
  const [activeTab, setActiveTab] = React.useState<number>(1);

  const onTabClick = (id: number) => {
    setActiveTab(id);
  };

  return (
    <>
      <div className='container d-flex'>
        <LeftPanel
          url={manga.image.url}
          title={manga.title}
          bookmark={bookmark}
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
          ratedByUser={ratedByUser}
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
                Chapters (180)
              </TabBtn>
            </div>

            {activeTab === 1 && (
              <Description
                genres={manga.genres}
                categories={manga.categories}
                blocks={manga.blocks}
              />
            )}

            {activeTab === 2 && <Chapters />}
            <Comments mangaId={manga.id} />
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

export default MangaContent;
