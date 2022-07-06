import { ResponseBookmark } from '../../models/IBookmarks';
import { RatingResponse } from '../../models/IRating';
import { ResponseManga } from '../../models/IManga';

export interface MangaDataState {
  mangaBookmarkId: number;
  bookmark: ResponseBookmark | null;
  ratedByUser: RatingResponse | null;
  manga: ResponseManga | null;
  chaptersCount: number | null;
}
