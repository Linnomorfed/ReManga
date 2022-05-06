import React, { FC } from 'react';
import styles from './Header.module.scss';
import {
  BookmarkSvg,
  ClearSvg,
  LogoSvg,
  NotificationSvg,
  RandomSvg,
  SearchSvg,
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

interface HeaderProps {
  bgTranparent: boolean;
}

const Header: FC<HeaderProps> = ({ bgTranparent }) => {
  const userData = useAppSelector(selectUserData);

  const NotificationCount = 100;
  const [visibleUserPopup, setVisibleUserPopup] = React.useState(false);
  const [visibleAuthModal, setVisibleAuthModal] = React.useState(false);

  const [searchValue, setSearchValue] = React.useState('');

  const { componentRef, toggleVisibility } = useOutsideClick(
    visibleUserPopup,
    setVisibleUserPopup
  );

  const toggleAuthVisibility = () => {
    setVisibleAuthModal(!visibleAuthModal);
  };

  const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const onClickClearButton = () => {
    setSearchValue('');
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
            <div className={styles.inputComp}>
              <button className={styles.searchSvg}>
                <SearchSvg fill={'#f2f2f2'} w={24} h={24} />
              </button>
              <input
                className={styles.input}
                onChange={onChangeInputValue}
                type='text'
                value={searchValue}
                placeholder='What are we looking for?'
              />
              {searchValue && (
                <button className={styles.clear} onClick={onClickClearButton}>
                  <ClearSvg fill={'#f2f2f2'} w={20} h={20} />
                </button>
              )}
            </div>
            <button className={classNames(styles.btn, styles.btnThemes)}>
              <ThemeSvg fill={'#f2f2f2'} w={24} h={24} />
            </button>
            <span className={styles.divider}>|</span>
            {userData ? (
              <>
                <button className={classNames(styles.btn, styles.btnSpace)}>
                  <BookmarkSvg fill={'#f2f2f2'} w={20} h={20} />
                </button>
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
