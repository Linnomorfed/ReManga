import { FilterEnum } from '../enums/filter';

export class SearchMangaDto {
  keyword?: string;
  orderby?: 'DESC' | 'ASC';
  page?: number;
  take?: number;
  skip?: number;
  filter?: FilterEnum;
}
