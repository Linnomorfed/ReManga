export interface ResponceFilter {
  name: string;
  id: number;
}

export interface FiltersDataResponce {
  types: ResponceFilter[];
  genres: ResponceFilter[];
  categories: ResponceFilter[];
  statuses: ResponceFilter[];
  restrictions: ResponceFilter[];
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
