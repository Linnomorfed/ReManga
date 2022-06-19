import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { Chapter } from '../../../../components';
import MainLayout from '../../../../layouts/MainLayout';
import { CertainChaptersResult } from '../../../../models/IChapter';
import { Api } from '../../../../services/api';

interface ChapterPageProps {
  chapter: CertainChaptersResult;
  nextPageId: number | null;
  prevPageId: number | null;
}

const ChapterPage: NextPage<ChapterPageProps> = ({
  chapter,
  nextPageId,
  prevPageId,
}) => {
  return (
    <>
      <Head>
        <title>{'Read  online'}</title>
        <meta name='description' content={'Read  online'} />
      </Head>
      <MainLayout showFooter={false} headerVariant='chapter'>
        <Chapter
          chapter={chapter}
          nextPageId={nextPageId}
          prevPageId={prevPageId}
        />
      </MainLayout>
    </>
  );
};

export default ChapterPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const chapterId = ctx.params?.chapterId as string;
    const mangaId = ctx.params?.mangaId as string;

    const res = await Api(ctx).chapter.getCertainChapter(+chapterId);

    if (res.content.mangaId !== Number(mangaId)) {
      return {
        redirect: {
          destination: '/404',
          permament: false,
        },
        props: {},
      };
    }

    return {
      props: {
        chapter: res.content,
        nextPageId: res.nextPageId,
        prevPageId: res.prevPageId,
      },
    };
  } catch (err) {
    console.warn('Chapter loading error', err);
    return {
      redirect: {
        destination: '/404',
        permament: false,
      },
      props: {},
    };
  }
};
