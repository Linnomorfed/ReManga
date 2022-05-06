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
