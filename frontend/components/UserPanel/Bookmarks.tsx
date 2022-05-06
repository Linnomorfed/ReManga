import React from 'react';
import { TabBtn } from '../UI';
import styles from './UserPanel.module.scss';
import { bookmarkTypes } from '../../utils/static/Bookmarks';
import { ResponceFilter } from '../../models/IFilters';
import MangaCard from '../MangaCard';
import { ResponseBookmark } from '../../models/IBookmarks';
import { Api } from '../../services/api';

interface BookmarksProps {
  preloadedData: ResponseBookmark[];
  bookmarksCount: number[];
  userId: number;
}

const Bookmarks: React.FC<BookmarksProps> = ({
  preloadedData,
  bookmarksCount,
  userId,
}) => {
  const [items, setItems] = React.useState<ResponseBookmark[]>(preloadedData);
  const [activeTab, setActiveTab] = React.useState<number>(1);
  const toogleActiveTab = async (id: number) => {
    setActiveTab(id);

    try {
      const bookmarks = await Api().bookmarks.getBookmarksByQuery({
        userId: +userId,
        bookmarkId: +id,
      });

      setItems(bookmarks);
    } catch (err) {
      console.warn('Bookmarks loading ', err);
    }
  };

  return (
    <div>
      <div className={styles.tabs}>
        {bookmarkTypes.map((obj: ResponceFilter) => (
          <TabBtn
            key={obj.id}
            onClick={toogleActiveTab}
            active={activeTab}
            id={obj.id}>
            {obj.name + ' ' + bookmarksCount[obj.id - 1]}
          </TabBtn>
        ))}
      </div>
      <div className={styles.mangaList}>
        {items &&
          items.map((obj) => (
            <MangaCard
              key={obj.id}
              variant='catalog'
              title={obj.manga.title}
              url={obj.manga.image.url}
            />
          ))}
      </div>
    </div>
  );
};

export default Bookmarks;
