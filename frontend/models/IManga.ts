import { OutputData } from '@editorjs/editorjs';
import { ResponseBookmark } from './IBookmarks';
import { ResponceFilter } from './IFilters';
import { RatingResponse } from './IRating';

interface mangaImage {
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
  image: mangaImage;
  rating: number;
  votes_count: number;
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
  type: number;
  restriction: number;
  status: number;
  genreIds: number[];
  categoryIds: number[];
}

export interface SearchMangaDto {
  keyword?: string;
  orderby?: 'DESC' | 'ASC';
  page?: number;
  take?: number;
  skip?: number;
}
