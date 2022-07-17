import Image from 'next/image';
import React from 'react';
import { WarnSvg } from '../../../assets/svgs';
import { useAppSelector } from '../../../hooks/redux';
import { BlueBtn, ModalBtn, SingleDropdown } from '../../../ui-components';
import { BookmarkTypes } from '../../../utils/static/Bookmarks';
import styles from './LeftPanel.module.scss';
import { Api } from '../../../services/api';
import { selectUserData } from '../../../redux/User/selectors';
import useDidMountEffect from '../../../hooks/useDidMountEffect';
import { setMangaBookmarkId } from '../../../redux/MangaData/slice';
import { selectMangaData } from '../../../redux/MangaData/selectors';
import { useRouter } from 'next/router';

interface MangaContentProps {
  url: string;
  title: string;
  mangaId: number;
}

export const LeftPanel: React.FC<MangaContentProps> = ({
  url,
  title,
  mangaId,
}) => {
  const router = useRouter();
  const userData = useAppSelector(selectUserData);

  const { bookmark, mangaBookmarkId } = useAppSelector(selectMangaData);

  useDidMountEffect(() => {
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

  const onContinueReading = () => {};

  const pushToEditPage = () => {
    router.push(`/panel/${router.query.mangaId}`);
  };

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
              <BlueBtn type='manga' onClick={pushToEditPage}>
                Edit
              </BlueBtn>
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
