import { OutputData } from '@editorjs/editorjs';
import { ResponseBookmark } from './IBookmarks';
import { CatalogFilters, ResponseFilter } from './IFilters';
import { RatingResponse } from './IRating';

interface MangaImage {
  id: number;
  url: string;
  key: string;
}

export interface ResponseManga {
  id: number;
  title: string;
  otherTitles: string;
  issueYear: number;
  blocks: OutputData['blocks'];
  views: number;
  createdAt: string;
  updatedAt: string;
  type: ResponseFilter;
  status: ResponseFilter;
  restriction: ResponseFilter;
  genres: ResponseFilter[];
  categories: ResponseFilter[];
  image: MangaImage;
  rating: number;
  votes_count: number;
  likes_count: number;
}

export interface ResponseSingleManga {
  manga: ResponseManga;
  bookmark: ResponseBookmark | null;
  ratedByUser: RatingResponse | null;
}

export interface ResponseMangaData {
  items: ResponseManga[];
  count: number;
}
export interface CreateMangaDto {
  title: string;
  otherTitles: string;
  blocks: OutputData['blocks'];
  issueYear: number;
  type: number | null;
  restriction: number | null;
  status: number | null;
  genreIds: number[];
  categoryIds: number[];
}

export interface SearchMangaDto {
  keyword?: string;
  orderby?: 'DESC' | 'ASC';
  page?: number;
  take?: number;
  skip?: number;
  sortby?: MangaSortEnum;
  topBy?: 'new' | null;
  types?: number[] | null;
  genres?: number[] | null;
  categories?: number[] | null;
  restrictions?: number[] | null;
  statuses?: number[] | null;
  excludedTypes?: number[] | null;
  excludedGenres?: number[] | null;
  excludedCategories?: number[] | null;
}

export enum MangaSortEnum {
  createdAt = 'createdAt',
  updates = 'latestUpdates',
  popularity = 'popularity',
  likes = 'likes',
  views = 'views',
  chaptersCount = 'chaptersCount',
}
