import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React from 'react';
import { MainLayout } from '../../../layouts/MainLayout';
import { Api } from '../../../services/api';
import { wrapper } from '../../../redux/store';
import {
  setBookmark,
  setChaptersCount,
  setMangaBookmarkId,
  setMangaData,
  setRatedByUser,
} from '../../../redux/MangaData/slice';
import { selectMangaTitleForHeader } from '../../../redux/MangaData/selectors';
import { useAppSelector } from '../../../hooks/redux';

const MangaContent = dynamic<{}>(() =>
  import(/* webpackChunkName: "MangaPanel" */ '../../../components').then(
    (mod) => mod.MangaContent
  )
);

const Manga: NextPage = ({}) => {
  const title = useAppSelector(selectMangaTitleForHeader);
  return (
    <>
      <Head>
        <title>{'Read ' + title + ' online'}</title>
        <meta name='description' content={'Read ' + title + ' online'} />
      </Head>
      <MainLayout showFooter={false} headerVariant='transparent'>
        <MangaContent />
      </MainLayout>
    </>
  );
};

export default Manga;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(
    (store) => async (ctx: GetServerSidePropsContext) => {
      try {
        const id = ctx.params?.mangaId as string;
        const obj = await Api(ctx).manga.getOneById(+id);
        const chaptersCount = await Api().chapter.getChaptersCount(+id);
        const manga = obj.manga;
        const bookmark = obj.bookmark ? obj.bookmark : null;
        const ratedByUser = obj.ratedByUser ? obj.ratedByUser : null;

        store.dispatch(setMangaData(manga));
        store.dispatch(setChaptersCount(chaptersCount));
        ratedByUser && store.dispatch(setRatedByUser(ratedByUser));
        bookmark &&
          (store.dispatch(setMangaBookmarkId(bookmark.bookmarkId)),
          store.dispatch(setBookmark(bookmark)));
      } catch (err) {
        console.warn('Manga loading error', err);
        return {
          redirect: {
            destination: '/404',
            permament: false,
          },
          props: {},
        };
      }
      return { props: {} };
    }
  );
