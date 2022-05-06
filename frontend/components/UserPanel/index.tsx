import React from 'react';
import { useAppSelector } from '../../hooks/redux';
import { ResponseUser } from '../../models/IAuth';
import { ResponseBookmark } from '../../models/IBookmarks';
import { selectUserData } from '../../redux/slices/userSlice';
import Bookmarks from './Bookmarks';
import Header from './Header';
import Publishers from './Publishers';
import styles from './UserPanel.module.scss';

interface UserPanelProps {
  user: ResponseUser;
  preloadedData: ResponseBookmark[];
  bookmarksCount: number[];
}

const UserPanel: React.FC<UserPanelProps> = ({
  user,
  preloadedData,
  bookmarksCount,
}) => {
  const userData = useAppSelector(selectUserData);
  return (
    <div className='wrapper'>
      <Header
        userId={user.id}
        nickname={user.nickname}
        currentUserId={userData?.id}
        leftCommentsCount={user.left_comments}
      />
      <div className='container d-flex'>
        <div className={styles.left}>
          {user.id === userData?.id && <Publishers />}
        </div>
        <div className={styles.right}>
          <Bookmarks
            userId={user.id}
            preloadedData={preloadedData}
            bookmarksCount={bookmarksCount}
          />
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
