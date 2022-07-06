export interface ResponseFilter {
  name: string;
  id: number;
}

export interface FiltersDataResponse {
  types: ResponseFilter[];
  genres: ResponseFilter[];
  categories: ResponseFilter[];
  statuses: ResponseFilter[];
  restrictions: ResponseFilter[];
}

export interface CatalogFilters {
  types: number[];
  genres: number[];
  categories: number[];
  statuses: number[];
  restrictions: number[];
  excludedTypes: number[];
  excludedGenres: number[];
  excludedCategories: number[];
}
