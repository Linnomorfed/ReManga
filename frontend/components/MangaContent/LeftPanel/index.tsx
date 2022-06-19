import Image from 'next/image';
import React from 'react';
import { WarnSvg } from '../../../assets/svgs';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { selectUserData } from '../../../redux/slices/userSlice';
import { BlueBtn, ModalBtn, SingleDropdown } from '../../UI';
import {
  BookmarkTypes,
  BookmarkTypesExisted,
} from '../../../utils/static/Bookmarks';
import styles from './LeftPanel.module.scss';
import { ResponseBookmark } from '../../../models/IBookmarks';
import { Api } from '../../../services/api';
import {
  authModalSlice,
  showAuthModal,
} from '../../../redux/slices/authModalSlice';
import {
  selectSortByData,
  setMangaBookmarkId,
} from '../../../redux/slices/sortBySlice';

interface MangaContentProps {
  url: string;
  title: string;
  bookmark: ResponseBookmark | null;
  mangaId: number;
}

const LeftPanel: React.FC<MangaContentProps> = ({
  url,
  title,
  bookmark,
  mangaId,
}) => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(selectUserData);
  const { mangaBookmarkId } = useAppSelector(selectSortByData);

  //dispatch(showAuthModal());

  React.useEffect(() => {
    const addBookmark = async () => {
      try {
        await Api().bookmarks.createBookmark({
          bookmarkId: mangaBookmarkId,
          mangaId: mangaId,
        });
      } catch (err) {
        console.warn('Bookmark ', err);
      }
    };
    const updateBookmark = async () => {
      try {
        bookmark &&
          (await Api().bookmarks.updateBookmark(bookmark.id, {
            bookmarkId: mangaBookmarkId,
          }));
      } catch (err) {
        console.warn('Updating bookmark ', err);
      }
    };
    const deleteBookmark = async () => {
      try {
        bookmark && (await Api().bookmarks.deleteBookmark(bookmark.id));
      } catch (err) {
        console.warn('Deleting bookmark ', err);
      }
    };
    if (mangaBookmarkId > 0) {
      bookmark ? updateBookmark() : addBookmark();
    }
  }, [mangaBookmarkId]);

  React.useEffect(() => {
    bookmark && dispatch(setMangaBookmarkId(bookmark.bookmarkId));
  }, []);

  const onContinueReading = () => {};

  return (
    <div className={styles.querter}>
      <div className={styles.leftContainer}>
        <div className={styles.imgContainer}>
          <Image
            className={styles.img}
            placeholder='blur'
            blurDataURL={`/_next/image?url=${url}&w=16&q=75`}
            src={url}
            alt={title}
            layout='responsive'
            width='295'
            height='100%'
          />
        </div>
        <div className={styles.btnsContainer}>
          <ModalBtn onClick={onContinueReading}>
            <span className={styles.continue}>Continue</span>
            <p className={styles.volume}>Volume 2 Chapter 179</p>
          </ModalBtn>

          <SingleDropdown
            items={BookmarkTypes}
            action={setMangaBookmarkId}
            defaultTitle='Add to bookmarks'
            state={mangaBookmarkId}
            variant='manga'
          />
          {userData && (
            <>
              <BlueBtn type='manga'>Edit</BlueBtn>
              <button className={styles.warnBtn}>
                <WarnSvg w={24} fill={'white'} /> Complain
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;
