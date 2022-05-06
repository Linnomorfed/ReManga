import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { UserPanel } from '../../../components';
import MainLayout from '../../../layouts/MainLayout';
import { ResponseUser } from '../../../models/IAuth';
import { ResponseBookmark } from '../../../models/IBookmarks';
import { Api } from '../../../services/api';

interface UserPageProps {
  user: ResponseUser;
  preloadedData: ResponseBookmark[];
  bookmarksCount: number[];
}

const UserPage: NextPage<UserPageProps> = ({
  user,
  preloadedData,
  bookmarksCount,
}) => {
  return (
    <MainLayout>
      <UserPanel
        user={user}
        preloadedData={preloadedData}
        bookmarksCount={bookmarksCount}
      />
    </MainLayout>
  );
};

export default UserPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const id = ctx.params?.id as string;
    const items = await Api().user.getUserById(+id);

    return {
      props: {
        user: items.data,
        preloadedData: items.preloadedData,
        bookmarksCount: items.bookmarksCount,
      },
    };
  } catch (err) {
    console.warn('User loading error', err);
    return {
      redirect: {
        destination: '/404',
        permament: false,
      },
      props: {},
    };
  }
};
