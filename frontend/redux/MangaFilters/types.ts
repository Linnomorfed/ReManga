export interface MangaFiltersState {
  mangaType: number | null;
  mangaGenres: number[];
  mangaCategories: number[];
  mangaRestriction: number | null;
  mangaStatus: number | null;
}
