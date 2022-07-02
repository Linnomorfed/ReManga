import { GetServerSideProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React from 'react';
import { MainLayout } from '../../../layouts/MainLayout';
import { ResponseBookmark } from '../../../models/IBookmarks';
import { ResponceManga } from '../../../models/IManga';
import { RatingResponse } from '../../../models/IRating';
import { Api } from '../../../services/api';

const MangaContent = dynamic<MangaProps>(() =>
  import('../../../components').then((mod) => mod.MangaContent)
);

interface MangaProps {
  manga: ResponceManga;
  bookmark: ResponseBookmark | null;
  ratedByUser: RatingResponse | null;
  chaptersCount: number;
}

const Manga: NextPage<MangaProps> = ({
  manga,
  bookmark,
  ratedByUser,
  chaptersCount,
}) => {
  return (
    <>
      <Head>
        <title>{'Read ' + manga.title + ' online'}</title>
        <meta name='description' content={'Read ' + manga.title + ' online'} />
      </Head>
      <MainLayout showFooter={false} headerVariant='transparent'>
        <MangaContent
          manga={manga}
          bookmark={bookmark}
          ratedByUser={ratedByUser}
          chaptersCount={chaptersCount}
        />
      </MainLayout>
    </>
  );
};

export default Manga;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const id = ctx.params?.mangaId as string;
    const obj = await Api(ctx).manga.getOneById(+id);
    const chaptersCount = await Api().chapter.getChaptersCount(+id);
    const manga = obj.manga;
    const bookmark = obj.bookmark ? obj.bookmark : null;
    const ratedByUser = obj.ratedByUser ? obj.ratedByUser : null;

    return { props: { manga, bookmark, ratedByUser, chaptersCount } };
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
};
