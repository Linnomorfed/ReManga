import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import {
  Dashboard,
} from '../components';
import MainLayout from '../layouts/MainLayout';
import { NewestChapteResult } from '../models/IChapter';
import { ResponceManga } from '../models/IManga';
import { Api } from '../services/api';

interface HomeProps {
  newestManga: ResponceManga[];
  weekPopular: ResponceManga[];
  newestPopular: ResponceManga[];
  todayPopular: ResponceManga[];
  newestChapters: NewestChapteResult[];
}

const Home: NextPage<HomeProps> = ({ newestManga, todayPopular, weekPopular, newestPopular, newestChapters }) => {

  return (
    <>
      <Head>
        <title>Read manga online - ReManga</title>
        <meta name='description' content='ReManga' />
        <link rel='icon' href='/icon.png' />
      </Head>
      <MainLayout>
        <Dashboard newestManga={newestManga} weekPopular={weekPopular} todayPopular={todayPopular} newestChapters={newestChapters} newestPopular={newestPopular} />
      </MainLayout >
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {

    const newestManga = await Api(ctx).manga.getMangaByQuery({
      take: Number(process.env.NEXT_PUBLIC_NEWEST_MIN_COUNT),
    });
    const todayPopular = await Api(ctx).manga.getTodayPopular();
    const weekPopular = await Api(ctx).manga.getWeekPopular();
    const newestPopular = await Api(ctx).manga.getNewestPopular();
    const newestChapters = await Api(ctx).chapter.getNewestChapters();

    return { props: { newestManga: newestManga.items, todayPopular, weekPopular, newestPopular, newestChapters } };
  } catch (err) {
    console.warn('Newest manga ', err);
    return { props: {} };
  }
};
