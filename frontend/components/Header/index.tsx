import React, { FC } from 'react';
import styles from './Header.module.scss';
import {
  BookmarkSvg,
  LogoSvg,
  NotificationSvg,
  RandomSvg,
  ThemeSvg,
} from '../../assets/svgs';
import classnames from 'classnames';
import UserPopup from '../UserPopup';
import Link from 'next/link';
import classNames from 'classnames';
import AuthDialog from '../AuthDialog';
import { useAppSelector } from '../../hooks/redux';
import { selectUserData } from '../../redux/slices/userSlice';
import UserAvatar from '../UI/UserAvatar';
import useOutsideClick from '../../hooks/useOutsideClick';
import Search from './Search';

interface HeaderProps {
  bgTranparent: boolean;
}

const Header: FC<HeaderProps> = ({ bgTranparent }) => {
  const userData = useAppSelector(selectUserData);

  const NotificationCount = 100;
  const [visibleUserPopup, setVisibleUserPopup] = React.useState(false);
  const [visibleAuthModal, setVisibleAuthModal] = React.useState(false);

  const { componentRef, toggleVisibility } = useOutsideClick(
    visibleUserPopup,
    setVisibleUserPopup
  );

  const toggleAuthVisibility = () => {
    setVisibleAuthModal(!visibleAuthModal);
  };

  return (
    <div className={classNames(styles.header, bgTranparent && styles.headerTr)}>
      <div className='container'>
        <div className={styles.wrapper}>
          <div className={styles.left}>
            <Link href='/'>
              <a className={classNames(styles.btn, styles.btnLogo)}>
                <LogoSvg fill={'#f2f2f2'} w={24} h={24} />
              </a>
            </Link>
            <Link href='/manga'>
              <a className={classNames(styles.btn, styles.btnText)}>Catalog</a>
            </Link>
            <button className={classNames(styles.btn, styles.btnText)}>
              What to read
            </button>
            <button className={styles.btn}>
              <RandomSvg fill={'#f2f2f2'} w={24} h={24} />
            </button>
          </div>
          <div className={styles.right}>
            <Search />
            <button className={classNames(styles.btn, styles.btnThemes)}>
              <ThemeSvg fill={'#f2f2f2'} w={24} h={24} />
            </button>
            <span className={styles.divider}>|</span>
            {userData ? (
              <>
                <Link href='/user/bookmarks' passHref>
                  <button className={classNames(styles.btn, styles.btnSpace)}>
                    <BookmarkSvg fill={'#f2f2f2'} w={20} h={20} />
                  </button>
                </Link>

                <button className={classnames(styles.btn, styles.btnSpace)}>
                  <div className={styles.relative}>
                    <NotificationSvg fill={'#f2f2f2'} w={24} h={24} />
                    <span className={styles.notificationSpan}>
                      {NotificationCount > 99 ? '99+' : NotificationCount}
                    </span>
                  </div>
                </button>
                <div className={styles.relative} ref={componentRef}>
                  <button
                    onClick={toggleVisibility}
                    className={classNames(styles.btn, styles.btnSpace)}>
                    <UserAvatar nickname={userData.nickname} />
                  </button>

                  {visibleUserPopup && (
                    <UserPopup nickname={userData.nickname} id={userData.id} />
                  )}
                </div>
              </>
            ) : (
              <button
                className={classNames(styles.btn, styles.btnText)}
                onClick={toggleAuthVisibility}>
                Sign in
              </button>
            )}
            {visibleAuthModal && (
              <AuthDialog
                toggleModalVisibility={toggleAuthVisibility}
                setVisible={setVisibleAuthModal}
                visible={visibleAuthModal}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
