import { SortByEnum } from '../enums/sortby';

export class SearchMangaDto {
  keyword?: string;
  orderby?: 'DESC' | 'ASC';
  page?: number;
  take?: number;
  skip?: number;
  sortby?: SortByEnum;
  types?: number[];
  genres?: number[];
  categories?: number[];
  restrictions?: number[];
  statuses?: number[];
  excludedTypes?: number[];
  excludedGenres?: number[];
  excludedCategories?: number[];
}
