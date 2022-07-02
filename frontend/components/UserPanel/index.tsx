import React from 'react';
import { useAppSelector } from '../../hooks/redux';
import { ResponseUser } from '../../models/IAuth';
import { ResponseBookmark } from '../../models/IBookmarks';
import { Bookmarks } from '../Bookmarks';
import { Header } from './UserPanelHeader';
import { Publishers } from './Publishers';
import styles from './UserPanel.module.scss';
import { selectUserData } from '../../redux/User/selectors';

interface UserPanelProps {
  user: ResponseUser;
  preloadedData: ResponseBookmark[];
  bookmarksCount: number[];
}

export const UserPanel: React.FC<UserPanelProps> = ({
  user,
  preloadedData,
  bookmarksCount,
}) => {
  const userData = useAppSelector(selectUserData);
  return (
    <>
      <Header
        userId={user.id}
        nickname={user.nickname}
        currentUserId={userData?.id}
        leftCommentsCount={user.left_comments}
        likedChapters={user.liked_chapters}
      />
      <div className='container d-flex'>
        <div className={styles.left}>
          {user.id === userData?.id && <Publishers />}
        </div>
        <div className={styles.right}>
          <Bookmarks
            userId={user.id}
            preloadedData={preloadedData}
            preloadedBookmarksCount={bookmarksCount}
          />
        </div>
      </div>
    </>
  );
};
