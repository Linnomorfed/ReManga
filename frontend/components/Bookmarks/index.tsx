import React from 'react';
import { Dropdown, SingleDropdown, TabBtn } from '../UI';
import styles from './Bookmarks.module.scss';
import { BookmarkTypes } from '../../utils/static/Bookmarks';
import { ResponceFilter } from '../../models/IFilters';
import MangaCard from '../UI/Cards/MangaCard';
import { ResponseBookmark } from '../../models/IBookmarks';
import { Api } from '../../services/api';
import classNames from 'classnames';
import { DeleteSvg, EditSvg, HistorySvg, SettingsSvg } from '../../assets/svgs';
import { bookmarkListFilters } from '../../utils/static/BookmarkListFilters';
import {
  selectSortByData,
  setBookmarksSortBy,
} from '../../redux/slices/sortBySlice';
import { useAppSelector } from '../../hooks/redux';

interface BookmarksProps {
  preloadedData: ResponseBookmark[];
  preloadedBookmarksCount: number[];
  userId: number;
  type?: 'default' | 'bookmarks';
}

const Bookmarks: React.FC<BookmarksProps> = ({
  preloadedData,
  preloadedBookmarksCount,
  userId,
  type = 'default',
}) => {
  const { bookmarksSortBy } = useAppSelector(selectSortByData);
  const [showEditor, setShowEditor] = React.useState(false);
  const [items, setItems] = React.useState<ResponseBookmark[]>(preloadedData);
  const [selected, setSelected] = React.useState<number[]>([]);
  const [activeTab, setActiveTab] = React.useState<number>(1);
  const [bookmarksCount, setBookmarksCount] = React.useState<number[]>(
    preloadedBookmarksCount
  );

  const updateSelectedList = (id: number) => {
    selected.includes(id)
      ? setSelected(selected.filter((items) => items !== id))
      : setSelected((prev) => [...prev, id]);
  };

  const toggleEditorVisibility = () => {
    setShowEditor(!showEditor);
  };

  const updateBookmarks = async (bookmarkId: number) => {
    let arr = bookmarksCount;
    let newItems = items;

    selected.forEach(async (selectedId) => {
      try {
        await Api().bookmarks.updateBookmark(selectedId, {
          bookmarkId,
        });

        arr[activeTab - 1] = arr[activeTab - 1] - 1;
        arr[bookmarkId - 1] = arr[bookmarkId - 1] + 1;

        newItems = newItems.filter((obj) => obj.id !== selectedId);

        setItems(newItems);
        setBookmarksCount(arr);
        setSelected([]);
        setShowEditor(false);
      } catch (err) {
        console.warn('Updating ', err);
      }
    });
  };

  const deleteBookmarks = () => {
    selected.map(async (selectedId) => {
      try {
        const updatedBookmark = await Api().bookmarks.deleteBookmark(
          selectedId
        );

        console.log('DeletedBookmark: ', updatedBookmark);
      } catch (err) {
        console.warn('Updating ', err);
      }
    });
    setShowEditor(false);
  };

  const toogleActiveTab = async (id: number) => {
    setActiveTab(id);
    setSelected([]);

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
    <>
      {type === 'bookmarks' && (
        <div className={styles.header}>
          <h1 className={styles.title}>Bookmarks</h1>{' '}
          <HistorySvg fill='white' h={24} />
        </div>
      )}
      <div
        className={classNames(
          styles.tabs,
          `${type === 'bookmarks' && styles.tabsBookmarks}`
        )}>
        {BookmarkTypes.map((obj: ResponceFilter) => (
          <TabBtn
            key={obj.id}
            onClick={toogleActiveTab}
            active={activeTab}
            id={obj.id}>
            {obj.name + ' ' + bookmarksCount[obj.id - 1]}
          </TabBtn>
        ))}
      </div>

      <div className={`${type === 'bookmarks' && 'containerSmall'}`}>
        <div className={`${type === 'bookmarks' && styles.mangaListWrapper}`}>
          {type === 'bookmarks' && (
            <div className={styles.filter}>
              <div>
                <SingleDropdown
                  items={bookmarkListFilters}
                  variant='sortBy'
                  action={setBookmarksSortBy}
                  state={bookmarksSortBy}
                />
              </div>
              <div className='d-flex'>
                {showEditor && (
                  <button
                    disabled={selected.length === 0}
                    className={classNames(
                      styles.filterBtn,
                      styles.filterBtnEdit
                    )}>
                    <EditSvg fill='#4e6baf' w={24} />
                  </button>
                )}
                <button
                  className={styles.filterBtn}
                  onClick={toggleEditorVisibility}>
                  <SettingsSvg fill={showEditor ? '#4e6baf' : 'white'} w={24} />
                </button>
              </div>
            </div>
          )}

          {showEditor && (
            <div className={styles.editorWrapper}>
              {BookmarkTypes.map((obj) => (
                <button
                  key={obj.id}
                  onClick={() => updateBookmarks(obj.id)}
                  className={styles.editorBtn}
                  disabled={selected.length === 0 || activeTab === obj.id}>
                  {obj.name}
                </button>
              ))}
              <button
                onClick={deleteBookmarks}
                className={styles.editorBtn}
                disabled={selected.length === 0}>
                <DeleteSvg fill='#f50057' w={20} />
              </button>
            </div>
          )}
          <div className={styles.mangaList}>
            {items &&
              items.map((obj) => (
                <MangaCard
                  key={obj.id}
                  mangaId={obj.manga.id}
                  bookmarkItemId={obj.id}
                  title={obj.manga.title}
                  url={obj.manga.image.url}
                  editing={showEditor && true}
                  updateSelectedList={updateSelectedList}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Bookmarks;
