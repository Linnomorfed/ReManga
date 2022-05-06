import type { GetServerSideProps, NextPage } from 'next';
import { parseCookies } from 'nookies';
import {
  FreshChaptersList,
  HotNewsList,
  MostPopularList,
  Socials,
  VerticalMangaList,
} from '../components';
import MainLayout from '../layouts/MainLayout';
import { ResponceManga } from '../models/IManga';
import { Api } from '../services/api';
import styles from '../styles/Home.module.scss';

interface HomeProps {
  newestManga: ResponceManga[];
}
const newestMangaMinCount = 7;
const newestMangaMaxCount = 20;

const Home: NextPage<HomeProps> = ({ newestManga }) => {
  return (
    <MainLayout>
      <div className={styles.dashboard}>
        <MostPopularList />
        <div className='container d-flex w100p'>
          <div className={styles.left}>
            <HotNewsList />
            <FreshChaptersList />
          </div>
          <div className={styles.right}>
            {/* <VerticalMangaList
              items={newestManga}
              title={'popular today'}
              minCount={2}
              maxCount={5}
            /> */}
            <h5 className={styles.title}>We are in social networks</h5>
            <Socials />
            <VerticalMangaList
              items={newestManga}
              title={'new manga'}
              minCount={newestMangaMinCount}
              maxCount={newestMangaMaxCount}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const res = await Api(ctx).manga.getMangaByQuery({
      take: newestMangaMinCount,
    });
    const newestManga = res.items;

    return { props: { newestManga } };
  } catch (err) {
    console.warn('Newest manga ', err);
    return { props: {} };
  }
};
