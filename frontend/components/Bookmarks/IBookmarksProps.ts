import { ResponseBookmark } from '../../models/IBookmarks';

export interface BookmarksProps {
  preloadedData: ResponseBookmark[];
  preloadedBookmarksCount: number[];
  userId: number;
  type?: 'default' | 'bookmarks';
}
