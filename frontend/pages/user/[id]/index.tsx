import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';
import { MainLayout } from '../../../layouts/MainLayout';
import { ResponseUser } from '../../../models/IAuth';
import { ResponseBookmark } from '../../../models/IBookmarks';
import { Api } from '../../../services/api';

interface UserPageProps {
  user: ResponseUser;
  preloadedData: ResponseBookmark[];
  bookmarksCount: number[];
}

const UserPanel = dynamic<UserPageProps>(() =>
  import(/* webpackChunkName: "UserPanel" */ '../../../components').then(
    (mod) => mod.UserPanel
  )
);

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

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
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
