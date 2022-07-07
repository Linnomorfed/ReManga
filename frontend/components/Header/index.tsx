import React, { FC } from 'react';
import styles from './Header.module.scss';
import {
  BookmarkSvg,
  LogoSvg,
  NotificationSvg,
  PanelSvg,
  ThemeSvg,
} from '../../assets/svgs';
import { UserPopup } from './UserPopup';
import Link from 'next/link';
import classNames from 'classnames';
import { Auth } from '../Auth';
import { useAppSelector } from '../../hooks/redux';
import { UserAvatar } from '../UI/UserAvatar';
import useOutsideClick from '../../hooks/useOutsideClick';
import { Search } from './Search/Search';
import { ChapterSwitch } from './ChapterSwitch';
import { SingleDropdown } from '../UI';
import { BookmarkTypes } from '../../utils/static/Bookmarks';
import { selectUserData } from '../../redux/User/selectors';
import { selectChaptersData } from '../../redux/Chapter/selectors';
import { selectSortByData } from '../../redux/SortBy/selectors';
import { setMangaBookmarkId } from '../../redux/MangaData/slice';

interface HeaderProps {
  variant?: 'default' | 'transparent' | 'chapter';
}

export const Header: FC<HeaderProps> = ({ variant = 'default' }) => {
  const userData = useAppSelector(selectUserData);
  const { currentChapter } = useAppSelector(selectChaptersData);
  const { mangaBookmarkId } = useAppSelector(selectSortByData);

  const NotificationCount = 100;
  const [visibleUserPopup, setVisibleUserPopup] = React.useState(false);
  const [scrollDirection, setScrollDirection] = React.useState<'down' | 'up'>(
    'up'
  );

  React.useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const onClick = () => {
      setScrollDirection('up');
    };
    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? 'down' : 'up';
      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 1 || scrollY - lastScrollY < -1)
      ) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener('scroll', updateScrollDirection);
    window.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('scroll', updateScrollDirection);
      window.removeEventListener('click', onClick);
    };
  }, [scrollDirection]);

  const { componentRef, toggleVisibility } = useOutsideClick(
    visibleUserPopup,
    setVisibleUserPopup
  );

  return (
    <div
      className={classNames(
        styles.header,
        `${variant === 'transparent' ? styles.headerTr : ''}`,
        `${variant === 'chapter' ? styles.headerChapter : ''}`,
        `${
          variant === 'chapter'
            ? scrollDirection === 'down'
              ? styles.headerChapterHide
              : styles.headerChapterShow
            : ''
        }`
      )}>
      <div className='container'>
        <div className={styles.wrapper}>
          <div className={styles.left}>
            <Link href='/'>
              <a className={classNames(styles.btn, styles.btnLogo)}>
                <LogoSvg fill={'#f2f2f2'} w={24} h={24} />
              </a>
            </Link>

            {variant === 'chapter' ? (
              <>
                {currentChapter && (
                  <Link href={`/manga/${currentChapter?.mangaId}`}>
                    <a className={classNames(styles.btn, styles.btnChapter)}>
                      {currentChapter.mangaTitle}
                    </a>
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link href='/manga'>
                  <a className={classNames(styles.btn, styles.btnText)}>
                    Catalog
                  </a>
                </Link>
                <Link href='/manga/top'>
                  <a className={classNames(styles.btn, styles.btnText)}>
                    What to read
                  </a>
                </Link>
                {userData && (
                  <Link href='/panel'>
                    <a className={styles.btn}>
                      <PanelSvg fill={'#f2f2f2'} w={24} h={24} />
                    </a>
                  </Link>
                )}
              </>
            )}
          </div>

          {variant === 'chapter' && <ChapterSwitch />}

          <div className={styles.right}>
            {variant === 'chapter' ? (
              <SingleDropdown
                items={BookmarkTypes}
                action={setMangaBookmarkId}
                defaultTitle='Add to bookmarks'
                state={mangaBookmarkId}
                variant='header'
              />
            ) : (
              <Search />
            )}

            <button className={classNames(styles.btn, styles.btnThemes)}>
              <ThemeSvg fill={'#f2f2f2'} w={24} h={24} />
            </button>
            <span className={styles.divider}>|</span>

            {userData ? (
              <>
                <Link href='/user/bookmarks'>
                  <a>
                    <button className={classNames(styles.btn, styles.btnSpace)}>
                      <BookmarkSvg fill={'#f2f2f2'} w={20} h={20} />
                    </button>
                  </a>
                </Link>

                <button className={classNames(styles.btn, styles.btnSpace)}>
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
              <Auth />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
