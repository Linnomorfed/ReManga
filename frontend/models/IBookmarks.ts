import { ResponceManga } from './IManga';

export enum bookmarkIdEnum {
  READING = 1,
  WILL_READ = 2,
  READ = 3,
  THROWN = 4,
  NOT_INTERESTED = 5,
}

export interface UpdateBookmarkDto {
  bookmarkId: bookmarkIdEnum;
}

export interface CreateBookmarkDto {
  mangaId: number;
  bookmarkId: bookmarkIdEnum;
}
export interface SearchBookmarkDto {
  userId: number;
  bookmarkId: bookmarkIdEnum;
}

export interface ResponseBookmark {
  id: number;
  userId: number;
  bookmarkId: number;
  manga: ResponceManga;
  createdAt: string;
  updatedAt: string;
}
