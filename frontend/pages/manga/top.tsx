import { GetServerSideProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';
import { MainLayout } from '../../layouts/MainLayout';
import { ResponseManga } from '../../models/IManga';
import { Api } from '../../services/api';

interface TopPageProps {
  manga: ResponseManga[];
}

const WhatToRead = dynamic<TopPageProps>(() =>
  import(/* webpackChunkName: "WhatToRead" */ '../../components').then(
    (mod) => mod.WhatToRead
  )
);

const TopPage: NextPage<TopPageProps> = ({ manga }) => {
  return (
    <MainLayout>
      <WhatToRead manga={manga} />
    </MainLayout>
  );
};

export default TopPage;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const manga = await Api().manga.getMangaTopByQuery({ take: 6 });

    return { props: { manga } };
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
