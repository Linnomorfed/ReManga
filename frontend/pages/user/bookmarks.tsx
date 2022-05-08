import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { Bookmarks } from '../../components';
import MainLayout from '../../layouts/MainLayout';
import { ResponseUser } from '../../models/IAuth';
import { ResponseBookmark } from '../../models/IBookmarks';
import { Api } from '../../services/api';
import styles from './BookmarksPage.module.scss';

interface BookmarksPageProps {
  user: ResponseUser;
  preloadedData: ResponseBookmark[];
  bookmarksCount: number[];
}

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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
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
