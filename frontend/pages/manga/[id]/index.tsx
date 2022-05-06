import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { MangaContent } from '../../../components';
import MainLayout from '../../../layouts/MainLayout';
import { ResponseBookmark } from '../../../models/IBookmarks';
import { ResponceManga } from '../../../models/IManga';
import { Api } from '../../../services/api';

interface MangaProps {
  manga: ResponceManga;
  bookmark: ResponseBookmark | null;
}

const Manga: NextPage<MangaProps> = ({ manga, bookmark }) => {
  return (
    <>
      <Head>
        <title>{'Read ' + manga.title + ' online'}</title>
        <meta name='description' content={'Read ' + manga.title + ' online'} />
      </Head>
      <MainLayout showFooter={false} bgTranparent={true}>
        <MangaContent manga={manga} bookmark={bookmark} />
      </MainLayout>
    </>
  );
};

export default Manga;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const id = ctx.params?.id as string;
    const obj = await Api(ctx).manga.getOneById(+id);
    const manga = obj.item;
    const bookmark = obj.bookmark;

    return { props: { manga, bookmark } };
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
