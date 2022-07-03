import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { Dashboard } from '../components';
import { MainLayout } from '../layouts/MainLayout';
import {
  setNewestManga,
  setNewestPopular,
  setTodayPopular,
  setWeekPopular,
} from '../redux/Dashboard/slice';
import { wrapper } from '../redux/store';
import { Api } from '../services/api';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Read manga online - ReManga</title>
        <meta name='description' content='ReManga' />
        <link rel='icon' href='/icon.png' />
      </Head>
      <MainLayout>
        <Dashboard />
      </MainLayout>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (ctx) => {
    try {
      const newestManga = await Api(ctx).manga.getMangaByQuery({
        take: Number(process.env.NEXT_PUBLIC_NEWEST_MIN_COUNT),
      });
      const todayPopular = await Api(ctx).manga.getTodayPopular();
      const weekPopular = await Api(ctx).manga.getWeekPopular();
      const newestPopular = await Api(ctx).manga.getNewestPopular();

      store.dispatch(setWeekPopular(weekPopular));
      store.dispatch(setTodayPopular(todayPopular));
      store.dispatch(setNewestPopular(newestPopular));
      store.dispatch(setNewestManga(newestManga.items));
    } catch (err) {
      console.warn('Newest manga ', err);
    }
    return { props: {} };
  });
