import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';
import { BookmarksProps } from '../../components/Bookmarks/IBookmarksProps';
import { MainLayout } from '../../layouts/MainLayout';
import { ResponseUser } from '../../models/IAuth';
import { ResponseBookmark } from '../../models/IBookmarks';
import { Api } from '../../services/api';

interface BookmarksPageProps {
  user: ResponseUser;
  preloadedData: ResponseBookmark[];
  bookmarksCount: number[];
}

const Bookmarks = dynamic<BookmarksProps>(() =>
  import(/* webpackChunkName: "Bookmarks" */ '../../components').then(
    (mod) => mod.Bookmarks
  )
);

const BookmarksPage: NextPage<BookmarksPageProps> = ({
  user,
  preloadedData,
  bookmarksCount,
}) => {
  return (
    <MainLayout>
      <Bookmarks
        userId={user.id}
        preloadedData={preloadedData}
        preloadedBookmarksCount={bookmarksCount}
        type='bookmarks'
      />
    </MainLayout>
  );
};

export default BookmarksPage;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  try {
    const user = await Api(ctx).user.getCurrentUser();
    const items = await Api(ctx).user.getUserById(+user.id);

    return {
      props: {
        user: items.data,
        preloadedData: items.preloadedData,
        bookmarksCount: items.bookmarksCount,
      },
    };
  } catch (err) {
    console.warn('User bookmarks loading error', err);
    return {
      redirect: {
        destination: '/',
        permament: false,
      },
      props: {},
    };
  }
};
