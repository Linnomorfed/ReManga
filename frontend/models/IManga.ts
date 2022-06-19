import { OutputData } from '@editorjs/editorjs';
import { ResponseBookmark } from './IBookmarks';
import { CatalogFilters, ResponceFilter } from './IFilters';
import { RatingResponse } from './IRating';

interface MangaImage {
  id: number;
  url: string;
  key: string;
}

export interface ResponceManga {
  id: number;
  title: string;
  otherTitles: string;
  issueYear: number;
  blocks: OutputData['blocks'];
  views: number;
  createdAt: string;
  updatedAt: string;
  type: ResponceFilter;
  status: ResponceFilter;
  restriction: ResponceFilter;
  genres: ResponceFilter[];
  categories: ResponceFilter[];
  image: MangaImage;
  rating: number;
  votes_count: number;
  likes_count: number;
}

export interface ResponceSingleManga {
  manga: ResponceManga;
  bookmark: ResponseBookmark | null;
  ratedByUser: RatingResponse | null;
}

export interface ResponceMangaData {
  items: ResponceManga[];
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
  views = 'views',
  createdAt = 'createdAt',
}
