import Image from 'next/image';
import React from 'react';
import { WarnSvg } from '../../../assets/svgs';
import { useAppSelector } from '../../../hooks/redux';
import { selectUserData } from '../../../redux/slices/userSlice';
import { BlueBtn, Dropdown, ModalBtn } from '../../UI';
import { bookmarkTypes } from '../../../utils/static/Bookmarks';
import styles from './LeftPanel.module.scss';
import { ResponseBookmark } from '../../../models/IBookmarks';
import { Api } from '../../../services/api';

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
  const userData = useAppSelector(selectUserData);

  const [returnedId, setReturnedId] = React.useState<number>();

  const toggleBookmarkType = (ids: number[]) => {
    setReturnedId(ids[0]);
  };

  const addBookmark = React.useCallback(async () => {
    if (returnedId)
      try {
        if (bookmark) {
          const res = await Api().bookmarks.updateBookmark(bookmark.id, {
            bookmarkId: returnedId,
          });
          console.log('Updated bookmark: ', res);
        } else {
          const res = await Api().bookmarks.createBookmark({
            bookmarkId: returnedId,
            mangaId: mangaId,
          });

          console.log('Created bookmark', res);
        }
      } catch (err) {
        console.warn('Bookmark ', err);
      }
  }, [mangaId, returnedId, , bookmark]);

  React.useEffect(() => {
    addBookmark();
  }, [returnedId, addBookmark]);

  const onContinueReading = () => { };

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

          <Dropdown
            title={'Add to bookmarks'}
            items={bookmarkTypes}
            selected={bookmark?.bookmarkId}
            type='manga'
            returnId={toggleBookmarkType}
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
