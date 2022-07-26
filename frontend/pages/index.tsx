import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { MainLayout } from '../layouts/MainLayout';
import {
  setNewestManga,
  setNewestPopular,
  setTodayPopular,
  setWeekPopular,
} from '../redux/Dashboard/slice';
import { wrapper } from '../redux/store';
import { Api } from '../services/api';

const Dashboard = dynamic<{}>(() =>
  import(/* webpackChunkName: "Dashboard" */ '../components').then(
    (mod) => mod.Dashboard
  )
);

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Read manga online - ReManga</title>
        <meta name='description' content='ReManga' />
      </Head>
      <MainLayout>
        <Dashboard />
      </MainLayout>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(
    (store) => async (ctx: GetServerSidePropsContext) => {
      const takeNumber = Number(process.env.NEXT_PUBLIC_NEWEST_MIN_COUNT);

      try {
        const newestManga = await Api(ctx).manga.getMangaByQuery({
          take: +takeNumber,
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
    }
  );
