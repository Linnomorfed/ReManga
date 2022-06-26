import { ResponceManga } from './IManga';

export type ChapterResult = {
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
};

export type CertainChaptersResult = ChapterResult & {
  pages: ChapterPage[];
};

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

export type NewestChapteResult = ChapterResult & {
  manga: ResponceManga;
  repeatsCount: number;
};

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
