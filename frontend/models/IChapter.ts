import { ResponseManga } from './IManga';

export interface ChapterResult {
  id: number;
  volume: number;
  chapter_number: number;
  likes_count: number;
  chapter_name: string | null;
  mangaId: number;
  createdAt: string;
  updatedAt: string;
  rated: boolean;
  mangaTitle: string;
  isPaid: boolean;
}

export interface CertainChaptersResult extends ChapterResult {
  pages: ChapterPage[];
}

export interface NewestChapteResult extends ChapterResult {
  manga: ResponseManga;
  repeatsCount: number;
}

export interface ChapterPageResult {
  content: CertainChaptersResult;
  nextPageId: number | null;
  prevPageId: number | null;
}

export interface ChapterPage {
  id: number;
  url: string;
  key: string;
  chapterId: number;
}

export interface CreateChapterDto {
  mangaId: number;
  chapter: number;
  volume: number;
}
export interface SearchChapterDto {
  mangaId?: number;
  orderBy?: 'DESC' | 'ASC';
  isOnlyMyBookmarks?: 0 | 1;
}

export interface CreateChapterLikeDto {
  chapterId: number;
}
