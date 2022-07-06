import { ResponseManga } from './IManga';

export enum bookmarkIdEnum {
  READING = 1,
  WILL_READ = 2,
  READ = 3,
  POSTPONED = 4,
  THROWN = 5,
  NOT_INTERESTED = 6,
}

export interface UpdateBookmarkDto {
  bookmarkId: bookmarkIdEnum | null;
}

export interface CreateBookmarkDto {
  mangaId: number;
  bookmarkId: bookmarkIdEnum | null;
}
export interface SearchBookmarkDto {
  userId: number;
  bookmarkId: bookmarkIdEnum;
}

export interface ResponseBookmark {
  id: number;
  userId: number;
  bookmarkId: number;
  manga: ResponseManga;
  createdAt: string;
  updatedAt: string;
}
