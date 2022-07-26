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

export interface CreateBookmarkDto extends UpdateBookmarkDto {
  mangaId: number;
}
export interface SearchBookmarkDto extends UpdateBookmarkDto {
  userId: number;
}

export interface ResponseBookmark {
  id: number;
  userId: number;
  bookmarkId: number;
  manga: ResponseManga;
  createdAt: string;
  updatedAt: string;
}
