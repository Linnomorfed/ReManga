import React from 'react';
import { NewestChapteResult } from '../../models/IChapter';
import { ResponceManga } from '../../models/IManga';
import FreshChaptersList from './FreshChaptersList';
import Socials from '../Socials';
import { Carousel } from '../UI';
import VerticalMangaList from './VerticalMangaList';
import styles from './Dashboard.module.scss';

interface DashboardProps {
  newestManga: ResponceManga[];
  weekPopular: ResponceManga[];
  newestPopular: ResponceManga[];
  todayPopular: ResponceManga[];
  newestChapters: NewestChapteResult[];
}

const Dashboard: React.FC<DashboardProps> = ({
  weekPopular,
  todayPopular,
  newestManga,
  newestPopular,
  newestChapters,
}) => {
  return (
    <div className={styles.dashboard}>
      <Carousel items={weekPopular} variant='popular' />
      <div className='container d-flex w100p'>
        <div className={styles.left}>
          <Carousel items={newestPopular} variant='new' title='Hot news' />
          <FreshChaptersList items={newestChapters} />
        </div>
        <div className={styles.right}>
          <VerticalMangaList
            items={todayPopular}
            variant='popularToday'
            title={'popular today'}
            minCount={Number(process.env.NEXT_PUBLIC_TODAY_POPULAR_MIN_COUNT)}
            maxCount={Number(process.env.NEXT_PUBLIC_TODAY_POPULAR_MAX_COUNT)}
          />
          <h5 className={styles.title}>We are in social networks</h5>
          <Socials />
          <VerticalMangaList
            items={newestManga}
            title={'new manga'}
            variant='newest'
            minCount={Number(process.env.NEXT_PUBLIC_NEWEST_MIN_COUNT)}
            maxCount={Number(process.env.NEXT_PUBLIC_NEWEST_MAX_COUNT)}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
